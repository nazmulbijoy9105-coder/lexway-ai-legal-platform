import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/connection';
import { studentSubmissions, topics, performanceAnalytics, users } from '@/lib/db/schema';
import { eq, and, desc, sql, avg, count } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';

// AI Evaluation prompt templates
const IRAC_EVALUATION_PROMPT = `You are a legal expert evaluating a law student's answer. Evaluate the following answer using the IRAC method:

ISSUE: Identify the legal issues
RULE: State the applicable legal rules/statutes/case laws
APPLICATION: Apply the rules to the facts
CONCLUSION: Draw a logical conclusion

Submission:
{submission}

Topic Keywords: {keywords}
IRAC Components: {iracComponents}

Provide your evaluation in JSON format:
{
  "issueDetection": { "score": 0-25, "feedback": "..." },
  "ruleAccuracy": { "score": 0-25, "feedback": "..." },
  "applicationLogic": { "score": 0-30, "feedback": "..." },
  "conclusion": { "score": 0-20, "feedback": "..." },
  "overallScore": 0-100,
  "strengths": ["..."],
  "improvements": ["..."],
  "suggestedReferences": ["..."]
}`;

const DRAFTING_EVALUATION_PROMPT = `You are a legal drafting expert. Evaluate the following legal document:

Document Type: {documentType}
Submission:
{submission}

Evaluate:
1. Structure and organization (0-25)
2. Clarity and precision (0-25)
3. Legal terminology usage (0-25)
4. Compliance with format (0-25)

Provide JSON:
{
  "structure": { "score": 0-25, "feedback": "..." },
  "clarity": { "score": 0-25, "feedback": "..." },
  "terminology": { "score": 0-25, "feedback": "..." },
  "format": { "score": 0-25, "feedback": "..." },
  "overallScore": 0-100,
  "improvements": ["..."]
}`;

// Mock AI evaluation - in production, integrate with OpenAI/GPT API
async function evaluateWithAI(submission: string, type: string, keywords: string[], iracComponents: string[]): Promise<any> {
  // Simulate AI evaluation
  // In production, replace with actual API call to OpenAI/GPT
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  
  // Simple keyword matching for demonstration
  const lowerSubmission = submission.toLowerCase();
  const keywordMatches = keywords.filter(kw => 
    lowerSubmission.includes(kw.toLowerCase())
  ).length;
  
  const keywordScore = Math.min(25, (keywordMatches / Math.max(keywords.length, 1)) * 25);
  
  // Check for IRAC structure
  const hasIssue = /issue|problem|question/i.test(submission);
  const hasRule = /law|section|act|article/i.test(submission);
  const hasApplication = /apply|therefore|hence|consequently/i.test(submission);
  const hasConclusion = /conclusion|held|decided|order/i.test(submission);
  
  const iracScore = (
    (hasIssue ? 20 : 0) +
    (hasRule ? 20 : 0) +
    (hasApplication ? 25 : 0) +
    (hasConclusion ? 15 : 0)
  );

  const totalScore = Math.round((keywordScore + iracScore) / 2 + 30); // Base score of 30

  return {
    issueDetection: {
      score: Math.min(25, Math.round(totalScore * 0.25)),
      feedback: hasIssue 
        ? "Good identification of legal issues" 
        : "Try to clearly identify the legal issues at the beginning",
    },
    ruleAccuracy: {
      score: Math.min(25, Math.round(totalScore * 0.25)),
      feedback: hasRule 
        ? "Appropriate reference to legal provisions" 
        : "Include relevant statutory provisions and case laws",
    },
    applicationLogic: {
      score: Math.min(30, Math.round(totalScore * 0.30)),
      feedback: hasApplication 
        ? "Logical application of law to facts" 
        : "Strengthen the analysis by applying rules to specific facts",
    },
    conclusion: {
      score: Math.min(20, Math.round(totalScore * 0.20)),
      feedback: hasConclusion 
        ? "Clear and reasoned conclusion" 
        : "Add a clear conclusion summarizing the analysis",
    },
    overallScore: Math.min(100, totalScore),
    strengths: [
      keywordMatches > 0 ? "Relevant use of legal terminology" : null,
      submission.length > 200 ? "Attempted detailed analysis" : null,
    ].filter(Boolean),
    improvements: [
      !hasIssue ? "Identify the legal issues clearly" : null,
      !hasRule ? "Reference relevant statutory provisions" : null,
      !hasApplication ? "Apply law to facts more thoroughly" : null,
      !hasConclusion ? "Add a clear conclusion" : null,
    ].filter(Boolean),
    suggestedReferences: ["Indian Contract Act, 1872", "Constitution of India", "Supreme Court cases"],
  };
}

// Submit answer for AI evaluation
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    
    const { topicId, scenarioId, type, content } = body;

    if (!content || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get topic keywords if topicId provided
    let keywords: string[] = [];
    let iracComponents: string[] = [];
    
    if (topicId) {
      const topic = await db.select()
        .from(topics)
        .where(eq(topics.id, topicId))
        .limit(1);
      
      if (topic.length > 0) {
        keywords = (topic[0].aiKeywords as string[]) || [];
        iracComponents = (topic[0].iracComponents as string[]) || [];
      }
    }

    // Evaluate with AI
    const evaluation = await evaluateWithAI(content, type, keywords, iracComponents);

    // Save submission
    const [submission] = await db.insert(studentSubmissions).values({
      studentId: user.userId,
      topicId: topicId || null,
      scenarioId: scenarioId || null,
      type,
      content,
      aiScore: evaluation.overallScore.toString(),
      aiFeedback: evaluation,
      iracScore: {
        issue: evaluation.issueDetection.score,
        rule: evaluation.ruleAccuracy.score,
        application: evaluation.applicationLogic.score,
        conclusion: evaluation.conclusion.score,
      },
      status: 'ai_evaluated',
      evaluatedAt: new Date(),
    }).returning();

    // Update performance analytics
    await db.insert(performanceAnalytics).values({
      studentId: user.userId,
      date: new Date(),
      topicId: topicId || null,
      metrics: {
        score: evaluation.overallScore,
        type,
        submissionId: submission.id,
      },
    });

    return NextResponse.json({
      submission: {
        ...submission,
        aiFeedback: evaluation,
      },
    });
  } catch (error) {
    console.error('AI evaluation error:', error);
    return NextResponse.json(
      { error: 'Evaluation failed' },
      { status: 500 }
    );
  }
}

// Get student's submission history
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get('topicId');
    const limit = parseInt(searchParams.get('limit') || '10');

    let query = db.select()
      .from(studentSubmissions)
      .where(eq(studentSubmissions.studentId, user.userId))
      .orderBy(desc(studentSubmissions.createdAt))
      .limit(limit);

    if (topicId) {
      query = db.select()
        .from(studentSubmissions)
        .where(and(
          eq(studentSubmissions.studentId, user.userId),
          eq(studentSubmissions.topicId, topicId)
        ))
        .orderBy(desc(studentSubmissions.createdAt))
        .limit(limit) as any;
    }

    const submissions = await query;

    // Get statistics
    const stats = await db.select({
      avgScore: avg(studentSubmissions.aiScore),
      totalSubmissions: count(studentSubmissions.id),
    })
    .from(studentSubmissions)
    .where(eq(studentSubmissions.studentId, user.userId));

    return NextResponse.json({
      submissions,
      statistics: {
        averageScore: stats[0]?.avgScore || 0,
        totalSubmissions: stats[0]?.totalSubmissions || 0,
      },
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
