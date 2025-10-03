import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp, Book, Video, Gamepad2, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../stores/useAppStore';
import { diseases } from '../../data/diseases';

interface SearchResult {
  type: 'disease' | 'video' | 'game' | 'page';
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  category?: string;
}

const QuickSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setCurrentPage, setSelectedDisease } = useAppStore();

  // Carregar buscas recentes do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dr-infantil-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Abrir/Fechar com Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
        setSelectedIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus no input quando abrir
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Navegação por teclado
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyNav = (e: KeyboardEvent) => {
      const results = getSearchResults();
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleSelectResult(results[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyNav);
    return () => window.removeEventListener('keydown', handleKeyNav);
  }, [isOpen, query, selectedIndex]);

  const saveRecentSearch = (searchTerm: string) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('dr-infantil-recent-searches', JSON.stringify(updated));
  };

  const getSearchResults = (): SearchResult[] => {
    if (!query.trim()) {
      // Mostrar trending/sugestões quando vazio
      return [
        {
          type: 'page',
          title: 'Doenças Raras',
          description: 'Biblioteca completa de doenças',
          icon: <Book className="w-5 h-5" />,
          action: () => setCurrentPage('diseases'),
          category: 'Página'
        },
        {
          type: 'page',
          title: 'Jogos Educativos',
          description: '7 jogos interativos',
          icon: <Gamepad2 className="w-5 h-5" />,
          action: () => setCurrentPage('games'),
          category: 'Página'
        },
        {
          type: 'page',
          title: 'Biblioteca de Vídeos',
          description: 'Vídeos educativos',
          icon: <Video className="w-5 h-5" />,
          action: () => setCurrentPage('videos'),
          category: 'Página'
        },
      ];
    }

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Buscar doenças
    diseases.forEach(disease => {
      const matchTitle = disease.name.toLowerCase().includes(lowerQuery);
      const overview = disease.overview?.description || disease.transmission?.description || '';
      const matchDesc = overview.toLowerCase().includes(lowerQuery);
      const allSymptoms = [
        ...disease.symptoms.common.map(s => s.name),
        ...disease.symptoms.rare.map(s => s.name),
        ...disease.symptoms.progressive.map(s => s.name),
      ];
      const matchSymptoms = allSymptoms.some(s => s.toLowerCase().includes(lowerQuery));

      if (matchTitle || matchDesc || matchSymptoms) {
        results.push({
          type: 'disease',
          title: disease.name,
          description: overview.slice(0, 80) + '...' || 'Doença rara',
          icon: <Book className="w-5 h-5" />,
          action: () => {
            setSelectedDisease(disease.id);
            setCurrentPage('disease-detail');
          },
          category: disease.category
        });
      }
    });

    // Buscar jogos
    const games = [
      { name: 'Quiz Médico', page: 'quiz', desc: 'Teste seus conhecimentos' },
      { name: 'Jogo da Memória', page: 'memory', desc: 'Encontre os pares' },
      { name: 'Quebra-Cabeça', page: 'puzzle', desc: 'Monte a imagem' },
      { name: 'Colorir', page: 'coloring', desc: 'Arte terapia' },
      { name: 'Forca Médica', page: 'hangman', desc: 'Adivinhe a palavra' },
      { name: 'Jogo de Associação', page: 'matching', desc: 'Associe sintomas' },
      { name: 'Palavras Cruzadas', page: 'crossword', desc: 'Complete o desafio' },
    ];

    games.forEach(game => {
      if (game.name.toLowerCase().includes(lowerQuery) || 
          game.desc.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'game',
          title: game.name,
          description: game.desc,
          icon: <Gamepad2 className="w-5 h-5" />,
          action: () => setCurrentPage(game.page),
          category: 'Jogo'
        });
      }
    });

    // Buscar páginas
    const pages = [
      { name: 'Doenças', page: 'diseases', desc: 'Biblioteca de doenças raras' },
      { name: 'Vídeos', page: 'videos', desc: 'Conteúdo educativo' },
      { name: 'Jogos', page: 'games', desc: 'Hub de jogos' },
      { name: 'Histórias', page: 'stories', desc: 'Histórias inspiracionais' },
      { name: 'Comunidade', page: 'community', desc: 'Fórum e discussões' },
      { name: 'Recursos', page: 'resources', desc: 'Links e materiais' },
    ];

    pages.forEach(page => {
      if (page.name.toLowerCase().includes(lowerQuery) || 
          page.desc.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'page',
          title: page.name,
          description: page.desc,
          icon: <Hash className="w-5 h-5" />,
          action: () => setCurrentPage(page.page),
          category: 'Página'
        });
      }
    });

    return results.slice(0, 8); // Limitar a 8 resultados
  };

  const handleSelectResult = (result: SearchResult) => {
    saveRecentSearch(query);
    result.action();
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  };

  const results = getSearchResults();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-[60]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[61]"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
                  <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    placeholder="Buscar doenças, jogos, vídeos..."
                    className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-lg"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Fechar busca"
                  >
                    <X className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {results.length > 0 ? (
                    <div className="p-2">
                      {/* Header de seção */}
                      {!query && (
                        <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                          <TrendingUp className="w-4 h-4" />
                          Sugestões
                        </div>
                      )}
                      
                      {results.map((result, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() => handleSelectResult(result)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                            selectedIndex === index
                              ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${
                            selectedIndex === index
                              ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                          }`}>
                            {result.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                                {result.title}
                              </h3>
                              {result.category && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                  {result.category}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {result.description}
                            </p>
                          </div>
                          {selectedIndex === index && (
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
                              ↵
                            </kbd>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Nenhum resultado encontrado para "{query}"
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                        Tente buscar por nome de doença, jogo ou página
                      </p>
                    </div>
                  )}

                  {/* Recent Searches */}
                  {!query && recentSearches.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 p-2 mt-2">
                      <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        <Clock className="w-4 h-4" />
                        Buscas Recentes
                      </div>
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(search)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {search}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer com dicas */}
                <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900/50">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs">↑↓</kbd>
                        Navegar
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs">↵</kbd>
                        Selecionar
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs">Esc</kbd>
                        Fechar
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuickSearch;
