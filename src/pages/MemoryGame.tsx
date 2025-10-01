import { useState, useEffect } from 'react';
import { Heart, Sparkles, Clock, Brain, Star, RotateCcw } from 'lucide-react';

interface Card {
  id: number;
  content: string;
  type: 'emoji' | 'text';
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const pairs = [
  { emoji: '🌟', name: 'Síndrome de Down' },
  { emoji: '🧩', name: 'Autismo' },
  { emoji: '💙', name: 'Fibrose Cística' },
  { emoji: '🌈', name: 'Diabetes Tipo 1' },
  { emoji: '✨', name: 'Paralisia Cerebral' }
];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive && !gameComplete) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, gameComplete]);

  const initializeGame = () => {
    const cardPairs: Card[] = [];
    pairs.forEach((pair, index) => {
      cardPairs.push({
        id: index * 2,
        content: pair.emoji,
        type: 'emoji',
        pairId: index,
        isFlipped: false,
        isMatched: false
      });
      cardPairs.push({
        id: index * 2 + 1,
        content: pair.name,
        type: 'text',
        pairId: index,
        isFlipped: false,
        isMatched: false
      });
    });

    setCards(shuffleArray(cardPairs));
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setTime(0);
    setIsGameActive(false);
    setGameComplete(false);
  };

  const handleCardClick = (cardId: number) => {
    if (!isGameActive) {
      setIsGameActive(true);
    }

    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      checkMatch(newFlippedCards);
    }
  };

  const checkMatch = (flippedCardIds: number[]) => {
    const [firstId, secondId] = flippedCardIds;
    const firstCard = cards.find(c => c.id === firstId);
    const secondCard = cards.find(c => c.id === secondId);

    if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
      setTimeout(() => {
        setCards(cards.map(c =>
          c.id === firstId || c.id === secondId
            ? { ...c, isMatched: true }
            : c
        ));
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);

        if (matchedPairs + 1 === pairs.length) {
          setGameComplete(true);
          setIsGameActive(false);
        }
      }, 500);
    } else {
      setTimeout(() => {
        setCards(cards.map(c =>
          c.id === firstId || c.id === secondId
            ? { ...c, isFlipped: false }
            : c
        ));
        setFlippedCards([]);
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
        <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-2xl">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className="relative">
                  <Heart className="w-12 h-12 text-pink-200 animate-pulse" />
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-bounce" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                  Mundo das Diferenças
                </h1>
                <div className="relative">
                  <Heart className="w-12 h-12 text-blue-200 animate-pulse" />
                  <Sparkles className="absolute -top-2 -left-2 w-6 h-6 text-yellow-300 animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
              <div className="text-8xl mb-6">🎉</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Parabéns!</h2>
              <p className="text-2xl text-gray-600 mb-6">
                Você completou o jogo da memória!
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                <div className="bg-blue-50 rounded-lg p-4">
                  <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Tempo</p>
                  <p className="text-2xl font-bold text-gray-800">{formatTime(time)}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Tentativas</p>
                  <p className="text-2xl font-bold text-gray-800">{moves}</p>
                </div>
              </div>

              <p className="text-lg text-gray-600 mb-8">
                {moves <= 8 
                  ? 'Incrível! Você tem uma memória fantástica! 🌟' 
                  : moves <= 15
                  ? 'Muito bem! Você se saiu ótimo! 💪'
                  : 'Parabéns por completar! Continue praticando! 🌈'}
              </p>

              <button
                onClick={initializeGame}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-xl hover:scale-105 transform transition-all duration-200 shadow-lg inline-flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Jogar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-2xl">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="relative">
                <Heart className="w-12 h-12 text-pink-200 animate-pulse" />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-bounce" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Mundo das Diferenças
              </h1>
              <div className="relative">
                <Heart className="w-12 h-12 text-blue-200 animate-pulse" />
                <Sparkles className="absolute -top-2 -left-2 w-6 h-6 text-yellow-300 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-purple-100 font-medium">
              Jogo da Memória das Doenças Raras 🧠
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🧠 Jogo da Memória das Doenças Raras 🧠</h2>
            <p className="text-lg text-gray-600 mb-6">Encontre os pares! Combine cada emoji com o nome da doença correspondente.</p>
            
            <div className="flex justify-center gap-6 mb-6">
              <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-gray-800">{formatTime(time)}</span>
                </div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  <span className="font-semibold text-gray-800">{moves} tentativas</span>
                </div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-gray-800">{matchedPairs}/{pairs.length} pares</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`aspect-square rounded-xl border-4 cursor-pointer transition-all duration-300 transform ${
                    card.isMatched
                      ? 'bg-gradient-to-br from-green-200 to-green-300 border-green-400 scale-95 opacity-60'
                      : card.isFlipped
                      ? 'bg-white border-purple-400 scale-105'
                      : 'bg-gradient-to-br from-purple-200 to-pink-200 border-purple-300 hover:from-purple-300 hover:to-pink-300 hover:scale-105'
                  }`}
                >
                  <div className="h-full flex items-center justify-center p-2">
                    {card.isFlipped || card.isMatched ? (
                      card.type === 'emoji' ? (
                        <div className="text-4xl md:text-5xl">{card.content}</div>
                      ) : (
                        <div className="text-xs md:text-sm font-bold text-gray-800 text-center leading-tight">
                          {card.content}
                        </div>
                      )
                    ) : (
                      <div className="text-4xl md:text-5xl opacity-50">❓</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-blue-400 mb-6">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              Como Jogar:
            </h3>
            <ul className="text-gray-700 space-y-1">
              <li>• Clique em duas cartas para virá-las</li>
              <li>• Encontre o par correto: emoji + nome da doença</li>
              <li>• Quando encontrar um par, as cartas ficam viradas</li>
              <li>• Continue até encontrar todos os pares!</li>
            </ul>
          </div>

          <div className="text-center">
            <button
              onClick={initializeGame}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reiniciar Jogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
