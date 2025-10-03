// Conteúdo detalhado e expandido sobre Síndrome de Down
// Baseado em fontes científicas confiáveis adaptadas para linguagem acessível
// Fontes: OMS, NIH, Ministério da Saúde BR, Movimento Down, American Academy of Pediatrics

export interface ExpandedDiseaseContent {
  id: string;
  name: string;
  emoji: string;
  
  whatIs: {
    simple: string;
    detailed: string;
    scientific: string;
  };
  
  howItHappens: {
    cause: string;
    mechanism: string;
    childFriendly: string;
  };
  
  mainCharacteristics: {
    physical: string[];
    cognitive: string[];
    developmental: string[];
  };
  
  statistics: {
    prevalence: string;
    affectedPopulation: string;
    lifeExpectancy: string;
    qualityOfLife: string;
  };
  
  treatments: {
    medical: string[];
    therapeutic: string[];
    educational: string[];
    daily: string[];
  };
  
  support: {
    hospitals: Array<{
      name: string;
      city: string;
      state: string;
      phone: string;
      website?: string;
    }>;
    associations: Array<{
      name: string;
      description: string;
      phone: string;
      email: string;
      website: string;
    }>;
    governmentPrograms: string[];
  };
  
  forTeachers: {
    classroomAdaptations: string[];
    teachingStrategies: string[];
    inclusionTips: string[];
  };
  
  forParents: {
    firstSteps: string[];
    dailyRoutine: string[];
    emotionalSupport: string[];
    rights: string[];
  };
  
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  
  usefulLinks: Array<{
    title: string;
    url: string;
    description: string;
  }>;
  
  references: Array<{
    title: string;
    source: string;
    year: number;
    url?: string;
  }>;
}

