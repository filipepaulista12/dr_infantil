import { useState, useEffect } from 'react';
import { X, Send, Smile, Meh, Frown } from 'lucide-react';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type FeedbackType = 'suggestion' | 'bug' | 'compliment' | 'other';
type SatisfactionLevel = 'happy' | 'neutral' | 'sad' | null;

interface FeedbackData {
  type: FeedbackType;
  satisfaction: SatisfactionLevel;
  message: string;
  email?: string;
  timestamp: string;
}

export default function FeedbackForm({ isOpen, onClose }: FeedbackFormProps) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('suggestion');
  const [satisfaction, setSatisfaction] = useState<SatisfactionLevel>(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Adicionar suporte para tecla ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    setIsSubmitting(true);

    // Simular envio e salvar no localStorage
    const feedbackData: FeedbackData = {
      type: feedbackType,
      satisfaction,
      message: message.trim(),
      email: email.trim() || undefined,
      timestamp: new Date().toISOString()
    };

    try {
      // Salvar no localStorage
      const existingFeedback = JSON.parse(localStorage.getItem('dr_infantil_feedback') || '[]');
      existingFeedback.push(feedbackData);
      localStorage.setItem('dr_infantil_feedback', JSON.stringify(existingFeedback));

      // Simular delay de envio
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSuccess(true);
      
      // Reset form após 2 segundos
      setTimeout(() => {
        setMessage('');
        setEmail('');
        setSatisfaction(null);
        setFeedbackType('suggestion');
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Erro ao salvar feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
            aria-label="Fechar formulário de feedback"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 id="feedback-title" className="text-3xl font-bold mb-2">
            💬 Conte-nos sua opinião!
          </h2>
          <p className="text-purple-100">
            Sua opinião nos ajuda a melhorar o DR Infantil para todos! 🌟
          </p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Feedback Enviado!
              </h3>
              <p className="text-gray-600">
                Muito obrigado por compartilhar sua opinião conosco! ❤️
              </p>
            </div>
          ) : (
            <>
              {/* Satisfaction Level */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Como você está se sentindo hoje? 😊
                </label>
                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    onClick={() => setSatisfaction('happy')}
                    className={`p-4 rounded-xl border-2 transition-all transform hover:scale-110 ${
                      satisfaction === 'happy'
                        ? 'border-green-500 bg-green-50 scale-110'
                        : 'border-gray-300 hover:border-green-300'
                    }`}
                    aria-label="Muito feliz"
                    aria-pressed={satisfaction === 'happy'}
                  >
                    <Smile className="w-12 h-12 text-green-500" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSatisfaction('neutral')}
                    className={`p-4 rounded-xl border-2 transition-all transform hover:scale-110 ${
                      satisfaction === 'neutral'
                        ? 'border-yellow-500 bg-yellow-50 scale-110'
                        : 'border-gray-300 hover:border-yellow-300'
                    }`}
                    aria-label="Neutro"
                    aria-pressed={satisfaction === 'neutral'}
                  >
                    <Meh className="w-12 h-12 text-yellow-500" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSatisfaction('sad')}
                    className={`p-4 rounded-xl border-2 transition-all transform hover:scale-110 ${
                      satisfaction === 'sad'
                        ? 'border-red-500 bg-red-50 scale-110'
                        : 'border-gray-300 hover:border-red-300'
                    }`}
                    aria-label="Triste"
                    aria-pressed={satisfaction === 'sad'}
                  >
                    <Frown className="w-12 h-12 text-red-500" />
                  </button>
                </div>
              </div>

              {/* Feedback Type */}
              <div>
                <label htmlFor="feedback-type" className="block text-lg font-semibold text-gray-800 mb-3">
                  O que você gostaria de compartilhar?
                </label>
                <select
                  id="feedback-type"
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value as FeedbackType)}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none text-gray-800"
                  aria-label="Tipo de feedback"
                >
                  <option value="suggestion">💡 Sugestão</option>
                  <option value="bug">🐛 Reportar um problema</option>
                  <option value="compliment">⭐ Elogio</option>
                  <option value="other">💬 Outro</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="feedback-message" className="block text-lg font-semibold text-gray-800 mb-3">
                  Sua mensagem *
                </label>
                <textarea
                  id="feedback-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Conte-nos o que você pensa... Como podemos melhorar?"
                  rows={5}
                  required
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none resize-none text-gray-800"
                  aria-required="true"
                  aria-describedby="message-hint"
                />
                <p id="message-hint" className="text-sm text-gray-500 mt-2">
                  Mínimo de 10 caracteres
                </p>
              </div>

              {/* Email (Optional) */}
              <div>
                <label htmlFor="feedback-email" className="block text-lg font-semibold text-gray-800 mb-3">
                  Email (opcional)
                </label>
                <input
                  id="feedback-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none text-gray-800"
                  aria-label="Seu email (opcional)"
                  aria-describedby="email-hint"
                />
                <p id="email-hint" className="text-sm text-gray-500 mt-2">
                  Se quiser receber uma resposta, deixe seu email!
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  aria-label="Cancelar feedback"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || message.trim().length < 10}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:scale-105 transform transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  aria-label="Enviar feedback"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Feedback
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
