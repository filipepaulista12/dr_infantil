import React, { useState } from 'react';
import { 
  Send, CheckCircle, 
  FileText, Heart, BookOpen, Video, 
  Info, HelpCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import type { 
  ContentSubmission, 
  Submitter, 
  DiseaseContentSubmission,
  StorySubmission,
  ResourceSubmission,
  ContentCategory,
  SubmitterType
} from '../../types/ContentSubmission';

interface Props {
  onSubmit: (submission: Omit<ContentSubmission, 'id' | 'timestamp' | 'status' | 'submittedAt'>) => void;
  onCancel?: () => void;
}

const ContentSubmissionForm: React.FC<Props> = ({ onSubmit }) => {
  // Estado do formulário
  const [step, setStep] = useState<'type' | 'submitter' | 'content' | 'consent' | 'review'>('type');
  const [contentType, setContentType] = useState<ContentCategory | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['basic']));
  
  // Dados do submissor
  const [submitter, setSubmitter] = useState<Submitter>({
    name: '',
    email: '',
    type: 'parent',
  });
  
  // Dados de doença
  const [diseaseContent, setDiseaseContent] = useState<DiseaseContentSubmission>({
    diseaseName: '',
    category: 'genetic',
    descriptions: {},
    medicalInfo: {},
    characteristics: {},
    treatments: {},
    support: { hospitals: [], associations: [], governmentPrograms: [] },
    educational: {},
    faqs: [],
    references: [],
    usefulLinks: [],
  });
  
  // Dados de história
  const [storyContent] = useState<StorySubmission>({
    title: '',
    disease: '',
    authorName: '',
    authorRelation: 'parent',
    content: { text: '', images: [] },
    permissions: {
      publishName: false,
      allowComments: true,
      shareOnSocialMedia: false,
    },
  });
  
  // Dados de recurso
  const [resourceContent] = useState<ResourceSubmission>({
    title: '',
    description: '',
    type: 'article',
    targetAudience: [],
    content: {},
    language: 'pt-BR',
  });
  
  // Consentimento
  const [consent, setConsent] = useState({
    originalContent: false,
    accuracyConfirmation: false,
    privacyAgreement: false,
    contentLicense: 'cc-by' as const,
  });
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };
  
  const handleSubmit = () => {
    const flags = {
      hasScientificReferences: (diseaseContent.references?.length ?? 0) > 0,
      hasMultipleLevels: Object.keys(diseaseContent.descriptions || {}).length > 1,
      hasVisualContent: false,
      hasSupportResources: (diseaseContent.support?.hospitals?.length || 0) > 0 || 
                          (diseaseContent.support?.associations?.length || 0) > 0,
      isFromVerifiedSource: submitter.type === 'healthcare-professional' || 
                           submitter.type === 'association',
    };
    
    const submission: Omit<ContentSubmission, 'id' | 'timestamp' | 'status' | 'submittedAt'> = {
      submitter,
      contentType: contentType!,
      diseaseContent: contentType === 'disease-info' ? diseaseContent : undefined,
      storyContent: contentType === 'story' ? storyContent : undefined,
      resourceContent: contentType === 'resource' ? resourceContent : undefined,
      flags,
      consent,
    };
    
    onSubmit(submission);
  };
  
  // Renderização de cada step
  const renderTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          🌟 Que tipo de conteúdo você quer compartilhar?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Escolha o tipo de contribuição que você gostaria de fazer para nossa comunidade
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => { setContentType('disease-info'); setStep('submitter'); }}
          className="bg-white p-6 rounded-xl border-2 border-purple-200 hover:border-purple-500 hover:shadow-lg transition-all text-left group"
        >
          <FileText className="w-12 h-12 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Informação sobre Doença</h3>
          <p className="text-gray-600">
            Compartilhe conhecimento médico, tratamentos, características e recursos sobre uma doença específica
          </p>
        </button>
        
        <button
          onClick={() => { setContentType('story'); setStep('submitter'); }}
          className="bg-white p-6 rounded-xl border-2 border-pink-200 hover:border-pink-500 hover:shadow-lg transition-all text-left group"
        >
          <Heart className="w-12 h-12 text-pink-500 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">História Pessoal</h3>
          <p className="text-gray-600">
            Compartilhe sua experiência, jornada ou história inspiradora relacionada a uma doença rara
          </p>
        </button>
        
        <button
          onClick={() => { setContentType('resource'); setStep('submitter'); }}
          className="bg-white p-6 rounded-xl border-2 border-blue-200 hover:border-blue-500 hover:shadow-lg transition-all text-left group"
        >
          <BookOpen className="w-12 h-12 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Recurso Educacional</h3>
          <p className="text-gray-600">
            Compartilhe materiais educativos, guias, artigos ou ferramentas úteis
          </p>
        </button>
        
        <button
          onClick={() => { setContentType('video'); setStep('submitter'); }}
          className="bg-white p-6 rounded-xl border-2 border-indigo-200 hover:border-indigo-500 hover:shadow-lg transition-all text-left group"
        >
          <Video className="w-12 h-12 text-indigo-500 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Vídeo Educativo</h3>
          <p className="text-gray-600">
            Envie ou indique vídeos informativos, tutoriais ou depoimentos
          </p>
        </button>
      </div>
    </div>
  );
  
  const renderSubmitterInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          👤 Informações sobre Você
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Queremos conhecer melhor quem está contribuindo com nossa comunidade
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            value={submitter.name}
            onChange={(e) => setSubmitter({ ...submitter, name: e.target.value })}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
            placeholder="Seu nome completo"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={submitter.email}
            onChange={(e) => setSubmitter({ ...submitter, email: e.target.value })}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
            placeholder="seu@email.com"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Usaremos seu email apenas para atualizações sobre sua submissão
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Você é... *
          </label>
          <select
            value={submitter.type}
            onChange={(e) => setSubmitter({ ...submitter, type: e.target.value as SubmitterType })}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
          >
            <option value="parent">Pai/Mãe/Responsável</option>
            <option value="healthcare-professional">Profissional de Saúde</option>
            <option value="association">Representante de Associação</option>
            <option value="researcher">Pesquisador/Acadêmico</option>
            <option value="other">Outro</option>
          </select>
        </div>
        
        {(submitter.type === 'healthcare-professional' || submitter.type === 'association') && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Organização/Instituição
              </label>
              <input
                type="text"
                value={submitter.organization || ''}
                onChange={(e) => setSubmitter({ ...submitter, organization: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Nome da instituição, hospital ou associação"
              />
            </div>
            
            {submitter.type === 'healthcare-professional' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Registro Profissional
                </label>
                <input
                  type="text"
                  value={submitter.credentials || ''}
                  onChange={(e) => setSubmitter({ ...submitter, credentials: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="CRM, CREFITO, CRP, etc."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Isso nos ajuda a verificar e dar credibilidade ao conteúdo médico
                </p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={submitter.website || ''}
                onChange={(e) => setSubmitter({ ...submitter, website: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="https://exemplo.com"
              />
            </div>
          </>
        )}
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Telefone (opcional)
          </label>
          <input
            type="tel"
            value={submitter.phone || ''}
            onChange={(e) => setSubmitter({ ...submitter, phone: e.target.value })}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
            placeholder="(00) 00000-0000"
          />
        </div>
      </div>
      
      <div className="flex gap-3 justify-end">
        <button
          onClick={() => setStep('type')}
          className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={() => setStep('content')}
          disabled={!submitter.name || !submitter.email}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </div>
    </div>
  );
  
  const renderDiseaseContentForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          📚 Informações sobre a Doença
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Quanto mais detalhado, melhor! Use o guia de submissão se tiver dúvidas
        </p>
      </div>
      
      {/* Seção Básica */}
      <div className="bg-white rounded-xl border-2 border-gray-200">
        <button
          onClick={() => toggleSection('basic')}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-bold text-gray-800">Informações Básicas *</h3>
          </div>
          {expandedSections.has('basic') ? <ChevronUp /> : <ChevronDown />}
        </button>
        
        {expandedSections.has('basic') && (
          <div className="px-6 pb-6 space-y-4 border-t border-gray-200 pt-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome da Doença *
              </label>
              <input
                type="text"
                value={diseaseContent.diseaseName}
                onChange={(e) => setDiseaseContent({ ...diseaseContent, diseaseName: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Ex: Síndrome de Rett"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Categoria *
              </label>
              <select
                value={diseaseContent.category}
                onChange={(e) => setDiseaseContent({ ...diseaseContent, category: e.target.value as any })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              >
                <option value="genetic">Genética</option>
                <option value="neurological">Neurológica</option>
                <option value="metabolic">Metabólica</option>
                <option value="autoimmune">Autoimune</option>
                <option value="rare">Rara</option>
                <option value="developmental">Desenvolvimento</option>
                <option value="other">Outra</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Emoji (opcional)
              </label>
              <input
                type="text"
                value={diseaseContent.emoji || ''}
                onChange={(e) => setDiseaseContent({ ...diseaseContent, emoji: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Ex: 🧩"
                maxLength={2}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Seção de Descrições */}
      <div className="bg-white rounded-xl border-2 border-gray-200">
        <button
          onClick={() => toggleSection('descriptions')}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold text-gray-800">Descrições em Múltiplos Níveis *</h3>
          </div>
          {expandedSections.has('descriptions') ? <ChevronUp /> : <ChevronDown />}
        </button>
        
        {expandedSections.has('descriptions') && (
          <div className="px-6 pb-6 space-y-4 border-t border-gray-200 pt-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                💡 <strong>Dica:</strong> Escreva explicações em diferentes níveis de complexidade. Isso ajuda diferentes públicos a entenderem!
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Para Crianças (6-10 anos) 🌟
              </label>
              <textarea
                value={diseaseContent.descriptions.forChildren || ''}
                onChange={(e) => setDiseaseContent({
                  ...diseaseContent,
                  descriptions: { ...diseaseContent.descriptions, forChildren: e.target.value }
                })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                rows={4}
                placeholder="Use linguagem simples e exemplos do dia a dia..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Para Pais e Adolescentes 💙
              </label>
              <textarea
                value={diseaseContent.descriptions.forParents || ''}
                onChange={(e) => setDiseaseContent({
                  ...diseaseContent,
                  descriptions: { ...diseaseContent.descriptions, forParents: e.target.value }
                })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                rows={4}
                placeholder="Explicação mais detalhada sobre causas, tratamentos..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Científica (Profissionais de Saúde) 🔬
              </label>
              <textarea
                value={diseaseContent.descriptions.scientific || ''}
                onChange={(e) => setDiseaseContent({
                  ...diseaseContent,
                  descriptions: { ...diseaseContent.descriptions, scientific: e.target.value }
                })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                rows={4}
                placeholder="Terminologia médica, mecanismos moleculares, estudos..."
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex gap-3 justify-end">
        <button
          onClick={() => setStep('submitter')}
          className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={() => setStep('consent')}
          disabled={!diseaseContent.diseaseName || Object.keys(diseaseContent.descriptions).length === 0}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar para Consentimento
        </button>
      </div>
    </div>
  );
  
  const renderConsentForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          ✅ Termos e Consentimento
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Antes de enviar, precisamos que você confirme alguns pontos importantes
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200 space-y-4">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consent.originalContent}
            onChange={(e) => setConsent({ ...consent, originalContent: e.target.checked })}
            className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <div>
            <span className="font-semibold text-gray-800 group-hover:text-purple-600">
              Conteúdo Original ou com Permissão *
            </span>
            <p className="text-sm text-gray-600 mt-1">
              Confirmo que este conteúdo é original ou tenho permissão para compartilhá-lo
            </p>
          </div>
        </label>
        
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consent.accuracyConfirmation}
            onChange={(e) => setConsent({ ...consent, accuracyConfirmation: e.target.checked })}
            className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <div>
            <span className="font-semibold text-gray-800 group-hover:text-purple-600">
              Precisão das Informações *
            </span>
            <p className="text-sm text-gray-600 mt-1">
              Confirmo que as informações são precisas e baseadas em fontes confiáveis
            </p>
          </div>
        </label>
        
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consent.privacyAgreement}
            onChange={(e) => setConsent({ ...consent, privacyAgreement: e.target.checked })}
            className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <div>
            <span className="font-semibold text-gray-800 group-hover:text-purple-600">
              Política de Privacidade *
            </span>
            <p className="text-sm text-gray-600 mt-1">
              Li e concordo com a política de privacidade e termos de uso
            </p>
          </div>
        </label>
        
        <div className="pt-4 border-t border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Licença de Conteúdo *
          </label>
          <select
            value={consent.contentLicense}
            onChange={(e) => setConsent({ ...consent, contentLicense: e.target.value as any })}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
          >
            <option value="cc-by">Creative Commons BY (permite uso com atribuição)</option>
            <option value="cc-by-sa">Creative Commons BY-SA (permite uso e modificação)</option>
            <option value="cc-by-nd">Creative Commons BY-ND (permite uso mas não modificação)</option>
            <option value="all-rights-reserved">Todos os Direitos Reservados</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">
            <HelpCircle className="w-3 h-3 inline mr-1" />
            Recomendamos CC BY-SA para máximo compartilhamento do conhecimento
          </p>
        </div>
      </div>
      
      <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg">
        <p className="text-sm text-yellow-800">
          ⚠️ <strong>Importante:</strong> Todo conteúdo passa por revisão antes de ser publicado. 
          Entraremos em contato se precisarmos de esclarecimentos.
        </p>
      </div>
      
      <div className="flex gap-3 justify-end">
        <button
          onClick={() => setStep('content')}
          className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={() => setStep('review')}
          disabled={!consent.originalContent || !consent.accuracyConfirmation || !consent.privacyAgreement}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Revisar e Enviar
        </button>
      </div>
    </div>
  );
  
  const renderReview = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          👀 Revisão Final
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Verifique se está tudo correto antes de enviar
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200 space-y-6">
        <div>
          <h3 className="font-bold text-gray-800 mb-2">Tipo de Conteúdo</h3>
          <p className="text-gray-600 capitalize">{contentType?.replace('-', ' ')}</p>
        </div>
        
        <div>
          <h3 className="font-bold text-gray-800 mb-2">Seu Nome</h3>
          <p className="text-gray-600">{submitter.name}</p>
        </div>
        
        <div>
          <h3 className="font-bold text-gray-800 mb-2">Email</h3>
          <p className="text-gray-600">{submitter.email}</p>
        </div>
        
        {contentType === 'disease-info' && (
          <>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Doença</h3>
              <p className="text-gray-600">{diseaseContent.diseaseName}</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Níveis de Descrição Preenchidos</h3>
              <div className="flex gap-2">
                {diseaseContent.descriptions.forChildren && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Crianças ✓
                  </span>
                )}
                {diseaseContent.descriptions.forParents && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Pais ✓
                  </span>
                )}
                {diseaseContent.descriptions.scientific && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Científico ✓
                  </span>
                )}
              </div>
            </div>
          </>
        )}
        
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-green-600 mb-3">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Consentimentos Confirmados</span>
          </div>
          <ul className="text-sm text-gray-600 space-y-1 ml-7">
            <li>✓ Conteúdo original ou com permissão</li>
            <li>✓ Informações precisas e confiáveis</li>
            <li>✓ Concordou com política de privacidade</li>
            <li>✓ Licença: {consent.contentLicense}</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 p-6 rounded-xl text-center">
        <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Obrigado por contribuir! 💜
        </h3>
        <p className="text-gray-600">
          Sua contribuição ajudará muitas famílias a entenderem melhor sobre doenças raras
        </p>
      </div>
      
      <div className="flex gap-3 justify-end">
        <button
          onClick={() => setStep('consent')}
          className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center gap-2 text-lg"
        >
          <Send className="w-5 h-5" />
          Enviar Submissão
        </button>
      </div>
    </div>
  );
  
  // Renderização principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {['type', 'submitter', 'content', 'consent', 'review'].map((s, i) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full ${
                  ['type', 'submitter', 'content', 'consent', 'review'].indexOf(step) >= i
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-gray-200'
                }`}
                style={{ marginRight: i < 4 ? '8px' : '0' }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Tipo</span>
            <span>Você</span>
            <span>Conteúdo</span>
            <span>Termos</span>
            <span>Revisar</span>
          </div>
        </div>
        
        {/* Content */}
        {step === 'type' && renderTypeSelection()}
        {step === 'submitter' && renderSubmitterInfo()}
        {step === 'content' && contentType === 'disease-info' && renderDiseaseContentForm()}
        {step === 'consent' && renderConsentForm()}
        {step === 'review' && renderReview()}
      </div>
    </div>
  );
};

export default ContentSubmissionForm;
