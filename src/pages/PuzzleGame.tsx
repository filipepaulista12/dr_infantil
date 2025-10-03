import { useState, useEffect } from 'react';
import { Puzzle, Shuffle } from 'lucide-react';
import { trackEvent, trackPageView } from '../utils/analytics';

interface PuzzlePiece {
  id: number;
  content: string;
  currentPosition: number;
  correctPosition: number;
  isEmpty: boolean;
}

interface DiseaseInfo {
  emoji: string;
  name: string;
  text: string;
  hint: string;
}

const diseases: DiseaseInfo[] = [
  {
    emoji: '🌟',
    name: 'Síndrome de Down',
    text: 'Uma condição genética que acontece quando uma pessoa nasce com um cromossomo extra. Isso faz com que ela se desenvolva de forma um pouco diferente, mas ainda pode ter uma vida feliz e cheia de conquistas!',
    hint: 'Comece montando as frases do início: "Uma condição genética..."'
  },
  {
    emoji: '🧩',
    name: 'Autismo',
    text: 'Uma forma diferente de pensar e sentir o mundo. Pessoas autistas podem ter sensibilidade especial a sons e luzes, mas também têm talentos únicos e incríveis!',
    hint: 'Foque nas palavras sobre "pensar e sentir o mundo"'
  },
  {
    emoji: '💙',
    name: 'Fibrose Cística',
    text: 'Uma condição que afeta os pulmões e a digestão. Com cuidados e tratamentos especiais, as pessoas podem viver bem e fazer muitas atividades que amam!',
    hint: 'Monte primeiro a parte sobre os pulmões e digestão'
  },
  {
    emoji: '🌈',
    name: 'Diabetes Tipo 1',
    text: 'Uma condição onde o corpo precisa de ajuda para controlar o açúcar no sangue. Com insulina e cuidados diários, crianças diabéticas podem brincar, estudar e realizar seus sonhos!',
    hint: 'Comece pela parte do açúcar no sangue'
  },
  {
    emoji: '✨',
    name: 'Paralisia Cerebral',
    text: 'Uma condição que afeta o movimento do corpo. Cada pessoa tem suas próprias habilidades e, com apoio e carinho, pode participar de muitas atividades e ser muito feliz!',
    hint: 'Monte primeiro as palavras sobre movimento'
  }
];

