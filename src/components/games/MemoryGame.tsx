import { useState, useEffect } from 'react';

interface MemoryCard {
  id: string;
  content: string;
  type: 'disease' | 'description';
  pairId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryPair {
  id: string;
  disease: string;
  emoji: string;
  description: string;
}

const memoryPairs: MemoryPair[] = [
  {
    id: 'pair-down',
    disease: 'Síndrome de Down',
    emoji: '☀️',
    description: 'Cromossomo extra, coração grande!'
  },
  {
    id: 'pair-autism',
    disease: 'Autismo',
    emoji: '🌈',
    description: 'Mundo especial e único!'
  },
  {
    id: 'pair-williams',
    disease: 'Síndrome de Williams',
    emoji: '🎵',
    description: 'Amam música e amizades!'
  },
  {
    id: 'pair-cerebral',
    disease: 'Paralisia Cerebral',
    emoji: '💪',
    description: 'Fortes e determinados!'
  },
  {
    id: 'pair-rett',
    disease: 'Síndrome de Rett',
    emoji: '🌸',
    description: 'Delicadas e especiais!'
  },
  {
    id: 'pair-prader',
    disease: 'Síndrome de Prader-Willi',
    emoji: '🤗',
    description: 'Carinhosos e únicos!'
  }
];

interface MemoryGameProps {
  onBack: () => void;
}

const MemoryGame = ({ onBack }: MemoryGameProps) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const getDifficultyPairs = () => {
    switch (difficulty) {
      case 'easy': return memoryPairs.slice(0, 3);
      case 'medium': return memoryPairs.slice(0, 4);
      case 'hard': return memoryPairs;
      default: return memoryPairs.slice(0, 3);
    }
  };

