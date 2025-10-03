import React, { useEffect, useState } from 'react';
import { X, Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../stores/useAppStore';

interface Shortcut {
  keys: string[];
  description: string;
  action: () => void;
}

const KeyboardShortcuts: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false);
  const { setCurrentPage } = useAppStore();

  const shortcuts: Shortcut[] = [
    {
      keys: ['Ctrl', 'K'],
      description: 'Abrir busca rápida',
      action: () => {
        // QuickSearch irá lidar com isso
        // Mantido aqui apenas para documentação
      },
    },
    {
      keys: ['Ctrl', 'H'],
      description: 'Ir para início',
      action: () => setCurrentPage('home'),
    },
    {
      keys: ['Ctrl', 'D'],
      description: 'Ir para biblioteca de doenças',
      action: () => setCurrentPage('disease-library'),
    },
    {
      keys: ['Ctrl', 'G'],
      description: 'Ir para jogos',
      action: () => setCurrentPage('games-hub'),
    },
    {
      keys: ['Ctrl', 'V'],
      description: 'Ir para vídeos',
      action: () => setCurrentPage('video-library'),
    },
    {
      keys: ['?'],
      description: 'Mostrar/ocultar este menu de atalhos',
      action: () => setShowHelp(!showHelp),
    },
    {
      keys: ['Esc'],
      description: 'Fechar modais e menus',
      action: () => setShowHelp(false),
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K é tratado pelo QuickSearch component
      
      // Ctrl+H - Home
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        shortcuts[1].action();
      }

      // Ctrl+D - Disease Library
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        shortcuts[2].action();
      }

      // Ctrl+G - Games
      if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        shortcuts[3].action();
      }

      // Ctrl+V - Videos
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        shortcuts[4].action();
      }

      // ? - Help
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        // Não abrir se estiver em input/textarea
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setShowHelp(true);
        }
      }

      // Esc - Close
      if (e.key === 'Escape') {
        setShowHelp(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHelp]);

  return (
    <>
      {/* Botão de atalhos */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 z-40 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        aria-label="Mostrar atalhos de teclado"
        title="Atalhos de teclado (?)"
      >
        <Keyboard className="w-6 h-6" />
      </motion.button>

      {/* Modal de ajuda */}
      <AnimatePresence>
        {showHelp && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowHelp(false)}
              aria-hidden="true"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[80vh] overflow-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="shortcuts-title"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Keyboard className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    <h2 id="shortcuts-title" className="text-2xl font-bold text-gray-900 dark:text-white">
                      Atalhos de Teclado
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Fechar"
                  >
                    <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                {/* Lista de atalhos */}
                <div className="space-y-3">
                  {shortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="text-gray-700 dark:text-gray-300">{shortcut.description}</span>
                      <div className="flex items-center gap-2">
                        {shortcut.keys.map((key, keyIndex) => (
                          <React.Fragment key={keyIndex}>
                            {keyIndex > 0 && (
                              <span className="text-gray-400 dark:text-gray-500">+</span>
                            )}
                            <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm">
                              {key}
                            </kbd>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dica */}
                <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-purple-900 dark:text-purple-200">
                    💡 <strong>Dica:</strong> Você pode pressionar <kbd className="px-2 py-0.5 bg-white dark:bg-gray-800 border border-purple-300 dark:border-purple-700 rounded text-xs font-mono">?</kbd> a qualquer momento para ver estes atalhos!
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyboardShortcuts;
