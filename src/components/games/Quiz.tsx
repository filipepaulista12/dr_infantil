import { useState } from 'react';

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  emoji: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'O que você aprendeu sobre Síndrome de Down?',
    emoji: '☀️',
    options: [
      {
        id: 'a',
        text: 'Uma condição genética que acontece quando uma pessoa nasce com um cromossomo extra. Isso faz com que ela se desenvolva de forma um pouco diferente, mas ainda pode ter uma vida feliz e cheia de conquistas!',
        isCorrect: true
      },
      {
        id: 'b',
        text: 'É uma doença que só afeta adultos muito idosos',
        isCorrect: false
      },
      {
        id: 'c',
        text: 'É algo que pode ser "pego" de outras pessoas',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Não é uma condição real, apenas imaginação',
        isCorrect: false
      }
    ],
    explanation: 'Muito bem! A Síndrome de Down é uma condição genética que faz as pessoas se desenvolverem de forma especial, mas elas podem ter vidas muito felizes e cheias de amor!'
  },
  {
    id: 'q2',
    question: 'Qual é uma característica do Transtorno do Espectro Autista?',
    emoji: '🌈',
    options: [
      {
        id: 'a',
        text: 'Pessoas com autismo não conseguem aprender nada',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'Cada pessoa com autismo é única e pode ter talentos especiais!',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Todas as pessoas com autismo são exatamente iguais',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'É algo que passa com o tempo',
        isCorrect: false
      }
    ],
    explanation: 'Perfeito! Pessoas com autismo são únicas e podem ter talentos incríveis em matemática, arte, música e muito mais!'
  },
  {
    id: 'q3',
    question: 'Por que pessoas com Síndrome de Williams são especiais?',
    emoji: '🎵',
    options: [
      {
        id: 'a',
        text: 'Elas não gostam de fazer amigos',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'Elas são muito tímidas e quietas',
        isCorrect: false
      },
      {
        id: 'c',
        text: 'Elas são super amigáveis e adoram música!',
        isCorrect: true
      },
      {
        id: 'd',
        text: 'Elas não conseguem aprender música',
        isCorrect: false
      }
    ],
    explanation: 'Isso mesmo! Pessoas com Síndrome de Williams são conhecidas por serem muito carinhosas e terem uma memória incrível para música!'
  }
];

interface QuizProps {
  onBack: () => void;
}

const Quiz = ({ onBack }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const question = quizQuestions[currentQuestion];

  const handleAnswerSelect = (optionId: string) => {
    if (showExplanation) return;
    
    setSelectedAnswer(optionId);
    const selectedOption = question.options.find(opt => opt.id === optionId);
    
    if (selectedOption?.isCorrect) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-4">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-white bg-opacity-20 text-white rounded-full font-body hover:bg-opacity-30 transition-all"
          >
            ← Voltar ao Menu
          </button>
          
          <div className="bg-white rounded-3xl p-8 text-center shadow-lg">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
              Parabéns! Quiz Concluído!
            </h2>
            
            <div className="text-2xl font-bold text-purple-600 mb-6">
              Sua pontuação: {score} de {quizQuestions.length}
            </div>
            
            <div className="mb-6">
              {score === quizQuestions.length && (
                <div className="text-lg text-green-600 font-medium">
                  🌟 Perfeito! Você entendeu tudo sobre as diferenças! 🌟
                </div>
              )}
              {score >= quizQuestions.length / 2 && score < quizQuestions.length && (
                <div className="text-lg text-blue-600 font-medium">
                  👏 Muito bem! Você está aprendendo sobre as diferenças!
                </div>
              )}
              {score < quizQuestions.length / 2 && (
                <div className="text-lg text-orange-600 font-medium">
                  💪 Continue aprendendo! Cada diferença é especial!
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={resetQuiz}
                className="px-6 py-3 bg-purple-500 text-white rounded-full font-body font-medium hover:bg-purple-600 transition-all"
              >
                🔄 Jogar Novamente
              </button>
              <button 
                onClick={onBack}
                className="px-6 py-3 bg-pink-500 text-white rounded-full font-body font-medium hover:bg-pink-600 transition-all"
              >
                🏠 Voltar ao Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-4">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white bg-opacity-20 text-white rounded-full font-body hover:bg-opacity-30 transition-all"
        >
          ← Voltar ao Menu
        </button>
        
        {/* Progress Bar */}
        <div className="bg-pink-600 rounded-full p-4 mb-6 text-white">
          <div className="flex justify-between items-center mb-2">
            <span className="font-body font-medium">Pergunta {currentQuestion + 1} de {quizQuestions.length}</span>
            <span className="font-body font-medium">Pontuação: {score}</span>
          </div>
          <div className="bg-pink-700 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">{question.emoji}</div>
            <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {question.options.map((option) => {
              let bgColor = 'bg-gray-50 hover:bg-gray-100';
              
              if (showExplanation && selectedAnswer === option.id) {
                bgColor = option.isCorrect ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400';
              } else if (showExplanation && option.isCorrect) {
                bgColor = 'bg-green-100 border-green-400';
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full p-4 text-left rounded-xl border-2 border-gray-200 ${bgColor} transition-all font-body`}
                  disabled={showExplanation}
                >
                  <div className="flex items-start space-x-3">
                    <span className="font-bold text-purple-600 text-lg">
                      {option.id.toUpperCase()}
                    </span>
                    <span className="text-gray-800 leading-relaxed">
                      {option.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">Explicação:</h3>
                  <p className="text-blue-700 font-body leading-relaxed">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <div className="text-center">
              <button 
                onClick={handleNext}
                className="px-8 py-3 bg-purple-500 text-white rounded-full font-body font-medium text-lg hover:bg-purple-600 transition-all transform hover:scale-105"
              >
                {currentQuestion < quizQuestions.length - 1 ? 'Próxima Pergunta →' : 'Ver Resultado 🎉'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;