# Remoção de Referências à Apple Store / iOS - Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) ou superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remover todas as referências à Apple Store, Apple ID e iOS na landing page, documentos legais e documentação para refletir o lançamento exclusivo no Google Play Store.

**Architecture:** Modificação direta nos arquivos HTML estáticos (`index.html`, `termos.html`, `privacidade.html`) e documentação (`README.md`), garantindo consistência textual e layout responsivo intacto sem dependências externas.

**Tech Stack:** HTML5, Tailwind CSS (via CDN), Vanilla JavaScript.

## Global Constraints

- O ProntoOrcei terá lançamento inicial exclusivo para Android via Google Play Store.
- O botão de download da App Store deve ser totalmente removido do Hero CTA.
- A menção a "iPhone" no FAQ sobre visualização de PDF por clientes deve ser mantida ("Qualquer smartphone (Android, iPhone) ou computador abre na hora...").
- Todas as menções a pagamentos, cancelamento, vinculação de conta e termos legais devem referenciar unicamente Google Play Store / Conta Google.

---

### Task 1: Atualizar `index.html` (Hero CTA e FAQ)

**Files:**
- Modify: `index.html:154-166` e `index.html:830-835`

**Interfaces:**
- Produces: Landing page sem o botão da App Store e FAQ alinhado com Google Play.

- [ ] **Step 1: Inspecionar o bloco do botão App Store e FAQ em `index.html`**

Verificar as linhas exatas do botão da App Store (linhas 155-165) e do FAQ do plano vitalício (linhas 831-832).

- [ ] **Step 2: Remover o botão da App Store no Hero**

Remover o elemento `<a>` correspondente ao download na App Store:
```html
            <a href="#"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-black text-white px-7 py-4 rounded-2xl font-bold shadow-xl shadow-slate-900/20 hover:shadow-slate-900/30 transition-all transform hover:-translate-y-0.5">
              <svg class="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                <path
                  d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-.95 2.77 1 .08 2.05-.52 2.68-1.27z" />
              </svg>
              <div class="text-left">
                <div class="text-[10px] text-slate-400 uppercase leading-none font-medium">Baixe na</div>
                <div class="text-base font-extrabold leading-tight">App Store</div>
              </div>
            </a>
```

- [ ] **Step 3: Atualizar FAQ do plano vitalício em `index.html`**

Substituir o parágrafo de resposta:
```html
          <p class="mt-4 text-sm text-slate-600 leading-relaxed">
            Você paga apenas R$ 69,90 uma única vez direto na Google Play ou App Store. O acesso PRO definitivo fica
            atrelado à sua conta do Google ou Apple para sempre, sem nenhuma cobrança surpresa, mensalidade ou renovação
            recorrente. Se trocar de aparelho no futuro, basta tocar em "Restaurar Compras".
          </p>
```
Por:
```html
          <p class="mt-4 text-sm text-slate-600 leading-relaxed">
            Você paga apenas R$ 69,90 uma única vez direto na Google Play. O acesso PRO definitivo fica
            atrelado à sua conta do Google para sempre, sem nenhuma cobrança surpresa, mensalidade ou renovação
            recorrente. Se trocar de aparelho no futuro, basta tocar em "Restaurar Compras".
          </p>
```

- [ ] **Step 4: Verificar se a remoção está limpa em `index.html`**

Executar busca por `App Store` em `index.html` e confirmar zero ocorrências.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "refactor(landing): remover botao app store e atualizar faq para google play"
```

---

### Task 2: Atualizar `termos.html` (Termos de Uso)

**Files:**
- Modify: `termos.html:245-266`

**Interfaces:**
- Produces: Termos de Uso adequados à contratação exclusiva via Google Play.

- [ ] **Step 1: Inspecionar cláusulas 4.1 a 4.4 em `termos.html`**

Localizar o bloco da cláusula 4 (Cobrança, Planos e Cancelamento).

- [ ] **Step 2: Atualizar cláusulas 4.1, 4.2, 4.3 e 4.4**

Substituir as 4 referências:
1. `(Google Play Store e Apple App Store)` -> `(Google Play Store)`
2. `painel de assinaturas de sua conta Google Play ou Apple ID.` -> `painel de assinaturas de sua conta Google Play.`
3. `atrelada à sua conta Google Play ou Apple ID, com possibilidade` -> `atrelada à sua conta Google Play, com possibilidade`
4. `da loja de aplicativos correspondente (Google Play ou Apple).` -> `da loja de aplicativos Google Play Store.`

- [ ] **Step 3: Verificar termos.html**

Executar busca por `Apple` em `termos.html` e verificar 0 ocorrências.

- [ ] **Step 4: Commit**

```bash
git add termos.html
git commit -m "legal: remover referencias a apple store nos termos de uso"
```

---

### Task 3: Atualizar `privacidade.html` (Política de Privacidade)

**Files:**
- Modify: `privacidade.html:234-299`

**Interfaces:**
- Produces: Política de privacidade atualizada sem menções a Apple ou iOS.

- [ ] **Step 1: Inspecionar cláusulas 2, 3 e 4 em `privacidade.html`**

Localizar:
1. Linha 235: `(Android ou iOS)`
2. Linha 256: `Google Play e Apple App Store`
3. Linha 297: `Lojas de Aplicativos (Google e Apple)`

- [ ] **Step 2: Aplicar substituições em `privacidade.html`**

1. Alterar `(Android ou iOS)` para `(Android)`.
2. Alterar `junto às lojas de aplicativos Google Play e Apple App Store;` para `junto à loja de aplicativos Google Play Store;`.
3. Alterar `<li><strong>Lojas de Aplicativos (Google e Apple):</strong> Para autenticação do status de compra e emissão de recibos de assinaturas;</li>` para `<li><strong>Loja de Aplicativos (Google Play):</strong> Para autenticação do status de compra e emissão de recibos de assinaturas;</li>`.

- [ ] **Step 3: Verificar privacidade.html**

Executar busca por `Apple` e `iOS` em `privacidade.html` e verificar 0 ocorrências.

- [ ] **Step 4: Commit**

```bash
git add privacidade.html
git commit -m "legal: remover referencias a apple e ios na politica de privacidade"
```

---

### Task 4: Atualizar `README.md`

**Files:**
- Modify: `README.md:60-63`

**Interfaces:**
- Produces: Documentação do projeto atualizada.

- [ ] **Step 1: Localizar referência em `README.md`**

Linha 61: `- **Termos de Uso (`termos.html`)**: Regras de contratação, planos, assinaturas anuais e compra vitalícia (Google Play e Apple App Store)...`

- [ ] **Step 2: Substituir texto**

Alterar para:
`- **Termos de Uso (`termos.html`)**: Regras de contratação, planos, assinaturas anuais e compra vitalícia (Google Play Store), cancelamento e isenção de responsabilidade sobre os negócios firmados entre prestadores e tomadores.`

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: atualizar readme com remocao da referencia a apple app store"
```

---

### Task 5: Validação Global e Verificação Final

**Files:**
- Audit: Todos os arquivos no workspace

- [ ] **Step 1: Executar busca textual global por 'apple' (case-insensitive)**

Confirmar que as únicas ocorrências restantes são seguras (fontes CSS `-apple-system` em templates gráficos).

- [ ] **Step 2: Executar busca textual global por 'App Store'**

Confirmar zero ocorrências no projeto.

- [ ] **Step 3: Validar estado do git status e git log**

Confirmar árvore de trabalho limpa e commits semânticos registrados.
