import { useState } from 'react';

interface CommunityPost {
  id: string;
  author: string;
  authorType: 'parent' | 'teacher' | 'professional';
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  timeAgo: string;
  avatar: string;
}

interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'online' | 'presencial';
  location: string;
  description: string;
  organizer: string;
  emoji: string;
}

const communityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    author: 'Ana Maria S.',
    authorType: 'parent',
    title: 'Dicas para explicar autismo na escola',
    content: 'Ontem tive uma conversa muito especial com a professora do meu filho sobre como explicar o autismo para os colegas. Gostaria de compartilhar algumas estratégias que funcionaram muito bem...',
    tags: ['autismo', 'escola', 'inclusão'],
    likes: 24,
    comments: 8,
    timeAgo: '2 horas atrás',
    avatar: '👩‍🏫'
  },
  {
    id: 'post-2',
    author: 'Prof. João Silva',
    authorType: 'teacher',
    title: 'Atividades inclusivas que funcionam',
    content: 'Como educador há 15 anos, descobri algumas atividades que realmente promovem a inclusão na sala de aula. Vou compartilhar 5 que sempre dão certo...',
    tags: ['atividades', 'inclusão', 'educação'],
    likes: 45,
    comments: 12,
    timeAgo: '1 dia atrás',
    avatar: '👨‍🏫'
  },
  {
    id: 'post-3',
    author: 'Dra. Carla Santos',
    authorType: 'professional',
    title: 'Marcos do desenvolvimento: quando se preocupar?',
    content: 'Muitos pais me perguntam sobre os marcos do desenvolvimento. Vou explicar de forma simples quando é normal haver variações e quando buscar ajuda...',
    tags: ['desenvolvimento', 'marcos', 'orientação'],
    likes: 67,
    comments: 23,
    timeAgo: '3 dias atrás',
    avatar: '👩‍⚕️'
  }
];

const communityEvents: CommunityEvent[] = [
  {
    id: 'event-1',
    title: 'Roda de Conversa: Famílias e Inclusão',
    date: '15 de Outubro',
    time: '19h00',
    type: 'online',
    location: 'Zoom - Link será enviado',
    description: 'Encontro mensal para pais e familiares compartilharem experiências sobre inclusão.',
    organizer: 'Associação Mundo das Diferenças',
    emoji: '💬'
  },
  {
    id: 'event-2',
    title: 'Workshop: Jogos Inclusivos',
    date: '22 de Outubro',
    time: '14h00',
    type: 'presencial',
    location: 'Centro Comunitário - Rua das Flores, 123',
    description: 'Aprenda a criar e adaptar jogos para incluir todas as crianças.',
    organizer: 'Professora Marina Lima',
    emoji: '🎲'
  },
  {
    id: 'event-3',
    title: 'Palestra: Tecnologia Assistiva',
    date: '30 de Outubro',
    time: '16h30',
    type: 'online',
    location: 'YouTube Live',
    description: 'Descobra como a tecnologia pode ajudar crianças com necessidades especiais.',
    organizer: 'Instituto de Tecnologia Inclusiva',
    emoji: '💻'
  }
];

interface CommunityProps {
  onBack: () => void;
}

