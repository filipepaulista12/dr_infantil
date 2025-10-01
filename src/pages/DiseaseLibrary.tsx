import { Heart, Sparkles, ChevronDown } from 'lucide-react';

const DiseaseLibrary = () => {

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
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-purple-100">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b-2 border-purple-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">🌟</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Síndrome de Down</h3>
                    <span className="text-sm text-gray-600">Genética</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-semibold border-2 bg-green-100 text-green-800 border-green-200">
                  Fácil
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Uma condição genética que faz com que a pessoa tenha um cromossomo extra. Pessoas com Síndrome de Down são únicas e especiais!
              </p>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105">
                <ChevronDown className="w-5 h-5" />
                <span>Ver Dicas Especiais</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseLibrary;
