export interface Disease {
  id: string;
  name: string;
  emoji: string;
  description: string;
  difficultyLevel: 'easy' | 'attention' | 'complex';
  difficultyLabel: string;
  ageGroup: string;
  characteristics: string[];
  specialTips: string;
  color: string;
}

export const diseases: Disease[] = [
  {
    id: 'down-syndrome',
    name: 'Síndrome de Down',
    emoji: '☀️',
    description: 'Uma condição genética especial que acontece quando uma pessoa nasce com um cromossomo extra. Isso faz com que ela se desenvolva de forma um pouco diferente, mas ainda pode ter uma vida feliz e cheia de conquistas!',
    difficultyLevel: 'easy',
    difficultyLabel: 'Fácil de Entender',
    ageGroup: 'Desde o nascimento',
    characteristics: [
      'Olhos amendoados especiais',
      'Coração muito carinhoso', 
      'Aprendem no seu próprio ritmo',
      'Sempre cheios de amor'
    ],
    specialTips: 'Pessoas com Síndrome de Down são conhecidas por serem muito amorosas e carinhosas! 💕',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'autism-spectrum',
    name: 'Transtorno do Espectro Autista',
    emoji: '🌈',
    description: 'Uma condição que faz com que as pessoas vejam e sintam o mundo de uma forma diferente e especial. É como ter superpoderes únicos para perceber coisas que outros não veem!',
    difficultyLevel: 'attention',
    difficultyLabel: 'Requer Atenção',
    ageGroup: 'Pode aparecer nos primeiros anos',
    characteristics: [
      'Jeito especial de se comunicar',
      'Interesses super focados',
      'Sensibilidade especial aos sons',
      'Memória incrível para detalhes'
    ],
    specialTips: 'Cada pessoa com autismo é única como um floco de neve! ❄️ Todos têm seus próprios superpoderes.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'williams-syndrome',
    name: 'Síndrome de Williams',
    emoji: '🎵',
    description: 'Uma condição genética que faz com que as pessoas sejam extremamente sociáveis e musicais. É como se tivessem um imã especial para fazer amizades e um coração que bate no ritmo da música!',
    difficultyLevel: 'easy',
    difficultyLabel: 'Fácil de Entender',
    ageGroup: 'Desde o nascimento',
    characteristics: [
      'Super sociáveis e amigáveis',
      'Adoram música',
      'Fazem amigos facilmente',
      'Coração enorme para amar'
    ],
    specialTips: 'São conhecidos como "anjos da música" por seu amor especial por melodias! 🎶',
    color: 'from-green-400 to-blue-500'
  },
  {
    id: 'cerebral-palsy',
    name: 'Paralisia Cerebral',
    emoji: '💪',
    description: 'Uma condição que afeta os movimentos do corpo, mas não impede de ter sonhos grandes e conquistas incríveis. É como se o cérebro enviasse mensagens diferentes para os músculos.',
    difficultyLevel: 'attention',
    difficultyLabel: 'Requer Atenção',
    ageGroup: 'Desde o nascimento',
    characteristics: [
      'Movimentos únicos do corpo',
      'Pode usar cadeira de rodas',
      'Inteligência normal',
      'Força interior gigante'
    ],
    specialTips: 'Muitos atletas paraolímpicos têm paralisia cerebral e são campeões! 🏅',
    color: 'from-red-400 to-pink-500'
  },
  {
    id: 'rett-syndrome',
    name: 'Síndrome de Rett',
    emoji: '🌸',
    description: 'Uma condição genética rara que acontece principalmente com meninas. Embora possam ter dificuldades, elas são muito sensíveis e se comunicam através do olhar e sorrisos.',
    difficultyLevel: 'complex',
    difficultyLabel: 'Mais Complexa',
    ageGroup: 'Aparece após os primeiros meses',
    characteristics: [
      'Dificuldade para usar as mãos',
      'Comunicação através do olhar',
      'Movimentos repetitivos',
      'Muito sensíveis e carinhosas'
    ],
    specialTips: 'Se comunicam principalmente pelos olhos - uma forma muito especial de conexão! 👀💕',
    color: 'from-pink-400 to-purple-500'
  },
  {
    id: 'prader-willi',
    name: 'Síndrome de Prader-Willi',
    emoji: '🤗',
    description: 'Uma condição genética que afeta o apetite e o crescimento. Pessoas com esta síndrome são extremamente carinhosas, leais e têm um senso de humor incrível!',
    difficultyLevel: 'attention',
    difficultyLabel: 'Requer Atenção',
    ageGroup: 'Desde o nascimento',
    characteristics: [
      'Dificuldade para controlar fome',
      'Crescimento mais devagar',
      'Personalidade muito doce',
      'Senso de humor fantástico'
    ],
    specialTips: 'São conhecidos por serem extremamente leais e terem o melhor senso de humor! 😄',
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 'spina-bifida',
    name: 'Espinha Bífida',
    emoji: '🌟',
    description: 'Uma condição que acontece antes do nascimento quando a coluna não se fecha completamente. Mas isso não impede de ter uma vida cheia de aventuras e conquistas!',
    difficultyLevel: 'attention',
    difficultyLabel: 'Requer Atenção',
    ageGroup: 'Desde o nascimento',
    characteristics: [
      'Pode afetar movimentos das pernas',
      'Às vezes usa cadeira de rodas',
      'Inteligência completamente normal',
      'Determinação especial'
    ],
    specialTips: 'Muitos praticam esportes adaptados e são verdadeiros campeões! 🏆',
    color: 'from-blue-400 to-green-500'
  },
  {
    id: 'duchenne-md',
    name: 'Distrofia Muscular de Duchenne',
    emoji: '🦋',
    description: 'Uma condição que faz os músculos ficarem mais fracos com o tempo. Mas pessoas com DMD têm personalidades incríveis e inspiram todos com sua força interior!',
    difficultyLevel: 'complex',
    difficultyLabel: 'Mais Complexa',
    ageGroup: 'Aparece na infância',
    characteristics: [
      'Músculos que se enfraquecem',
      'Pode precisar de cadeira de rodas',
      'Inteligência normal ou superior',
      'Espírito muito forte'
    ],
    specialTips: 'São exemplo de como a força interior pode superar qualquer desafio! 💝',
    color: 'from-purple-400 to-blue-500'
  },
  {
    id: 'cystic-fibrosis',
    name: 'Fibrose Cística',
    emoji: '💨',
    description: 'Uma condição que afeta os pulmões e digestão, fazendo o corpo produzir muco mais espesso. Com cuidados especiais, podem viver vidas ativas e felizes!',
    difficultyLevel: 'attention',
    difficultyLabel: 'Requer Atenção',
    ageGroup: 'Desde o nascimento',
    characteristics: [
      'Tosse para limpar os pulmões',
      'Precisa de fisioterapia especial',
      'Toma remédios todos os dias',
      'Come mais para ter energia'
    ],
    specialTips: 'Com os novos tratamentos, podem praticar esportes e realizar sonhos! 🏃‍♂️',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'turner-syndrome',
    name: 'Síndrome de Turner',
    emoji: '🎀',
    description: 'Uma condição genética que afeta apenas meninas, fazendo com que sejam especiais de várias maneiras. Podem ser mais baixas, mas têm talentos únicos!',
    difficultyLevel: 'easy',
    difficultyLabel: 'Fácil de Entender',
    ageGroup: 'Desde o nascimento',
    characteristics: [
      'Pode ser mais baixinha',
      'Às vezes precisa de ajuda com matemática',
      'Pode ter talentos em arte',
      'Muito criativa e inteligente'
    ],
    specialTips: 'Muitas são super criativas e se destacam em arte e literatura! 🎨',
    color: 'from-pink-400 to-red-500'
  },
  {
    id: 'fragile-x',
    name: 'Síndrome do X Frágil',
    emoji: '💫',
    description: 'Uma condição genética que pode afetar o aprendizado e comunicação. Pessoas com X Frágil são frequentemente muito carinhosas e têm memórias fantásticas!',
    difficultyLevel: 'attention',
    difficultyLabel: 'Requer Atenção',
    ageGroup: 'Aparece na infância',
    characteristics: [
      'Aprende de jeito diferente',
      'Às vezes é tímido no começo',
      'Memória incrível para coisas favoritas',
      'Muito carinhoso e empático'
    ],
    specialTips: 'Podem memorizar filmes inteiros e são super empáticos! 🎬💕',
    color: 'from-indigo-400 to-purple-500'
  },
  {
    id: 'sickle-cell',
    name: 'Anemia Falciforme',
    emoji: '❤️‍🩹',
    description: 'Uma condição do sangue que faz algumas células vermelhas terem formato de lua crescente. Com cuidados médicos, podem viver vidas ativas e saudáveis!',
    difficultyLevel: 'attention',
    difficultyLabel: 'Requer Atenção',
    ageGroup: 'Desde o nascimento',
    characteristics: [
      'Às vezes sente dores',
      'Pode ficar mais cansado',
      'Precisa beber muita água',
      'Toma remédios especiais'
    ],
    specialTips: 'Muitos atletas famosos têm anemia falciforme e são super fortes! 💪',
    color: 'from-red-400 to-rose-500'
  }
];

export function getDifficultyBadgeColor(level: Disease['difficultyLevel']): string {
  switch (level) {
    case 'easy':
      return 'bg-green-100 text-green-800';
    case 'attention':
      return 'bg-yellow-100 text-yellow-800';
    case 'complex':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}