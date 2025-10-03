import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Heart, Brain, Wind, FlaskConical, BookOpen, HelpCircle } from 'lucide-react';
import { allSimplifiedDiseases, getDiseasesByCategory, type SimplifiedDisease } from '../data/index';
import Card from './common/Card';

const categoryIcons = {
  neurological: Brain,
  cardiac: Heart,
  respiratory: Wind,
  metabolic: FlaskConical,
  genetic: BookOpen,
  oncological: FlaskConical
};

const categoryColors = {
  neurological: 'from-purple-500 to-pink-500',
  cardiac: 'from-red-500 to-rose-500',
  respiratory: 'from-blue-500 to-cyan-500',
  metabolic: 'from-green-500 to-emerald-500',
  genetic: 'from-yellow-500 to-orange-500',
  oncological: 'from-indigo-500 to-purple-500'
};

const categoryNames = {
  neurological: 'Neurológicas',
  cardiac: 'Cardíacas',
  respiratory: 'Respiratórias',
  metabolic: 'Metabólicas',
  genetic: 'Genéticas',
  oncological: 'Oncológicas'
};

type ViewMode = 'children' | 'parents' | 'scientific';

interface DiseaseCardProps {
  disease: SimplifiedDisease;
  viewMode: ViewMode;
  onClick: () => void;
}

