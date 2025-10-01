import React from 'react';
import { ArrowLeft, Play, Brain, Palette, Type, Puzzle, Sparkles } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

const GamesHub: React.FC = () => {
  const { setCurrentPage } = useAppStore();

  const games = [
    {
      id: 'quiz',
      title: 'Quiz Divertido',
      emoji: '🎯',
      icon: Brain,
      description: 'Teste seus conhecimentos sobre saúde com perguntas interativas!',
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600'
    },
    {
      id: 'memory',
      title: 'Jogo da Memória',
      emoji: '🧠',
      icon: Sparkles,
      description: 'Encontre os pares e aprenda sobre doenças raras!',
      color: 'from-blue-500 to-indigo-500',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-600'
    },
    {
      id: 'puzzle',
      title: 'Quebra-Cabeça',
      emoji: '🧩',
      icon: Puzzle,
      description: 'Monte o quebra-cabeça e descubra informações importantes!',
      color: 'from-green-500 to-teal-500',
      hoverColor: 'hover:from-green-600 hover:to-teal-600'
    },
    {
      id: 'coloring',
      title: 'Colorir',
      emoji: '🎨',
      icon: Palette,
      description: 'Solte a criatividade colorindo desenhos sobre inclusão!',
      color: 'from-pink-500 to-rose-500',
      hoverColor: 'hover:from-pink-600 hover:to-rose-600'
    },
    {
      id: 'hangman',
      title: 'Jogo da Forca',
      emoji: '📝',
      icon: Type,
      description: 'Descubra palavras importantes sobre valores e inclusão!',
      color: 'from-orange-500 to-red-500',
      hoverColor: 'hover:from-orange-600 hover:to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Casa
          </button>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                <span className="text-5xl">🎮</span>
                Central de Jogos
                <span className="text-5xl">🎮</span>
              </h1>
              <p className="text-xl text-gray-600">
                Aprenda sobre saúde e inclusão de forma divertida com nossos jogos educativos!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => {
                const Icon = game.icon;
                return (
                  <div
                    key={game.id}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-purple-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-5xl">{game.emoji}</div>
                      <Icon className="text-purple-600" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {game.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {game.description}
                    </p>
                    <button
                      onClick={() => setCurrentPage(game.id as any)}
                      className={`w-full bg-gradient-to-r ${game.color} ${game.hoverColor} text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 shadow-md`}
                    >
                      <Play className="w-5 h-5" />
                      Jogar Agora
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Seção de Estatísticas/Dicas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 text-center border-2 border-purple-200">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-bold text-gray-800 mb-2">5 Jogos</h3>
              <p className="text-gray-600 text-sm">Diversos jogos para aprender brincando!</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-6 text-center border-2 border-blue-200">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-gray-800 mb-2">100% Educativo</h3>
              <p className="text-gray-600 text-sm">Aprenda sobre saúde de forma divertida!</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl p-6 text-center border-2 border-green-200">
              <div className="text-4xl mb-3">💡</div>
              <h3 className="font-bold text-gray-800 mb-2">Inclusivo</h3>
              <p className="text-gray-600 text-sm">Jogos acessíveis para todas as crianças!</p>
            </div>
          </div>

          {/* Mensagem Motivacional */}
          <div className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 text-center border-2 border-yellow-200">
            <div className="text-5xl mb-4">🌟</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Divirta-se e aprenda ao mesmo tempo! 🎉
            </h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Cada jogo foi criado com carinho para ensinar sobre inclusão, saúde e empatia. 
              Escolha seu favorito e comece a aventura! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesHub;