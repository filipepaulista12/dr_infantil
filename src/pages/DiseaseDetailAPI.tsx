import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, BookOpen, Activity, Stethoscope, Users, AlertCircle, Loader2 } from 'lucide-react';
import { diseasesAPI, analyticsAPI } from '../services/api';

interface Disease {
  id: string;
  name: string;
  slug: string;
  category: string;
  emoji: string;
  color: string;
  prevalence: string;
  short_description: string;
  detailed_description: string;
  symptoms: string[];
  early_signs: string[];
  treatments: string[];
  resources: Array<{
    title: string;
    description: string;
    url: string;
  }>;
  views_count: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export default function DiseaseDetailAPI() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [disease, setDisease] = useState<Disease | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (slug) {
      loadDisease(slug);
      trackPageView();
    }
  }, [slug]);

  const loadDisease = async (diseaseSlug: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await diseasesAPI.getBySlug(diseaseSlug);
      setDisease(data);
      
      // Tracking de visualização já é feito automaticamente pelo backend
      console.log('✅ Doença carregada do backend:', data.name);
    } catch (err: any) {
      console.error('❌ Erro ao carregar doença:', err);
      setError(err.response?.data?.message || 'Erro ao carregar informações da doença');
    } finally {
      setLoading(false);
    }
  };

  const trackPageView = async () => {
    try {
      await analyticsAPI.trackEvent({
        type: 'page_view',
        data: { page: 'disease_detail', slug },
        page_path: `/doencas/${slug}`
      });
    } catch (err) {
      console.error('Erro ao rastrear visualização:', err);
    }
  };

  const handleShare = async () => {
    if (!disease) return;
    
    try {
      await analyticsAPI.trackEvent({
        type: 'share',
        data: { disease_id: disease.id, disease_name: disease.name },
        page_path: `/doencas/${slug}`
      });

      if (navigator.share) {
        await navigator.share({
          title: disease.name,
          text: disease.short_description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
      }
    } catch (err) {
      console.error('Erro ao compartilhar:', err);
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; gradient: string; button: string; badge: string }> = {
      blue: {
        bg: 'bg-blue-50',
        gradient: 'from-blue-400 to-blue-600',
        button: 'bg-blue-500 hover:bg-blue-600',
        badge: 'bg-blue-100 text-blue-800'
      },
      purple: {
        bg: 'bg-purple-50',
        gradient: 'from-purple-400 to-purple-600',
        button: 'bg-purple-500 hover:bg-purple-600',
        badge: 'bg-purple-100 text-purple-800'
      },
      green: {
        bg: 'bg-green-50',
        gradient: 'from-green-400 to-green-600',
        button: 'bg-green-500 hover:bg-green-600',
        badge: 'bg-green-100 text-green-800'
      },
      pink: {
        bg: 'bg-pink-50',
        gradient: 'from-pink-400 to-pink-600',
        button: 'bg-pink-500 hover:bg-pink-600',
        badge: 'bg-pink-100 text-pink-800'
      },
      indigo: {
        bg: 'bg-indigo-50',
        gradient: 'from-indigo-400 to-indigo-600',
        button: 'bg-indigo-500 hover:bg-indigo-600',
        badge: 'bg-indigo-100 text-indigo-800'
      }
    };
    return colors[color] || colors.blue;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-purple-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Carregando informações...</h2>
          <p className="text-gray-600">Conectando ao servidor backend 🚀</p>
        </div>
      </div>
    );
  }

  if (error || !disease) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ops! Algo deu errado</h2>
          <p className="text-gray-600 mb-6">{error || 'Doença não encontrada'}</p>
          <div className="flex gap-4">
            <button
              onClick={() => loadDisease(slug!)}
              className="flex-1 bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-all transform hover:scale-105"
            >
              Tentar Novamente
            </button>
            <button
              onClick={() => navigate('/doencas')}
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all transform hover:scale-105"
            >
              Voltar
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            💡 Dica: Verifique se o backend está rodando na porta 3001
          </p>
        </div>
      </div>
    );
  }

  const colorClasses = getColorClasses(disease.color);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header com gradiente dinâmico */}
      <div className={`bg-gradient-to-r ${colorClasses.gradient} text-white py-16 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <button
            onClick={() => navigate('/doencas')}
            className="flex items-center gap-2 mb-6 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-all transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>

          <div className="flex items-start gap-6">
            <div className="text-8xl animate-bounce">{disease.emoji}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`${colorClasses.badge} px-3 py-1 rounded-full text-sm font-semibold`}>
                  {disease.category}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  👁️ {disease.views_count} visualizações
                </span>
              </div>
              <h1 className="text-5xl font-bold mb-3">{disease.name}</h1>
              <p className="text-xl text-white/90 mb-4">{disease.short_description}</p>
              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-white/20 px-6 py-3 rounded-xl hover:bg-white/30 transition-all transform hover:scale-105"
                >
                  <Share2 className="w-5 h-5" />
                  Compartilhar
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all transform hover:scale-105 ${
                    isFavorite ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Favoritado' : 'Favoritar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-12">
        {/* Badge de conexão com backend */}
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            ✨ Dados carregados do Backend
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Descrição Detalhada */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className={`w-8 h-8 text-${disease.color}-500`} />
                <h2 className="text-3xl font-bold text-gray-800">O que é?</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {disease.detailed_description}
              </p>
            </div>

            {/* Sintomas */}
            {disease.symptoms && disease.symptoms.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className={`w-8 h-8 text-${disease.color}-500`} />
                  <h2 className="text-3xl font-bold text-gray-800">Sintomas Principais</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {disease.symptoms.map((symptom, index) => (
                    <div
                      key={index}
                      className={`${colorClasses.bg} p-4 rounded-xl flex items-start gap-3 hover:shadow-md transition-shadow`}
                    >
                      <span className="text-2xl">🔹</span>
                      <span className="text-gray-800 font-medium">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sinais Precoces */}
            {disease.early_signs && disease.early_signs.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className={`w-8 h-8 text-${disease.color}-500`} />
                  <h2 className="text-3xl font-bold text-gray-800">Sinais Precoces</h2>
                </div>
                <ul className="space-y-3">
                  {disease.early_signs.map((sign, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-xl">⚠️</span>
                      <span className="text-gray-700">{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tratamentos */}
            {disease.treatments && disease.treatments.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Stethoscope className={`w-8 h-8 text-${disease.color}-500`} />
                  <h2 className="text-3xl font-bold text-gray-800">Tratamentos e Cuidados</h2>
                </div>
                <div className="space-y-4">
                  {disease.treatments.map((treatment, index) => (
                    <div
                      key={index}
                      className={`${colorClasses.bg} p-6 rounded-xl hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">💊</span>
                        <span className="text-gray-800 font-medium">{treatment}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-6">
            {/* Informações Rápidas */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">ℹ️ Informações Rápidas</h3>
              <div className="space-y-3">
                <div className={`${colorClasses.bg} p-4 rounded-xl`}>
                  <p className="text-sm text-gray-600 mb-1">Prevalência</p>
                  <p className="font-bold text-gray-800">{disease.prevalence}</p>
                </div>
                <div className={`${colorClasses.bg} p-4 rounded-xl`}>
                  <p className="text-sm text-gray-600 mb-1">Categoria</p>
                  <p className="font-bold text-gray-800">{disease.category}</p>
                </div>
              </div>
            </div>

            {/* Recursos Adicionais */}
            {disease.resources && disease.resources.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className={`w-6 h-6 text-${disease.color}-500`} />
                  <h3 className="text-xl font-bold text-gray-800">📚 Recursos Úteis</h3>
                </div>
                <div className="space-y-3">
                  {disease.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block ${colorClasses.bg} p-4 rounded-xl hover:shadow-md transition-all transform hover:scale-105`}
                    >
                      <p className="font-bold text-gray-800 mb-1">{resource.title}</p>
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className={`bg-gradient-to-br ${colorClasses.gradient} rounded-3xl shadow-xl p-6 text-white text-center`}>
              <h3 className="text-xl font-bold mb-3">💬 Precisa de Apoio?</h3>
              <p className="mb-4 text-white/90">
                Junte-se à nossa comunidade e compartilhe experiências!
              </p>
              <button
                onClick={() => navigate('/comunidade')}
                className="w-full bg-white text-gray-800 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Ir para Comunidade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
