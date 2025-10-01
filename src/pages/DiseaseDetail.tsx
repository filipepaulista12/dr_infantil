import React, { useState } from 'react';

import { useAppStore } from '../stores/useAppStore';
import { ArrowLeft, Heart, Users, Clock, BookOpen, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface Tip {
  id: string;
  title: string;
  content: string;
}

interface DiseaseData {
  id: string;
  name: string;
  emoji: string;
  description: string;
  symptoms: string[];
  ageGroup: string;
  prevalence: string;
  supportInfo: string;
  tips: Tip[];
}

const mockDiseases: DiseaseData[] = [
  {
    id: 'sindrome-down',
    name: 'Síndrome de Down',
    emoji: '💙',
    description:
      'A Síndrome de Down é uma condição genética causada pela presença de um cromossomo 21 extra.',
    symptoms: [
      'Tônus muscular diminuído',
      'Perfil facial achatado',
      'Olhos com inclinação para cima',
      'Desenvolvimento motor mais lento'
    ],
    ageGroup: 'Presente desde o nascimento',
    prevalence: '1 em cada 700 nascimentos',
    supportInfo:
      'O acompanhamento multidisciplinar com fisioterapia, fonoaudiologia e terapia ocupacional é fundamental.',
    tips: [
      {
        id: 'tip1',
        title: 'Estimulação Precoce',
        content:
          'Inicie atividades de estimulação logo nos primeiros meses. Brincadeiras que estimulem a coordenação motora são muito benéficas.'
      },
      {
        id: 'tip2',
        title: 'Comunicação',
        content:
          'Use linguagem clara e simples. Sinais básicos da Língua de Sinais podem ajudar na comunicação.'
      }
    ]
  }
];

const DiseaseDetail: React.FC = () => {
  const { selectedDisease, setSelectedDisease, setCurrentPage } = useAppStore();
  const [expandedTips, setExpandedTips] = useState<string[]>([]);

  const disease = mockDiseases.find(d => d.id === selectedDisease);

  const handleBack = () => {
    setSelectedDisease(null);
    setCurrentPage('diseases');
  };

  const toggleTip = (tipId: string) => {
    setExpandedTips(prev =>
      prev.includes(tipId) ? prev.filter(id => id !== tipId) : [...prev, tipId]
    );
  };

  if (!disease) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Doença não encontrada</h2>
          <button
            onClick={() => setCurrentPage('diseases')}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"
          >
            Voltar à Biblioteca
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6 font-semibold transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar à Biblioteca
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-6xl">{disease.emoji}</div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{disease.name}</h1>
                <p className="text-lg text-gray-600">{disease.description}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Users className="text-purple-600 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-1">Faixa Etária</h3>
              <p className="text-gray-600 text-sm">{disease.ageGroup}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Heart className="text-pink-600 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-1">Prevalência</h3>
              <p className="text-gray-600 text-sm">{disease.prevalence}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <BookOpen className="text-blue-600 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-1">Apoio</h3>
              <p className="text-gray-600 text-sm">Multidisciplinar</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="text-purple-600" />
              Sintomas e Características
            </h2>
            <ul className="space-y-3">
              {disease.symptoms.map((symptom, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-lg p-8 mb-6 border-l-4 border-purple-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="text-pink-600" />
              Informações de Apoio
            </h2>
            <p className="text-gray-700 leading-relaxed">{disease.supportInfo}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Lightbulb className="text-yellow-500" />
              Dicas Práticas para o Dia a Dia
            </h2>
            <div className="space-y-4">
              {disease.tips.map(tip => (
                <div key={tip.id} className="border-2 border-purple-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleTip(tip.id)}
                    className="w-full p-4 flex items-center justify-between bg-purple-50 hover:bg-purple-100 transition-colors"
                  >
                    <span className="font-bold text-gray-800 text-left">{tip.title}</span>
                    {expandedTips.includes(tip.id) ? (
                      <ChevronUp className="text-purple-600 flex-shrink-0" size={20} />
                    ) : (
                      <ChevronDown className="text-purple-600 flex-shrink-0" size={20} />
                    )}
                  </button>
                  {expandedTips.includes(tip.id) && (
                    <div className="p-4 bg-white">
                      <p className="text-gray-700 leading-relaxed">{tip.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 mt-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Precisa de Mais Informações? 📚</h3>
            <p className="text-lg text-gray-700 mb-6">
              Visite nosso Centro de Recursos para encontrar mais materiais e apoio.
            </p>
            <button
              onClick={() => setCurrentPage('resources')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-8 rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Ir para Recursos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetail;
