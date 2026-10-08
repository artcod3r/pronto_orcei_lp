# Organização de Arquivos e Separação de CSS/JS - Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) ou superpowers:executing-plans para implementar este plano tarefa por tarefa. As etapas usam a sintaxe de checkbox (`- [ ]`) para rastreamento.

**Goal:** Reestruturar o projeto organizando os ativos em `assets/css/`, `assets/js/` e `assets/images/`, movendo geradores para `tools/`, e extraindo o CSS customizado e JavaScript inline em arquivos dedicados mantendo compatibilidade 100% estática.

**Architecture:** Mover arquivos de mídia e geradores para pastas específicas; criar `assets/css/style.css` para estilos e animações customizadas; criar `assets/js/tailwind-config.js` e `assets/js/main.js` para configuração e lógica comportamental (LGPD, telemetria, Lucide); atualizar todas as referências nos arquivos HTML sem introduzir dependências de build.

**Tech Stack:** HTML5, CSS3, JavaScript (ES6+ Vanilla), Tailwind CSS (CDN), Lucide Icons (CDN), Google Tag Manager & Google Analytics 4.

## Global Constraints
- Manter o projeto 100% estático (sem npm, sem Vite, sem build step).
- Manter `index.html`, `privacidade.html`, `termos.html`, `favico.ico`, `robots.txt` e `sitemap.xml` na raiz.
- Manter snippets essenciais do GTM, Google Consent Mode v2 default e Schema.org no `<head>` dos HTMLs.
- Atualizar todas as tags `<img>`, `og:image`, `twitter:image` e JSON-LD para os novos caminhos.

---

### Task 1: Criar Diretórios e Extrair `assets/css/style.css`

**Files:**
- Create: `assets/css/style.css`

**Interfaces:**
- Produces: classes CSS `.glow-effect`, `.badge-shimmer` e animação `@keyframes shimmer`.

- [x] **Step 1: Criar diretórios de assets e tools**
Criar as pastas `assets/css`, `assets/js`, `assets/images` e `tools`.

```bash
mkdir -p assets/css assets/js assets/images tools
```

- [x] **Step 2: Criar o arquivo `assets/css/style.css`**
Extrair as regras de estilo presentes em `index.html`, `privacidade.html` e `termos.html`.

```css
/* Efeitos visuais e animações personalizadas - ProntoOrcei */

.glow-effect {
  background: radial-gradient(circle at 50% 50%, rgba(0, 168, 107, 0.15) 0%, rgba(15, 76, 129, 0.05) 50%, transparent 100%);
}

.badge-shimmer {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);
  background-size: 200% 100%;
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
```

- [x] **Step 3: Verificar criação e sintaxe do CSS**
Verificar se o arquivo foi criado corretamente e tem conteúdo válido.

- [x] **Step 4: Commit**
```bash
git add assets/css/style.css
git commit -m "feat(css): extrair estilos e animacoes customizadas para assets/css/style.css"
```

---

### Task 2: Extrair Configuração do Tailwind para `assets/js/tailwind-config.js`

**Files:**
- Create: `assets/js/tailwind-config.js`

**Interfaces:**
- Produces: `tailwind.config` com família de fontes ('Plus Jakarta Sans', 'Momo Signature') e paleta de cores `brand` ('navy', 'dark', 'blue', 'emerald', 'surface', 'accent').

- [x] **Step 1: Criar o arquivo `assets/js/tailwind-config.js`**

```javascript
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        momo: ['"Momo Signature"', 'cursive'],
      },
      colors: {
        brand: {
          navy: '#0F4C81',
          dark: '#0A2540',
          blue: '#2D82B7',
          emerald: '#00A86B',
          surface: '#F8F9FA',
          accent: '#10B981'
        }
      }
    }
  }
};
```

- [x] **Step 2: Verificar sintaxe**
Executar validação rápida de sintaxe Node (se disponível) ou checagem estática.
```bash
node -c assets/js/tailwind-config.js
```

