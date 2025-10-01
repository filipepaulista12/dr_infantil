import React, { useState } from 'react';
import { X, Send, Tag, Type, FileText } from 'lucide-react';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: any) => Promise<void>;
  isLoading?: boolean;
}

const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Título deve ter pelo menos 5 caracteres';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Título não pode ter mais que 200 caracteres';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Conteúdo é obrigatório';
    } else if (formData.content.length < 20) {
      newErrors.content = 'Conteúdo deve ter pelo menos 20 caracteres';
    } else if (formData.content.length > 5000) {
      newErrors.content = 'Conteúdo não pode ter mais que 5000 caracteres';
    }

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
      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      };

      await onSubmit(postData);
      
      // Reset form on success
      setFormData({
        title: '',
        content: '',
        category: '',
        tags: ''
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Erro ao criar post:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Nova Publicação</h2>
                <p className="text-purple-100 text-sm">Compartilhe sua experiência com a comunidade</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all"
              disabled={isLoading}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Título */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Type className="h-4 w-4" />
                Título da Publicação
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ex: Como lidar com as primeiras crises..."
                className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                disabled={isLoading}
                maxLength={200}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                {formData.title.length}/200 caracteres
              </p>
            </div>

            {/* Categoria */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Tag className="h-4 w-4" />
                Categoria
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.category ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                disabled={isLoading}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Conteúdo */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FileText className="h-4 w-4" />
                Conteúdo
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Compartilhe sua experiência, dúvida ou dica com a comunidade..."
                rows={8}
                className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none ${
                  errors.content ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                disabled={isLoading}
                maxLength={5000}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                {formData.content.length}/5000 caracteres
              </p>
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Tag className="h-4 w-4" />
                Tags (opcional)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="Ex: autismo, escola, dicas (separadas por vírgula)"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
              <p className="text-gray-500 text-xs mt-1">
                Separe as tags com vírgulas para facilitar a busca
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Publicando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Publicar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPostModal;