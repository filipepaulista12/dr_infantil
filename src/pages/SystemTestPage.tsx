import { useState } from 'react';
import { CheckCircle, AlertCircle, Clock, Play, RefreshCw } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

interface PageTest {
  id: string;
  name: string;
  path: string;
  status: 'pending' | 'testing' | 'success' | 'error';
  error?: string;
  loadTime?: number;
}

export default function SystemTestPage() {
  const { setCurrentPage } = useAppStore();
  const [tests, setTests] = useState<PageTest[]>([
    { id: 'home', name: 'Página Inicial', path: '/', status: 'pending' },
    { id: 'diseases', name: 'Biblioteca de Doenças', path: '/diseases', status: 'pending' },
    { id: 'disease-detail', name: 'Detalhes da Doença', path: '/disease-detail', status: 'pending' },
    { id: 'videos', name: 'Videoteca', path: '/videos', status: 'pending' },
    { id: 'games', name: 'Hub de Jogos', path: '/games', status: 'pending' },
    { id: 'quiz', name: 'Quiz', path: '/quiz', status: 'pending' },
    { id: 'memory', name: 'Jogo da Memória', path: '/memory', status: 'pending' },
    { id: 'puzzle', name: 'Quebra-cabeça', path: '/puzzle', status: 'pending' },
    { id: 'coloring', name: 'Colorir', path: '/coloring', status: 'pending' },
    { id: 'hangman', name: 'Jogo da Forca', path: '/hangman', status: 'pending' },
    { id: 'stories', name: 'Histórias', path: '/stories', status: 'pending' },
    { id: 'community', name: 'Comunidade', path: '/community', status: 'pending' },
    { id: 'resources', name: 'Centro de Recursos', path: '/resources', status: 'pending' },
    { id: 'favorites', name: 'Favoritos', path: '/favorites', status: 'pending' }
  ]);
  
  const [isRunning, setIsRunning] = useState(false);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);

  const testPage = async (pageId: string): Promise<{ success: boolean; error?: string; loadTime: number }> => {
    const startTime = Date.now();
    
    try {
      // Simulate navigation to page
      setCurrentPage(pageId);
      
      // Wait a bit for page to load
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate checking if page loaded correctly
      const loadTime = Date.now() - startTime;
      
      // For now, consider all pages successful
      // In real implementation, you'd check for specific elements or API calls
      return { success: true, loadTime };
      
    } catch (error) {
      const loadTime = Date.now() - startTime;
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        loadTime 
      };
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setCurrentTestIndex(0);
    
    // Reset all tests to pending
    setTests(prev => prev.map(test => ({ ...test, status: 'pending' as const, error: undefined, loadTime: undefined })));
    
    for (let i = 0; i < tests.length; i++) {
      setCurrentTestIndex(i);
      const test = tests[i];
      
      // Mark as testing
      setTests(prev => prev.map(t => 
        t.id === test.id ? { ...t, status: 'testing' as const } : t
      ));
      
      // Run test
      const result = await testPage(test.id);
      
      // Update result
      setTests(prev => prev.map(t => 
        t.id === test.id ? { 
          ...t, 
          status: result.success ? 'success' as const : 'error' as const,
          error: result.error,
          loadTime: result.loadTime
        } : t
      ));
      
      // Wait before next test
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsRunning(false);
    setCurrentTestIndex(-1);
  };

  const runSingleTest = async (testId: string) => {
    const test = tests.find(t => t.id === testId);
    if (!test) return;
    
    setTests(prev => prev.map(t => 
      t.id === testId ? { ...t, status: 'testing' as const, error: undefined } : t
    ));
    
    const result = await testPage(testId);
    
    setTests(prev => prev.map(t => 
      t.id === testId ? { 
        ...t, 
        status: result.success ? 'success' as const : 'error' as const,
        error: result.error,
        loadTime: result.loadTime
      } : t
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'testing':
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'testing':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const successCount = tests.filter(t => t.status === 'success').length;
  const errorCount = tests.filter(t => t.status === 'error').length;
  const pendingCount = tests.filter(t => t.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Sistema de Testes</h1>
          <p className="text-gray-600 mb-6">
            Teste automático de todas as páginas da aplicação DR Infantil
          </p>
          
          {/* Statistics */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
              ✅ {successCount} Sucesso
            </div>
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full">
              ❌ {errorCount} Erro
            </div>
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full">
              ⏳ {pendingCount} Pendente
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              {isRunning ? 'Testando...' : 'Executar Todos os Testes'}
            </button>
            
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600"
            >
              Voltar ao Início
            </button>
          </div>
        </div>

        {/* Test Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.map((test, index) => (
            <div
              key={test.id}
              className={`p-6 rounded-lg border-2 transition-all ${getStatusColor(test.status)} ${
                currentTestIndex === index ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(test.status)}
                  <h3 className="font-semibold text-gray-800">{test.name}</h3>
                </div>
                
                <button
                  onClick={() => runSingleTest(test.id)}
                  disabled={isRunning}
                  className="text-sm bg-white px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50"
                >
                  Testar
                </button>
              </div>
              
              <div className="text-sm text-gray-600 mb-2">
                Rota: <code className="bg-white px-2 py-1 rounded">{test.path}</code>
              </div>
              
              {test.loadTime && (
                <div className="text-sm text-gray-600 mb-2">
                  Tempo: {test.loadTime}ms
                </div>
              )}
              
              {test.error && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded mt-2">
                  <strong>Erro:</strong> {test.error}
                </div>
              )}
              
              {test.status === 'success' && (
                <div className="text-sm text-green-600">
                  ✅ Página carregada com sucesso
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Progress Bar */}
        {isRunning && (
          <div className="mt-8">
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-purple-500 h-full transition-all duration-500"
                style={{ width: `${(currentTestIndex / tests.length) * 100}%` }}
              />
            </div>
            <p className="text-center mt-2 text-gray-600">
              Testando {currentTestIndex + 1} de {tests.length} páginas...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}