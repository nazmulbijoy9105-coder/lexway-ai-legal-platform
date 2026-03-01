// LexWay AI Legal Platform - Database Schema
// PostgreSQL Tables via Drizzle ORM

import { pgTable, pgEnum, uuid, varchar, text, timestamp, boolean, integer, decimal, jsonb, pgSequence } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['student', 'mentor', 'parent', 'investor', 'admin']);
export const subscriptionTierEnum = pgEnum('subscription_tier', ['free', 'basic', 'premium']);
export const moduleTypeEnum = pgEnum('module_type', ['llb', 'bar_council_lower', 'bar_council_high', 'engineer_tech_law', 'engineer_ip', 'engineer_corporate', 'engineer_international']);
export const contentTypeEnum = pgEnum('content_type', ['video', 'document', 'quiz', 'assignment', 'scenario', 'reading']);
export const submissionStatusEnum = pgEnum('submission_status', ['pending', 'ai_evaluated', 'mentor_reviewed', 'graded']);
export const sessionStatusEnum = pgEnum('session_status', ['scheduled', 'in_progress', 'completed', 'cancelled']);
export const scenarioTypeEnum = pgEnum('scenario_type', ['civil', 'criminal', 'constitutional', 'ip', 'tech_contract', 'corporate', 'cyber']);
export const difficultyEnum = pgEnum('difficulty', ['beginner', 'intermediate', 'advanced', 'expert']);

// Users Table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  role: userRoleEnum('role').notNull().default('student'),
  avatar: text('avatar'),
  phone: varchar('phone', { length: 20 }),
  subscriptionTier: subscriptionTierEnum('subscription_tier').default('free'),
  subscriptionExpiresAt: timestamp('subscription_expires_at'),
  isActive: boolean('is_active').default(true),
  emailVerified: boolean('email_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Student Profile - Extended info for students
export const studentProfiles = pgTable('student_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).unique().notNull(),
  dateOfBirth: timestamp('date_of_birth'),
  institution: varchar('institution', { length: 255 }),
  llbYear: integer('llb_year'), // 1-5 for 5-year, 1-3 for 3-year
  llbProgramType: varchar('llb_program_type', { length: 50 }), // '5_year' or '3_year'
  parentId: uuid('parent_id').references(() => users.id), // Linked parent account
  enrolledModules: jsonb('enrolled_modules').default([]), // Array of module IDs
  weakAreas: jsonb('weak_areas').default([]), // Identified weak topics
  badges: jsonb('badges').default([]), // Earned badges
  totalStudyTime: integer('total_study_time').default(0), // in minutes
  streakDays: integer('streak_days').default(0),
  lastActiveAt: timestamp('last_active_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Mentor Profile - Extended info for mentors
export const mentorProfiles = pgTable('mentor_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).unique().notNull(),
  title: varchar('title', { length: 100 }), // e.g., "Advocate", "Senior Counsel"
  barCouncilNumber: varchar('bar_council_number', { length: 50 }),
  expertiseAreas: jsonb('expertise_areas').default([]), // Array of subject areas
  yearsOfExperience: integer('years_of_experience'),
  bio: text('bio'),
  hourlyRate: decimal('hourly_rate', { precision: 10, scale: 2 }),
  availabilitySchedule: jsonb('availability_schedule').default({}),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  totalSessions: integer('total_sessions').default(0),
  isVerified: boolean('is_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Parent Profile - Extended info for parents
export const parentProfiles = pgTable('parent_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).unique().notNull(),
  linkedStudents: jsonb('linked_students').default([]), // Array of student user IDs
  notificationPreferences: jsonb('notification_preferences').default({
    email: true,
    sms: false,
    weeklyReport: true,
    alertOnDecline: true,
  }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Investor Profile - Extended info for investors
export const investorProfiles = pgTable('investor_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).unique().notNull(),
  organizationName: varchar('organization_name', { length: 255 }),
  organizationType: varchar('organization_type', { length: 100 }), // 'institution', 'vc', 'individual'
  dashboardAccessLevel: varchar('dashboard_access_level', { length: 50 }).default('basic'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Modules Table - Curriculum modules
export const modules = pgTable('modules', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code', { length: 20 }).unique().notNull(), // e.g., "LLB-101", "BC-LC-001"
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  type: moduleTypeEnum('type').notNull(),
  semester: integer('semester'), // 1-10 for LL.B
  year: integer('year'), // 1-5 for LL.B year
  isPremium: boolean('is_premium').default(false),
  isActive: boolean('is_active').default(true),
  order: integer('order').default(0),
  icon: varchar('icon', { length: 50 }),
  color: varchar('color', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Topics Table - Individual topics within modules
export const topics = pgTable('topics', {
  id: uuid('id').primaryKey().defaultRandom(),
  moduleId: uuid('module_id').references(() => modules.id).notNull(),
  code: varchar('code', { length: 20 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  contentType: contentTypeEnum('content_type').default('reading'),
  difficulty: difficultyEnum('difficulty').default('beginner'),
  aiKeywords: jsonb('ai_keywords').default([]), // Keywords for AI evaluation
  iracComponents: jsonb('irac_components').default([]), // IRAC issue/rules/application/conclusion keywords
  videoUrl: text('video_url'),
  readingMaterial: text('reading_material'),
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Student Progress - Track progress through topics
export const studentProgress = pgTable('student_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  studentId: uuid('student_id').references(() => users.id).notNull(),
  topicId: uuid('topic_id').references(() => topics.id).notNull(),
  status: varchar('status', { length: 20 }).default('not_started'), // not_started, in_progress, completed
  timeSpent: integer('time_spent').default(0), // in seconds
  score: decimal('score', { precision: 5, scale: 2 }),
  completedAt: timestamp('completed_at'),
  lastAccessedAt: timestamp('last_accessed_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Student Submissions - AI evaluated submissions
export const studentSubmissions = pgTable('student_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  studentId: uuid('student_id').references(() => users.id).notNull(),
  topicId: uuid('topic_id').references(() => topics.id),
  scenarioId: uuid('scenario_id'), // Reference to scenario in MongoDB
  type: varchar('type', { length: 50 }).notNull(), // 'answer', 'draft', 'scenario', 'quiz'
  content: text('content').notNull(),
  aiScore: decimal('ai_score', { precision: 5, scale: 2 }),
  aiFeedback: jsonb('ai_feedback').default({}),
  iracScore: jsonb('irac_score').default({}), // {issue: 0-25, rule: 0-25, application: 0-30, conclusion: 0-20}
  mentorScore: decimal('mentor_score', { precision: 5, scale: 2 }),
  mentorFeedback: text('mentor_feedback'),
  status: submissionStatusEnum('status').default('pending'),
  evaluatedAt: timestamp('evaluated_at'),
  mentorReviewedAt: timestamp('mentor_reviewed_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Mentor Sessions - Scheduled coaching sessions
export const mentorSessions = pgTable('mentor_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  mentorId: uuid('mentor_id').references(() => users.id).notNull(),
  studentId: uuid('student_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  scheduledAt: timestamp('scheduled_at').notNull(),
  duration: integer('duration').default(60), // in minutes
  status: sessionStatusEnum('status').default('scheduled'),
  meetingLink: text('meeting_link'),
  notes: text('notes'),
  feedback: text('feedback'),
  rating: integer('rating'), // 1-5
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Performance Analytics - Aggregated analytics
export const performanceAnalytics = pgTable('performance_analytics', {
  id: uuid('id').primaryKey().defaultRandom(),
  studentId: uuid('student_id').references(() => users.id).notNull(),
  date: timestamp('date').notNull(),
  moduleId: uuid('module_id').references(() => modules.id),
  topicId: uuid('topic_id').references(() => topics.id),
  metrics: jsonb('metrics').default({}), // {score, timeSpent, accuracy, etc.}
  heatmapData: jsonb('heatmap_data').default({}), // For progress heatmaps
  weakAreas: jsonb('weak_areas').default([]),
  strengths: jsonb('strengths').default([]),
  createdAt: timestamp('created_at').defaultNow(),
});

// Subscription Records
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  tier: subscriptionTierEnum('tier').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('INR'),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  isActive: boolean('is_active').default(true),
  paymentMethod: varchar('payment_method', { length: 50 }),
  transactionId: varchar('transaction_id', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Badges/Certifications
export const badges = pgTable('badges', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  criteria: jsonb('criteria').notNull(), // {type, threshold, moduleId?}
  tier: varchar('tier', { length: 20 }).default('bronze'), // bronze, silver, gold, platinum
  createdAt: timestamp('created_at').defaultNow(),
});

// Student Badges - Earned badges
export const studentBadges = pgTable('student_badges', {
  id: uuid('id').primaryKey().defaultRandom(),
  studentId: uuid('student_id').references(() => users.id).notNull(),
  badgeId: uuid('badge_id').references(() => badges.id).notNull(),
  earnedAt: timestamp('earned_at').defaultNow(),
});

// Notifications
export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  type: varchar('type', { length: 50 }).default('info'), // info, warning, success, error
  isRead: boolean('is_read').default(false),
  actionUrl: text('action_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Audit Logs
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  action: varchar('action', { length: 100 }).notNull(),
  entityType: varchar('entity_type', { length: 50 }),
  entityId: uuid('entity_id'),
  metadata: jsonb('metadata').default({}),
  ipAddress: varchar('ip_address', { length: 50 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  studentProfile: one(studentProfiles, {
    fields: [users.id],
    references: [studentProfiles.userId],
  }),
  mentorProfile: one(mentorProfiles, {
    fields: [users.id],
    references: [mentorProfiles.userId],
  }),
  parentProfile: one(parentProfiles, {
    fields: [users.id],
    references: [parentProfiles.userId],
  }),
  investorProfile: one(investorProfiles, {
    fields: [users.id],
    references: [investorProfiles.userId],
  }),
  submissions: many(studentSubmissions),
  sessionsAsMentor: many(mentorSessions, { relationName: 'mentorSessions' }),
  sessionsAsStudent: many(mentorSessions, { relationName: 'studentSessions' }),
  progress: many(studentProgress),
}));

export const modulesRelations = relations(modules, ({ many }) => ({
  topics: many(topics),
}));

export const topicsRelations = relations(topics, ({ one, many }) => ({
  module: one(modules, {
    fields: [topics.moduleId],
    references: [modules.id],
  }),
  progress: many(studentProgress),
  submissions: many(studentSubmissions),
}));

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type StudentProfile = typeof studentProfiles.$inferSelect;
export type MentorProfile = typeof mentorProfiles.$inferSelect;
export type Module = typeof modules.$inferSelect;
export type Topic = typeof topics.$inferSelect;
export type StudentSubmission = typeof studentSubmissions.$inferSelect;
export type MentorSession = typeof mentorSessions.$inferSelect;
export type PerformanceAnalytics = typeof performanceAnalytics.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
