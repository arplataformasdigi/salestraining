
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "collaborator";
  company?: string;
  phone?: string;
  status?: "active" | "inactive" | "pending";
  joinedDate?: string;
}

export interface TrainingPath {
  id: string;
  title: string;
  description: string;
  modules: TrainingModule[];
  status: "active" | "draft" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  type: "lesson" | "simulation" | "assessment";
  content: any; // This will be more specific based on the type
  order: number;
}

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  type: "cold-call" | "objection-handling" | "discovery" | "closing";
  difficulty: "beginner" | "intermediate" | "advanced";
  context: string;
  products?: any[];
  objections?: string[];
  idealResponses?: Record<string, string>;
}

export interface UserProgress {
  userId: string;
  pathId: string;
  moduleProgress: {
    moduleId: string;
    status: "not-started" | "in-progress" | "completed";
    score?: number;
    completedAt?: string;
  }[];
  overallProgress: number; // Percentage
  startedAt: string;
  lastActivityAt: string;
}

export interface PerformanceMetrics {
  userId: string;
  metrics: {
    conversionRate: number;
    avgCycleTime: number;
    avgDealValue: number;
    objectionHandlingScore: number;
    communicationScore: number;
  };
  period: "weekly" | "monthly" | "quarterly";
  date: string;
}

export interface SimulationResult {
  id: string;
  userId: string;
  scenarioId: string;
  answers: Record<string, string>;
  aiAnalysis: {
    overallScore: number;
    breakdown: {
      understanding: number;
      persuasion: number;
      empathy: number;
      clarity: number;
    };
    feedback: string;
    improvementSuggestions: string[];
  };
  createdAt: string;
}
