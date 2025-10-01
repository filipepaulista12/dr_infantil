import { useState } from 'react';

interface Video {
  id: string;
  title: string;
  disease: string;
  emoji: string;
  duration: string;
  ageGroup: string;
  description: string;
  thumbnail: string;
  embedUrl: string;
  tags: string[];
}

const videoLibrary: Video[] = [
  {
    id: 'video-down-intro',
    title: 'Conhecendo a Síndrome de Down',
    disease: 'Síndrome de Down',
    emoji: '☀️',
    duration: '3:45',
    ageGroup: '6-12 anos',
    description: 'Um vídeo carinhoso que explica o que é a Síndrome de Down de forma simples e positiva.',
    thumbnail: '🎬',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    tags: ['educativo', 'inclusão', 'cromossomo']
  },
  {
    id: 'video-autism-world',
    title: 'O Mundo Especial do Autismo',
    disease: 'Transtorno do Espectro Autista',
    emoji: '🌈',
    duration: '5:20',
    ageGroup: '5-10 anos',
    description: 'Descubra como pessoas com autismo veem e sentem o mundo de forma única e especial.',
    thumbnail: '🎭',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    tags: ['autismo', 'diferenças', 'superpoderes']
  },
  {
    id: 'video-williams-music',
    title: 'A Música da Síndrome de Williams',
    disease: 'Síndrome de Williams',
    emoji: '🎵',
    duration: '4:10',
    ageGroup: '4-12 anos',
    description: 'Veja como pessoas com Síndrome de Williams têm um talento especial para música e amizades.',
    thumbnail: '🎼',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    tags: ['música', 'sociabilidade', 'talento']
  },
  {
    id: 'video-cerebral-strength',
    title: 'A Força da Paralisia Cerebral',
    disease: 'Paralisia Cerebral',
    emoji: '💪',
    duration: '6:30',
    ageGroup: '7-14 anos',
    description: 'Histórias inspiradoras de pessoas com paralisia cerebral que mostram sua força e determinação.',
    thumbnail: '🏆',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    tags: ['força', 'determinação', 'superação']
  },
  {
    id: 'video-inclusion-friends',
    title: 'Todos Podemos Ser Amigos',
    disease: 'Inclusão Geral',
    emoji: '🤝',
    duration: '4:45',
    ageGroup: '4-10 anos',
    description: 'Um vídeo sobre como todos somos diferentes e especiais, e como podemos ser amigos.',
    thumbnail: '👫',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    tags: ['amizade', 'inclusão', 'diversidade']
  },
  {
    id: 'video-rett-care',
    title: 'O Carinho da Síndrome de Rett',
    disease: 'Síndrome de Rett',
    emoji: '🌸',
    duration: '5:15',
    ageGroup: '6-12 anos',
    description: 'Entenda a Síndrome de Rett e como podemos cuidar e apoiar quem tem essa condição.',
    thumbnail: '🌺',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    tags: ['cuidado', 'apoio', 'sensibilidade']
  }
];

interface VideoLibraryProps {
  onBack: () => void;
}

const VideoLibrary = ({ onBack }: VideoLibraryProps) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [filterDisease, setFilterDisease] = useState<string>('all');
  const [filterAge, setFilterAge] = useState<string>('all');

  const diseases = Array.from(new Set(videoLibrary.map(video => video.disease)));
  const ageGroups = Array.from(new Set(videoLibrary.map(video => video.ageGroup)));

  const filteredVideos = videoLibrary.filter(video => {
    const diseaseMatch = filterDisease === 'all' || video.disease === filterDisease;
    const ageMatch = filterAge === 'all' || video.ageGroup === filterAge;
    return diseaseMatch && ageMatch;
  });

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
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
            📺 Biblioteca de Vídeos Educativos 📺
          </h1>
          <p className="text-xl font-body">
            Assista, aprenda e se divirta com nossos vídeos sobre doenças raras!
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="flex flex-col items-center">
              <label className="font-heading font-bold text-gray-800 mb-2">
                🏥 Filtrar por Condição:
              </label>
              <select
                value={filterDisease}
                onChange={(e) => setFilterDisease(e.target.value)}
                className="px-4 py-2 rounded-full border-2 border-gray-300 font-body focus:border-purple-500 focus:outline-none"
              >
                <option value="all">Todas as condições</option>
                {diseases.map(disease => (
                  <option key={disease} value={disease}>{disease}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-center">
              <label className="font-heading font-bold text-gray-800 mb-2">
                👶 Filtrar por Idade:
              </label>
              <select
                value={filterAge}
                onChange={(e) => setFilterAge(e.target.value)}
                className="px-4 py-2 rounded-full border-2 border-gray-300 font-body focus:border-purple-500 focus:outline-none"
              >
                <option value="all">Todas as idades</option>
                {ageGroups.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-center">
              <p className="font-heading font-bold text-gray-800 mb-2">
                📊 Resultados:
              </p>
              <div className="px-4 py-2 bg-purple-100 rounded-full font-body font-medium text-purple-800">
                {filteredVideos.length} vídeo{filteredVideos.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => handleVideoClick(video)}
              className="bg-white rounded-3xl p-6 shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              {/* Thumbnail */}
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{video.thumbnail}</div>
                <div className="text-2xl">{video.emoji}</div>
              </div>

              {/* Video Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-heading font-bold text-gray-800 mb-2">
                  {video.title}
                </h3>
                <p className="text-sm font-body text-gray-600 mb-2">
                  {video.description}
                </p>
              </div>

              {/* Video Details */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-body font-medium text-gray-700">🕒 Duração:</span>
                  <span className="font-body text-gray-600">{video.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-body font-medium text-gray-700">👶 Idade:</span>
                  <span className="font-body text-gray-600">{video.ageGroup}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-body font-medium text-gray-700">🏥 Condição:</span>
                  <span className="font-body text-gray-600 text-xs">{video.disease}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {video.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-body"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Play Button */}
              <div className="mt-4 text-center">
                <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-body font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                  ▶️ Assistir Vídeo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-heading font-bold text-gray-800 mb-4">
              Nenhum vídeo encontrado
            </h3>
            <p className="text-gray-600 font-body mb-6">
              Não encontramos vídeos que atendam aos filtros selecionados.
            </p>
            <button
              onClick={() => {
                setFilterDisease('all');
                setFilterAge('all');
              }}
              className="px-6 py-3 bg-purple-500 text-white rounded-full font-body font-medium hover:bg-purple-600 transition-all"
            >
              🔄 Limpar Filtros
            </button>
          </div>
        )}

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{selectedVideo.emoji}</span>
                  <div>
                    <h2 className="text-xl font-heading font-bold text-gray-800">
                      {selectedVideo.title}
                    </h2>
                    <p className="text-sm text-gray-600 font-body">
                      {selectedVideo.disease} • {selectedVideo.duration}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeVideo}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Video Player Placeholder */}
              <div className="p-6">
                <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white mb-6">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <p className="text-xl font-heading font-bold mb-2">
                      Vídeo será carregado aqui
                    </p>
                    <p className="font-body">
                      (Em breve: integração com plataforma de vídeos)
                    </p>
                  </div>
                </div>

                {/* Video Description */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h3 className="font-heading font-bold text-gray-800 mb-2">
                    📝 Sobre este vídeo:
                  </h3>
                  <p className="font-body text-gray-700 leading-relaxed">
                    {selectedVideo.description}
                  </p>
                </div>

                {/* Video Info */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-heading font-bold text-blue-800 mb-2">
                      ℹ️ Informações:
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p className="font-body"><strong>Duração:</strong> {selectedVideo.duration}</p>
                      <p className="font-body"><strong>Idade recomendada:</strong> {selectedVideo.ageGroup}</p>
                      <p className="font-body"><strong>Condição abordada:</strong> {selectedVideo.disease}</p>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-heading font-bold text-green-800 mb-2">
                      🏷️ Temas abordados:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedVideo.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-body"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={closeVideo}
                    className="px-6 py-3 bg-gray-500 text-white rounded-full font-body font-medium hover:bg-gray-600 transition-all"
                  >
                    ← Voltar à Biblioteca
                  </button>
                  <button className="px-6 py-3 bg-purple-500 text-white rounded-full font-body font-medium hover:bg-purple-600 transition-all">
                    💾 Salvar nos Favoritos
                  </button>
                  <button className="px-6 py-3 bg-pink-500 text-white rounded-full font-body font-medium hover:bg-pink-600 transition-all">
                    📤 Compartilhar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-heading font-bold text-gray-800 mb-4 text-center">
            💡 Como usar a Biblioteca de Vídeos
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-heading font-bold text-gray-800 mb-2">Escolha por Interesse</h4>
              <p className="font-body text-gray-600">Use os filtros para encontrar vídeos sobre condições específicas ou idades.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">👀</div>
              <h4 className="font-heading font-bold text-gray-800 mb-2">Assista com Cuidado</h4>
              <p className="font-body text-gray-600">Os vídeos foram selecionados para serem educativos e apropriados para crianças.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💬</div>
              <h4 className="font-heading font-bold text-gray-800 mb-2">Converse Depois</h4>
              <p className="font-body text-gray-600">Converse com um adulto sobre o que aprendeu no vídeo!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLibrary;