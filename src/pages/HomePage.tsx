import React, { useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Heart, Sparkles, Play, Gamepad2, Brain, Puzzle, Palette, Type, BookOpen, Users, Send } from 'lucide-react';
import { trackPageView } from '../utils/analytics';

const HomePage: React.FC = () => {
  const { setCurrentPage } = useAppStore();

  useEffect(() => {
    trackPageView('home');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Header com design do template */}
      <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-2xl relative overflow-hidden">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              {/* Coração esquerdo com Sparkle */}
              <div className="relative">
                <Heart className="w-12 h-12 text-pink-200 animate-pulse" />
                <Sparkles className="w-6 h-6 text-yellow-300 animate-bounce absolute -top-2 -right-2" />
              </div>

              {/* Título */}
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Mundo das Diferenças
              </h1>

              {/* Coração direito com Sparkle */}
              <div className="relative">
                <Heart className="w-12 h-12 text-blue-200 animate-pulse" />
                <Sparkles 
                  className="w-6 h-6 text-yellow-300 animate-bounce absolute -top-2 -left-2" 
                  style={{ animationDelay: '0.5s' }}
                />
              </div>
            </div>

            <p className="text-xl md:text-2xl text-purple-100 font-medium mb-2">
              Aprendendo sobre doenças raras com carinho e diversão! 🌈
            </p>
            <p className="text-lg text-purple-200 max-w-3xl mx-auto">
              Um lugar especial onde crianças podem entender que ser diferente é ser único e maravilhoso ✨
            </p>
          </div>

          {/* Decorações animadas */}
          <div className="absolute top-4 left-4 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }}>
            ⭐
          </div>
          <div className="absolute top-8 right-8 text-pink-300 animate-bounce" style={{ animationDelay: '1s' }}>
            🦄
          </div>
          <div className="absolute bottom-4 left-8 text-blue-300 animate-pulse" style={{ animationDelay: '2s' }}>
            🌟
          </div>
          <div className="absolute bottom-6 right-4 text-green-300 animate-bounce" style={{ animationDelay: '1.5s' }}>
            🌈
          </div>
        </div>
      </header>

      {/* Navegação por Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
          <button
            onClick={() => setCurrentPage('diseases')}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg text-xs md:text-base bg-pink-500 hover:bg-pink-600 shadow-xl scale-105"
          >
            <Heart className="w-3.5 h-3.5 md:w-5 md:h-5" />
            <span className="hidden sm:inline text-xs md:text-sm">Doenças Raras</span>
            <span className="sm:hidden text-xs">Doenças</span>
          </button>

          <button
            onClick={() => setCurrentPage('videos')}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg text-xs md:text-base bg-gray-400 hover:bg-gray-500"
          >
            <Play className="w-3.5 h-3.5 md:w-5 md:h-5" />
            <span className="hidden sm:inline text-xs md:text-sm">Vídeos</span>
            <span className="sm:hidden text-xs">Vídeos</span>
          </button>

          <button
            onClick={() => setCurrentPage('quiz')}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg text-xs md:text-base bg-gray-400 hover:bg-gray-500"
          >
            <Gamepad2 className="w-3.5 h-3.5 md:w-5 md:h-5" />
            <span className="hidden sm:inline text-xs md:text-sm">Quiz</span>
            <span className="sm:hidden text-xs">Quiz</span>
          </button>

          <button
            onClick={() => setCurrentPage('memory')}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg text-xs md:text-base bg-gray-400 hover:bg-gray-500"
          >
            <Brain className="w-3.5 h-3.5 md:w-5 md:h-5" />
            <span className="hidden sm:inline text-xs md:text-sm">Memória</span>
            <span className="sm:hidden text-xs">Memória</span>
          </button>

          <button
            onClick={() => setCurrentPage('puzzle')}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg text-xs md:text-base bg-gray-400 hover:bg-gray-500"
          >
            <Puzzle className="w-3.5 h-3.5 md:w-5 md:h-5" />
            <span className="hidden sm:inline text-xs md:text-sm">Quebra-Cabeças</span>
            <span className="sm:hidden text-xs">Quebra-Cabeças</span>
          </button>

          <button
            onClick={() => setCurrentPage('coloring')}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg text-xs md:text-base bg-gray-400 hover:bg-gray-500"
          >
            <Palette className="w-3.5 h-3.5 md:w-5 md:h-5" />
            <span className="hidden sm:inline text-xs md:text-sm">Colorir</span>
            <span className="sm:hidden text-xs">Colorir</span>
          </button>

          <button
            onClick={() => setCurrentPage('hangman')}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg text-xs md:text-base bg-gray-400 hover:bg-gray-500"
          >
            <Type className="w-3.5 h-3.5 md:w-5 md:h-5" />
            <span className="hidden sm:inline text-xs md:text-sm">Jogo da Forca</span>
            <span className="sm:hidden text-xs">Jogo</span>
          </button>
        </div>

        {/* Conteúdo Principal - Seções em Destaque */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Bem-vindo ao Mundo das Diferenças! 🎈
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Escolha uma das seções acima para começar sua aventura de aprendizado e diversão!
            </p>
          </div>

          {/* Cards de Destaque */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card NOVO: Biblioteca Expandida */}
            <div 
              onClick={() => setCurrentPage('new-diseases')}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-4 border-gradient-to-r from-purple-500 to-pink-500 cursor-pointer group relative"
            >
              <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                🆕 NOVO!
              </div>
              <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-8 flex items-center justify-center relative">
                <BookOpen className="w-20 h-20 text-white group-hover:scale-110 transition-transform duration-300" />
                <Sparkles className="w-8 h-8 text-yellow-300 absolute top-4 left-4 animate-pulse" />
                <Sparkles className="w-8 h-8 text-yellow-300 absolute bottom-4 right-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3 flex items-center gap-2">
                  <span>Nova Biblioteca</span>
                  <span className="text-2xl">✨</span>
                </h3>
                <p className="text-gray-600 leading-relaxed font-semibold">
                  Explore 7+ novas doenças com conteúdo completo: para crianças, pais e científico! 🎯
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Neurológicas</span>
                  <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">Cardíacas</span>
                </div>
              </div>
            </div>

            {/* Card Doenças Raras */}
            <div 
              onClick={() => setCurrentPage('diseases')}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-pink-200 cursor-pointer group"
            >
              <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-8 flex items-center justify-center relative">
                <Heart className="w-20 h-20 text-white group-hover:scale-110 transition-transform duration-300" />
                <Sparkles className="w-8 h-8 text-yellow-300 absolute top-4 right-4 animate-pulse" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>Doenças Raras</span>
                  <span className="text-2xl">💝</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Aprenda sobre diferentes condições de forma carinhosa e educativa, com informações adaptadas para você!
                </p>
              </div>
            </div>

            {/* Card Vídeos */}
            <div 
              onClick={() => setCurrentPage('videos')}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-blue-200 cursor-pointer group"
            >
              <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-8 flex items-center justify-center relative">
                <Play className="w-20 h-20 text-white group-hover:scale-110 transition-transform duration-300" />
                <Sparkles className="w-8 h-8 text-yellow-300 absolute top-4 right-4 animate-pulse" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>Vídeos Educativos</span>
                  <span className="text-2xl">🎬</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Assista a vídeos especiais que explicam de forma divertida e emocionante sobre ser diferente e especial!
                </p>
              </div>
            </div>
          </div>

          {/* Segunda linha de cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card Jogos */}
            <div 
              onClick={() => setCurrentPage('quiz')}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-green-200 cursor-pointer group"
            >
              <div className="bg-gradient-to-br from-green-400 to-teal-500 p-8 flex items-center justify-center relative">
                <Gamepad2 className="w-20 h-20 text-white group-hover:scale-110 transition-transform duration-300" />
                <Sparkles className="w-8 h-8 text-yellow-300 absolute top-4 right-4 animate-pulse" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>Jogos Divertidos</span>
                  <span className="text-2xl">🎮</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Aprenda brincando com jogos educativos, quiz, memória, quebra-cabeças e muito mais!
                </p>
              </div>
            </div>
          </div>

          {/* Seção de Recursos Adicionais */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-2">
                <Users className="w-8 h-8 text-purple-500" />
                <span>Recursos Adicionais</span>
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore mais conteúdos para continuar aprendendo e se divertindo!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setCurrentPage('submit-content')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-5 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-3 transform hover:scale-105 shadow-lg"
              >
                <Send className="w-6 h-6" />
                <div className="text-left">
                  <div>Compartilhe Conhecimento</div>
                  <div className="text-sm font-normal opacity-90">
                    Contribua com conteúdo
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setCurrentPage('stories')}
                className="bg-gradient-to-r from-orange-400 to-pink-500 text-white p-4 rounded-xl font-semibold hover:from-orange-500 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-3 transform hover:scale-105"
              >
                <BookOpen className="w-6 h-6" />
                <span>Histórias Inspiradoras</span>
              </button>

              <button
                onClick={() => setCurrentPage('community')}
                className="bg-gradient-to-r from-purple-400 to-blue-500 text-white p-4 rounded-xl font-semibold hover:from-purple-500 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-3 transform hover:scale-105"
              >
                <Users className="w-6 h-6" />
                <span>Comunidade</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;