import React, { useState } from 'react';
import { ArrowLeft, Users, MessageCircle, Heart, Share2, Plus, Filter } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

const Community: React.FC = () => {
  const { setCurrentPage } = useAppStore();
  const [selectedTab, setSelectedTab] = useState('posts');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const posts = [
    {
      id: 1,
      author: 'Maria S.',
      avatar: '👩‍⚕️',
      title: 'Dicas para fazer criança tomar remédio',
      content: 'Minha filha de 4 anos sempre resistia ao xarope. Descobri que misturar com um pouco de mel ajuda muito! Alguém mais tem dicas?',
      category: 'Medicamentos',
      likes: 23,
      comments: 8,
      timeAgo: '2h',
      isExpert: true
    },
    {
      id: 2,
      author: 'João P.',
      avatar: '👨',
      title: 'Primeira consulta no pediatra',
      content: 'Vou levar meu bebê de 2 meses no pediatra pela primeira vez. O que devo perguntar? Estou nervoso!',
      category: 'Consultas',
      likes: 15,
      comments: 12,
      timeAgo: '4h',
      isExpert: false
    },
    {
      id: 3,
      author: 'Dra. Ana Costa',
      avatar: '👩‍⚕️',
      title: 'Importância da vacinação em dia',
      content: 'Lembrando a todos os pais sobre manter o calendário de vacinação atualizado. É a melhor forma de proteger nossos pequenos!',
      category: 'Prevenção',
      likes: 45,
      comments: 6,
      timeAgo: '1d',
      isExpert: true,
      isPinned: true
    },
    {
      id: 4,
      author: 'Carla M.',
      avatar: '👩',
      title: 'Criança com medo de médico',
      content: 'Meu filho de 3 anos tem muito medo do médico. Como vocês lidam com isso? Alguma estratégia que funciona?',
      category: 'Comportamento',
      likes: 31,
      comments: 18,
      timeAgo: '1d',
      isExpert: false
    },
    {
      id: 5,
      author: 'Dr. Carlos Lima',
      avatar: '👨‍⚕️',
      title: 'Sinais de alerta: quando procurar urgência',
      content: 'Compartilho uma lista de sintomas que sempre devem ser avaliados rapidamente por um médico.',
      category: 'Emergência',
      likes: 67,
      comments: 15,
      timeAgo: '2d',
      isExpert: true,
      isPinned: true
    }
  ];

  const groups = [
    {
      id: 1,
      name: 'Mães de Primeira Viagem',
      members: 234,
      description: 'Apoio e dicas para mamães e papais novatos',
      emoji: '👶',
      color: 'from-pink-400 to-rose-400'
    },
    {
      id: 2,
      name: 'Pediatria Infantil',
      members: 156,
      description: 'Discussões sobre saúde infantil com profissionais',
      emoji: '🏥',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      id: 3,
      name: 'Alimentação Saudável',
      members: 189,
      description: 'Receitas e dicas de nutrição para crianças',
      emoji: '🥗',
      color: 'from-green-400 to-emerald-400'
    },
    {
      id: 4,
      name: 'Desenvolvimento Infantil',
      members: 201,
      description: 'Marcos do desenvolvimento e atividades educativas',
      emoji: '🧸',
      color: 'from-purple-400 to-pink-400'
    }
  ];

  const categories = ['all', 'Medicamentos', 'Consultas', 'Prevenção', 'Comportamento', 'Emergência', 'Alimentação'];

  const filteredPosts = posts.filter(post => 
    selectedCategory === 'all' || post.category === selectedCategory
  );

  const tabs = [
    { id: 'posts', label: 'Publicações', icon: MessageCircle },
    { id: 'groups', label: 'Grupos', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Comunidade</h1>
              <p className="text-gray-600 mt-1">Conecte-se com outras famílias e profissionais</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
            <div className="ml-auto">
              <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                <Plus className="w-4 h-4" />
                Nova Publicação
              </button>
            </div>
          </div>

          {/* Category Filter for Posts */}
          {selectedTab === 'posts' && (
            <div className="flex items-center gap-4">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas as categorias' : category}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {selectedTab === 'posts' && (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border ${
                  post.isPinned ? 'border-orange-200 bg-orange-50/50' : 'border-gray-100'
                }`}
              >
                {post.isPinned && (
                  <div className="mb-4 text-xs font-medium text-orange-600 flex items-center gap-1">
                    📌 Publicação fixada
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{post.avatar}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-800">{post.author}</h3>
                      {post.isExpert && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                          Profissional
                        </span>
                      )}
                      <span className="text-xs text-gray-500">{post.timeAgo}</span>
                    </div>
                    
                    <h4 className="font-medium text-gray-800 mb-2">{post.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{post.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                      
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'groups' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-orange-200 cursor-pointer group"
              >
                <div className={`bg-gradient-to-br ${group.color} p-8 flex items-center justify-center`}>
                  <div className="text-5xl">{group.emoji}</div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-orange-700 transition-colors">
                    {group.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {group.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{group.members} membros</span>
                    </div>
                    
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                      Participar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Community Guidelines */}
        <div className="mt-12 bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl p-8">
          <div className="text-center">
            <div className="text-5xl mb-4">🤝</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Diretrizes da Comunidade</h2>
            <p className="text-gray-600 mb-6">
              Nossa comunidade é um espaço seguro para compartilhar experiências e buscar apoio. 
              Sempre seja respeitoso e lembre-se que somos todos pais/cuidadores aprendendo juntos.
            </p>
            <button className="bg-white text-orange-600 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium">
              Ver Regras Completas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;