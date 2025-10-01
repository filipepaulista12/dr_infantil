import React from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

const VideoLibrary: React.FC = () => {
  const { setCurrentPage } = useAppStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            📹 Biblioteca de Vídeos
          </h1>
          <p className="text-gray-600 mb-6">
            Assista vídeos educativos sobre saúde e bem-estar para crianças.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border">
              <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 p-16 flex items-center justify-center">
                <div className="text-6xl">🧼</div>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-blue-600 ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Como Lavar as Mãos
                </h3>
                <p className="text-gray-600 text-sm">
                  Aprenda a técnica correta para lavar as mãos e prevenir doenças
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLibrary;