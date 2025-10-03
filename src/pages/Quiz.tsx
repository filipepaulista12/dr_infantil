import { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { trackEvent, trackPageView } from '../utils/analytics';

interface QuizQuestion {
  id: number;
  emoji: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    emoji: '🌟',
    question: 'O que você aprendeu sobre Síndrome de Down?',
    options: [
      'Uma condição genética que acontece quando uma pessoa nasce com um cromossomo extra. Isso faz com que ela se desenvolva de forma um pouco diferente, mas ainda pode ter uma vida feliz e cheia de conquistas!',
      'É uma doença que só afeta adultos muito idosos',
      'É algo que pode ser "pego" de outras pessoas',
      'Não é uma condição real, apenas imaginação'
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    emoji: '🧩',
    question: 'Qual é uma característica do Autismo?',
    options: [
      'É uma doença contagiosa',
      'Faz com que a pessoa seja menos inteligente',
      'Afeta a forma como a pessoa se comunica e interage com o mundo, mas cada pessoa autista é única e especial!',
      'Só acontece com crianças'
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    emoji: '💙',
    question: 'O que é Fibrose Cística?',
    options: [
      'Uma doença que afeta os pulmões e o sistema digestivo, fazendo com que o corpo produza um muco muito espesso',
      'Uma doença que afeta apenas a pele',
      'Uma condição que desaparece com a idade',
      'Uma doença causada por não lavar as mãos'
    ],
    correctAnswer: 0
  },
  {
    id: 4,
    emoji: '🌈',
    question: 'Como devemos tratar pessoas com doenças raras?',
    options: [
      'Devemos evitar falar com elas',
      'Devemos tratá-las com respeito, carinho e empatia, assim como tratamos todos!',
      'Devemos ter pena delas',
      'Devemos fingir que não existem diferenças'
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    emoji: '✨',
    question: 'O que significa ser diferente?',
    options: [
      'Significa que há algo errado com a pessoa',
      'Significa que a pessoa não pode ter amigos',
      'Significa ser único e especial, com características próprias que tornam cada pessoa maravilhosa!',
      'Significa que a pessoa precisa de cura'
    ],
    correctAnswer: 2
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    trackPageView('quiz');
  }, []);

  // ESC para voltar quando quiz está completo
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && quizComplete) {
        restartQuiz();
      }
    };

    if (quizComplete) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [quizComplete]);

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const question = quizQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correctAnswer;
    trackEvent('quiz_answer_selected', {
      questionId: question.id,
      answerIndex,
      isCorrect
    });
    
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      setShowResult(true);
    }, 500);
  };

  const handleNextQuestion = () => {
    const question = quizQuestions[currentQuestion];
    const wasCorrect = selectedAnswer === question.correctAnswer;
    trackEvent('quiz_next_question', {
      questionId: question.id,
      wasCorrect
    });

    setShowResult(false);
    setSelectedAnswer(null);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
      const finalScore = score;
      const percentage = (finalScore / quizQuestions.length) * 100;
      trackEvent('quiz_completed', {
        score: finalScore,
        totalQuestions: quizQuestions.length,
        percentage
      });
    }
  };

  const restartQuiz = () => {
    trackEvent('quiz_restarted', {
      finalScore: score,
      totalQuestions: quizQuestions.length
    });
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (quizComplete) {
    const percentage = (score / quizQuestions.length) * 100;
    
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
              <p className="text-xl md:text-2xl text-purple-100 font-medium mb-2">
                Aprendendo sobre doenças raras com carinho e diversão! 🌈
              </p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-purple-200 p-8">
              <div className="text-center">
                <div className="text-8xl mb-6">🎉</div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  {percentage >= 80 ? 'Parabéns!' : percentage >= 60 ? 'Muito Bem!' : 'Continue Tentando!'}
                </h2>
                <p className="text-2xl text-gray-600 mb-6">
                  Você acertou {score} de {quizQuestions.length} perguntas!
                </p>
                
                <div className="w-full max-w-md mx-auto mb-8">
                  <div className="bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-600 h-full flex items-center justify-center text-white font-bold transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage.toFixed(0)}%
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-600 mb-8" aria-live="polite">
                  {percentage >= 80 
                    ? 'Você é incrível! Aprendeu muito sobre doenças raras! 🌟' 
                    : percentage >= 60 
                    ? 'Você está no caminho certo! Continue aprendendo! 💪'
                    : 'Não desista! Cada tentativa nos ajuda a aprender mais! 🌈'}
                </p>

                <button
                  onClick={restartQuiz}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-xl hover:scale-105 transform transition-all duration-200 shadow-lg"
                >
                  🔄 Jogar Novamente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

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
              Quiz Divertido sobre Doenças Raras 🎮
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🎮 Quiz Divertido sobre Doenças Raras 🎮</h2>
            <p className="text-lg text-gray-600">Vamos testar o que você aprendeu de forma divertida!</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-purple-200">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
              <div className="flex justify-between items-center text-white mb-2">
                <span className="font-semibold">Pergunta {currentQuestion + 1} de {quizQuestions.length}</span>
                <span className="font-semibold">Pontuação: {score}</span>
              </div>
              <div className="w-full bg-white bg-opacity-30 rounded-full h-3">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{question.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-800 leading-relaxed">
                  {question.question}
                </h3>
              </div>

              <div className="space-y-4 mb-8">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === question.correctAnswer;
                  
                  let buttonClass = 'w-full p-4 text-left rounded-xl border-2 transition-all duration-200 transform hover:scale-102 ';
                  
                  if (selectedAnswer === null) {
                    buttonClass += 'bg-gray-50 border-gray-200 hover:bg-purple-50 hover:border-purple-300';
                  } else if (isSelected) {
                    buttonClass += isCorrect 
                      ? 'bg-green-100 border-green-400 scale-102' 
                      : 'bg-red-100 border-red-400';
                  } else if (isCorrect && selectedAnswer !== null) {
                    buttonClass += 'bg-green-100 border-green-400';
                  } else {
                    buttonClass += 'bg-gray-50 border-gray-200 opacity-60';
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null}
                      className={buttonClass}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                          selectedAnswer === null 
                            ? 'border-gray-300' 
                            : isCorrect 
                            ? 'border-green-500 bg-green-500 text-white' 
                            : isSelected 
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-gray-300'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div className="text-center" aria-live="polite">
                  <div className={`mb-6 p-6 rounded-xl ${
                    selectedAnswer === question.correctAnswer 
                      ? 'bg-green-100 border-2 border-green-300' 
                      : 'bg-yellow-100 border-2 border-yellow-300'
                  }`}>
                    <p className="text-2xl font-bold mb-2">
                      {selectedAnswer === question.correctAnswer ? '🎉 Correto!' : '💡 Quase lá!'}
                    </p>
                    <p className="text-lg text-gray-700">
                      {selectedAnswer === question.correctAnswer 
                        ? 'Você está aprendendo muito bem!' 
                        : 'Continue tentando, cada erro é uma oportunidade de aprender!'}
                    </p>
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-xl hover:scale-105 transform transition-all duration-200 shadow-lg"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? 'Próxima Pergunta ➡️' : 'Ver Resultado 🎯'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
