# Passo 2: Lighthouse Accessibility Audit

## 📅 Data: 3 de Outubro de 2025

---

## 🎯 Objetivo

Realizar uma auditoria automática de acessibilidade usando o Google Lighthouse para validar a conformidade WCAG 2.1 e identificar oportunidades de melhoria.

---

## 🔧 Como Executar o Lighthouse Audit

### **Método 1: Chrome DevTools (Recomendado)**

1. **Abrir a aplicação no Chrome:**
   ```
   http://localhost:5173/
   ```

2. **Abrir DevTools:**
   - Pressione `F12` ou
   - Clique direito → "Inspecionar" ou
   - `Ctrl + Shift + I` (Windows/Linux)
   - `Cmd + Option + I` (Mac)

3. **Navegar até Lighthouse:**
   - Na barra superior do DevTools, clique na aba **"Lighthouse"**
   - Se não aparecer, clique no `>>` e selecione "Lighthouse"

4. **Configurar o Audit:**
   - ✅ **Categories**: Marque apenas **"Accessibility"**
   - ✅ **Device**: Selecione **"Desktop"** (ou Mobile para testar responsividade)
   - ✅ **Mode**: **"Navigation"** (default)

5. **Executar:**
   - Clique em **"Analyze page load"**
   - Aguarde 10-30 segundos

6. **Visualizar Resultados:**
   - Score de 0-100 será exibido
   - Lista de problemas encontrados
   - Sugestões de correção

---

### **Método 2: Lighthouse CLI (Alternativo)**

```bash
# Instalar Lighthouse globalmente
npm install -g lighthouse

# Executar audit
lighthouse http://localhost:5173/ --only-categories=accessibility --view

# Salvar relatório em HTML
lighthouse http://localhost:5173/ --only-categories=accessibility --output html --output-path ./lighthouse-report.html
```

---

## 📊 Meta de Score

### **Objetivo:**
- ✅ **Score mínimo:** 90/100
- 🎯 **Score ideal:** 95-100/100

### **Interpretação:**
- **90-100:** Excelente ✅
- **80-89:** Bom ⚠️ (pequenas melhorias necessárias)
- **70-79:** Razoável ⚠️ (melhorias recomendadas)
- **< 70:** Insuficiente ❌ (correções urgentes)

---

## 🧪 Páginas para Auditar

Execute o Lighthouse em cada uma das páginas principais:

### **1. Home Page**
```
http://localhost:5173/
```
**Elementos críticos:**
- Skip link
- Header navigation
- Cards de doenças
- Footer

---

### **2. Quiz**
```
http://localhost:5173/ → Games → Quiz
```
**Elementos críticos:**
- Botões de resposta
- ARIA live regions
- Progress bar
- Modal de resultado

---

### **3. Memory Game**
```
http://localhost:5173/ → Games → Memory Game
```
**Elementos críticos:**
- Cards com aria-label
- Botões de reiniciar
- Modal de conclusão

---

### **4. Hangman Game**
```
http://localhost:5173/ → Games → Hangman
```
**Elementos críticos:**
- Teclado virtual (role="group")
- Botões de letras com aria-pressed
- Modais de vitória/derrota

---

### **5. Puzzle Game**
```
http://localhost:5173/ → Games → Puzzle
```
**Elementos críticos:**
- Botões de peças
- Botões de navegação
- Modal de conclusão

---

### **6. Coloring Game**
```
http://localhost:5173/ → Games → Coloring
```
**Elementos críticos:**
- Paleta de cores
- SVG interativo
- Botões de controle

---

## ✅ Checklist de Verificação

### **Antes de Executar o Audit:**

- [ ] Servidor dev rodando em `http://localhost:5173/`
- [ ] Chrome/Chromium atualizado (versão 90+)
- [ ] DevTools aberto na aba Lighthouse
- [ ] Nenhuma extensão interferindo (modo anônimo recomendado)
- [ ] Página totalmente carregada

---

## 📋 Categorias Auditadas pelo Lighthouse

### **1. Names and Labels**
Verifica se todos elementos interativos têm nomes acessíveis:
- ✅ Botões com `aria-label`
- ✅ Links com texto descritivo
- ✅ Inputs com labels associados
- ✅ Images com alt text

### **2. Contrast**
Verifica contraste de cores (WCAG AA: 4.5:1):
- ✅ Texto em background
- ✅ Botões e elementos interativos
- ✅ Links

### **3. Navigation**
Verifica navegação por teclado:
- ✅ Focus order lógico
- ✅ Focus trap evitado
- ✅ Skip links presentes

### **4. ARIA**
Verifica uso correto de ARIA:
- ✅ `role` apropriados
- ✅ `aria-*` attributes válidos
- ✅ Live regions funcionais

### **5. Forms**
Verifica acessibilidade de formulários:
- ✅ Labels associados
- ✅ Error messages
- ✅ Required fields indicados

