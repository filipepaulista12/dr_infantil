import { useState } from 'react';

interface StoryData {
  id: string;
  title: string;
  author: string;
  disease: string;
  emoji: string;
  ageGroup: string;
  duration: string;
  description: string;
  tags: string[];
  chapters: StoryChapter[];
  illustration: string;
}

interface StoryChapter {
  id: string;
  title: string;
  content: string;
  illustration: string;
}

const storyLibrary: StoryData[] = [
  {
    id: 'story-sofia-down',
    title: 'Sofia e o Jardim das Diferenças',
    author: 'Mundo das Diferenças',
    disease: 'Síndrome de Down',
    emoji: '☀️',
    ageGroup: '4-8 anos',
    duration: '8 minutos',
    description: 'Uma história carinhosa sobre Sofia, uma menina com Síndrome de Down que descobre que cada flor no jardim é especial à sua maneira.',
    tags: ['amizade', 'diferenças', 'natureza', 'autoestima'],
    illustration: '🌻',
    chapters: [
      {
        id: 'chapter-1',
        title: 'O Jardim Especial',
        content: 'Sofia adorava cuidar do jardim da sua escola. Cada manhã, ela regava as plantas com um sorriso no rosto. "Bom dia, florzinhas!", dizia ela. Sofia tinha Síndrome de Down, o que significava que ela tinha um cromossomo extra que a tornava muito especial.',
        illustration: '🌷'
      },
      {
        id: 'chapter-2',
        title: 'Descobrindo as Diferenças',
        content: 'Um dia, Sofia notou que as flores eram todas diferentes. Havia rosas vermelhas, margaridas brancas, girassóis amarelos e violetas roxas. "Professora Ana", perguntou Sofia, "por que as flores são todas diferentes?" A professora sorriu: "Porque cada uma tem sua própria beleza, Sofia. Assim como as pessoas!"',
        illustration: '🌺'
      },
      {
        id: 'chapter-3',
        title: 'A Lição do Jardim',
        content: 'Sofia compreendeu que, assim como as flores, as pessoas também eram diferentes e especiais. Ela tinha olhos amendoados, aprendia de forma diferente, mas seu coração era gigante e cheio de amor. "Eu sou como o girassol!", disse ela, "sempre olhando para o lado bom da vida!"',
        illustration: '🌻'
      }
    ]
  },
  {
    id: 'story-marco-autism',
    title: 'Marco e as Cores do Mundo',
    author: 'Mundo das Diferenças',
    disease: 'Transtorno do Espectro Autista',
    emoji: '🌈',
    ageGroup: '5-9 anos',
    duration: '10 minutos',
    description: 'Marco vê o mundo de uma forma muito especial e colorida. Uma aventura sobre como as diferenças tornam o mundo mais interessante.',
    tags: ['autismo', 'sensorialidade', 'criatividade', 'compreensão'],
    illustration: '🎨',
    chapters: [
      {
        id: 'chapter-1',
        title: 'Um Mundo Diferente',
        content: 'Marco via o mundo de uma forma muito especial. As cores pareciam mais brilhantes, os sons mais intensos, e ele notava detalhes que outras pessoas não percebiam. Marco tinha autismo, o que significava que seu cérebro funcionava de uma maneira única e maravilhosa.',
        illustration: '🌈'
      },
      {
        id: 'chapter-2',
        title: 'Os Superpoderes de Marco',
        content: 'Marco conseguia memorizar todos os números dos ônibus da cidade e sabia exatamente que horas eles passavam. Ele adorava organizar seus brinquedos por cor e tamanho. "Marco tem superpoderes!", dizia sua irmã Lara. "Ele vê coisas que nós não vemos!"',
        illustration: '🚌'
      },
      {
        id: 'chapter-3',
        title: 'Ensinando os Amigos',
        content: 'Na escola, Marco ensinou seus colegas a observar as pequenas coisas: como as folhas dançavam no vento, como os pássaros cantavam em ritmos diferentes. "Cada um de nós tem uma forma especial de ver o mundo", disse a professora. "E isso torna tudo mais bonito!"',
        illustration: '🍃'
      }
    ]
  },
  {
    id: 'story-ana-williams',
    title: 'Ana e a Orquestra dos Corações',
    author: 'Mundo das Diferenças',
    disease: 'Síndrome de Williams',
    emoji: '🎵',
    ageGroup: '4-10 anos',
    duration: '7 minutos',
    description: 'Ana tem um talento especial para música e fazer amizades. Descubra como ela cria uma orquestra muito especial na sua escola.',
    tags: ['música', 'amizade', 'sociabilidade', 'talento'],
    illustration: '🎼',
    chapters: [
      {
        id: 'chapter-1',
        title: 'A Menina Musical',
        content: 'Ana tinha Síndrome de Williams e possuía dois dons especiais: adorava música e fazia amigos facilmente. Quando ouvia uma canção, seu rosto se iluminava e ela começava a dançar. "A música mora no meu coração", dizia ela sorrindo.',
        illustration: '♪'
      },
      {
        id: 'chapter-2',
        title: 'Formando a Orquestra',
        content: 'Ana teve uma ideia incrível: formar uma orquestra na escola! Ela convidou todos os colegas, cada um com seu instrumento diferente. Pedro tocava triângulo, Maria batia palmas, João assoviava. "Todos podem fazer música!", exclamou Ana.',
        illustration: '🥁'
      },
      {
        id: 'chapter-3',
        title: 'O Concerto dos Corações',
        content: 'No dia do concerto, a orquestra de Ana tocou a música mais bonita que já se ouviu na escola. Não era perfeita, mas era cheia de amor e alegria. "A música mais bonita", disse o diretor, "é aquela que vem do coração e une as pessoas!"',
        illustration: '🎪'
      }
    ]
  }
];

