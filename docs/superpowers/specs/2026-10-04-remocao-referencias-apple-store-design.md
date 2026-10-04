# Design: Remoção de Referências à Apple Store / iOS na Landing Page

**Data:** 2026-10-04  
**Status:** Aprovado  
**Contexto:** O aplicativo ProntoOrcei terá lançamento inicial exclusivo para Android via Google Play Store. As referências comerciais e legais à Apple App Store / Apple ID devem ser removidas para evitar confusão de usuários e manter conformidade estrita com a oferta ativa.

---

## 1. Escopo e Objetivos

- **Remover** o botão de download da App Store na seção Hero da landing page principal.
- **Ajustar** respostas do FAQ referentes ao plano vitalício e contas vinculadas para citar apenas Google Play / Conta Google.
- **Manter** a menção explicativa no FAQ sobre clientes finais conseguirem abrir orçamentos em PDF enviados no WhatsApp em qualquer aparelho (Android, iPhone ou PC).
- **Atualizar** os documentos contratuais e de privacidade (`termos.html` e `privacidade.html`) para referenciar estritamente a Google Play Store e ambiente Android.
- **Atualizar** a documentação do projeto (`README.md`).

---

## 2. Detalhamento das Alterações

### 2.1 `index.html`
- **Seção Hero (botões de download):**
  - Remover o elemento `<a>` correspondente ao download na "App Store" (ícone da Apple, texto "Baixe na App Store").
  - Manter o botão "Disponível no Google Play" com o devido alinhamento responsivo.
- **Seção FAQ (Item 3 - Pagamento único do plano Vitalício):**
  - Alterar o texto de:
    `Você paga apenas R$ 69,90 uma única vez direto na Google Play ou App Store. O acesso PRO definitivo fica atrelado à sua conta do Google ou Apple para sempre...`
    para:
    `Você paga apenas R$ 69,90 uma única vez direto na Google Play. O acesso PRO definitivo fica atrelado à sua conta do Google para sempre...`
- **Seção FAQ (Item 2 - Visualização do PDF):**
  - Manter a referência a iPhone (`(Android, iPhone) ou computador`) pois se refere à compatibilidade do arquivo PDF aberto pelo cliente final, e não à instalação do app.

### 2.2 `termos.html`
- **Cláusula 4.1 (Processamento de Pagamentos):**
  - Alterar `pelas lojas oficiais de distribuição (Google Play Store e Apple App Store)` para `pela loja oficial de distribuição (Google Play Store)`.
- **Cláusula 4.2 (Renovação e Cancelamento):**
  - Alterar `através do painel de assinaturas de sua conta Google Play ou Apple ID` para `através do painel de assinaturas de sua conta Google Play`.
- **Cláusula 4.3 (Compra Vitalícia):**
  - Alterar `atrelada à sua conta Google Play ou Apple ID` para `atrelada à sua conta Google Play`.
- **Cláusula 4.4 (Direito de Arrependimento e Reembolso):**
  - Alterar `da loja de aplicativos correspondente (Google Play ou Apple)` para `da loja de aplicativos Google Play Store`.

### 2.3 `privacidade.html`
- **Cláusula 2 (Dados Coletados Automaticamente):**
  - Alterar `versão do sistema operacional (Android ou iOS)` para `versão do sistema operacional (Android)`.
- **Cláusula 3 (Finalidades do Tratamento de Dados):**
  - Alterar `junto às lojas de aplicativos Google Play e Apple App Store` para `junto à loja de aplicativos Google Play Store`.
- **Cláusula 4 (Compartilhamento de Dados com Terceiros):**
  - Alterar `Lojas de Aplicativos (Google e Apple):` para `Loja de Aplicativos (Google Play):`.

### 2.4 `README.md`
- Atualizar a seção descritiva de `termos.html` para remover a menção à Apple App Store.

---

## 3. Critérios de Sucesso e Verificação

- Nenhuma ocorrência de botão de download da App Store na interface visual.
- Nenhuma menção a App Store ou Apple ID nos fluxos de contratação ou termos legais.
- Busca textual por termos como `Apple App Store`, `Apple ID` e botão `App Store` resulta em 0 ocorrências relevantes no repositório.
- A página renderiza perfeitamente em telas móveis e desktop com o botão do Google Play devidamente centralizado/alinhado.
