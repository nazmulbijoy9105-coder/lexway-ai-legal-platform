// Authentication utilities
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { db } from '../db/connection';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'lexway-super-secret-key-change-in-production'
);

const ACCESS_TOKEN_EXPIRY = '24h';
const REFRESH_TOKEN_EXPIRY = '7d';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  subscriptionTier: string;
  [key: string]: string;
}

export interface AuthResult {
  success: boolean;
  user?: TokenPayload;
  error?: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate access token
export async function generateAccessToken(payload: TokenPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

// Generate refresh token
export async function generateRefreshToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ ...payload, type: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

// Verify token
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

// Get current user from cookie
export async function getCurrentUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) return null;
  
  return verifyToken(token);
}

// Set auth cookies
export async function setAuthCookies(accessToken: string, refreshToken: string): Promise<void> {
  const cookieStore = await cookies();
  
  cookieStore.set('auth-token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
  
  cookieStore.set('refresh-token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

// Clear auth cookies
export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
  cookieStore.delete('refresh-token');
}

// Register new user
export async function registerUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role: string = 'student'
): Promise<AuthResult> {
  try {
    // Check if user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }
    
    // Hash password
    const passwordHash = await hashPassword(password);
    
    // Create user
    const [newUser] = await db.insert(users).values({
      email,
      passwordHash,
      firstName,
      lastName,
      role: role as any,
    }).returning();
    
    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      subscriptionTier: newUser.subscriptionTier || 'free',
    };
    
    const accessToken = await generateAccessToken(tokenPayload);
    const refreshToken = await generateRefreshToken(tokenPayload);
    
    // Set cookies
    await setAuthCookies(accessToken, refreshToken);
    
    return { success: true, user: tokenPayload };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
}

// Login user
export async function loginUser(email: string, password: string): Promise<AuthResult> {
  try {
    // Find user
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    
    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }
    
    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash);
    
    if (!isValid) {
      return { success: false, error: 'Invalid credentials' };
    }
    
    // Check if user is active
    if (!user.isActive) {
      return { success: false, error: 'Account is deactivated' };
    }
    
    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      subscriptionTier: user.subscriptionTier || 'free',
    };
    
    const accessToken = await generateAccessToken(tokenPayload);
    const refreshToken = await generateRefreshToken(tokenPayload);
    
    // Set cookies
    await setAuthCookies(accessToken, refreshToken);
    
    return { success: true, user: tokenPayload };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed' };
  }
}

// Logout user
export async function logoutUser(): Promise<void> {
  await clearAuthCookies();
}

// Middleware helper for protected routes
export async function requireAuth(): Promise<TokenPayload> {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
}

// Role-based access check
export async function requireRole(allowedRoles: string[]): Promise<TokenPayload> {
  const user = await requireAuth();
  
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Forbidden');
  }
  
  return user;
}
