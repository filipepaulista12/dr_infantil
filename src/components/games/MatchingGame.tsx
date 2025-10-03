import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, RotateCcw, HelpCircle, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import Card from '../common/Card';

interface MatchItem {
  id: string;
  symptom: string;
  disease: string;
  diseaseId: string;
  color: string;
}

interface DragItem {
  id: string;
  text: string;
  type: 'symptom' | 'disease';
  matchId: string;
}

const matchingData: MatchItem[] = [
  {
    id: '1',
    symptom: 'Cromossomo extra (21)',
    disease: 'Síndrome de Down',
    diseaseId: 'down',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: '2',
    symptom: 'Dificuldade de comunicação social',
    disease: 'Autismo',
    diseaseId: 'autism',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '3',
    symptom: 'Pele azulada (cianose)',
    disease: 'Tetralogia de Fallot',
    diseaseId: 'fallot',
    color: 'from-red-500 to-rose-500'
  },
  {
    id: '4',
    symptom: 'Convulsões recorrentes',
    disease: 'Epilepsia',
    diseaseId: 'epilepsy',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: '5',
    symptom: 'Sede excessiva e urinar muito',
    disease: 'Diabetes Tipo 1',
    diseaseId: 'diabetes',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: '6',
    symptom: 'Dificuldade para movimentar os músculos',
    disease: 'Paralisia Cerebral',
    diseaseId: 'cerebral',
    color: 'from-indigo-500 to-purple-500'
  }
];

export function MatchingGame() {
  const [symptoms, setSymptoms] = useState<DragItem[]>([]);
  const [diseases, setDiseases] = useState<DragItem[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [feedback, setFeedback] = useState<{ id: string; correct: boolean } | null>(null);
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Embaralhar sintomas
    const shuffledSymptoms = [...matchingData]
      .sort(() => Math.random() - 0.5)
      .map(item => ({
        id: `symptom-${item.id}`,
        text: item.symptom,
        type: 'symptom' as const,
        matchId: item.diseaseId
      }));

    // Embaralhar doenças
    const shuffledDiseases = [...matchingData]
      .sort(() => Math.random() - 0.5)
      .map(item => ({
        id: `disease-${item.id}`,
        text: item.disease,
        type: 'disease' as const,
        matchId: item.diseaseId
      }));

    setSymptoms(shuffledSymptoms);
    setDiseases(shuffledDiseases);
    setMatches({});
    setScore(0);
    setAttempts(0);
    setGameComplete(false);
    setFeedback(null);
  };

  const handleDragStart = (item: DragItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetItem: DragItem) => {
    if (!draggedItem || draggedItem.type === targetItem.type) {
      setDraggedItem(null);
      return;
    }

    const isCorrect = draggedItem.matchId === targetItem.matchId;
    setAttempts(prev => prev + 1);

    if (isCorrect) {
      const newMatches = {
        ...matches,
        [draggedItem.id]: targetItem.id
      };
      setMatches(newMatches);
      setScore(prev => prev + 10);
      setFeedback({ id: draggedItem.id, correct: true });

      // Verificar se completou o jogo
      if (Object.keys(newMatches).length === matchingData.length) {
        setGameComplete(true);
        celebrateVictory();
      } else {
        // Mini celebração
        confetti({
          particleCount: 30,
          spread: 40,
          origin: { y: 0.6 }
        });
      }

      setTimeout(() => setFeedback(null), 1500);
    } else {
      setFeedback({ id: draggedItem.id, correct: false });
      setTimeout(() => setFeedback(null), 1500);
    }

    setDraggedItem(null);
  };

  const celebrateVictory = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#9333ea', '#ec4899', '#3b82f6']
      });

      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#9333ea', '#ec4899', '#3b82f6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const accuracy = attempts > 0 ? Math.round((score / (attempts * 10)) * 100) : 0;
  const remainingItems = symptoms.filter(s => !matches[s.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            🧩 Jogo de Associação
          </h1>
          <p className="text-gray-600 text-lg">
            Arraste os sintomas e solte na doença correspondente!
          </p>
        </motion.div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="text-center">
            <div className="text-3xl font-bold text-purple-600">{score}</div>
            <div className="text-sm text-gray-600">Pontos</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-blue-600">{attempts}</div>
            <div className="text-sm text-gray-600">Tentativas</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-green-600">{accuracy}%</div>
            <div className="text-sm text-gray-600">Precisão</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-orange-600">{remainingItems.length}</div>
            <div className="text-sm text-gray-600">Restantes</div>
          </Card>
        </div>

        {/* Controles */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={initializeGame}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition"
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

        {/* Dicas */}
        <AnimatePresence>
          {showHints && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <Card className="bg-yellow-50 border-2 border-yellow-300">
                <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Dicas:
                </h3>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• Cromossomo extra → Síndrome genética comum</li>
                  <li>• Cianose (pele azul) → Problema cardíaco</li>
                  <li>• Sede e xixi excessivos → Problema com açúcar no sangue</li>
                  <li>• Convulsões → Problema elétrico no cérebro</li>
                </ul>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Área do Jogo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coluna de Sintomas */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              🔍 Sintomas
            </h2>
            <div className="space-y-3">
              {symptoms.map((symptom) => {
                const isMatched = !!matches[symptom.id];
                const showFeedback = feedback?.id === symptom.id;

                if (isMatched) return null;

                return (
                  <motion.div
                    key={symptom.id}
                    draggable={!isMatched}
                    onDragStart={() => handleDragStart(symptom)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`cursor-move select-none ${
                      showFeedback
                        ? feedback.correct
                          ? 'animate-pulse bg-green-100 border-green-500'
                          : 'animate-shake bg-red-100 border-red-500'
                        : 'bg-white hover:bg-purple-50'
                    } p-4 rounded-lg border-2 border-purple-300 shadow-md transition-all`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">{symptom.text}</span>
                      {showFeedback && (
                        feedback.correct ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Coluna de Doenças */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              🏥 Doenças
            </h2>
            <div className="space-y-3">
              {diseases.map((disease) => {
                const matchedSymptom = Object.entries(matches).find(
                  ([_, diseaseId]) => diseaseId === disease.id
                );
                const isMatched = !!matchedSymptom;
                const matchColor = matchingData.find(
                  d => `disease-${d.id}` === disease.id
                )?.color || 'from-gray-400 to-gray-500';

                return (
                  <motion.div
                    key={disease.id}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(disease)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`${
                      isMatched
                        ? `bg-gradient-to-r ${matchColor} text-white`
                        : 'bg-white border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                    } p-4 rounded-lg shadow-md transition-all min-h-[60px] flex items-center justify-center`}
                  >
                    <div className="text-center w-full">
                      <div className="font-bold text-lg">{disease.text}</div>
                      {isMatched && matchedSymptom && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm mt-2 opacity-90"
                        >
                          ✓ {symptoms.find(s => s.id === matchedSymptom[0])?.text}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
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
                  Você completou todas as associações!
                </p>
                <div className="bg-purple-100 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{score}</div>
                      <div className="text-sm text-gray-600">Pontos</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{accuracy}%</div>
                      <div className="text-sm text-gray-600">Precisão</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setGameComplete(false);
                      initializeGame();
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition"
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
            <li><strong>1.</strong> Arraste um sintoma da coluna esquerda</li>
            <li><strong>2.</strong> Solte sobre a doença correspondente na coluna direita</li>
            <li><strong>3.</strong> Acertos somam 10 pontos! ✨</li>
            <li><strong>4.</strong> Complete todas as associações para vencer! 🏆</li>
          </ol>
        </Card>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default MatchingGame;
