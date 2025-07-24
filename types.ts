

export enum SubscriptionPlanName {
  INDIVIDUAL = 'Individual',
  FAMILIAR = 'Familiar',
  INSTITUCION = 'Institución Educativa',
}

export interface SubscriptionPlan {
  name: SubscriptionPlanName;
  price: string;
  description?: string; // Descripción adicional para planes como el de Instituciones
  features: string[];
  buttonText: string;
  color: string; // Tailwind color class
  highlight?: boolean; // Para destacar un plan como el más popular
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string; // Contenido principal de la lección
  aiPromptContext: string; // Contexto para la IA
  estimatedTime: string; // Ej: "15 min"
}

export interface Level {
  id:string;
  title: string;
  description: string;
  lessons: Lesson[];
  icon: React.ReactNode;
  color: string; // Tailwind bg color class e.g. bg-blue-500
  textColor: string; // Tailwind text color class e.g. text-blue-100
  borderColor: string; // Tailwind border color class e.g. border-blue-700
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  plan: SubscriptionPlanName;
}

export interface UserProfile {
  id: string;
  accountId: string; // ID of the main authenticated user
  name: string;
  avatarColor: string; // Tailwind bg color class e.g. bg-blue-500
  xp: number;
  completedLessons: string[];
  isEducator?: boolean;
}

export interface PlacementTestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export type AppView = 'home' | 'level_lessons' | 'lesson_content' | 'dashboard' | 'placement_test' | 'certificate' | 'login';