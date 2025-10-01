import React, { useState } from 'react';
import { ArrowLeft, Search, Download, FileText, Video, Image, BookOpen, ExternalLink, Star, Calendar } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

const Resources: React.FC = () => {
  const { setCurrentPage } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const resources = [
    {
      id: 1,
      title: 'Cartão de Vacinação Digital',
      description: 'Template para controle de vacinas com lembretes automáticos',
      category: 'Documentos',
      type: 'PDF',
      size: '2.3 MB',
      downloads: 1234,
      rating: 4.9,
      emoji: '💉',
      isPopular: true,
      lastUpdated: '2024-12-15'
    },
    {
      id: 2,
      title: 'Guia de Primeiros Socorros',
      description: 'Manual completo de primeiros socorros para crianças',
      category: 'Emergência',
      type: 'PDF',
      size: '5.1 MB',
      downloads: 892,
      rating: 4.8,
      emoji: '🚑',
      isPopular: true,
      lastUpdated: '2024-12-10'
    },
    {
      id: 3,
      title: 'Tabela de Crescimento Infantil',
      description: 'Gráficos para acompanhar peso e altura por idade',
      category: 'Desenvolvimento',
      type: 'PDF',
      size: '1.8 MB',
      downloads: 756,
      rating: 4.7,
      emoji: '📏',
      isPopular: false,
      lastUpdated: '2024-12-08'
    },
    {
      id: 4,
      title: 'Receitas Nutritivas para Crianças',
      description: 'Ebook com 50 receitas saudáveis e saborosas',
      category: 'Alimentação',
      type: 'PDF',
      size: '8.2 MB',
      downloads: 1567,
      rating: 4.9,
      emoji: '👨‍🍳',
      isPopular: true,
      lastUpdated: '2024-12-12'
    },
    {
      id: 5,
      title: 'Exercícios em Casa para Crianças',
      description: 'Vídeos de atividades físicas para fazer em família',
      category: 'Exercícios',
      type: 'Video',
      size: '45 min',
      downloads: 634,
      rating: 4.6,
      emoji: '🏃‍♀️',
      isPopular: false,
      lastUpdated: '2024-12-05'
    },
    {
      id: 6,
      title: 'Checklist de Consulta Médica',
      description: 'Lista de perguntas importantes para levar ao pediatra',
      category: 'Consultas',
      type: 'PDF',
      size: '0.8 MB',
      downloads: 923,
      rating: 4.8,
      emoji: '📋',
      isPopular: false,
      lastUpdated: '2024-12-14'
    },
    {
      id: 7,
      title: 'Sinais de Alerta por Idade',
      description: 'Infográfico com sintomas que requerem atenção médica',
      category: 'Emergência',
      type: 'Imagem',
      size: '2.1 MB',
      downloads: 1089,
      rating: 4.9,
      emoji: '⚠️',
      isPopular: true,
      lastUpdated: '2024-12-11'
    },
    {
      id: 8,
      title: 'Calendário de Marcos do Desenvolvimento',
      description: 'Acompanhe o desenvolvimento do seu filho mês a mês',
      category: 'Desenvolvimento',
      type: 'PDF',
      size: '3.4 MB',
      downloads: 567,
      rating: 4.7,
      emoji: '📅',
      isPopular: false,
      lastUpdated: '2024-12-09'
    }
  ];

  const categories = ['all', 'Documentos', 'Emergência', 'Desenvolvimento', 'Alimentação', 'Exercícios', 'Consultas'];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-4 h-4" />;
      case 'Video': return <Video className="w-4 h-4" />;
      case 'Imagem': return <Image className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-100 text-red-800';
      case 'Video': return 'bg-blue-100 text-blue-800';
      case 'Imagem': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const popularResources = resources.filter(r => r.isPopular).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 text-teal-600 hover:text-teal-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Centro de Recursos</h1>
              <p className="text-gray-600 mt-1">Materiais úteis para cuidar da saúde do seu filho</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Pesquisar recursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Todas as categorias' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Popular Resources */}
        {selectedCategory === 'all' && searchTerm === '' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 Recursos Mais Baixados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-2xl p-6 shadow-md border-2 border-teal-200 hover:border-teal-300 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{resource.emoji}</div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{resource.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{resource.downloads} downloads</span>
                    <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      Baixar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredResources.length === 1 
              ? '1 recurso encontrado' 
              : `${filteredResources.length} recursos encontrados`
            }
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-teal-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{resource.emoji}</div>
                <div className="flex items-center gap-2">
                  {resource.isPopular && (
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                      Popular
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{resource.rating}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">{resource.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

              <div className="flex items-center gap-2 mb-4">
                <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                  {getTypeIcon(resource.type)}
                  {resource.type}
                </span>
                <span className="text-xs text-gray-500">{resource.size}</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {resource.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  {new Date(resource.lastUpdated).toLocaleDateString('pt-BR')}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gray-500">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">{resource.downloads}</span>
                </div>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-1 text-sm font-medium">
                  <Download className="w-4 h-4" />
                  Baixar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhum recurso encontrado
            </h3>
            <p className="text-gray-500 mb-6">
              Tente ajustar os filtros ou termo de pesquisa
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {/* Need Help Section */}
        <div className="mt-12 bg-gradient-to-r from-teal-100 to-blue-100 rounded-2xl p-8">
          <div className="text-center">
            <div className="text-5xl mb-4">💡</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Não encontrou o que procura?</h2>
            <p className="text-gray-600 mb-6">
              Nossa equipe está sempre criando novos recursos. Sugerir um material ou fazer uma pergunta específica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-teal-600 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Sugerir Recurso
              </button>
              <button className="bg-white text-teal-600 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Fale Conosco
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;