const Community = ({ onBack }: CommunityProps) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'events' | 'support'>('posts');

  const getAuthorTypeColor = (type: CommunityPost['authorType']) => {
    switch (type) {
      case 'parent': return 'bg-pink-100 text-pink-700';
      case 'teacher': return 'bg-blue-100 text-blue-700';
      case 'professional': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAuthorTypeLabel = (type: CommunityPost['authorType']) => {
    switch (type) {
      case 'parent': return 'Família';
      case 'teacher': return 'Educador';
      case 'professional': return 'Profissional';
      default: return 'Membro';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-4">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white bg-opacity-20 text-white rounded-full font-body hover:bg-opacity-30 transition-all"
        >
          ← Voltar ao Menu
        </button>

        {/* Header */}
        <div className="text-center mb-8 text-white">
          <h1 className="text-4xl font-heading font-bold mb-2">
            🤝 Comunidade Mundo das Diferenças 🤝
          </h1>
          <p className="text-xl font-body">
            Um espaço para famílias, educadores e profissionais se conectarem e compartilharem
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-6 py-3 rounded-full font-body font-medium transition-all ${
                activeTab === 'posts'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              💬 Conversas
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-3 rounded-full font-body font-medium transition-all ${
                activeTab === 'events'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📅 Eventos
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`px-6 py-3 rounded-full font-body font-medium transition-all ${
                activeTab === 'support'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🆘 Ajuda
            </button>
          </div>
        </div>

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-heading font-bold text-gray-800 mb-4 text-center">
                💭 Compartilhe sua Experiência
              </h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <textarea
                  placeholder="Conte para a comunidade sobre sua experiência, dúvida ou descoberta..."
                  className="w-full p-4 rounded-lg border-2 border-gray-300 font-body text-gray-700 focus:border-purple-500 focus:outline-none resize-none"
                  rows={3}
                />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-body cursor-pointer">
                      #dica
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-body cursor-pointer">
                      #dúvida
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-body cursor-pointer">
                      #conquista
                    </span>
                  </div>
                  <button className="px-6 py-2 bg-purple-500 text-white rounded-full font-body font-medium hover:bg-purple-600 transition-all">
                    Compartilhar
                  </button>
                </div>
              </div>
            </div>

            {communityPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{post.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-heading font-bold text-gray-800">{post.author}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-body ${getAuthorTypeColor(post.authorType)}`}>
                        {getAuthorTypeLabel(post.authorType)}
                      </span>
                      <span className="text-gray-500 text-sm font-body">• {post.timeAgo}</span>
                    </div>
                    
                    <h3 className="text-lg font-heading font-bold text-gray-800 mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="font-body text-gray-700 leading-relaxed mb-4">
                      {post.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-body"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-6 text-gray-600">
                      <button className="flex items-center space-x-1 font-body text-sm hover:text-purple-600 transition-all">
                        <span>❤️</span>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 font-body text-sm hover:text-purple-600 transition-all">
                        <span>💬</span>
                        <span>{post.comments} comentários</span>
                      </button>
                      <button className="font-body text-sm hover:text-purple-600 transition-all">
                        Compartilhar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {communityEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-3xl p-6 shadow-lg">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">{event.emoji}</div>
                    <h3 className="text-xl font-heading font-bold text-gray-800 mb-2">
                      {event.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="font-body font-medium text-gray-700">📅 Data:</span>
                      <span className="font-body text-gray-600">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="font-body font-medium text-gray-700">⏰ Horário:</span>
                      <span className="font-body text-gray-600">{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="font-body font-medium text-gray-700">
                        {event.type === 'online' ? '💻' : '📍'} Local:
                      </span>
                      <span className="font-body text-gray-600">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="font-body font-medium text-gray-700">👥 Organizador:</span>
                      <span className="font-body text-gray-600">{event.organizer}</span>
                    </div>
                  </div>
                  
                  <p className="font-body text-gray-700 leading-relaxed mb-6">
                    {event.description}
                  </p>
                  
                  <div className="text-center space-y-2">
                    <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-full font-body font-medium hover:bg-purple-600 transition-all">
                      Participar
                    </button>
                    <button className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-body font-medium hover:bg-gray-300 transition-all">
                      Adicionar ao Calendário
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
                <div className="text-6xl mb-4">🆘</div>
                <h3 className="text-2xl font-heading font-bold text-gray-800 mb-4">
                  Precisa de Ajuda Urgente?
                </h3>
                <p className="font-body text-gray-700 leading-relaxed mb-6">
                  Se você ou sua família precisam de apoio imediato, estamos aqui para ajudar.
                </p>
                <button className="px-8 py-3 bg-red-500 text-white rounded-full font-body font-medium hover:bg-red-600 transition-all">
                  Buscar Ajuda Agora
                </button>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
                <div className="text-6xl mb-4">📞</div>
                <h3 className="text-2xl font-heading font-bold text-gray-800 mb-4">
                  Linhas de Apoio
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-body font-medium text-blue-800">CVV - Centro de Valorização da Vida</p>
                    <p className="font-body text-blue-700">188 (24h, gratuito)</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="font-body font-medium text-green-800">Disque Saúde</p>
                    <p className="font-body text-green-700">136 (24h)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-heading font-bold text-gray-800 mb-6 text-center">
                🤝 Recursos de Apoio
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">👥</div>
                  <h4 className="font-heading font-bold text-gray-800 mb-2">Grupos de Apoio</h4>
                  <p className="font-body text-gray-600 text-sm mb-3">
                    Conecte-se com outras famílias que passam por situações similares.
                  </p>
                  <button className="px-4 py-2 bg-purple-500 text-white rounded-full font-body text-sm hover:bg-purple-600 transition-all">
                    Encontrar Grupo
                  </button>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-3">🏥</div>
                  <h4 className="font-heading font-bold text-gray-800 mb-2">Profissionais</h4>
                  <p className="font-body text-gray-600 text-sm mb-3">
                    Encontre especialistas e profissionais qualificados na sua região.
                  </p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-full font-body text-sm hover:bg-blue-600 transition-all">
                    Buscar Especialistas
                  </button>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-3">🏛️</div>
                  <h4 className="font-heading font-bold text-gray-800 mb-2">Organizações</h4>
                  <p className="font-body text-gray-600 text-sm mb-3">
                    Associações e ONGs que trabalham com doenças raras.
                  </p>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-full font-body text-sm hover:bg-green-600 transition-all">
                    Ver Organizações
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;