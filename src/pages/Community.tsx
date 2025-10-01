import { useState } from 'react';
import { Users, Heart, MessageCircle, ThumbsUp, Send, Star, Award } from 'lucide-react';

interface Post {
  id: number;
  author: string;
  authorEmoji: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  category: 'historia' | 'dica' | 'apoio' | 'conquista';
  timestamp: string;
}

interface Comment {
  id: number;
  postId: number;
  author: string;
  emoji: string;
  content: string;
  likes: number;
}

const posts: Post[] = [
  {
    id: 1,
    author: 'Maria, mãe da Sofia',
    authorEmoji: '👩',
    title: 'Nossa primeira vitória!',
    content:
      'Hoje a Sofia conseguiu amarrar os sapatos sozinha pela primeira vez! Sei que pode parecer pequeno, mas para nós é uma grande conquista. Estamos tão orgulhosos dela! 💖',
    likes: 45,
    comments: 12,
    category: 'conquista',
    timestamp: 'Há 2 horas'
  },
  {
    id: 2,
    author: 'João, pai do Lucas',
    authorEmoji: '👨',
    title: 'Dica para pais iniciantes',
    content:
      'Aprendi que criar uma rotina visual ajudou muito o Lucas a se sentir mais seguro. Usamos desenhos e cores para cada atividade do dia. Pode ajudar outras famílias! 🌈',
    likes: 67,
    comments: 23,
    category: 'dica',
    timestamp: 'Há 5 horas'
  },
  {
    id: 3,
    author: 'Ana, irmã da Clara',
    authorEmoji: '👧',
    title: 'Minha irmã é incrível!',
    content:
      'A Clara tem Síndrome de Down e é a pessoa mais carinhosa que conheço. Hoje ela me ensinou que paciência e amor são mais importantes que qualquer coisa! ❤️',
    likes: 89,
    comments: 31,
    category: 'historia',
    timestamp: 'Há 1 dia'
  },
  {
    id: 4,
    author: 'Carlos, pai do Pedro',
    authorEmoji: '👨',
    title: 'Precisamos de mais inclusão nas escolas',
    content:
      'Estou compartilhando nossa experiência positiva com a escola do Pedro. A diretora criou um programa de amigos especiais e todas as crianças adoraram! Inclusão de verdade acontece quando todos participam. 🏫',
    likes: 102,
    comments: 45,
    category: 'apoio',
    timestamp: 'Há 2 dias'
  },
  {
    id: 5,
    author: 'Beatriz, mãe do Miguel',
    authorEmoji: '👩',
    title: 'Celebrando cada passo',
    content:
      'O Miguel falou sua primeira palavra hoje: "mamãe"! Foram 4 anos de terapia, mas ele conseguiu! Para quem está começando essa jornada, não desistam. Cada criança tem seu tempo! 🌟',
    likes: 156,
    comments: 52,
    category: 'conquista',
    timestamp: 'Há 3 dias'
  }
];

const comments: Comment[] = [
  {
    id: 1,
    postId: 1,
    author: 'Paula',
    emoji: '💕',
    content: 'Que maravilha! Parabéns para a Sofia! Cada vitória merece ser celebrada!',
    likes: 12
  },
  {
    id: 2,
    postId: 1,
    author: 'Roberto',
    emoji: '🎉',
    content: 'Isso é muito especial! Continue compartilhando essas conquistas conosco!',
    likes: 8
  }
];

const categories = [
  { id: 'todas', name: 'Todas', icon: '📋', color: 'gray' },
  { id: 'historia', name: 'Histórias', icon: '📖', color: 'blue' },
  { id: 'dica', name: 'Dicas', icon: '💡', color: 'yellow' },
  { id: 'apoio', name: 'Apoio', icon: '🤝', color: 'green' },
  { id: 'conquista', name: 'Conquistas', icon: '🏆', color: 'purple' }
];

