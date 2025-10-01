import React from 'react';import React from 'react';import React from 'react';import React from 'react';import React from 'react';import React from 'react';import React from 'react';import type { Disease } from '../types/Disease';

import { ArrowLeft } from 'lucide-react';

import { useAppStore } from '../stores/useAppStore';import { ArrowLeft } from 'lucide-react';



const DiseaseDetail: React.FC = () => {import { useAppStore } from '../stores/useAppStore';import { ArrowLeft, Star, Clock, Users, Heart, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

  const { setCurrentPage } = useAppStore();



  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">const DiseaseDetail: React.FC = () => {import { useAppStore } from '../stores/useAppStore';import { ArrowLeft, Heart, Users, Clock, BookOpen, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

      <div className="max-w-4xl mx-auto">

        <button  const { setCurrentPage } = useAppStore();

          onClick={() => setCurrentPage('diseases')}

          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6"import { mockData } from '../data/mockData';

        >

          <ArrowLeft className="w-5 h-5" />  const handleBack = () => {

          Voltar

        </button>    setCurrentPage('diseases');import { useAppStore } from '../stores/useAppStore';import { ArrowLeft, Heart, Users, Clock, BookOpen, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

        

        <div className="bg-white rounded-2xl p-8 shadow-sm">  };

          <h1 className="text-3xl font-bold text-gray-800 mb-4">

            Detalhes da Doençaconst DiseaseDetail: React.FC = () => {

          </h1>

          <p className="text-gray-600">  return (

            Esta página mostra informações detalhadas sobre a doença selecionada.

          </p>    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">  const { selectedDisease, setSelectedDisease, setCurrentPage } = useAppStore();import { mockData } from '../data/mockData';

        </div>

      </div>      <div className="max-w-4xl mx-auto">

    </div>

  );        <button  const [expandedTips, setExpandedTips] = React.useState<string[]>([]);

};

          onClick={handleBack}

export default DiseaseDetail;
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6"import { useAppStore } from '../stores/useAppStore';import { ArrowLeft, Heart, Users, Clock, BookOpen, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

        >

          <ArrowLeft className="w-5 h-5" />  const disease = mockData.diseases.find(d => d.id === selectedDisease);

          Voltar

        </button>const DiseaseDetail: React.FC = () => {

        

        <div className="bg-white rounded-2xl p-8 shadow-sm">  if (!disease) {

          <h1 className="text-3xl font-bold text-gray-800 mb-4">

            Detalhes da Doença    return (  const { selectedDisease, setSelectedDisease, setCurrentPage } = useAppStore();import { mockData } from '../data/mockData';

          </h1>

          <p className="text-gray-600">      <div className="min-h-screen flex items-center justify-center">

            Esta página mostra informações detalhadas sobre a doença selecionada.

          </p>        <div className="text-center">  const [expandedTips, setExpandedTips] = React.useState<string[]>([]);

        </div>

      </div>          <h2 className="text-2xl font-bold text-gray-700 mb-4">Doença não encontrada</h2>

    </div>

  );          <buttonimport { useAppStore } from '../stores/useAppStore';import { ArrowLeft, Heart, Users, Clock, BookOpen, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';import Card from '../components/common/Card';

};

            onClick={() => setCurrentPage('diseases')}

export default DiseaseDetail;
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"  const disease = mockData.diseases.find(d => d.id === selectedDisease);

          >

            Voltar à Bibliotecaconst DiseaseDetail: React.FC = () => {

          </button>

        </div>  if (!disease) {

      </div>

    );    return (  const { selectedDisease, setSelectedDisease, setCurrentPage } = useAppStore();import { mockData } from '../data/mockData';

  }

      <div className="min-h-screen flex items-center justify-center">

  const handleBack = () => {

    setSelectedDisease(null);        <div className="text-center">  const [expandedTips, setExpandedTips] = React.useState<string[]>([]);

    setCurrentPage('diseases');

  };          <h2 className="text-2xl font-bold text-gray-800 mb-4">Doença não encontrada</h2>



  const toggleTip = (tipId: string) => {          <buttonimport { useAppStore } from '../stores/useAppStore';import Button from '../components/common/Button';

    setExpandedTips(prev =>

      prev.includes(tipId)            onClick={() => setSelectedDisease(null)}

        ? prev.filter(id => id !== tipId)

        : [...prev, tipId]            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"  const disease = mockData.diseases.find(d => d.id === selectedDisease);

    );

  };          >



  const getDifficultyColor = (difficulty: string) => {            Voltar à Bibliotecaconst DiseaseDetail: React.FC = () => {

    switch (difficulty) {

      case 'easy': return 'bg-green-100 text-green-800 border-green-200';          </button>

      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';

      case 'hard': return 'bg-red-100 text-red-800 border-red-200';        </div>  if (!disease) {

      default: return 'bg-gray-100 text-gray-800 border-gray-200';

    }      </div>

  };

    );    return (  const { selectedDisease, setSelectedDisease, setCurrentPage } = useAppStore();import { mockData } from '../data/mockData';

  const getDifficultyLabel = (difficulty: string) => {

    switch (difficulty) {  }

      case 'easy': return 'Básico';

      case 'medium': return 'Médio';      <div className="min-h-screen flex items-center justify-center">

      case 'hard': return 'Avançado';

      default: return difficulty;  const handleBack = () => {

    }

  };    setSelectedDisease(null);        <div className="text-center">  const [expandedTips, setExpandedTips] = React.useState<string[]>([]);



  return (  };

    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">

      {/* Header */}          <h2 className="text-2xl font-bold text-gray-800 mb-4">Doença não encontrada</h2>

      <div className="bg-white shadow-sm border-b">

        <div className="max-w-6xl mx-auto px-4 py-4">  const toggleTip = (tipId: string) => {

          <div className="flex items-center gap-4">

            <button    setExpandedTips(prev =>           <buttoninterface DiseaseDetailProps {

              onClick={handleBack}

              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"      prev.includes(tipId) 

            >

              <ArrowLeft className="w-5 h-5" />        ? prev.filter(id => id !== tipId)            onClick={() => setSelectedDisease(null)}

              <span className="font-medium">Voltar</span>

            </button>        : [...prev, tipId]

            <div className="flex items-center gap-3">

              <div className="text-4xl">{disease.emoji}</div>    );            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"  const disease = mockData.diseases.find(d => d.id === selectedDisease);

              <div>

                <h1 className="text-2xl font-bold text-gray-800">{disease.name}</h1>  };

                <div className="flex items-center gap-4 mt-1">

                  <div className="flex items-center gap-1">          >

                    <Star className="w-4 h-4 text-yellow-500 fill-current" />

                    <span className="text-sm font-medium">{disease.rating}</span>  const getDifficultyColor = (difficulty: string) => {

                  </div>

                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(disease.difficulty)}`}>    switch (difficulty) {            Voltar à Bibliotecaconst DiseaseDetail: React.FC = () => {  disease: Disease;

                    {getDifficultyLabel(disease.difficulty)}

                  </span>      case 'easy': return 'bg-green-100 text-green-800 border-green-200';

                  <div className="flex items-center gap-1 text-gray-600">

                    <Users className="w-4 h-4" />      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';          </button>

                    <span className="text-sm">{disease.ageGroup}</span>

                  </div>      case 'hard': return 'bg-red-100 text-red-800 border-red-200';

                </div>

              </div>      default: return 'bg-gray-100 text-gray-800 border-gray-200';        </div>  if (!disease) {

            </div>

          </div>    }

        </div>

      </div>  };      </div>



      {/* Content */}

      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">  const getDifficultyLabel = (difficulty: string) => {    );    return (  const { selectedDisease, setSelectedDisease, setCurrentPage } = useAppStore();  onBack: () => void;

          {/* Main Content */}

          <div className="lg:col-span-2 space-y-6">    switch (difficulty) {

            {/* Description */}

            <div className="bg-white rounded-2xl p-6 shadow-sm">      case 'easy': return 'Fácil';  }

              <div className="flex items-center gap-2 mb-4">

                <BookOpen className="w-5 h-5 text-purple-600" />      case 'medium': return 'Médio';

                <h2 className="text-xl font-semibold text-gray-800">O que é?</h2>

              </div>      case 'hard': return 'Avançado';      <div className="min-h-screen flex items-center justify-center">

              <p className="text-gray-700 leading-relaxed">{disease.description}</p>

            </div>      default: return 'Básico';



            {/* Symptoms */}    }  const handleBack = () => {

            <div className="bg-white rounded-2xl p-6 shadow-sm">

              <div className="flex items-center gap-2 mb-4">  };

                <AlertCircle className="w-5 h-5 text-orange-600" />

                <h2 className="text-xl font-semibold text-gray-800">Sintomas</h2>    setSelectedDisease(null);        <div className="text-center">  const [expandedTips, setExpandedTips] = React.useState<string[]>([]);}

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">  return (

                {disease.symptoms.map((symptom, index) => (

                  <div key={index} className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg">    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">  };

                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>

                    <span className="text-gray-700">{symptom}</span>      <div className="container mx-auto px-4 py-8">

                  </div>

                ))}        <button          <h2 className="text-2xl font-bold text-gray-800 mb-4">Doença não encontrada</h2>

              </div>

            </div>          onClick={handleBack}



            {/* Prevention Tips */}          className="flex items-center gap-2 mb-8 text-purple-600 hover:text-purple-700 transition-colors group"  const toggleTip = (tipId: string) => {

            <div className="bg-white rounded-2xl p-6 shadow-sm">

              <div className="flex items-center gap-2 mb-4">        >

                <CheckCircle className="w-5 h-5 text-green-600" />

                <h2 className="text-xl font-semibold text-gray-800">Como Prevenir</h2>          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />    setExpandedTips(prev =>           <button

              </div>

              <div className="space-y-3">          Voltar à Biblioteca

                {disease.prevention.map((tip, index) => (

                  <div key={index} className="border border-green-200 rounded-lg overflow-hidden">        </button>      prev.includes(tipId) 

                    <button

                      onClick={() => toggleTip(`prevention-${index}`)}

                      className="w-full text-left p-4 bg-green-50 hover:bg-green-100 transition-colors flex items-center justify-between"

                    >        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white mb-8">        ? prev.filter(id => id !== tipId)            onClick={() => setSelectedDisease(null)}

                      <span className="font-medium text-green-800">Dica {index + 1}</span>

                      <div className={`transform transition-transform ${expandedTips.includes(`prevention-${index}`) ? 'rotate-180' : ''}`}>          <div className="flex flex-col md:flex-row md:items-start gap-6">

                        ▼

                      </div>            <div className="text-6xl md:text-8xl">{disease.emoji}</div>        : [...prev, tipId]

                    </button>

                    {expandedTips.includes(`prevention-${index}`) && (            <div className="flex-1">

                      <div className="p-4 bg-white border-t border-green-200">

                        <p className="text-gray-700">{tip}</p>              <div className="flex items-center gap-4 mb-4">    );            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"  const disease = mockData.diseases.find(d => d.id === selectedDisease);const DiseaseDetail = ({ disease, onBack }: DiseaseDetailProps) => {

                      </div>

                    )}                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${

                  </div>

                ))}                  getDifficultyColor(disease.difficulty)  };

              </div>

            </div>                } bg-white`}>

          </div>

                  {getDifficultyLabel(disease.difficulty)}          >

          {/* Sidebar */}

          <div className="space-y-6">                </span>

            {/* Quick Info */}

            <div className="bg-white rounded-2xl p-6 shadow-sm">                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">  const getDifficultyColor = (difficulty: string) => {

              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações Rápidas</h3>

              <div className="space-y-3">                  {disease.category}

                <div className="flex items-center justify-between">

                  <span className="text-gray-600">Categoria:</span>                </span>    switch (difficulty) {            Voltar à Biblioteca  const SymptomBadge = ({ frequency }: { frequency: string }) => {

                  <span className="font-medium text-gray-800">{disease.category}</span>

                </div>              </div>

                <div className="flex items-center justify-between">

                  <span className="text-gray-600">Faixa Etária:</span>                    case 'easy': return 'bg-green-100 text-green-800 border-green-200';

                  <span className="font-medium text-gray-800">{disease.ageGroup}</span>

                </div>              <h1 className="text-3xl md:text-5xl font-bold mb-4">

                <div className="flex items-center justify-between">

                  <span className="text-gray-600">Dificuldade:</span>                {disease.title}      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';          </button>

                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(disease.difficulty)}`}>

                    {getDifficultyLabel(disease.difficulty)}              </h1>

                  </span>

                </div>                    case 'hard': return 'bg-red-100 text-red-800 border-red-200';

                <div className="flex items-center justify-between">

                  <span className="text-gray-600">Avaliação:</span>              <div className="flex flex-wrap items-center gap-6 text-lg opacity-90">

                  <div className="flex items-center gap-1">

                    <Star className="w-4 h-4 text-yellow-500 fill-current" />                <div className="flex items-center gap-2">      default: return 'bg-gray-100 text-gray-800 border-gray-200';        </div>  if (!disease) {    const colors = {

                    <span className="font-medium text-gray-800">{disease.rating}</span>

                  </div>                  <Users className="h-5 w-5" />

                </div>

              </div>                  {disease.ageGroup.join(', ')} anos    }

            </div>

                </div>

            {/* Related Actions */}

            <div className="bg-white rounded-2xl p-6 shadow-sm">                <div className="flex items-center gap-2">  };      </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Relacionadas</h3>

              <div className="space-y-3">                  <Clock className="h-5 w-5" />

                <button

                  onClick={() => setCurrentPage('videos')}                  {Math.ceil(disease.description.length / 200)} min de leitura

                  className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"

                >                </div>

                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">

                    📹                <div className="flex items-center gap-2">  const getDifficultyLabel = (difficulty: string) => {    );    return (      'Muito comum': 'bg-red-100 text-red-800',

                  </div>

                  <div className="text-left">                  <Heart className="h-5 w-5" />

                    <div className="font-medium text-gray-800">Ver Vídeos</div>

                    <div className="text-sm text-gray-600">Conteúdo educativo</div>                  Feito com carinho    switch (difficulty) {

                  </div>

                </button>                </div>

                

                <button              </div>      case 'easy': return 'Fácil';  }

                  onClick={() => setCurrentPage('games')}

                  className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"            </div>

                >

                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">          </div>      case 'medium': return 'Médio';

                    🎮

                  </div>        </div>

                  <div className="text-left">

                    <div className="font-medium text-gray-800">Jogar Jogos</div>      case 'hard': return 'Avançado';      <div className="min-h-screen flex items-center justify-center">      'Comum': 'bg-orange-100 text-orange-800',

                    <div className="text-sm text-gray-600">Aprender brincando</div>

                  </div>        <div className="grid lg:grid-cols-3 gap-8">

                </button>

                          <div className="lg:col-span-2 space-y-8">      default: return 'Básico';

                <button

                  onClick={() => setCurrentPage('stories')}            <div className="bg-white rounded-2xl shadow-lg p-8">

                  className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"

                >              <div className="flex items-center gap-3 mb-6">    }  const handleBack = () => {

                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">

                    📚                <BookOpen className="h-6 w-6 text-purple-600" />

                  </div>

                  <div className="text-left">                <h2 className="text-2xl font-bold text-gray-800">O que é?</h2>  };

                    <div className="font-medium text-gray-800">Ler Histórias</div>

                    <div className="text-sm text-gray-600">Histórias educativas</div>              </div>

                  </div>

                </button>              <p className="text-lg text-gray-700 leading-relaxed">    setSelectedDisease(null);        <div className="text-center">      'Raro': 'bg-yellow-100 text-yellow-800',

              </div>

            </div>                {disease.description}



            {/* Emergency Note */}              </p>  return (

            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">

              <div className="flex items-center gap-2 mb-3">            </div>

                <Heart className="w-5 h-5 text-red-600" />

                <h3 className="text-lg font-semibold text-red-800">Importante!</h3>    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">  };

              </div>

              <p className="text-red-700 text-sm leading-relaxed">            {disease.ageOfOnset && (

                Este conteúdo é apenas educativo. Sempre consulte um médico pediatra 

                para diagnóstico e tratamento adequado.              <div className="bg-white rounded-2xl shadow-lg p-8">      <div className="container mx-auto px-4 py-8">

              </p>

            </div>                <div className="flex items-center gap-3 mb-6">

          </div>

        </div>                  <Clock className="h-6 w-6 text-blue-600" />        <button          <h2 className="text-2xl font-bold text-gray-800 mb-4">Doença não encontrada</h2>      'Muito raro': 'bg-blue-100 text-blue-800'

      </div>

    </div>                  <h2 className="text-2xl font-bold text-gray-800">Quando aparece?</h2>

  );

};                </div>          onClick={handleBack}



export default DiseaseDetail;                <p className="text-lg text-gray-700">

                  {disease.ageOfOnset}          className="flex items-center gap-2 mb-8 text-purple-600 hover:text-purple-700 transition-colors group"  const toggleTip = (tipId: string) => {

                </p>

              </div>        >

            )}

          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />    setExpandedTips(prev =>           <button    };

            {disease.symptoms && disease.symptoms.length > 0 && (

              <div className="bg-white rounded-2xl shadow-lg p-8">          Voltar à Biblioteca

                <div className="flex items-center gap-3 mb-6">

                  <Heart className="h-6 w-6 text-pink-600" />        </button>      prev.includes(tipId) 

                  <h2 className="text-2xl font-bold text-gray-800">Características Especiais</h2>

                </div>

                <ul className="space-y-3">

                  {disease.symptoms.map((symptom, index) => (        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white mb-8">        ? prev.filter(id => id !== tipId)            onClick={() => setSelectedDisease(null)}    return (

                    <li key={index} className="flex items-start gap-3">

                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-3 flex-shrink-0"></div>          <div className="flex flex-col md:flex-row md:items-start gap-6">

                      <span className="text-lg text-gray-700">{symptom}</span>

                    </li>            <div className="text-6xl md:text-8xl">{disease.emoji}</div>        : [...prev, tipId]

                  ))}

                </ul>            <div className="flex-1">

              </div>

            )}              <div className="flex items-center gap-4 mb-4">    );            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[frequency as keyof typeof colors]}`}>



            {disease.tips && disease.tips.length > 0 && (                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${

              <div className="bg-white rounded-2xl shadow-lg p-8">

                <div className="flex items-center gap-3 mb-6">                  getDifficultyColor(disease.difficulty)  };

                  <Lightbulb className="h-6 w-6 text-yellow-600" />

                  <h2 className="text-2xl font-bold text-gray-800">Dicas Especiais</h2>                } bg-white`}>

                </div>

                <div className="space-y-4">                  {getDifficultyLabel(disease.difficulty)}          >        {frequency}

                  {disease.tips.map((tip) => (

                    <div key={tip.id} className="border border-gray-200 rounded-xl">                </span>

                      <button

                        onClick={() => toggleTip(tip.id)}                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">  const getDifficultyColor = (difficulty: string) => {

                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"

                      >                  {disease.category}

                        <span className="text-lg font-semibold text-gray-800">

                          {tip.title}                </span>    switch (difficulty) {            Voltar à Biblioteca      </span>

                        </span>

                        {expandedTips.includes(tip.id) ? (              </div>

                          <ChevronUp className="h-5 w-5 text-gray-400" />

                        ) : (                    case 'easy': return 'bg-green-100 text-green-800 border-green-200';

                          <ChevronDown className="h-5 w-5 text-gray-400" />

                        )}              <h1 className="text-3xl md:text-5xl font-bold mb-4">

                      </button>

                      {expandedTips.includes(tip.id) && (                {disease.title}      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';          </button>    );

                        <div className="px-4 pb-4">

                          <p className="text-gray-700 leading-relaxed">              </h1>

                            {tip.content}

                          </p>                    case 'hard': return 'bg-red-100 text-red-800 border-red-200';

                        </div>

                      )}              <div className="flex flex-wrap items-center gap-6 text-lg opacity-90">

                    </div>

                  ))}                <div className="flex items-center gap-2">      default: return 'bg-gray-100 text-gray-800 border-gray-200';        </div>  };

                </div>

              </div>                  <Users className="h-5 w-5" />

            )}

          </div>                  {disease.ageGroup.join(', ')} anos    }



          <div className="space-y-6">                </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h3 className="text-xl font-bold text-gray-800 mb-4">Informações Rápidas</h3>                <div className="flex items-center gap-2">  };      </div>

              <div className="space-y-4">

                <div>                  <Clock className="h-5 w-5" />

                  <span className="text-sm font-medium text-gray-500">Faixa Etária</span>

                  <p className="text-lg text-gray-800">{disease.ageGroup.join(', ')} anos</p>                  {Math.ceil(disease.description.length / 200)} min de leitura

                </div>

                <div>                </div>

                  <span className="text-sm font-medium text-gray-500">Dificuldade</span>

                  <p className="text-lg text-gray-800">{getDifficultyLabel(disease.difficulty)}</p>                <div className="flex items-center gap-2">  const getDifficultyLabel = (difficulty: string) => {    );  const SeverityIndicator = ({ severity }: { severity: string }) => {

                </div>

                <div>                  <Heart className="h-5 w-5" />

                  <span className="text-sm font-medium text-gray-500">Categoria</span>

                  <p className="text-lg text-gray-800 capitalize">{disease.category}</p>                  Feito com carinho    switch (difficulty) {

                </div>

                <div>                </div>

                  <span className="text-sm font-medium text-gray-500">Autor</span>

                  <p className="text-lg text-gray-800">{disease.author}</p>              </div>      case 'easy': return 'Fácil';  }    const colors = {

                </div>

              </div>            </div>

            </div>

          </div>      case 'medium': return 'Médio';

            {disease.tags && disease.tags.length > 0 && (

              <div className="bg-white rounded-2xl shadow-lg p-6">        </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Tags</h3>

                <div className="flex flex-wrap gap-2">      case 'hard': return 'Avançado';      'Leve': 'text-green-600',

                  {disease.tags.map((tag, index) => (

                    <span        <div className="grid lg:grid-cols-3 gap-8">

                      key={index}

                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium"          <div className="lg:col-span-2 space-y-8">      default: return 'Básico';

                    >

                      {tag}            <div className="bg-white rounded-2xl shadow-lg p-8">

                    </span>

                  ))}              <div className="flex items-center gap-3 mb-6">    }  const handleBack = () => {      'Moderada': 'text-orange-600', 

                </div>

              </div>                <BookOpen className="h-6 w-6 text-purple-600" />

            )}

                <h2 className="text-2xl font-bold text-gray-800">O que é?</h2>  };

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">

              <h3 className="text-xl font-bold text-gray-800 mb-4">Continue Explorando</h3>              </div>

              <div className="space-y-3">

                <button              <p className="text-lg text-gray-700 leading-relaxed">    setSelectedDisease(null);      'Severa': 'text-red-600'

                  onClick={() => setCurrentPage('videos')}

                  className="w-full bg-white text-purple-700 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left font-medium"                {disease.description}

                >

                  🎬 Ver Vídeos Relacionados              </p>  return (

                </button>

                <button            </div>

                  onClick={() => setCurrentPage('games')}

                  className="w-full bg-white text-purple-700 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left font-medium"    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">  };    };

                >

                  🎮 Jogar Sobre Este Tema            {disease.ageOfOnset && (

                </button>

                <button              <div className="bg-white rounded-2xl shadow-lg p-8">      <div className="container mx-auto px-4 py-8">

                  onClick={() => setCurrentPage('community')}

                  className="w-full bg-white text-purple-700 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left font-medium"                <div className="flex items-center gap-3 mb-6">

                >

                  👥 Conversar na Comunidade                  <Clock className="h-6 w-6 text-blue-600" />        {/* Back Button */}    return (

                </button>

              </div>                  <h2 className="text-2xl font-bold text-gray-800">Quando aparece?</h2>

            </div>

          </div>                </div>        <button

        </div>

      </div>                <p className="text-lg text-gray-700">

    </div>

  );                  {disease.ageOfOnset}          onClick={handleBack}  const toggleTip = (tipId: string) => {      <span className={`font-medium ${colors[severity as keyof typeof colors]}`}>

};

                </p>

export default DiseaseDetail;
              </div>          className="flex items-center gap-2 mb-8 text-purple-600 hover:text-purple-700 transition-colors group"

            )}

        >    setExpandedTips(prev =>         {severity}

            {disease.symptoms && disease.symptoms.length > 0 && (

              <div className="bg-white rounded-2xl shadow-lg p-8">          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />

                <div className="flex items-center gap-3 mb-6">

                  <Heart className="h-6 w-6 text-pink-600" />          Voltar à Biblioteca      prev.includes(tipId)       </span>

                  <h2 className="text-2xl font-bold text-gray-800">Características Especiais</h2>

                </div>        </button>

                <ul className="space-y-3">

                  {disease.symptoms.map((symptom, index) => (        ? prev.filter(id => id !== tipId)    );

                    <li key={index} className="flex items-start gap-3">

                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-3 flex-shrink-0"></div>        {/* Disease Header */}

                      <span className="text-lg text-gray-700">{symptom}</span>

                    </li>        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white mb-8">        : [...prev, tipId]  };

                  ))}

                </ul>          <div className="flex flex-col md:flex-row md:items-start gap-6">

              </div>

            )}            <div className="text-6xl md:text-8xl">{disease.emoji}</div>    );



            {disease.tips && disease.tips.length > 0 && (            <div className="flex-1">

              <div className="bg-white rounded-2xl shadow-lg p-8">

                <div className="flex items-center gap-3 mb-6">              <div className="flex items-center gap-4 mb-4">  };  return (

                  <Lightbulb className="h-6 w-6 text-yellow-600" />

                  <h2 className="text-2xl font-bold text-gray-800">Dicas Especiais</h2>                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${

                </div>

                <div className="space-y-4">                  getDifficultyColor(disease.difficulty)    <div className="max-w-6xl mx-auto px-4 py-8">

                  {disease.tips.map((tip) => (

                    <div key={tip.id} className="border border-gray-200 rounded-xl">                } bg-white`}>

                      <button

                        onClick={() => toggleTip(tip.id)}                  {getDifficultyLabel(disease.difficulty)}  const getDifficultyColor = (difficulty: string) => {      {/* Back Button */}

                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"

                      >                </span>

                        <span className="text-lg font-semibold text-gray-800">

                          {tip.title}                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">    switch (difficulty) {      <div className="mb-6">

                        </span>

                        {expandedTips.includes(tip.id) ? (                  {disease.category}

                          <ChevronUp className="h-5 w-5 text-gray-400" />

                        ) : (                </span>      case 'easy': return 'bg-green-100 text-green-800 border-green-200';        <Button variant="outline" onClick={onBack}>

                          <ChevronDown className="h-5 w-5 text-gray-400" />

                        )}              </div>

                      </button>

                      {expandedTips.includes(tip.id) && (                    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';          ← Voltar à Biblioteca

                        <div className="px-4 pb-4">

                          <p className="text-gray-700 leading-relaxed">              <h1 className="text-3xl md:text-5xl font-bold mb-4">

                            {tip.content}

                          </p>                {disease.title}      case 'hard': return 'bg-red-100 text-red-800 border-red-200';        </Button>

                        </div>

                      )}              </h1>

                    </div>

                  ))}                    default: return 'bg-gray-100 text-gray-800 border-gray-200';      </div>

                </div>

              </div>              <div className="flex flex-wrap items-center gap-6 text-lg opacity-90">

            )}

          </div>                <div className="flex items-center gap-2">    }



          <div className="space-y-6">                  <Users className="h-5 w-5" />

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h3 className="text-xl font-bold text-gray-800 mb-4">Informações Rápidas</h3>                  {disease.ageGroup.join(', ')} anos  };      {/* Header */}

              <div className="space-y-4">

                <div>                </div>

                  <span className="text-sm font-medium text-gray-500">Faixa Etária</span>

                  <p className="text-lg text-gray-800">{disease.ageGroup.join(', ')} anos</p>                <div className="flex items-center gap-2">      <div className="mb-8">

                </div>

                <div>                  <Clock className="h-5 w-5" />

                  <span className="text-sm font-medium text-gray-500">Dificuldade</span>

                  <p className="text-lg text-gray-800">{getDifficultyLabel(disease.difficulty)}</p>                  {Math.ceil(disease.description.length / 200)} min de leitura  const getDifficultyLabel = (difficulty: string) => {        <div className="flex items-start justify-between mb-4">

                </div>

                <div>                </div>

                  <span className="text-sm font-medium text-gray-500">Categoria</span>

                  <p className="text-lg text-gray-800 capitalize">{disease.category}</p>                <div className="flex items-center gap-2">    switch (difficulty) {          <div>

                </div>

                <div>                  <Heart className="h-5 w-5" />

                  <span className="text-sm font-medium text-gray-500">Autor</span>

                  <p className="text-lg text-gray-800">{disease.author}</p>                  Feito com carinho      case 'easy': return 'Fácil';            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">

                </div>

              </div>                </div>

            </div>

              </div>      case 'medium': return 'Médio';              {disease.name}

            {disease.tags && disease.tags.length > 0 && (

              <div className="bg-white rounded-2xl shadow-lg p-6">            </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Tags</h3>

                <div className="flex flex-wrap gap-2">          </div>      case 'hard': return 'Avançado';            </h1>

                  {disease.tags.map((tag, index) => (

                    <span        </div>

                      key={index}

                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium"      default: return 'Básico';            {disease.alternativeNames.length > 0 && (

                    >

                      {tag}        <div className="grid lg:grid-cols-3 gap-8">

                    </span>

                  ))}          {/* Main Content */}    }              <p className="text-lg text-gray-600">

                </div>

              </div>          <div className="lg:col-span-2 space-y-8">

            )}

            {/* Description */}  };                Também conhecida como: {disease.alternativeNames.join(', ')}

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">

              <h3 className="text-xl font-bold text-gray-800 mb-4">Continue Explorando</h3>            <div className="bg-white rounded-2xl shadow-lg p-8">

              <div className="space-y-3">

                <button              <div className="flex items-center gap-3 mb-6">              </p>

                  onClick={() => setCurrentPage('videos')}

                  className="w-full bg-white text-purple-700 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left font-medium"                <BookOpen className="h-6 w-6 text-purple-600" />

                >

                  🎬 Ver Vídeos Relacionados                <h2 className="text-2xl font-bold text-gray-800">O que é?</h2>  return (            )}

                </button>

                <button              </div>

                  onClick={() => setCurrentPage('games')}

                  className="w-full bg-white text-purple-700 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left font-medium"              <p className="text-lg text-gray-700 leading-relaxed">    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">          </div>

                >

                  🎮 Jogar Sobre Este Tema                {disease.description}

                </button>

                <button              </p>      <div className="container mx-auto px-4 py-8">          <div className="flex flex-col items-end space-y-2">

                  onClick={() => setCurrentPage('community')}

                  className="w-full bg-white text-purple-700 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left font-medium"            </div>

                >

                  👥 Conversar na Comunidade        {/* Back Button */}            <span className="px-3 py-1 bg-primary-100 text-primary-700 font-medium rounded-full">

                </button>

              </div>            {/* Age of Onset */}

            </div>

          </div>            {disease.ageOfOnset && (        <button              {disease.category}

        </div>

      </div>              <div className="bg-white rounded-2xl shadow-lg p-8">

    </div>

  );                <div className="flex items-center gap-3 mb-6">          onClick={handleBack}            </span>

};

                  <Clock className="h-6 w-6 text-blue-600" />

export default DiseaseDetail;
                  <h2 className="text-2xl font-bold text-gray-800">Quando aparece?</h2>          className="flex items-center gap-2 mb-8 text-purple-600 hover:text-purple-700 transition-colors group"            {disease.icdCode && (

                </div>

                <p className="text-lg text-gray-700">        >              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">

                  {disease.ageOfOnset}

                </p>          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />                CID-10: {disease.icdCode}

              </div>

            )}          Voltar à Biblioteca              </span>



            {/* Symptoms/Characteristics */}        </button>            )}

            {disease.symptoms && disease.symptoms.length > 0 && (

              <div className="bg-white rounded-2xl shadow-lg p-8">          </div>

                <div className="flex items-center gap-3 mb-6">

                  <Heart className="h-6 w-6 text-pink-600" />        {/* Disease Header */}        </div>

                  <h2 className="text-2xl font-bold text-gray-800">Características Especiais</h2>

                </div>        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white mb-8">        

                <ul className="space-y-3">

                  {disease.symptoms.map((symptom, index) => (          <div className="flex flex-col md:flex-row md:items-start gap-6">        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">

                    <li key={index} className="flex items-start gap-3">

                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-3 flex-shrink-0"></div>            <div className="text-6xl md:text-8xl">{disease.emoji}</div>          <p className="text-blue-800 font-body leading-relaxed">

                      <span className="text-lg text-gray-700">{symptom}</span>

                    </li>            <div className="flex-1">            {disease.shortDescription}

                  ))}

                </ul>              <div className="flex items-center gap-4 mb-4">          </p>

              </div>

            )}                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${        </div>



            {/* Tips */}                  getDifficultyColor(disease.difficulty)      </div>

            {disease.tips && disease.tips.length > 0 && (

              <div className="bg-white rounded-2xl shadow-lg p-8">                } bg-white`}>

                <div className="flex items-center gap-3 mb-6">

                  <Lightbulb className="h-6 w-6 text-yellow-600" />                  {getDifficultyLabel(disease.difficulty)}      <div className="grid lg:grid-cols-3 gap-8">

                  <h2 className="text-2xl font-bold text-gray-800">Dicas Especiais</h2>

                </div>                </span>        {/* Main Content */}

                <div className="space-y-4">

                  {disease.tips.map((tip) => (                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">        <div className="lg:col-span-2 space-y-8">

                    <div key={tip.id} className="border border-gray-200 rounded-xl">

                      <button                  {disease.category}          

                        onClick={() => toggleTip(tip.id)}

                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"                </span>          {/* Overview */}

                      >

                        <span className="text-lg font-semibold text-gray-800">              </div>          <Card>

                          {tip.title}

                        </span>                          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">

                        {expandedTips.includes(tip.id) ? (

                          <ChevronUp className="h-5 w-5 text-gray-400" />              <h1 className="text-3xl md:text-5xl font-bold mb-4">              Informações Gerais

                        ) : (

                          <ChevronDown className="h-5 w-5 text-gray-400" />                {disease.title}            </h2>

                        )}

                      </button>              </h1>            <div className="grid md:grid-cols-2 gap-6">

                      {expandedTips.includes(tip.id) && (

                        <div className="px-4 pb-4">                            <div>

                          <p className="text-gray-700 leading-relaxed">

                            {tip.content}              <div className="flex flex-wrap items-center gap-6 text-lg opacity-90">                <h3 className="font-semibold text-gray-900 mb-2">Epidemiologia</h3>

                          </p>

                        </div>                <div className="flex items-center gap-2">                <ul className="space-y-1 text-gray-600">

                      )}

                    </div>                  <Users className="h-5 w-5" />                  <li><strong>Prevalência:</strong> {disease.prevalence.rate}</li>

                  ))}

                </div>                  {disease.ageGroup.join(', ')} anos                  <li><strong>População:</strong> {disease.prevalence.population}</li>

              </div>

            )}                </div>                  <li><strong>Herança:</strong> {disease.inheritance}</li>

          </div>

                <div className="flex items-center gap-2">                </ul>

          {/* Sidebar */}

          <div className="space-y-6">                  <Clock className="h-5 w-5" />              </div>

            {/* Quick Info */}

            <div className="bg-white rounded-2xl shadow-lg p-6">                  {Math.ceil(disease.description.length / 200)} min de leitura              <div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Informações Rápidas</h3>

              <div className="space-y-4">                </div>                <h3 className="font-semibold text-gray-900 mb-2">Manifestação</h3>

                <div>

                  <span className="text-sm font-medium text-gray-500">Faixa Etária</span>                <div className="flex items-center gap-2">                <ul className="space-y-1 text-gray-600">

                  <p className="text-lg text-gray-800">{disease.ageGroup.join(', ')} anos</p>

                </div>                  <Heart className="h-5 w-5" />                  <li>

                <div>

                  <span className="text-sm font-medium text-gray-500">Dificuldade</span>                  Feito com carinho                    <strong>Início típico:</strong> {disease.onset.typical.min}-{disease.onset.typical.max} {disease.onset.typical.unit}

                  <p className="text-lg text-gray-800">{getDifficultyLabel(disease.difficulty)}</p>

                </div>                </div>                  </li>

                <div>

                  <span className="text-sm font-medium text-gray-500">Categoria</span>              </div>                  <li><strong>Base genética:</strong> {disease.geneticBasis}</li>

                  <p className="text-lg text-gray-800 capitalize">{disease.category}</p>

                </div>            </div>                </ul>

                <div>

                  <span className="text-sm font-medium text-gray-500">Autor</span>          </div>              </div>

                  <p className="text-lg text-gray-800">{disease.author}</p>

                </div>        </div>            </div>

              </div>

            </div>          </Card>



            {/* Tags */}        <div className="grid lg:grid-cols-3 gap-8">

            {disease.tags && disease.tags.length > 0 && (

              <div className="bg-white rounded-2xl shadow-lg p-6">          {/* Main Content */}          {/* Symptoms */}

                <h3 className="text-xl font-bold text-gray-800 mb-4">Tags</h3>

                <div className="flex flex-wrap gap-2">          <div className="lg:col-span-2 space-y-8">          <Card>

                  {disease.tags.map((tag, index) => (

                    <span            {/* Description */}            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">

                      key={index}

                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium"            <div className="bg-white rounded-2xl shadow-lg p-8">              Sintomas e Manifestações

                    >

                      {tag}              <div className="flex items-center gap-3 mb-6">            </h2>

                    </span>

                  ))}                <BookOpen className="h-6 w-6 text-purple-600" />            

                </div>

              </div>                <h2 className="text-2xl font-bold text-gray-800">O que é?</h2>            {/* Common Symptoms */}

            )}

              </div>            <div className="mb-6">

            {/* Related Actions */}

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">              <p className="text-lg text-gray-700 leading-relaxed">              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sintomas Comuns</h3>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Continue Explorando</h3>

              <div className="space-y-3">                {disease.description}              <div className="space-y-4">

                <button

                  onClick={() => setCurrentPage('videos')}              </p>                {disease.symptoms.common.map(symptom => (

                  className="w-full bg-white text-purple-700 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left font-medium"

                >            </div>                  <div key={symptom.id} className="border border-gray-200 rounded-lg p-4">

                  🎬 Ver Vídeos Relacionados

                </button>                    <div className="flex items-start justify-between mb-2">

                <button

                  onClick={() => setCurrentPage('games')}            {/* Age of Onset */}                      <h4 className="font-medium text-gray-900">{symptom.name}</h4>

                  className="w-full bg-white text-purple-700 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left font-medium"

                >            {disease.ageOfOnset && (                      <div className="flex space-x-2">

                  🎮 Jogar Sobre Este Tema

                </button>              <div className="bg-white rounded-2xl shadow-lg p-8">                        <SymptomBadge frequency={symptom.frequency} />

                <button

                  onClick={() => setCurrentPage('community')}                <div className="flex items-center gap-3 mb-6">                        <span className="text-sm text-gray-500">

                  className="w-full bg-white text-purple-700 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left font-medium"

                >                  <Clock className="h-6 w-6 text-blue-600" />                          <SeverityIndicator severity={symptom.severity} />

                  👥 Conversar na Comunidade

                </button>                  <h2 className="text-2xl font-bold text-gray-800">Quando aparece?</h2>                        </span>

              </div>

            </div>                </div>                      </div>

          </div>

        </div>                <p className="text-lg text-gray-700">                    </div>

      </div>

    </div>                  {disease.ageOfOnset}                    <p className="text-gray-600 text-sm mb-2">{symptom.description}</p>

  );

};                </p>                    <div className="text-xs text-gray-500">



export default DiseaseDetail;              </div>                      <span className="mr-4">

            )}                        Sistema: <strong>{symptom.system}</strong>

                      </span>

            {/* Symptoms/Characteristics */}                      <span>

            {disease.symptoms && disease.symptoms.length > 0 && (                        Início: <strong>{symptom.ageOfOnset.min}-{symptom.ageOfOnset.max} {symptom.ageOfOnset.unit}</strong>

              <div className="bg-white rounded-2xl shadow-lg p-8">                      </span>

                <div className="flex items-center gap-3 mb-6">                    </div>

                  <Heart className="h-6 w-6 text-pink-600" />                  </div>

                  <h2 className="text-2xl font-bold text-gray-800">Características Especiais</h2>                ))}

                </div>              </div>

                <ul className="space-y-3">            </div>

                  {disease.symptoms.map((symptom, index) => (

                    <li key={index} className="flex items-start gap-3">            {/* Progressive Symptoms */}

                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-3 flex-shrink-0"></div>            {disease.symptoms.progressive.length > 0 && (

                      <span className="text-lg text-gray-700">{symptom}</span>              <div className="mb-6">

                    </li>                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sintomas Progressivos</h3>

                  ))}                <div className="space-y-4">

                </ul>                  {disease.symptoms.progressive.map(symptom => (

              </div>                    <div key={symptom.id} className="border border-orange-200 rounded-lg p-4 bg-orange-50">

            )}                      <div className="flex items-start justify-between mb-2">

                        <h4 className="font-medium text-gray-900">{symptom.name}</h4>

            {/* Tips */}                        <SeverityIndicator severity={symptom.severity} />

            {disease.tips && disease.tips.length > 0 && (                      </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">                      <p className="text-gray-600 text-sm">{symptom.description}</p>

                <div className="flex items-center gap-3 mb-6">                    </div>

                  <Lightbulb className="h-6 w-6 text-yellow-600" />                  ))}

                  <h2 className="text-2xl font-bold text-gray-800">Dicas Especiais</h2>                </div>

                </div>              </div>

                <div className="space-y-4">            )}

                  {disease.tips.map((tip) => (

                    <div key={tip.id} className="border border-gray-200 rounded-xl">            {/* Rare Symptoms */}

                      <button            {disease.symptoms.rare.length > 0 && (

                        onClick={() => toggleTip(tip.id)}              <div>

                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sintomas Raros</h3>

                      >                <div className="space-y-4">

                        <span className="text-lg font-semibold text-gray-800">                  {disease.symptoms.rare.map(symptom => (

                          {tip.title}                    <div key={symptom.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50">

                        </span>                      <div className="flex items-start justify-between mb-2">

                        {expandedTips.includes(tip.id) ? (                        <h4 className="font-medium text-gray-900">{symptom.name}</h4>

                          <ChevronUp className="h-5 w-5 text-gray-400" />                        <SeverityIndicator severity={symptom.severity} />

                        ) : (                      </div>

                          <ChevronDown className="h-5 w-5 text-gray-400" />                      <p className="text-gray-600 text-sm">{symptom.description}</p>

                        )}                    </div>

                      </button>                  ))}

                      {expandedTips.includes(tip.id) && (                </div>

                        <div className="px-4 pb-4">              </div>

                          <p className="text-gray-700 leading-relaxed">            )}

                            {tip.content}          </Card>

                          </p>

                        </div>          {/* Diagnosis */}

                      )}          <Card>

                    </div>            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">

                  ))}              Diagnóstico

                </div>            </h2>

              </div>            

            )}            <div className="space-y-6">

          </div>              <div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Critérios Clínicos</h3>

          {/* Sidebar */}                <ul className="space-y-2">

          <div className="space-y-6">                  {disease.diagnosis.clinicalCriteria.map((criteria, index) => (

            {/* Quick Info */}                    <li key={index} className="flex items-start space-x-2">

            <div className="bg-white rounded-2xl shadow-lg p-6">                      <span className="text-green-500 font-bold">✓</span>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Informações Rápidas</h3>                      <span className="text-gray-600">{criteria}</span>

              <div className="space-y-4">                    </li>

                <div>                  ))}

                  <span className="text-sm font-medium text-gray-500">Faixa Etária</span>                </ul>

                  <p className="text-lg text-gray-800">{disease.ageGroup.join(', ')} anos</p>              </div>

                </div>

                <div>              <div>

                  <span className="text-sm font-medium text-gray-500">Dificuldade</span>                <h3 className="text-lg font-semibold text-gray-900 mb-3">Testes Diagnósticos</h3>

                  <p className="text-lg text-gray-800">{getDifficultyLabel(disease.difficulty)}</p>                <div className="space-y-3">

                </div>                  {disease.diagnosis.diagnosticTests.map(test => (

                <div>                    <div key={test.id} className="border border-gray-200 rounded-lg p-4">

                  <span className="text-sm font-medium text-gray-500">Categoria</span>                      <div className="flex justify-between items-start mb-2">

                  <p className="text-lg text-gray-800 capitalize">{disease.category}</p>                        <h4 className="font-medium text-gray-900">{test.name}</h4>

                </div>                        <div className="text-right text-sm">

                <div>                          <div className="text-green-600 font-medium">{test.accuracy}% precisão</div>

                  <span className="text-sm font-medium text-gray-500">Autor</span>                          <div className="text-gray-500">Custo: {test.cost}</div>

                  <p className="text-lg text-gray-800">{disease.author}</p>                        </div>

                </div>                      </div>

              </div>                      <p className="text-gray-600 text-sm mb-2">{test.description}</p>

            </div>                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">

                        {test.type}

            {/* Tags */}                      </span>

            {disease.tags && disease.tags.length > 0 && (                    </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">                  ))}

                <h3 className="text-xl font-bold text-gray-800 mb-4">Tags</h3>                </div>

                <div className="flex flex-wrap gap-2">              </div>

                  {disease.tags.map((tag, index) => (

                    <span              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">

                      key={index}                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Informações Importantes</h3>

                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium"                <ul className="text-yellow-700 text-sm space-y-1">

                    >                  <li><strong>Especialista recomendado:</strong> {disease.diagnosis.specialistReferral}</li>

                      {tag}                  <li><strong>Tempo médio para diagnóstico:</strong> {disease.diagnosis.averageTimeTodiagnosis}</li>

                    </span>                </ul>

                  ))}              </div>

                </div>            </div>

              </div>          </Card>

            )}

          {/* Treatment */}

            {/* Related Actions */}          <Card>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">

              <h3 className="text-xl font-bold text-gray-800 mb-4">Continue Explorando</h3>              Tratamento e Cuidados

              <div className="space-y-3">            </h2>

                <button            

                  onClick={() => setCurrentPage('videos')}            <div className="space-y-6">

                  className="w-full bg-white text-purple-700 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left font-medium"              {/* Current Treatments */}

                >              <div>

                  🎬 Ver Vídeos Relacionados                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tratamentos Atuais</h3>

                </button>                <div className="space-y-4">

                <button                  {disease.treatment.current.map(treatment => (

                  onClick={() => setCurrentPage('games')}                    <div key={treatment.id} className="border border-green-200 rounded-lg p-4 bg-green-50">

                  className="w-full bg-white text-purple-700 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left font-medium"                      <div className="flex justify-between items-start mb-2">

                >                        <h4 className="font-medium text-gray-900">{treatment.name}</h4>

                  🎮 Jogar Sobre Este Tema                        <div className="text-right text-sm">

                </button>                          <div className="text-green-600 font-medium">{treatment.effectiveness}% eficácia</div>

                <button                          <div className="text-gray-500">{treatment.availability}</div>

                  onClick={() => setCurrentPage('community')}                        </div>

                  className="w-full bg-white text-purple-700 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left font-medium"                      </div>

                >                      <p className="text-gray-600 text-sm mb-2">{treatment.description}</p>

                  👥 Conversar na Comunidade                      <div className="flex items-center space-x-4">

                </button>                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">

              </div>                          {treatment.type}

            </div>                        </span>

          </div>                        {treatment.sideEffects.length > 0 && (

        </div>                          <span className="text-xs text-gray-500">

      </div>                            Efeitos colaterais: {treatment.sideEffects.join(', ')}

    </div>                          </span>

  );                        )}

};                      </div>

                    </div>

export default DiseaseDetail;                  ))}
                </div>
              </div>

              {/* Experimental Treatments */}
              {disease.treatment.experimental.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tratamentos Experimentais</h3>
                  <div className="space-y-4">
                    {disease.treatment.experimental.map(treatment => (
                      <div key={treatment.id} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{treatment.name}</h4>
                          <div className="text-right text-sm">
                            <div className="text-orange-600 font-medium">{treatment.effectiveness}% eficácia</div>
                            <div className="text-gray-500">{treatment.availability}</div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{treatment.description}</p>
                        <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                          Em desenvolvimento
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Supportive Care */}
              {disease.treatment.supportive.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cuidados de Suporte</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {disease.treatment.supportive.map((care, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="text-blue-500">•</span>
                        <span className="text-gray-600 text-sm">{care}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <Button className="w-full justify-center" size="sm">
                💾 Salvar nos Favoritos
              </Button>
              <Button variant="outline" className="w-full justify-center" size="sm">
                📤 Compartilhar
              </Button>
              <Button variant="outline" className="w-full justify-center" size="sm">
                📋 Imprimir Resumo
              </Button>
              <Button variant="outline" className="w-full justify-center" size="sm">
                ❓ Fazer Pergunta
              </Button>
            </div>
          </Card>

          {/* Prognosis */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Prognóstico</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Expectativa de vida:</strong>
                <p className="text-gray-600 mt-1">{disease.prognosis.lifeExpectancy}</p>
              </div>
              <div>
                <strong>Qualidade de vida:</strong>
                <p className="text-gray-600 mt-1">{disease.prognosis.qualityOfLife}</p>
              </div>
              <div>
                <strong>Progressão:</strong>
                <p className="text-gray-600 mt-1">{disease.prognosis.progression}</p>
              </div>
            </div>
          </Card>

          {/* Resources */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recursos de Apoio</h3>
            <div className="space-y-4">
              {disease.resources.organizations.map(org => (
                <div key={org.id} className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-medium text-gray-900 text-sm">{org.name}</h4>
                  <p className="text-gray-600 text-xs mb-2">{org.description}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    {org.website && (
                      <div>
                        <a href={org.website} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-600 hover:text-blue-800">
                          🌐 Website
                        </a>
                      </div>
                    )}
                    {org.phone && (
                      <div>📞 {org.phone}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Updated Info */}
          <Card padding="sm">
            <div className="text-xs text-gray-500 space-y-2">
              <div>
                <strong>Última atualização:</strong> {disease.lastUpdated}
              </div>
              <div>
                <strong>Revisado por:</strong>
                <ul className="mt-1 space-y-1">
                  {disease.reviewedBy.map((reviewer, index) => (
                    <li key={index}>• {reviewer}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetail;