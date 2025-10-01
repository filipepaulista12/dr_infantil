import { useState, useEffect } from 'react';
import { Users, MessageSquare, Heart, Send, Plus, Loader2, AlertCircle, TrendingUp } from 'lucide-react';
import { postsAPI, commentsAPI, authAPI, analyticsAPI } from '../services/api';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  author_id: string;
  author_name: string;
  author_avatar: string | null;
  likes_count: number;
  comments_count: number;
  views_count: number;
  is_pinned: boolean;
  created_at: string;
  tags: string[];
}

interface Comment {
  id: string;
  content: string;
  author_id: string;
  author_name: string;
  author_avatar: string | null;
  likes_count: number;
  created_at: string;
  is_edited: boolean;
}

export default function CommunityAPI() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    const currentUser = authAPI.getUser();
    setUser(currentUser);
    loadPosts();
    trackPageView();
  }, [selectedCategory]);

  const trackPageView = async () => {
    try {
      await analyticsAPI.trackEvent('page_view', { page: 'community' }, '/comunidade');
    } catch (err) {
      console.error('Erro ao rastrear visualização:', err);
    }
  };

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters: any = {};
      if (selectedCategory !== 'all') {
        filters.category = selectedCategory;
      }
      const data = await postsAPI.list(filters);
      setPosts(data.data || []);
      console.log('✅ Posts carregados:', data.data?.length || 0);
    } catch (err: any) {
      console.error('❌ Erro ao carregar posts:', err);
      setError(err.response?.data?.message || 'Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (postId: string) => {
    try {
      setLoadingComments(true);
      const data = await commentsAPI.list(postId);
      setComments(data.data || []);
    } catch (err) {
      console.error('Erro ao carregar comentários:', err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    loadComments(post.id);
  };

  const handleLikePost = async (postId: string) => {
    if (!user) {
      alert('Você precisa estar logado para curtir!');
      return;
    }

    try {
      await postsAPI.like(postId);
      // Recarregar posts para atualizar contador
      loadPosts();
      
      await analyticsAPI.trackEvent('like', { post_id: postId }, '/comunidade');
    } catch (err) {
      console.error('Erro ao curtir post:', err);
    }
  };

  const handleAddComment = async () => {
    if (!user) {
      alert('Você precisa estar logado para comentar!');
      return;
    }

    if (!newComment.trim() || !selectedPost) return;

    try {
      await commentsAPI.create({
        post_id: selectedPost.id,
        content: newComment
      });
      setNewComment('');
      // Recarregar comentários e posts (para atualizar contador)
      loadComments(selectedPost.id);
      loadPosts();
      
      await analyticsAPI.trackEvent('comment', { post_id: selectedPost.id }, '/comunidade');
    } catch (err) {
      console.error('Erro ao adicionar comentário:', err);
      alert('Erro ao adicionar comentário. Tente novamente.');
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins}min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  const categories = [
    { id: 'all', label: 'Todos', emoji: '📋' },
    { id: 'dicas', label: 'Dicas', emoji: '💡' },
    { id: 'duvidas', label: 'Dúvidas', emoji: '❓' },
    { id: 'experiencias', label: 'Experiências', emoji: '💭' },
    { id: 'recursos', label: 'Recursos', emoji: '📚' },
    { id: 'apoio', label: 'Apoio', emoji: '🤝' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-purple-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Carregando comunidade...</h2>
          <p className="text-gray-600">Conectando ao servidor backend 🚀</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ops! Algo deu errado</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={loadPosts}
            className="bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-all transform hover:scale-105"
          >
            Tentar Novamente
          </button>
          <p className="mt-4 text-sm text-gray-500">
            💡 Dica: Verifique se o backend está rodando na porta 3001
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-12 h-12 text-purple-500" />
            <h1 className="text-5xl font-bold text-gray-800">Comunidade</h1>
          </div>
          <p className="text-xl text-gray-600 mb-4">
            Compartilhe experiências, tire dúvidas e encontre apoio
          </p>
          
          {/* Backend Badge */}
          <div className="flex justify-center gap-3">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              ✨ Conectado ao Backend
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {posts.length} publicações
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              <span className="text-xl">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* New Post Button */}
        {user && (
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => alert('Funcionalidade de criar posts será implementada em breve!')}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg transition-all transform hover:scale-105"
            >
              <Plus className="w-6 h-6" />
              Nova Publicação
            </button>
          </div>
        )}

        {!user && (
          <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <p className="text-yellow-800">
              <strong>💡 Dica:</strong> Faça login para criar publicações e interagir com a comunidade!
            </p>
          </div>
        )}

        {/* Posts List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all cursor-pointer"
              onClick={() => handlePostClick(post)}
            >
              {/* Post Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  {post.author_avatar || '👤'}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{post.author_name}</h3>
                  <p className="text-sm text-gray-500">{formatTimeAgo(post.created_at)}</p>
                </div>
                {post.is_pinned && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
                    📌 Fixado
                  </span>
                )}
              </div>

              {/* Post Content */}
              <h2 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Post Stats */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLikePost(post.id);
                  }}
                  className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span className="font-semibold">{post.likes_count}</span>
                </button>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-semibold">{post.comments_count}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-sm">👁️ {post.views_count} visualizações</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">Nenhuma publicação encontrada</h3>
            <p className="text-gray-500">
              {selectedCategory !== 'all' 
                ? 'Tente selecionar outra categoria' 
                : 'Seja o primeiro a publicar!'}
            </p>
          </div>
        )}

        {/* Post Detail Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-t-3xl flex justify-between items-start">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                    {selectedPost.author_avatar || '👤'}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{selectedPost.author_name}</h3>
                    <p className="text-white/80 text-sm">{formatTimeAgo(selectedPost.created_at)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedPost.title}</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6 whitespace-pre-line">
                  {selectedPost.content}
                </p>

                {/* Tags */}
                {selectedPost.tags && selectedPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Comments Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6" />
                    Comentários ({selectedPost.comments_count})
                  </h3>

                  {/* Add Comment */}
                  {user && (
                    <div className="mb-6">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                          {user.avatar || '👤'}
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Adicione um comentário..."
                            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                            rows={3}
                          />
                          <button
                            onClick={handleAddComment}
                            disabled={!newComment.trim()}
                            className="mt-2 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Send className="w-4 h-4" />
                            Enviar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Comments List */}
                  {loadingComments ? (
                    <div className="text-center py-8">
                      <Loader2 className="w-8 h-8 text-purple-500 animate-spin mx-auto" />
                    </div>
                  ) : comments.length > 0 ? (
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 bg-gray-50 p-4 rounded-xl">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                            {comment.author_avatar || '👤'}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-gray-800">{comment.author_name}</span>
                              <span className="text-sm text-gray-500">{formatTimeAgo(comment.created_at)}</span>
                              {comment.is_edited && (
                                <span className="text-xs text-gray-400">(editado)</span>
                              )}
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                            <div className="mt-2 flex items-center gap-4">
                              <button className="text-sm text-gray-500 hover:text-pink-500 transition-colors flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {comment.likes_count > 0 && comment.likes_count}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p>Nenhum comentário ainda. Seja o primeiro!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