- [x] **Step 3: Commit**
```bash
git add assets/js/tailwind-config.js
git commit -m "feat(js): extrair configuracao do tailwind para assets/js/tailwind-config.js"
```

---

### Task 3: Extrair Comportamentos da Aplicação para `assets/js/main.js`

**Files:**
- Create: `assets/js/main.js`

**Interfaces:**
- Consumes: `lucide` (global do CDN), `window.dataLayer`, `gtag` (se presente).
- Produces: inicialização de ícones, gerenciamento do banner LGPD, tracking de eventos de clique em CTAs, acordeão FAQ e profundidade de scroll.

- [x] **Step 1: Criar `assets/js/main.js`**

```javascript
// Inicialização de Ícones Lucide
if (window.lucide && typeof window.lucide.createIcons === 'function') {
  window.lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', function () {
  // Re-executa Lucide caso o DOM não tenha sido completamente renderizado antes
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // 1. LGPD Cookie Banner handler
  var consentBanner = document.getElementById('cookie-consent-banner');
  var acceptBtn = document.getElementById('accept-cookies-btn');
  var consentKey = 'prontoorcei_cookie_consent_v1';

  if (!localStorage.getItem(consentKey)) {
    if (consentBanner) consentBanner.classList.remove('hidden');
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      localStorage.setItem(consentKey, 'granted');
      if (consentBanner) consentBanner.classList.add('hidden');
      if (typeof gtag === 'function') {
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
      }
    });
  }

  // Função utilitária para envio de eventos de telemetria
  function sendGoogleEvent(eventName, params) {
    // Push to DataLayer for Google Tag Manager (GTM)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, params));

    // Push directly to Google Analytics 4 (GA4 gtag.js)
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }

  // 2. Track CTAs and App Download buttons
  document.addEventListener('click', function (e) {
    var trackEl = e.target.closest('[data-track-event]');
    if (trackEl) {
      var eventName = trackEl.getAttribute('data-track-event') || 'cta_click';
      var location = trackEl.getAttribute('data-track-location') || 'unknown';
      var destination = trackEl.getAttribute('href') || '';

      sendGoogleEvent(eventName, {
        event_category: 'engagement',
        button_location: location,
        destination_url: destination
      });
    }
  });

  // 3. Track FAQ accordion interactions
  var faqDetails = document.querySelectorAll('#faq details');
  if (faqDetails.length > 0) {
    faqDetails.forEach(function (detailEl) {
      detailEl.addEventListener('toggle', function () {
        if (detailEl.open) {
          var questionEl = detailEl.querySelector('summary span');
          var question = questionEl ? questionEl.innerText.trim() : 'FAQ';
          sendGoogleEvent('faq_interaction', {
            event_category: 'faq',
            question_title: question
          });
        }
      });
    });
  }

  // 4. Scroll Depth Tracking (25%, 50%, 75%, 90%)
  var scrollMarks = { 25: false, 50: false, 75: false, 90: false };
  window.addEventListener('scroll', function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight <= 0) return;
    var scrollPercent = Math.round((scrollTop / docHeight) * 100);

    [25, 50, 75, 90].forEach(function (mark) {
      if (scrollPercent >= mark && !scrollMarks[mark]) {
        scrollMarks[mark] = true;
        sendGoogleEvent('scroll_depth', {
          depth_percentage: mark
        });
      }
    });
  }, { passive: true });
});
```

- [x] **Step 2: Verificar sintaxe**
```bash
node -c assets/js/main.js
```

- [x] **Step 3: Commit**
```bash
git add assets/js/main.js
git commit -m "feat(js): extrair logica de banner lgpd, eventos e tracking para assets/js/main.js"
```

---

### Task 4: Mover Imagens para `assets/images/` e Geradores para `tools/`

