import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Activity, Download, Trash2, RefreshCw } from 'lucide-react';
import { getMetricsSnapshot, resetMetrics, type MetricsSnapshot } from '../utils/analytics';

export default function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState<MetricsSnapshot | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'events' | 'pages'>('overview');

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = () => {
    const data = getMetricsSnapshot();
    setMetrics(data);
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados de analytics? Esta ação não pode ser desfeita.')) {
      resetMetrics();
      loadMetrics();
    }
  };

  const handleDownload = () => {
    if (!metrics) return;
    
    const dataStr = JSON.stringify(metrics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!metrics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando métricas...</p>
        </div>
      </div>
    );
  }

  const totalPageViews = Object.values(metrics.pageViews).reduce((a, b) => a + b, 0);
  const totalEvents = Object.values(metrics.eventCounts).reduce((a, b) => a + b, 0);
  const uniquePages = Object.keys(metrics.pageViews).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <BarChart3 className="w-10 h-10" />
                Dashboard de Analytics
              </h1>
              <p className="text-purple-100 text-lg">
                Acompanhe o engajamento e uso da plataforma
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={loadMetrics}
                className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg flex items-center gap-2 transition-all"
                aria-label="Atualizar métricas"
              >
                <RefreshCw className="w-5 h-5" />
                Atualizar
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg flex items-center gap-2 transition-all"
                aria-label="Baixar dados"
              >
                <Download className="w-5 h-5" />
                Baixar
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center gap-2 transition-all"
                aria-label="Limpar dados"
              >
                <Trash2 className="w-5 h-5" />
                Limpar
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total de Visualizações</p>
                <p className="text-3xl font-bold text-gray-800">{totalPageViews}</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-full">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total de Eventos</p>
                <p className="text-3xl font-bold text-gray-800">{totalEvents}</p>
              </div>
              <div className="bg-pink-100 p-4 rounded-full">
                <Activity className="w-8 h-8 text-pink-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Páginas Únicas</p>
                <p className="text-3xl font-bold text-gray-800">{uniquePages}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex gap-4 px-6">
              <button
                onClick={() => setSelectedTab('overview')}
                className={`py-4 px-6 border-b-2 font-semibold transition-colors ${
                  selectedTab === 'overview'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Visão Geral
              </button>
              <button
                onClick={() => setSelectedTab('pages')}
                className={`py-4 px-6 border-b-2 font-semibold transition-colors ${
                  selectedTab === 'pages'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Páginas
              </button>
              <button
                onClick={() => setSelectedTab('events')}
                className={`py-4 px-6 border-b-2 font-semibold transition-colors ${
                  selectedTab === 'events'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Eventos
              </button>
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Top 5 Páginas Mais Visitadas</h3>
                  <div className="space-y-3">
                    {Object.entries(metrics.pageViews)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 5)
                      .map(([page, views]) => {
                        const percentage = (views / totalPageViews) * 100;
                        return (
                          <div key={page} className="flex items-center gap-4">
                            <div className="w-32 font-medium text-gray-700 capitalize">
                              {page.replace(/-/g, ' ')}
                            </div>
                            <div className="flex-1">
                              <div className="bg-gray-200 rounded-full h-8 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full flex items-center px-3 text-white text-sm font-semibold transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                >
                                  {percentage.toFixed(1)}%
                                </div>
                              </div>
                            </div>
                            <div className="w-16 text-right font-bold text-gray-800">{views}</div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Top 5 Eventos Mais Frequentes</h3>
                  <div className="space-y-3">
                    {Object.entries(metrics.eventCounts)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 5)
                      .map(([event, count]) => {
                        const percentage = (count / totalEvents) * 100;
                        return (
                          <div key={event} className="flex items-center gap-4">
                            <div className="w-48 font-medium text-gray-700 text-sm">
                              {event.replace(/_/g, ' ')}
                            </div>
                            <div className="flex-1">
                              <div className="bg-gray-200 rounded-full h-8 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full flex items-center px-3 text-white text-sm font-semibold transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                >
                                  {percentage.toFixed(1)}%
                                </div>
                              </div>
                            </div>
                            <div className="w-16 text-right font-bold text-gray-800">{count}</div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'pages' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Todas as Páginas</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Página
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Visualizações
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          % do Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(metrics.pageViews)
                        .sort(([, a], [, b]) => b - a)
                        .map(([page, views]) => (
                          <tr key={page} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                              {page.replace(/-/g, ' ')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                              {views}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                              {((views / totalPageViews) * 100).toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === 'events' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Eventos Recentes</h3>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {metrics.recentEvents.slice(0, 50).map((event, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-semibold text-gray-800">{event.name.replace(/_/g, ' ')}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(event.timestamp).toLocaleString('pt-BR')}
                        </div>
                      </div>
                      {event.payload && Object.keys(event.payload).length > 0 && (
                        <div className="text-sm text-gray-600">
                          <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                            {JSON.stringify(event.payload, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-600">
          <p className="text-sm">
            Última atualização: {new Date(metrics.lastUpdated).toLocaleString('pt-BR')}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Os dados são armazenados localmente no navegador e não são enviados para servidores externos.
          </p>
        </div>
      </div>
    </div>
  );
}
