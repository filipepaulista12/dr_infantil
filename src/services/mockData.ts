// Mock data para desenvolvimento e testes
export const mockUsers = [
  {
    id: '1',
    name: 'Dr. Admin',
    email: 'admin@drinfantil.com.br',
    password: 'admin123',
    role: 'admin',
    avatar: '👑',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Moderador Silva',
    email: 'moderador@drinfantil.com.br',
    password: 'mod123',
    role: 'moderator',
    avatar: '🛡️',
    created_at: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Usuário Teste',
    email: 'teste@exemplo.com',
    password: 'teste123',
    role: 'user',
    avatar: '👤',
    created_at: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'Maria Silva',
    email: 'maria@exemplo.com',
    password: 'maria123',
    role: 'user',
    avatar: '👩‍⚕️',
    created_at: '2024-01-04T00:00:00Z'
  }
];

export const mockPosts = [
  {
    id: '1',
    title: 'Primeiros socorros em crianças: dicas essenciais',
    content: 'Como pais e cuidadores, é importante conhecer técnicas básicas de primeiros socorros para crianças. Aqui compartilho algumas dicas que podem ser vitais em situações de emergência...',
    category: 'dica',
    author_id: '1',
    author_name: 'Dr. Admin',
    author_avatar: '👑',
    likes_count: 15,
    comments_count: 8,
    views_count: 120,
    is_pinned: true,
    is_edited: false,
    created_at: '2024-10-01T10:00:00Z',
    tags: ['primeiros-socorros', 'emergencia', 'seguranca']
  },
  {
    id: '2',
    title: 'Meu filho tem febre, devo me preocupar?',
    content: 'Meu filho de 2 anos está com febre de 38.5°C há algumas horas. Já dei antitérmico mas continua febril. Em que momento devo procurar atendimento médico?',
    category: 'pergunta',
    author_id: '3',
    author_name: 'Usuário Teste',
    author_avatar: '👤',
    likes_count: 12,
    comments_count: 15,
    views_count: 89,
    is_pinned: false,
    is_edited: false,
    created_at: '2024-10-02T08:30:00Z',
    tags: ['febre', 'pediatria', 'urgencia']
  },
  {
    id: '3',
    title: 'Experiência com aleitamento materno exclusivo',
    content: 'Quero compartilhar minha experiência com 6 meses de aleitamento materno exclusivo. Foi desafiador mas muito gratificante. Aqui estão algumas dicas que me ajudaram...',
    category: 'experiencia',
    author_id: '4',
    author_name: 'Maria Silva',
    author_avatar: '👩‍⚕️',
    likes_count: 25,
    comments_count: 12,
    views_count: 156,
    is_pinned: false,
    is_edited: true,
    created_at: '2024-09-28T14:15:00Z',
    tags: ['aleitamento', 'maternidade', 'bebe']
  },
  {
    id: '4',
    title: 'Recursos online para educação infantil',
    content: 'Lista de recursos educativos online gratuitos para crianças em idade pré-escolar. Incluindo jogos educativos, vídeos e atividades para desenvolvimento cognitivo.',
    category: 'recursos',
    author_id: '2',
    author_name: 'Moderador Silva',
    author_avatar: '🛡️',
    likes_count: 18,
    comments_count: 6,
    views_count: 203,
    is_pinned: false,
    is_edited: false,
    created_at: '2024-09-30T16:45:00Z',
    tags: ['educacao', 'recursos', 'desenvolvimento']
  }
];

export const mockComments = [
  {
    id: '1',
    post_id: '1',
    content: 'Excelente post! Muito útil para pais de primeira viagem.',
    author_id: '3',
    author_name: 'Usuário Teste',
    author_avatar: '👤',
    likes_count: 5,
    created_at: '2024-10-01T11:00:00Z',
    is_edited: false
  },
  {
    id: '2',
    post_id: '1',
    content: 'Gostaria de adicionar que é importante manter a calma em situações de emergência.',
    author_id: '4',
    author_name: 'Maria Silva',
    author_avatar: '👩‍⚕️',
    likes_count: 3,
    created_at: '2024-10-01T12:30:00Z',
    is_edited: false
  },
  {
    id: '3',
    post_id: '2',
    content: 'Febre até 38.5°C em crianças pode ser normal. Observe se há outros sintomas como irritabilidade, falta de apetite ou dificuldade para respirar.',
    author_id: '1',
    author_name: 'Dr. Admin',
    author_avatar: '👑',
    likes_count: 8,
    created_at: '2024-10-02T09:00:00Z',
    is_edited: false
  },
  {
    id: '4',
    post_id: '2',
    content: 'Concordo com o Dr. Admin. Se a febre persistir por mais de 24h ou se a criança parecer muito abatida, procure atendimento médico.',
    author_id: '2',
    author_name: 'Moderador Silva',
    author_avatar: '🛡️',
    likes_count: 4,
    created_at: '2024-10-02T09:15:00Z',
    is_edited: false
  }
];

export const mockDiseases = [
  {
    id: '1',
    name: 'Asma Infantil',
    slug: 'asma-infantil',
    category: 'respiratorio',
    emoji: '🫁',
    color: 'blue',
    prevalence: '10-15% das crianças',
    short_description: 'Doença respiratória crônica que afeta as vias aéreas.',
    detailed_description: 'A asma é uma doença respiratória crônica caracterizada pela inflamação e estreitamento das vias aéreas, causando dificuldade para respirar, chiado no peito e tosse.',
    symptoms: ['Chiado no peito', 'Tosse seca', 'Falta de ar', 'Aperto no peito'],
    early_signs: ['Tosse noturna', 'Cansaço após atividades', 'Mudanças no padrão respiratório'],
    treatments: ['Medicação inalatória', 'Evitar gatilhos', 'Acompanhamento médico regular'],
    resources: [
      {
        title: 'Guia da Asma Infantil',
        description: 'Manual completo sobre asma em crianças',
        url: 'https://example.com/asma-guia'
      }
    ],
    views_count: 450,
    is_published: true,
    created_at: '2024-09-15T10:00:00Z',
    updated_at: '2024-09-20T14:30:00Z'
  },
  {
    id: '2',
    name: 'Otite Média',
    slug: 'otite-media',
    category: 'ouvido',
    emoji: '👂',
    color: 'orange',
    prevalence: '75% das crianças até 3 anos',
    short_description: 'Infecção no ouvido médio, comum em crianças pequenas.',
    detailed_description: 'A otite média é uma infecção ou inflamação do ouvido médio, muito comum em bebês e crianças pequenas devido à anatomia das trompas de Eustáquio.',
    symptoms: ['Dor de ouvido', 'Febre', 'Irritabilidade', 'Dificuldade para dormir'],
    early_signs: ['Puxar ou tocar o ouvido', 'Choro excessivo', 'Perda de audição temporária'],
    treatments: ['Antibióticos (se bacteriana)', 'Analgésicos', 'Compressas mornas'],
    resources: [
      {
        title: 'Prevenção da Otite',
        description: 'Como prevenir infecções de ouvido',
        url: 'https://example.com/otite-prevencao'
      }
    ],
    views_count: 320,
    is_published: true,
    created_at: '2024-09-18T08:00:00Z',
    updated_at: '2024-09-25T16:00:00Z'
  }
];

// Simulação de delay de rede
export const simulateNetworkDelay = (min = 300, max = 1000) => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};