import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  Disease, 
  Video, 
  Quiz, 
  MemoryGame, 
  Puzzle, 
  ColoringPage, 
  HangmanGame,
  NavigationItem,
  UserProgress,
  ContentFilters 
} from '../types';

// ========================= APP STATE INTERFACE =========================

interface AppState {
  // Navigation
  currentPage: string;
  navigationItems: NavigationItem[];
  selectedDisease: string | null;
  
  // Content
  diseases: Disease[];
  videos: Video[];
  quizzes: Quiz[];
  memoryGames: MemoryGame[];
  puzzles: Puzzle[];
  coloringPages: ColoringPage[];
  hangmanGames: HangmanGame[];
  
  // User Progress
  userProgress: UserProgress[];
  currentUser?: string;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  filters: ContentFilters;
  
  // Actions
  setCurrentPage: (page: string) => void;
  setSelectedDisease: (diseaseId: string | null) => void;
  setNavigation: (items: NavigationItem[]) => void;
  setActiveNavItem: (itemId: string) => void;
  
  // Content Actions
  loadContent: () => Promise<void>;
  addDisease: (disease: Disease) => void;
  updateDisease: (id: string, updates: Partial<Disease>) => void;
  deleteDisease: (id: string) => void;
  
  addVideo: (video: Video) => void;
  addQuiz: (quiz: Quiz) => void;
  addMemoryGame: (game: MemoryGame) => void;
  addPuzzle: (puzzle: Puzzle) => void;
  addColoringPage: (page: ColoringPage) => void;
  addHangmanGame: (game: HangmanGame) => void;
  
  // User Progress Actions
  updateUserProgress: (progress: UserProgress) => void;
  getUserProgress: (contentId: string) => UserProgress | undefined;
  
  // Filter Actions
  setFilters: (filters: Partial<ContentFilters>) => void;
  clearFilters: () => void;
  
  // UI Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// ========================= INITIAL DATA =========================

const initialNavigationItems: NavigationItem[] = [
  {
    id: 'diseases',
    label: 'Doenças Raras',
    shortLabel: 'Doenças',
    icon: '❤️',
    path: '/',
    color: 'pink',
    isActive: true
  },
  {
    id: 'videos',
    label: 'Vídeos',
    shortLabel: 'Vídeos',
    icon: '▶️',
    path: '/videos',
    color: 'blue',
    isActive: false
  },
  {
    id: 'quiz',
    label: 'Quiz',
    shortLabel: 'Quiz',
    icon: '🎮',
    path: '/quiz',
    color: 'green',
    isActive: false
  },
  {
    id: 'memory',
    label: 'Memória',
    shortLabel: 'Memória',
    icon: '🧠',
    path: '/memory',
    color: 'purple',
    isActive: false
  },
  {
    id: 'puzzle',
    label: 'Quebra-Cabeças',
    shortLabel: 'Quebra-Cabeças',
    icon: '🧩',
    path: '/puzzle',
    color: 'orange',
    isActive: false
  },
  {
    id: 'coloring',
    label: 'Colorir',
    shortLabel: 'Colorir',
    icon: '🎨',
    path: '/coloring',
    color: 'red',
    isActive: false
  },
  {
    id: 'hangman',
    label: 'Jogo da Forca',
    shortLabel: 'Jogo',
    icon: '🎯',
    path: '/hangman',
    color: 'teal',
    isActive: false
  }
];

// ========================= ZUSTAND STORE =========================

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      currentPage: 'diseases',
      navigationItems: initialNavigationItems,
      selectedDisease: null,
      diseases: [],
      videos: [],
      quizzes: [],
      memoryGames: [],
      puzzles: [],
      coloringPages: [],
      hangmanGames: [],
      userProgress: [],
      currentUser: undefined,
      isLoading: false,
      error: null,
      filters: {},

      // Navigation Actions
      setCurrentPage: (page: string) => {
        set({ currentPage: page });
      },

      setSelectedDisease: (diseaseId: string | null) => {
        set({ selectedDisease: diseaseId });
      },

      setNavigation: (items: NavigationItem[]) => {
        set({ navigationItems: items });
      },

      setActiveNavItem: (itemId: string) => {
        set((state) => ({
          navigationItems: state.navigationItems.map(item => ({
            ...item,
            isActive: item.id === itemId
          }))
        }));
      },

      // Content Actions
      loadContent: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Aqui seria a chamada para API real
          // Por enquanto, carregamos dados mockados
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Load mock data
          // (será substituído por chamadas de API)
          
