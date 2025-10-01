import { useState } from 'react';

interface ResourceData {
  id: string;
  title: string;
  category: 'educacional' | 'familiar' | 'profissional' | 'apoio';
  type: 'guia' | 'checklist' | 'dicas' | 'informativo';
  emoji: string;
  ageGroup?: string;
  description: string;
  tags: string[];
  content: ResourceContent[];
  downloadable: boolean;
}

interface ResourceContent {
  id: string;
  type: 'text' | 'list' | 'checklist' | 'tip';
  title: string;
  content: string | string[];
}

const resourceLibrary: ResourceData[] = [
  {
    id: 'resource-school-guide',
    title: 'Como Explicar Doenças Raras na Escola',
    category: 'educacional',
    type: 'guia',
    emoji: '🏫',
    ageGroup: 'Pais e Professores',
    description: 'Guia completo para pais e professores sobre como abordar o tema de doenças raras na escola de forma positiva e educativa.',
    tags: ['escola', 'educação', 'professores', 'inclusão'],
    downloadable: true,
    content: [
      {
        id: 'intro',
        type: 'text',
        title: 'Introdução',
        content: 'Conversar sobre doenças raras na escola é uma oportunidade de promover a inclusão e a empatia. Este guia oferece estratégias práticas para abordar o tema de forma positiva e educativa.'
      },
      {
        id: 'preparation',
        type: 'checklist',
        title: 'Preparação Antes da Conversa',
        content: [
          'Converse primeiro com os pais da criança',
          'Prepare informações simples e apropriadas para a idade',
          'Escolha um momento tranquilo para a conversa',
          'Prepare materiais visuais se necessário',
          'Defina os objetivos da conversa'
        ]
      },
      {
        id: 'approach',
        type: 'list',
        title: 'Como Abordar o Tema',
        content: [
          'Use linguagem simples e positiva',
          'Foque nas semelhanças antes das diferenças',
          'Explique que todos somos únicos e especiais',
          'Use analogias que as crianças compreendam',
          'Permita perguntas e responda honestamente'
        ]
      },
      {
        id: 'tips',
        type: 'tip',
        title: 'Dicas Importantes',
        content: 'Lembre-se: o objetivo não é explicar todos os detalhes médicos, mas promover a compreensão, aceitação e inclusão. Foque no que a criança pode fazer, não no que ela não pode.'
      }
    ]
  },
  {
    id: 'resource-family-support',
    title: 'Apoio para Famílias - Primeiros Passos',
    category: 'familiar',
    type: 'dicas',
    emoji: '❤️',
    ageGroup: 'Famílias',
    description: 'Recursos e dicas para famílias que acabaram de receber o diagnóstico de uma doença rara.',
    tags: ['família', 'diagnóstico', 'apoio', 'primeiros-passos'],
    downloadable: true,
    content: [
      {
        id: 'emotions',
        type: 'text',
        title: 'É Normal Sentir Diferentes Emoções',
        content: 'Receber um diagnóstico de doença rara pode despertar muitas emoções: medo, tristeza, confusão, alívio por ter respostas. Todos esses sentimentos são normais e válidos.'
      },
      {
        id: 'first-steps',
        type: 'list',
        title: 'Primeiros Passos Após o Diagnóstico',
        content: [
          'Respire fundo e dê tempo para processar a informação',
          'Busque informações em fontes confiáveis',
          'Entre em contato com associações de pacientes',
          'Converse com a equipe médica sobre o tratamento',
          'Busque apoio psicológico se necessário',
          'Conecte-se com outras famílias na mesma situação'
        ]
      },
      {
        id: 'children-conversation',
        type: 'checklist',
        title: 'Conversando com as Crianças',
        content: [
          'Use linguagem apropriada para a idade',
          'Seja honesto, mas não sobrecarregue com detalhes',
          'Reforce que a criança é amada incondicionalmente',
          'Explique que não é culpa de ninguém',
          'Mantenha rotinas normais sempre que possível'
        ]
      }
    ]
  },
  {
    id: 'resource-inclusive-activities',
    title: 'Atividades Inclusivas para a Sala de Aula',
    category: 'educacional',
    type: 'guia',
    emoji: '🎨',
    ageGroup: '6-12 anos',
    description: 'Coleção de atividades práticas para promover a inclusão e compreensão sobre diferenças na sala de aula.',
    tags: ['atividades', 'inclusão', 'sala-de-aula', 'diversidade'],
    downloadable: true,
    content: [
      {
        id: 'differences-activity',
        type: 'text',
        title: 'Atividade: "Somos Todos Diferentes e Especiais"',
        content: 'Peça para cada criança desenhar algo que a torna especial. Pode ser um talento, uma característica física, algo que gosta de fazer. Depois, criar um mural com todos os desenhos mostrando como cada pessoa é única.'
      },
      {
        id: 'empathy-games',
        type: 'list',
        title: 'Jogos de Empatia',
        content: [
          'Jogo da cadeira de rodas: experimentar diferentes perspectivas',
          'Óculos embaçados: simular diferentes tipos de visão',
          'Comunicação sem palavras: usar apenas gestos',
          'Ajuda mútua: atividades em duplas com desafios'
        ]
      },
      {
        id: 'books-suggestions',
        type: 'list',
        title: 'Livros Recomendados',
        content: [
          '"Todos Somos Diferentes" - diversos autores',
          '"A Cor de Cada Um" - Carlos Drummond de Andrade',
          '"O Patinho Que Não Era Feio" - Bel Pesce',
          '"Diferentes Como Você" - Jenny Sue Kostecki-Shaw'
        ]
      }
    ]
  },
  {
    id: 'resource-healthcare-navigation',
    title: 'Navegando no Sistema de Saúde',
    category: 'familiar',
    type: 'informativo',
    emoji: '🏥',
    ageGroup: 'Famílias',
    description: 'Informações práticas sobre como navegar no sistema de saúde com uma doença rara.',
    tags: ['saúde', 'médicos', 'tratamento', 'direitos'],
    downloadable: true,
    content: [
      {
        id: 'preparation-consultation',
        type: 'checklist',
        title: 'Preparando-se para Consultas',
        content: [
          'Liste todos os sintomas e quando começaram',
          'Traga histórico médico familiar',
          'Prepare uma lista de perguntas',
          'Traga acompanhante se possível',
          'Leve todos os exames anteriores',
          'Anote medicamentos e dosagens'
        ]
      },
      {
        id: 'questions-doctor',
        type: 'list',
        title: 'Perguntas Importantes para o Médico',
        content: [
          'Qual é o prognóstico da condição?',
          'Quais tratamentos estão disponíveis?',
          'Existem efeitos colaterais?',
          'Com que frequência são necessárias consultas?',
          'Existem restrições de atividades?',
          'Há apoio disponível para a família?'
        ]
      },
      {
        id: 'rights',
        type: 'text',
        title: 'Conhecendo Seus Direitos',
        content: 'Pacientes com doenças raras têm direitos específicos no sistema de saúde, incluindo acesso a tratamentos especializados, segunda opinião médica, e acompanhamento multidisciplinar. Informe-se sobre esses direitos.'
      }
    ]
  }
];

