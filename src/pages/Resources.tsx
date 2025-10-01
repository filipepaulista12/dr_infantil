import { useState } from 'react';
import {
  BookOpen,
  Heart,
  Phone,
  FileText,
  Users,
  Building2,
  GraduationCap,
  ExternalLink,
  Search,
  Download
} from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  category: 'organizacao' | 'artigo' | 'guia' | 'hospital' | 'educacao' | 'apoio';
  icon: string;
  link?: string;
  phone?: string;
  downloadable?: boolean;
}

const resources: Resource[] = [
  {
    id: 1,
    title: 'Instituto Brasileiro de Doenças Raras (IBDR)',
    description:
      'Organização dedicada a promover informação, apoio e defesa de direitos para pessoas com doenças raras e suas famílias.',
    category: 'organizacao',
    icon: '🏥',
    link: 'https://www.doencarara.org.br',
    phone: '(11) 3456-7890'
  },
  {
    id: 2,
    title: 'Guia Completo sobre Síndrome de Down',
    description:
      'Material educativo completo com informações sobre desenvolvimento, cuidados, educação e inclusão para crianças com Síndrome de Down.',
    category: 'guia',
    icon: '📚',
    downloadable: true
  },
  {
    id: 3,
    title: 'Centro de Referência em Autismo',
    description:
      'Hospital especializado em diagnóstico e tratamento multidisciplinar para crianças no espectro autista.',
    category: 'hospital',
    icon: '🏥',
    link: 'https://www.autismo.org.br',
    phone: '(11) 2345-6789'
  },
  {
    id: 4,
    title: 'Direitos das Pessoas com Deficiência',
    description:
      'Artigo completo sobre a legislação brasileira, direitos garantidos e como acessar benefícios e serviços públicos.',
    category: 'artigo',
    icon: '⚖️',
    downloadable: true
  },
  {
    id: 5,
    title: 'Programa de Inclusão Escolar',
    description:
      'Recursos e estratégias para professores e escolas implementarem práticas inclusivas efetivas na educação.',
    category: 'educacao',
    icon: '🎓',
    downloadable: true
  },
  {
    id: 6,
    title: 'Grupo de Apoio para Pais e Cuidadores',
    description:
      'Encontros mensais (presenciais e online) para compartilhar experiências, desafios e conquistas com outras famílias.',
    category: 'apoio',
    icon: '🤝',
    link: 'https://www.grupodeapoio.org.br'
  },
  {
    id: 7,
    title: 'Hospital Infantil Especializado',
    description:
      'Centro médico com equipe multidisciplinar especializada em doenças raras pediátricas, oferecendo diagnóstico e tratamento.',
    category: 'hospital',
    icon: '🏥',
    phone: '(11) 3456-1234',
    link: 'https://www.hospitalinfantil.org.br'
  },
  {
    id: 8,
    title: 'Cartilha de Primeiros Cuidados',
    description:
      'Guia prático para pais que acabaram de receber o diagnóstico de doença rara, com orientações iniciais e suporte emocional.',
    category: 'guia',
    icon: '📖',
    downloadable: true
  },
  {
    id: 9,
    title: 'Associação de Fibrose Cística',
    description:
      'Organização que oferece suporte, informação e defesa de direitos para pacientes com fibrose cística e suas famílias.',
    category: 'organizacao',
    icon: '💙',
    link: 'https://www.fibrosecistica.org.br',
    phone: '(11) 4567-8901'
  },
  {
    id: 10,
    title: 'Tecnologias Assistivas na Educação',
    description:
      'Artigo sobre ferramentas e tecnologias que auxiliam no processo de aprendizagem de crianças com necessidades especiais.',
    category: 'artigo',
    icon: '💻',
    downloadable: true
  },
  {
    id: 11,
    title: 'Rede Nacional de Terapias Especializadas',
    description:
      'Diretório de profissionais especializados em terapias (fono, fisio, TO) para crianças com doenças raras.',
    category: 'apoio',
    icon: '👨‍⚕️',
    link: 'https://www.redeterapias.org.br'
  },
  {
    id: 12,
    title: 'Curso de Capacitação para Educadores',
    description:
      'Programa de formação continuada para professores sobre práticas inclusivas e adaptações curriculares.',
    category: 'educacao',
    icon: '🎓',
    link: 'https://www.cursoeducadores.org.br'
  }
];