// Dados detalhados da Síndrome de Down
export const sindromeDownDetalhada: ExpandedDiseaseContent = {
  id: 'sindrome-down',
  name: 'Síndrome de Down',
  emoji: '💙',
  
  whatIs: {
    simple: "A Síndrome de Down é quando uma pessoa nasce com um cromossomo a mais no seu corpo. Cromossomos são como pequenas instruções que dizem ao nosso corpo como crescer. Ter um cromossomo 21 extra faz com que a pessoa se desenvolva de uma forma um pouco diferente, mas isso não impede de ser feliz, aprender e fazer muitas coisas legais! 🌟",
    
    detailed: "A Síndrome de Down é uma condição genética causada pela presença de uma cópia extra do cromossomo 21 (trissomia do 21). Isso significa que, em vez de ter 46 cromossomos em cada célula, a pessoa tem 47. Essa cópia extra altera o desenvolvimento físico e cognitivo, mas não impede que a pessoa tenha uma vida plena e produtiva. Cada pessoa com Síndrome de Down é única, com sua própria personalidade, talentos e habilidades.",
    
    scientific: "A Síndrome de Down (SD) ou Trissomia do 21 é uma alteração cromossômica causada pela presença parcial ou total de três cópias do cromossomo 21. Ocorre em aproximadamente 1 a cada 700 nascimentos em todo o mundo. Existem três tipos: trissomia livre (95% dos casos), translocação (4%) e mosaicismo (1%). A presença do cromossomo extra afeta o desenvolvimento físico e intelectual através da superexpressão de genes localizados no cromossomo 21."
  },
  
  howItHappens: {
    cause: "A Síndrome de Down acontece por um erro natural durante a formação do óvulo ou espermatozoide, ou logo no início da gravidez. Não é causada por nada que os pais fizeram ou deixaram de fazer.",
    
    mechanism: "Durante a divisão celular que forma o óvulo ou espermatozoide, o par de cromossomos 21 não se separa corretamente (não-disjunção). Isso resulta em um óvulo ou espermatozoide com uma cópia extra do cromossomo 21. Quando esse óvulo ou espermatozoide se une ao outro gameta durante a fertilização, o embrião resultante terá três cópias do cromossomo 21 em vez de duas.",
    
    childFriendly: "Imagine que o nosso corpo é como uma receita de bolo. Todo mundo tem 46 'ingredientes especiais' chamados cromossomos. Quando uma pessoa tem Síndrome de Down, ela nasceu com 47 'ingredientes' - um ingrediente 21 a mais! É como ter uma receita um pouquinho diferente, que faz um bolo único e especial. E sabe o que é legal? Cada pessoa com esse 'ingrediente' extra é diferente, do mesmo jeito que cada bolo pode ter um sabor único! 🎂"
  },
  
  mainCharacteristics: {
    physical: [
      "Tônus muscular mais baixo (hipotonia) ao nascer",
      "Perfil facial característico com nariz pequeno e achatado",
      "Olhos com leve inclinação para cima (fissura palpebral oblíqua)",
      "Mãos pequenas com uma linha única na palma (prega palmar única)",
      "Baixa estatura (geralmente mais baixos que a média)",
      "Pescoço curto e mais largo",
      "Língua com tendência a ficar para fora (protrusão lingual)",
      "Orelhas pequenas e de implantação mais baixa"
    ],
    cognitive: [
      "Desenvolvimento intelectual mais lento, mas com capacidade de aprendizado",
      "Dificuldades variáveis com memória de curto prazo",
      "Processamento de informações pode levar mais tempo",
      "Habilidades visuais geralmente mais fortes que habilidades auditivas",
      "Muitas pessoas alcançam alfabetização e habilidades matemáticas básicas",
      "Capacidade de aprendizado contínuo ao longo da vida"
    ],
    developmental: [
      "Marcos do desenvolvimento (sentar, andar, falar) atingidos mais tarde",
      "Sentar sozinho: média de 11 meses (típico: 7 meses)",
      "Primeiros passos: média de 24 meses (típico: 12 meses)",
      "Primeiras palavras: média de 16 meses (típico: 12 meses)",
      "Controle de esfíncteres pode levar mais tempo",
      "Com estimulação precoce, o desenvolvimento é significativamente melhorado"
    ]
  },
  
  statistics: {
    prevalence: "1 em cada 700 nascimentos no mundo. No Brasil, nascem cerca de 8.000 bebês com Síndrome de Down por ano (Fonte: Movimento Down, 2023)",
    affectedPopulation: "Afeta igualmente meninos e meninas, todas as etnias e classes sociais. O risco aumenta com a idade materna: 1 em 1.480 aos 20 anos, 1 em 940 aos 30 anos, 1 em 353 aos 35 anos, e 1 em 85 aos 40 anos.",
    lifeExpectancy: "A expectativa de vida aumentou dramaticamente: em 1960 era de 10 anos; hoje é de 60 anos ou mais. Muitas pessoas com SD vivem vidas longas e saudáveis com os cuidados adequados.",
    qualityOfLife: "Com estimulação precoce, educação inclusiva e suporte adequado, pessoas com Síndrome de Down podem ter uma excelente qualidade de vida. Muitos trabalham, vivem de forma independente ou semi-independente, têm relacionamentos significativos e contribuem ativamente para suas comunidades."
  },
  
  treatments: {
    medical: [
      "Acompanhamento pediátrico regular (visitas mais frequentes nos primeiros anos)",
      "Avaliação cardiológica (40-50% têm cardiopatias congênitas)",
      "Avaliação oftalmológica anual (problemas de visão são comuns)",
      "Avaliação auditiva regular (50% têm problemas auditivos)",
      "Acompanhamento endocrinológico (maior risco de hipotireoidismo)",
      "Cirurgias corretivas quando necessário (cardíacas, gastrintestinais)",
      "Suplementação vitamínica quando recomendada pelo médico"
    ],
    therapeutic: [
      "Fisioterapia: fortalecimento muscular, coordenação motora, equilíbrio",
      "Fonoaudiologia: desenvolvimento da fala, linguagem e deglutição",
      "Terapia ocupacional: habilidades de vida diária, coordenação fina",
      "Estimulação precoce: iniciar o mais cedo possível (primeiros meses de vida)",
      "Psicologia: desenvolvimento emocional e social",
      "Musicoterapia: estimulação através da música",
      "Equoterapia: terapia com cavalos (melhora equilíbrio e autoestima)"
    ],
    educational: [
      "Educação inclusiva em escola regular com apoio adequado",
      "Atendimento Educacional Especializado (AEE) no contraturno",
      "Adaptações curriculares individualizadas",
      "Professor auxiliar ou mediador quando necessário",
      "Materiais didáticos adaptados e visuais",
      "Ritmo de aprendizagem respeitado",
      "Alfabetização é possível e deve ser estimulada"
    ],
    daily: [
      "Rotina estruturada e previsível",
      "Atividades físicas regulares (natação, dança, caminhadas)",
      "Alimentação saudável e balanceada",
      "Sono adequado (crianças precisam de 10-12 horas)",
      "Interações sociais frequentes com outras crianças",
      "Jogos e brincadeiras que estimulem o desenvolvimento",
      "Leitura diária (mesmo antes da alfabetização)",
      "Participação em tarefas domésticas adequadas à idade"
    ]
  },
  
  support: {
    hospitals: [
      {
        name: "Instituto Jô Clemente (antiga APAE de São Paulo)",
        city: "São Paulo",
        state: "SP",
        phone: "(11) 5080-7000",
        website: "https://www.ijc.org.br"
      },
      {
        name: "Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente (IFF/Fiocruz)",
        city: "Rio de Janeiro",
        state: "RJ",
        phone: "(21) 2554-1700",
        website: "http://www.iff.fiocruz.br"
      },
      {
        name: "Hospital das Clínicas da UFMG",
        city: "Belo Horizonte",
        state: "MG",
        phone: "(31) 3409-9200",
        website: "https://www.hc.ufmg.br"
      },
      {
        name: "Hospital de Clínicas de Porto Alegre",
        city: "Porto Alegre",
        state: "RS",
        phone: "(51) 3359-8000",
        website: "https://www.hcpa.edu.br"
      }
    ],
    associations: [
      {
        name: "Movimento Down",
        description: "ONG que promove qualidade de vida e inclusão social de pessoas com Síndrome de Down",
        phone: "(11) 3569-2224",
        email: "contato@movimentodown.org.br",
        website: "https://www.movimentodown.org.br"
      },
      {
        name: "Federação Brasileira das Associações de Síndrome de Down",
        description: "Rede nacional de associações que trabalham com SD",
        phone: "(11) 3569-2224",
        email: "contato@federacaodown.org.br",
        website: "https://www.federacaodown.org.br"
      },
      {
        name: "Ser Down",
        description: "Associação voltada para autonomia e inclusão",
        phone: "(11) 3862-2424",
        email: "contato@serdown.org.br",
        website: "https://www.serdown.org.br"
      }
    ],
    governmentPrograms: [
      "Benefício de Prestação Continuada (BPC-LOAS): renda mensal para famílias de baixa renda",
      "Programa de Estimulação Precoce: disponível em Centros de Reabilitação do SUS",
      "Atendimento Educacional Especializado (AEE): garantido por lei nas escolas públicas",
      "Passe Livre Interestadual: transporte gratuito em viagens interestaduais",
      "Isenção de IPI, ICMS e IPVA na compra de veículo adaptado",
      "Prioridade em programas habitacionais",
      "Meia-entrada em eventos culturais"
    ]
  },
  
  forTeachers: {
    classroomAdaptations: [
      "Sentar o aluno próximo ao professor para facilitar a atenção",
      "Usar recursos visuais abundantes (imagens, vídeos, cartazes)",
      "Fornecer instruções escritas além das orais",
      "Dar tempo extra para realização de atividades",
      "Dividir tarefas complexas em etapas menores",
      "Usar tecnologias assistivas quando disponível (tablets, apps educativos)",
      "Criar um ambiente previsível com rotinas claras"
    ],
    teachingStrategies: [
      "Ensino multissensorial (visual, auditivo, tátil)",
      "Repetição e reforço constante dos conteúdos",
      "Usar exemplos concretos antes de conceitos abstratos",
      "Gamificação e aprendizagem lúdica",
      "Trabalho em grupos pequenos com colegas facilitadores",
      "Elogiar esforços e celebrar cada conquista",
      "Adaptar avaliações sem diminuir expectativas",
      "Manter comunicação constante com a família"
    ],
    inclusionTips: [
      "Promover a inclusão real, não apenas a presença física",
      "Educar toda a turma sobre diversidade e respeito",
      "Valorizar as habilidades do aluno com SD perante a turma",
      "Incentivar amizades genuínas através de trabalhos em grupo",
      "Combater bullying imediatamente e com firmeza",
      "Incluir o aluno em todas as atividades (festas, passeios, apresentações)",
      "Ter expectativas positivas e realistas",
      "Trabalhar em parceria com a equipe de apoio (AEE, terapeutas)"
    ]
  },
  
  forParents: {
    firstSteps: [
      "Aceite o diagnóstico no seu tempo - é normal sentir muitas emoções",
      "Busque informação em fontes confiáveis (médicos, associações, literatura científica)",
      "Conecte-se com outras famílias - grupos de apoio são fundamentais",
      "Inicie estimulação precoce o quanto antes - quanto mais cedo, melhor",
      "Monte uma equipe multidisciplinar (pediatra, fisioterapeuta, fono, terapeuta ocupacional)",
      "Conheça os direitos do seu filho - há muitos benefícios disponíveis",
      "Cuide da saúde emocional da família toda",
      "Lembre-se: seu filho é primeiro uma criança, depois tem uma síndrome"
    ],
    dailyRoutine: [
      "Estabeleça rotinas previsíveis para dar segurança",
      "Incentive a independência desde cedo (vestir-se, comer, higiene)",
      "Inclua a criança nas tarefas domésticas adequadas à idade",
      "Promova atividades físicas diárias (pelo menos 1 hora)",
      "Limite tempo de tela (máximo 1-2 horas/dia para crianças)",
      "Leia todos os dias, mesmo que a criança ainda não fale",
      "Organize brincadeiras com outras crianças regularmente",
      "Mantenha alimentação saudável - há maior tendência à obesidade"
    ],
    emotionalSupport: [
      "Busque apoio psicológico se necessário - não há vergonha nisso",
      "Participe de grupos de pais - o compartilhamento ajuda muito",
      "Cuide do seu relacionamento conjugal - a síndrome afeta toda a família",
      "Reserve tempo para você - pais saudáveis cuidam melhor",
      "Não se compare com outras famílias - cada criança é única",
      "Celebre cada conquista, por menor que pareça",
      "Mantenha expectativas positivas mas realistas",
      "Lembre-se: você está fazendo o seu melhor"
    ],
    rights: [
      "Educação inclusiva em escola regular é um DIREITO (Lei Brasileira de Inclusão)",
      "Atendimento preferencial em serviços públicos e privados",
      "Gratuidade em transporte público (cartão de passe livre)",
      "Benefício assistencial (BPC-LOAS) para famílias de baixa renda",
      "Isenção de impostos na compra de veículo adaptado",
      "Prioridade em programas de moradia",
      "Direito a acompanhante em internações hospitalares",
      "Redução de jornada de trabalho para pais/cuidadores (em alguns casos)",
      "Aposentadoria por invalidez quando aplicável"
    ]
  },
  
  faqs: [
    {
      question: "A Síndrome de Down é uma doença?",
      answer: "Não! A Síndrome de Down é uma condição genética, não uma doença. Isso significa que não é algo que se 'pega' ou que pode ser 'curado'. É simplesmente uma forma diferente de ser. Pessoas com SD não estão doentes - elas podem ter ótima saúde!"
    },
    {
      question: "Pessoas com Síndrome de Down podem aprender a ler e escrever?",
      answer: "Sim! A maioria das pessoas com Síndrome de Down pode aprender a ler e escrever. O processo pode levar mais tempo e requer métodos de ensino adaptados, mas é totalmente possível. Muitas alcançam alfabetização funcional e algumas até completam o ensino superior."
    },
    {
      question: "Crianças com SD podem estudar em escola regular?",
      answer: "Sim, e isso é um direito garantido por lei! A educação inclusiva, onde a criança estuda com colegas da mesma idade em escola regular, é o melhor para o desenvolvimento social e acadêmico. A escola deve fornecer apoio adequado através do Atendimento Educacional Especializado (AEE)."
    },
    {
      question: "Qual é a expectativa de vida?",
      answer: "A expectativa de vida aumentou muito! Antes era em torno de 10 anos, hoje muitas pessoas com SD vivem até 60 anos ou mais. Com os avanços médicos e melhor qualidade de vida, essa expectativa continua aumentando."
    },
    {
      question: "Pessoas com SD podem trabalhar?",
      answer: "Sim! Muitas pessoas com Síndrome de Down trabalham em diversos setores: comércio, serviços, escritórios, etc. A Lei de Cotas (Lei 8.213/91) garante vagas para pessoas com deficiência em empresas com mais de 100 funcionários. Com formação adequada, podem ter carreiras produtivas e satisfatórias."
    },
    {
      question: "Pessoas com SD podem viver de forma independente?",
      answer: "Depende de cada pessoa. Algumas conseguem viver de forma totalmente independente, outras precisam de apoio parcial (moradia assistida), e algumas precisam de suporte constante. Com treinamento adequado de habilidades de vida diária, muitos alcançam grande autonomia."
    },
    {
      question: "É possível prevenir a Síndrome de Down?",
      answer: "Não há prevenção, pois é um erro aleatório na divisão celular. O que pode ser feito é o diagnóstico pré-natal através de exames como amniocentese ou teste NIPT, mas isso não previne - apenas detecta. O importante é que pessoas com SD podem ter vidas plenas e felizes!"
    },
    {
      question: "Todos os bebês com SD nascem com problemas cardíacos?",
      answer: "Não todos, mas cerca de 40-50% nascem com alguma cardiopatia congênita. A boa notícia é que muitas podem ser corrigidas cirurgicamente com excelentes resultados. Por isso é importante fazer avaliação cardiológica logo após o nascimento."
    },
    {
      question: "Como devo me comunicar com uma pessoa com Síndrome de Down?",
      answer: "Naturalmente! Fale diretamente com a pessoa (não com o acompanhante), use linguagem clara e simples (mas não infantilizada se for adulto), tenha paciência se a resposta demorar, e trate-a com o mesmo respeito que trata qualquer pessoa. Cada um é único!"
    },
    {
      question: "Irmãos de crianças com SD precisam de atenção especial?",
      answer: "Sim. Irmãos podem ter sentimentos conflitantes (amor, ciúme, preocupação) e precisam de espaço para expressar isso. É importante: dar atenção individual a cada filho, explicar sobre a síndrome de forma adequada à idade, envolver os irmãos nos cuidados de forma positiva (não como obrigação), e buscar apoio psicológico se necessário."
    }
  ],
  
  usefulLinks: [
    {
      title: "Movimento Down - Site Oficial",
      url: "https://www.movimentodown.org.br",
      description: "Principal ONG brasileira sobre Síndrome de Down, com informações, eventos e grupos de apoio"
    },
    {
      title: "National Down Syndrome Society (NDSS)",
      url: "https://www.ndss.org",
      description: "Organização americana com vasto material educativo (em inglês)"
    },
    {
      title: "Protocolo de Acompanhamento de Saúde - Ministério da Saúde",
      url: "https://www.gov.br/saude",
      description: "Diretrizes oficiais para acompanhamento médico de pessoas com SD no SUS"
    },
    {
      title: "Instituto Jô Clemente",
      url: "https://www.ijc.org.br",
      description: "Materiais educativos, cursos e informações sobre deficiência intelectual"
    },
    {
      title: "Canal do YouTube: Movimento Down",
      url: "https://www.youtube.com/@MovimentoDown",
      description: "Vídeos educativos sobre inclusão, desenvolvimento e direitos"
    }
  ],
  
  references: [
    {
      title: "Clinical report—Health supervision for children with Down syndrome",
      source: "American Academy of Pediatrics",
      year: 2022,
      url: "https://publications.aap.org/pediatrics/article/149/5/e2022057010/186927"
    },
    {
      title: "Diretrizes de Atenção à Pessoa com Síndrome de Down",
      source: "Ministério da Saúde do Brasil",
      year: 2013,
      url: "https://bvsms.saude.gov.br/bvs/publicacoes/diretrizes_atencao_pessoa_sindrome_down.pdf"
    },
    {
      title: "Down syndrome: Overview of systematic reviews",
      source: "Cochrane Database of Systematic Reviews",
      year: 2020
    },
    {
      title: "Educational approaches for children with Down syndrome worldwide",
      source: "International Journal of Disability, Development and Education",
      year: 2021
    }
  ]
};
