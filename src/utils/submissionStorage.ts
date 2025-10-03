/**
 * Sistema de Armazenamento de Submissões de Conteúdo
 * 
 * Gerencia submissões localmente (LocalStorage) com suporte futuro para backend
 */

import type { ContentSubmission, ModerationResponse } from '../types/ContentSubmission';

const STORAGE_KEY = 'dr-infantil-submissions';
const STORAGE_STATS_KEY = 'dr-infantil-submission-stats';

/**
 * Salvar submissões no LocalStorage
 */
export const saveSubmissions = (submissions: ContentSubmission[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  } catch (error) {
    console.error('Erro ao salvar submissões:', error);
  }
};

/**
 * Carregar submissões do LocalStorage
 */
export const loadSubmissions = (): ContentSubmission[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const submissions = JSON.parse(data);
    // Converter dates de strings para Date objects
    return submissions.map((s: any) => ({
      ...s,
      timestamp: new Date(s.timestamp),
      submittedAt: new Date(s.submittedAt),
      reviewedAt: s.reviewedAt ? new Date(s.reviewedAt) : undefined,
    }));
  } catch (error) {
    console.error('Erro ao carregar submissões:', error);
    return [];
  }
};

/**
 * Adicionar nova submissão
 */
export const addSubmission = (
  submission: Omit<ContentSubmission, 'id' | 'timestamp' | 'status' | 'submittedAt'>
): ContentSubmission => {
  const submissions = loadSubmissions();
  
  const newSubmission: ContentSubmission = {
    ...submission,
    id: `submission-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
    submittedAt: new Date(),
    status: 'pending',
  };
  
  submissions.push(newSubmission);
  saveSubmissions(submissions);
  
  // Atualizar estatísticas
  updateStats('submitted');
  
  // Enviar notificação de email (simular)
  sendSubmissionConfirmationEmail(newSubmission);
  
  return newSubmission;
};

/**
 * Atualizar submissão existente
 */
export const updateSubmission = (id: string, updates: Partial<ContentSubmission>): boolean => {
  const submissions = loadSubmissions();
  const index = submissions.findIndex(s => s.id === id);
  
  if (index === -1) return false;
  
  submissions[index] = {
    ...submissions[index],
    ...updates,
  };
  
  saveSubmissions(submissions);
  return true;
};

/**
 * Moderar submissão
 */
export const moderateSubmission = (response: ModerationResponse): boolean => {
  const submissions = loadSubmissions();
  const submission = submissions.find(s => s.id === response.submissionId);
  
  if (!submission) return false;
  
  // Atualizar status baseado na decisão
  let newStatus: ContentSubmission['status'];
  switch (response.decision) {
    case 'approve':
      newStatus = 'approved';
      break;
    case 'reject':
      newStatus = 'rejected';
      break;
    case 'request-revision':
      newStatus = 'needs-revision';
      break;
    default:
      return false;
  }
  
  const updated = updateSubmission(response.submissionId, {
    status: newStatus,
    reviewedAt: response.moderatedAt,
    reviewedBy: response.moderatorId,
    reviewNotes: response.feedback,
  });
  
  if (updated) {
    // Enviar notificação ao submissor (simular)
    sendModerationNotificationEmail(submission, response);
    
    // Atualizar estatísticas
    updateStats(newStatus);
  }
  
  return updated;
};

/**
 * Deletar submissão
 */
export const deleteSubmission = (id: string): boolean => {
  const submissions = loadSubmissions();
  const filtered = submissions.filter(s => s.id !== id);
  
  if (filtered.length === submissions.length) return false;
  
  saveSubmissions(filtered);
  return true;
};

/**
 * Buscar submissões por filtros
 */
export const searchSubmissions = (filters: {
  status?: ContentSubmission['status'];
  contentType?: ContentSubmission['contentType'];
  submitterType?: ContentSubmission['submitter']['type'];
  searchTerm?: string;
  dateFrom?: Date;
  dateTo?: Date;
}): ContentSubmission[] => {
  let submissions = loadSubmissions();
  
  if (filters.status) {
    submissions = submissions.filter(s => s.status === filters.status);
  }
  
  if (filters.contentType) {
    submissions = submissions.filter(s => s.contentType === filters.contentType);
  }
  
  if (filters.submitterType) {
    submissions = submissions.filter(s => s.submitter.type === filters.submitterType);
  }
  
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    submissions = submissions.filter(s =>
      s.submitter.name.toLowerCase().includes(term) ||
      s.submitter.email.toLowerCase().includes(term) ||
      s.diseaseContent?.diseaseName?.toLowerCase().includes(term) ||
      s.storyContent?.title?.toLowerCase().includes(term) ||
      s.resourceContent?.title?.toLowerCase().includes(term)
    );
  }
  
  if (filters.dateFrom) {
    submissions = submissions.filter(s => s.submittedAt >= filters.dateFrom!);
  }
  
  if (filters.dateTo) {
    submissions = submissions.filter(s => s.submittedAt <= filters.dateTo!);
  }
  
  return submissions;
};

/**
 * Obter estatísticas de submissões
 */
export const getSubmissionStats = () => {
  const submissions = loadSubmissions();
  
  const byStatus = {
    pending: submissions.filter(s => s.status === 'pending').length,
    'under-review': submissions.filter(s => s.status === 'under-review').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
    'needs-revision': submissions.filter(s => s.status === 'needs-revision').length,
  };
  
  const byContentType = {
    'disease-info': submissions.filter(s => s.contentType === 'disease-info').length,
    story: submissions.filter(s => s.contentType === 'story').length,
    resource: submissions.filter(s => s.contentType === 'resource').length,
    'educational-game': submissions.filter(s => s.contentType === 'educational-game').length,
    video: submissions.filter(s => s.contentType === 'video').length,
    'support-group': submissions.filter(s => s.contentType === 'support-group').length,
    treatment: submissions.filter(s => s.contentType === 'treatment').length,
  };
  
  const bySubmitterType = {
    association: submissions.filter(s => s.submitter.type === 'association').length,
    'healthcare-professional': submissions.filter(s => s.submitter.type === 'healthcare-professional').length,
    parent: submissions.filter(s => s.submitter.type === 'parent').length,
    researcher: submissions.filter(s => s.submitter.type === 'researcher').length,
    other: submissions.filter(s => s.submitter.type === 'other').length,
  };
  
  // Calcular tempo médio de revisão
  const reviewed = submissions.filter(s => s.reviewedAt);
  const avgReviewTime = reviewed.length > 0
    ? reviewed.reduce((sum, s) => {
        const diff = s.reviewedAt!.getTime() - s.submittedAt.getTime();
        return sum + diff / (1000 * 60 * 60); // em horas
      }, 0) / reviewed.length
    : 0;
  
  // Taxa de aprovação
  const processed = submissions.filter(s => s.status === 'approved' || s.status === 'rejected');
  const approved = submissions.filter(s => s.status === 'approved');
  const approvalRate = processed.length > 0 ? (approved.length / processed.length) * 100 : 0;
  
  return {
    total: submissions.length,
    byStatus,
    byContentType,
    bySubmitterType,
    averageReviewTime: Math.round(avgReviewTime * 10) / 10,
    approvalRate: Math.round(approvalRate * 10) / 10,
  };
};

/**
 * Atualizar estatísticas globais
 */
const updateStats = (event: 'submitted' | ContentSubmission['status']) => {
  try {
    const stats = JSON.parse(localStorage.getItem(STORAGE_STATS_KEY) || '{}');
    
    if (event === 'submitted') {
      stats.totalSubmissions = (stats.totalSubmissions || 0) + 1;
    } else {
      stats[event] = (stats[event] || 0) + 1;
    }
    
    stats.lastUpdated = new Date().toISOString();
    
    localStorage.setItem(STORAGE_STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Erro ao atualizar estatísticas:', error);
  }
};

/**
 * Enviar email de confirmação de submissão (simulado)
 */
const sendSubmissionConfirmationEmail = (submission: ContentSubmission) => {
  console.log(`
    📧 Email enviado para: ${submission.submitter.email}
    
    Assunto: Submissão Recebida - DR Infantil
    
    Olá ${submission.submitter.name}!
    
    Recebemos sua submissão de conteúdo do tipo "${submission.contentType}".
    
    ID da submissão: ${submission.id}
    Data: ${submission.submittedAt.toLocaleDateString('pt-BR')}
    
    Nosso time revisará seu conteúdo em até 14 dias. Você receberá um email
    assim que houver uma atualização.
    
    Obrigado por contribuir com nossa comunidade! 💜
    
    Equipe DR Infantil
  `);
  
  // TODO: Implementar envio real de email quando backend estiver pronto
};

/**
 * Enviar email de notificação de moderação (simulado)
 */
const sendModerationNotificationEmail = (
  submission: ContentSubmission,
  response: ModerationResponse
) => {
  let subject = '';
  let message = '';
  
  switch (response.decision) {
    case 'approve':
      subject = '✅ Sua submissão foi aprovada!';
      message = `
        Parabéns ${submission.submitter.name}!
        
        Sua submissão "${submission.diseaseContent?.diseaseName || submission.storyContent?.title || 'Sem título'}"
        foi aprovada e já está disponível no site.
        
        ${response.feedback}
        
        Obrigado por contribuir! Você está ajudando milhares de famílias.
      `;
      break;
      
    case 'reject':
      subject = '❌ Sua submissão não foi aprovada';
      message = `
        Olá ${submission.submitter.name},
        
        Infelizmente sua submissão não foi aprovada desta vez.
        
        Motivo: ${response.feedback}
        
        Você pode fazer ajustes e enviar novamente. Estamos aqui para ajudar!
      `;
      break;
      
    case 'request-revision':
      subject = '🔄 Sua submissão precisa de revisão';
      message = `
        Olá ${submission.submitter.name},
        
        Sua submissão está quase pronta! Precisamos apenas de alguns ajustes:
        
        ${response.feedback}
        
        ${response.suggestedEdits ? '\nSugestões:\n' + response.suggestedEdits.join('\n') : ''}
        
        Por favor, faça as revisões e envie novamente.
      `;
      break;
  }
  
  console.log(`
    📧 Email enviado para: ${submission.submitter.email}
    Assunto: ${subject}
    
    ${message}
  `);
  
  // TODO: Implementar envio real de email quando backend estiver pronto
};

/**
 * Exportar submissões para backup/análise
 */
export const exportSubmissions = (): string => {
  const submissions = loadSubmissions();
  const stats = getSubmissionStats();
  
  const exportData = {
    exportDate: new Date().toISOString(),
    version: '1.0',
    stats,
    submissions,
  };
  
  return JSON.stringify(exportData, null, 2);
};

/**
 * Importar submissões de backup
 */
export const importSubmissions = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    if (!data.submissions || !Array.isArray(data.submissions)) {
      throw new Error('Formato inválido');
    }
    
    saveSubmissions(data.submissions);
    return true;
  } catch (error) {
    console.error('Erro ao importar submissões:', error);
    return false;
  }
};

/**
 * Limpar todas as submissões (usar com cuidado!)
 */
export const clearAllSubmissions = (): void => {
  if (confirm('⚠️ Tem certeza? Esta ação não pode ser desfeita!')) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_STATS_KEY);
  }
};
