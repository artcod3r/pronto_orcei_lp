# Especificação de Design: Organização de Arquivos e Separação de CSS/JS

- **Data:** 2026-10-08
- **Projeto:** ProntoOrcei Landing Page (`pronto_orcei_lp`)
- **Status:** Aprovado

---

## 1. Contexto e Objetivos

O projeto `pronto_orcei_lp` possui atualmente seus estilos personalizados e rotinas JavaScript inline dentro dos arquivos HTML (`index.html`, `privacidade.html`, `termos.html`), além de imagens e ferramentas utilitárias na raiz do diretório.

Os objetivos desta reestruturação são:
1. **Organização e Modularidade:** Separar CSS e JavaScript em pastas dedicadas (`assets/css/` e `assets/js/`).
2. **Centralização de Recursos:** Agrupar imagens em `assets/images/` e mover geradores utilitários para `tools/`.
3. **Manutenção de SEO e Rotas:** Manter os arquivos HTML principais (`index.html`, `privacidade.html`, `termos.html`) e metadados de rastreamento (`robots.txt`, `sitemap.xml`, `favico.ico`) na raiz do repositório.
4. **Sem Dependência de Ferramentas de Build:** O projeto continuará 100% estático e compatível com navegadores modernos sem necessidade de Node.js, empacotadores ou etapas de compilação.

---

## 2. Estrutura de Diretórios Alvo

```text
pronto_orcei_lp/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── tailwind-config.js
│   │   └── main.js
│   └── images/
│       ├── logo_prontoorcei_wo_bg.png
│       ├── Print01.jpeg
│       ├── Print02.jpeg
│       ├── Print03.jpeg
│       └── Print04.jpeg
├── tools/
│   ├── banner.html
│   └── screenshots_generator.html
├── docs/
│   └── superpowers/
│       ├── specs/
│       └── plans/
├── index.html
├── privacidade.html
├── termos.html
├── favico.ico
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## 3. Especificação dos Componentes

### 3.1. Folha de Estilos (`assets/css/style.css`)
Centraliza todas as regras que estavam em blocos `<style>` inline nas páginas:
- Classe `.glow-effect`: efeito radial de iluminação de fundo.
- Classe `.badge-shimmer` e `@keyframes shimmer`: animação de brilho em badges promocionais.
- Utilizado por: `index.html`, `privacidade.html`, `termos.html` através da tag:
  ```html
  <link rel="stylesheet" href="assets/css/style.css">
  ```

### 3.2. Configuração do Tailwind (`assets/js/tailwind-config.js`)
Centraliza as extensões do Tailwind CDN compartilhadas entre todas as páginas:
- Fontes customizadas: `Plus Jakarta Sans` e `Momo Signature`.
- Paleta de cores da marca: `brand.navy`, `brand.dark`, `brand.blue`, `brand.emerald`, `brand.surface`, `brand.accent`.
- Carregado antes ou logo após a tag do Tailwind CDN:
  ```html
  <script src="assets/js/tailwind-config.js"></script>
  ```

### 3.3. JavaScript da Aplicação (`assets/js/main.js`)
Consolida os scripts comportamentais executados pelo cliente:
1. **Ícones Lucide:** Inicialização via `lucide.createIcons()`.
2. **Banner de Consentimento LGPD:**
   - Verificação no `localStorage` da chave `prontoorcei_cookie_consent_v1`.
   - Remoção da classe `hidden` caso não esteja consentido.
   - Atualização de consentimento via `gtag('consent', 'update', ...)` ao aceitar.
3. **Telemetria e Google Analytics:**
   - Função utilitária `sendGoogleEvent(eventName, params)` integrada com `dataLayer` e `gtag`.
   - Monitoramento de cliques nos botões de CTA e download com atributo `[data-track-event]`.
   - Monitoramento de interação com perguntas frequentes (`#faq details`).
   - Monitoramento de profundidade de rolagem (marcos de 25%, 50%, 75% e 90%).
- Carregado com `defer` ou ao final do `<body>`:
  ```html
  <script src="assets/js/main.js" defer></script>
  ```

### 3.4. Scripts Essenciais Preservados no `<head>` dos HTMLs
Para garantir compliance com as diretrizes do Google Tag Manager e Search Console, permanecem no HTML:
- Configuração padrão do Consent Mode v2 (`gtag('consent', 'default', ...)`).
- Snippet assíncrono do Google Tag Manager (`googletagmanager.com/gtm.js?id=GTM-TVSRSR45`).
- Bloco de dados estruturados Schema.org (`<script type="application/ld+json">`).

### 3.5. Imagens e Atualização de Referências (`assets/images/`)
- Mover para `assets/images/`:
  - `logo_prontoorcei_wo_bg.png`
  - `Print01.jpeg`, `Print02.jpeg`, `Print03.jpeg`, `Print04.jpeg`
- Atualizar todas as menções em `index.html`, `privacidade.html`, `termos.html`:
  - `og:image` e `twitter:image`: `https://prontoorcei.com.br/assets/images/logo_prontoorcei_wo_bg.png`
  - Schema JSON-LD: `"logo": "https://prontoorcei.com.br/assets/images/logo_prontoorcei_wo_bg.png"`
  - Todas as tags `<img>` e referências relativas (`src="assets/images/..."`).

### 3.6. Ferramentas Utilitárias (`tools/`)
- Mover `banner.html` e `screenshots_generator.html` para `tools/`.
- Atualizar os caminhos relativos em `screenshots_generator.html` para apontar para `../assets/images/Print01.jpeg` etc.

---

## 4. Plano de Validação e Critérios de Sucesso

1. **Integridade Visual:**
   - Cores da marca, tipografia e espaçamentos permanecem idênticos.
   - Efeitos de brilho e animações shimmer continuam funcionando perfeitamente.
2. **Integridade de Funcionalidades:**
   - Banner de cookies LGPD continua aparecendo para novos acessos e gravando consentimento.
   - Eventos de clique em CTAs continuam disparando `dataLayer` e `gtag`.
   - Ícones Lucide continuam sendo renderizados.
3. **Consistência de Links e Assets:**
   - Nenhuma requisição com status 404 para imagens, estilos ou scripts.
   - URLs de SEO (sitemap, robots, Open Graph e Twitter Cards) corretas e apontando para os novos caminhos.
