import React, { useState } from 'react';
import { ArrowLeft, Play, Star, Clock, BookOpen, Heart } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

const Stories: React.FC = () => {
  const { setCurrentPage } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const stories = [
    {
      id: 1,
      title: 'A Aventura do Sabonete Mágico',
      description: 'Uma história divertida sobre a importância de lavar as mãos',
      category: 'Higiene',
      ageGroup: '3-6 anos',
      duration: '5 min',
      rating: 4.8,
      emoji: '🧼',
      cover: 'from-blue-400 to-cyan-400',
      chapters: 3,
      likes: 234
    },
    {
      id: 2,
      title: 'O Reino dos Dentes Branquinhos',
      description: 'Aprenda sobre higiene bucal com o Rei Dente e a Rainha Escova',
      category: 'Higiene Bucal',
      ageGroup: '4-8 anos',
      duration: '7 min',
      rating: 4.9,
      emoji: '🦷',
      cover: 'from-green-400 to-emerald-400',
      chapters: 4,
      likes: 312
    },
    {
      id: 3,
      title: 'A Jornada dos Anticorpos',
      description: 'Descubra como seu corpo se defende das doenças',
      category: 'Sistema Imunológico',
      ageGroup: '6-10 anos',
      duration: '10 min',
      rating: 4.7,
      emoji: '🛡️',
      cover: 'from-purple-400 to-pink-400',
      chapters: 5,
      likes: 189
    },
    {
      id: 4,
      title: 'O Mistério da Alimentação Colorida',
      description: 'Uma aventura para descobrir os benefícios dos alimentos coloridos',
      category: 'Nutrição',
      ageGroup: '4-9 anos',
      duration: '8 min',
      rating: 4.6,
      emoji: '🌈',
      cover: 'from-orange-400 to-red-400',
      chapters: 4,
      likes: 267
    },
    {
      id: 5,
      title: 'O Super-Herói do Sono',
      description: 'Aprenda sobre a importância de dormir bem com o Capitão Soneca',
      category: 'Hábitos Saudáveis',
      ageGroup: '3-7 anos',
      duration: '6 min',
      rating: 4.5,
      emoji: '😴',
      cover: 'from-indigo-400 to-purple-400',
      chapters: 3,
      likes: 198
    },
    {
      id: 6,
      title: 'A Máquina do Tempo dos Exercícios',
      description: 'Viaje no tempo descobrindo diferentes formas de se exercitar',
      category: 'Exercícios',
      ageGroup: '5-10 anos',
      duration: '12 min',
      rating: 4.4,
      emoji: '🏃‍♀️',
      cover: 'from-teal-400 to-blue-400',
      chapters: 6,
      likes: 156
    }
  ];

  const categories = ['all', 'Higiene', 'Higiene Bucal', 'Sistema Imunológico', 'Nutrição', 'Hábitos Saudáveis', 'Exercícios'];

  const filteredStories = stories.filter(story => 
    selectedCategory === 'all' || story.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Histórias Especiais</h1>
              <p className="text-gray-600 mt-1">Aprenda sobre saúde através de histórias divertidas</p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Categoria:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredStories.length === 1 
              ? '1 história encontrada' 
              : `${filteredStories.length} histórias encontradas`
            }
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-pink-200 cursor-pointer group"
            >
              {/* Story Cover */}
              <div className={`relative bg-gradient-to-br ${story.cover} p-12 flex items-center justify-center`}>
                <div className="text-6xl">{story.emoji}</div>
                <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1 text-xs font-medium text-gray-700">
                  {story.chapters} capítulos
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-8 h-8 text-pink-600 ml-1" />
                  </div>
                </div>
              </div>

              {/* Story Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
                    {story.category}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{story.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-pink-700 transition-colors">
                  {story.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {story.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{story.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{story.ageGroup}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{story.likes}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-medium flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  Começar História
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mt-12 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8">
          <div className="text-center">
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Histórias Personalizadas</h2>
            <p className="text-gray-600 mb-6">
              Em breve: histórias adaptadas para a idade e interesses específicos da sua criança
            </p>
            <button className="bg-white text-pink-600 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium">
              Saber Mais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;