export default function Community() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');

  const filteredPosts =
    selectedCategory === 'todas'
      ? posts
      : posts.filter(post => post.category === selectedCategory);

  const postComments = comments.filter(comment => comment.postId === selectedPost?.id);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      historia: 'bg-blue-100 text-blue-700',
      dica: 'bg-yellow-100 text-yellow-700',
      apoio: 'bg-green-100 text-green-700',
      conquista: 'bg-purple-100 text-purple-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      historia: '📖 História',
      dica: '💡 Dica',
      apoio: '🤝 Apoio',
      conquista: '🏆 Conquista'
    };
    return names[category] || category;
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Users className="text-purple-600" size={40} />
              👥 Comunidade de Apoio 👥
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Um espaço seguro para compartilhar experiências, histórias e apoio mútuo
            </p>
            <p className="text-lg text-purple-600 font-medium">
              Juntos somos mais fortes! 💪✨
            </p>
          </div>

          {/* Filtros de Categoria */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Filtrar por categoria:</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Posts */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                {/* Header do Post */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{post.authorEmoji}</div>
                    <div>
                      <h4 className="font-bold text-gray-800">{post.author}</h4>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                      post.category
                    )}`}
                  >
                    {getCategoryName(post.category)}
                  </span>
                </div>

                {/* Conteúdo */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.content}</p>

                {/* Footer */}
                <div className="flex items-center gap-6 text-gray-600">
                  <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                    <Heart size={18} />
                    <span className="text-sm font-semibold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                    <MessageCircle size={18} />
                    <span className="text-sm font-semibold">{post.comments}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Regras da Comunidade */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8">
            <div className="text-center mb-6">
              <Star className="text-yellow-500 mx-auto mb-4" size={40} />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Regras da Comunidade 📜
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="text-red-500" size={24} />
                  <h4 className="font-bold text-gray-800">Respeito Sempre</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Trate todos com gentileza e respeito. Cada família tem sua jornada única.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="text-blue-500" size={24} />
                  <h4 className="font-bold text-gray-800">Apoio Mútuo</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Compartilhe experiências positivas e ofereça apoio a outras famílias.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="text-green-500" size={24} />
                  <h4 className="font-bold text-gray-800">Celebre Conquistas</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Cada vitória, por menor que seja, merece ser comemorada e compartilhada!
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="text-purple-500" size={24} />
                  <h4 className="font-bold text-gray-800">Diálogo Aberto</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Faça perguntas, compartilhe dúvidas e aprenda com as experiências dos outros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Post Completo */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{selectedPost.authorEmoji}</div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">{selectedPost.author}</h4>
                  <p className="text-sm text-gray-500">{selectedPost.timestamp}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                  selectedPost.category
                )}`}
              >
                {getCategoryName(selectedPost.category)}
              </span>
            </div>

            {/* Conteúdo */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedPost.title}</h3>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{selectedPost.content}</p>

            {/* Interações */}
            <div className="flex items-center gap-6 mb-6 pb-6 border-b">
              <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                <ThumbsUp size={20} />
                <span className="font-semibold">{selectedPost.likes} curtidas</span>
              </button>
              <div className="flex items-center gap-2 text-blue-500">
                <MessageCircle size={20} />
                <span className="font-semibold">{postComments.length} comentários</span>
              </div>
            </div>

            {/* Comentários */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-800 mb-4">Comentários</h4>
              <div className="space-y-4 mb-4">
                {postComments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{comment.emoji}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-1">{comment.author}</p>
                        <p className="text-gray-600 text-sm mb-2">{comment.content}</p>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors text-xs">
                          <Heart size={14} />
                          <span>{comment.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Novo Comentário */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Escreva um comentário..."
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2">
                  <Send size={18} />
                  Enviar
                </button>
              </div>
            </div>

            {/* Botão Fechar */}
            <button
              onClick={handleClosePost}
              className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