interface StoryBookProps {
  onBack: () => void;
}

const StoryBook = ({ onBack }: StoryBookProps) => {
  const [selectedStory, setSelectedStory] = useState<StoryData | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isReading, setIsReading] = useState(false);

  const handleStorySelect = (story: StoryData) => {
    setSelectedStory(story);
    setCurrentChapter(0);
    setIsReading(false);
  };

  const startReading = () => {
    setIsReading(true);
  };

  const nextChapter = () => {
    if (selectedStory && currentChapter < selectedStory.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const backToLibrary = () => {
    setSelectedStory(null);
    setIsReading(false);
    setCurrentChapter(0);
  };

  const currentChapterData = selectedStory?.chapters[currentChapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={selectedStory ? backToLibrary : onBack}
          className="mb-6 px-4 py-2 bg-white bg-opacity-20 text-white rounded-full font-body hover:bg-opacity-30 transition-all"
        >
          ← {selectedStory ? 'Voltar à Biblioteca' : 'Voltar ao Menu'}
        </button>

        {!selectedStory ? (
          // Story Library View
          <>
            <div className="text-center mb-8 text-white">
              <h1 className="text-4xl font-heading font-bold mb-2">
                📚 Biblioteca de Histórias 📚
              </h1>
              <p className="text-xl font-body">
                Histórias carinhosas sobre crianças especiais e suas aventuras!
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {storyLibrary.map((story) => (
                <div
                  key={story.id}
                  onClick={() => handleStorySelect(story)}
                  className="bg-white rounded-3xl p-6 shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2">{story.illustration}</div>
                    <div className="text-2xl">{story.emoji}</div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-gray-800 mb-2 text-center">
                    {story.title}
                  </h3>

                  <p className="text-gray-600 font-body text-sm mb-4 text-center">
                    {story.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-body font-medium text-gray-700">👶 Idade:</span>
                      <span className="font-body text-gray-600">{story.ageGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-body font-medium text-gray-700">⏰ Duração:</span>
                      <span className="font-body text-gray-600">{story.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-body font-medium text-gray-700">📖 Capítulos:</span>
                      <span className="font-body text-gray-600">{story.chapters.length}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {story.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-body"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 text-center">
                    <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-body font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                      📚 Ler História
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Section */}
            <div className="mt-12 bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-heading font-bold text-gray-800 mb-6 text-center">
                ✨ Por que Histórias são Importantes? ✨
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl mb-3">❤️</div>
                  <h4 className="font-heading font-bold text-gray-800 mb-2">Empatia</h4>
                  <p className="font-body text-gray-600 text-sm">
                    As histórias ajudam as crianças a compreender e se conectar com diferentes experiências.
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">🧠</div>
                  <h4 className="font-heading font-bold text-gray-800 mb-2">Aprendizagem</h4>
                  <p className="font-body text-gray-600 text-sm">
                    Aprender sobre doenças raras de forma positiva e não assustadora.
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">🌟</div>
                  <h4 className="font-heading font-bold text-gray-800 mb-2">Inspiração</h4>
                  <p className="font-body text-gray-600 text-sm">
                    Histórias que mostram como as diferenças tornam cada pessoa especial.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : !isReading ? (
          // Story Preview
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{selectedStory.illustration}</div>
              <div className="text-3xl mb-2">{selectedStory.emoji}</div>
              <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
                {selectedStory.title}
              </h2>
              <p className="text-lg text-gray-600 font-body mb-6">
                {selectedStory.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-heading font-bold text-blue-800 mb-3">📋 Informações:</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Autor:</strong> {selectedStory.author}</p>
                  <p><strong>Idade:</strong> {selectedStory.ageGroup}</p>
                  <p><strong>Duração:</strong> {selectedStory.duration}</p>
                  <p><strong>Capítulos:</strong> {selectedStory.chapters.length}</p>
                  <p><strong>Tema:</strong> {selectedStory.disease}</p>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-heading font-bold text-green-800 mb-3">🏷️ Temas abordados:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStory.tags.map((tag, index) => (
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

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
              <h4 className="font-heading font-bold text-yellow-800 mb-2">📚 Capítulos:</h4>
              <div className="space-y-2">
                {selectedStory.chapters.map((chapter, index) => (
                  <div key={chapter.id} className="flex items-center text-sm">
                    <span className="font-body font-medium text-gray-700 mr-2">
                      {index + 1}.
                    </span>
                    <span className="font-body text-gray-600">{chapter.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={startReading}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-body font-medium text-lg hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                📖 Começar a Ler
              </button>
            </div>
          </div>
        ) : (
          // Story Reader
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-2">
                {selectedStory.title}
              </h2>
              <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
                <span>📖 Capítulo {currentChapter + 1} de {selectedStory.chapters.length}</span>
                <span>•</span>
                <span>{currentChapterData?.title}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentChapter + 1) / selectedStory.chapters.length) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 text-center">
                Progresso da história
              </p>
            </div>

            {/* Chapter Content */}
            <div className="text-center mb-8">
              <div className="text-8xl mb-6">{currentChapterData?.illustration}</div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-heading font-bold text-gray-800 mb-4">
                  {currentChapterData?.title}
                </h3>
                <p className="font-body text-gray-700 leading-relaxed text-lg">
                  {currentChapterData?.content}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevChapter}
                disabled={currentChapter === 0}
                className={`px-6 py-3 rounded-full font-body font-medium transition-all ${
                  currentChapter === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
              >
                ← Capítulo Anterior
              </button>

              <div className="text-center">
                <div className="text-3xl">{selectedStory.emoji}</div>
              </div>

              {currentChapter < selectedStory.chapters.length - 1 ? (
                <button
                  onClick={nextChapter}
                  className="px-6 py-3 bg-purple-500 text-white rounded-full font-body font-medium hover:bg-purple-600 transition-all"
                >
                  Próximo Capítulo →
                </button>
              ) : (
                <button
                  onClick={backToLibrary}
                  className="px-6 py-3 bg-green-500 text-white rounded-full font-body font-medium hover:bg-green-600 transition-all"
                >
                  🎉 História Concluída!
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryBook;