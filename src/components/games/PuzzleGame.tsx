import { useState, useEffect } from 'react';

interface PuzzlePiece {
  id: string;
  text: string;
  correctPosition: number;
  currentPosition: number;
}

interface PuzzleData {
  id: string;
  disease: string;
  emoji: string;
  completedText: string;
  pieces: string[];
}

const puzzles: PuzzleData[] = [
  {
    id: 'puzzle-down',
    disease: 'Síndrome de Down',
    emoji: '☀️',
    completedText: 'Uma condição genética que acontece quando uma pessoa nasce com um cromossomo extra. Isso faz com que ela se desenvolva de forma um pouco diferente, mas ainda pode ter uma vida feliz e cheia de conquistas!',
    pieces: [
      'Uma condição genética',
      'que acontece quando',
      'uma pessoa nasce',
      'com um cromossomo extra.',
      'Isso faz com que ela',
      'se desenvolva de forma',
      'um pouco diferente,',
      'mas ainda pode ter',
      'uma vida feliz e',
      'cheia de conquistas!'
    ]
  },
  {
    id: 'puzzle-autism',
    disease: 'Transtorno do Espectro Autista',
    emoji: '🌈',
    completedText: 'Uma condição que faz com que as pessoas vejam e sintam o mundo de uma forma diferente e especial. Cada pessoa com autismo é única e tem seus próprios superpoderes!',
    pieces: [
      'Uma condição que faz',
      'com que as pessoas',
      'vejam e sintam o mundo',
      'de uma forma diferente',
      'e especial.',
      'Cada pessoa com autismo',
      'é única e tem',
      'seus próprios',
      'superpoderes!'
    ]
  },
  {
    id: 'puzzle-williams',
    disease: 'Síndrome de Williams',
    emoji: '🎵',
    completedText: 'Uma condição genética que faz com que as pessoas sejam super sociáveis e adoram música! Elas têm um coração muito grande e fazem amizade com todo mundo.',
    pieces: [
      'Uma condição genética',
      'que faz com que',
      'as pessoas sejam',
      'super sociáveis',
      'e adoram música!',
      'Elas têm um coração',
      'muito grande e fazem',
      'amizade com todo mundo.'
    ]
  }
];

interface PuzzleGameProps {
  onBack: () => void;
}

