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
  funFacts?: string[];
  color: string;
}

export const diseases: Disease[] = [
  {
    id: 'sindrome-down',
    name: 'Síndrome de Down',
    emoji: '☀️',
    description: 'Uma condição genética que acontece quando uma pessoa nasce com um cromossomo extra. Isso faz com que ela se desenvolva de forma um pouco diferente, mas ainda pode ter uma vida feliz e cheia de conquistas!',
    difficultyLevel: 'easy',
    difficultyLabel: 'Fácil de Entender',
    ageGroup: 'Desde o nascimento',
    characteristics: [
      'Características físicas específicas',
      'Desenvolvimento mais lento',
      'Mas muita alegria e carinho para dar'
    ],
    specialTips: 'Feito com ❤️ para ajudar crianças a entender',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'fibrose-cistica',
    name: 'Fibrose Cística',
    emoji: '🫁',
    description: 'Uma doença que faz com que o corpo produza um muco muito grosso, principalmente nos pulmões e no sistema digestivo. É como se o corpo fizesse uma "cola" que dificulta a respiração.',
    difficultyLevel: 'attention',
    difficultyLabel: 'Precisa de Atenção',
    ageGroup: 'Desde o nascimento',
    characteristics: [
      'Tosse persistente',
      'Dificuldade para respirar',
      'Problemas digestivos'
    ],
    specialTips: 'Crianças com fibrose cística fazem exercícios especiais para ajudar a limpar os pulmões e tomam medicamentos que ajudam muito. Com cuidado, podem brincar e se divertir como qualquer criança!',
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 'huntington',
    name: 'Doença de Huntington',
    emoji: '🧠',
    description: 'Uma doença que afeta o cérebro e faz com que a pessoa tenha dificuldade para controlar os movimentos, pensamentos e emoções. Geralmente aparece quando a pessoa já é adulta.',
    difficultyLevel: 'complex',
    difficultyLabel: 'Mais Complexo',
    ageGroup: 'Adultos (30-50 anos)',
    characteristics: [
      'Movimentos involuntários',
      'Mudanças de humor',
      'Dificuldade para pensar'
    ],
    specialTips: 'Feito com ❤️ para ajudar crianças a entender',
    color: 'from-purple-700 to-pink-700'
  },
  {
    id: 'sindrome-rett',
    name: 'Síndrome de Rett',
    emoji: '🌸',
    description: 'Uma condição que afeta principalmente meninas e faz com que o desenvolvimento seja um pouco mais lento. As pessoas com Síndrome de Rett são muito carinhosas e têm um jeito especial de se comunicar!',
    difficultyLevel: 'attention',
    difficultyLabel: 'Precisa de Atenção',
    ageGroup: 'Meninas (6 meses a 2 anos)',
    characteristics: [
      'Desenvolvimento mais lento',
      'Movimentos repetitivos das mãos',
      'Dificuldade para falar'
    ],
    specialTips: 'Meninas com Síndrome de Rett podem aprender de formas diferentes e são muito amorosas. Elas gostam de música e carinho!',
    color: 'from-pink-500 to-purple-500'
  },
  {
    id: 'autismo',
    name: 'Transtorno do Espectro Autista',
    emoji: '🌈',
    description: 'Uma condição que faz com que as pessoas vejam e sintam o mundo de uma forma diferente e especial. Cada pessoa com autismo é única e tem seus próprios superpoderes!',
    difficultyLevel: 'easy',
    difficultyLabel: 'Fácil de Entender',
    ageGroup: 'Desde pequenos (2-3 anos)',
    characteristics: [
      'Jeito especial de se comunicar',
      'Interesses muito focados',
      'Sensibilidade a sons e luzes'
    ],
    specialTips: 'Pessoas com autismo podem ter talentos incríveis! Algumas são muito boas em matemática, arte ou música. É importante ter paciência e carinho.',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'paralisia-cerebral',
    name: 'Paralisia Cerebral',
    emoji: '🦋',
    description: 'Uma condição que acontece quando uma parte do cérebro que controla os movimentos é afetada. Isso pode fazer com que seja mais difícil se mover, mas não impede de ter sonhos e ser feliz!',
    difficultyLevel: 'easy',
    difficultyLabel: 'Fácil de Entender',
    ageGroup: 'Desde o nascimento',
    characteristics: [
      'Dificuldade para se mover',
      'Músculos mais rígidos',
      'Às vezes precisa de cadeira de rodas'
    ],
    specialTips: 'Crianças com paralisia cerebral podem fazer fisioterapia para fortalecer os músculos. Elas adoram brincar e fazer amigos como qualquer outra criança!',
    color: 'from-green-500 to-blue-500'
  },
  {
    id: 'sindrome-williams',
    name: 'Síndrome de Williams',
    emoji: '🎵',
    description: 'Uma condição genética que faz com que as pessoas sejam super sociáveis e adoram música! Elas têm um coração muito grande e fazem amizade com todo mundo.',
    difficultyLevel: 'easy',
    difficultyLabel: 'Fácil de Entender',
    ageGroup: 'Desde o nascimento',
    characteristics: [
      'Muito amigáveis e sociáveis',
      'Adoram música',
      'Rosto com características especiais'
    ],
    specialTips: 'Pessoas com Síndrome de Williams são conhecidas por serem muito carinhosas e terem uma memória incrível para música. Elas adoram cantar!',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'sindrome-prader-willi',
    name: 'Síndrome de Prader-Willi',
    emoji: '🍎',
    description: 'Uma condição que faz com que seja difícil controlar a fome e o peso. As pessoas com essa síndrome precisam de ajuda especial com a alimentação, mas são muito carinhosas!',
    difficultyLevel: 'attention',
    difficultyLabel: 'Precisa de Atenção',
    ageGroup: 'Desde o nascimento',
    characteristics: [
      'Dificuldade para controlar a fome',
      'Desenvolvimento mais lento',
      'Músculos mais fracos quando bebês'
    ],
    specialTips: 'É importante ajudar com uma alimentação saudável e exercícios. Elas adoram rotinas e são muito afetuosas com a família!',
    color: 'from-red-500 to-pink-500'
  }
];

export const getDifficultyBadgeColor = (level: Disease['difficultyLevel']) => {
  switch (level) {
    case 'easy':
      return 'bg-green-500 text-white';
    case 'attention':
      return 'bg-orange-500 text-white';
    case 'complex':
      return 'bg-pink-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};