import React from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

const GamesHub: React.FC = () => {
  const { setCurrentPage } = useAppStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 text-green-600 hover:text-green-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            🎮 Central de Jogos
          </h1>
          <p className="text-gray-600 mb-6">
            Aprenda sobre saúde de forma divertida com nossos jogos educativos!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border">
              <div className="text-4xl mb-4">🧩</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Quebra-Cabeça do Corpo Humano
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Monte um quebra-cabeça e aprenda sobre as partes do corpo
              </p>
              <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                <Play className="w-4 h-4" />
                Jogar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesHub;