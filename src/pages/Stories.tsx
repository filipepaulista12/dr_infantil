import { useState } from 'react';
import { BookOpen, Heart, Star, ChevronRight, Play } from 'lucide-react';

interface Story {
  id: number;
  title: string;
  emoji: string;
  preview: string;
  content: string[];
  lesson: string;
  ageGroup: string;
  duration: string;
}

const stories: Story[] = [
  {
    id: 1,
    title: 'A Estrela Diferente',
    emoji: '⭐',
    preview: 'Uma história sobre uma estrela especial que brilha de forma única...',
    content: [
      'Era uma vez, no céu estrelado, uma pequena estrela chamada Luz. Ela não brilhava como as outras estrelas - sua luz piscava em cores diferentes!',
      'As outras estrelas achavam isso estranho. "Por que você não brilha amarelo como nós?" perguntavam.',
      'Luz ficava triste, mas continuava brilhando do seu jeito especial. Um dia, uma criança na Terra olhou para o céu e viu Luz.',
      '"Mamãe, olha aquela estrela! É a mais bonita de todas! Ela tem cores do arco-íris!" exclamou a criança.',
      'Foi quando Luz entendeu: ser diferente era ser especial. E todas as noites, muitas crianças procuravam por ela no céu.',
      'Moral da história: Nossas diferenças nos tornam únicos e especiais! 🌈'
    ],
    lesson: 'Ser diferente é ser especial e único',
    ageGroup: '4-7 anos',
    duration: '5 min'
  },
  {
    id: 2,
    title: 'Os Amigos do Coração',
    emoji: '💕',
    preview: 'A amizade entre Lucas e Maria, uma menina muito especial...',
    content: [
      'Lucas tinha acabado de chegar na escola nova. Na hora do recreio, viu Maria sentada sozinha.',
      'Maria tinha Síndrome de Down e algumas crianças não brincavam com ela. Mas Lucas foi até ela e perguntou: "Quer brincar comigo?"',
      'Maria sorriu e disse sim! Eles brincaram de pega-pega, desenharam juntos e riram muito.',
      'Os dias passaram e Lucas e Maria se tornaram melhores amigos. Ela ensinou a ele que paciência e carinho são importantes.',
      'Logo, outras crianças perceberam como Maria era divertida e gentil, e todos queriam brincar com ela.',
      'A amizade de Lucas mostrou a todos que o coração não vê diferenças! 💖'
    ],
    lesson: 'A verdadeira amizade não vê diferenças',
    ageGroup: '5-8 anos',
    duration: '6 min'
  },
  {
    id: 3,
    title: 'O Jardim das Flores Especiais',
    emoji: '🌸',
    preview: 'Um jardim onde cada flor é diferente e especial...',
    content: [
      'Num jardim mágico, cresciam flores de todos os tipos: altas, baixas, coloridas, com perfumes diferentes.',
      'Uma pequena flor azul achava que não era bonita o suficiente porque era diferente das rosas vermelhas.',
      'O jardineiro, muito sábio, disse: "Cada flor tem sua beleza especial. Você traz a cor do céu para meu jardim!"',
      'A flor azul percebeu que as abelhas adoravam visitá-la, e os pássaros descansavam perto dela.',
      'Ela entendeu que sua diferença não era um problema, mas sim um presente especial que ela dava ao mundo.',
      'No jardim, todas as flores eram diferentes, e isso tornava o jardim o mais belo de todos! 🌺'
    ],
    lesson: 'Cada um tem sua própria beleza e importância',
    ageGroup: '4-6 anos',
    duration: '5 min'
  },
  {
    id: 4,
    title: 'João e Seu Super Poder',
    emoji: '🦸',
    preview: 'João tem autismo e descobre que isso lhe dá habilidades incríveis...',
    content: [
      'João era diferente dos outros meninos. Ele não gostava de barulhos altos e preferia brincar sozinho às vezes.',
      'Na escola, João tinha uma habilidade incrível: conseguia lembrar de tudo o que via! Era como ter um super poder.',
      'Um dia, a professora perdeu um livro muito importante. Ninguém sabia onde estava.',
      'João fechou os olhos, pensou bem e disse: "Está na prateleira azul, terceira fileira, atrás do globo!"',
      'E estava lá! Todos ficaram impressionados. João percebeu que ser autista lhe dava habilidades especiais.',
      'Ser diferente não era ruim - era ter um super poder único! 🌟'
    ],
    lesson: 'Todos temos habilidades especiais e únicas',
    ageGroup: '6-9 anos',
    duration: '7 min'
  },
  {
    id: 5,
    title: 'A Corrida dos Caracóis',
    emoji: '🐌',
    preview: 'Uma corrida onde ser devagar pode ser uma vantagem...',
    content: [
      'Era dia da grande corrida na floresta! Todos os animais estavam empolgados.',
      'Carol, uma caracol, queria participar. "Você é muito devagar!" riram alguns animais.',
      'Mas Carol se inscreveu mesmo assim. A corrida começou! Todos saíram correndo rapidamente.',
      'Os animais rápidos se cansaram, ficaram com sede e desistiram. Mas Carol continuou, devagar e constante.',
      'Ela parou para ajudar uma borboleta ferida e dar água a um amigo cansado. No final, Carol chegou à linha de chegada!',
      'Todos aplaudiram. Carol mostrou que ser diferente não importa - o que importa é ter coração! 💚'
    ],
    lesson: 'Cada um tem seu próprio ritmo e isso é valioso',
    ageGroup: '5-8 anos',
    duration: '6 min'
  }
];

export default function Stories() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isReading, setIsReading] = useState(false);

  const handleStartReading = (story: Story) => {
    setSelectedStory(story);
    setCurrentPage(0);
    setIsReading(true);
  };

  const handleNextPage = () => {
    if (selectedStory && currentPage < selectedStory.content.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClose = () => {
    setIsReading(false);
    setSelectedStory(null);
    setCurrentPage(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <BookOpen className="text-purple-600" size={40} />
              📖 Histórias Especiais 📖
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Histórias que ensinam sobre diferenças, inclusão e respeito
            </p>
            <p className="text-lg text-purple-600 font-medium">
              Escolha uma história e embarque nessa aventura! ✨
            </p>
          </div>

          {/* Grid de Histórias */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => handleStartReading(story)}
              >
                {/* Emoji e Título */}
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{story.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{story.title}</h3>
                </div>

                {/* Preview */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{story.preview}</p>

                {/* Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500" />
                    {story.ageGroup}
                  </span>
                  <span>{story.duration}</span>
                </div>

                {/* Botão */}
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2">
                  <Play size={16} />
                  Ler História
                </button>

                {/* Lição */}
                <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
                  <p className="text-xs text-gray-700">
                    <strong>Lição:</strong> {story.lesson}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mensagem Especial */}
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 text-center">
            <div className="flex justify-center gap-4 mb-4">
              <Heart className="text-pink-500" size={32} />
              <BookOpen className="text-purple-500" size={32} />
              <Star className="text-yellow-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              O Poder das Histórias 📚
            </h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              As histórias nos ensinam valores importantes como respeito, inclusão e empatia. Cada
              história aqui foi criada com carinho para mostrar que ser diferente é ser especial! 💖
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Leitura */}
      {isReading && selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">{selectedStory.emoji}</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{selectedStory.title}</h3>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <span>{selectedStory.ageGroup}</span>
                <span>•</span>
                <span>{selectedStory.duration}</span>
              </div>
            </div>

            {/* Conteúdo da Página */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8 mb-6 min-h-[300px]">
              <p className="text-lg text-gray-800 leading-relaxed text-justify">
                {selectedStory.content[currentPage]}
              </p>

              {/* Progresso */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>
                    Página {currentPage + 1} de {selectedStory.content.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentPage + 1) / selectedStory.content.length) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Navegação */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`py-2 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  currentPage === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                ← Anterior
              </button>

              {currentPage === selectedStory.content.length - 1 ? (
                <button
                  onClick={handleClose}
                  className="py-2 px-6 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center gap-2"
                >
                  <Heart size={18} />
                  Finalizar
                </button>
              ) : (
                <button
                  onClick={handleNextPage}
                  className="py-2 px-6 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2"
                >
                  Próxima
                  <ChevronRight size={18} />
                </button>
              )}
            </div>

            {/* Botão Fechar */}
            <button
              onClick={handleClose}
              className="mt-4 w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
            >
              Fechar História
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
