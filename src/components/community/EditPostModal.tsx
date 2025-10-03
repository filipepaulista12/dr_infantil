import React, { useState, useEffect } from 'react';
import { X, Send, Tag, Type, FileText, Clock } from 'lucide-react';

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: any) => Promise<void>;
  isLoading?: boolean;
  postData?: {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
  };
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  postData
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { value: 'pergunta', label: '❓ Pergunta' },
    { value: 'experiencia', label: '💭 Experiência' },
    { value: 'dica', label: '💡 Dica' },
    { value: 'apoio', label: '🤝 Apoio' },
    { value: 'recursos', label: '📚 Recursos' },
    { value: 'geral', label: '💬 Geral' }
  ];

  // Carregar dados do post quando o modal abrir
  useEffect(() => {
    if (isOpen && postData) {
      setFormData({
        title: postData.title,
        content: postData.content,
        category: postData.category,
        tags: postData.tags?.join(', ') || ''
      });
      setErrors({});
    }
  }, [isOpen, postData]);

  // Resetar formulário quando fechar
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: '',
        content: '',
        category: '',
        tags: ''
      });
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validar título
    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Título deve ter pelo menos 5 caracteres';
    } else if (formData.title.trim().length > 200) {
      newErrors.title = 'Título deve ter no máximo 200 caracteres';
    }

    // Validar conteúdo
    if (!formData.content.trim()) {
      newErrors.content = 'Conteúdo é obrigatório';
    } else if (formData.content.trim().length < 20) {
      newErrors.content = 'Conteúdo deve ter pelo menos 20 caracteres';
    } else if (formData.content.trim().length > 5000) {
      newErrors.content = 'Conteúdo deve ter no máximo 5000 caracteres';
    }

    // Validar categoria
    if (!formData.category) {
      newErrors.category = 'Categoria é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const submitData = {
        id: postData?.id,
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category,
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0)
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error('Erro ao editar post:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  const titleCharCount = formData.title.length;
  const contentCharCount = formData.content.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6" />
              <h2 className="text-xl font-bold">Editar Publicação</h2>
            </div>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="p-2 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-white/90 mt-2">
            Atualize sua publicação na comunidade
          </p>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Type className="w-4 h-4" />
                Título da Publicação
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Digite um título chamativo..."
                disabled={isLoading}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-purple-300'
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.title && (
                  <span className="text-red-500 text-sm">{errors.title}</span>
                )}
                <span className={`text-sm ml-auto ${
                  titleCharCount > 180 ? 'text-red-500' : 
                  titleCharCount > 150 ? 'text-yellow-500' : 'text-gray-500'
                }`}>
                  {titleCharCount}/200
                </span>
              </div>
            </div>

            {/* Categoria */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Tag className="w-4 h-4" />
                Categoria
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                disabled={isLoading}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.category ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-purple-300'
                }`}
              >
                <option value="">Selecione uma categoria...</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-500 text-sm mt-1 block">{errors.category}</span>
              )}
            </div>

            {/* Conteúdo */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4" />
                Conteúdo
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Compartilhe sua experiência, tire dúvidas ou ofereça ajuda..."
                rows={8}
                disabled={isLoading}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.content ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-purple-300'
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.content && (
                  <span className="text-red-500 text-sm">{errors.content}</span>
                )}
                <span className={`text-sm ml-auto ${
                  contentCharCount > 4500 ? 'text-red-500' : 
                  contentCharCount > 4000 ? 'text-yellow-500' : 'text-gray-500'
                }`}>
                  {contentCharCount}/5000
                </span>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Tag className="w-4 h-4" />
                Tags (opcional)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="pediatria, saúde infantil, desenvolvimento..."
                disabled={isLoading}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <p className="text-gray-500 text-sm mt-1">
                Separe as tags com vírgulas para facilitar a busca
              </p>
            </div>

            {/* Indicador de edição */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <p className="text-yellow-800 text-sm">
                <strong>Atenção:</strong> Esta publicação será marcada como editada após a atualização.
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !formData.title.trim() || !formData.content.trim() || !formData.category}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Atualizar Publicação
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;