function DiseaseCard({ disease, viewMode, onClick }: DiseaseCardProps) {
  const Icon = categoryIcons[disease.category];
  const colorClass = categoryColors[disease.category];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="h-full hover:shadow-xl transition-shadow">
        <div className={`bg-gradient-to-r ${colorClass} text-white p-4 rounded-t-lg`}>
          <div className="flex items-center gap-3">
            <Icon className="w-8 h-8" />
            <h3 className="text-xl font-bold">{disease.name}</h3>
          </div>
          <p className="text-sm mt-2 opacity-90">{categoryNames[disease.category]}</p>
        </div>
        
        <div className="p-4">
          <div className="text-sm text-gray-600 line-clamp-3">
            {viewMode === 'children' && disease.forChildren.slice(0, 150)}
            {viewMode === 'parents' && disease.forParents.slice(0, 150)}
            {viewMode === 'scientific' && disease.scientific.slice(0, 150)}
            ...
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {disease.symptoms.length} sintomas
            </span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {disease.treatments.length} tratamentos
            </span>
            {disease.faqs && disease.faqs.length > 0 && (
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                {disease.faqs.length} FAQs
              </span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

interface DiseaseDetailModalProps {
  disease: SimplifiedDisease;
  viewMode: ViewMode;
  onClose: () => void;
}

function DiseaseDetailModal({ disease, viewMode, onClose }: DiseaseDetailModalProps) {
  const Icon = categoryIcons[disease.category];
  const colorClass = categoryColors[disease.category];
  const [activeTab, setActiveTab] = useState<'info' | 'symptoms' | 'treatments' | 'faqs' | 'support'>('info');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${colorClass} text-white p-6`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Icon className="w-12 h-12" />
              <div>
                <h2 className="text-3xl font-bold">{disease.name}</h2>
                <p className="text-sm opacity-90 mt-1">{categoryNames[disease.category]}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-50 overflow-x-auto">
          {[
            { id: 'info', label: 'Informações', icon: BookOpen },
            { id: 'symptoms', label: 'Sintomas', icon: Users },
            { id: 'treatments', label: 'Tratamentos', icon: Heart },
            { id: 'faqs', label: 'FAQs', icon: HelpCircle },
            { id: 'support', label: 'Apoio', icon: Users }
          ].map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-6 py-3 font-medium whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'border-b-2 border-purple-600 text-purple-600 bg-white'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'info' && (
            <div className="space-y-4">
              {viewMode === 'children' && (
                <div>
                  <h3 className="text-lg font-bold text-purple-600 mb-2">👶 Para Crianças</h3>
                  <div className="prose prose-lg whitespace-pre-wrap">{disease.forChildren}</div>
                </div>
              )}
              
              {viewMode === 'parents' && (
                <div>
                  <h3 className="text-lg font-bold text-blue-600 mb-2">👨‍👩‍👧 Para Pais e Responsáveis</h3>
                  <div className="prose whitespace-pre-wrap">{disease.forParents}</div>
                </div>
              )}
              
              {viewMode === 'scientific' && (
                <div>
                  <h3 className="text-lg font-bold text-green-600 mb-2">🔬 Informação Científica</h3>
                  <div className="prose prose-sm whitespace-pre-wrap">{disease.scientific}</div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'symptoms' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Principais Sintomas</h3>
              <ul className="space-y-2">
                {disease.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-purple-600 text-xl">•</span>
                    <span className="text-gray-700">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'treatments' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Opções de Tratamento</h3>
              <ul className="space-y-2">
                {disease.treatments.map((treatment, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">{treatment}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-4">
              {disease.faqs && disease.faqs.length > 0 ? (
                disease.faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-600 mb-2 flex items-start gap-2">
                      <HelpCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                      {faq.question}
                    </h4>
                    <p className="text-gray-700 ml-7">{faq.answer}</p>
                    <span className="text-xs text-gray-500 ml-7 mt-2 inline-block">
                      Para: {faq.audience === 'children' ? 'Crianças' : faq.audience === 'parents' ? 'Pais' : 'Todos'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">Nenhuma FAQ disponível ainda.</p>
              )}
            </div>
          )}

          {activeTab === 'support' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Organizações de Apoio</h3>
              <ul className="space-y-3">
                {disease.supportOrganizations.map((org, index) => (
                  <li key={index} className="bg-blue-50 p-4 rounded-lg">
                    <span className="font-semibold text-blue-800">{org}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function NewDiseasesLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SimplifiedDisease['category'] | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('children');
  const [selectedDisease, setSelectedDisease] = useState<SimplifiedDisease | null>(null);

  const filteredDiseases = React.useMemo(() => {
    let diseases = selectedCategory === 'all' 
      ? allSimplifiedDiseases 
      : getDiseasesByCategory(selectedCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      diseases = diseases.filter(disease =>
        disease.name.toLowerCase().includes(query) ||
        disease.symptoms.some(s => s.toLowerCase().includes(query))
      );
    }

    return diseases;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Nova Biblioteca de Doenças
          </h1>
          <p className="text-gray-600 text-lg">
            {allSimplifiedDiseases.length} doenças catalogadas com informações completas
          </p>
        </motion.div>

        {/* View Mode Selector */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setViewMode('children')}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              viewMode === 'children'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-purple-100'
            }`}
          >
            👶 Para Crianças
          </button>
          <button
            onClick={() => setViewMode('parents')}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              viewMode === 'parents'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-blue-100'
            }`}
          >
            👨‍👩‍👧 Para Pais
          </button>
          <button
            onClick={() => setViewMode('scientific')}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              viewMode === 'scientific'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-green-100'
            }`}
          >
            🔬 Científico
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar doenças ou sintomas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full font-medium transition ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Todas ({allSimplifiedDiseases.length})
          </button>
          {Object.entries(categoryNames).map(([key, name]) => {
            const count = allSimplifiedDiseases.filter(d => d.category === key).length;
            if (count === 0) return null;
            
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as SimplifiedDisease['category'])}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === key
                    ? `bg-gradient-to-r ${categoryColors[key as SimplifiedDisease['category']]} text-white`
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {name} ({count})
              </button>
            );
          })}
        </div>

        {/* Disease Grid */}
        {filteredDiseases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiseases.map((disease) => (
              <DiseaseCard
                key={disease.id}
                disease={disease}
                viewMode={viewMode}
                onClick={() => setSelectedDisease(disease)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhuma doença encontrada.</p>
          </div>
        )}

        {/* Modal */}
        {selectedDisease && (
          <DiseaseDetailModal
            disease={selectedDisease}
            viewMode={viewMode}
            onClose={() => setSelectedDisease(null)}
          />
        )}
      </div>
    </div>
  );
}
