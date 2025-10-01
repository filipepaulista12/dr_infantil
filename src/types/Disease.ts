// Tipos básicos
export type AgeRange = {
  min: number;
  max: number;
  unit: 'months' | 'years';
};

export type InheritancePattern = 
  | 'Autossômico recessivo'
  | 'Autossômico dominante'
  | 'Ligado ao X'
  | 'Mitocondrial'
  | 'Multifatorial'
  | 'Esporádico';

export type DiseaseCategory = 
  | 'Neurológicas'
  | 'Genéticas'
  | 'Metabólicas'
  | 'Autoimunes'
  | 'Malformações'
  | 'Degenerativas';

export type Severity = 'Leve' | 'Moderada' | 'Severa';

// Sintomas
export interface Symptom {
  id: string;
  name: string;
  description: string;
  frequency: 'Muito comum' | 'Comum' | 'Raro' | 'Muito raro';
  ageOfOnset: AgeRange;
  severity: Severity;
  system: string; // Sistema corporal afetado
}

// Testes diagnósticos
export interface Test {
  id: string;
  name: string;
  description: string;
  type: 'Genético' | 'Bioquímico' | 'Imagiologia' | 'Funcional';
  accuracy: number; // Percentual de precisão
  cost: 'Baixo' | 'Médio' | 'Alto';
}

// Tratamentos
export interface Treatment {
  id: string;
  name: string;
  description: string;
  type: 'Medicamentoso' | 'Cirúrgico' | 'Terapia' | 'Suplemento' | 'Suporte';
  effectiveness: number; // Percentual de eficácia
  sideEffects: string[];
  availability: 'Disponível' | 'Limitado' | 'Experimental';
}

// Organizações de apoio
export interface Organization {
  id: string;
  name: string;
  description: string;
  website: string;
  phone: string;
  type: 'Governamental' | 'ONG' | 'Privada' | 'Internacional';
}

// Informações de prognóstico
export interface PrognosisInfo {
  lifeExpectancy: string;
  qualityOfLife: string;
  progression: 'Progressiva' | 'Estável' | 'Regressiva' | 'Variável';
  complications: string[];
}

// Informações diagnósticas
export interface DiagnosticInfo {
  clinicalCriteria: string[];
  diagnosticTests: Test[];
  differentialDiagnosis: string[];
  specialistReferral: string;
  averageTimeTodiagnosis: string;
}

// Doença principal
export interface Disease {
  id: string;
  name: string;
  alternativeNames: string[];
  icdCode?: string;
  category: DiseaseCategory;
  
  // Epidemiologia
  prevalence: {
    rate: string;
    population: string;
    source: string;
    lastUpdate: string;
  };
  
  // Manifestação
  onset: {
    typical: AgeRange;
    range: AgeRange;
    variability: string;
  };
  
  // Genética
  inheritance: InheritancePattern;
  geneticBasis: string;
  
  // Sintomas
  symptoms: {
    common: Symptom[];
    rare: Symptom[];
    progressive: Symptom[];
  };
  
  // Diagnóstico
  diagnosis: DiagnosticInfo;
  
  // Tratamento
  treatment: {
    current: Treatment[];
    experimental: Treatment[];
    supportive: string[];
  };
  
  // Prognóstico
  prognosis: PrognosisInfo;
  
  // Recursos
  resources: {
    organizations: Organization[];
    educationalMaterials: string[];
    researchStudies: string[];
  };
  
  // Metadata
  lastUpdated: string;
  reviewedBy: string[];
  sources: string[];
  
  // Interface
  thumbnail?: string;
  shortDescription: string;
  tags: string[];
}