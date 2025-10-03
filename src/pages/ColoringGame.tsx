import { useState, useEffect } from 'react';
import { Palette, RotateCcw, Download, Sparkles } from 'lucide-react';
import { trackPageView, trackEvent } from '../utils/analytics';

interface ColoringPage {
  id: number;
  emoji: string;
  title: string;
  description: string;
  svgPaths: string[];
}

const coloringPages: ColoringPage[] = [
  {
    id: 1,
    emoji: '💖',
    title: 'Coração Especial',
    description: 'Um coração cheio de amor e cuidado para todas as pessoas especiais',
    svgPaths: [
      'M100,180 C100,180 20,100 20,60 C20,30 40,10 70,10 C85,10 100,20 100,20 C100,20 115,10 130,10 C160,10 180,30 180,60 C180,100 100,180 100,180 Z',
      'M70,40 C75,35 85,35 90,40 C95,45 90,55 85,50 C80,45 75,45 70,40 Z',
      'M110,40 C115,35 125,35 130,40 C135,45 130,55 125,50 C120,45 115,45 110,40 Z'
    ]
  },
  {
    id: 2,
    emoji: '🌈',
    title: 'Arco-íris da Inclusão',
    description: 'Cada cor representa uma pessoa única e especial',
    svgPaths: [
      'M20,150 Q100,50 180,150',
      'M30,150 Q100,70 170,150',
      'M40,150 Q100,90 160,150',
      'M50,150 Q100,110 150,150'
    ]
  },
  {
    id: 3,
    emoji: '🌟',
    title: 'Estrela Brilhante',
    description: 'Cada criança é uma estrela que brilha de forma única',
    svgPaths: [
      'M100,20 L115,70 L170,70 L125,105 L145,155 L100,120 L55,155 L75,105 L30,70 L85,70 Z',
      'M100,60 L105,80 L125,80 L110,90 L115,110 L100,95 L85,110 L90,90 L75,80 L95,80 Z'
    ]
  },
  {
    id: 4,
    emoji: '🦋',
    title: 'Borboleta da Transformação',
    description: 'Crescer e transformar-se é parte da vida de todos',
    svgPaths: [
      'M100,100 Q80,60 50,70 Q30,80 40,110 Q50,140 100,120',
      'M100,100 Q120,60 150,70 Q170,80 160,110 Q150,140 100,120',
      'M95,100 L105,100 L105,150 L95,150 Z'
    ]
  },
  {
    id: 5,
    emoji: '🌻',
    title: 'Flor da Diversidade',
    description: 'Diferentes pétalas, uma única flor maravilhosa',
    svgPaths: [
      'M100,50 Q90,40 100,30 Q110,40 100,50',
      'M120,60 Q130,50 140,60 Q130,70 120,60',
      'M130,85 Q140,85 140,95 Q130,95 130,85',
      'M120,110 Q130,120 120,130 Q110,120 120,110',
      'M100,120 Q90,130 80,120 Q90,110 100,120',
      'M70,110 Q60,110 60,100 Q70,100 70,110',
      'M70,85 Q60,85 60,75 Q70,75 70,85',
      'M80,60 Q70,50 80,40 Q90,50 80,60',
      'M100,80 C100,80 90,90 100,100 C110,90 100,80 100,80'
    ]
  }
];

const colorPalette = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
];