export default function PuzzleGame() {
  const [currentDiseaseIndex, setCurrentDiseaseIndex] = useState(0);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [moves, setMoves] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const currentDisease = diseases[currentDiseaseIndex];

  // Inicializar puzzle
  useEffect(() => {
    initializePuzzle();
  }, [currentDiseaseIndex]);

  useEffect(() => {
    trackPageView('puzzle-game');
  }, []);

  const initializePuzzle = () => {
    const words = currentDisease.text.split(' ');
    const totalPieces = 16;
    const puzzlePieces: PuzzlePiece[] = [];

    // Criar peças com palavras
    for (let i = 0; i < totalPieces; i++) {
      if (i < words.length) {
        puzzlePieces.push({
          id: i,
          content: words[i],
          currentPosition: i,
          correctPosition: i,
          isEmpty: false
        });
      } else {
        // Peças vazias
        puzzlePieces.push({
          id: i,
          content: '',
          currentPosition: i,
          correctPosition: i,
          isEmpty: true
        });
      }
    }

    // Embaralhar posições (exceto a última que é o espaço vazio inicial)
    const shuffled = [...puzzlePieces];
    
    // Fazer movimentos aleatórios para garantir que o puzzle seja solucionável
    for (let i = 0; i < 100; i++) {
      const currentEmpty = shuffled.findIndex(p => p.isEmpty);
      const possibleMoves = getPossibleMoves(currentEmpty);
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      
      // Trocar posições
      [shuffled[currentEmpty], shuffled[randomMove]] = [shuffled[randomMove], shuffled[currentEmpty]];
      shuffled[currentEmpty].currentPosition = currentEmpty;
      shuffled[randomMove].currentPosition = randomMove;
    }

    setPieces(shuffled);
    setMoves(0);
    setGameComplete(false);
    setShowHint(false);
  };

  const getPossibleMoves = (emptyPosition: number): number[] => {
    const row = Math.floor(emptyPosition / 4);
    const col = emptyPosition % 4;
    const possibleMoves: number[] = [];

    // Cima
    if (row > 0) possibleMoves.push(emptyPosition - 4);
    // Baixo
    if (row < 3) possibleMoves.push(emptyPosition + 4);
    // Esquerda
    if (col > 0) possibleMoves.push(emptyPosition - 1);
    // Direita
    if (col < 3) possibleMoves.push(emptyPosition + 1);

    return possibleMoves;
  };

  const handlePieceClick = (clickedPosition: number) => {
    if (gameComplete) return;

    const emptyPosition = pieces.findIndex(p => p.isEmpty);
    const possibleMoves = getPossibleMoves(emptyPosition);

    if (possibleMoves.includes(clickedPosition)) {
      const newPieces = [...pieces];
      
      // Trocar peças
      [newPieces[emptyPosition], newPieces[clickedPosition]] = 
        [newPieces[clickedPosition], newPieces[emptyPosition]];
      
      // Atualizar posições
      newPieces[emptyPosition].currentPosition = emptyPosition;
      newPieces[clickedPosition].currentPosition = clickedPosition;

      setPieces(newPieces);
      setMoves(moves + 1);

      // Verificar se completou
      checkCompletion(newPieces);
    }
  };

  const checkCompletion = (currentPieces: PuzzlePiece[]) => {
    const isComplete = currentPieces.every(
      piece => piece.currentPosition === piece.correctPosition
    );

    if (isComplete) {
      setGameComplete(true);
      trackEvent('puzzle_completed', {
        disease: currentDisease.name,
        moves,
        hintsUsed: showHint ? 1 : 0
      });
    }
  };

  const handleNextDisease = () => {
    if (currentDiseaseIndex < diseases.length - 1) {
      setCurrentDiseaseIndex(currentDiseaseIndex + 1);
    }
  };

  const handlePrevDisease = () => {
    if (currentDiseaseIndex > 0) {
      setCurrentDiseaseIndex(currentDiseaseIndex - 1);
    }
  };

  const getPieceColor = (piece: PuzzlePiece): string => {
    if (piece.isEmpty) return 'bg-gray-100 border-gray-300';
    if (piece.currentPosition === piece.correctPosition) {
      return 'bg-green-100 border-green-400';
    }
    
    const emptyPosition = pieces.findIndex(p => p.isEmpty);
    const possibleMoves = getPossibleMoves(emptyPosition);
    
    if (possibleMoves.includes(piece.currentPosition)) {
      return 'bg-blue-100 border-blue-400 cursor-pointer hover:bg-blue-200 transform hover:scale-105';
    }
    
    return 'bg-red-100 border-red-400 cursor-pointer hover:bg-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🧩 Quebra-cabeças das Doenças Raras 🧩
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Monte o texto sobre a doença movendo as peças para o lugar correto!
            </p>
          </div>

          {/* Controles e Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevDisease}
                disabled={currentDiseaseIndex === 0}
                className={`py-2 px-4 rounded-lg transition-colors ${
                  currentDiseaseIndex === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                ← Anterior
              </button>

              <div className="text-center">
                <div className="text-4xl mb-2">{currentDisease.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {currentDisease.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Doença {currentDiseaseIndex + 1} de {diseases.length}
                </p>
              </div>

              <button
                onClick={handleNextDisease}
                disabled={currentDiseaseIndex === diseases.length - 1}
                className={`py-2 px-4 rounded-lg transition-colors ${
                  currentDiseaseIndex === diseases.length - 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Próxima →
              </button>
            </div>

            <div className="flex justify-center gap-6 mb-4">
              <div className="bg-blue-100 rounded-lg px-4 py-2">
                <span className="font-semibold text-blue-800">{moves} movimentos</span>
              </div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg transition-colors"
              >
                {showHint ? 'Esconder Dica' : 'Ver Dica'}
              </button>
            </div>

            {showHint && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>💡 Dica:</strong> {currentDisease.hint}
                </p>
              </div>
            )}
          </div>

          {/* Puzzle Grid */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
            <div className="grid grid-cols-4 gap-2 max-w-2xl mx-auto">
              {pieces.map((piece) => (
                <div
                  key={piece.id}
                  onClick={() => handlePieceClick(piece.currentPosition)}
                  className={`aspect-square rounded-lg border-2 flex items-center justify-center p-2 text-center transition-all duration-200 ${getPieceColor(
                    piece
                  )}`}
                >
                  <span className="text-xs font-medium text-gray-800 leading-tight">
                    {piece.content}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instruções */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-blue-400 mb-6">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Puzzle className="text-purple-500" size={20} />
              Como Jogar:
            </h3>
            <ul className="text-gray-700 space-y-1">
              <li>• Clique nas peças azuis para movê-las</li>
              <li>• Só é possível mover peças adjacentes ao espaço vazio</li>
              <li>• Peças verdes estão na posição correta</li>
              <li>• Monte o texto completo sobre a doença!</li>
            </ul>
          </div>

          {/* Botão Embaralhar */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={initializePuzzle}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              <Shuffle size={20} />
              Embaralhar Novamente
            </button>
          </div>

          {/* Modal de Conclusão */}
          {gameComplete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-bounce">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    Parabéns!
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Você completou o quebra-cabeça sobre{' '}
                    <strong>{currentDisease.name}</strong>!
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-gray-700">
                      <strong>Movimentos:</strong> {moves}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {moves <= 20
                        ? '✨ Incrível! Você é um mestre dos quebra-cabeças!'
                        : moves <= 40
                        ? '🌟 Muito bem! Continue praticando!'
                        : '💪 Bom trabalho! A prática leva à perfeição!'}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {currentDiseaseIndex < diseases.length - 1 ? (
                      <button
                        onClick={() => {
                          setGameComplete(false);
                          handleNextDisease();
                        }}
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                      >
                        Próxima Doença →
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setCurrentDiseaseIndex(0);
                          setGameComplete(false);
                        }}
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                      >
                        Jogar Novamente
                      </button>
                    )}
                    <button
                      onClick={() => setGameComplete(false)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6 rounded-lg font-semibold transition-colors"
                    >
                      Fechar
                    </button>
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
