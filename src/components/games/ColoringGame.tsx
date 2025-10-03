import { useState, useRef, useEffect } from 'react';
import { trackEvent, trackPageView } from '../../utils/analytics';

interface ColoringData {
  id: string;
  disease: string;
  emoji: string;
  title: string;
  message: string;
  paths: string[];
  colors: string[];
}

const coloringPages: ColoringData[] = [
  {
    id: 'coloring-friendship',
    disease: 'Síndrome de Down',
    emoji: '☀️',
    title: 'Amigos Especiais',
    message: 'Pinte estes amigos que mostram como todos somos diferentes e especiais!',
    paths: [
      // Corpo da primeira criança
      'M100,200 L150,200 L150,150 Q150,120 130,120 Q110,120 100,130 Q90,120 80,130 Q60,120 50,120 Q50,150 50,200 L100,200 Z',
      // Cabeça da primeira criança
      'M75,120 Q75,90 100,90 Q125,90 125,120 Q125,150 100,150 Q75,150 75,120 Z',
      // Corpo da segunda criança
      'M200,200 L250,200 L250,150 Q250,120 230,120 Q210,120 200,130 Q190,120 180,130 Q160,120 150,120 Q150,150 150,200 L200,200 Z',
      // Cabeça da segunda criança
      'M175,120 Q175,90 200,90 Q225,90 225,120 Q225,150 200,150 Q175,150 175,120 Z',
      // Coração no meio
      'M162.5,160 Q160,150 155,155 Q150,160 155,170 Q162.5,175 170,170 Q175,160 170,155 Q165,150 162.5,160 Z'
    ],
    colors: ['#FF69B4', '#87CEEB', '#FFB6C1', '#98FB98', '#DDA0DD', '#F0E68C']
  },
  {
    id: 'coloring-rainbow',
    disease: 'Transtorno do Espectro Autista',
    emoji: '🌈',
    title: 'Mundo Colorido do Autismo',
    message: 'Cada pessoa no espectro autista é única! Pinte este arco-íris da diversidade.',
    paths: [
      // Arco-íris - faixas
      'M50,200 Q175,50 300,200 Q175,80 50,200 Z',
      'M60,200 Q175,70 290,200 Q175,90 60,200 Z',
      'M70,200 Q175,90 280,200 Q175,110 70,200 Z',
      'M80,200 Q175,110 270,200 Q175,130 80,200 Z',
      // Sol
      'M320,80 Q340,60 360,80 Q340,100 320,80 Z',
      // Nuvens
      'M50,80 Q70,60 90,80 Q110,60 130,80 Q110,100 90,100 Q70,100 50,80 Z'
    ],
    colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3']
  },
  {
    id: 'coloring-music',
    disease: 'Síndrome de Williams',
    emoji: '🎵',
    title: 'Melodia da Alegria',
    message: 'Pessoas com Síndrome de Williams adoram música! Pinte essas notas musicais.',
    paths: [
      // Nota musical 1
      'M80,100 Q85,90 90,100 L90,180 Q95,185 90,190 Q85,185 80,180 L80,100 Z',
      // Nota musical 2
      'M140,120 Q145,110 150,120 L150,200 Q155,205 150,210 Q145,205 140,200 L140,120 Z',
      // Nota musical 3
      'M200,80 Q205,70 210,80 L210,160 Q215,165 210,170 Q205,165 200,160 L200,80 Z',
      // Clave de sol
      'M260,100 Q280,80 300,100 Q320,120 300,140 Q280,160 260,140 Q240,120 260,100 Z',
      // Pentagrama
      'M50,220 L320,220 M50,230 L320,230 M50,240 L320,240 M50,250 L320,250 M50,260 L320,260'
    ],
    colors: ['#FF1493', '#00CED1', '#FFD700', '#32CD32', '#FF4500', '#9370DB']
  }
];

interface ColoringGameProps {
  onBack: () => void;
}

