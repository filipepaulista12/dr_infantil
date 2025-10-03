# 🏥 DR Infantil - Plataforma Educativa de Saúde Infantil

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)

**Uma plataforma educativa revolucionária que torna o aprendizado sobre saúde acessível, divertido e seguro para crianças, pais e profissionais de saúde.**

[🚀 Demo](http://localhost:5173) • [📚 Documentação](./INTEGRACAO_COMPLETA.md) • [🐛 Reportar Bug](https://github.com/filipepaulista12/dr_infantil/issues) • [✨ Request Feature](https://github.com/filipepaulista12/dr_infantil/issues)

</div>

---

## 🌟 Características Principais

### 🎨 **Interface Amigável**
- Design colorido e intuitivo especialmente para crianças
- Acessibilidade WCAG 2.1 AAA completa
- Navegação por teclado e screen readers
- Modo de alto contraste

### 📚 **Conteúdo Multi-Nível**
- **Para Crianças (6-10 anos)**: Explicações simples e ilustradas
- **Para Pais**: Informações detalhadas e práticas
- **Científico**: Conteúdo técnico para profissionais

### 🎮 **Jogos Educativos**
- Quiz interativo sobre saúde
- Jogo da memória com doenças
- Quebra-cabeça educacional
- Jogo da forca médico
- Livro para colorir

### 🎥 **Biblioteca Multimídia**
- Vídeos educacionais categorizados
- Histórias inspiradoras de superação
- Recursos para download
- Centro de apoio familiar

### 👥 **Sistema Comunitário**
- **NOVO!** Submissão de conteúdo comunitário
- Painel de moderação profissional
- Sistema de qualidade com badges
- Integração com associações e ONGs

### 📊 **Analytics & Feedback**
- Sistema de feedback integrado
- Tracking de uso e engajamento
- Dashboard de estatísticas
- Relatórios de acesso

---

## 🚀 Tecnologias & Stack

### Frontend
```
⚛️  React 19.1.1          - UI Library (latest)
📘 TypeScript 5.8.3       - Type Safety
⚡ Vite 7.1.7             - Build Tool & Dev Server
🎨 Tailwind CSS 3.4.17    - Utility-First CSS
🔄 Zustand 5.0.2          - State Management
🎯 Lucide React 0.468.0   - Icon Library
```

### Qualidade & Ferramentas
```
✅ ESLint                 - Code Quality
🔍 TypeScript Strict      - Type Checking
♿ WCAG 2.1 AAA           - Accessibility
📱 Mobile-First Design    - Responsive
🌐 PWA Ready              - Progressive Web App
```

---

## 📁 Estrutura do Projeto

```
dr-infantil-app/
│
├── src/
│   ├── components/
│   │   ├── common/              # Componentes reutilizáveis
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── LoadingScreen.tsx
│   │   │
│   │   ├── layout/              # Layout global
│   │   │   ├── Header.tsx       # Navegação principal
│   │   │   └── Footer.tsx       # Rodapé
│   │   │
│   │   ├── games/               # Jogos educativos
│   │   │   ├── Quiz.tsx         # Quiz interativo
│   │   │   ├── MemoryGame.tsx   # Jogo da memória
│   │   │   ├── PuzzleGame.tsx   # Quebra-cabeça
│   │   │   ├── ColoringGame.tsx # Livro de colorir
│   │   │   └── VideoLibrary.tsx # Vídeos educativos
│   │   │
│   │   ├── community/           # Sistema comunitário ⭐ NOVO
│   │   │   ├── ContentSubmissionForm.tsx  # Formulário 5 steps
│   │   │   ├── ModerationPanel.tsx        # Painel admin
│   │   │   └── Community.tsx              # Hub da comunidade
│   │   │
│   │   ├── resources/           # Centro de recursos
│   │   │   └── ResourceCenter.tsx
│   │   │
│   │   └── stories/             # Histórias educativas
│   │       └── StoryBook.tsx
│   │
│   ├── pages/                   # Páginas principais
│   │   ├── HomePage.tsx         # Landing page
│   │   ├── DiseaseLibrary.tsx   # Biblioteca de doenças
│   │   ├── DiseaseDetail.tsx    # Detalhes da doença
│   │   └── SubmitContent.tsx    # Página de submissão ⭐ NOVO
│   │
│   ├── data/                    # Dados & Content
│   │   ├── diseases.ts          # Lista de doenças
│   │   ├── expandedDiseases.ts  # Doenças detalhadas
│   │   └── childFriendlyDiseases.ts
│   │
│   ├── types/                   # TypeScript Types
│   │   ├── Disease.ts           # Tipos de doenças
│   │   └── ContentSubmission.ts # Tipos de submissão ⭐ NOVO
│   │
│   ├── utils/                   # Utilitários
│   │   └── submissionStorage.ts # LocalStorage manager ⭐ NOVO
│   │
│   ├── stores/                  # State Management
│   │   └── useAppStore.ts       # Zustand store
│   │
│   ├── App.tsx                  # App principal
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
│
├── public/                      # Assets estáticos
├── docs/                        # Documentação
│   ├── GUIA_SUBMISSAO_CONTEUDO.md          # Guia para contribuidores
│   ├── DOCS_SISTEMA_SUBMISSAO.md           # Docs técnicas
│   ├── INTEGRACAO_COMPLETA.md              # Demo completa
│   └── IMPLEMENTACAO_SISTEMA_SUBMISSAO.md  # Implementação
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

---

## 🏃‍♂️ Quick Start

### Pré-requisitos
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Git
```

### Instalação

1️⃣ **Clone o repositório**
```bash
git clone https://github.com/filipepaulista12/dr_infantil.git
cd dr_infantil/dr-infantil-app
```

2️⃣ **Instale as dependências**
```bash
npm install --legacy-peer-deps
```

3️⃣ **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

4️⃣ **Abra no navegador**
```
🌐 Local:   http://localhost:5173
📱 Network: http://[seu-ip]:5173 (use --host)
```

### Build para Produção

```bash
# Build otimizado
npm run build

# Preview do build
npm run preview

# Análise do bundle
npm run build -- --mode analyze
```

---

## 📋 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| 🚀 Dev | `npm run dev` | Servidor de desenvolvimento (port 5173) |
| 🌐 Dev Network | `npm run dev -- --host` | Servidor acessível na rede local |
| 🏗️ Build | `npm run build` | Build de produção otimizado |
| 👀 Preview | `npm run preview` | Preview do build de produção |
| 🔍 Lint | `npm run lint` | Verificar qualidade do código |
| 🧹 Clean | `rm -rf dist node_modules` | Limpar arquivos gerados |

---

## 🎯 Funcionalidades Implementadas

### ✅ Core Features

| Feature | Status | Descrição |
|---------|--------|-----------|
| 🏠 **Homepage** | ✅ 100% | Landing page com navegação principal |
| 📚 **Biblioteca de Doenças** | ✅ 100% | 50+ doenças com busca e filtros |
| 📄 **Detalhes de Doença** | ✅ 100% | 3 níveis de explicação (criança/pais/científico) |
| 🎥 **Vídeo Library** | ✅ 100% | Biblioteca categorizada de vídeos educativos |
| 🎮 **Games Hub** | ✅ 100% | Central de 5 jogos educativos |

### ✅ Jogos Educativos

| Jogo | Status | Features |
|------|--------|----------|
| 📝 **Quiz** | ✅ 100% | Perguntas/respostas, score, feedback |
| 🎴 **Memory Game** | ✅ 100% | Jogo da memória, níveis, timer |
| 🧩 **Puzzle** | ✅ 100% | Quebra-cabeça drag-and-drop |
| 🎨 **Coloring Book** | ✅ 100% | Livro para colorir interativo |
| 🔤 **Hangman** | ✅ 100% | Jogo da forca médico com teclado |

### ✅ Sistema Comunitário ⭐ NOVO

| Feature | Status | Descrição |
|---------|--------|-----------|
| 📝 **Formulário de Submissão** | ✅ 100% | Multi-step (5 etapas), validação completa |
| 👨‍⚕️ **Painel de Moderação** | ✅ 100% | Dashboard, filtros, busca, badges |
| 💾 **Storage System** | ✅ 100% | LocalStorage + mock emails |
| 📊 **Analytics Dashboard** | ✅ 100% | Estatísticas em tempo real |
| 🎯 **Sistema de Qualidade** | ✅ 100% | 8 badges automáticos |
| 📄 **3 Níveis de Explicação** | ✅ 100% | Criança/Pais/Científico (obrigatório) |

### ✅ Acessibilidade & UX

| Feature | Status | Padrão |
|---------|--------|--------|
| ♿ **WCAG 2.1 AAA** | ✅ 100% | Totalmente acessível |
| ⌨️ **Navegação por Teclado** | ✅ 100% | Tab, Enter, Esc, A-Z |
| 🔊 **Screen Readers** | ✅ 100% | ARIA labels completos |
| 🎨 **Alto Contraste** | ✅ 100% | prefers-contrast: high |
| 📱 **Mobile-First** | ✅ 100% | Responsivo em todos os tamanhos |
| 🌗 **Focus States** | ✅ 100% | Outline roxo 3px customizado |

---

## 📊 Estatísticas do Projeto

```
📦 Bundle Size:        486.80 KB (129.76 KB gzip)
⚡ Build Time:         7.76s
🎨 CSS Size:           65.16 KB (9.84 KB gzip)
📝 Total Lines:        ~12.000 linhas
📄 Components:         35+ componentes
🎮 Games:              5 jogos completos
📚 Diseases:           50+ doenças
📄 Documentation:      2.000+ linhas
✅ TypeScript:         100% tipado
♿ Accessibility:      WCAG 2.1 AAA
```

---

## 🎨 Design System

### Paleta de Cores
```css
/* Cores Principais */
--purple: #9333ea → #7e22ce (gradiente)
--blue: #3b82f6 → #2563eb
--green: #10b981 → #059669
--pink: #ec4899 → #db2777
--red: #ef4444 → #dc2626

/* Tons de Cinza */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-800: #1f2937
--gray-900: #111827
```

### Tipografia
```
Headings: font-bold
Body: font-normal
Small: text-sm
Large: text-lg, text-xl, text-2xl
```

### Componentes Base
- **Cards**: `rounded-2xl shadow-xl hover:scale-105`
- **Buttons**: `rounded-full px-6 py-3 font-bold transform`
- **Inputs**: `rounded-lg border-2 focus:ring-2`
- **Modals**: `backdrop-blur-sm bg-opacity-90`

---

## 📚 Documentação Completa

| Documento | Descrição |
|-----------|-----------|
| [📖 ROADMAP.md](./ROADMAP.md) | **Roadmap completo 2025-2026** - Todas as fases e próximos passos |
| [📄 INTEGRACAO_COMPLETA.md](./INTEGRACAO_COMPLETA.md) | Guia de integração e demonstração do sistema |
| [📘 GUIA_SUBMISSAO_CONTEUDO.md](./GUIA_SUBMISSAO_CONTEUDO.md) | Guia para contribuidores (associações, profissionais, pais) |
| [📗 DOCS_SISTEMA_SUBMISSAO.md](./DOCS_SISTEMA_SUBMISSAO.md) | Documentação técnica do sistema de submissão |
| [📕 IMPLEMENTACAO_SISTEMA_SUBMISSAO.md](./IMPLEMENTACAO_SISTEMA_SUBMISSAO.md) | Resumo da implementação do sistema comunitário |

---

## 🚀 Próximos Passos

### ⏭️ Imediato (Próximas Semanas)
- [ ] Coletar feedback de usuários beta
- [ ] Ajustar UX baseado em uso real
- [ ] Adicionar mais exemplos de submissões
- [ ] Criar tutoriais em vídeo
- [ ] Setup analytics (Google Analytics/Plausible)

### 📅 Curto Prazo (Q4 2025)
Ver [ROADMAP.md - Fase 2](./ROADMAP.md#fase-2---backend--api-q4-2025) para detalhes completos:
- Backend Node.js + PostgreSQL + Redis
- API RESTful completa
- Sistema de autenticação (JWT)
- Migração LocalStorage → Database
- Deploy em produção (Railway/Vercel)
- Sistema de emails real (SendGrid)

### 🎯 Médio Prazo (Q1-Q2 2026)
Ver [ROADMAP.md - Fases 3 e 4](./ROADMAP.md#fase-3---conteúdo--moderação-q1-2026):
- 200+ doenças cadastradas
- 20+ associações parceiras
- Sistema de gamificação (badges, missões)
- Perfil de usuário completo
- PWA (Progressive Web App)
- Busca avançada (Elasticsearch)

### 🌟 Longo Prazo (Q3-Q4 2026)
Ver [ROADMAP.md - Fase 5](./ROADMAP.md#fase-5---escalabilidade--ia-q3-q4-2026):
- Assistente IA (DR Buddy)
- Internacionalização (Espanhol, Inglês)
- 100.000+ usuários ativos
- Modelo Freemium
- Expansão internacional

**📖 Leia o [ROADMAP completo](./ROADMAP.md) para visão detalhada de todas as fases!**

---

## 🤝 Como Contribuir

Adoraríamos sua contribuição! Existem várias formas de ajudar:

### 👨‍💻 Para Desenvolvedores

1. **Fork** o repositório
2. **Clone** seu fork
   ```bash
   git clone https://github.com/SEU-USERNAME/dr_infantil.git
   cd dr_infantil/dr-infantil-app
   ```
3. **Crie uma branch** para sua feature
   ```bash
   git checkout -b feature/minha-feature
   ```
4. **Desenvolva** e teste localmente
   ```bash
   npm run dev
   npm run build
   ```
5. **Commit** usando [Conventional Commits](https://www.conventionalcommits.org/)
   ```bash
   git commit -m "feat: adicionar nova funcionalidade"
   git commit -m "fix: corrigir bug no componente X"
   git commit -m "docs: atualizar documentação"
   ```
6. **Push** para seu fork
   ```bash
   git push origin feature/minha-feature
   ```
7. **Abra um Pull Request** no GitHub

**Áreas que precisam de ajuda:**
- 🐛 Correção de bugs
- ✨ Novas features (veja Issues)
- 📝 Documentação
- ♿ Melhorias de acessibilidade
- 🎨 Design e UX
- 🧪 Testes (unit, integration, E2E)
- 🌍 Traduções

### 👨‍⚕️ Para Profissionais de Saúde

- **Revise conteúdo médico** para garantir precisão
- **Contribua com artigos** sobre doenças raras/comuns
- **Participe de vídeos educativos** explicando condições
- **Seja um moderador** do sistema de submissões
- **Sugira melhorias** baseadas em sua experiência clínica

📧 Entre em contato: `profissionais@drinfantil.com.br` *(exemplo)*

### 🤝 Para Associações e ONGs

- **Torne-se parceiro oficial** do DR Infantil
- **Submeta conteúdo educativo** sobre a doença que sua associação apoia
- **Divulgue** para sua comunidade de famílias
- **Organize eventos** em conjunto
- **Compartilhe histórias** inspiradoras

📧 Parcerias: `parcerias@drinfantil.com.br` *(exemplo)*

### 👨‍👩‍👧‍👦 Para Pais, Mães e Cuidadores

- **Compartilhe sua história** de superação
- **Deixe feedback** sobre o conteúdo
- **Avalie** a qualidade das explicações
- **Sugira recursos** que seriam úteis
- **Participe dos jogos** e dê sua opinião

📧 Contato: `contato@drinfantil.com.br` *(exemplo)*

### 🎨 Para Designers

- **Crie ilustrações** para doenças e jogos
- **Melhore a UI/UX** do site
- **Desenvolva ícones** personalizados
- **Crie animações** educativas
- **Design de materiais** para download

---

## 📊 Status do Projeto

### ✅ Implementado (v1.0.0)

- [x] Frontend React 19 + TypeScript
- [x] 50+ doenças com 3 níveis de explicação
- [x] 5 jogos educativos completos
- [x] Biblioteca de vídeos
- [x] Sistema de submissão comunitária
- [x] Painel de moderação
- [x] Acessibilidade WCAG 2.1 AAA
- [x] Design responsivo mobile-first
- [x] LocalStorage para dados temporários
- [x] Sistema de feedback

### 🚧 Em Desenvolvimento

- [ ] Backend Node.js + PostgreSQL (Fase 2)
- [ ] Autenticação de usuários (Fase 2)
- [ ] Sistema de emails real (Fase 2)
- [ ] Expansão para 200+ doenças (Fase 3)
- [ ] Parcerias com 20+ associações (Fase 3)

### 📅 Planejado

- [ ] Gamificação (badges, missões) - Fase 4
- [ ] PWA completo - Fase 4
- [ ] Assistente IA (DR Buddy) - Fase 5
- [ ] Internacionalização - Fase 5
- [ ] App mobile nativo - Futuro

**📈 Progress: Fase 1 (100%) → Fase 2 (0%) → Fase 3 (0%) → ...**

---

## 🐛 Reportar Bugs

Encontrou um bug? Ajude-nos a melhorar!

1. **Verifique** se o bug já foi reportado nas [Issues](https://github.com/filipepaulista12/dr_infantil/issues)
2. **Abra uma nova Issue** com:
   - Título claro e descritivo
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Ambiente (navegador, OS, versão)
3. **Use o template** de Bug Report

---

## 💡 Solicitar Features

Tem uma ideia? Queremos ouvir!

1. **Verifique** se já existe uma Issue similar
2. **Abra uma Feature Request** com:
   - Título claro
   - Descrição detalhada
   - Casos de uso
   - Benefícios esperados
   - Mockups (se tiver)
3. **Use o template** de Feature Request

---

## 🧪 Testes

### Executar Testes

```bash
# Unit tests (futuro)
npm run test

# E2E tests (futuro)
npm run test:e2e

# Coverage (futuro)
npm run test:coverage
```

### Testar Manualmente

1. **Homepage**: Navegação e cards
2. **Doenças**: Busca, filtros, detalhes
3. **Jogos**: Todos os 5 jogos
4. **Vídeos**: Player e categorias
5. **Submissão**: Formulário completo
6. **Moderação**: Dashboard e ações
7. **Acessibilidade**: Navegação por teclado, screen reader

---

## 📱 Dispositivos Testados

| Dispositivo | Navegador | Status |
|-------------|-----------|--------|
| 🖥️ Desktop (1920x1080) | Chrome 120+ | ✅ |
| 🖥️ Desktop (1920x1080) | Firefox 121+ | ✅ |
| 🖥️ Desktop (1920x1080) | Edge 120+ | ✅ |
| 💻 Laptop (1366x768) | Chrome | ✅ |
| 📱 iPhone 13 (390x844) | Safari | ✅ |
| 📱 Samsung Galaxy (360x740) | Chrome | ✅ |
| 📱 iPad (1024x1366) | Safari | ✅ |
| ♿ Screen Readers | NVDA, JAWS | ✅ |

---

## 🔒 Segurança

### Reportar Vulnerabilidades

Se encontrou uma vulnerabilidade de segurança, **NÃO abra uma Issue pública**.

📧 Envie para: `security@drinfantil.com.br` *(exemplo)*

Responderemos em até 48 horas.

### Política de Segurança

- Nunca armazene dados sensíveis de saúde sem consentimento
- LGPD compliance obrigatório
- Dados criptografados em trânsito (HTTPS)
- Dados criptografados em repouso (futuro: database encryption)
- Autenticação segura (JWT + Refresh Tokens)
- Rate limiting em todas as APIs
- Input validation e sanitization
- XSS e CSRF protection

---

## 📞 Contato & Suporte

### 💬 Comunidade

- **GitHub Discussions**: [Discussões](https://github.com/filipepaulista12/dr_infantil/discussions)
- **GitHub Issues**: [Issues](https://github.com/filipepaulista12/dr_infantil/issues)

### 📧 Email

- **Geral**: contato@drinfantil.com.br *(exemplo)*
- **Profissionais**: profissionais@drinfantil.com.br *(exemplo)*
- **Parcerias**: parcerias@drinfantil.com.br *(exemplo)*
- **Suporte**: suporte@drinfantil.com.br *(exemplo)*
- **Segurança**: security@drinfantil.com.br *(exemplo)*

### 🌐 Redes Sociais *(exemplo)*

- **Twitter**: [@drinfantil](https://twitter.com/drinfantil)
- **Instagram**: [@drinfantil](https://instagram.com/drinfantil)
- **Facebook**: [facebook.com/drinfantil](https://facebook.com/drinfantil)
- **LinkedIn**: [DR Infantil](https://linkedin.com/company/drinfantil)
- **YouTube**: [DR Infantil](https://youtube.com/@drinfantil)

---

## 📜 Licença

Este projeto está licenciado sob a **MIT License**.

```
MIT License

Copyright (c) 2025 DR Infantil

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Ver arquivo [LICENSE](./LICENSE) completo.

---

## 🙏 Agradecimentos

### 💜 Contribuidores

Agradecimento especial a todos que contribuíram:

- **Desenvolvedores**: Código, features, fixes
- **Profissionais de Saúde**: Revisão médica, conteúdo
- **Designers**: UI/UX, ilustrações, animações
- **Associações**: Parcerias, conteúdo, divulgação
- **Famílias**: Histórias, feedback, testes

### 🛠️ Tecnologias

Construído com tecnologias open-source incríveis:

- [React](https://react.dev/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Vite](https://vite.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://zustand-demo.pmnd.rs/) - State Management
- [Lucide](https://lucide.dev/) - Icons

### 🌟 Inspiração

Inspirado por:

- Famílias corajosas enfrentando doenças raras
- Profissionais de saúde dedicados
- Associações que não desistem nunca
- Comunidade open-source global

---

## 📈 Estatísticas do Repositório

![GitHub stars](https://img.shields.io/github/stars/filipepaulista12/dr_infantil?style=social)
![GitHub forks](https://img.shields.io/github/forks/filipepaulista12/dr_infantil?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/filipepaulista12/dr_infantil?style=social)

![GitHub issues](https://img.shields.io/github/issues/filipepaulista12/dr_infantil)
![GitHub pull requests](https://img.shields.io/github/issues-pr/filipepaulista12/dr_infantil)
![GitHub last commit](https://img.shields.io/github/last-commit/filipepaulista12/dr_infantil)
![GitHub contributors](https://img.shields.io/github/contributors/filipepaulista12/dr_infantil)

---

<div align="center">

## ⭐ Se este projeto te ajudou, deixe uma estrela!

### 💜 Feito com amor e dedicação pela equipe DR Infantil

**Educação em saúde acessível para todos**

[🚀 Demo](http://localhost:5173) • [📚 Docs](./INTEGRACAO_COMPLETA.md) • [🗺️ Roadmap](./ROADMAP.md) • [🐛 Issues](https://github.com/filipepaulista12/dr_infantil/issues) • [💬 Discussions](https://github.com/filipepaulista12/dr_infantil/discussions)

---

**Última atualização:** 03 de Outubro de 2025  
**Versão:** 1.0.0 (Sistema de Submissão Comunitária)

[⬆️ Voltar ao topo](#-dr-infantil---plataforma-educativa-de-saúde-infantil)

</div>

---

**DR Infantil** - Educação em saúde de forma divertida e segura para crianças 🏥👶