import { useState, useEffect } from 'react';
import { Heart, Star, BookOpen, Calendar, ArrowLeft, Trash2 } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

interface FavoriteItem {
  id: string;
  type: 'disease' | 'resource' | 'story';
  title: string;
  description: string;
  image?: string;
  addedAt: string;
  category?: string;
  url?: string;
}

export default function FavoritesPage() {
  const { setCurrentPage } = useAppStore();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'disease' | 'resource' | 'story'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      const storedFavorites = localStorage.getItem('dr_infantil_favorites');
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('dr_infantil_favorites', JSON.stringify(updatedFavorites));
  };

  const clearAllFavorites = () => {
    if (window.confirm('Tem certeza que deseja remover todos os favoritos?')) {
      setFavorites([]);
      localStorage.removeItem('dr_infantil_favorites');
    }
  };

  const filteredFavorites = filter === 'all' 
    ? favorites 
    : favorites.filter(fav => fav.type === filter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'disease':
        return <BookOpen className="w-5 h-5" />;
      case 'resource':
        return <Star className="w-5 h-5" />;
      case 'story':
        return <Heart className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'disease':
        return 'Doença';
      case 'resource':
        return 'Recurso';
      case 'story':
        return 'História';
      default:
        return 'Item';
    }
  };

  const handleItemClick = (item: FavoriteItem) => {
    switch (item.type) {
      case 'disease':
        // Navegar para detalhes da doença
        setCurrentPage('disease-detail');
        break;
      case 'resource':
        setCurrentPage('resources');
        break;
      case 'story':
        setCurrentPage('stories');
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-pink-500 animate-pulse mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Carregando favoritos...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <Heart className="w-10 h-10 text-pink-500" />
                Meus Favoritos
              </h1>
              <p className="text-gray-600">
                {favorites.length} {favorites.length === 1 ? 'item salvo' : 'itens salvos'}
              </p>
            </div>
            
            {favorites.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={clearAllFavorites}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpar Tudo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        {favorites.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Todos', icon: '📋' },
              { id: 'disease', label: 'Doenças', icon: '🏥' },
              { id: 'resource', label: 'Recursos', icon: '📚' },
              { id: 'story', label: 'Histórias', icon: '📖' }
            ].map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  filter === filterOption.id
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-purple-100'
                }`}
              >
                <span>{filterOption.icon}</span>
                {filterOption.label}
              </button>
            ))}
          </div>
        )}

        {/* Favorites Grid */}
        {filteredFavorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
              <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {filter === 'all' ? 'Nenhum favorito ainda' : `Nenhum ${filter === 'disease' ? 'doença' : filter === 'resource' ? 'recurso' : 'história'} favorita`}
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all' 
                  ? 'Explore o conteúdo e adicione seus itens favoritos clicando no coração ❤️'
                  : 'Não há itens deste tipo nos seus favoritos ainda.'
                }
              </p>
              <button
                onClick={() => setCurrentPage('diseases')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
              >
                Explorar Conteúdo
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {item.image && (
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.type === 'disease' ? 'bg-blue-100 text-blue-800' :
                        item.type === 'resource' ? 'bg-green-100 text-green-800' :
                        'bg-pink-100 text-pink-800'
                      }`}>
                        {getTypeLabel(item.type)}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      <h3 className="font-bold text-lg text-gray-800 line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => removeFavorite(item.id)}
                      className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
                      title="Remover dos favoritos"
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(item.addedAt)}
                    </div>
                    
                    <button
                      onClick={() => handleItemClick(item)}
                      className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-600 transition-colors"
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}