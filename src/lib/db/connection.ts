// Database connection utilities
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// PostgreSQL connection
const postgresUrl = process.env.DATABASE_URL || 'postgresql://localhost:5432/lexway';

const client = postgres(postgresUrl, { 
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, { schema });

// MongoDB connection for scenarios and logs
import { MongoClient, Db } from 'mongodb';

const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/lexway';

let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;

export async function connectMongo(): Promise<Db> {
  if (mongoDb) return mongoDb;
  
  mongoClient = new MongoClient(mongoUrl);
  await mongoClient.connect();
  mongoDb = mongoClient.db();
  console.log('MongoDB connected');
  return mongoDb;
}

export function getMongoDb(): Db {
  if (!mongoDb) {
    throw new Error('MongoDB not connected. Call connectMongo() first.');
  }
  return mongoDb;
}

export async function closeConnections(): Promise<void> {
  if (client) {
    await client.end();
  }
  if (mongoClient) {
    await mongoClient.close();
  }
}

// Scenario collections for Law Game and simulations
export const scenarioCollection = () => getMongoDb().collection<ScenarioDocument>('scenarios');
export const gameSessionCollection = () => getMongoDb().collection<GameSessionDocument>('game_sessions');
export const submissionLogsCollection = () => getMongoDb().collection<SubmissionLogDocument>('submission_logs');

// Scenario document types
export interface ScenarioDocument {
  _id: string;
  title: string;
  description: string;
  type: 'civil' | 'criminal' | 'constitutional' | 'ip' | 'tech_contract' | 'corporate' | 'cyber';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  moduleId: string;
  facts: string[];
  issues: string[];
  applicableLaws: string[];
  parties: PartyDocument[];
  evidence: EvidenceDocument[];
  roles: ('judge' | 'plaintiff' | 'defendant' | 'petitioner' | 'respondent' | 'advocate')[];
  timeLimit: number; // in minutes
  scoringCriteria: ScoringCriteria;
  sampleAnswer?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PartyDocument {
  name: string;
  role: string;
  background: string;
}

export interface EvidenceDocument {
  id: string;
  name: string;
  description: string;
  relevance: string;
  authenticity: string;
}

export interface ScoringCriteria {
  issueIdentification: number;
  ruleKnowledge: number;
  applicationLogic: number;
  conclusion: number;
  drafting: number;
  vivaScore?: number;
}

export interface GameSessionDocument {
  _id: string;
  scenarioId: string;
  studentId: string;
  role: string;
  phase: 'draft' | 'cross_question' | 'evidence_reveal' | 'ai_score' | 'completed';
  submissions: GameSubmission[];
  aiScores: AIScore[];
  startTime: Date;
  endTime?: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GameSubmission {
  phase: string;
  content: string;
  timestamp: Date;
}

export interface AIScore {
  phase: string;
  scores: ScoringCriteria;
  feedback: string;
  timestamp: Date;
}

export interface SubmissionLogDocument {
  _id: string;
  studentId: string;
  submissionId: string;
  type: string;
  inputTokens: number;
  outputTokens: number;
  model: string;
  latency: number;
  cost: number;
  createdAt: Date;
}
