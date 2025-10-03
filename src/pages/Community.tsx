import { useState, useEffect } from 'react';
import { Users, Heart, MessageCircle, ThumbsUp, Send, Star, Award, User, LogOut } from 'lucide-react';
import { getUser } from '../services/api';

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
  const [user, setUser] = useState<any>(null);
  const [loginEmail, setLoginEmail] = useState('admin@drinfantil.com.br');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const filteredPosts =
    selectedCategory === 'todas'
      ? posts
      : posts.filter(post => post.category === selectedCategory);

  const postComments = comments.filter(comment => comment.postId === selectedPost?.id);

  // Carregar usuário do localStorage
  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      // Simulação de login
      if (loginEmail === 'admin@drinfantil.com.br' && loginPassword === 'admin123') {
        const mockUser = {
          id: '1',
          name: 'Administrador',
          email: 'admin@drinfantil.com.br',
          role: 'admin'
        };
        localStorage.setItem('dr_infantil_user', JSON.stringify(mockUser));
        setUser(mockUser);
        alert('Login realizado com sucesso!');
      } else if (loginEmail === 'teste@exemplo.com' && loginPassword === 'teste123') {
        const mockUser = {
          id: '2',
          name: 'Usuário Teste',
          email: 'teste@exemplo.com',
          role: 'user'
        };
        localStorage.setItem('dr_infantil_user', JSON.stringify(mockUser));
        setUser(mockUser);
        alert('Login realizado com sucesso!');
      } else {
        alert('Credenciais inválidas!');
      }
    } catch (error) {
      alert('Erro no login. Tente novamente.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('dr_infantil_user');
    setUser(null);
    alert('Logout realizado com sucesso!');
  };

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

          {/* Login Section */}
          {!user ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Entre na Comunidade</h3>
                <p className="text-gray-600">Faça login para participar, compartilhar histórias e interagir com outros membros.</p>
              </div>

              <form onSubmit={handleLogin} className="max-w-md mx-auto">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Senha:
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50"
                >
                  {isLoggingIn ? 'Entrando...' : 'Entrar na Comunidade'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p><strong>Contas de Teste:</strong></p>
                <p>admin@drinfantil.com.br / admin123</p>
                <p>teste@exemplo.com / teste123</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </div>
            </div>
          )}

          {/* Conteúdo da Comunidade - Só mostra quando logado */}
          {user && (
            <>
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
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{post.authorEmoji}</span>
                        <div>
                          <h3 className="font-bold text-gray-800">{post.author}</h3>
                          <p className="text-sm text-gray-500">{post.timestamp}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
                        {getCategoryName(post.category)}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h4>
                    <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Heart className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      <button className="text-purple-600 hover:text-purple-800 font-semibold">
                        Ver mais →
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
            </>
          )}

          {/* Modal de Post Detalhado */}
          {selectedPost && user && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{selectedPost.authorEmoji}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{selectedPost.author}</h3>
                        <p className="text-gray-500">{selectedPost.timestamp}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(selectedPost.category)}`}>
                      {getCategoryName(selectedPost.category)}
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-800 mb-6">{selectedPost.title}</h2>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">{selectedPost.content}</p>

                  <div className="flex items-center gap-8 mb-8">
                    <button className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition-colors">
                      <Heart className="w-5 h-5" />
                      {selectedPost.likes} Curtidas
                    </button>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MessageCircle className="w-5 h-5" />
                      {selectedPost.comments} Comentários
                    </div>
                  </div>

                  {/* Comentários */}
                  <div className="border-t pt-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Comentários</h3>
                    {postComments.map(comment => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xl">{comment.emoji}</span>
                          <span className="font-semibold text-gray-800">{comment.author}</span>
                        </div>
                        <p className="text-gray-700 mb-3">{comment.content}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            {comment.likes}
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Novo Comentário */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Adicionar comentário</h4>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Compartilhe seus pensamentos..."
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows={3}
                      />
                      <div className="flex justify-end gap-3 mt-3">
                        <button
                          onClick={handleClosePost}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          Cancelar
                        </button>
                        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                          <Send className="w-4 h-4" />
                          Comentar
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      onClick={handleClosePost}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
