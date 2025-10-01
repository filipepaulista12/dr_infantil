import React, { useState } from 'react';import React, { useState, useMemo } from 'react';import React from 'react';import React from 'react';import React from 'react';import React, { useState } from 'react';import React, { useState, useMemo } from 'react';

import { Search, Star, Users, ArrowLeft, BookOpen } from 'lucide-react';

import { useAppStore } from '../stores/useAppStore';import { Search, Filter, Star, Users, ArrowLeft, BookOpen } from 'lucide-react';



const DiseaseLibrary: React.FC = () => {import { useAppStore } from '../stores/useAppStore';import { ArrowLeft } from 'lucide-react';

  const { setCurrentPage } = useAppStore();

  const [searchTerm, setSearchTerm] = useState('');



  const diseases = [interface Disease {import { useAppStore } from '../stores/useAppStore';import { ArrowLeft, Search, Star, Users } from 'lucide-react';

    {

      id: 1,  id: number;

      name: 'Gripe',

      description: 'Doença viral comum que afeta o sistema respiratório.',  name: string;

      category: 'Respiratórias',

      ageGroup: '0-12 anos',  description: string;

      difficulty: 'Básico',

      rating: 4.5,  category: string;const DiseaseLibrary: React.FC = () => {import { useAppStore } from '../stores/useAppStore';import { ArrowLeft } from 'lucide-react';

      emoji: '🤒'

    },  ageGroup: string;

    {

      id: 2,  difficulty: 'easy' | 'medium' | 'hard';  const { setCurrentPage } = useAppStore();

      name: 'Resfriado',

      description: 'Infecção viral leve das vias respiratórias superiores.',  rating: number;

      category: 'Respiratórias',

      ageGroup: '0-12 anos',  emoji: string;

      difficulty: 'Básico',

      rating: 4.3,  symptoms: string[];

      emoji: '🤧'

    },  prevention: string[];  return (

    {

      id: 3,}

      name: 'Dor de Cabeça',

      description: 'Sensação de dor ou desconforto na região da cabeça.',    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">const DiseaseLibrary: React.FC = () => {import { useAppStore } from '../stores/useAppStore';import { Search, Filter, Star, Users, ArrowLeft } from 'lucide-react';import { Search, Filter, Clock, Users, ChevronRight, Star } from 'lucide-react';

      category: 'Neurológicas',

      ageGroup: '3-12 anos',const DiseaseLibrary: React.FC = () => {

      difficulty: 'Médio',

      rating: 4.1,  const { setCurrentPage, setSelectedDisease } = useAppStore();      <div className="max-w-6xl mx-auto">

      emoji: '🤕'

    },  const [searchTerm, setSearchTerm] = useState('');

    {

      id: 4,  const [selectedCategory, setSelectedCategory] = useState('all');        <button  const { setCurrentPage } = useAppStore();

      name: 'Dor de Barriga',

      description: 'Desconforto abdominal causado por diversos fatores.',  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');

      category: 'Digestivas',

      ageGroup: '2-12 anos',  const [selectedDifficulty, setSelectedDifficulty] = useState('all');          onClick={() => setCurrentPage('home')}

      difficulty: 'Básico',

      rating: 4.2,  const [showFilters, setShowFilters] = useState(false);

      emoji: '🤢'

    }          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6"

  ];

  const diseases: Disease[] = [

  const filteredDiseases = diseases.filter(disease =>

    disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||    {        >

    disease.description.toLowerCase().includes(searchTerm.toLowerCase())

  );      id: 1,



  const getDifficultyColor = (difficulty: string) => {      name: 'Gripe',          <ArrowLeft className="w-5 h-5" />  const diseases = [

    switch (difficulty) {

      case 'Básico': return 'bg-green-100 text-green-800';      description: 'Doença viral comum que afeta o sistema respiratório, causando febre, dor no corpo e cansaço.',

      case 'Médio': return 'bg-yellow-100 text-yellow-800';

      case 'Avançado': return 'bg-red-100 text-red-800';      category: 'Respiratórias',          Voltar

      default: return 'bg-gray-100 text-gray-800';

    }      ageGroup: '0-12 anos',

  };

      difficulty: 'easy',        </button>    {const DiseaseLibrary: React.FC = () => {import { useAppStore } from '../stores/useAppStore';import { useAppStore } from '../stores/useAppStore';

  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">      rating: 4.5,

      <div className="bg-white shadow-sm border-b">

        <div className="max-w-6xl mx-auto px-4 py-6">      emoji: '🤒',        

          <div className="flex items-center gap-4 mb-6">

            <button      symptoms: ['Febre', 'Dor de cabeça', 'Dor no corpo', 'Cansaço', 'Tosse'],

              onClick={() => setCurrentPage('home')}

              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"      prevention: ['Lavar as mãos regularmente', 'Evitar contato com pessoas doentes', 'Tomar a vacina da gripe']        <div className="bg-white rounded-2xl p-8 shadow-sm">      id: 1,

            >

              <ArrowLeft className="w-5 h-5" />    },

              <span className="font-medium">Voltar</span>

            </button>    {          <h1 className="text-3xl font-bold text-gray-800 mb-4">

            <div>

              <h1 className="text-3xl font-bold text-gray-800">Biblioteca de Doenças</h1>      id: 2,

              <p className="text-gray-600 mt-1">Aprenda sobre diferentes condições de saúde</p>

            </div>      name: 'Resfriado',            📚 Biblioteca de Doenças      name: 'Gripe',  const { setCurrentPage } = useAppStore();

          </div>

      description: 'Infecção viral leve das vias respiratórias superiores, muito comum em crianças.',

          <div className="relative">

            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />      category: 'Respiratórias',          </h1>

            <input

              type="text"      ageGroup: '0-12 anos',

              placeholder="Pesquisar doenças..."

              value={searchTerm}      difficulty: 'easy',          <p className="text-gray-600 mb-6">      description: 'Doença viral comum que afeta o sistema respiratório',

              onChange={(e) => setSearchTerm(e.target.value)}

              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"      rating: 4.3,

            />

          </div>      emoji: '🤧',            Aprenda sobre diferentes condições de saúde de forma educativa e adequada para crianças.

        </div>

      </div>      symptoms: ['Nariz entupido', 'Espirros', 'Tosse leve', 'Dor de garganta'],



      <div className="max-w-6xl mx-auto px-4 py-8">      prevention: ['Lavar as mãos', 'Evitar ambientes fechados', 'Não compartilhar objetos pessoais']          </p>      category: 'Respiratórias',import { mockData } from '../data/mockData';import { mockData } from '../data/mockData';

        <div className="mb-6">

          <p className="text-gray-600">    },

            {filteredDiseases.length === 1 ? '1 doença encontrada' : `${filteredDiseases.length} doenças encontradas`}

          </p>    {          

        </div>

      id: 3,

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredDiseases.map((disease) => (      name: 'Dor de Cabeça',          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">      ageGroup: '0-12 anos',

            <div

              key={disease.id}      description: 'Sensação de dor ou desconforto na região da cabeça, pode ter várias causas.',

              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-purple-200 cursor-pointer group"

            >      category: 'Neurológicas',            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-100">

              <div className="flex items-start justify-between mb-4">

                <div className="text-4xl">{disease.emoji}</div>      ageGroup: '3-12 anos',

                <div className="flex items-center gap-1 text-yellow-500">

                  <Star className="w-4 h-4 fill-current" />      difficulty: 'medium',              <div className="text-4xl mb-3">🤒</div>      difficulty: 'Fácil',  return (

                  <span className="text-sm font-medium text-gray-700">{disease.rating}</span>

                </div>      rating: 4.1,

              </div>

      emoji: '🤕',              <h3 className="text-lg font-semibold text-gray-800 mb-2">Gripe</h3>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">

                {disease.name}      symptoms: ['Dor na cabeça', 'Sensibilidade à luz', 'Enjoo'],

              </h3>

      prevention: ['Dormir bem', 'Beber água', 'Evitar estresse', 'Comer regularmente']              <p className="text-sm text-gray-600">Doença viral comum que afeta o sistema respiratório.</p>      rating: 4.5,

              <p className="text-gray-600 text-sm mb-4">

                {disease.description}    },

              </p>

    {            </div>

              <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-2">      id: 4,

                  <Users className="w-4 h-4 text-gray-400" />

                  <span className="text-sm text-gray-600">{disease.ageGroup}</span>      name: 'Dor de Barriga',                  emoji: '🤒'    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">

                </div>

                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(disease.difficulty)}`}>      description: 'Desconforto abdominal que pode ser causado por diversos fatores como alimentação ou nervosismo.',

                  {disease.difficulty}

                </span>      category: 'Digestivas',            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">

              </div>

      ageGroup: '2-12 anos',

              <div className="flex items-center justify-between">

                <span className="text-xs text-gray-500 uppercase tracking-wider">      difficulty: 'easy',              <div className="text-4xl mb-3">🤧</div>    },

                  {disease.category}

                </span>      rating: 4.2,

                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1">

                  <BookOpen className="w-4 h-4" />      emoji: '🤢',              <h3 className="text-lg font-semibold text-gray-800 mb-2">Resfriado</h3>

                  Saber mais

                </button>      symptoms: ['Dor no abdômen', 'Enjoo', 'Gases', 'Falta de apetite'],

              </div>

            </div>      prevention: ['Comer devagar', 'Mastigar bem', 'Evitar alimentos pesados', 'Beber água']              <p className="text-sm text-gray-600">Infecção viral leve das vias respiratórias superiores.</p>    {      <div className="max-w-6xl mx-auto">

          ))}

        </div>    },



        {filteredDiseases.length === 0 && (    {            </div>

          <div className="text-center py-12">

            <div className="text-6xl mb-4">🔍</div>      id: 5,

            <h3 className="text-xl font-semibold text-gray-700 mb-2">

              Nenhuma doença encontrada      name: 'Alergia na Pele',                  id: 2,

            </h3>

            <p className="text-gray-500 mb-6">      description: 'Reação alérgica que causa vermelhidão, coceira e manchas na pele.',

              Tente ajustar o termo de pesquisa

            </p>      category: 'Cutâneas',            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">

            <button

              onClick={() => setSearchTerm('')}      ageGroup: '0-12 anos',

              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"

            >      difficulty: 'medium',              <div className="text-4xl mb-3">🤕</div>      name: 'Resfriado',        <buttonconst DiseaseLibrary: React.FC = () => {const DiseaseLibrary: React.FC = () => {

              Limpar pesquisa

            </button>      rating: 4.0,

          </div>

        )}      emoji: '🔴',              <h3 className="text-lg font-semibold text-gray-800 mb-2">Dor de Cabeça</h3>

      </div>

    </div>      symptoms: ['Vermelhidão', 'Coceira', 'Manchas na pele', 'Inchaço'],

  );

};      prevention: ['Evitar alérgenos conhecidos', 'Usar produtos hipoalergênicos', 'Manter a pele hidratada']              <p className="text-sm text-gray-600">Sensação de dor ou desconforto na região da cabeça.</p>      description: 'Infecção viral leve das vias respiratórias superiores',



export default DiseaseLibrary;    },

    {            </div>

      id: 6,

      name: 'Febre',          </div>      category: 'Respiratórias',          onClick={() => setCurrentPage('home')}

      description: 'Aumento da temperatura corporal, geralmente indicando que o corpo está combatendo uma infecção.',

      category: 'Sintomas Gerais',        </div>

      ageGroup: '0-12 anos',

      difficulty: 'medium',      </div>      ageGroup: '0-12 anos',

      rating: 4.4,

      emoji: '🌡️',    </div>

      symptoms: ['Temperatura alta', 'Calafrios', 'Suor', 'Fraqueza'],

      prevention: ['Manter higiene', 'Evitar contato com doentes', 'Vacinação em dia']  );      difficulty: 'Fácil',          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6"  const { setCurrentPage } = useAppStore();  const { setSelectedDisease } = useAppStore();

    }

  ];};



  const categories = ['all', 'Respiratórias', 'Digestivas', 'Cutâneas', 'Neurológicas', 'Sintomas Gerais'];      rating: 4.3,

  const ageGroups = ['all', '0-12 anos', '2-12 anos', '3-12 anos'];

  const difficulties = ['all', 'easy', 'medium', 'hard'];export default DiseaseLibrary;

      emoji: '🤧'        >

  const filteredDiseases = useMemo(() => {

    return diseases.filter(disease => {    },

      const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||

                           disease.description.toLowerCase().includes(searchTerm.toLowerCase());    {          <ArrowLeft className="w-5 h-5" />  const [searchTerm, setSearchTerm] = useState('');  const [searchTerm, setSearchTerm] = useState('');

      const matchesCategory = selectedCategory === 'all' || disease.category === selectedCategory;

      const matchesAge = selectedAgeGroup === 'all' || disease.ageGroup === selectedAgeGroup;      id: 3,

      const matchesDifficulty = selectedDifficulty === 'all' || disease.difficulty === selectedDifficulty;

      name: 'Dor de Cabeça',          Voltar

      return matchesSearch && matchesCategory && matchesAge && matchesDifficulty;

    });      description: 'Sensação de dor ou desconforto na região da cabeça',

  }, [searchTerm, selectedCategory, selectedAgeGroup, selectedDifficulty]);

      category: 'Neurológicas',        </button>  const [selectedCategory, setSelectedCategory] = useState('all');  const [showFilters, setShowFilters] = useState(false);

  const getDifficultyColor = (difficulty: string) => {

    switch (difficulty) {      ageGroup: '3-12 anos',

      case 'easy': return 'bg-green-100 text-green-800 border-green-200';

      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';      difficulty: 'Médio',        

      case 'hard': return 'bg-red-100 text-red-800 border-red-200';

      default: return 'bg-gray-100 text-gray-800 border-gray-200';      rating: 4.1,

    }

  };      emoji: '🤕'        <div className="bg-white rounded-2xl p-8 shadow-sm">  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');  const [selectedCategory, setSelectedCategory] = useState('all');



  const getDifficultyLabel = (difficulty: string) => {    }

    switch (difficulty) {

      case 'easy': return 'Básico';  ];          <h1 className="text-3xl font-bold text-gray-800 mb-4">

      case 'medium': return 'Médio';

      case 'hard': return 'Avançado';

      default: return difficulty;

    }  const getDifficultyColor = (difficulty: string) => {            📚 Biblioteca de Doenças  const [selectedDifficulty, setSelectedDifficulty] = useState('all');  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');

  };

    switch (difficulty) {

  const handleDiseaseClick = (disease: Disease) => {

    setSelectedDisease(disease.id);      case 'Fácil': return 'bg-green-100 text-green-800';          </h1>

    setCurrentPage('disease-detail');

  };      case 'Médio': return 'bg-yellow-100 text-yellow-800';



  return (      case 'Difícil': return 'bg-red-100 text-red-800';          <p className="text-gray-600 mb-6">  const [showFilters, setShowFilters] = useState(false);  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">

      {/* Header */}      default: return 'bg-gray-100 text-gray-800';

      <div className="bg-white shadow-sm border-b">

        <div className="max-w-6xl mx-auto px-4 py-6">    }            Aqui você pode aprender sobre diferentes condições de saúde de forma educativa e adequada para crianças.

          <div className="flex items-center gap-4 mb-6">

            <button  };

              onClick={() => setCurrentPage('home')}

              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"          </p>

            >

              <ArrowLeft className="w-5 h-5" />  return (

              <span className="font-medium">Voltar</span>

            </button>    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">          

            <div>

              <h1 className="text-3xl font-bold text-gray-800">Biblioteca de Doenças</h1>      <div className="max-w-6xl mx-auto">

              <p className="text-gray-600 mt-1">Aprenda sobre diferentes condições de saúde</p>

            </div>        <button          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  const categories = ['all', 'respiratórias', 'digestivas', 'cutâneas', 'virais', 'bacterianas'];  const categories = ['all', 'respiratórias', 'neurológicas', 'cardiovasculares', 'endócrinas', 'genéticas', 'raras'];

          </div>

          onClick={() => setCurrentPage('home')}

          {/* Search */}

          <div className="relative mb-4">          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6"            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-100">

            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

            <input        >

              type="text"

              placeholder="Pesquisar doenças..."          <ArrowLeft className="w-5 h-5" />              <div className="text-4xl mb-3">🤒</div>  const ageGroups = ['all', '0-2 anos', '3-5 anos', '6-12 anos', '13+ anos'];  const ageGroups = ['all', '0-2', '3-5', '6-8', '9-12', '13-15', '16+'];

              value={searchTerm}

              onChange={(e) => setSearchTerm(e.target.value)}          Voltar

              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"

            />        </button>              <h3 className="text-lg font-semibold text-gray-800 mb-2">Gripe</h3>

          </div>

        

          <div className="flex items-center gap-4">

            <button        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">              <p className="text-sm text-gray-600">Doença viral comum que afeta o sistema respiratório.</p>  const difficulties = ['all', 'easy', 'medium', 'hard'];

              onClick={() => setShowFilters(!showFilters)}

              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"          <h1 className="text-3xl font-bold text-gray-800 mb-4">

            >

              <Filter className="w-4 h-4" />            📚 Biblioteca de Doenças            </div>

              Filtros

            </button>          </h1>

            

            {(selectedCategory !== 'all' || selectedAgeGroup !== 'all' || selectedDifficulty !== 'all') && (          <p className="text-gray-600 mb-6">              // Filter diseases based on search and filters

              <button

                onClick={() => {            Aprenda sobre diferentes condições de saúde de forma educativa e adequada para crianças.

                  setSelectedCategory('all');

                  setSelectedAgeGroup('all');          </p>            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">

                  setSelectedDifficulty('all');

                }}          

                className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"

              >          <div className="relative mb-6">              <div className="text-4xl mb-3">🤧</div>  const filteredDiseases = mockData.diseases.filter(disease => {  const filteredDiseases = useMemo(() => {

                Limpar filtros

              </button>            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

            )}

          </div>            <input              <h3 className="text-lg font-semibold text-gray-800 mb-2">Resfriado</h3>



          {/* Filter Options */}              type="text"

          {showFilters && (

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl mt-4">              placeholder="Pesquisar doenças..."              <p className="text-sm text-gray-600">Infecção viral leve das vias respiratórias superiores.</p>    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||    let filtered = mockData.diseases;

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"

                <select

                  value={selectedCategory}            />            </div>

                  onChange={(e) => setSelectedCategory(e.target.value)}

                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"          </div>

                >

                  {categories.map(category => (        </div>                                     disease.description.toLowerCase().includes(searchTerm.toLowerCase());

                    <option key={category} value={category}>

                      {category === 'all' ? 'Todas as categorias' : category}

                    </option>

                  ))}        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">

                </select>

              </div>          {diseases.map((disease) => (



              <div>            <div              <div className="text-4xl mb-3">🤕</div>    const matchesCategory = selectedCategory === 'all' || disease.category === selectedCategory;    // Search filter

                <label className="block text-sm font-medium text-gray-700 mb-2">Faixa Etária</label>

                <select              key={disease.id}

                  value={selectedAgeGroup}

                  onChange={(e) => setSelectedAgeGroup(e.target.value)}              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-purple-200 cursor-pointer group"              <h3 className="text-lg font-semibold text-gray-800 mb-2">Dor de Cabeça</h3>

                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"

                >            >

                  {ageGroups.map(age => (

                    <option key={age} value={age}>              <div className="flex items-start justify-between mb-4">              <p className="text-sm text-gray-600">Sensação de dor ou desconforto na região da cabeça.</p>    const matchesAge = selectedAgeGroup === 'all' || disease.ageGroup === selectedAgeGroup;    if (searchTerm) {

                      {age === 'all' ? 'Todas as idades' : age}

                    </option>                <div className="text-4xl">{disease.emoji}</div>

                  ))}

                </select>                <div className="flex items-center gap-1 text-yellow-500">            </div>

              </div>

                  <Star className="w-4 h-4 fill-current" />

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">Dificuldade</label>                  <span className="text-sm font-medium text-gray-700">{disease.rating}</span>          </div>    const matchesDifficulty = selectedDifficulty === 'all' || disease.difficulty === selectedDifficulty;      filtered = filtered.filter(disease => 

                <select

                  value={selectedDifficulty}                </div>

                  onChange={(e) => setSelectedDifficulty(e.target.value)}

                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"              </div>        </div>

                >

                  {difficulties.map(difficulty => (

                    <option key={difficulty} value={difficulty}>

                      {difficulty === 'all' ? 'Todas as dificuldades' : getDifficultyLabel(difficulty)}              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">      </div>        disease.title.toLowerCase().includes(searchTerm.toLowerCase()) ||

                    </option>

                  ))}                {disease.name}

                </select>

              </div>              </h3>    </div>

            </div>

          )}

        </div>

      </div>              <p className="text-gray-600 text-sm mb-4">  );    return matchesSearch && matchesCategory && matchesAge && matchesDifficulty;        disease.description.toLowerCase().includes(searchTerm.toLowerCase()) ||



      {/* Content */}                {disease.description}

      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="mb-6">              </p>};

          <p className="text-gray-600">

            {filteredDiseases.length === 1

              ? '1 doença encontrada'

              : `${filteredDiseases.length} doenças encontradas`              <div className="flex items-center justify-between mb-4">  });        disease.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

            }

          </p>                <div className="flex items-center gap-2">

        </div>

                  <Users className="w-4 h-4 text-gray-400" />export default DiseaseLibrary;

        {/* Disease Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">                  <span className="text-sm text-gray-600">{disease.ageGroup}</span>      );

          {filteredDiseases.map((disease) => (

            <div                </div>

              key={disease.id}

              onClick={() => handleDiseaseClick(disease)}                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(disease.difficulty)}`}>  const getDifficultyColor = (difficulty: string) => {    }

              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-purple-200 cursor-pointer group"

            >                  {disease.difficulty}

              <div className="flex items-start justify-between mb-4">

                <div className="text-4xl">{disease.emoji}</div>                </span>    switch (difficulty) {

                <div className="flex items-center gap-1 text-yellow-500">

                  <Star className="w-4 h-4 fill-current" />              </div>

                  <span className="text-sm font-medium text-gray-700">{disease.rating}</span>

                </div>      case 'easy': return 'bg-green-100 text-green-800 border-green-200';    // Category filter

              </div>

              <div className="border-t border-gray-100 pt-4">

              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">

                {disease.name}                <span className="text-xs text-gray-500 uppercase tracking-wider">      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';    if (selectedCategory !== 'all') {

              </h3>

                  {disease.category}

              <p className="text-gray-600 text-sm mb-4">

                {disease.description}                </span>      case 'hard': return 'bg-red-100 text-red-800 border-red-200';      filtered = filtered.filter(disease => disease.category === selectedCategory);

              </p>

              </div>

              <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-2">            </div>      default: return 'bg-gray-100 text-gray-800 border-gray-200';    }

                  <Users className="w-4 h-4 text-gray-400" />

                  <span className="text-sm text-gray-600">{disease.ageGroup}</span>          ))}

                </div>

                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(disease.difficulty)}`}>        </div>    }

                  {getDifficultyLabel(disease.difficulty)}

                </span>      </div>

              </div>

    </div>  };    // Age group filter

              <div className="flex items-center justify-between">

                <span className="text-xs text-gray-500 uppercase tracking-wider">  );

                  {disease.category}

                </span>};    if (selectedAgeGroup !== 'all') {

                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1">

                  <BookOpen className="w-4 h-4" />

                  Saber mais

                </button>export default DiseaseLibrary;  const getDifficultyLabel = (difficulty: string) => {      filtered = filtered.filter(disease => disease.ageGroup.includes(selectedAgeGroup as any));

              </div>

            </div>    switch (difficulty) {    }

          ))}

        </div>      case 'easy': return 'Básico';



        {/* No Results */}      case 'medium': return 'Médio';    // Difficulty filter

        {filteredDiseases.length === 0 && (

          <div className="text-center py-12">      case 'hard': return 'Avançado';    if (selectedDifficulty !== 'all') {

            <div className="text-6xl mb-4">🔍</div>

            <h3 className="text-xl font-semibold text-gray-700 mb-2">      default: return difficulty;      filtered = filtered.filter(disease => disease.difficulty === selectedDifficulty);

              Nenhuma doença encontrada

            </h3>    }    }

            <p className="text-gray-500 mb-6">

              Tente ajustar os filtros ou termo de pesquisa  };

            </p>

            <button    return filtered;

              onClick={() => {

                setSearchTerm('');  return (  }, [searchTerm, selectedCategory, selectedAgeGroup, selectedDifficulty]);

                setSelectedCategory('all');

                setSelectedAgeGroup('all');    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">

                setSelectedDifficulty('all');

              }}      {/* Header */}  const handleDiseaseClick = (disease: any) => {

              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"

            >      <div className="bg-white shadow-sm border-b">    setSelectedDisease(disease.id);

              Limpar todos os filtros

            </button>        <div className="max-w-6xl mx-auto px-4 py-6">  };

          </div>

        )}          <div className="flex items-center gap-4 mb-6">

      </div>

    </div>            <button  const getDifficultyColor = (difficulty: string) => {

  );

};              onClick={() => setCurrentPage('home')}    switch (difficulty) {



export default DiseaseLibrary;              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"      case 'easy': return 'bg-green-100 text-green-800 border-green-200';

            >      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';

              <ArrowLeft className="w-5 h-5" />      case 'hard': return 'bg-red-100 text-red-800 border-red-200';

              <span className="font-medium">Voltar</span>      default: return 'bg-gray-100 text-gray-800 border-gray-200';

            </button>    }

            <div>  };

              <h1 className="text-3xl font-bold text-gray-800">Biblioteca de Doenças</h1>

              <p className="text-gray-600 mt-1">Aprenda sobre diferentes condições de saúde</p>  const getDifficultyLabel = (difficulty: string) => {

            </div>    switch (difficulty) {

          </div>      case 'easy': return 'Fácil';

      case 'medium': return 'Médio';

          {/* Search and Filter Controls */}      case 'hard': return 'Avançado';

          <div className="space-y-4">      default: return 'Básico';

            <div className="relative">    }

              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />  };

              <input

                type="text"  const clearFilters = () => {

                placeholder="Pesquisar doenças..."    setSearchTerm('');

                value={searchTerm}    setSelectedCategory('all');

                onChange={(e) => setSearchTerm(e.target.value)}    setSelectedAgeGroup('all');

                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"    setSelectedDifficulty('all');

              />  };

            </div>

  return (

            <div className="flex items-center gap-4">    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">

              <button      <div className="container mx-auto px-4 py-8">

                onClick={() => setShowFilters(!showFilters)}        {/* Header */}

                className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"        <div className="text-center mb-12">

              >          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-4">

                <Filter className="w-4 h-4" />            📚 Biblioteca de Doenças

                Filtros          </h1>

              </button>          <p className="text-xl text-gray-600 max-w-3xl mx-auto">

                          Explore e aprenda sobre doenças raras de forma educativa e acessível

              {(selectedCategory !== 'all' || selectedAgeGroup !== 'all' || selectedDifficulty !== 'all') && (          </p>

                <button        </div>

                  onClick={() => {

                    setSelectedCategory('all');        {/* Search and Filters */}

                    setSelectedAgeGroup('all');        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

                    setSelectedDifficulty('all');          <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">

                  }}            <div className="flex-1 relative">

                  className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />

                >              <input

                  Limpar filtros                type="text"

                </button>                placeholder="Buscar doenças..."

              )}                value={searchTerm}

            </div>                onChange={(e) => setSearchTerm(e.target.value)}

                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"

            {/* Filter Options */}              />

            {showFilters && (            </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">            

                <div>            <button

                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>              onClick={() => setShowFilters(!showFilters)}

                  <select              className="flex items-center gap-2 px-4 py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors"

                    value={selectedCategory}            >

                    onChange={(e) => setSelectedCategory(e.target.value)}              <Filter className="h-5 w-5" />

                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"              Filtros

                  >            </button>

                    {categories.map(category => (          </div>

                      <option key={category} value={category}>

                        {category === 'all' ? 'Todas as categorias' : category}          {/* Filters */}

                      </option>          {showFilters && (

                    ))}            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">

                  </select>              <div>

                </div>                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>

                <select

                <div>                  value={selectedCategory}

                  <label className="block text-sm font-medium text-gray-700 mb-2">Faixa Etária</label>                  onChange={(e) => setSelectedCategory(e.target.value)}

                  <select                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"

                    value={selectedAgeGroup}                >

                    onChange={(e) => setSelectedAgeGroup(e.target.value)}                  <option value="all">Todas as categorias</option>

                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"                  {categories.slice(1).map(cat => (

                  >                    <option key={cat} value={cat} className="capitalize">{cat}</option>

                    {ageGroups.map(age => (                  ))}

                      <option key={age} value={age}>                </select>

                        {age === 'all' ? 'Todas as idades' : age}              </div>

                      </option>              

                    ))}              <div>

                  </select>                <label className="block text-sm font-medium text-gray-700 mb-2">Faixa Etária</label>

                </div>                <select

                  value={selectedAgeGroup}

                <div>                  onChange={(e) => setSelectedAgeGroup(e.target.value)}

                  <label className="block text-sm font-medium text-gray-700 mb-2">Dificuldade</label>                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"

                  <select                >

                    value={selectedDifficulty}                  <option value="all">Todas as idades</option>

                    onChange={(e) => setSelectedDifficulty(e.target.value)}                  {ageGroups.slice(1).map(age => (

                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"                    <option key={age} value={age}>{age} anos</option>

                  >                  ))}

                    {difficulties.map(difficulty => (                </select>

                      <option key={difficulty} value={difficulty}>              </div>

                        {difficulty === 'all' ? 'Todas as dificuldades' : getDifficultyLabel(difficulty)}              

                      </option>              <div>

                    ))}                <label className="block text-sm font-medium text-gray-700 mb-2">Dificuldade</label>

                  </select>                <select

                </div>                  value={selectedDifficulty}

              </div>                  onChange={(e) => setSelectedDifficulty(e.target.value)}

            )}                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"

          </div>                >

        </div>                  <option value="all">Todas as dificuldades</option>

      </div>                  <option value="easy">Fácil</option>

                  <option value="medium">Médio</option>

      {/* Content */}                  <option value="hard">Avançado</option>

      <div className="max-w-6xl mx-auto px-4 py-8">                </select>

        {/* Results Summary */}              </div>

        <div className="mb-6">            </div>

          <p className="text-gray-600">          )}

            {filteredDiseases.length === 1        </div>

              ? '1 doença encontrada'

              : `${filteredDiseases.length} doenças encontradas`        {/* Clear Filters */}

            }        {(searchTerm || selectedCategory !== 'all' || selectedAgeGroup !== 'all' || selectedDifficulty !== 'all') && (

          </p>          <div className="mb-6">

        </div>            <button

              onClick={clearFilters}

        {/* Disease Grid */}              className="text-purple-600 hover:text-purple-700 text-sm font-medium"

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">            >

          {filteredDiseases.map((disease) => (              Limpar todos os filtros

            <div            </button>

              key={disease.id}          </div>

              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-purple-200 cursor-pointer group"        )}

            >

              <div className="flex items-start justify-between mb-4">        {/* Results Count */}

                <div className="text-4xl">{disease.emoji}</div>        <div className="mb-6">

                <div className="flex items-center gap-1 text-yellow-500">          <p className="text-gray-600">

                  <Star className="w-4 h-4 fill-current" />            {filteredDiseases.length} doença{filteredDiseases.length !== 1 ? 's' : ''} encontrada{filteredDiseases.length !== 1 ? 's' : ''}

                  <span className="text-sm font-medium text-gray-700">{disease.rating}</span>          </p>

                </div>        </div>

              </div>

        {/* Disease Cards Grid */}

              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">        {filteredDiseases.length === 0 ? (

                {disease.name}          <div className="text-center py-16">

              </h3>            <div className="text-6xl mb-4">🔍</div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">Nenhuma doença encontrada</h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">            <p className="text-gray-600 mb-6">Tente ajustar os filtros ou termo de busca</p>

                {disease.description}            <button

              </p>              onClick={clearFilters}

              className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"

              <div className="flex items-center justify-between">            >

                <div className="flex items-center gap-2">              Limpar Filtros

                  <Users className="w-4 h-4 text-gray-400" />            </button>

                  <span className="text-sm text-gray-600">{disease.ageGroup}</span>          </div>

                </div>        ) : (

                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(disease.difficulty)}`}>          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                  {getDifficultyLabel(disease.difficulty)}            {filteredDiseases.map((disease) => (

                </span>              <div

              </div>                key={disease.id}

                onClick={() => handleDiseaseClick(disease)}

              <div className="mt-4 pt-4 border-t border-gray-100">                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"

                <span className="text-xs text-gray-500 uppercase tracking-wider">              >

                  {disease.category}                {/* Disease Header */}

                </span>                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">

              </div>                  <div className="flex items-start justify-between mb-4">

            </div>                    <div className="text-4xl">{disease.emoji}</div>

          ))}                    <div className="flex items-center gap-1">

        </div>                      <Star className="h-4 w-4 fill-current" />

                      <span className="text-sm">4.5</span>

        {/* No Results */}                    </div>

        {filteredDiseases.length === 0 && (                  </div>

          <div className="text-center py-12">                  <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-100 transition-colors">

            <div className="text-6xl mb-4">🔍</div>                    {disease.title}

            <h3 className="text-xl font-semibold text-gray-700 mb-2">                  </h3>

              Nenhuma doença encontrada                </div>

            </h3>

            <p className="text-gray-500 mb-6">                {/* Disease Content */}

              Tente ajustar os filtros ou termo de pesquisa                <div className="p-6">

            </p>                  <div className="flex items-center gap-2 mb-4">

            <button                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(disease.difficulty)}`}>

              onClick={() => {                      {getDifficultyLabel(disease.difficulty)}

                setSearchTerm('');                    </span>

                setSelectedCategory('all');                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium capitalize">

                setSelectedAgeGroup('all');                      {disease.category}

                setSelectedDifficulty('all');                    </span>

              }}                  </div>

              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"

            >                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">

              Limpar todos os filtros                    {disease.description}

            </button>                  </p>

          </div>

        )}                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">

      </div>                    <div className="flex items-center gap-1">

    </div>                      <Users className="h-4 w-4" />

  );                      {disease.ageGroup.join(', ')} anos

};                    </div>

                    <div className="flex items-center gap-1">

export default DiseaseLibrary;                      <Clock className="h-4 w-4" />
                      {Math.ceil(disease.description.length / 200)} min
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {disease.tags?.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ChevronRight className="h-5 w-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseLibrary;