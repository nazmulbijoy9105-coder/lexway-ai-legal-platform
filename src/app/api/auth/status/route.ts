import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Try to import auth functions - if DB is not available, return demo mode
    let user = null;
    
    try {
      const { getCurrentUser } = await import('@/lib/auth');
      user = await getCurrentUser();
    } catch (authError) {
      // Auth system not available - return demo mode
      console.log('Auth not available, using demo mode');
    }

    if (!user) {
      return NextResponse.json({
        authenticated: false,
        demoMode: true,
        user: null
      });
    }

    return NextResponse.json({
      authenticated: true,
      demoMode: false,
      user: {
        userId: user.userId,
        email: user.email,
        role: user.role,
        subscriptionTier: user.subscriptionTier,
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({
      authenticated: false,
      demoMode: true,
      error: 'Auth system unavailable'
    });
  }
}
