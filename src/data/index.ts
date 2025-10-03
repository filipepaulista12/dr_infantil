// Interface simplificada para doenças com conteúdo educacional
export interface SimplifiedDisease {
  id: string;
  name: string;
  category: 'neurological' | 'cardiac' | 'respiratory' | 'metabolic' | 'genetic' | 'oncological';
  forChildren: string; // Explicação para crianças (6-12 anos)
  forParents: string; // Explicação para pais/responsáveis
  scientific: string; // Conteúdo científico detalhado
  symptoms: string[]; // Lista de sintomas principais
  treatments: string[]; // Opções de tratamento
  supportOrganizations: string[]; // Organizações de apoio
  faqs?: FAQ[]; // Perguntas frequentes
  emoji?: string; // Emoji representativo
  color?: string; // Cor do tema (Tailwind classes)
}

export interface FAQ {
  question: string;
  answer: string;
  audience: 'children' | 'parents' | 'both';
}

// Re-export das doenças existentes
export { diseases as childFriendlyDiseases } from './childFriendlyDiseases';
export { diseases as expandedDiseases } from './expandedDiseases';
export { diseases as complexDiseases } from './diseases';

// Import das novas categorias
export { neurologicalDiseases } from './neurologicalDiseases';
export { cardiacDiseases } from './cardiacDiseases';

// Combinar todas as doenças simplificadas
import { neurologicalDiseases } from './neurologicalDiseases';
import { cardiacDiseases } from './cardiacDiseases';

// As novas doenças já estão no formato SimplifiedDisease
export const allSimplifiedDiseases = [
  ...neurologicalDiseases,
  ...cardiacDiseases
] as SimplifiedDisease[];

// Funções auxiliares para busca e filtragem
export function getDiseaseById(id: string): SimplifiedDisease | undefined {
  return allSimplifiedDiseases.find(disease => disease.id === id);
}

export function getDiseasesByCategory(category: SimplifiedDisease['category']): SimplifiedDisease[] {
  return allSimplifiedDiseases.filter(disease => disease.category === category);
}

export function searchDiseases(query: string): SimplifiedDisease[] {
  const lowerQuery = query.toLowerCase();
  return allSimplifiedDiseases.filter(disease =>
    disease.name.toLowerCase().includes(lowerQuery) ||
    disease.symptoms.some(symptom => symptom.toLowerCase().includes(lowerQuery))
  );
}

export function getFAQsByDisease(diseaseId: string): FAQ[] {
  const disease = getDiseaseById(diseaseId);
  return disease?.faqs || [];
}

export function getFAQsByAudience(audience: FAQ['audience']): FAQ[] {
  return allSimplifiedDiseases
    .flatMap(disease => disease.faqs || [])
    .filter(faq => faq.audience === audience || faq.audience === 'both');
}

// Estatísticas
export function getDiseaseStatistics() {
  const byCategory = allSimplifiedDiseases.reduce((acc, disease) => {
    acc[disease.category] = (acc[disease.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: allSimplifiedDiseases.length,
    byCategory,
    withFAQs: allSimplifiedDiseases.filter(d => d.faqs && d.faqs.length > 0).length,
    categories: Object.keys(byCategory)
  };
}
