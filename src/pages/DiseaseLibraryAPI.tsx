import { useEffect, useState } from 'react';
import { Heart, Sparkles, ChevronRight, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { diseasesAPI, analyticsAPI } from '../services/api';

interface Disease {
  id: string;
  slug: string;
  name: string;
  category: string;
  emoji: string;
  color: string;
  prevalence: string;
  short_description: string;
  views_count: number;
}

const DiseaseLibraryAPI = () => {
  const { setCurrentPage, setSelectedDisease } = useAppStore();
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDiseases();
    // Track page view
    analyticsAPI.trackEvent('page_view', { page: 'disease-library' }, '/diseases').catch(console.error);
  }, []);

  const loadDiseases = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await diseasesAPI.list();
      
      if (response.success) {
        setDiseases(response.data);
      } else {
        setError('Não foi possível carregar as doenças');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao conectar com o servidor. Verifique se o backend está rodando.');
      console.error('Erro ao carregar doenças:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDiseaseClick = (slug: string) => {
    setSelectedDisease(slug);
    setCurrentPage('disease-detail');
    // Track disease click
    analyticsAPI.trackEvent('disease_click', { slug }, `/diseases/${slug}`).catch(console.error);
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; button: string; badge: string }> = {
      blue: { 
        bg: 'from-purple-50 to-blue-50', 
        button: 'from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600',
        badge: 'bg-blue-100 text-blue-800 border-blue-200'
      },
      purple: { 
        bg: 'from-purple-50 to-pink-50', 
        button: 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
        badge: 'bg-purple-100 text-purple-800 border-purple-200'
      },
      green: { 
        bg: 'from-green-50 to-teal-50', 
        button: 'from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600',
        badge: 'bg-green-100 text-green-800 border-green-200'
      },
      pink: { 
        bg: 'from-pink-50 to-rose-50', 
        button: 'from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600',
        badge: 'bg-pink-100 text-pink-800 border-pink-200'
      },
      indigo: { 
        bg: 'from-indigo-50 to-purple-50', 
        button: 'from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600',
        badge: 'bg-indigo-100 text-indigo-800 border-indigo-200'
      },
    };
    return colorMap[color] || colorMap.purple;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600 font-medium">Carregando doenças...</p>
          <p className="text-sm text-gray-500 mt-2">Conectando ao servidor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Ops! Algo deu errado</h2>
          <p className="text-gray-600 mb-2">{error}</p>
          <p className="text-sm text-gray-500 mb-6">
            💡 Dica: Certifique-se de que o backend está rodando na porta 3001
          </p>
          <button
            onClick={loadDiseases}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Tentar Novamente
          </button>
          <button
            onClick={() => setCurrentPage('home')}
            className="w-full mt-3 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-2xl relative overflow-hidden">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="relative">
                <Heart className="w-12 h-12 text-pink-200 animate-pulse" />
                <Sparkles className="w-6 h-6 text-yellow-300 animate-bounce absolute -top-2 -right-2" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Mundo das Diferenças
              </h1>
              <div className="relative">
                <Heart className="w-12 h-12 text-blue-200 animate-pulse" />
                <Sparkles className="w-6 h-6 text-yellow-300 animate-bounce absolute -top-2 -left-2" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-purple-100 font-medium mb-2">
              Aprendendo sobre doenças raras com carinho e diversão! 
            </p>
            <p className="text-lg text-purple-200 max-w-3xl mx-auto">
              Um lugar especial onde crianças podem entender que ser diferente é ser único e maravilhoso 
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-3xl font-bold text-gray-800">📚 Biblioteca de Doenças Raras</h2>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              ✨ Conectado ao Backend
            </span>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aprenda sobre diferentes condições de forma carinhosa e educativa!
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {diseases.length} {diseases.length === 1 ? 'doença cadastrada' : 'doenças cadastradas'} • Dados atualizados em tempo real
          </p>
        </div>

        {diseases.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <p className="text-gray-500 text-lg mb-4">Nenhuma doença cadastrada ainda</p>
            <p className="text-gray-400 text-sm">Aguarde enquanto adicionamos novos conteúdos!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diseases.map((disease) => {
              const colors = getColorClasses(disease.color);
              return (
                <div 
                  key={disease.id} 
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-purple-100 transform hover:scale-[1.02]"
                >
                  <div className={`bg-gradient-to-r ${colors.bg} p-6 border-b-2 border-purple-100`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-5xl animate-bounce" style={{ animationDuration: '2s' }}>
                          {disease.emoji}
                        </span>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800">{disease.name}</h3>
                          <span className="text-sm text-gray-600">{disease.category}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${colors.badge}`}>
                        {disease.prevalence}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {disease.short_description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        👁️ {disease.views_count} visualizações
                      </span>
                    </div>
                    <button 
                      onClick={() => handleDiseaseClick(disease.slug)}
                      className={`w-full bg-gradient-to-r ${colors.button} text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 shadow-md hover:shadow-xl`}
                    >
                      <ChevronRight className="w-5 h-5" />
                      <span>Saber Mais</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mensagem Motivacional */}
        <div className="mt-12 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-2xl p-8 text-center border-2 border-purple-200 shadow-xl">
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-pink-500 animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            🌈 Cada criança é especial do seu jeito! 🌈
          </h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Aprender sobre doenças raras nos ajuda a ser mais compreensivos, gentis e inclusivos. 
            Juntos, podemos criar um mundo onde todas as crianças se sintam amadas e aceitas! 💕
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiseaseLibraryAPI;
