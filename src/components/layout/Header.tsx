import React, { useState, useEffect, useRef } from 'react';
import { Heart, Menu, X, User, LogIn } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';
import UserMenu from '../auth/UserMenu';
import { authAPI } from '../../services/api';

const Header: React.FC = () => {
  const { currentPage, setCurrentPage } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Carregar usuário do localStorage
  useEffect(() => {
    const storedUser = authAPI.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Fechar menu de usuário ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleLoginSuccess = (loggedInUser: any) => {
    setUser(loggedInUser);
    setIsLoginOpen(false);
  };

  const handleRegisterSuccess = (registeredUser: any) => {
    setUser(registeredUser);
    setIsRegisterOpen(false);
  };

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setIsUserMenuOpen(false);
  };

  const navigationItems = [
    { id: 'home', label: 'Início', href: '/' },
    { id: 'diseases', label: 'Doenças', href: '/diseases' },
    { id: 'videos', label: 'Vídeos', href: '/videos' },
    { id: 'games', label: 'Jogos', href: '/games' },
    { id: 'stories', label: 'Histórias', href: '/stories' },
    { id: 'community', label: 'Comunidade', href: '/community' },
    { id: 'resources', label: 'Recursos', href: '/resources' },
    { id: 'favorites', label: 'Favoritos', href: '/favorites' }
  ];

  const handleNavigation = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
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
            
            {/* Auth Buttons */}
            <div className="ml-4 flex items-center gap-2">
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-all"
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                    <span className="font-semibold">{user.name.split(' ')[0]}</span>
                  </button>
                  {isUserMenuOpen && <UserMenu user={user} onLogout={handleLogout} />}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-all"
                  >
                    <LogIn className="w-5 h-5" />
                    <span className="font-semibold">Entrar</span>
                  </button>
                  <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-purple-600 font-bold hover:shadow-lg transition-all"
                  >
                    <User className="w-5 h-5" />
                    <span>Cadastrar</span>
                  </button>
                </>
              )}
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
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 space-y-2 border-t border-white/20">
                {user ? (
                  <>
                    <div className="px-3 py-2 bg-white/20 rounded-lg">
                      <p className="font-bold">{user.name}</p>
                      <p className="text-xs text-white/80">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 font-semibold"
                    >
                      🚪 Sair
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { setIsLoginOpen(true); setIsMobileMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 font-semibold"
                    >
                      🔑 Entrar
                    </button>
                    <button
                      onClick={() => { setIsRegisterOpen(true); setIsMobileMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg bg-white text-purple-600 hover:shadow-lg font-bold"
                    >
                      ✨ Cadastrar
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
    
    {/* Modals */}
    <LoginModal
      isOpen={isLoginOpen}
      onClose={() => setIsLoginOpen(false)}
      onSwitchToRegister={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }}
      onLoginSuccess={handleLoginSuccess}
    />
    <RegisterModal
      isOpen={isRegisterOpen}
      onClose={() => setIsRegisterOpen(false)}
      onSwitchToLogin={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }}
      onRegisterSuccess={handleRegisterSuccess}
    />
  </>
  );
};

export default Header;