import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Recuperar tema salvo do localStorage
    const savedTheme = localStorage.getItem('dr-infantil-theme') as Theme;
    return savedTheme || 'auto';
  });

  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateEffectiveTheme = () => {
      let newEffectiveTheme: 'light' | 'dark';

      if (theme === 'auto') {
        // Detectar preferência do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        newEffectiveTheme = prefersDark ? 'dark' : 'light';
      } else {
        newEffectiveTheme = theme;
      }

      setEffectiveTheme(newEffectiveTheme);

      // Aplicar tema ao documento
      const root = document.documentElement;
      if (newEffectiveTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }

      // Atualizar meta theme-color para mobile
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content',
          newEffectiveTheme === 'dark' ? '#1f2937' : '#7c3aed'
        );
      }
    };

    updateEffectiveTheme();

    // Listener para mudanças na preferência do sistema
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => updateEffectiveTheme();
      
      // addEventListener com compatibilidade
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
      } else {
        // Fallback para navegadores antigos
        mediaQuery.addListener(handler);
        return () => mediaQuery.removeListener(handler);
      }
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('dr-infantil-theme', newTheme);
    
    // Analytics tracking (se disponível)
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'theme_change', {
        theme: newTheme,
        timestamp: new Date().toISOString()
      });
    }
  };

  const toggleTheme = () => {
    // Alternar entre light e dark (pular auto no toggle)
    if (effectiveTheme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Hook para animações de transição suave do tema
export const useThemeTransition = () => {
  useEffect(() => {
    const root = document.documentElement;
    
    // Adicionar classe de transição
    root.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease');
    
    return () => {
      root.style.removeProperty('transition');
    };
  }, []);
};
