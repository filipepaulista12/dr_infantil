import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, HelpCircle, Lightbulb, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import Card from '../common/Card';

interface CrosswordWord {
  word: string;
  clue: string;
  startX: number;
  startY: number;
  direction: 'horizontal' | 'vertical';
  number: number;
}

interface CellData {
  letter: string;
  number?: number;
  isBlocked: boolean;
  userInput: string;
  isCorrect: boolean;
  belongsTo: number[]; // IDs das palavras que passam por esta célula
}

const crosswordData: CrosswordWord[] = [
  {
    word: 'SINDROME',
    clue: 'Conjunto de sintomas que caracterizam uma doença',
    startX: 0,
    startY: 2,
    direction: 'horizontal',
    number: 1
  },
  {
    word: 'AUTISMO',
    clue: 'Transtorno que afeta comunicação e comportamento social',
    startX: 5,
    startY: 0,
    direction: 'vertical',
    number: 2
  },
  {
    word: 'INSULINA',
    clue: 'Hormônio que controla o açúcar no sangue',
    startX: 2,
    startY: 4,
    direction: 'horizontal',
    number: 3
  },
  {
    word: 'CEREBRO',
    clue: 'Órgão que controla nossos pensamentos e movimentos',
    startX: 0,
    startY: 6,
    direction: 'horizontal',
    number: 4
  },
  {
    word: 'CORACAO',
    clue: 'Órgão que bombeia sangue pelo corpo',
    startX: 4,
    startY: 4,
    direction: 'vertical',
    number: 5
  },
  {
    word: 'GENETICA',
    clue: 'Ciência que estuda os genes e hereditariedade',
    startX: 8,
    startY: 1,
    direction: 'vertical',
    number: 6
  }
];

const GRID_SIZE = 12;

export function CrosswordGame() {
  const [grid, setGrid] = useState<CellData[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ x: number; y: number } | null>(null);
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completedWords, setCompletedWords] = useState<Set<number>>(new Set());
  const [showHints, setShowHints] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [hintsUsed, setHintsUsed] = useState<Set<number>>(new Set());

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Criar grid vazio
    const newGrid: CellData[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        letter: '',
        isBlocked: true,
        userInput: '',
        isCorrect: false,
        belongsTo: []
      }))
    );

    // Preencher com as palavras
    crosswordData.forEach((wordData) => {
      const { word, startX, startY, direction, number } = wordData;
      
      for (let i = 0; i < word.length; i++) {
        const x = direction === 'horizontal' ? startX + i : startX;
        const y = direction === 'vertical' ? startY + i : startY;
        
        if (x < GRID_SIZE && y < GRID_SIZE) {
          newGrid[y][x] = {
            ...newGrid[y][x],
            letter: word[i],
            isBlocked: false,
            number: i === 0 ? number : newGrid[y][x].number,
            belongsTo: [...newGrid[y][x].belongsTo, number]
          };
        }
      }
    });

    setGrid(newGrid);
    setSelectedCell(null);
    setSelectedWord(null);
    setScore(0);
    setCompletedWords(new Set());
    setGameComplete(false);
    setHintsUsed(new Set());
  };

  const handleCellClick = (x: number, y: number) => {
    if (grid[y][x].isBlocked) return;
    
    setSelectedCell({ x, y });
    
    // Se a célula pertence a alguma palavra, seleciona a primeira
    if (grid[y][x].belongsTo.length > 0) {
      setSelectedWord(grid[y][x].belongsTo[0]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!selectedCell) return;
    
    const { x, y } = selectedCell;
    const key = e.key.toUpperCase();
    
    if (key >= 'A' && key <= 'Z') {
      const newGrid = [...grid];
      newGrid[y][x] = {
        ...newGrid[y][x],
        userInput: key,
        isCorrect: key === newGrid[y][x].letter
      };
      setGrid(newGrid);
      
      // Verificar se completou alguma palavra
      checkCompletedWords(newGrid);
      
      // Mover para próxima célula
      moveToNextCell(x, y);
    } else if (key === 'BACKSPACE') {
      const newGrid = [...grid];
      newGrid[y][x] = {
        ...newGrid[y][x],
        userInput: '',
        isCorrect: false
      };
      setGrid(newGrid);
      
      // Mover para célula anterior
      moveToPreviousCell(x, y);
    } else if (key === 'ARROWUP' || key === 'ARROWDOWN' || key === 'ARROWLEFT' || key === 'ARROWRIGHT') {
      navigateGrid(key, x, y);
    }
  };

  const moveToNextCell = (currentX: number, currentY: number) => {
    if (!selectedWord) return;
    
    const wordData = crosswordData.find(w => w.number === selectedWord);
    if (!wordData) return;
    
    if (wordData.direction === 'horizontal') {
      const nextX = currentX + 1;
      if (nextX < GRID_SIZE && !grid[currentY][nextX].isBlocked) {
        setSelectedCell({ x: nextX, y: currentY });
      }
    } else {
      const nextY = currentY + 1;
      if (nextY < GRID_SIZE && !grid[nextY][currentX].isBlocked) {
        setSelectedCell({ x: currentX, y: nextY });
      }
    }
  };

  const moveToPreviousCell = (currentX: number, currentY: number) => {
    if (!selectedWord) return;
    
    const wordData = crosswordData.find(w => w.number === selectedWord);
    if (!wordData) return;
    
    if (wordData.direction === 'horizontal') {
      const prevX = currentX - 1;
      if (prevX >= 0 && !grid[currentY][prevX].isBlocked) {
        setSelectedCell({ x: prevX, y: currentY });
      }
    } else {
      const prevY = currentY - 1;
      if (prevY >= 0 && !grid[prevY][currentX].isBlocked) {
        setSelectedCell({ x: currentX, y: prevY });
      }
    }
  };

  const navigateGrid = (key: string, currentX: number, currentY: number) => {
    let newX = currentX;
    let newY = currentY;
    
    switch (key) {
      case 'ARROWUP':
        newY = Math.max(0, currentY - 1);
        break;
      case 'ARROWDOWN':
        newY = Math.min(GRID_SIZE - 1, currentY + 1);
        break;
      case 'ARROWLEFT':
        newX = Math.max(0, currentX - 1);
        break;
      case 'ARROWRIGHT':
        newX = Math.min(GRID_SIZE - 1, currentX + 1);
        break;
    }
    
    if (!grid[newY][newX].isBlocked) {
      setSelectedCell({ x: newX, y: newY });
    }
  };

  const checkCompletedWords = (currentGrid: CellData[][]) => {
    const newCompleted = new Set(completedWords);
    
    crosswordData.forEach((wordData) => {
      if (completedWords.has(wordData.number)) return;
      
      const { word, startX, startY, direction } = wordData;
      let isComplete = true;
      
      for (let i = 0; i < word.length; i++) {
        const x = direction === 'horizontal' ? startX + i : startX;
        const y = direction === 'vertical' ? startY + i : startY;
        
        if (!currentGrid[y][x].isCorrect) {
          isComplete = false;
          break;
        }
      }
      
      if (isComplete) {
        newCompleted.add(wordData.number);
        setScore(prev => prev + word.length * 10);
        
        // Mini celebração
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    });
    
    setCompletedWords(newCompleted);
    
    // Verificar vitória
    if (newCompleted.size === crosswordData.length) {
      setGameComplete(true);
      celebrateVictory();
    }
  };

  const useHint = (wordNumber: number) => {
    if (hintsUsed.has(wordNumber)) return;
    
    const wordData = crosswordData.find(w => w.number === wordNumber);
    if (!wordData) return;
    
    const { word, startX, startY, direction } = wordData;
    const newGrid = [...grid];
    
    // Revelar a primeira letra vazia
    for (let i = 0; i < word.length; i++) {
      const x = direction === 'horizontal' ? startX + i : startX;
      const y = direction === 'vertical' ? startY + i : startY;
      
      if (!newGrid[y][x].userInput) {
        newGrid[y][x] = {
          ...newGrid[y][x],
          userInput: word[i],
          isCorrect: true
        };
        break;
      }
    }
    
    setGrid(newGrid);
    setHintsUsed(new Set([...hintsUsed, wordNumber]));
    setScore(prev => Math.max(0, prev - 5)); // Penalidade por usar dica
    checkCompletedWords(newGrid);
  };

  const celebrateVictory = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#9333ea', '#ec4899', '#3b82f6', '#10b981']
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#9333ea', '#ec4899', '#3b82f6', '#10b981']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const getCellClassName = (x: number, y: number, cell: CellData) => {
    const isSelected = selectedCell?.x === x && selectedCell?.y === y;
    const isInSelectedWord = selectedWord && cell.belongsTo.includes(selectedWord);
    const isCompleted = cell.belongsTo.some(wordNum => completedWords.has(wordNum));
    
    if (cell.isBlocked) return 'bg-gray-300';
    
    let className = 'bg-white border-2 cursor-text transition-all ';
    
    if (isSelected) {
      className += 'border-purple-600 bg-purple-50 ring-2 ring-purple-300 ';
    } else if (isInSelectedWord) {
      className += 'border-purple-300 bg-purple-50 ';
    } else if (isCompleted) {
      className += 'border-green-500 bg-green-50 ';
    } else if (cell.userInput && !cell.isCorrect) {
      className += 'border-red-300 bg-red-50 ';
    } else if (cell.userInput && cell.isCorrect) {
      className += 'border-green-300 bg-green-50 ';
    } else {
      className += 'border-gray-300 hover:border-purple-400 ';
    }
    
    return className;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            📝 Palavras Cruzadas Médicas
          </h1>
          <p className="text-gray-600 text-lg">
            Preencha as palavras usando as dicas abaixo!
          </p>
        </motion.div>

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-4 mb-6 max-w-2xl mx-auto">
          <Card className="text-center">
            <div className="text-3xl font-bold text-purple-600">{score}</div>
            <div className="text-sm text-gray-600">Pontos</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-green-600">{completedWords.size}/{crosswordData.length}</div>
            <div className="text-sm text-gray-600">Palavras</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-orange-600">{hintsUsed.size}</div>
            <div className="text-sm text-gray-600">Dicas Usadas</div>
          </Card>
        </div>

        {/* Controles */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={initializeGame}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition"
          >
            <RotateCcw className="w-5 h-5" />
            Reiniciar
          </button>
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg transition border-2 border-purple-600"
          >
            <HelpCircle className="w-5 h-5" />
            {showHints ? 'Ocultar' : 'Mostrar'} Dicas
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Grade de Palavras Cruzadas */}
          <div className="flex justify-center">
            <div
              className="inline-grid gap-0.5 p-4 bg-gray-200 rounded-lg"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`
              }}
              onKeyDown={handleKeyPress}
              tabIndex={0}
            >
              {grid.map((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={`relative w-10 h-10 flex items-center justify-center font-bold text-lg ${getCellClassName(x, y, cell)}`}
                    onClick={() => handleCellClick(x, y)}
                  >
                    {cell.number && (
                      <span className="absolute top-0.5 left-1 text-[10px] text-gray-600 font-normal">
                        {cell.number}
                      </span>
                    )}
                    {cell.userInput && (
                      <span className={cell.isCorrect ? 'text-green-700' : 'text-red-600'}>
                        {cell.userInput}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Dicas */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 Dicas:</h2>
            
            {crosswordData.map((wordData) => {
              const isCompleted = completedWords.has(wordData.number);
              const isSelected = selectedWord === wordData.number;
              
              return (
                <motion.div
                  key={wordData.number}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setSelectedWord(wordData.number)}
                  className={`${
                    isCompleted
                      ? 'bg-gradient-to-r from-green-100 to-green-200 border-green-500'
                      : isSelected
                      ? 'bg-purple-100 border-purple-500'
                      : 'bg-white border-gray-300 hover:border-purple-400'
                  } border-2 p-4 rounded-lg cursor-pointer transition-all`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-purple-600 text-lg">
                          {wordData.number}.
                        </span>
                        <span className="text-sm text-gray-600">
                          ({wordData.direction === 'horizontal' ? '→' : '↓'}) {wordData.word.length} letras
                        </span>
                        {isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <p className="text-gray-800">{wordData.clue}</p>
                    </div>
                    {!isCompleted && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          useHint(wordData.number);
                        }}
                        disabled={hintsUsed.has(wordData.number)}
                        className={`${
                          hintsUsed.has(wordData.number)
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500'
                        } p-2 rounded-lg transition-all flex-shrink-0`}
                        title="Revelar uma letra (-5 pontos)"
                      >
                        <Lightbulb className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Modal de Vitória */}
        <AnimatePresence>
          {gameComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setGameComplete(false)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-4">
                  <Trophy className="w-24 h-24 text-yellow-500 mx-auto animate-bounce" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  🎉 Parabéns!
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Você completou todas as palavras cruzadas!
                </p>
                <div className="bg-purple-100 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{score}</div>
                      <div className="text-sm text-gray-600">Pontos Finais</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{hintsUsed.size}</div>
                      <div className="text-sm text-gray-600">Dicas Usadas</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setGameComplete(false);
                      initializeGame();
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition"
                  >
                    Jogar Novamente
                  </button>
                  <button
                    onClick={() => setGameComplete(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 transition"
                  >
                    Fechar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instruções */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="font-bold text-gray-800 mb-2 text-lg">📖 Como Jogar:</h3>
          <ol className="text-gray-700 space-y-2">
            <li><strong>1.</strong> Clique em uma célula branca para selecioná-la</li>
            <li><strong>2.</strong> Digite a letra usando o teclado</li>
            <li><strong>3.</strong> Use as setas ← → ↑ ↓ para navegar</li>
            <li><strong>4.</strong> Clique em uma dica para selecionar a palavra inteira</li>
            <li><strong>5.</strong> Use o botão 💡 para revelar uma letra (-5 pontos)</li>
            <li><strong>6.</strong> Complete todas as palavras para vencer! 🏆</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}

export default CrosswordGame;
