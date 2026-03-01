import { NextRequest, NextResponse } from 'next/server';
import { registerUser, loginUser } from '@/lib/auth';
import { db } from '@/lib/db/connection';
import { studentProfiles, mentorProfiles, parentProfiles, investorProfiles, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password, firstName, lastName, role, ...profileData } = body;

    if (action === 'register') {
      if (!email || !password || !firstName || !lastName) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }

      const result = await registerUser(email, password, firstName, lastName, role || 'student');

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 400 }
        );
      }

      // Create role-specific profile
      if (result.user) {
        const userId = result.user.userId;

        if (role === 'student' || !role) {
          await db.insert(studentProfiles).values({
            userId,
            ...profileData,
          });
        } else if (role === 'mentor') {
          await db.insert(mentorProfiles).values({
            userId,
            ...profileData,
          });
        } else if (role === 'parent') {
          await db.insert(parentProfiles).values({
            userId,
            ...profileData,
          });
        } else if (role === 'investor') {
          await db.insert(investorProfiles).values({
            userId,
            ...profileData,
          });
        }
      }

      return NextResponse.json({
        success: true,
        user: result.user,
      });
    }

    if (action === 'login') {
      if (!email || !password) {
        return NextResponse.json(
          { error: 'Missing email or password' },
          { status: 400 }
        );
      }

      const result = await loginUser(email, password);

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        user: result.user,
      });
    }

    if (action === 'logout') {
      const { logoutUser } = await import('@/lib/auth');
      await logoutUser();
      
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { getCurrentUser } = await import('@/lib/auth');
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    // Get full user profile
    const fullUser = await db.query.users.findFirst({
      where: eq(users.id, user.userId),
    });

    return NextResponse.json({
      authenticated: true,
      user: {
        ...user,
        firstName: fullUser?.firstName,
        lastName: fullUser?.lastName,
        avatar: fullUser?.avatar,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
