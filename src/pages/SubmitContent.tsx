import { useState } from 'react';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import ContentSubmissionForm from '../components/community/ContentSubmissionForm';
import { addSubmission } from '../utils/submissionStorage';
import type { ContentSubmission } from '../types/ContentSubmission';

const SubmitContent = () => {
  const { setCurrentPage } = useAppStore();
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  
  const handleSubmit = (submission: Omit<ContentSubmission, 'id' | 'timestamp' | 'status' | 'submittedAt'>) => {
    const newSubmission = addSubmission(submission);
    setSubmissionId(newSubmission.id);
    setSubmitted(true);
    
    // Track analytics
    console.log('📊 Analytics: Content submitted', {
      type: submission.contentType,
      submitterType: submission.submitter.type,
    });
  };
  
  const handleBack = () => {
    setCurrentPage('home');
  };
  
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto animate-bounce" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎉 Submissão Enviada com Sucesso!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Obrigado por contribuir com nossa comunidade! Sua submissão será revisada em breve.
          </p>
          
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-700 mb-3">
              <strong>ID da Submissão:</strong>
            </p>
            <code className="text-purple-700 font-mono text-sm bg-white px-4 py-2 rounded border border-purple-200 inline-block">
              {submissionId}
            </code>
            <p className="text-xs text-gray-600 mt-3">
              Guarde este ID para acompanhar o status da sua submissão
            </p>
          </div>
          
          <div className="space-y-3 text-left bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-3">📬 Próximos Passos:</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>✅ Você receberá um email de confirmação em instantes</p>
              <p>👀 Nossa equipe revisará seu conteúdo em até 14 dias</p>
              <p>📧 Enviaremos atualizações por email</p>
              <p>💬 Se precisarmos de esclarecimentos, entraremos em contato</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => setSubmitted(false)}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Enviar Outra Submissão
            </button>
            
            <button
              onClick={handleBack}
              className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar para Início
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              💜 Obrigado por tornar nossa comunidade mais rica e informada!
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <ContentSubmissionForm
        onSubmit={handleSubmit}
        onCancel={handleBack}
      />
    </div>
  );
};

export default SubmitContent;
