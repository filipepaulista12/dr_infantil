# 🚀 Sistema de Submissão de Conteúdo Comunitário

## Documentação Técnica

**Versão:** 1.0  
**Data:** Outubro 2025  
**Status:** ✅ Implementado e Funcional

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Componentes](#componentes)
4. [Fluxo de Dados](#fluxo-de-dados)
5. [API e Tipos](#api-e-tipos)
6. [Integração com App](#integração-com-app)
7. [Armazenamento](#armazenamento)
8. [Moderação](#moderação)
9. [Roadmap](#roadmap)

---

## 🎯 Visão Geral

O **Sistema de Submissão de Conteúdo Comunitário** permite que:

- **Associações de pacientes** compartilhem informações detalhadas sobre doenças
- **Profissionais de saúde** contribuam com conteúdo científico validado
- **Pais e cuidadores** compartilhem histórias e experiências
- **Educadores** enviem recursos educacionais
- **Comunidade** envie vídeos, guias e materiais úteis

### Objetivos

✅ **Padronização** - Estrutura consistente para todo conteúdo  
✅ **Qualidade** - Sistema de revisão e moderação  
✅ **Acessibilidade** - Conteúdo em múltiplos níveis de complexidade  
✅ **Escalabilidade** - Preparado para centenas de submissões  
✅ **Rastreabilidade** - Histórico completo de cada submissão  

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    USUÁRIO (Frontend)                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────┐        ┌────────────────────┐    │
│  │ SubmitContent.tsx│───────▶│ContentSubmission   │    │
│  │   (Página)       │        │   Form.tsx         │    │
│  └──────────────────┘        │  (Formulário)      │    │
│           │                  └────────────────────┘    │
│           │                           │                 │
│           ▼                           ▼                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │      submissionStorage.ts (Lógica)               │  │
│  │  - addSubmission()                                │  │
│  │  - loadSubmissions()                              │  │
│  │  - moderateSubmission()                           │  │
│  └──────────────────────────────────────────────────┘  │
│           │                                             │
│           ▼                                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │         LocalStorage (Temporário)                 │  │
│  │  Key: 'dr-infantil-submissions'                   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                MODERADOR (Painel Admin)                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────┐                                   │
│  │ ModerationPanel  │                                   │
│  │     .tsx         │───────▶ [Aprovar/Rejeitar]       │
│  └──────────────────┘                                   │
│           │                                              │
│           ▼                                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │      moderateSubmission()                         │  │
│  │  - Atualiza status                                 │  │
│  │  - Envia notificações                              │  │
│  │  - Registra moderador                              │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘

               ┌──────────────────────┐
               │  FUTURO: Backend API  │
               │  - PostgreSQL         │
               │  - Node.js/Express    │
               │  - Email Service      │
               └──────────────────────┘
```

---

## 🧩 Componentes

### 1. `ContentSubmissionForm.tsx`

**Localização:** `src/components/community/ContentSubmissionForm.tsx`

**Responsabilidade:** Formulário multi-step para submissão de conteúdo

**Props:**
```typescript
interface Props {
  onSubmit: (submission: Omit<ContentSubmission, 'id' | 'timestamp' | 'status' | 'submittedAt'>) => void;
  onCancel?: () => void;
}
```

**Steps:**
1. **Type Selection** - Escolher tipo de conteúdo (doença, história, recurso, vídeo)
2. **Submitter Info** - Dados pessoais e credenciais
3. **Content** - Formulário específico para o tipo escolhido
4. **Consent** - Termos e licenças
5. **Review** - Revisão final antes de enviar

**Features:**
- ✅ Validação de campos obrigatórios
- ✅ Seções expansíveis (accordion)
- ✅ Progress bar
- ✅ Formulários dinâmicos baseados no tipo
- ✅ Preview antes de enviar

**Exemplo de uso:**
```tsx
<ContentSubmissionForm
  onSubmit={(submission) => {
    const newSubmission = addSubmission(submission);
    console.log('Submissão criada:', newSubmission.id);
  }}
  onCancel={() => navigate('home')}
/>
```

---

### 2. `ModerationPanel.tsx`

**Localização:** `src/components/community/ModerationPanel.tsx`

**Responsabilidade:** Painel de administração para revisar submissões

**Props:**
```typescript
interface Props {
  submissions: ContentSubmission[];
  onModerate: (submissionId: string, decision: ModerationResponse) => void;
}
```

**Features:**
- ✅ Filtros por status, tipo, submissor
- ✅ Busca por texto
- ✅ Estatísticas em tempo real
- ✅ Detalhes completos de cada submissão
- ✅ Ações: Aprovar, Rejeitar, Solicitar Revisão
- ✅ Badges de qualidade (referências, múltiplos níveis, etc.)
- ✅ Indicador de fonte verificada

**Exemplo de uso:**
```tsx
import { loadSubmissions, moderateSubmission } from '../utils/submissionStorage';

<ModerationPanel
  submissions={loadSubmissions()}
  onModerate={(id, response) => {
    moderateSubmission(response);
    // Recarregar lista
  }}
/>
```

---

### 3. `SubmitContent.tsx`

**Localização:** `src/pages/SubmitContent.tsx`

**Responsabilidade:** Página pública para submissão de conteúdo

**Features:**
- ✅ Integra `ContentSubmissionForm`
- ✅ Tela de sucesso após submissão
- ✅ Exibe ID da submissão
- ✅ Instruções de próximos passos
- ✅ Opção de enviar nova submissão
- ✅ Analytics tracking

**Fluxo:**
```
[Formulário] → [Submissão] → [Tela de Sucesso]
                    ↓
            [LocalStorage]
                    ↓
        [Email Confirmação (mock)]
```

---

## 📊 Fluxo de Dados

### Submissão de Conteúdo

```
1. Usuário acessa /submit-content
   ↓
2. Preenche formulário multi-step
   ↓
3. Revisa dados
   ↓
4. Clica "Enviar Submissão"
   ↓
5. addSubmission() cria objeto completo
   ↓
6. Salva em LocalStorage
   ↓
7. Gera ID único
   ↓
8. Envia email de confirmação (mock)
   ↓
9. Exibe tela de sucesso
   ↓
10. Submissão fica com status "pending"
```

### Moderação

```
1. Moderador acessa painel
   ↓
2. Vê lista de submissões pendentes
   ↓
3. Expande submissão para revisar
   ↓
4. Decide: Aprovar | Rejeitar | Solicitar Revisão
   ↓
5. Fornece feedback (obrigatório para rejeição)
   ↓
6. moderateSubmission() atualiza status
   ↓
7. Registra moderador e timestamp
   ↓
8. Envia email ao submissor (mock)
   ↓
9. Se aprovado: conteúdo disponível para publicação
```

---

## 🔧 API e Tipos

### ContentSubmission (Interface Principal)

```typescript
interface ContentSubmission {
  // Identificação
  id: string;                          // UUID único
  timestamp: Date;                     // Data/hora criação
  
  // Submissor
  submitter: Submitter;                // Dados de quem enviou
  
  // Conteúdo
  contentType: ContentCategory;        // Tipo de conteúdo
  diseaseContent?: DiseaseContentSubmission;
  storyContent?: StorySubmission;
  resourceContent?: ResourceSubmission;
  
  // Status
  status: SubmissionStatus;            // pending | under-review | approved | rejected | needs-revision
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  reviewNotes?: string;
  
  // Qualidade
  flags: {
    hasScientificReferences: boolean;  // Tem referências?
    hasMultipleLevels: boolean;        // Tem múltiplos níveis?
    hasVisualContent: boolean;         // Tem imagens/vídeos?
    hasSupportResources: boolean;      // Tem hospitais/associações?
    isFromVerifiedSource: boolean;     // Fonte verificada?
  };
  
  // Consentimento
  consent: {
    originalContent: boolean;
    accuracyConfirmation: boolean;
    privacyAgreement: boolean;
    contentLicense: 'cc-by' | 'cc-by-sa' | 'cc-by-nd' | 'all-rights-reserved';
  };
}
```

### DiseaseContentSubmission

```typescript
interface DiseaseContentSubmission {
  diseaseName: string;
  category: 'neurological' | 'genetic' | 'metabolic' | ...;
  
  // MÚLTIPLOS NÍVEIS (essencial!)
  descriptions: {
    forChildren?: string;    // 6-10 anos, linguagem simples
    forTeens?: string;       // 11-17 anos
    forParents?: string;     // Adultos, mais detalhado
    scientific?: string;     // Profissionais, técnico
  };
  
  medicalInfo?: { ... };
  characteristics?: { ... };
  treatments?: { ... };
  support?: {
    hospitals?: Hospital[];
    associations?: Association[];
    governmentPrograms?: Program[];
  };
  faqs?: FAQ[];
  references?: Reference[];
  usefulLinks?: Link[];
}
```

### Funções Principais

```typescript
// Adicionar submissão
addSubmission(submission: Omit<...>): ContentSubmission

// Carregar todas
loadSubmissions(): ContentSubmission[]

// Moderar
moderateSubmission(response: ModerationResponse): boolean

// Buscar com filtros
searchSubmissions(filters: {...}): ContentSubmission[]

// Estatísticas
getSubmissionStats(): SubmissionStats

// Backup
exportSubmissions(): string
importSubmissions(jsonData: string): boolean
```

---

## 🔗 Integração com App

### 1. Adicionar Rota no Zustand Store

**Arquivo:** `src/stores/useAppStore.ts`

```typescript
export type Page = 
  | 'home'
  | 'disease-library'
  | 'disease-detail'
  | 'games'
  | 'stories'
  | 'resources'
  | 'community'
  | 'submit-content'      // ← ADICIONAR
  | 'moderation-panel';   // ← ADICIONAR (admin)
```

### 2. Adicionar Link no Header/Footer

**Arquivo:** `src/components/layout/Header.tsx`

```tsx
<button
  onClick={() => setCurrentPage('submit-content')}
  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
>
  📝 Contribuir
</button>
```

### 3. Adicionar Caso no App.tsx

**Arquivo:** `src/App.tsx`

```tsx
import SubmitContent from './pages/SubmitContent';
import ModerationPanel from './components/community/ModerationPanel';
import { loadSubmissions, moderateSubmission } from './utils/submissionStorage';

// No switch/case:
case 'submit-content':
  return <SubmitContent />;

case 'moderation-panel':
  return (
    <ModerationPanel
      submissions={loadSubmissions()}
      onModerate={(id, response) => {
        moderateSubmission(response);
        // Recarregar se necessário
      }}
    />
  );
```

### 4. Botão na Homepage

```tsx
<button
  onClick={() => setCurrentPage('submit-content')}
  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center gap-3"
>
  <Send className="w-6 h-6" />
  Compartilhe Seu Conhecimento
</button>
```

---

## 💾 Armazenamento

### Atual: LocalStorage (Fase 1)

**Vantagens:**
- ✅ Implementação imediata
- ✅ Sem dependências de backend
- ✅ Funciona offline
- ✅ Perfeito para protótipo e testes

**Limitações:**
- ❌ Limitado a ~5-10MB
- ❌ Dados apenas no navegador local
- ❌ Sem sincronização entre dispositivos
- ❌ Vulnerável a limpeza de cache

**Estrutura:**
```javascript
// Key: 'dr-infantil-submissions'
[
  {
    id: 'submission-1234567890-abc123',
    timestamp: '2025-10-03T10:30:00Z',
    submitter: { ... },
    diseaseContent: { ... },
    status: 'pending',
    ...
  },
  ...
]
```

### Futuro: Backend API (Fase 2)

**Stack recomendada:**
```
Frontend (React) ─────┐
                       │
                       ▼
                  REST API
               (Node.js/Express)
                       │
                       ▼
                  PostgreSQL
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
    Email Service  File Storage  Analytics
   (SendGrid/SES)  (S3/Cloudinary) (Mixpanel)
```

**Endpoints propostos:**
```
POST   /api/submissions          - Criar submissão
GET    /api/submissions          - Listar (com filtros)
GET    /api/submissions/:id      - Detalhes
PUT    /api/submissions/:id      - Atualizar
DELETE /api/submissions/:id      - Deletar
POST   /api/submissions/:id/moderate - Moderar
GET    /api/submissions/stats    - Estatísticas
```

**Schema PostgreSQL:**
```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submitter_id UUID REFERENCES users(id),
  content_type VARCHAR(50) NOT NULL,
  content JSONB NOT NULL,  -- Armazena JSON flexível
  status VARCHAR(20) NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW(),
  reviewed_at TIMESTAMP,
  reviewed_by UUID REFERENCES admins(id),
  review_notes TEXT,
  flags JSONB,
  consent JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_content_type ON submissions(content_type);
CREATE INDEX idx_submissions_submitted_at ON submissions(submitted_at);
```

---

## 👮 Moderação

### Fluxo de Moderação

```
┌──────────────────────────────────────────────────────────┐
│                    NOVA SUBMISSÃO                         │
│                    Status: pending                        │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
         ┌───────────────┐
         │  TRIAGEM       │ ← Automática
         │  (1-2 dias)    │   - Verifica campos obrigatórios
         └───────┬───────┘   - Valida credenciais
                 │           - Checa consentimentos
                 ▼
         ┌───────────────┐
         │  REVISÃO       │ ← Manual (moderador)
         │  (3-7 dias)    │   - Lê conteúdo
         └───────┬───────┘   - Verifica precisão
                 │           - Checa fontes
                 │
     ┌───────────┼───────────┐
     ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│APROVAR  │ │REJEITAR │ │REVISAR  │
│✅       │ │❌       │ │🔄       │
└────┬────┘ └────┬────┘ └────┬────┘
     │           │           │
     ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│PUBLICAR │ │ARQUIVAR │ │DEVOLVER │
└─────────┘ └─────────┘ └────┬────┘
                              │
                              └──► [Autor corrige]
```

### Critérios de Aprovação

**✅ Aprovação Automática (Fast Track):**
- Submissor verificado (profissional de saúde ou associação)
- Tem múltiplos níveis de explicação
- Inclui referências científicas
- Todos os consentimentos marcados

**⚠️ Revisão Manual Necessária:**
- Primeiro envio de um submissor
- Conteúdo sensível (histórias pessoais)
- Faltam referências
- Informações contraditórias

**❌ Rejeição Imediata:**
- Consentimentos não marcados
- Conteúdo promocional/comercial
- Informações claramente incorretas
- Linguagem inapropriada
- Plágio detectado

### Ferramentas do Moderador

1. **Dashboard com Estatísticas**
   - Total de submissões pendentes
   - Tempo médio de revisão
   - Taxa de aprovação
   - Submissões por tipo

2. **Filtros e Busca**
   - Por status
   - Por tipo de conteúdo
   - Por submissor
   - Por data
   - Busca textual

3. **Ações Rápidas**
   - Aprovar com mensagem
   - Rejeitar com motivo
   - Solicitar revisão com sugestões
   - Marcar como favorito
   - Atribuir a outro moderador

4. **Comunicação**
   - Email automático ao aprovar/rejeitar
   - Template de mensagens
   - Thread de comentários internos

---

## 🗺️ Roadmap

### Fase 1: MVP (✅ Concluído)
- ✅ Tipos TypeScript completos
- ✅ ContentSubmissionForm com multi-step
- ✅ ModerationPanel funcional
- ✅ LocalStorage como armazenamento
- ✅ Guia de submissão completo
- ✅ Mock de emails

### Fase 2: Backend Integration (📅 Q1 2026)
- [ ] API REST com Node.js/Express
- [ ] Banco PostgreSQL
- [ ] Autenticação (JWT)
- [ ] Upload de imagens (S3/Cloudinary)
- [ ] Email real (SendGrid/AWS SES)
- [ ] Webhooks para notificações

### Fase 3: Features Avançadas (📅 Q2 2026)
- [ ] Editor WYSIWYG para conteúdo
- [ ] Preview ao vivo
- [ ] Versionamento de conteúdo
- [ ] Aprovação colaborativa (múltiplos moderadores)
- [ ] Sistema de pontos/gamificação
- [ ] Badges para contribuidores
- [ ] Dashboard público de contribuições

### Fase 4: AI & Automação (📅 Q3 2026)
- [ ] Verificação automática de qualidade (IA)
- [ ] Sugestões de melhorias (GPT)
- [ ] Detecção de plágio
- [ ] Tradução automática
- [ ] Geração de resumos
- [ ] Recomendações de conteúdo relacionado

---

## 📚 Referências

**Guias:**
- [GUIA_SUBMISSAO_CONTEUDO.md](./GUIA_SUBMISSAO_CONTEUDO.md) - Para contribuidores

**Código:**
- `src/types/ContentSubmission.ts` - Tipos TypeScript
- `src/components/community/ContentSubmissionForm.tsx` - Formulário
- `src/components/community/ModerationPanel.tsx` - Painel de moderação
- `src/utils/submissionStorage.ts` - Lógica de armazenamento
- `src/pages/SubmitContent.tsx` - Página pública

**Arquitetura:**
- React 19 + TypeScript 5
- Zustand (state management)
- Tailwind CSS (styling)
- Lucide React (icons)

---

## 🤝 Contribuindo

Para contribuir com este sistema:

1. **Reporte bugs** - Abra issue no GitHub
2. **Sugira features** - Discussões são bem-vindas
3. **Envie PRs** - Siga guia de contribuição
4. **Melhore docs** - Documentação nunca é demais

---

**Última atualização:** Outubro 2025  
**Mantido por:** Equipe DR Infantil  
**Licença:** MIT  
**Contato:** dev@drinfantil.com.br

---

✨ **Obrigado por ajudar a construir uma comunidade mais informada e inclusiva!** ✨
