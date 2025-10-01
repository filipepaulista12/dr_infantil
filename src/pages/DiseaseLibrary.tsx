import { Heart, Sparkles, ChevronRight } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

const DiseaseLibrary = () => {
  const { setCurrentPage, setSelectedDisease } = useAppStore();

  const handleDiseaseClick = (diseaseId: string) => {
    setSelectedDisease(diseaseId);
    setCurrentPage('disease-detail');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-2xl relative overflow-hidden">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="relative">
                <Heart className="w-12 h-12 text-pink-200 animate-pulse" />
                <Sparkles className="w-6 h-6 text-yellow-300 animate-bounce absolute -top-2 -right-2" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Mundo das Diferenças
              </h1>
              <div className="relative">
                <Heart className="w-12 h-12 text-blue-200 animate-pulse" />
                <Sparkles className="w-6 h-6 text-yellow-300 animate-bounce absolute -top-2 -left-2" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-purple-100 font-medium mb-2">
              Aprendendo sobre doenças raras com carinho e diversão! 
            </p>
            <p className="text-lg text-purple-200 max-w-3xl mx-auto">
              Um lugar especial onde crianças podem entender que ser diferente é ser único e maravilhoso 
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4"> Biblioteca de Doenças Raras </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aprenda sobre diferentes condições de forma carinhosa e educativa!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Síndrome de Down */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-purple-100">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b-2 border-purple-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">💙</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Síndrome de Down</h3>
                    <span className="text-sm text-gray-600">Genética</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-semibold border-2 bg-blue-100 text-blue-800 border-blue-200">
                  Comum
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Uma condição genética causada por um cromossomo 21 extra. Pessoas com Síndrome de Down têm características únicas e levam vidas plenas e felizes!
              </p>
              <button 
                onClick={() => handleDiseaseClick('sindrome-down')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
                <span>Saber Mais</span>
              </button>
            </div>
          </div>

          {/* Autismo (TEA) */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-blue-100">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b-2 border-blue-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">🧩</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Autismo (TEA)</h3>
                    <span className="text-sm text-gray-600">Neurológica</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-semibold border-2 bg-purple-100 text-purple-800 border-purple-200">
                  Comum
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Uma condição neurológica que afeta a comunicação e o comportamento. Cada pessoa no espectro autista é única, com suas próprias habilidades especiais!
              </p>
              <button 
                onClick={() => handleDiseaseClick('autismo')}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
                <span>Saber Mais</span>
              </button>
            </div>
          </div>

          {/* Fibrose Cística */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-green-100">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 border-b-2 border-green-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">🫁</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Fibrose Cística</h3>
                    <span className="text-sm text-gray-600">Genética</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-semibold border-2 bg-yellow-100 text-yellow-800 border-yellow-200">
                  Rara
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Uma doença genética que afeta principalmente os pulmões e o sistema digestivo. Com tratamento adequado, as crianças podem viver vidas ativas!
              </p>
              <button 
                onClick={() => alert('Conteúdo em breve! 🚀')}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
                <span>Saber Mais</span>
              </button>
            </div>
          </div>

          {/* Diabetes Tipo 1 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-pink-100">
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 border-b-2 border-pink-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">🩸</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Diabetes Tipo 1</h3>
                    <span className="text-sm text-gray-600">Metabólica</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-semibold border-2 bg-blue-100 text-blue-800 border-blue-200">
                  Comum
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Uma condição onde o corpo não produz insulina suficiente. Com monitoramento e cuidados, crianças com diabetes podem fazer tudo que quiserem!
              </p>
              <button 
                onClick={() => alert('Conteúdo em breve! 🚀')}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
                <span>Saber Mais</span>
              </button>
            </div>
          </div>

          {/* Paralisia Cerebral */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-indigo-100">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b-2 border-indigo-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">🦾</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Paralisia Cerebral</h3>
                    <span className="text-sm text-gray-600">Neurológica</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-semibold border-2 bg-purple-100 text-purple-800 border-purple-200">
                  Comum
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Afeta o movimento e a coordenação muscular. Com terapias e apoio, pessoas com paralisia cerebral alcançam seus objetivos e sonhos!
              </p>
              <button 
                onClick={() => alert('Conteúdo em breve! 🚀')}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
                <span>Saber Mais</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mensagem Motivacional */}
        <div className="mt-12 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-2xl p-8 text-center border-2 border-purple-200">
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-pink-500 animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            🌈 Cada criança é especial do seu jeito! 🌈
          </h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Aprender sobre doenças raras nos ajuda a ser mais compreensivos, gentis e inclusivos. 
            Juntos, podemos criar um mundo onde todas as crianças se sintam amadas e aceitas! 💕
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiseaseLibrary;