export default function ColoringGame() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colorPalette[0]);
  const [pathColors, setPathColors] = useState<{ [key: number]: string }>({});
  const [customColor, setCustomColor] = useState('#FF6B6B');

  const currentPage = coloringPages[currentPageIndex];

  // Track page view
  useEffect(() => {
    trackPageView('coloring-game');
  }, []);

  const handlePathClick = (pathIndex: number) => {
    setPathColors({
      ...pathColors,
      [pathIndex]: selectedColor
    });
    trackEvent('coloring_path_filled', {
      pageId: currentPage.id,
      pathIndex,
      color: selectedColor
    });
  };

  const handleClear = () => {
    setPathColors({});
    trackEvent('coloring_cleared', {
      pageId: currentPage.id
    });
  };

  const handleDownload = () => {
    const svg = document.getElementById('coloring-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `colorir-${currentPage.title.toLowerCase()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleNextPage = () => {
    if (currentPageIndex < coloringPages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      setPathColors({});
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      setPathColors({});
    }
  };

  const getFilledPercentage = () => {
    const totalPaths = currentPage.svgPaths.length;
    const filledPaths = Object.keys(pathColors).length;
    return Math.round((filledPaths / totalPaths) * 100);
  };

  const filledPercentage = getFilledPercentage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🎨 Atividade de Colorir - Diversidade e Inclusão 🎨
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Expresse sua criatividade colorindo desenhos que celebram as diferenças!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Painel de Controles */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Palette className="text-purple-500" />
                  Paleta de Cores
                </h3>

                {/* Paleta de cores */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {colorPalette.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-4 transition-all duration-200 transform hover:scale-110 ${
                        selectedColor === color
                          ? 'border-gray-800 shadow-lg scale-110'
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>

                {/* Cor personalizada */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor Personalizada
                  </label>
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      setSelectedColor(e.target.value);
                    }}
                    className="w-full h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                  />
                </div>

                {/* Botões de ação */}
                <div className="space-y-3">
                  <button
                    onClick={handleClear}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={20} />
                    Limpar Desenho
                  </button>

                  <button
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Download size={20} />
                    Baixar Desenho
                  </button>
                </div>

                {/* Progresso */}
                <div className="mt-6 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">🌟</div>
                  <p className="text-sm font-medium text-gray-700">
                    {filledPercentage === 0
                      ? 'Comece a colorir! ✨'
                      : filledPercentage < 50
                      ? 'Continue assim! 🎨'
                      : filledPercentage < 100
                      ? 'Está quase lá! 🌈'
                      : 'Perfeito! Lindo trabalho! 🎉'}
                  </p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${filledPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{filledPercentage}% completo</p>
                </div>
              </div>
            </div>

            {/* Área de Colorir */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                {/* Navegação */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPageIndex === 0}
                    className={`py-2 px-4 rounded-lg transition-colors flex items-center gap-2 ${
                      currentPageIndex === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    ← Anterior
                  </button>

                  <div className="text-center">
                    <div className="text-4xl mb-2">{currentPage.emoji}</div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {currentPage.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Página {currentPageIndex + 1} de {coloringPages.length}
                    </p>
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPageIndex === coloringPages.length - 1}
                    className={`py-2 px-4 rounded-lg transition-colors flex items-center gap-2 ${
                      currentPageIndex === coloringPages.length - 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    Próxima →
                  </button>
                </div>

                {/* Descrição */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6 text-center">
                  <p className="text-gray-700 font-medium">{currentPage.description}</p>
                </div>

                {/* SVG para colorir */}
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-50 rounded-xl p-8 shadow-inner">
                    <svg
                      id="coloring-svg"
                      viewBox="0 0 200 200"
                      className="w-80 h-80 border-2 border-gray-200 rounded-lg bg-white cursor-pointer"
                      style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
                    >
                      {currentPage.svgPaths.map((path, index) => (
                        <path
                          key={index}
                          d={path}
                          fill={pathColors[index] || 'white'}
                          stroke="#333"
                          strokeWidth="2"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          onClick={() => handlePathClick(index)}
                          className="hover:stroke-4 transition-all duration-200 cursor-pointer"
                          style={{
                            filter: pathColors[index]
                              ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                              : 'none'
                          }}
                        />
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Instruções */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border-l-4 border-green-400">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Sparkles className="text-green-500" size={20} />
                    Como Colorir:
                  </h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Escolha uma cor na paleta ao lado</li>
                    <li>• Clique nas áreas do desenho para colorir</li>
                    <li>• Use cores diferentes para cada parte</li>
                    <li>• Seja criativo e divirta-se!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Mensagem Especial */}
          <div className="mt-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 text-center">
            <div className="flex justify-center gap-4 mb-4">
              <span className="text-3xl">💖</span>
              <span className="text-3xl">⭐</span>
              <span className="text-3xl">💜</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mensagem Especial 💝</h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Assim como você usa diferentes cores para criar algo lindo, as pessoas também são
              diferentes e únicas, cada uma com suas próprias características especiais. Quando
              respeitamos e celebramos essas diferenças, criamos um mundo mais colorido e bonito
              para todos! 🌈
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
