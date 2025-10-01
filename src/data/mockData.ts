import type { Disease, Video, Quiz, QuizQuestion, MemoryPair, HangmanWord } from '../types';

// ========================= DISEASES DATA =========================

export const mockDiseases: Disease[] = [
  {
    id: 'down-syndrome',
    type: 'disease',
    title: 'Síndrome de Down',
    description: 'Uma condição genética que acontece quando uma pessoa nasce com um cromossomo extra. Isso faz com que ela se desenvolva de forma um pouco diferente, mas ainda pode ter uma vida feliz e cheia de conquistas!',
    status: 'published',
    ageGroup: ['3-6', '7-10'],
    difficulty: 'easy',
    tags: ['genetic', 'chromosomal', 'development'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    publishedAt: new Date('2024-01-01'),
    author: 'Dr. Sistema',
    version: 1,
    emoji: '🌟',
    symptoms: ['Características físicas específicas', 'Desenvolvimento mais lento', 'Muita alegria e carinho para dar'],
    ageOfOnset: 'Desde o nascimento',
    characteristics: ['Características físicas específicas', 'desenvolvimento mais lento', 'mas muita alegria e carinho para dar'],
    tips: [
      {
        id: 'tip-1',
        title: 'Como explicar para crianças',
        content: 'Use linguagem simples e foque nas qualidades especiais que todas as pessoas têm.',
        isCollapsed: true
      }
    ],
    category: 'genetic'
  },
  {
    id: 'cystic-fibrosis',
    type: 'disease',
    title: 'Fibrose Cística',
    description: 'Uma doença que faz com que o corpo produza um muco muito grosso, principalmente nos pulmões e no sistema digestivo. É como se o corpo fizesse uma \'cola\' que dificulta a respiração.',
    status: 'published',
    ageGroup: ['7-10', '11-14'],
    difficulty: 'medium',
    tags: ['respiratory', 'genetic', 'mucus'],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    publishedAt: new Date('2024-01-02'),
    author: 'Dr. Sistema',
    version: 1,
    emoji: '🫁',
    symptoms: ['Tosse persistente', 'dificuldade para respirar', 'problemas digestivos'],
    ageOfOnset: 'Desde o nascimento',
    characteristics: ['Tosse persistente', 'dificuldade para respirar', 'problemas digestivos'],
    tips: [
      {
        id: 'tip-2',
        title: 'Apoio respiratório',
        content: 'Exercícios respiratórios e fisioterapia ajudam muito no tratamento.',
        isCollapsed: true
      }
    ],
    category: 'respiratory'
  },
  {
    id: 'huntington-disease',
    type: 'disease',
    title: 'Doença de Huntington',
    description: 'Uma doença que afeta o cérebro e faz com que a pessoa tenha dificuldade para controlar os movimentos, pensamentos e emoções. Geralmente aparece quando a pessoa já é adulta.',
    status: 'published',
    ageGroup: ['11-14', '15+'],
    difficulty: 'hard',
    tags: ['neurological', 'genetic', 'movement'],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    publishedAt: new Date('2024-01-03'),
    author: 'Dr. Sistema',
    version: 1,
    emoji: '🧠',
    symptoms: ['Movimentos involuntários', 'mudanças de humor', 'dificuldade para pensar'],
    ageOfOnset: 'Adultos (30-50 anos)',
    characteristics: ['Movimentos involuntários', 'mudanças de humor', 'dificuldade para pensar'],
    tips: [
      {
        id: 'tip-3',
        title: 'Suporte familiar',
        content: 'O apoio da família é fundamental para o bem-estar do paciente.',
        isCollapsed: true
      }
    ],
    category: 'neurological'
  },
  {
    id: 'pku',
    type: 'disease',
    title: 'Fenilcetonúria (PKU)',
    description: 'Uma condição em que o corpo não consegue processar uma substância chamada fenilalanina, que está em alguns alimentos. É como se o corpo não tivesse a \'chave\' certa para abrir essa \'porta\'.',
    status: 'published',
    ageGroup: ['3-6', '7-10'],
    difficulty: 'medium',
    tags: ['metabolic', 'genetic', 'diet'],
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
    publishedAt: new Date('2024-01-04'),
    author: 'Dr. Sistema',
    version: 1,
    emoji: '🍎',
    symptoms: ['Sem tratamento pode causar problemas de desenvolvimento', 'mas com dieta especial a criança fica bem'],
    ageOfOnset: 'Desde o nascimento',
    characteristics: ['Sem tratamento pode causar problemas de desenvolvimento', 'mas com dieta especial a criança fica bem'],
    tips: [
      {
        id: 'tip-4',
        title: 'Dieta especial',
        content: 'Seguir uma dieta baixa em fenilalanina é essencial para o desenvolvimento normal.',
        isCollapsed: true
      }
    ],
    category: 'metabolic'
  },
  {
    id: 'marfan-syndrome',
    type: 'disease',
    title: 'Síndrome de Marfan',
    description: 'Uma condição que afeta o tecido conectivo do corpo, fazendo com que a pessoa seja geralmente mais alta e tenha braços e dedos mais longos. É como se o corpo fosse \'esticado\'.',
    status: 'published',
    ageGroup: ['7-10', '11-14'],
    difficulty: 'medium',
    tags: ['genetic', 'connective-tissue', 'height'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    publishedAt: new Date('2024-01-05'),
    author: 'Dr. Sistema',
    version: 1,
    emoji: '📏',
    symptoms: ['Altura acima da média', 'braços e dedos longos', 'problemas no coração ou olhos'],
    ageOfOnset: 'Pode ser notada na infância ou adolescência',
    characteristics: ['Altura acima da média', 'braços e dedos longos', 'problemas no coração ou olhos'],
    tips: [
      {
        id: 'tip-5',
        title: 'Acompanhamento médico',
        content: 'Check-ups regulares são importantes para monitorar coração e olhos.',
        isCollapsed: true
      }
    ],
    category: 'genetic'
  }
];

// ========================= VIDEOS DATA =========================

export const mockVideos: Video[] = [
  {
    id: 'estrela-especial',
    type: 'video',
    title: 'A História da Estrelinha Especial',
    description: 'Uma animação carinhosa que explica a Síndrome de Down através da história de uma estrelinha que é diferente das outras, mas igualmente brilhante e especial.',
    status: 'published',
    ageGroup: ['3-6'],
    difficulty: 'easy',
    tags: ['animation', 'down-syndrome', 'story'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    publishedAt: new Date('2024-01-01'),
    author: 'Equipe Criativa',
    version: 1,
    duration: 300, // 5 minutos
    thumbnailUrl: '/thumbnails/estrela-especial.jpg',
    videoUrl: '/videos/estrela-especial.mp4',
    videoType: 'animation',
    relatedDisease: 'down-syndrome'
  },
  {
    id: 'pulmao-corajoso',
    type: 'video',
    title: 'O Pulmãozinho Corajoso',
    description: 'Uma história sobre um pulmãozinho que precisa de ajuda especial para respirar, explicando a Fibrose Cística de forma lúdica e reconfortante.',
    status: 'published',
    ageGroup: ['7-10'],
    difficulty: 'medium',
    tags: ['story', 'cystic-fibrosis', 'respiratory'],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    publishedAt: new Date('2024-01-02'),
    author: 'Equipe Criativa',
    version: 1,
    duration: 420, // 7 minutos
    thumbnailUrl: '/thumbnails/pulmao-corajoso.jpg',
    videoUrl: '/videos/pulmao-corajoso.mp4',
    videoType: 'story',
    relatedDisease: 'cystic-fibrosis'
  },
  {
    id: 'entendendo-diferencas',
    type: 'video',
    title: 'Entendendo as Diferenças',
    description: 'Um vídeo educativo que explica de forma simples como algumas pessoas nascem diferentes e por que isso é normal e especial.',
    status: 'published',
    ageGroup: ['11-14'],
    difficulty: 'medium',
    tags: ['explanation', 'diversity', 'education'],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    publishedAt: new Date('2024-01-03'),
    author: 'Dr. Especialista',
    version: 1,
    duration: 600, // 10 minutos
    thumbnailUrl: '/thumbnails/entendendo-diferencas.jpg',
    videoUrl: '/videos/entendendo-diferencas.mp4',
    videoType: 'explanation'
  }
];

// ========================= QUIZ DATA =========================

export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'O que você aprendeu sobre Síndrome de Down?',
    emoji: '🌟',
    options: [
      { id: 'a', text: 'Uma condição genética que acontece quando uma pessoa nasce com um cromossomo extra. Isso faz com que ela se desenvolva de forma um pouco diferente, mas ainda pode ter uma vida feliz e cheia de conquistas!', isCorrect: true },
      { id: 'b', text: 'É uma doença que só afeta adultos muito idosos', isCorrect: false },
      { id: 'c', text: 'É algo que pode ser "pego" de outras pessoas', isCorrect: false },
      { id: 'd', text: 'Não é uma condição real, apenas imaginação', isCorrect: false }
    ],
    correctAnswer: 'a',
    explanation: 'A Síndrome de Down é uma condição genética que faz com que as pessoas se desenvolvam de forma especial, mas elas podem ter vidas felizes e realizadas!'
  }
];

export const mockQuiz: Quiz = {
  id: 'quiz-diseases',
  type: 'quiz',
  title: 'Quiz Divertido sobre Doenças Raras',
  description: 'Vamos testar o que você aprendeu de forma divertida!',
  status: 'published',
  ageGroup: ['7-10', '11-14'],
  difficulty: 'medium',
  tags: ['quiz', 'interactive', 'learning'],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  publishedAt: new Date('2024-01-01'),
  author: 'Equipe Educativa',
  version: 1,
  maxScore: 100,
  timeLimit: 300, // 5 minutos
  instructions: [
    'Leia cada pergunta com atenção',
    'Escolha a resposta que achar mais correta',
    'Você pode voltar para revisar suas respostas',
    'Divirta-se aprendendo!'
  ],
  questions: mockQuizQuestions
};

// ========================= MEMORY GAME DATA =========================

export const mockMemoryPairs: MemoryPair[] = [
  { id: 'pair1', emoji: '🌟', label: 'Síndrome de Down', relatedDisease: 'down-syndrome' },
  { id: 'pair2', emoji: '🫁', label: 'Fibrose Cística', relatedDisease: 'cystic-fibrosis' },
  { id: 'pair3', emoji: '🧠', label: 'Doença de Huntington', relatedDisease: 'huntington-disease' },
  { id: 'pair4', emoji: '🍎', label: 'Fenilcetonúria', relatedDisease: 'pku' },
  { id: 'pair5', emoji: '📏', label: 'Síndrome de Marfan', relatedDisease: 'marfan-syndrome' }
];

// ========================= HANGMAN WORDS DATA =========================

export const mockHangmanWords: HangmanWord[] = [
  {
    id: 'word1',
    word: 'INCLUSAO',
    hint: 'Quando todos são bem-vindos e aceitos',
    category: 'valores',
    difficulty: 'medium'
  },
  {
    id: 'word2',
    word: 'RESPEITO',
    hint: 'Tratar os outros com gentileza',
    category: 'valores',
    difficulty: 'easy'
  },
  {
    id: 'word3',
    word: 'CARINHO',
    hint: 'Sentimento de amor e cuidado',
    category: 'valores',
    difficulty: 'easy'
  },
  {
    id: 'word4',
    word: 'DIVERSIDADE',
    hint: 'Quando há muitas diferenças bonitas',
    category: 'valores',
    difficulty: 'hard'
  },
  {
    id: 'word5',
    word: 'EMPATIA',
    hint: 'Se colocar no lugar do outro',
    category: 'valores',
    difficulty: 'medium'
  },
  {
    id: 'word6',
    word: 'GENTILEZA',
    hint: 'Ser bondoso e educado',
    category: 'valores',
    difficulty: 'medium'
  },
  {
    id: 'word7',
    word: 'COMPAIXAO',
    hint: 'Sentir vontade de ajudar quem sofre',
    category: 'valores',
    difficulty: 'hard'
  },
  {
    id: 'word8',
    word: 'ESPECIAL',
    hint: 'Algo único e maravilhoso',
    category: 'valores',
    difficulty: 'easy'
  }
];

// ========================= COLORING PAGES DATA =========================

export const mockColoringPages = [
  {
    id: 'heart-special',
    title: 'Coração Especial',
    description: 'Um coração cheio de amor e cuidado para todas as pessoas especiais',
    svgContent: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <path d="M200 280 C150 230, 100 180, 100 130 C100 100, 120 80, 150 80 C170 80, 190 90, 200 110 C210 90, 230 80, 250 80 C280 80, 300 100, 300 130 C300 180, 250 230, 200 280 Z" 
              fill="none" 
              stroke="#333" 
              stroke-width="3" 
              id="heart-main"/>
        <circle cx="170" cy="120" r="8" fill="none" stroke="#333" stroke-width="2" id="eye-left"/>
        <circle cx="230" cy="120" r="8" fill="none" stroke="#333" stroke-width="2" id="eye-right"/>
        <path d="M180 150 Q200 170 220 150" fill="none" stroke="#333" stroke-width="2" id="smile"/>
      </svg>
    `,
    theme: 'love-and-care',
    ageGroup: ['3-6', '7-10'],
    difficulty: 'easy'
  }
];

// ========================= PUZZLE PIECES DATA =========================

export const mockPuzzlePieces = [
  // Síndrome de Down text broken into pieces
  { id: 'piece1', content: 'Uma condição genética', correctPosition: { row: 0, col: 0 } },
  { id: 'piece2', content: 'que acontece quando', correctPosition: { row: 0, col: 1 } },
  { id: 'piece3', content: 'uma pessoa nasce', correctPosition: { row: 0, col: 2 } },
  { id: 'piece4', content: 'com um cromossomo', correctPosition: { row: 0, col: 3 } },
  { id: 'piece5', content: 'extra. Isso faz', correctPosition: { row: 1, col: 0 } },
  { id: 'piece6', content: 'com que ela', correctPosition: { row: 1, col: 1 } },
  { id: 'piece7', content: 'se desenvolva de', correctPosition: { row: 1, col: 2 } },
  { id: 'piece8', content: 'forma um pouco', correctPosition: { row: 1, col: 3 } },
  { id: 'piece9', content: 'diferente, mas ainda', correctPosition: { row: 2, col: 0 } },
  { id: 'piece10', content: 'pode ter uma', correctPosition: { row: 2, col: 1 } },
  { id: 'piece11', content: 'vida feliz e', correctPosition: { row: 2, col: 2 } },
  { id: 'piece12', content: 'cheia de conquistas!', correctPosition: { row: 2, col: 3 } }
];

// ========================= EXPORT ALL MOCK DATA =========================

export const mockData = {
  diseases: mockDiseases,
  videos: mockVideos,
  quiz: mockQuiz,
  memoryPairs: mockMemoryPairs,
  hangmanWords: mockHangmanWords,
  coloringPages: mockColoringPages,
  puzzlePieces: mockPuzzlePieces
};