**Files:**
- Move: `logo_prontoorcei_wo_bg.png` -> `assets/images/logo_prontoorcei_wo_bg.png`
- Move: `Print01.jpeg` -> `assets/images/Print01.jpeg`
- Move: `Print02.jpeg` -> `assets/images/Print02.jpeg`
- Move: `Print03.jpeg` -> `assets/images/Print03.jpeg`
- Move: `Print04.jpeg` -> `assets/images/Print04.jpeg`
- Move: `banner.html` -> `tools/banner.html`
- Move: `screenshots_generator.html` -> `tools/screenshots_generator.html`

- [x] **Step 1: Mover os arquivos via git mv**
```bash
git mv logo_prontoorcei_wo_bg.png assets/images/
git mv Print01.jpeg Print02.jpeg Print03.jpeg Print04.jpeg assets/images/
git mv banner.html tools/
git mv screenshots_generator.html tools/
```

- [x] **Step 2: Atualizar referências internas de arquivos em `tools/`**
Em `tools/screenshots_generator.html`, alterar referências de `'Print01.jpeg'` para `'../assets/images/Print01.jpeg'`, etc.

- [x] **Step 3: Commit**
```bash
git add assets/images/ tools/
git commit -m "refactor: mover imagens para assets/images/ e geradores para tools/"
```

---

### Task 5: Atualizar `index.html`, `privacidade.html` e `termos.html`

**Files:**
- Modify: `index.html`
- Modify: `privacidade.html`
- Modify: `termos.html`

- [x] **Step 1: Atualizar `index.html`**
  - Adicionar `<link rel="stylesheet" href="assets/css/style.css">` no `<head>`.
  - Substituir o bloco inline `<script> tailwind.config = ... </script>` por `<script src="assets/js/tailwind-config.js"></script>`.
  - Remover a tag `<style>` inline.
  - Atualizar caminhos de imagens de `logo_prontoorcei_wo_bg.png` para `assets/images/logo_prontoorcei_wo_bg.png` em `og:image`, `twitter:image`, JSON-LD Schema e todas as tags `<img>`.
  - Remover scripts inline de inicialização do Lucide e tracking do final do `<body>` e incluir `<script src="assets/js/main.js"></script>`.

- [x] **Step 2: Atualizar `privacidade.html`**
  - Adicionar `<link rel="stylesheet" href="assets/css/style.css">` no `<head>`.
  - Substituir inline tailwind.config por `<script src="assets/js/tailwind-config.js"></script>`.
  - Remover a tag `<style>` inline.
  - Atualizar caminhos da imagem do logo para `assets/images/logo_prontoorcei_wo_bg.png`.
  - Substituir inline `<script> lucide.createIcons(); </script>` no rodapé por `<script src="assets/js/main.js"></script>`.

- [x] **Step 3: Atualizar `termos.html`**
  - Adicionar `<link rel="stylesheet" href="assets/css/style.css">` no `<head>`.
  - Substituir inline tailwind.config por `<script src="assets/js/tailwind-config.js"></script>`.
  - Remover a tag `<style>` inline.
  - Atualizar caminhos da imagem do logo para `assets/images/logo_prontoorcei_wo_bg.png`.
  - Substituir inline `<script> lucide.createIcons(); </script>` no rodapé por `<script src="assets/js/main.js"></script>`.

- [x] **Step 4: Commit**
```bash
git add index.html privacidade.html termos.html
git commit -m "refactor(html): vincular arquivos externos de css, js e atualizar paths de imagens"
```

---

### Task 6: Validação Completa e Verificação de Integridade

**Files:**
- Inspect: todos os arquivos HTML, CSS e JS modificados.

- [x] **Step 1: Verificar se restaram referências antigas a imagens na raiz**
Executar grep para garantir que nenhuma página faz referência a `src="logo_` ou `src="Print` sem prefixo `assets/images/` ou `../assets/images/`.

```bash
git grep 'logo_prontoorcei_wo_bg.png'
git grep 'Print0'
```

- [x] **Step 2: Testar se os arquivos locais carregam sem erros no navegador ou via linter**
Verificar se todas as tags link e script apontam para arquivos existentes no disco.

- [x] **Step 3: Commit final se houver ajustes**
```bash
git status
```
