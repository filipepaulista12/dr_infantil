import React, { useState, useEffect } from 'react';
import {
  CheckCircle, XCircle, Clock, AlertTriangle, Eye,
  Filter, Search, ChevronDown, ChevronUp, FileText,
  Heart, BookOpen, Video, User, Building, Shield
} from 'lucide-react';
import type { ContentSubmission, SubmissionStatus, ModerationResponse } from '../../types/ContentSubmission';

interface Props {
  submissions: ContentSubmission[];
  onModerate: (submissionId: string, decision: ModerationResponse) => void;
}

const ModerationPanel: React.FC<Props> = ({ submissions, onModerate }) => {
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContentSubmission[]>(submissions);
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Filtrar submissões
  useEffect(() => {
    let filtered = submissions;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(s => s.status === statusFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.submitter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.diseaseContent?.diseaseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.storyContent?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredSubmissions(filtered);
  }, [submissions, statusFilter, searchTerm]);
  
  const getStatusBadge = (status: SubmissionStatus) => {
    const badges = {
      'pending': { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: Clock, label: 'Pendente' },
      'under-review': { color: 'bg-blue-100 text-blue-800 border-blue-300', icon: Eye, label: 'Em Revisão' },
      'approved': { color: 'bg-green-100 text-green-800 border-green-300', icon: CheckCircle, label: 'Aprovado' },
      'rejected': { color: 'bg-red-100 text-red-800 border-red-300', icon: XCircle, label: 'Rejeitado' },
      'needs-revision': { color: 'bg-orange-100 text-orange-800 border-orange-300', icon: AlertTriangle, label: 'Precisa Revisão' },
    };
    
    const badge = badges[status];
    const Icon = badge.icon;
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 flex items-center gap-2 ${badge.color}`}>
        <Icon className="w-4 h-4" />
        {badge.label}
      </span>
    );
  };
  
  const getContentTypeIcon = (type: string) => {
    const icons = {
      'disease-info': FileText,
      'story': Heart,
      'resource': BookOpen,
      'video': Video,
    };
    return icons[type as keyof typeof icons] || FileText;
  };
  
  const getSubmitterIcon = (type: string) => {
    if (type === 'association' || type === 'healthcare-professional') {
      return Shield;
    }
    if (type === 'association') {
      return Building;
    }
    return User;
  };
  
  const handleApprove = (submissionId: string) => {
    const feedback = prompt('Mensagem de aprovação (opcional):');
    if (feedback !== null) {
      onModerate(submissionId, {
        submissionId,
        decision: 'approve',
        feedback: feedback || 'Conteúdo aprovado!',
        moderatorId: 'moderator-1', // TODO: Get from auth
        moderatedAt: new Date(),
      });
    }
  };
  
  const handleReject = (submissionId: string) => {
    const feedback = prompt('Motivo da rejeição (obrigatório):');
    if (feedback) {
      onModerate(submissionId, {
        submissionId,
        decision: 'reject',
        feedback,
        moderatorId: 'moderator-1',
        moderatedAt: new Date(),
      });
    } else {
      alert('Você precisa informar o motivo da rejeição.');
    }
  };
  
  const handleRequestRevision = (submissionId: string) => {
    const feedback = prompt('O que precisa ser revisado?');
    if (feedback) {
      onModerate(submissionId, {
        submissionId,
        decision: 'request-revision',
        feedback,
        suggestedEdits: feedback.split('\n'),
        moderatorId: 'moderator-1',
        moderatedAt: new Date(),
      });
    }
  };
  
  const renderQualityFlags = (submission: ContentSubmission) => (
    <div className="flex flex-wrap gap-2 mt-3">
      {submission.flags.hasScientificReferences && (
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
          📚 Tem Referências
        </span>
      )}
      {submission.flags.hasMultipleLevels && (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
          📊 Múltiplos Níveis
        </span>
      )}
      {submission.flags.hasSupportResources && (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
          🏥 Recursos de Apoio
        </span>
      )}
      {submission.flags.isFromVerifiedSource && (
        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs font-medium">
          ✓ Fonte Verificada
        </span>
      )}
    </div>
  );
  
  const renderSubmissionDetail = (submission: ContentSubmission) => {
    const ContentIcon = getContentTypeIcon(submission.contentType);
    const SubmitterIcon = getSubmitterIcon(submission.submitter.type);
    
    return (
      <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b-2 border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <ContentIcon className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {submission.diseaseContent?.diseaseName || 
                   submission.storyContent?.title || 
                   submission.resourceContent?.title ||
                   'Submissão sem título'}
                </h3>
                <p className="text-sm text-gray-600 capitalize">
                  {submission.contentType.replace('-', ' ')}
                </p>
              </div>
            </div>
            {getStatusBadge(submission.status)}
          </div>
          
          {/* Submitter info */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <SubmitterIcon className="w-5 h-5 text-gray-600 mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-800">{submission.submitter.name}</span>
                  {submission.flags.isFromVerifiedSource && (
                    <span title="Fonte Verificada">
                      <Shield className="w-4 h-4 text-blue-500" />
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{submission.submitter.email}</p>
                {submission.submitter.organization && (
                  <p className="text-sm text-gray-600">{submission.submitter.organization}</p>
                )}
                {submission.submitter.credentials && (
                  <p className="text-sm text-purple-600 font-medium">{submission.submitter.credentials}</p>
                )}
              </div>
            </div>
          </div>
          
          {renderQualityFlags(submission)}
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Disease Content */}
          {submission.diseaseContent && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Categoria</h4>
                <p className="text-gray-600 capitalize">{submission.diseaseContent.category}</p>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Descrições</h4>
                <div className="space-y-3">
                  {submission.diseaseContent.descriptions.forChildren && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-sm font-semibold text-green-800 mb-2">🌟 Para Crianças:</p>
                      <p className="text-gray-700 text-sm">{submission.diseaseContent.descriptions.forChildren}</p>
                    </div>
                  )}
                  
                  {submission.diseaseContent.descriptions.forParents && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm font-semibold text-blue-800 mb-2">💙 Para Pais:</p>
                      <p className="text-gray-700 text-sm">{submission.diseaseContent.descriptions.forParents}</p>
                    </div>
                  )}
                  
                  {submission.diseaseContent.descriptions.scientific && (
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <p className="text-sm font-semibold text-purple-800 mb-2">🔬 Científica:</p>
                      <p className="text-gray-700 text-sm">{submission.diseaseContent.descriptions.scientific}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {submission.diseaseContent.references && submission.diseaseContent.references.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Referências Científicas</h4>
                  <ul className="space-y-2">
                    {submission.diseaseContent.references.map((ref, i) => (
                      <li key={i} className="text-sm text-gray-700 bg-gray-50 p-3 rounded border border-gray-200">
                        <p className="font-medium">{ref.title}</p>
                        {ref.authors && <p className="text-gray-600 text-xs">{ref.authors}</p>}
                        {ref.url && (
                          <a href={ref.url} target="_blank" rel="noopener noreferrer" 
                             className="text-purple-600 hover:underline text-xs">
                            {ref.url}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {/* Story Content */}
          {submission.storyContent && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Doença Relacionada</h4>
                <p className="text-gray-600">{submission.storyContent.disease}</p>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Relação do Autor</h4>
                <p className="text-gray-600 capitalize">{submission.storyContent.authorRelation}</p>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 mb-2">História</h4>
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                  <p className="text-gray-700 whitespace-pre-line">{submission.storyContent.content.text}</p>
                </div>
              </div>
              
              {submission.storyContent.message && (
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Mensagem Final</h4>
                  <p className="text-gray-700 italic">{submission.storyContent.message}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Consent info */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">Consentimentos</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Conteúdo original: {submission.consent.originalContent ? 'Sim' : 'Não'}</li>
              <li>✓ Precisão confirmada: {submission.consent.accuracyConfirmation ? 'Sim' : 'Não'}</li>
              <li>✓ Privacidade: {submission.consent.privacyAgreement ? 'Sim' : 'Não'}</li>
              <li>✓ Licença: {submission.consent.contentLicense}</li>
            </ul>
          </div>
          
          {/* Review notes */}
          {submission.reviewNotes && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-bold text-yellow-800 mb-2">Notas de Revisão</h4>
              <p className="text-gray-700 text-sm">{submission.reviewNotes}</p>
            </div>
          )}
        </div>
        
        {/* Actions */}
        {submission.status === 'pending' || submission.status === 'under-review' && (
          <div className="bg-gray-50 p-6 border-t-2 border-gray-200 flex gap-3 justify-end">
            <button
              onClick={() => handleReject(submission.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <XCircle className="w-5 h-5" />
              Rejeitar
            </button>
            <button
              onClick={() => handleRequestRevision(submission.id)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <AlertTriangle className="w-5 h-5" />
              Solicitar Revisão
            </button>
            <button
              onClick={() => handleApprove(submission.id)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Aprovar
            </button>
          </div>
        )}
      </div>
    );
  };
  
  // Stats
  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    underReview: submissions.filter(s => s.status === 'under-review').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
    needsRevision: submissions.filter(s => s.status === 'needs-revision').length,
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Painel de Moderação</h1>
          <p className="text-gray-600">Revise e aprove submissões da comunidade</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border-2 border-gray-200 text-center">
            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200 text-center">
            <p className="text-3xl font-bold text-yellow-800">{stats.pending}</p>
            <p className="text-sm text-yellow-700">Pendentes</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200 text-center">
            <p className="text-3xl font-bold text-blue-800">{stats.underReview}</p>
            <p className="text-sm text-blue-700">Em Revisão</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200 text-center">
            <p className="text-3xl font-bold text-green-800">{stats.approved}</p>
            <p className="text-sm text-green-700">Aprovados</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-200 text-center">
            <p className="text-3xl font-bold text-orange-800">{stats.needsRevision}</p>
            <p className="text-sm text-orange-700">Revisão</p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border-2 border-red-200 text-center">
            <p className="text-3xl font-bold text-red-800">{stats.rejected}</p>
            <p className="text-sm text-red-700">Rejeitados</p>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-2" />
                Filtrar por Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              >
                <option value="all">Todos</option>
                <option value="pending">Pendentes</option>
                <option value="under-review">Em Revisão</option>
                <option value="approved">Aprovados</option>
                <option value="needs-revision">Precisam Revisão</option>
                <option value="rejected">Rejeitados</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-2" />
                Buscar
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nome do submissor ou doença..."
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
        
        {/* Submissions List */}
        <div className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <div className="bg-white p-12 rounded-xl border-2 border-gray-200 text-center">
              <p className="text-gray-600 text-lg">Nenhuma submissão encontrada</p>
            </div>
          ) : (
            filteredSubmissions.map(submission => (
              <div key={submission.id}>
                {expandedId === submission.id ? (
                  <div>
                    {renderSubmissionDetail(submission)}
                    <button
                      onClick={() => setExpandedId(null)}
                      className="w-full mt-2 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                    >
                      <ChevronUp className="w-5 h-5" />
                      Fechar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setExpandedId(submission.id)}
                    className="w-full bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {React.createElement(getContentTypeIcon(submission.contentType), {
                          className: 'w-8 h-8 text-purple-500'
                        })}
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 mb-1">
                            {submission.diseaseContent?.diseaseName || 
                             submission.storyContent?.title || 
                             'Sem título'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Por {submission.submitter.name} • {new Date(submission.submittedAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(submission.status)}
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      </div>
                    </div>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ModerationPanel;