  const initializeGame = () => {
    const pairsToUse = getDifficultyPairs();
    const gameCards: MemoryCard[] = [];

    // Create cards for each pair
    pairsToUse.forEach(pair => {
      // Disease card
      gameCards.push({
        id: `${pair.id}-disease`,
        content: `${pair.emoji} ${pair.disease}`,
        type: 'disease',
        pairId: pair.id,
        isFlipped: false,
        isMatched: false
      });

      // Description card
      gameCards.push({
        id: `${pair.id}-description`,
        content: pair.description,
        type: 'description',
        pairId: pair.id,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameCompleted(false);
  };

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.pairId === firstCard.pairId 
              ? { ...card, isMatched: true, isFlipped: true }
              : card
          ));
          setMatchedPairs(prev => [...prev, firstCard.pairId]);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            flippedCards.includes(card.id)
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1500);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    const totalPairs = getDifficultyPairs().length;
    if (matchedPairs.length === totalPairs && totalPairs > 0) {
      setGameCompleted(true);
    }
  }, [matchedPairs, difficulty]);

  const handleCardClick = (cardId: string) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isMatched || card.isFlipped) return;

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    
    setFlippedCards(prev => [...prev, cardId]);
  };

  const getScoreMessage = () => {
    const totalPairs = getDifficultyPairs().length;
    const efficiency = totalPairs / moves;
    
    if (efficiency >= 0.8) return "🌟 Incrível! Memória de elefante! 🌟";
    if (efficiency >= 0.6) return "🎉 Muito bem! Ótima memória! 🎉";
    if (efficiency >= 0.4) return "😊 Bom trabalho! Continue praticando! 😊";
    return "💪 Parabéns! Você conseguiu! 💪";
  };

  const getGridCols = () => {
    const totalCards = getDifficultyPairs().length * 2;
    if (totalCards <= 6) return 'grid-cols-3';
    if (totalCards <= 8) return 'grid-cols-4';
    return 'grid-cols-4';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white bg-opacity-20 text-white rounded-full font-body hover:bg-opacity-30 transition-all"
        >
          ← Voltar ao Menu
        </button>

        {/* Header */}
        <div className="text-center mb-8 text-white">
          <h1 className="text-4xl font-heading font-bold mb-2">
            🧠 Jogo da Memória das Doenças Raras 🧠
          </h1>
          <p className="text-xl font-body">
            Encontre os pares: doença e sua descrição!
          </p>
        </div>

        {/* Game Controls */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Difficulty Selection */}
            <div className="flex flex-col items-center">
              <p className="font-heading font-bold text-gray-800 mb-2">Dificuldade:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setDifficulty('easy')}
                  className={`px-4 py-2 rounded-full font-body font-medium transition-all ${
                    difficulty === 'easy' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  😊 Fácil (3 pares)
                </button>
                <button
                  onClick={() => setDifficulty('medium')}
                  className={`px-4 py-2 rounded-full font-body font-medium transition-all ${
                    difficulty === 'medium' 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  🤔 Médio (4 pares)
                </button>
                <button
                  onClick={() => setDifficulty('hard')}
                  className={`px-4 py-2 rounded-full font-body font-medium transition-all ${
                    difficulty === 'hard' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  😤 Difícil (6 pares)
                </button>
              </div>
            </div>

            {/* Game Stats */}
            <div className="text-center">
              <p className="font-heading font-bold text-gray-800 text-lg">
                🎯 Movimentos: {moves}
              </p>
              <p className="font-body text-gray-600">
                🏆 Pares encontrados: {matchedPairs.length}/{getDifficultyPairs().length}
              </p>
            </div>

            {/* New Game Button */}
            <button
              onClick={initializeGame}
              className="px-6 py-3 bg-purple-500 text-white rounded-full font-body font-medium hover:bg-purple-600 transition-all"
            >
              🔄 Novo Jogo
            </button>
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className={`grid ${getGridCols()} gap-4`}>
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`
                  aspect-square rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105
                  ${card.isFlipped || card.isMatched
                    ? (card.type === 'disease' 
                        ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white' 
                        : 'bg-gradient-to-br from-green-400 to-green-600 text-white'
                      )
                    : 'bg-gradient-to-br from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500'
                  }
                  ${card.isMatched ? 'ring-4 ring-yellow-400' : ''}
                `}
              >
                <div className="h-full flex items-center justify-center p-3">
                  {card.isFlipped || card.isMatched ? (
                    <p className="text-center font-body font-medium text-sm leading-tight">
                      {card.content}
                    </p>
                  ) : (
                    <div className="text-4xl">❓</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Game Tips */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-heading font-bold text-blue-800 mb-2">
              💡 Como jogar:
            </h4>
            <div className="text-sm text-blue-700 font-body space-y-1">
              <p>• Clique em duas cartas para virá-las</p>
              <p>• Encontre a doença e sua descrição correspondente</p>
              <p>• Cartas <span className="font-bold text-blue-600">azuis</span> são nomes das doenças</p>
              <p>• Cartas <span className="font-bold text-green-600">verdes</span> são as descrições</p>
              <p>• Memorize onde estão as cartas para fazer menos movimentos!</p>
            </div>
          </div>
        </div>

        {/* Completion Message */}
        {gameCompleted && (
          <div className="bg-white rounded-3xl p-8 text-center shadow-lg">
            <div className="text-6xl mb-4">🎊</div>
            <h2 className="text-3xl font-heading font-bold text-green-600 mb-4">
              {getScoreMessage()}
            </h2>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-heading font-bold text-green-700">
                    {moves}
                  </p>
                  <p className="text-sm text-green-600 font-body">Movimentos</p>
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-green-700">
                    {matchedPairs.length}
                  </p>
                  <p className="text-sm text-green-600 font-body">Pares encontrados</p>
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-green-700">
                    {Math.round((getDifficultyPairs().length / moves) * 100)}%
                  </p>
                  <p className="text-sm text-green-600 font-body">Eficiência</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={initializeGame}
                className="px-6 py-3 bg-purple-500 text-white rounded-full font-body font-medium hover:bg-purple-600 transition-all"
              >
                🎮 Jogar Novamente
              </button>
              <button 
                onClick={() => {
                  const nextDifficulty = difficulty === 'easy' ? 'medium' : difficulty === 'medium' ? 'hard' : 'easy';
                  setDifficulty(nextDifficulty);
                }}
                className="px-6 py-3 bg-pink-500 text-white rounded-full font-body font-medium hover:bg-pink-600 transition-all"
              >
                🚀 Próximo Nível
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;