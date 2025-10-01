import type { Disease } from '../types/Disease';

export const diseases: Disease[] = [
  {
    id: 'sindrome-rett',
    name: 'Síndrome de Rett',
    alternativeNames: ['Rett Syndrome', 'RTT'],
    icdCode: 'F84.2',
    category: 'Neurológicas',
    
    prevalence: {
      rate: '1 em 10.000-15.000',
      population: 'meninas nascidas vivas',
      source: 'International Rett Syndrome Foundation',
      lastUpdate: '2024'
    },
    
    onset: {
      typical: { min: 6, max: 18, unit: 'months' },
      range: { min: 0, max: 4, unit: 'years' },
      variability: 'Pode variar significativamente entre pacientes'
    },
    
    inheritance: 'Ligado ao X',
    geneticBasis: 'Mutações no gene MECP2 (99% dos casos) ou CDKL5',
    
    symptoms: {
      common: [
        {
          id: 'perda-habilidades',
          name: 'Perda de habilidades motoras',
          description: 'Perda progressiva de habilidades manuais intencionais',
          frequency: 'Muito comum',
          ageOfOnset: { min: 6, max: 18, unit: 'months' },
          severity: 'Severa',
          system: 'Neurológico'
        },
        {
          id: 'movimentos-estereotipados',
          name: 'Movimentos estereotipados das mãos',
          description: 'Movimentos repetitivos como torcer, apertar ou "lavar" as mãos',
          frequency: 'Muito comum',
          ageOfOnset: { min: 1, max: 4, unit: 'years' },
          severity: 'Moderada',
          system: 'Neurológico'
        }
      ],
      rare: [
        {
          id: 'escoliose',
          name: 'Escoliose severa',
          description: 'Curvatura anormal da coluna vertebral',
          frequency: 'Comum',
          ageOfOnset: { min: 8, max: 16, unit: 'years' },
          severity: 'Severa',
          system: 'Musculoesquelético'
        }
      ],
      progressive: [
        {
          id: 'regressao-desenvolvimento',
          name: 'Regressão do desenvolvimento',
          description: 'Perda de marcos do desenvolvimento previamente adquiridos',
          frequency: 'Muito comum',
          ageOfOnset: { min: 6, max: 18, unit: 'months' },
          severity: 'Severa',
          system: 'Neurológico'
        }
      ]
    },
    
    diagnosis: {
      clinicalCriteria: [
        'Período de desenvolvimento normal nos primeiros 6 meses',
        'Perda de habilidades manuais intencionais',
        'Perda de linguagem expressiva',
        'Movimentos estereotipados das mãos',
        'Desaceleração do crescimento craniano'
      ],
      diagnosticTests: [
        {
          id: 'teste-genetico-mecp2',
          name: 'Análise genética MECP2',
          description: 'Sequenciamento do gene MECP2',
          type: 'Genético',
          accuracy: 99,
          cost: 'Alto'
        }
      ],
      differentialDiagnosis: [
        'Síndrome de Angelman',
        'Transtorno do espectro autista',
        'Encefalopatia estática'
      ],
      specialistReferral: 'Neurologista pediátrico ou geneticista',
      averageTimeTodiagnosis: '2-4 anos após início dos sintomas'
    },
    
    treatment: {
      current: [
        {
          id: 'fisioterapia',
          name: 'Fisioterapia',
          description: 'Terapia física para manter mobilidade e prevenir contraturas',
          type: 'Terapia',
          effectiveness: 70,
          sideEffects: [],
          availability: 'Disponível'
        },
        {
          id: 'terapia-ocupacional',
          name: 'Terapia Ocupacional',
          description: 'Auxilia nas atividades diárias e comunicação',
          type: 'Terapia',
          effectiveness: 65,
          sideEffects: [],
          availability: 'Disponível'
        }
      ],
      experimental: [
        {
          id: 'trofinetide',
          name: 'Trofinetide (DAYBUE)',
          description: 'Primeiro medicamento aprovado para Síndrome de Rett',
          type: 'Medicamentoso',
          effectiveness: 40,
          sideEffects: ['Diarreia', 'Vômito', 'Fadiga'],
          availability: 'Limitado'
        }
      ],
      supportive: [
        'Suporte nutricional',
        'Tratamento de convulsões quando presentes',
        'Suporte respiratório quando necessário',
        'Cuidados ortopédicos para escoliose'
      ]
    },
    
    prognosis: {
      lifeExpectancy: 'Muitas pacientes vivem até a idade adulta com cuidados adequados',
      qualityOfLife: 'Varia significativamente; requer cuidados especializados',
      progression: 'Progressiva',
      complications: [
        'Convulsões',
        'Problemas respiratórios',
        'Escoliose',
        'Problemas de alimentação',
        'Distúrbios do sono'
      ]
    },
    
    resources: {
      organizations: [
        {
          id: 'abrett',
          name: 'Associação Brasileira de Síndrome de Rett (ABrett)',
          description: 'Organização que apoia famílias e promove pesquisas sobre Síndrome de Rett no Brasil',
          website: 'https://www.abrett.org.br',
          phone: '(11) 3081-8080',
          type: 'ONG'
        }
      ],
      educationalMaterials: [
        'Guia para pais - Síndrome de Rett',
        'Manual de cuidados diários',
        'Protocolo de fisioterapia'
      ],
      researchStudies: [
        'Estudos clínicos com Trofinetide',
        'Terapia gênica experimental',
        'Pesquisas sobre comunicação assistiva'
      ]
    },
    
    lastUpdated: '2024-09-24',
    reviewedBy: [
      'Dr. Monica Vargas - Neurologista Pediátrica',
      'Dra. Ana Beatriz Alvarez - Geneticista'
    ],
    sources: [
      'International Rett Syndrome Foundation',
      'Orphanet',
      'National Institute of Neurological Disorders and Stroke'
    ],
    
    shortDescription: 'Distúrbio neurológico raro que afeta principalmente meninas, causando perda de habilidades motoras e de comunicação.',
    tags: ['neurológico', 'genético', 'regressão', 'meninas', 'MECP2']
  },
  
  {
    id: 'fibrose-cistica',
    name: 'Fibrose Cística',
    alternativeNames: ['Cystic Fibrosis', 'Mucoviscidose'],
    icdCode: 'E84',
    category: 'Genéticas',
    
    prevalence: {
      rate: '1 em 2.500-3.500',
      population: 'nascidos vivos (caucasianos)',
      source: 'Cystic Fibrosis Foundation',
      lastUpdate: '2024'
    },
    
    onset: {
      typical: { min: 0, max: 2, unit: 'years' },
      range: { min: 0, max: 18, unit: 'years' },
      variability: 'Diagnóstico pode ser tardio em casos mais leves'
    },
    
    inheritance: 'Autossômico recessivo',
    geneticBasis: 'Mutações no gene CFTR',
    
    symptoms: {
      common: [
        {
          id: 'tosse-persistente',
          name: 'Tosse persistente com muco espesso',
          description: 'Tosse crônica com expectoração de muco viscoso',
          frequency: 'Muito comum',
          ageOfOnset: { min: 0, max: 6, unit: 'months' },
          severity: 'Moderada',
          system: 'Respiratório'
        },
        {
          id: 'infeccoes-respiratorias',
          name: 'Infecções respiratórias recorrentes',
          description: 'Pneumonias e bronquites frequentes',
          frequency: 'Muito comum',
          ageOfOnset: { min: 0, max: 1, unit: 'years' },
          severity: 'Severa',
          system: 'Respiratório'
        }
      ],
      rare: [
        {
          id: 'obstrucao-intestinal',
          name: 'Obstrução intestinal neonatal',
          description: 'Íleo meconial em recém-nascidos',
          frequency: 'Raro',
          ageOfOnset: { min: 0, max: 0, unit: 'months' },
          severity: 'Severa',
          system: 'Digestivo'
        }
      ],
      progressive: [
        {
          id: 'insuficiencia-pancreatica',
          name: 'Insuficiência pancreática',
          description: 'Diminuição da produção de enzimas digestivas',
          frequency: 'Muito comum',
          ageOfOnset: { min: 0, max: 2, unit: 'years' },
          severity: 'Severa',
          system: 'Digestivo'
        }
      ]
    },
    
    diagnosis: {
      clinicalCriteria: [
        'Sintomas respiratórios e/ou digestivos compatíveis',
        'História familiar positiva',
        'Teste do suor alterado',
        'Análise genética confirmando mutações CFTR'
      ],
      diagnosticTests: [
        {
          id: 'teste-suor',
          name: 'Teste do suor',
          description: 'Medição da concentração de cloro no suor',
          type: 'Bioquímico',
          accuracy: 95,
          cost: 'Baixo'
        },
        {
          id: 'teste-genetico-cftr',
          name: 'Análise genética CFTR',
          description: 'Identificação de mutações no gene CFTR',
          type: 'Genético',
          accuracy: 99,
          cost: 'Alto'
        }
      ],
      differentialDiagnosis: [
        'Asma bronquica',
        'Imunodeficiência primária',
        'Discinesia ciliar primária'
      ],
      specialistReferral: 'Pneumologista pediátrico',
      averageTimeTodiagnosis: '6 meses a 2 anos'
    },
    
    treatment: {
      current: [
        {
          id: 'fisioterapia-respiratoria',
          name: 'Fisioterapia respiratória',
          description: 'Técnicas para limpeza das vias aéreas',
          type: 'Terapia',
          effectiveness: 85,
          sideEffects: [],
          availability: 'Disponível'
        },
        {
          id: 'enzimas-pancreaticas',
          name: 'Enzimas pancreáticas',
          description: 'Suplementação enzimática para digestão',
          type: 'Suplemento',
          effectiveness: 90,
          sideEffects: ['Irritação intestinal'],
          availability: 'Disponível'
        }
      ],
      experimental: [
        {
          id: 'terapia-genetica',
          name: 'Terapia gênica',
          description: 'Correção genética experimental',
          type: 'Medicamentoso',
          effectiveness: 30,
          sideEffects: ['Reação inflamatória', 'Incerto a longo prazo'],
          availability: 'Experimental'
        }
      ],
      supportive: [
        'Antibióticos para infecções',
        'Broncodilatadores',
        'Suplementação vitamínica',
        'Suporte nutricional'
      ]
    },
    
    prognosis: {
      lifeExpectancy: 'Mediana de 47 anos com tratamento adequado',
      qualityOfLife: 'Boa com tratamento multidisciplinar',
      progression: 'Progressiva',
      complications: [
        'Insuficiência respiratória',
        'Diabetes relacionado à FC',
        'Doença hepática',
        'Osteoporose'
      ]
    },
    
    resources: {
      organizations: [
        {
          id: 'abram',
          name: 'Associação Brasileira de Assistência à Mucoviscidose (ABRAM)',
          description: 'Organização de apoio a pacientes com fibrose cística',
          website: 'https://www.abram.org.br',
          phone: '(11) 3288-6266',
          type: 'ONG'
        }
      ],
      educationalMaterials: [
        'Manual de cuidados em fibrose cística',
        'Guia nutricional',
        'Protocolo de fisioterapia respiratória'
      ],
      researchStudies: [
        'Estudos com moduladores CFTR',
        'Terapia gênica',
        'Novos antibióticos'
      ]
    },
    
    lastUpdated: '2024-09-24',
    reviewedBy: [
      'Dr. Ricardo Stein - Pneumologista Pediátrico',
      'Dra. Fernanda Lima - Geneticista'
    ],
    sources: [
      'Cystic Fibrosis Foundation',
      'European Cystic Fibrosis Society',
      'Registro Brasileiro de Fibrose Cística'
    ],
    
    shortDescription: 'Doença genética que afeta principalmente pulmões e sistema digestivo, causando infecções respiratórias recorrentes.',
    tags: ['genético', 'respiratório', 'digestivo', 'CFTR', 'autossômico recessivo']
  }
];

// Função para buscar doenças
export const searchDiseases = (query: string): Disease[] => {
  if (!query.trim()) return diseases;
  
  const lowercaseQuery = query.toLowerCase();
  
  return diseases.filter(disease => 
    disease.name.toLowerCase().includes(lowercaseQuery) ||
    disease.alternativeNames.some(name => name.toLowerCase().includes(lowercaseQuery)) ||
    disease.shortDescription.toLowerCase().includes(lowercaseQuery) ||
    disease.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    disease.symptoms.common.some(symptom => 
      symptom.name.toLowerCase().includes(lowercaseQuery) ||
      symptom.description.toLowerCase().includes(lowercaseQuery)
    )
  );
};

// Função para buscar por categoria
export const getDiseasesByCategory = (category: string): Disease[] => {
  return diseases.filter(disease => disease.category === category);
};