const categories = [
  { id: 'todas', name: 'Todas', icon: BookOpen, color: 'gray' },
  { id: 'organizacao', name: 'Organizações', icon: Users, color: 'blue' },
  { id: 'hospital', name: 'Hospitais', icon: Building2, color: 'red' },
  { id: 'guia', name: 'Guias', icon: FileText, color: 'green' },
  { id: 'artigo', name: 'Artigos', icon: BookOpen, color: 'yellow' },
  { id: 'educacao', name: 'Educação', icon: GraduationCap, color: 'purple' },
  { id: 'apoio', name: 'Apoio', icon: Heart, color: 'pink' }
];

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = resources.filter(resource => {
    const matchesCategory =
      selectedCategory === 'todas' || resource.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      organizacao: 'bg-blue-100 text-blue-700 border-blue-300',
      hospital: 'bg-red-100 text-red-700 border-red-300',
      guia: 'bg-green-100 text-green-700 border-green-300',
      artigo: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      educacao: 'bg-purple-100 text-purple-700 border-purple-300',
      apoio: 'bg-pink-100 text-pink-700 border-pink-300'
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      organizacao: 'Organização',
      hospital: 'Hospital',
      guia: 'Guia',
      artigo: 'Artigo',
      educacao: 'Educação',
      apoio: 'Apoio'
    };
    return names[category] || category;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <BookOpen className="text-purple-600" size={40} />
              🔍 Centro de Recursos 🔍
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Materiais, organizações e informações úteis para famílias e profissionais
            </p>
            <p className="text-lg text-purple-600 font-medium">
              Conhecimento é poder! Encontre o suporte que você precisa 💪
            </p>
          </div>

          {/* Busca */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar recursos..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
              />
            </div>
          </div>

          {/* Filtros de Categoria */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Filtrar por categoria:</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Icon size={18} />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resultado da Busca */}
          <div className="mb-4 text-gray-600">
            <p>
              Mostrando <strong>{filteredResources.length}</strong> recursos
            </p>
          </div>

          {/* Lista de Recursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {filteredResources.map(resource => (
              <div
                key={resource.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{resource.icon}</div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getCategoryColor(
                      resource.category
                    )}`}
                  >
                    {getCategoryName(resource.category)}
                  </span>
                </div>

                {/* Conteúdo */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

                {/* Ações */}
                <div className="flex flex-wrap gap-2">
                  {resource.link && (
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm"
                    >
                      <ExternalLink size={16} />
                      Visitar Site
                    </a>
                  )}
                  {resource.phone && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm">
                      <Phone size={16} />
                      {resource.phone}
                    </button>
                  )}
                  {resource.downloadable && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors text-sm">
                      <Download size={16} />
                      Baixar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contato de Emergência */}
          <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl p-8 mb-8 border-l-4 border-red-500">
            <div className="flex items-center gap-4 mb-4">
              <Phone className="text-red-600" size={40} />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Contatos de Emergência</h3>
                <p className="text-gray-600">Em caso de urgência, procure atendimento imediato</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="font-bold text-gray-800 mb-1">SAMU</p>
                <p className="text-2xl font-bold text-red-600">192</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-bold text-gray-800 mb-1">Bombeiros</p>
                <p className="text-2xl font-bold text-red-600">193</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-bold text-gray-800 mb-1">CVV (Apoio Emocional)</p>
                <p className="text-2xl font-bold text-blue-600">188</p>
              </div>
            </div>
          </div>

          {/* Informação Adicional */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 text-center">
            <Heart className="text-pink-500 mx-auto mb-4" size={40} />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Precisando de Mais Ajuda? 🤗</h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
              Se você não encontrou o recurso que procurava, entre em contato conosco! Estamos aqui
              para ajudar você a encontrar o suporte necessário. Nenhuma dúvida é pequena demais, e
              nenhum desafio é grande demais quando enfrentamos juntos! 💪
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-8 rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Fale Conosco
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