          set({ isLoading: false });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Erro ao carregar conteúdo' 
          });
        }
      },

      addDisease: (disease: Disease) => {
        set((state) => ({
          diseases: [...state.diseases, disease]
        }));
      },

      updateDisease: (id: string, updates: Partial<Disease>) => {
        set((state) => ({
          diseases: state.diseases.map(disease => 
            disease.id === id ? { ...disease, ...updates } : disease
          )
        }));
      },

      deleteDisease: (id: string) => {
        set((state) => ({
          diseases: state.diseases.filter(disease => disease.id !== id)
        }));
      },

      addVideo: (video: Video) => {
        set((state) => ({
          videos: [...state.videos, video]
        }));
      },

      addQuiz: (quiz: Quiz) => {
        set((state) => ({
          quizzes: [...state.quizzes, quiz]
        }));
      },

      addMemoryGame: (game: MemoryGame) => {
        set((state) => ({
          memoryGames: [...state.memoryGames, game]
        }));
      },

      addPuzzle: (puzzle: Puzzle) => {
        set((state) => ({
          puzzles: [...state.puzzles, puzzle]
        }));
      },

      addColoringPage: (page: ColoringPage) => {
        set((state) => ({
          coloringPages: [...state.coloringPages, page]
        }));
      },

      addHangmanGame: (game: HangmanGame) => {
        set((state) => ({
          hangmanGames: [...state.hangmanGames, game]
        }));
      },

      // User Progress Actions
      updateUserProgress: (progress: UserProgress) => {
        set((state) => {
          const existingIndex = state.userProgress.findIndex(
            p => p.contentId === progress.contentId && p.userId === progress.userId
          );

          if (existingIndex >= 0) {
            const updated = [...state.userProgress];
            updated[existingIndex] = progress;
            return { userProgress: updated };
          } else {
            return { userProgress: [...state.userProgress, progress] };
          }
        });
      },

      getUserProgress: (contentId: string) => {
        const state = get();
        return state.userProgress.find(
          p => p.contentId === contentId && p.userId === state.currentUser
        );
      },

      // Filter Actions
      setFilters: (filters: Partial<ContentFilters>) => {
        set((state) => ({
          filters: { ...state.filters, ...filters }
        }));
      },

      clearFilters: () => {
        set({ filters: {} });
      },

      // UI Actions
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      }
    }),
    {
      name: 'dr-infantil-storage',
      partialize: (state) => ({
        userProgress: state.userProgress,
        currentUser: state.currentUser,
        filters: state.filters
      })
    }
  )
);

// ========================= SELECTOR HOOKS =========================

export const useNavigation = () => {
  const { navigationItems, currentPage, setActiveNavItem, setCurrentPage } = useAppStore();
  return { navigationItems, currentPage, setActiveNavItem, setCurrentPage };
};

export const useDiseases = () => {
  const { diseases, addDisease, updateDisease, deleteDisease, filters } = useAppStore();
  
  // Apply filters
  const filteredDiseases = diseases.filter(disease => {
    if (filters.ageGroup?.length && !filters.ageGroup.some(age => disease.ageGroup.includes(age))) {
      return false;
    }
    if (filters.difficulty?.length && !filters.difficulty.includes(disease.difficulty)) {
      return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return disease.title.toLowerCase().includes(searchLower) ||
             disease.description.toLowerCase().includes(searchLower);
    }
    return true;
  });

  return { 
    diseases: filteredDiseases, 
    allDiseases: diseases,
    addDisease, 
    updateDisease, 
    deleteDisease 
  };
};

export const useVideos = () => {
  const { videos, addVideo, filters } = useAppStore();
  
  const filteredVideos = videos.filter(video => {
    if (filters.ageGroup?.length && !filters.ageGroup.some(age => video.ageGroup.includes(age))) {
      return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return video.title.toLowerCase().includes(searchLower) ||
             video.description.toLowerCase().includes(searchLower);
    }
    return true;
  });

  return { videos: filteredVideos, addVideo };
};

export const useGameContent = () => {
  const { quizzes, memoryGames, puzzles, hangmanGames } = useAppStore();
  return { quizzes, memoryGames, puzzles, hangmanGames };
};

export const useUserProgress = () => {
  const { userProgress, updateUserProgress, getUserProgress, currentUser } = useAppStore();
  return { userProgress, updateUserProgress, getUserProgress, currentUser };
};