const PuzzleGame = ({ onBack }: PuzzleGameProps) => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [puzzlePieces, setPuzzlePieces] = useState<PuzzlePiece[]>([]);
  const [droppedPieces, setDroppedPieces] = useState<(PuzzlePiece | null)[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentPuzzle = puzzles[currentPuzzleIndex];

  useEffect(() => {
    initializePuzzle();
  }, [currentPuzzleIndex]);

  const initializePuzzle = () => {
    const pieces = currentPuzzle.pieces.map((text, index) => ({
      id: `piece-${index}`,
      text,
      correctPosition: index,
      currentPosition: -1
    }));

    // Shuffle pieces
    const shuffledPieces = [...pieces].sort(() => Math.random() - 0.5);
    
    setPuzzlePieces(shuffledPieces);
    setDroppedPieces(new Array(currentPuzzle.pieces.length).fill(null));
    setIsCompleted(false);
    setShowHint(false);
  };

  const handlePieceClick = (piece: PuzzlePiece) => {
    if (piece.currentPosition !== -1) {
      // Remove piece from dropped area
      const newDroppedPieces = [...droppedPieces];
      newDroppedPieces[piece.currentPosition] = null;
      setDroppedPieces(newDroppedPieces);

      // Return piece to available pieces
      const newPuzzlePieces = [...puzzlePieces, { ...piece, currentPosition: -1 }];
      setPuzzlePieces(newPuzzlePieces);
    }
  };

  const handleDropZoneClick = (position: number) => {
    if (droppedPieces[position] || puzzlePieces.length === 0) return;

    // Find the correct piece for this position if hint is shown
    let pieceToPlace;
    
    if (showHint) {
      pieceToPlace = puzzlePieces.find(p => p.correctPosition === position);
    }
    
    if (!pieceToPlace) {
      pieceToPlace = puzzlePieces[0];
    }

    // Place piece in drop zone
    const newDroppedPieces = [...droppedPieces];
    newDroppedPieces[position] = { ...pieceToPlace, currentPosition: position };
    setDroppedPieces(newDroppedPieces);

    // Remove piece from available pieces
    const newPuzzlePieces = puzzlePieces.filter(p => p.id !== pieceToPlace!.id);
    setPuzzlePieces(newPuzzlePieces);

    // Check if puzzle is completed
    if (newPuzzlePieces.length === 0) {
      checkCompletion(newDroppedPieces);
    }
  };

  const checkCompletion = (pieces: (PuzzlePiece | null)[]) => {
    const isCorrect = pieces.every((piece, index) => 
      piece && piece.correctPosition === index
    );
    
    if (isCorrect) {
      setIsCompleted(true);
    }
  };

  const nextPuzzle = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    } else {
      setCurrentPuzzleIndex(0);
    }
  };

  const getPieceColor = (piece: PuzzlePiece, position: number) => {
    if (!isCompleted && !showHint) return 'bg-purple-100 border-purple-300';
    
    if (piece.correctPosition === position) {
      return 'bg-green-100 border-green-400';
    } else {
      return 'bg-red-100 border-red-400';
    }
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
            🧩 Quebra-cabeças das Doenças Raras 🧩
          </h1>
          <p className="text-xl font-body">
            Monte o texto sobre a doença movendo as peças para o lugar correto!
          </p>
        </div>

        {/* Puzzle Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCurrentPuzzleIndex((prev) => prev > 0 ? prev - 1 : puzzles.length - 1)}
            className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-full font-body hover:bg-opacity-30 transition-all"
          >
            ← Anterior
          </button>
          
          <div className="text-center text-white">
            <div className="text-3xl mb-2">{currentPuzzle.emoji}</div>
            <h2 className="text-2xl font-heading font-bold">{currentPuzzle.disease}</h2>
            <p className="text-sm font-body opacity-75">
              Doença {currentPuzzleIndex + 1} de {puzzles.length}
            </p>
          </div>
          
          <button
            onClick={() => setCurrentPuzzleIndex((prev) => prev < puzzles.length - 1 ? prev + 1 : 0)}
            className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-full font-body hover:bg-opacity-30 transition-all"
          >
            Próxima →
          </button>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-full font-body font-medium hover:bg-yellow-600 transition-all"
          >
            💡 {showHint ? 'Esconder' : 'Mostrar'} Dicas
          </button>
          
          <button
            onClick={initializePuzzle}
            className="px-4 py-2 bg-blue-500 text-white rounded-full font-body font-medium hover:bg-blue-600 transition-all"
          >
            🔄 Reiniciar
          </button>
        </div>

        {/* Puzzle Area */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          {/* Drop Zones */}
          <div className="mb-8">
            <h3 className="text-lg font-heading font-bold text-gray-800 mb-4 text-center">
              Monte o texto aqui: (clique nos espaços vazios)
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              {droppedPieces.map((piece, index) => (
                <div
                  key={index}
                  onClick={() => handleDropZoneClick(index)}
                  className={`
                    min-h-[60px] border-2 border-dashed p-3 rounded-xl cursor-pointer transition-all
                    ${piece 
                      ? `${getPieceColor(piece, index)} border-solid` 
                      : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                    }
                  `}
                >
                  {piece ? (
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePieceClick(piece);
                      }}
                      className="font-body text-gray-800 cursor-pointer hover:text-purple-600"
                    >
                      {piece.text}
                      {showHint && (
                        <span className="ml-2 text-xs text-gray-500">
                          (Posição {piece.correctPosition + 1})
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-400 font-body text-center">
                      Clique para colocar uma peça aqui
                      {showHint && (
                        <span className="block text-xs mt-1">
                          Peça {index + 1}: "{currentPuzzle.pieces[index]}"
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Available Pieces */}
          {puzzlePieces.length > 0 && (
            <div>
              <h3 className="text-lg font-heading font-bold text-gray-800 mb-4 text-center">
                Peças disponíveis: (clique para usar)
              </h3>
              
              <div className="flex flex-wrap gap-3 justify-center">
                {puzzlePieces.map((piece) => (
                  <button
                    key={piece.id}
                    onClick={() => handlePieceClick(piece)}
                    className="px-4 py-2 bg-purple-100 border-2 border-purple-300 rounded-xl font-body text-gray-800 hover:bg-purple-200 transition-all transform hover:scale-105"
                  >
                    {piece.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Completion Message */}
        {isCompleted && (
          <div className="bg-white rounded-3xl p-8 text-center shadow-lg">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-heading font-bold text-green-600 mb-4">
              Parabéns! Você completou o quebra-cabeças!
            </h2>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-gray-800 font-body leading-relaxed">
                {currentPuzzle.completedText}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={nextPuzzle}
                className="px-6 py-3 bg-purple-500 text-white rounded-full font-body font-medium hover:bg-purple-600 transition-all"
              >
                🧩 Próximo Quebra-cabeças
              </button>
              <button 
                onClick={initializePuzzle}
                className="px-6 py-3 bg-pink-500 text-white rounded-full font-body font-medium hover:bg-pink-600 transition-all"
              >
                🔄 Jogar Novamente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PuzzleGame;