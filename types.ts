// Mức độ câu hỏi theo Bloom's Taxonomy
export type DifficultyLevel = 'nhan_biet' | 'thong_hieu' | 'van_dung' | 'van_dung_cao' | 'hon_hop';

export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  nhan_biet: 'Nhận biết',
  thong_hieu: 'Thông hiểu',
  van_dung: 'Vận dụng',
  van_dung_cao: 'Vận dụng cao',
  hon_hop: 'Hỗn hợp các mức độ'
};

export interface QuizQuestion {
  id: number;
  type: 'mcq' | 'tf' | 'short';
  topic: string;
  question: string;
  options?: string[]; // Only for MCQ
  correct: number | boolean | number; // index for mcq, boolean for tf, number for short
  explain: string;
  level?: DifficultyLevel; // Mức độ câu hỏi
}

export interface QuizSettings {
  enableTimer: boolean;
  timerSeconds: number; // Tổng số giây
  enableSound: boolean;
}

export interface SavedQuiz {
  id: string;
  name: string;
  topic: string;
  questions: QuizQuestion[];
  settings: QuizSettings;
  difficultyLevel: DifficultyLevel;
  createdAt: string;
  questionCount: number;
}

export interface GeneratorConfig {
  topic: string;
  questionCount: number;
  files: File[];
  difficultyLevel: DifficultyLevel;
}

export type GenerationStatus = 'idle' | 'generating' | 'success' | 'error';
export type PageType = 'create' | 'library' | 'reports' | 'settings' | 'support';

// Lịch sử tạo quiz (tự động lưu)
export interface QuizHistory {
  id: string;
  topic: string;
  questionCount: number;
  difficultyLevel: DifficultyLevel;
  createdAt: string;
  questions: QuizQuestion[];
  settings: QuizSettings;
}

// Cài đặt ứng dụng
export interface AppSettings {
  defaultModel: string;
  defaultTimer: number;
  defaultSound: boolean;
  defaultDifficulty: DifficultyLevel;
}

// Dữ liệu phân tích/thống kê
export interface AnalyticsData {
  totalQuizzes: number;
  totalQuestions: number;
  quizzesByDifficulty: Record<DifficultyLevel, number>;
  quizzesByDate: Array<{ date: string; count: number }>;
}