### **6. Tables**
Verifica estrutura de tabelas:
- ✅ Headers definidos
- ✅ Caption presente
- ✅ Scope correto

---

## 🐛 Problemas Comuns e Soluções

### **Problema: "Button elements must have accessible text"**
**Solução:**
```tsx
// ❌ Ruim
<button><Icon /></button>

// ✅ Bom
<button aria-label="Fechar modal">
  <Icon />
</button>
```

---

### **Problema: "Links must have discernible text"**
**Solução:**
```tsx
// ❌ Ruim
<a href="/"><Icon /></a>

// ✅ Bom
<a href="/" aria-label="Ir para página inicial">
  <Icon />
</a>
```

---

### **Problema: "Background and foreground colors do not have sufficient contrast"**
**Solução:**
```css
/* ❌ Ruim: contraste 3:1 */
.text {
  color: #999;
  background: #fff;
}

/* ✅ Bom: contraste 4.5:1 */
.text {
  color: #666;
  background: #fff;
}
```

---

### **Problema: "Form elements must have labels"**
**Solução:**
```tsx
// ❌ Ruim
<input type="text" placeholder="Nome" />

// ✅ Bom
<label htmlFor="name">Nome</label>
<input id="name" type="text" placeholder="Digite seu nome" />
```

---

### **Problema: "ARIA attributes must conform to valid values"**
**Solução:**
```tsx
// ❌ Ruim
<button aria-pressed="yes">

// ✅ Bom
<button aria-pressed="true">
```

---

## 📊 Template de Relatório

Após executar o audit, preencha:

```markdown
### Lighthouse Audit - [PÁGINA]
**Data:** [DATA]
**Score:** [SCORE]/100

#### ✅ Passed Audits:
- [X] Names and labels
- [X] Contrast ratios
- [ ] ...

#### ⚠️ Warnings:
- [Descrição do warning]

#### ❌ Failed Audits:
- [Descrição da falha]
- Solução proposta: [...]

#### 🔧 Actions Taken:
- [Correção 1]
- [Correção 2]
```

---

## 🎯 Resultados Esperados

### **Categorias com Score 100:**
- ✅ Names and Labels (todos elementos têm aria-label)
- ✅ Navigation (skip link + keyboard nav)
- ✅ ARIA (roles corretos + live regions)

### **Categorias com Score 95-99:**
- ⚠️ Contrast (pode ter pequenos avisos em gradientes)

### **Categorias com Possíveis Warnings:**
- ⚠️ Forms (se FeedbackForm tiver campos opcionais sem label explícito)
- ⚠️ Images (SVGs podem não ter aria-hidden apropriado)

---

## 🚀 Próximos Passos Após Audit

### **Se Score >= 90:**
✅ Excelente! Seguir para **Passo 3: Documentação Final**

### **Se Score 80-89:**
⚠️ Revisar warnings e corrigir problemas menores

### **Se Score < 80:**
❌ Identificar e corrigir falhas críticas antes de continuar

---

## 📸 Screenshots Recomendados

Tire screenshots dos seguintes momentos:

1. **Lighthouse Score Overview**
   - Score geral de Accessibility
   - Gráfico circular

2. **Passed Audits**
   - Lista de audits que passaram (verde)

3. **Failed Audits** (se houver)
   - Detalhes das falhas
   - Sugestões do Lighthouse

4. **Opportunities**
   - Melhorias recomendadas

---

## 🔗 Recursos Úteis

- **Lighthouse Documentation:** https://developer.chrome.com/docs/lighthouse/
- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **WAVE Tool:** https://wave.webaim.org/

---

## 📝 Exemplo de Bom Resultado

```
╔════════════════════════════════════╗
║  Lighthouse Accessibility Report  ║
╠════════════════════════════════════╣
║  Score: 98/100                  ✅ ║
║                                    ║
║  Passed Audits: 45                 ║
║  Warnings: 2                       ║
║  Failed Audits: 0                  ║
╚════════════════════════════════════╝

⚠️ Warnings:
- Some elements have low contrast (non-critical)
- Consider adding more descriptive alt text

✅ Passed Audits:
- All interactive elements have accessible names
- Keyboard navigation fully functional
- ARIA attributes valid and properly used
- Skip links present
- Focus order logical
- No keyboard traps
- Sufficient color contrast (most elements)
```

---

## 🎬 Vamos Começar!

1. **Abra o Chrome:**
   ```
   http://localhost:5173/
   ```

2. **Pressione F12**

3. **Vá para aba "Lighthouse"**

4. **Selecione apenas "Accessibility"**

5. **Click "Analyze page load"**

6. **Aguarde o resultado...**

---

**Boa sorte! Esperamos um score de 90+ 🎯✨**

Quando terminar, compartilhe:
- O score final
- Quantos audits passaram
- Quais warnings/erros apareceram (se houver)

E então seguiremos para o **Passo 3**! 🚀
