import React from 'react';
import { Heart, Menu, X, LogIn, BarChart3, Send } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import ThemeToggle from '../common/ThemeToggle';

const Header: React.FC = () => {
  const { currentPage, setCurrentPage } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigationItems = [
    { id: 'home', label: 'Início', href: '/' },
    { id: 'diseases', label: 'Doenças', href: '/diseases' },
    { id: 'videos', label: 'Vídeos', href: '/videos' },
    { id: 'games', label: 'Jogos', href: '/games' },
    { id: 'stories', label: 'Histórias', href: '/stories' },
    { id: 'community', label: 'Comunidade', href: '/community' },
    { id: 'resources', label: 'Recursos', href: '/resources' }
  ];

  const handleNavigation = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            <div className="bg-white p-2 rounded-full">
              <Heart className="h-6 w-6 text-pink-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold">DR Infantil</h1>
              <p className="text-xs opacity-90">Mundo das Diferenças</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/20 ${
                  currentPage === item.id 
                    ? 'bg-white/30 shadow-sm' 
                    : ''
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Login Button */}
            <div className="ml-4 border-l border-white/20 pl-4 flex items-center gap-2">
              <ThemeToggle />
              
              <button
                onClick={() => handleNavigation('submit-content')}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 px-4 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105 shadow-lg"
                aria-label="Contribuir com conteúdo"
                title="Compartilhe seu conhecimento"
              >
                <Send className="w-4 h-4" />
                <span className="hidden lg:inline">Contribuir</span>
              </button>
              
              <button
                onClick={() => handleNavigation('analytics')}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full text-sm font-medium transition-all"
                aria-label="Ver Analytics"
                title="Dashboard de Analytics"
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => alert('Sistema de login será implementado em breve!\n\nUse as credenciais:\nadmin@drinfantil.com.br / admin123')}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-all"
              >
                <LogIn className="w-4 h-4" />
                Entrar
              </button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/20 ${
                    currentPage === item.id 
                      ? 'bg-white/30 shadow-sm' 
                      : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
