// ========================= CONTENT MANAGEMENT TYPES =========================

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  status: ContentStatus;
  ageGroup: AgeGroup[];
  difficulty: DifficultyLevel;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  author: string;
  version: number;
}

export type ContentType = 
  | 'disease' 
  | 'video' 
  | 'quiz' 
  | 'memory_game' 
  | 'puzzle' 
  | 'coloring' 
  | 'hangman' 
  | 'story';

export type ContentStatus = 'draft' | 'review' | 'approved' | 'published' | 'archived';

export type AgeGroup = '3-6' | '7-10' | '11-14' | '15+';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

// ========================= DISEASE TYPES =========================

export interface Disease extends ContentItem {
  type: 'disease';
  emoji: string;
  symptoms: string[];
  ageOfOnset: string;
  characteristics: string[];
  tips: ChildTip[];
  prevalence?: string;
  category: DiseaseCategory;
}

export type DiseaseCategory = 'genetic' | 'autoimmune' | 'metabolic' | 'neurological' | 'respiratory';

export interface ChildTip {
  id: string;
  title: string;
  content: string;
  isCollapsed: boolean;
}

// ========================= MEDIA TYPES =========================

export interface Video extends ContentItem {
  type: 'video';
  duration: number; // em segundos
  thumbnailUrl: string;
  videoUrl: string;
  subtitles?: Subtitle[];
  videoType: VideoType;
  relatedDisease?: string;
}

export type VideoType = 'animation' | 'story' | 'explanation' | 'testimonial';

export interface Subtitle {
  language: string;
  url: string;
}

// ========================= GAME TYPES =========================

export interface GameBase extends ContentItem {
  maxScore: number;
  timeLimit?: number; // em segundos
  instructions: string[];
}

export interface Quiz extends GameBase {
  type: 'quiz';
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  emoji?: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MemoryGame extends GameBase {
  type: 'memory_game';
  pairs: MemoryPair[];
  gridSize: { rows: number; cols: number };
}

export interface MemoryPair {
  id: string;
  emoji: string;
  label: string;
  relatedDisease?: string;
}

export interface Puzzle extends GameBase {
  type: 'puzzle';
  text: string;
  pieces: PuzzlePiece[];
  gridSize: { rows: number; cols: number };
}

export interface PuzzlePiece {
  id: string;
  content: string;
  correctPosition: { row: number; col: number };
  currentPosition?: { row: number; col: number };
}

export interface ColoringPage extends ContentItem {
  type: 'coloring';
  svgContent: string;
  colorPalette: string[];
  theme: string;
}

export interface HangmanGame extends GameBase {
  type: 'hangman';
  words: HangmanWord[];
  maxErrors: number;
}

export interface HangmanWord {
  id: string;
  word: string;
  hint: string;
  category: string;
  difficulty: DifficultyLevel;
}

// ========================= USER INTERACTION TYPES =========================

export interface UserProgress {
  userId: string;
  contentId: string;
  contentType: ContentType;
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
  timeSpent: number; // em segundos
  completedAt?: Date;
  attempts: number;
}

export interface UserSession {
  sessionId: string;
  userId?: string;
  startTime: Date;
  endTime?: Date;
  pagesVisited: PageVisit[];
  interactions: UserInteraction[];
}

export interface PageVisit {
  page: string;
  timestamp: Date;
  timeSpent: number;
}

export interface UserInteraction {
  type: 'click' | 'hover' | 'scroll' | 'input' | 'game_action';
  element: string;
  timestamp: Date;
  data?: any;
}

// ========================= NAVIGATION TYPES =========================

export interface NavigationItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  path: string;
  color: string;
  isActive: boolean;
  requiredAge?: AgeGroup[];
}

// ========================= API RESPONSE TYPES =========================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ========================= CONTENT FILTERS =========================

export interface ContentFilters {
  ageGroup?: AgeGroup[];
  difficulty?: DifficultyLevel[];
  contentType?: ContentType[];
  tags?: string[];
  status?: ContentStatus[];
  search?: string;
  sortBy?: 'title' | 'createdAt' | 'difficulty' | 'ageGroup';
  sortOrder?: 'asc' | 'desc';
}

// ========================= CMS ADMIN TYPES =========================

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  permissions: Permission[];
  isActive: boolean;
  lastLogin?: Date;
}

export type AdminRole = 'super_admin' | 'content_manager' | 'reviewer' | 'contributor';

export type Permission = 
  | 'create_content' 
  | 'edit_content' 
  | 'delete_content' 
  | 'publish_content' 
  | 'manage_users' 
  | 'view_analytics';

export interface ContentWorkflow {
  contentId: string;
  currentStage: WorkflowStage;
  history: WorkflowHistoryItem[];
  assignedReviewer?: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
}

export type WorkflowStage = 'draft' | 'review_pending' | 'review_in_progress' | 'approved' | 'rejected' | 'published';

export interface WorkflowHistoryItem {
  stage: WorkflowStage;
  timestamp: Date;
  userId: string;
  comment?: string;
  action: 'created' | 'submitted' | 'approved' | 'rejected' | 'published' | 'archived';
}