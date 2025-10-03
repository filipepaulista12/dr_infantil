import React from 'react';
import { useAppStore } from './stores/useAppStore';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DiseaseLibrary from './pages/DiseaseLibrary';
import DiseaseLibraryAPI from './pages/DiseaseLibraryAPI';
import DiseaseDetail from './pages/DiseaseDetail';
import DiseaseDetailAPI from './pages/DiseaseDetailAPI';
import VideoLibrary from './pages/VideoLibrary';
import GamesHub from './pages/GamesHub';
import Quiz from './pages/Quiz';
import MemoryGame from './pages/MemoryGame';
import PuzzleGame from './pages/PuzzleGame';
import ColoringGame from './pages/ColoringGame';
import HangmanGame from './pages/HangmanGame';
import Stories from './pages/Stories';
import Community from './pages/Community';
import CommunityAPI from './pages/CommunityAPI';
import Resources from './pages/Resources';
import FavoritesPage from './pages/FavoritesPage';
import SystemTestPage from './pages/SystemTestPage';
import LoginTestPage from './pages/LoginTestPage';
import LoadingScreen from './components/common/LoadingScreen';
import FeedbackButton from './components/common/FeedbackButton';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import SkipLink from './components/common/SkipLink';
import SubmitContent from './pages/SubmitContent';
import ModerationPanel from './components/community/ModerationPanel';
import { loadSubmissions, moderateSubmission } from './utils/submissionStorage';

const App: React.FC = () => {
  const { currentPage, isLoading } = useAppStore();

  console.log('🚀 App renderizado - currentPage:', currentPage, 'isLoading:', isLoading);

  // Show loading screen while initializing
  if (isLoading) {
    return <LoadingScreen />;
  }

  const renderCurrentPage = () => {
    // Use DiseaseLibraryAPI se backend estiver configurado, senão use versão estática
    const useDiseaseAPI = import.meta.env.VITE_USE_API === 'true';

    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'diseases':
        return useDiseaseAPI ? <DiseaseLibraryAPI /> : <DiseaseLibrary />;
      case 'disease-detail':
        return useDiseaseAPI ? <DiseaseDetailAPI /> : <DiseaseDetail />;
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
        return useDiseaseAPI ? <CommunityAPI /> : <Community />;
      case 'resources':
        return <Resources />;
      case 'favorites':
        return <FavoritesPage />;
      case 'system-test':
        return <SystemTestPage />;
      case 'login-test':
        return <LoginTestPage />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'submit-content':
        return <SubmitContent />;
      case 'moderation-panel':
        return (
          <ModerationPanel
            submissions={loadSubmissions()}
            onModerate={(_id, response) => {
              moderateSubmission(response);
              window.location.reload(); // Recarregar para atualizar lista
            }}
          />
        );
      default:
        return <HomePage />;
    }
  };

  try {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1">
          {renderCurrentPage()}
        </main>
        <Footer />
        <FeedbackButton />
      </div>
    );
  } catch (error) {
    console.error('❌ Erro fatal no App:', error);
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erro na Aplicação</h1>
          <p className="text-gray-700 mb-4">
            Ocorreu um erro ao carregar a aplicação. Por favor, recarregue a página.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      </div>
    );
  }
};

export default App;