const categories = [
  { id: 'all', label: 'Todos os Recursos', emoji: '📚' },
  { id: 'educacional', label: 'Educacional', emoji: '🏫' },
  { id: 'familiar', label: 'Familiar', emoji: '❤️' },
  { id: 'profissional', label: 'Profissional', emoji: '👩‍⚕️' },
  { id: 'apoio', label: 'Apoio', emoji: '🤝' }
];

interface ResourceCenterProps {
  onBack: () => void;
}

const ResourceCenter = ({ onBack }: ResourceCenterProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState<ResourceData | null>(null);

  const filteredResources = selectedCategory === 'all' 
    ? resourceLibrary 
    : resourceLibrary.filter(resource => resource.category === selectedCategory);

  const handleResourceClick = (resource: ResourceData) => {
    setSelectedResource(resource);
  };

  const backToLibrary = () => {
    setSelectedResource(null);
  };

  const downloadResource = (resource: ResourceData) => {
    // Simular download - em produção, geraria PDF ou documento
    const content = resource.content.map(section => {
      if (section.type === 'text') {
        return `${section.title}\n\n${section.content}\n\n`;
      } else if (section.type === 'list' || section.type === 'checklist') {
        const items = Array.isArray(section.content) 
          ? section.content.map(item => `• ${item}`).join('\n')
          : section.content;
        return `${section.title}\n\n${items}\n\n`;
      }
      return `${section.title}\n\n${section.content}\n\n`;
    }).join('');

    const blob = new Blob([`${resource.title}\n\n${content}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.title.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-4">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={selectedResource ? backToLibrary : onBack}
          className="mb-6 px-4 py-2 bg-white bg-opacity-20 text-white rounded-full font-body hover:bg-opacity-30 transition-all"
        >
          ← {selectedResource ? 'Voltar aos Recursos' : 'Voltar ao Menu'}
        </button>

        {!selectedResource ? (
          <>
            {/* Header */}
            <div className="text-center mb-8 text-white">
              <h1 className="text-4xl font-heading font-bold mb-2">
                📚 Centro de Recursos 📚
              </h1>
              <p className="text-xl font-body">
                Materiais educativos e informativos para famílias, professores e profissionais
              </p>
            </div>

            {/* Category Filter */}
            <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-body font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category.emoji} {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Resources Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  onClick={() => handleResourceClick(resource)}
                  className="bg-white rounded-3xl p-6 shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">{resource.emoji}</div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-body">
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-gray-800 mb-2 text-center">
                    {resource.title}
                  </h3>

                  <p className="text-gray-600 font-body text-sm mb-4 text-center">
                    {resource.description}
                  </p>

                  <div className="space-y-2 text-xs mb-4">
                    <div className="flex justify-between">
                      <span className="font-body font-medium text-gray-700">👥 Para:</span>
                      <span className="font-body text-gray-600">{resource.ageGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-body font-medium text-gray-700">📂 Categoria:</span>
                      <span className="font-body text-gray-600">{resource.category}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-body"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-center">
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-body font-medium hover:from-purple-600 hover:to-pink-600 transition-all text-sm">
                      📖 Ver Recurso
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Help Section */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-heading font-bold text-gray-800 mb-4 text-center">
                💡 Como usar os recursos
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-heading font-bold text-gray-800 mb-2">Encontre o que Precisa</h4>
                  <p className="font-body text-gray-600">Use os filtros para encontrar recursos específicos para sua situação.</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📱</div>
                  <h4 className="font-heading font-bold text-gray-800 mb-2">Baixe e Compartilhe</h4>
                  <p className="font-body text-gray-600">Muitos recursos podem ser baixados e compartilhados com outras famílias.</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🤝</div>
                  <h4 className="font-heading font-bold text-gray-800 mb-2">Aplique na Prática</h4>
                  <p className="font-body text-gray-600">Use as dicas e guias no dia a dia para promover inclusão e compreensão.</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Resource Detail View
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{selectedResource.emoji}</div>
              <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
                {selectedResource.title}
              </h2>
              <p className="text-lg text-gray-600 font-body mb-6">
                {selectedResource.description}
              </p>
              
              <div className="flex justify-center items-center gap-4 mb-6">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-body">
                  {selectedResource.type.charAt(0).toUpperCase() + selectedResource.type.slice(1)}
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-body">
                  {selectedResource.ageGroup}
                </span>
                {selectedResource.downloadable && (
                  <button
                    onClick={() => downloadResource(selectedResource)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-body hover:bg-purple-600 transition-all"
                  >
                    📥 Baixar
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-8">
              {selectedResource.content.map((section) => (
                <div key={section.id} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-heading font-bold text-gray-800 mb-4">
                    {section.title}
                  </h3>
                  
                  {section.type === 'text' && (
                    <p className="font-body text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  )}
                  
                  {(section.type === 'list' || section.type === 'checklist') && (
                    <ul className={`space-y-2 font-body text-gray-700 ${
                      section.type === 'checklist' ? 'list-none' : 'list-disc list-inside'
                    }`}>
                      {Array.isArray(section.content) && section.content.map((item, index) => (
                        <li key={index} className="flex items-start">
                          {section.type === 'checklist' && (
                            <span className="text-green-500 mr-2 mt-1">✓</span>
                          )}
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {section.type === 'tip' && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                      <p className="font-body text-gray-700 leading-relaxed">
                        💡 {section.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {selectedResource.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-body"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceCenter;