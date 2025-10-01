import React, { useState } from 'react';
import { Heart, Sparkles, Play, Clock, Film, BookOpen } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  ageGroup: '3-6' | '7-10' | '11-14';
  type: 'animacao' | 'historia' | 'explicacao';
  disease: string;
  thumbnail: string;
}

const videos: Video[] = [
  {
    id: '1',
    title: 'A História da Estrelinha Especial',
    description: 'Uma animação carinhosa que explica a Síndrome de Down através da história de uma estrelinha que é diferente das outras, mas igualmente brilhante e especial.',
    duration: '5 minutos',
    ageGroup: '3-6',
    type: 'animacao',
    disease: 'Síndrome de Down',
    thumbnail: 'from-blue-400 to-purple-500'
  },
  {
    id: '2',
    title: 'O Pulmãozinho Corajoso',
    description: 'Uma história sobre um pulmãozinho que precisa de ajuda especial para respirar, explicando a Fibrose Cística de forma lúdica e reconfortante.',
    duration: '7 minutos',
    ageGroup: '7-10',
    type: 'historia',
    disease: 'Fibrose Cística',
    thumbnail: 'from-green-400 to-teal-500'
  },
  {
    id: '3',
    title: 'Entendendo as Diferenças',
    description: 'Um vídeo educativo que explica de forma simples como algumas pessoas nascem diferentes e por que isso é normal e especial.',
    duration: '10 minutos',
    ageGroup: '11-14',
    type: 'explicacao',
    disease: 'Doenças Raras em Geral',
    thumbnail: 'from-purple-400 to-pink-500'
  },
  {
    id: '4',
    title: 'O Quebra-Cabeça do Cérebro',
    description: 'Uma animação colorida que mostra como o cérebro funciona de forma diferente no autismo, celebrando a singularidade de cada pessoa.',
    duration: '6 minutos',
    ageGroup: '3-6',
    type: 'animacao',
    disease: 'Autismo',
    thumbnail: 'from-orange-400 to-red-500'
  },
  {
    id: '5',
    title: 'Aventura na Terra do Açúcar',
    description: 'Uma jornada educativa sobre como o corpo usa o açúcar e como crianças com diabetes aprendem a cuidar da saúde.',
    duration: '8 minutos',
    ageGroup: '7-10',
    type: 'historia',
    disease: 'Diabetes Tipo 1',
    thumbnail: 'from-pink-400 to-purple-500'
  },
  {
    id: '6',
    title: 'Rodas de Coragem',
    description: 'A história inspiradora de crianças com paralisia cerebral que mostram que podem fazer coisas incríveis do seu próprio jeito.',
    duration: '9 minutos',
    ageGroup: '11-14',
    type: 'explicacao',
    disease: 'Paralisia Cerebral',
    thumbnail: 'from-blue-400 to-indigo-500'
  }
];

const VideoLibrary: React.FC = () => {
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredVideos = videos.filter(video => {
    const matchesAge = selectedAge === 'all' || video.ageGroup === selectedAge;
    const matchesType = selectedType === 'all' || video.type === selectedType;
    return matchesAge && matchesType;
  });

  const getAgeColor = (age: string) => {
    switch (age) {
      case '3-6': return 'bg-green-100 text-green-800 border-green-200';
      case '7-10': return 'bg-blue-100 text-blue-800 border-blue-200';
      case '11-14': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'animacao': return <Film className="w-5 h-5 text-orange-500" />;
      case 'historia': return <BookOpen className="w-5 h-5 text-green-500" />;
      case 'explicacao': return <Sparkles className="w-5 h-5 text-blue-500" />;
      default: return <Film className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'animacao': return 'Animação';
      case 'historia': return 'História';
      case 'explicacao': return 'Explicação';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Header */}
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
                <Sparkles 
                  className="w-6 h-6 text-yellow-300 animate-bounce absolute -top-2 -left-2" 
                  style={{ animationDelay: '0.5s' }}
                />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-purple-100 font-medium mb-2">
              Aprendendo sobre doenças raras com carinho e diversão! 🌈
            </p>
            <p className="text-lg text-purple-200 max-w-3xl mx-auto">
              Um lugar especial onde crianças podem entender que ser diferente é ser único e maravilhoso ✨
            </p>
          </div>

          {/* Decorações */}
          <div className="absolute top-4 left-4 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }}>⭐</div>
          <div className="absolute top-8 right-8 text-pink-300 animate-bounce" style={{ animationDelay: '1s' }}>🦄</div>
          <div className="absolute bottom-4 left-8 text-blue-300 animate-pulse" style={{ animationDelay: '2s' }}>🌟</div>
          <div className="absolute bottom-6 right-4 text-green-300 animate-bounce" style={{ animationDelay: '1.5s' }}>🌈</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Título */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🎬 Biblioteca de Vídeos Educativos 🎬</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vídeos especiais para aprender sobre doenças raras de forma divertida e carinhosa!
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Play className="text-purple-500" />
            Filtros
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Idade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Idade Recomendada
              </label>
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="all">Todas as idades</option>
                <option value="3-6">3-6 anos</option>
                <option value="7-10">7-10 anos</option>
                <option value="11-14">11-14 anos</option>
              </select>
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Conteúdo
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="all">Todos os tipos</option>
                <option value="animacao">Animação</option>
                <option value="historia">História</option>
                <option value="explicacao">Explicação</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid de Vídeos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-blue-100"
            >
              {/* Thumbnail */}
              <div className={`bg-gradient-to-br ${video.thumbnail} h-48 flex items-center justify-center relative`}>
                <Play className="w-12 h-12 text-white opacity-80" />
                
                {/* Badge Idade */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${getAgeColor(video.ageGroup)}`}>
                    {video.ageGroup} anos
                  </span>
                </div>

                {/* Duração */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black bg-opacity-50 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-white text-sm">{video.duration}</span>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                {/* Tipo */}
                <div className="flex items-center gap-2 mb-3">
                  {getTypeIcon(video.type)}
                  <span className="text-sm font-medium text-gray-600">
                    {getTypeLabel(video.type)}
                  </span>
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {video.title}
                </h3>

                {/* Descrição */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {video.description}
                </p>

                {/* Sobre */}
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                  <span className="font-medium">Sobre:</span>
                  <span>{video.disease}</span>
                </div>

                {/* Botão */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105">
                  <Play className="w-5 h-5" />
                  Assistir Vídeo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-500 mb-2">🎬 Nenhum vídeo encontrado</p>
            <p className="text-gray-400">Tente ajustar os filtros</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoLibrary;