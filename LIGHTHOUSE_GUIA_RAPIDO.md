# 🚀 PASSO 2: LIGHTHOUSE AUDIT - GUIA RÁPIDO

## ⚡ Método Mais Rápido (Chrome DevTools)

### 1️⃣ **Abra a aplicação**
```
http://localhost:5173/
```

### 2️⃣ **Abra o DevTools**
Pressione: **F12**

### 3️⃣ **Vá para Lighthouse**
- Clique na aba **"Lighthouse"** no topo do DevTools
- Se não aparecer, clique no `>>` e selecione

### 4️⃣ **Configure**
- ✅ Marque **APENAS** "Accessibility"
- ✅ Device: Desktop
- ✅ Mode: Navigation

### 5️⃣ **Execute**
Clique em: **"Analyze page load"**

### 6️⃣ **Aguarde**
⏳ 10-30 segundos...

### 7️⃣ **Veja o Score**
🎯 Meta: **90-100/100**

---

## 📊 O que Esperar

### ✅ **Score Esperado: 95-100**

**Passando:**
- ✅ Names and labels (todos elementos têm aria-label)
- ✅ Keyboard navigation (skip link + Tab)
- ✅ ARIA attributes (roles corretos)
- ✅ Focus visible (outline roxo)
- ✅ No keyboard traps (ESC funciona)

**Possíveis Warnings (OK):**
- ⚠️ Contrast em gradientes (não crítico)
- ⚠️ SVG sem aria-hidden (não crítico)

---

## 🎯 Páginas Principais para Testar

1. **Home Page** → http://localhost:5173/
2. **Quiz** → Navegue: Games → Quiz
3. **Hangman** → Navegue: Games → Hangman
4. **Memory Game** → Navegue: Games → Memory
5. **Puzzle Game** → Navegue: Games → Puzzle

**Dica:** Execute o audit em cada página separadamente!

---

## 📸 Screenshot do que você verá

```
┌─────────────────────────────────────┐
│  Lighthouse                         │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Categories                   │ │
│  │  ☐ Performance               │ │
│  │  ☑ Accessibility    ← MARCAR │ │
│  │  ☐ Best Practices            │ │
│  │  ☐ SEO                       │ │
│  │  ☐ PWA                       │ │
│  └───────────────────────────────┘ │
│                                     │
│  Device: ⚫ Mobile  ⚪ Desktop      │
│                                     │
│  [  Analyze page load  ]           │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎉 Resultado Esperado

```
╔════════════════════════════════════╗
║     ACCESSIBILITY SCORE            ║
║                                    ║
║          98/100  ✅                ║
║                                    ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░              ║
╚════════════════════════════════════╝

✅ Passed audits (45)
⚠️ Warnings (2)
❌ Failed audits (0)
```

---

## 🐛 Se aparecer Warning

### Warning: "Background and foreground colors do not have sufficient contrast"
**Status:** ⚠️ Aceitável se for em gradientes decorativos
**Ação:** Nenhuma (não é crítico)

### Warning: "Image elements do not have [alt] attributes"
**Status:** ⚠️ Verificar se são SVGs decorativos
**Ação:** Adicionar `aria-hidden="true"` em SVGs decorativos

---

## ❌ Se aparecer Error

### Error: "Buttons do not have an accessible name"
**Causa:** Botão com ícone sem aria-label
**Solução:** Já corrigido! (não deve aparecer)

### Error: "Form elements do not have associated labels"
**Causa:** Input sem label
**Solução:** Já corrigido! (não deve aparecer)

---

## 📋 Checklist Rápido

- [ ] Servidor rodando em localhost:5173
- [ ] Chrome aberto
- [ ] F12 pressionado
- [ ] Aba Lighthouse selecionada
- [ ] Apenas "Accessibility" marcado
- [ ] "Analyze page load" clicado
- [ ] Aguardado resultado
- [ ] Score >= 90? ✅

---

## 📝 Depois do Audit, me diga:

1. **Qual foi o score?** (ex: 98/100)
2. **Quantos audits passaram?** (ex: 45 passed)
3. **Teve warnings?** (sim/não, quantos)
4. **Teve erros?** (sim/não, quais)

---

## 🚀 Próximo Passo

**Se score >= 90:**
✅ Vamos para o **Passo 3: Documentação Final**

**Se score < 90:**
⚠️ Vamos corrigir os problemas primeiro

---

## ⚡ Atalho PowerShell (Alternativo)

Se quiser automatizar, execute:

```powershell
.\run-lighthouse.ps1
```

E escolha a opção 8 para abrir o Chrome com instruções.

---

**🎯 Boa sorte! Esperamos 95+ no score! ✨**

Quando terminar, compartilhe o resultado aqui e seguimos! 🚀
