import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, effectiveTheme, setTheme } = useTheme();
  const [showMenu, setShowMenu] = React.useState(false);

  const themes = [
    { value: 'light' as const, label: 'Claro', icon: Sun },
    { value: 'dark' as const, label: 'Escuro', icon: Moon },
    { value: 'auto' as const, label: 'Automático', icon: Monitor },
  ];

  const currentThemeIcon = themes.find(t => t.value === theme)?.icon || Sun;
  const CurrentIcon = currentThemeIcon;

  return (
    <div className="relative">
      {/* Botão Principal */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Alterar tema"
        aria-expanded={showMenu}
        aria-haspopup="true"
      >
        <CurrentIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </motion.button>

      {/* Menu Dropdown */}
      <AnimatePresence>
        {showMenu && (
          <>
            {/* Overlay para fechar ao clicar fora */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
              aria-hidden="true"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
              role="menu"
              aria-orientation="vertical"
            >
              {themes.map((themeOption) => {
                const Icon = themeOption.icon;
                const isSelected = theme === themeOption.value;

                return (
                  <motion.button
                    key={themeOption.value}
                    whileHover={{ backgroundColor: 'rgba(124, 58, 237, 0.1)' }}
                    onClick={() => {
                      setTheme(themeOption.value);
                      setShowMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      isSelected
                        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    role="menuitem"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 font-medium">{themeOption.label}</span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400"
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Indicador do tema efetivo (quando auto está selecionado) */}
              {theme === 'auto' && (
                <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  Usando: {effectiveTheme === 'dark' ? '🌙 Escuro' : '☀️ Claro'}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
