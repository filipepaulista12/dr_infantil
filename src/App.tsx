import React from 'react';
import { useAppStore } from './stores/useAppStore';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import VideoLibrary from './pages/VideoLibrary';
import GamesHub from './pages/GamesHub';
import Stories from './pages/Stories';
import Community from './pages/Community';
import Resources from './pages/Resources';

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
  const { currentPage } = useAppStore();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'diseases':
        return <TempPage title="Biblioteca de Doenças" emoji="📚" />;
      case 'videos':
        return <VideoLibrary />;
      case 'games':
        return <GamesHub />;
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