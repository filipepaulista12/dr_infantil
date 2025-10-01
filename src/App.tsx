import React from 'react';
import { useAppStore } from './stores/useAppStore';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DiseaseLibrary from './pages/DiseaseLibrary';
import DiseaseDetail from './pages/DiseaseDetail';
import VideoLibrary from './pages/VideoLibrary';
import GamesHub from './pages/GamesHub';
import Quiz from './pages/Quiz';
import MemoryGame from './pages/MemoryGame';
import PuzzleGame from './pages/PuzzleGame';
import ColoringGame from './pages/ColoringGame';
import HangmanGame from './pages/HangmanGame';
import Stories from './pages/Stories';
import Community from './pages/Community';
import Resources from './pages/Resources';
import LoadingScreen from './components/common/LoadingScreen';

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
      case 'disease-detail':
        return <DiseaseDetail />;
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
        return <Stories />;
      case 'community':
        return <Community />;
      case 'resources':
        return <Resources />;
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