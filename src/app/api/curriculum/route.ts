import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/connection';
import { modules, topics, studentProgress, studentSubmissions } from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';

// Get all modules
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const year = searchParams.get('year');
    const semester = searchParams.get('semester');

    let query = db.select().from(modules).where(eq(modules.isActive, true));

    const allModules = await query;

    // Filter by type if provided
    let filteredModules = allModules;
    if (type) {
      filteredModules = filteredModules.filter(m => m.type === type);
    }
    if (year) {
      filteredModules = filteredModules.filter(m => m.year === parseInt(year));
    }
    if (semester) {
      filteredModules = filteredModules.filter(m => m.semester === parseInt(semester));
    }

    // Sort by order
    filteredModules.sort((a, b) => (a.order || 0) - (b.order || 0));

    // Get topics for each module
    const modulesWithTopics = await Promise.all(
      filteredModules.map(async (mod) => {
        const modTopics = await db.select()
          .from(topics)
          .where(and(eq(topics.moduleId, mod.id), eq(topics.isActive, true)))
          .orderBy(topics.order);
        
        return {
          ...mod,
          topics: modTopics,
        };
      })
    );

    return NextResponse.json({ modules: modulesWithTopics });
  } catch (error) {
    console.error('Get modules error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch modules' },
      { status: 500 }
    );
  }
}

// Create new module (admin only)
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    // Only admins can create modules
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { code, name, description, type, semester, year, icon, color, isPremium } = body;

    const [newModule] = await db.insert(modules).values({
      code,
      name,
      description,
      type,
      semester,
      year,
      icon,
      color,
      isPremium: isPremium || false,
    }).returning();

    return NextResponse.json({ module: newModule });
  } catch (error) {
    console.error('Create module error:', error);
    return NextResponse.json(
      { error: 'Failed to create module' },
      { status: 500 }
    );
  }
}

// Add topic to module
export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { moduleId, code, name, description, contentType, difficulty, aiKeywords, iracComponents, order } = body;

    const [newTopic] = await db.insert(topics).values({
      moduleId,
      code,
      name,
      description,
      contentType: contentType || 'reading',
      difficulty: difficulty || 'beginner',
      aiKeywords: aiKeywords || [],
      iracComponents: iracComponents || [],
      order: order || 0,
    }).returning();

    return NextResponse.json({ topic: newTopic });
  } catch (error) {
    console.error('Create topic error:', error);
    return NextResponse.json(
      { error: 'Failed to create topic' },
      { status: 500 }
    );
  }
}
