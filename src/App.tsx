import React from 'react';
import { useAppStore } from './stores/useAppStore';

const SimpleHomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
    <div className="text-center max-w-4xl mx-auto p-8">
      <h1 className="text-5xl font-bold text-gray-800 mb-6">
        🏥 DR Infantil
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Informações confiáveis sobre saúde infantil
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-semibold">Biblioteca</h3>
          <p className="text-gray-600">Informações sobre doenças</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-4xl mb-4">🎥</div>
          <h3 className="text-xl font-semibold">Vídeos</h3>
          <p className="text-gray-600">Conteúdo educativo</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-4xl mb-4">🎮</div>
          <h3 className="text-xl font-semibold">Jogos</h3>
          <p className="text-gray-600">Aprender brincando</p>
        </div>
      </div>
    </div>
  </div>
);

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

  console.log('App rendering - currentPage:', currentPage);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <SimpleHomePage />;
      case 'diseases':
        return <TempPage title="Biblioteca de Doenças" emoji="📚" />;
      case 'videos':
        return <TempPage title="Videoteca" emoji="🎥" />;
      case 'games':
        return <TempPage title="Jogos Educativos" emoji="🎮" />;
      case 'stories':
        return <TempPage title="Histórias Especiais" emoji="📖" />;
      case 'community':
        return <TempPage title="Comunidade" emoji="👥" />;
      case 'resources':
        return <TempPage title="Centro de Recursos" emoji="🔍" />;
      default:
        return <SimpleHomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentPage()}
    </div>
  );
};

export default App;