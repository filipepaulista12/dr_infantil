import { useState, useEffect } from 'react';
import { Heart, Star, AlertCircle, Trophy, Lightbulb, RotateCcw } from 'lucide-react';
import { trackEvent, trackPageView } from '../utils/analytics';

interface WordData {
  word: string;
  hint: string;
  category: string;
  emoji: string;
}

const words: WordData[] = [
  {
    word: 'CUIDADO',
    hint: 'Atenção e carinho que devemos ter com todos',
    category: 'Valores',
    emoji: '💝'
  },
  {
    word: 'RESPEITO',
    hint: 'Tratar todos com consideração e gentileza',
    category: 'Valores',
    emoji: '🤝'
  },
  {
    word: 'INCLUSAO',
    hint: 'Fazer todos se sentirem parte do grupo',
    category: 'Valores',
    emoji: '🌈'
  },
  {
    word: 'EMPATIA',
    hint: 'Se colocar no lugar do outro',
    category: 'Valores',
    emoji: '💗'
  },
  {
    word: 'AMIZADE',
    hint: 'Laço especial entre pessoas que se importam',
    category: 'Valores',
    emoji: '🤗'
  },
  {
    word: 'CARINHO',
    hint: 'Afeto e ternura demonstrados aos outros',
    category: 'Valores',
    emoji: '💕'
  },
  {
    word: 'PACIENCIA',
    hint: 'Saber esperar e compreender o tempo de cada um',
    category: 'Valores',
    emoji: '🕊️'
  },
  {
    word: 'GENTILEZA',
    hint: 'Ser bondoso e educado com todos',
    category: 'Valores',
    emoji: '✨'
  }
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function HangmanGame() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showHint, setShowHint] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const maxWrongGuesses = 6;
  const currentWord = words[currentWordIndex];

  useEffect(() => {
    trackPageView('hangman-game');
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      
      const key = e.key.toUpperCase();
      if (alphabet.includes(key) && !guessedLetters.has(key)) {
        handleLetterClick(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, guessedLetters]);

  useEffect(() => {
    checkGameState();
  }, [guessedLetters, wrongGuesses]);

  const checkGameState = () => {
    if (wrongGuesses >= maxWrongGuesses) {
      setGameState('lost');
      return;
    }

    const wordLetters = new Set(currentWord.word.split(''));
    const allGuessed = Array.from(wordLetters).every(letter =>
      guessedLetters.has(letter)
    );

    if (allGuessed && gameState === 'playing') {
      setGameState('won');
      const points = Math.max(100 - wrongGuesses * 15, 10);
      setTotalScore(totalScore + points);
      trackEvent('hangman_won', {
        word: currentWord.word,
        category: currentWord.category,
        wrongGuesses,
        points
      });
    }
  };

  const handleLetterClick = (letter: string) => {
    if (gameState !== 'playing' || guessedLetters.has(letter)) return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    const isCorrect = currentWord.word.includes(letter);
    
    if (!isCorrect) {
      setWrongGuesses(wrongGuesses + 1);
    }
    
    trackEvent('hangman_letter_guessed', {
      letter,
      isCorrect,
      word: currentWord.word,
      wrongGuesses: isCorrect ? wrongGuesses : wrongGuesses + 1
    });
  };

  const getDisplayWord = () => {
    return currentWord.word
      .split('')
      .map(letter => (guessedLetters.has(letter) ? letter : '_'))
      .join(' ');
  };

  const getHangmanDrawing = () => {
    const stages = [
      `  ┌─────┐
  │     │
  │     
  │     
  │      
  │
──┴──`,
      `  ┌─────┐
  │     │
  │     O
  │     
  │      
  │
──┴──`,
      `  ┌─────┐
  │     │
  │     O
  │     |
  │      
  │
──┴──`,
      `  ┌─────┐
  │     │
  │     O
  │    /|
  │      
  │
──┴──`,
      `  ┌─────┐
  │     │
  │     O
  │    /|\\
  │      
  │
──┴──`,
      `  ┌─────┐
  │     │
  │     O
  │    /|\\
  │    /  
  │
──┴──`,
      `  ┌─────┐
  │     │
  │     O
  │    /|\\
  │    / \\
  │
──┴──`
    ];

    return stages[wrongGuesses] || stages[0];
  };

  const handleNextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      resetGame();
    }
  };

  const resetGame = () => {
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameState('playing');
    setShowHint(false);
  };

  const resetAll = () => {
    setCurrentWordIndex(0);
    setTotalScore(0);
    resetGame();
  };

  const getLetterButtonClass = (letter: string): string => {
    if (!guessedLetters.has(letter)) {
      return 'bg-blue-500 text-white hover:bg-blue-600 shadow-md cursor-pointer';
    }

    if (currentWord.word.includes(letter)) {
      return 'bg-green-500 text-white cursor-not-allowed';
    }

    return 'bg-red-500 text-white cursor-not-allowed';
  };

  const getEncouragementMessage = () => {
    if (wrongGuesses === 0) {
      return 'Você consegue! Continue tentando! ✨';
    } else if (wrongGuesses < 3) {
      return 'Está indo bem! Continue assim! 💪';
    } else if (wrongGuesses < 5) {
      return 'Não desista! Você está perto! 🌟';
    } else {
      return 'Cuidado! Poucas chances restantes! 😰';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🎯 Jogo da Forca - Valores Especiais 🎯
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Descubra palavras sobre valores importantes como inclusão, respeito e carinho!
            </p>

            {/* Estatísticas */}
            <div className="flex justify-center gap-6 mb-6">
              <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                <div className="flex items-center gap-2">
                  <Trophy className="text-yellow-500" size={20} />
                  <span className="font-semibold text-gray-800">Pontos: {totalScore}</span>
                </div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                <div className="flex items-center gap-2">
                  <Star className="text-blue-500" size={20} />
                  <span className="font-semibold text-gray-800">
                    Palavra {currentWordIndex + 1}/{words.length}
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                <div className="flex items-center gap-2">
                  <AlertCircle className="text-red-500" size={20} />
                  <span className="font-semibold text-gray-800">
                    Erros: {wrongGuesses}/{maxWrongGuesses}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Área do Boneco e Palavra */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              {/* Desenho da Forca */}
              <div className="text-center mb-8">
                <div className="bg-gray-100 rounded-lg p-6 font-mono text-lg leading-tight">
                  <pre className="text-gray-800">{getHangmanDrawing()}</pre>
                </div>
              </div>

              {/* Palavra e Emoji */}
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">{currentWord.emoji}</div>
                <div className="text-3xl font-bold text-gray-800 tracking-wider mb-4 font-mono">
                  {getDisplayWord()}
                </div>
                <p className="text-lg font-medium text-gray-600">{getEncouragementMessage()}</p>
              </div>

              {/* Botão de Dica */}
              <div className="mb-8">
                <button
                  onClick={() => setShowHint(!showHint)}
                  disabled={gameState !== 'playing'}
                  aria-label={showHint ? 'Esconder dica' : 'Ver dica'}
                  aria-expanded={showHint}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-3 px-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                >
                  <Lightbulb size={20} />
                  {showHint ? 'Esconder Dica' : 'Ver Dica'}
                </button>

                {showHint && (
                  <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-sm text-gray-700">
                      <strong>💡 Dica:</strong> {currentWord.hint}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Área do Teclado */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                Escolha uma letra:
              </h3>

              {/* Teclado */}
              <div className="grid grid-cols-6 gap-3 mb-8" role="group" aria-label="Teclado de letras">
                {alphabet.map(letter => {
                  const isGuessed = guessedLetters.has(letter);
                  const isCorrect = isGuessed && currentWord.word.includes(letter);
                  const isWrong = isGuessed && !currentWord.word.includes(letter);
                  
                  return (
                    <button
                      key={letter}
                      onClick={() => handleLetterClick(letter)}
                      disabled={guessedLetters.has(letter) || gameState !== 'playing'}
                      aria-label={`Letra ${letter}${isCorrect ? ' - acertou' : isWrong ? ' - errou' : ''}`}
                      aria-pressed={isGuessed}
                      className={`aspect-square rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:outline-none ${getLetterButtonClass(
                        letter
                      )}`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>

              {/* Instruções */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-l-4 border-blue-400">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Heart className="text-red-500" size={20} />
                  Como Jogar:
                </h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Clique nas letras para adivinhar a palavra</li>
                  <li>• Use a dica se precisar de ajuda</li>
                  <li>• Você tem {maxWrongGuesses} tentativas erradas</li>
                  <li>• Ganhe pontos acertando com menos erros!</li>
                </ul>
              </div>

              {/* Botão Reiniciar */}
              <div className="text-center mt-6">
                <button
                  onClick={resetAll}
                  aria-label="Reiniciar jogo completamente"
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-full font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 flex items-center gap-2 mx-auto focus:ring-2 focus:ring-gray-500 focus:outline-none"
                >
                  <RotateCcw size={20} />
                  Reiniciar Tudo
                </button>
              </div>
            </div>
          </div>

          {/* Mensagem Especial */}
          <div className="mt-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 text-center">
            <div className="flex justify-center gap-4 mb-4">
              <Heart className="text-pink-500" size={32} />
              <Star className="text-yellow-500" size={32} />
              <Heart className="text-purple-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Aprendendo Valores Importantes! 🎓
            </h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Cada palavra que você descobre representa um valor importante para conviver bem com
              todas as pessoas, especialmente aquelas que têm doenças raras. Valores como cuidado,
              respeito e inclusão fazem o mundo mais bonito para todos! 🌟
            </p>
          </div>

          {/* Modal de Vitória */}
          {gameState === 'won' && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-bounce">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Parabéns!</h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Você descobriu a palavra <strong>{currentWord.word}</strong>!
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-gray-700">
                      <strong>Erros:</strong> {wrongGuesses}
                    </p>
                    <p className="text-gray-700">
                      <strong>Pontos ganhos:</strong> {Math.max(100 - wrongGuesses * 15, 10)}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {wrongGuesses === 0
                        ? '✨ Perfeito! Você é incrível!'
                        : wrongGuesses <= 2
                        ? '🌟 Muito bem! Continue assim!'
                        : '💪 Bom trabalho!'}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {currentWordIndex < words.length - 1 ? (
                      <button
                        onClick={handleNextWord}
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                      >
                        Próxima Palavra →
                      </button>
                    ) : (
                      <button
                        onClick={resetAll}
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                      >
                        Jogar Novamente
                      </button>
                    )}
                    <button
                      onClick={() => setGameState('playing')}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6 rounded-lg font-semibold transition-colors"
                    >
                      Continuar Praticando
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal de Derrota */}
          {gameState === 'lost' && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">😢</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Não foi dessa vez!</h3>
                  <p className="text-lg text-gray-600 mb-4">
                    A palavra era <strong>{currentWord.word}</strong>
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-gray-700 mb-2">
                      <strong>Significado:</strong> {currentWord.hint}
                    </p>
                    <p className="text-sm text-gray-600">Não desanime! Tente novamente! 💪</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={resetGame}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                    >
                      Tentar Novamente
                    </button>
                    {currentWordIndex < words.length - 1 && (
                      <button
                        onClick={handleNextWord}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6 rounded-lg font-semibold transition-colors"
                      >
                        Próxima Palavra
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
