import React from 'react';
import { useAppStore } from './stores/useAppStore';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DiseaseLibrary from './pages/DiseaseLibrary';
// import DiseaseDetail from './pages/DiseaseDetail';
import VideoLibrary from './pages/VideoLibrary';
import GamesHub from './pages/GamesHub';
import Quiz from './pages/Quiz';
import MemoryGame from './pages/MemoryGame';
import PuzzleGame from './pages/PuzzleGame';
import ColoringGame from './pages/ColoringGame';
import HangmanGame from './pages/HangmanGame';
import LoadingScreen from './components/common/LoadingScreen';

// Temporary pages (will be replaced with full implementations)
const TempPage: React.FC<{ title: string; emoji: string }> = ({ title, emoji }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
    <div className="text-center">
      <div className="text-6xl mb-4">{emoji}</div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600">Em desenvolvimento...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const { currentPage, isLoading } = useAppStore();

  // Show loading screen while initializing
  if (isLoading) {
    return <LoadingScreen />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'diseases':
        return <DiseaseLibrary />;
      case 'videos':
        return <VideoLibrary />;
      case 'games':
        return <GamesHub />;
      case 'quiz':
        return <Quiz />;
      case 'memory':
        return <MemoryGame />;
      case 'puzzle':
        return <PuzzleGame />;
      case 'coloring':
        return <ColoringGame />;
      case 'hangman':
        return <HangmanGame />;
      case 'stories':
        return <TempPage title="Histórias Especiais" emoji="📖" />;
      case 'community':
        return <TempPage title="Comunidade" emoji="👥" />;
      case 'resources':
        return <TempPage title="Centro de Recursos" emoji="🔍" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;