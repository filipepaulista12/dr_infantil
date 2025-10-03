/**
 * Tipos para o Sistema de Submissão de Conteúdo Comunitário
 * Permite que associações, profissionais de saúde e famílias contribuam com conteúdo
 */

export type SubmissionStatus = 'pending' | 'under-review' | 'approved' | 'rejected' | 'needs-revision';
export type SubmitterType = 'association' | 'healthcare-professional' | 'parent' | 'researcher' | 'other';
export type ContentCategory = 'disease-info' | 'treatment' | 'story' | 'resource' | 'educational-game' | 'video' | 'support-group';

/**
 * Informações sobre quem está submetendo o conteúdo
 */
export interface Submitter {
  name: string;
  email: string;
  type: SubmitterType;
  organization?: string; // Nome da associação, hospital, etc.
  credentials?: string; // CRM, CREFITO, etc. (se profissional)
  phone?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

/**
 * Estrutura de conteúdo sobre doenças
 */
export interface DiseaseContentSubmission {
  // Identificação
  diseaseName: string;
  alternativeNames?: string[];
  emoji?: string;
  category: 'neurological' | 'genetic' | 'metabolic' | 'autoimmune' | 'rare' | 'developmental' | 'other';
  
  // Descrições em múltiplos níveis
  descriptions: {
    forChildren?: string; // 6-10 anos
    forTeens?: string; // 11-17 anos
    forParents?: string; // Pais e cuidadores
    scientific?: string; // Profissionais de saúde
  };
  
  // Informações médicas
  medicalInfo?: {
    icdCode?: string;
    prevalence?: string;
    onset?: string;
    inheritance?: string;
    symptoms?: string[];
    diagnosis?: string;
    prognosis?: string;
  };
  
  // Características
  characteristics?: {
    physical?: string[];
    cognitive?: string[];
    behavioral?: string[];
    developmental?: string[];
  };
  
  // Tratamentos
  treatments?: {
    medical?: string[];
    therapeutic?: string[];
    educational?: string[];
    daily?: string[];
  };
  
  // Suporte e recursos
  support?: {
    hospitals?: Array<{
      name: string;
      city: string;
      phone?: string;
      website?: string;
    }>;
    associations?: Array<{
      name: string;
      description: string;
      website?: string;
      contact?: string;
    }>;
    governmentPrograms?: Array<{
      name: string;
      description: string;
      eligibility?: string;
    }>;
  };
  
  // Recursos educacionais
  educational?: {
    forTeachers?: string[];
    forParents?: string[];
    activities?: string[];
    books?: string[];
    videos?: string[];
  };
  
  // FAQs
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  
  // Referências científicas
  references?: Array<{
    title: string;
    authors?: string;
    journal?: string;
    year?: number;
    doi?: string;
    url?: string;
  }>;
  
  // Links úteis
  usefulLinks?: Array<{
    title: string;
    url: string;
    description?: string;
  }>;
}

/**
 * Estrutura de história/experiência pessoal
 */
export interface StorySubmission {
  title: string;
  disease: string; // Nome da doença relacionada
  authorName: string; // Pode ser anônimo
  authorRelation: 'patient' | 'parent' | 'sibling' | 'caregiver' | 'healthcare-professional' | 'other';
  ageGroup?: 'child' | 'teen' | 'adult';
  
  content: {
    text: string;
    images?: Array<{
      url: string;
      caption?: string;
      consent: boolean; // Consentimento para uso da imagem
    }>;
  };
  
  themes?: string[]; // Ex: 'diagnosis', 'acceptance', 'achievement', 'daily-life'
  message?: string; // Mensagem final/lição aprendida
  
  permissions: {
    publishName: boolean;
    allowComments: boolean;
    shareOnSocialMedia: boolean;
  };
}

/**
 * Estrutura de recurso educacional
 */
export interface ResourceSubmission {
  title: string;
  description: string;
  type: 'article' | 'video' | 'infographic' | 'guide' | 'worksheet' | 'game' | 'app' | 'book';
  targetAudience: ('children' | 'teens' | 'parents' | 'teachers' | 'healthcare-professionals')[];
  relatedDiseases?: string[];
  
  content: {
    url?: string;
    file?: File;
    text?: string;
  };
  
  language: 'pt-BR' | 'en' | 'es' | 'other';
  ageRange?: {
    min: number;
    max: number;
  };
  
  tags?: string[];
  accessibility?: {
    subtitles?: boolean;
    audioDescription?: boolean;
    signLanguage?: boolean;
    easyRead?: boolean;
  };
}

/**
 * Submissão completa com metadados
 */
export interface ContentSubmission {
  id: string;
  timestamp: Date;
  submitter: Submitter;
  
  // Tipo de conteúdo
  contentType: ContentCategory;
  
  // Conteúdo específico (apenas um será preenchido)
  diseaseContent?: DiseaseContentSubmission;
  storyContent?: StorySubmission;
  resourceContent?: ResourceSubmission;
  
  // Status e moderação
  status: SubmissionStatus;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  reviewNotes?: string;
  
  // Flags de qualidade
  flags: {
    hasScientificReferences: boolean;
    hasMultipleLevels: boolean;
    hasVisualContent: boolean;
    hasSupportResources: boolean;
    isFromVerifiedSource: boolean;
  };
  
  // Notas internas
  internalNotes?: string;
  
  // Termos e consentimento
  consent: {
    originalContent: boolean; // Conteúdo é original ou tem permissão
    accuracyConfirmation: boolean; // Confirma que informações são precisas
    privacyAgreement: boolean; // Concordou com política de privacidade
    contentLicense: 'cc-by' | 'cc-by-sa' | 'cc-by-nd' | 'all-rights-reserved';
  };
}

/**
 * Resposta de moderação
 */
export interface ModerationResponse {
  submissionId: string;
  decision: 'approve' | 'reject' | 'request-revision';
  feedback: string;
  suggestedEdits?: string[];
  moderatorId: string;
  moderatedAt: Date;
}

/**
 * Estatísticas de submissões
 */
export interface SubmissionStats {
  total: number;
  byStatus: Record<SubmissionStatus, number>;
  byContentType: Record<ContentCategory, number>;
  bySubmitterType: Record<SubmitterType, number>;
  averageReviewTime: number; // em horas
  approvalRate: number; // percentagem
}
