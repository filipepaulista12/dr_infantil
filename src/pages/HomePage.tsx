import React from 'react';
import { useAppStore } from '../stores/useAppStore';

const HomePage: React.FC = () => {
  const { setCurrentPage } = useAppStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="text-center py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-6xl mb-6">🏥</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            DR Infantil
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Educação em saúde de forma divertida e segura para crianças
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => setCurrentPage('diseases')}
            className="bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Biblioteca de Doenças</h3>
              <p className="text-white/90 text-sm">Aprenda sobre diferentes condições de saúde</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentPage('videos')}
            className="bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">📹</div>
              <h3 className="text-xl font-semibold mb-2">Vídeos Educativos</h3>
              <p className="text-white/90 text-sm">Assista conteúdo educativo sobre saúde</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentPage('games')}
            className="bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold mb-2">Jogos Educativos</h3>
              <p className="text-white/90 text-sm">Aprenda brincando com jogos divertidos</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;