const ColoringGame = ({ onBack }: ColoringGameProps) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#FF69B4');
  const [filledPaths, setFilledPaths] = useState<{ [key: string]: string }>({});
  const svgRef = useRef<SVGSVGElement>(null);

  const currentPage = coloringPages[currentPageIndex];

  useEffect(() => {
    trackPageView('coloring-game');
  }, []);

  useEffect(() => {
    setFilledPaths({});
    setSelectedColor(currentPage.colors[0]);
  }, [currentPageIndex]);

  const handlePathClick = (pathIndex: number) => {
    const pathKey = `${currentPage.id}-${pathIndex}`;
    setFilledPaths(prev => ({
      ...prev,
      [pathKey]: selectedColor
    }));
    
    trackEvent('coloring_path_filled', {
      disease: currentPage.disease,
      color: selectedColor,
      pathsColored: Object.keys(filledPaths).length + 1
    });
  };

  const clearColoring = () => {
    trackEvent('coloring_cleared', {
      disease: currentPage.disease,
      pathsColored: Object.keys(filledPaths).length
    });
    setFilledPaths({});
  };

  const downloadColoring = () => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const link = document.createElement('a');
      link.download = `colorindo-${currentPage.disease.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
  };

  const nextPage = () => {
    if (currentPageIndex < coloringPages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      setCurrentPageIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-4">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white bg-opacity-20 text-white rounded-full font-body hover:bg-opacity-30 transition-all"
        >
          ← Voltar ao Menu
        </button>

        {/* Header */}
        <div className="text-center mb-6 text-white">
          <h1 className="text-4xl font-heading font-bold mb-2">
            🎨 Colorir e Aprender 🎨
          </h1>
          <p className="text-xl font-body">
            Aprenda sobre doenças raras enquanto se diverte colorindo!
          </p>
        </div>

        {/* Page Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCurrentPageIndex((prev) => prev > 0 ? prev - 1 : coloringPages.length - 1)}
            className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-full font-body hover:bg-opacity-30 transition-all"
          >
            ← Anterior
          </button>
          
          <div className="text-center text-white">
            <div className="text-3xl mb-2">{currentPage.emoji}</div>
            <h2 className="text-2xl font-heading font-bold">{currentPage.title}</h2>
            <p className="text-sm font-body opacity-75">{currentPage.disease}</p>
          </div>
          
          <button
            onClick={() => setCurrentPageIndex((prev) => prev < coloringPages.length - 1 ? prev + 1 : 0)}
            className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-full font-body hover:bg-opacity-30 transition-all"
          >
            Próxima →
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Color Palette */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-lg font-heading font-bold text-gray-800 mb-4 text-center">
                🎨 Escolha sua cor
              </h3>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                {currentPage.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      w-12 h-12 rounded-full border-4 transition-all transform hover:scale-110
                      ${selectedColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'}
                    `}
                    style={{ backgroundColor: color }}
                    title={`Cor ${index + 1}`}
                  />
                ))}
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2 font-body">Cor selecionada:</p>
                <div 
                  className="w-full h-8 rounded-lg border-2 border-gray-300"
                  style={{ backgroundColor: selectedColor }}
                />
              </div>

              {/* Controls */}
              <div className="space-y-3">
                <button
                  onClick={clearColoring}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-full font-body font-medium hover:bg-red-600 transition-all"
                >
                  🗑️ Limpar Tudo
                </button>
                
                <button
                  onClick={downloadColoring}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-full font-body font-medium hover:bg-green-600 transition-all"
                >
                  📱 Salvar Desenho
                </button>
                
                <button
                  onClick={nextPage}
                  className="w-full px-4 py-2 bg-purple-500 text-white rounded-full font-body font-medium hover:bg-purple-600 transition-all"
                >
                  🎨 Próximo Desenho
                </button>
              </div>
            </div>
          </div>

          {/* Coloring Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-xl font-heading font-bold text-gray-800 mb-2">
                  {currentPage.title}
                </h3>
                <p className="text-gray-600 font-body">
                  {currentPage.message}
                </p>
                <p className="text-sm text-gray-500 font-body mt-2">
                  💡 Dica: Clique nas formas para colori-las!
                </p>
              </div>

              <div className="flex justify-center">
                <svg
                  ref={svgRef}
                  viewBox="0 0 400 280"
                  className="w-full max-w-md h-auto border border-gray-200 rounded-xl bg-gray-50"
                  style={{ aspectRatio: '400/280' }}
                >
                  {currentPage.paths.map((path, index) => (
                    <path
                      key={index}
                      d={path}
                      fill={filledPaths[`${currentPage.id}-${index}`] || '#ffffff'}
                      stroke="#333333"
                      strokeWidth="2"
                      className="cursor-pointer hover:stroke-4 transition-all"
                      onClick={() => handlePathClick(index)}
                    />
                  ))}
                </svg>
              </div>

              {/* Instructions */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-heading font-bold text-blue-800 mb-2">
                  📚 Você sabia?
                </h4>
                <div className="text-sm text-blue-700 font-body">
                  {currentPage.disease === 'Síndrome de Down' && (
                    <p>Pessoas com Síndrome de Down são carinhosas e fazem grandes amizades! Elas podem aprender muitas coisas e ter uma vida muito feliz.</p>
                  )}
                  {currentPage.disease === 'Transtorno do Espectro Autista' && (
                    <p>Cada pessoa com autismo é única e especial! Elas podem ter habilidades incríveis e ver o mundo de forma muito interessante.</p>
                  )}
                  {currentPage.disease === 'Síndrome de Williams' && (
                    <p>Pessoas com Síndrome de Williams são muito musicais e sociáveis! Elas adoram música e fazem amigos facilmente.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColoringGame;