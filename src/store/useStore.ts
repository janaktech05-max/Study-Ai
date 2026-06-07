import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'team';
  uploadsThisMonth: number;
  uploadsLimit: number;
  createdAt: Date;
}

export interface Upload {
  id: string;
  name: string;
  type: 'pdf' | 'pptx' | 'docx' | 'txt' | 'image' | 'youtube';
  size: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  createdAt: Date;
  thumbnail?: string;
  content?: string;
}

export interface Note {
  id: string;
  uploadId: string;
  title: string;
  type: 'exam' | 'short' | 'detailed' | 'bullet' | 'chapter' | 'revision';
  content: string;
  createdAt: Date;
  isFavorite: boolean;
}

export interface Flashcard {
  id: string;
  uploadId: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  studied: boolean;
  createdAt: Date;
}

export interface MCQ {
  id: string;
  uploadId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  userAnswer?: number;
  createdAt: Date;
}

export interface QuestionBankItem {
  id: string;
  uploadId: string;
  question: string;
  marks: 2 | 5 | 10 | 'viva';
  answer: string;
  createdAt: Date;
}

export interface MindMapNode {
  id: string;
  label: string;
  children?: MindMapNode[];
}

export interface MindMap {
  id: string;
  uploadId: string;
  title: string;
  nodes: MindMapNode;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Analytics {
  notesGenerated: number;
  filesUploaded: number;
  studyTimeMinutes: number;
  flashcardsStudied: number;
  mcqsSolved: number;
  weeklyActivity: { day: string; notes: number; uploads: number }[];
  monthlyProgress: { month: string; value: number }[];
}

interface AppState {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  
  // Uploads
  uploads: Upload[];
  addUpload: (upload: Upload) => void;
  updateUpload: (id: string, updates: Partial<Upload>) => void;
  removeUpload: (id: string) => void;
  
  // Notes
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  removeNote: (id: string) => void;
  
  // Flashcards
  flashcards: Flashcard[];
  addFlashcards: (cards: Flashcard[]) => void;
  updateFlashcard: (id: string, updates: Partial<Flashcard>) => void;
  
  // MCQs
  mcqs: MCQ[];
  addMCQs: (mcqs: MCQ[]) => void;
  updateMCQ: (id: string, updates: Partial<MCQ>) => void;
  
  // Question Bank
  questionBank: QuestionBankItem[];
  addQuestions: (questions: QuestionBankItem[]) => void;
  
  // Mind Maps
  mindMaps: MindMap[];
  addMindMap: (mindMap: MindMap) => void;
  
  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
  
  // Analytics
  analytics: Analytics;
  updateAnalytics: (updates: Partial<Analytics>) => void;
  
  // UI State
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Mock data
const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@studyai.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  plan: 'pro',
  uploadsThisMonth: 12,
  uploadsLimit: -1,
  createdAt: new Date('2024-01-15'),
};

const mockAnalytics: Analytics = {
  notesGenerated: 47,
  filesUploaded: 23,
  studyTimeMinutes: 1250,
  flashcardsStudied: 156,
  mcqsSolved: 89,
  weeklyActivity: [
    { day: 'Mon', notes: 5, uploads: 2 },
    { day: 'Tue', notes: 8, uploads: 3 },
    { day: 'Wed', notes: 3, uploads: 1 },
    { day: 'Thu', notes: 12, uploads: 4 },
    { day: 'Fri', notes: 7, uploads: 2 },
    { day: 'Sat', notes: 4, uploads: 1 },
    { day: 'Sun', notes: 8, uploads: 3 },
  ],
  monthlyProgress: [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 85 },
    { month: 'Apr', value: 92 },
    { month: 'May', value: 88 },
    { month: 'Jun', value: 95 },
  ],
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Theme
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      // Auth
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Uploads
      uploads: [],
      addUpload: (upload) =>
        set((state) => ({ uploads: [upload, ...state.uploads] })),
      updateUpload: (id, updates) =>
        set((state) => ({
          uploads: state.uploads.map((u) =>
            u.id === id ? { ...u, ...updates } : u
          ),
        })),
      removeUpload: (id) =>
        set((state) => ({
          uploads: state.uploads.filter((u) => u.id !== id),
        })),

      // Notes
      notes: [],
      addNote: (note) =>
        set((state) => ({ notes: [note, ...state.notes] })),
      updateNote: (id, updates) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, ...updates } : n
          ),
        })),
      removeNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),

      // Flashcards
      flashcards: [],
      addFlashcards: (cards) =>
        set((state) => ({ flashcards: [...state.flashcards, ...cards] })),
      updateFlashcard: (id, updates) =>
        set((state) => ({
          flashcards: state.flashcards.map((f) =>
            f.id === id ? { ...f, ...updates } : f
          ),
        })),

      // MCQs
      mcqs: [],
      addMCQs: (newMcqs) =>
        set((state) => ({ mcqs: [...state.mcqs, ...newMcqs] })),
      updateMCQ: (id, updates) =>
        set((state) => ({
          mcqs: state.mcqs.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        })),

      // Question Bank
      questionBank: [],
      addQuestions: (questions) =>
        set((state) => ({ questionBank: [...state.questionBank, ...questions] })),

      // Mind Maps
      mindMaps: [],
      addMindMap: (mindMap) =>
        set((state) => ({ mindMaps: [mindMap, ...state.mindMaps] })),

      // Chat
      chatMessages: [],
      addChatMessage: (message) =>
        set((state) => ({ chatMessages: [...state.chatMessages, message] })),
      clearChat: () => set({ chatMessages: [] }),

      // Analytics
      analytics: mockAnalytics,
      updateAnalytics: (updates) =>
        set((state) => ({
          analytics: { ...state.analytics, ...updates },
        })),

      // UI State
      sidebarOpen: true,
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'studyai-storage',
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        uploads: state.uploads,
        notes: state.notes,
        flashcards: state.flashcards,
        mcqs: state.mcqs,
        questionBank: state.questionBank,
        mindMaps: state.mindMaps,
        analytics: state.analytics,
      }),
    }
  )
);

// Demo login helper
export const demoLogin = () => {
  useStore.getState().login(mockUser);
};
