# ProntoOrcei — Landing Page Oficial

Landing page oficial de apresentação, conversão e termos institucionais do aplicativo **ProntoOrcei**, desenvolvido pela **ARTCODER SISTEMAS E TECNOLOGIA LTDA**.

O ProntoOrcei é uma solução móvel projetada para profissionais autônomos, microempreendedores individuais (MEI) e prestadores de serviços gerarem orçamentos e recibos profissionais em PDF em menos de 2 minutos, com envio direto pelo WhatsApp.

---

## 🚀 Tecnologias Utilizadas

A landing page foi desenvolvida com foco em performance máxima, carregamento instantâneo e excelente experiência do usuário, sem necessidade de etapas pesadas de build:

- **HTML5 Semântico**: Estruturação acessível com metatags Open Graph para pré-visualizações em redes sociais e WhatsApp.
- **Tailwind CSS (CDN)**: Configuração personalizada com a paleta de cores corporativa (`brand-navy`, `brand-dark`, `brand-emerald`, etc.).
- **Google Fonts**: Tipografia moderna utilizando a fonte [*Plus Jakarta Sans*](https://fonts.google.com/specimen/Plus+Jakarta+Sans).
- **Lucide Icons**: Pacote de ícones minimalistas em SVG para interfaces modernas.

---

## 📁 Estrutura de Arquivos

```text
pronto_orcei_lp/
├── assets/
│   ├── css/
│   │   └── style.css            # Efeitos visuais e animações personalizadas
│   ├── js/
│   │   ├── tailwind-config.js   # Configuração modular e temas do Tailwind
│   │   └── main.js              # Lógica de consentimento LGPD, ícones e tracking
│   └── images/
│       ├── logo_prontoorcei_wo_bg.png  # Logotipo oficial em alta resolução
│       ├── Print01.jpeg         # Screenshot da tela de gestão
│       ├── Print02.jpeg         # Screenshot da tela de propostas
│       ├── Print03.jpeg         # Screenshot da tela de assinatura digital
│       └── Print04.jpeg         # Screenshot da tela de Pix
├── tools/
│   ├── banner.html              # Utilitário de geração de banner (1024x500)
│   └── screenshots_generator.html # Gerador de screenshots para Play Store
├── index.html                   # Página principal de apresentação e conversão (Landing Page)
├── termos.html                  # Termos e Condições de Uso do aplicativo e serviços
├── privacidade.html             # Política de Privacidade em conformidade com a LGPD
├── favico.ico                   # Favicon do site
├── robots.txt                   # Diretrizes para motores de busca
├── sitemap.xml                  # Mapa de URLs do site
└── README.md                    # Documentação do projeto
```

---

## 💻 Como Visualizar Localmente

Como a aplicação é composta por arquivos estáticos puros, não há dependência de compiladores ou gerenciadores de pacotes.

### Opção 1: Abrir diretamente no navegador
Basta dar um duplo clique no arquivo `index.html` ou abri-lo pelo seu navegador de preferência.

### Opção 2: Servidor local de desenvolvimento

Com **Python**:
```bash
# Python 3
python3 -m http.server 3000
```
Em seguida, acesse no navegador: `http://localhost:3000`

Com **Node.js / npx**:
```bash
npx serve .
```

Com a extensão **Live Server** (VS Code / Antigravity IDE):
Clique com o botão direito no `index.html` e selecione *"Open with Live Server"*.

---

## 📄 Páginas Institucionais e Jurídicas

- **Termos de Uso (`termos.html`)**: Regras de contratação, planos, assinaturas anuais e compra vitalícia (Google Play Store), cancelamento e isenção de responsabilidade sobre os negócios firmados entre prestadores e tomadores.
- **Política de Privacidade (`privacidade.html`)**: Em estrita conformidade com a **Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)**, detalhando finalidades de tratamento, direitos dos titulares e contato com o Encarregado de Dados (DPO).

---

## ⚖️ Licença

Copyright © 2026 **ARTCODER SISTEMAS E TECNOLOGIA LTDA** (CNPJ: 41.283.355/0001-12).  
Todos os direitos reservados.

Este repositório e seus códigos-fonte, elementos gráficos, logotipos e textos são de propriedade exclusiva da ARTCODER. Não é permitida a reprodução, distribuição, modificação ou uso comercial não autorizado de qualquer parte deste projeto sem autorização prévia por escrito.

---

## 📬 Contato e Suporte

- **Website**: [prontoorcei.com.br](https://prontoorcei.com.br/)
- **E-mail de Suporte e DPO**: [contato@prontoorcei.com.br](mailto:contato@prontoorcei.com.br)
- **Localização**: Curitiba, PR — Brasil
