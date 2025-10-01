// ========================= UTILITY FUNCTIONS =========================

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind CSS class merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats duration in seconds to human readable format
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }
  
  if (remainingSeconds === 0) {
    return `${minutes} min`;
  }
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Generates a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Delays execution for specified milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Capitalizes first letter of string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts age group to display text
 */
export function formatAgeGroup(ageGroup: string): string {
  switch (ageGroup) {
    case '3-6': return '3-6 anos';
    case '7-10': return '7-10 anos';
    case '11-14': return '11-14 anos';
    case '15+': return '15+ anos';
    default: return ageGroup;
  }
}

/**
 * Gets difficulty badge color
 */
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800 border-green-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'hard': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

/**
 * Gets difficulty display text
 */
export function getDifficultyText(difficulty: string): string {
  switch (difficulty) {
    case 'easy': return 'Fácil de Entender';
    case 'medium': return 'Precisa de Atenção';
    case 'hard': return 'Mais Complexo';
    default: return difficulty;
  }
}

/**
 * Shuffles an array randomly
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Groups array items by a key
 */
export function groupBy<T, K extends keyof any>(
  array: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return array.reduce((result, item) => {
    const key = getKey(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<K, T[]>);
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Checks if user is on mobile device
 */
export function isMobile(): boolean {
  return window.innerWidth < 768;
}

/**
 * Gets emoji for content type
 */
export function getContentTypeEmoji(type: string): string {
  switch (type) {
    case 'disease': return '❤️';
    case 'video': return '🎬';
    case 'quiz': return '🎮';
    case 'memory_game': return '🧠';
    case 'puzzle': return '🧩';
    case 'coloring': return '🎨';
    case 'hangman': return '🎯';
    case 'story': return '📖';
    default: return '✨';
  }
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formats date to locale string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR');
}

/**
 * Formats date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return 'agora';
  if (diffMinutes < 60) return `${diffMinutes} min atrás`;
  if (diffHours < 24) return `${diffHours}h atrás`;
  if (diffDays < 7) return `${diffDays} dias atrás`;
  return formatDate(date);
}

/**
 * Gets color for navigation item
 */
export function getNavItemColor(type: string, isActive: boolean = false): string {
  const colors = {
    disease: isActive ? 'bg-pink-500 shadow-xl scale-105' : 'bg-gray-400 hover:bg-gray-500',
    video: isActive ? 'bg-blue-500 shadow-xl scale-105' : 'bg-gray-400 hover:bg-gray-500',
    quiz: isActive ? 'bg-green-500 shadow-xl scale-105' : 'bg-gray-400 hover:bg-gray-500',
    memory_game: isActive ? 'bg-purple-500 shadow-xl scale-105' : 'bg-gray-400 hover:bg-gray-500',
    puzzle: isActive ? 'bg-orange-500 shadow-xl scale-105' : 'bg-gray-400 hover:bg-gray-500',
    coloring: isActive ? 'bg-red-500 shadow-xl scale-105' : 'bg-gray-400 hover:bg-gray-500',
    hangman: isActive ? 'bg-teal-500 shadow-xl scale-105' : 'bg-gray-400 hover:bg-gray-500',
  };
  
  return colors[type as keyof typeof colors] || colors.disease;
}

/**
 * Saves data to localStorage with error handling
 */
export function saveToStorage(key: string, data: any): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

/**
 * Loads data from localStorage with error handling
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
}