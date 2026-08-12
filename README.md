# Leitor MD

PWA instalável para leitura de arquivos Markdown (GFM), com identidade visual [DOBBS](https://dobbs.com.br). Processamento **100% client-side** — seus arquivos nunca saem do dispositivo.

**Repositório:** https://github.com/davidobbs/leitor-de-markdown

## Funcionalidades

- Leitura de Markdown GFM (tabelas, listas de tarefas, code blocks com syntax highlight)
- Instalação como app no desktop (Chrome/Edge) e mobile (Android Chrome, iOS Safari)
- Abrir arquivos via arrastar-e-soltar ou seletor de arquivos
- **Android + WhatsApp**: compartilhar/abrir `.md` direto no app (share target)
- Associação de arquivos `.md` no Chrome (file handlers)
- Histórico local com IndexedDB e leitura offline de arquivos recentes
- Tema claro/escuro, ajuste de fonte, índice automático (h1–h3)

## Limitações

| Plataforma | Instalar | Abrir .md do WhatsApp |
|---|---|---|
| Android + Chrome | Sim | Sim |
| Desktop Chrome/Edge | Sim | Sim (arrastar, seletor, associar .md) |
| iOS Safari | Sim (Add to Home Screen) | Limitado — salve em Arquivos e abra pelo app |

## Desenvolvimento

```bash
npm install
npm run generate-icons
npm run dev
```

Abra `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

## Deploy (Vercel)

1. Envie o repositório para o GitHub
2. Importe o projeto na [Vercel](https://vercel.com)
3. Build command: `npm run build`
4. Output directory: `dist`
5. A URL pública (ex.: `https://leitor-md.vercel.app`) é o link de instalação do PWA

## Como abrir .md do WhatsApp (Android)

1. Instale o Leitor MD pelo Chrome (Menu → **Instalar app**)
2. No WhatsApp, abra o arquivo `.md` recebido
3. Toque em **Compartilhar** ou **Abrir com**
4. Selecione **Leitor MD**

## Smoke tests

1. **Instalação desktop**: abrir URL → instalar → app standalone
2. **Instalação Android**: Chrome → instalar → ícone na home
3. **Abrir .md local**: drag-drop e file picker
4. **WhatsApp Android**: compartilhar `.md` → app aparece → renderiza
5. **Offline**: abrir arquivo → desligar rede → reabrir em recentes
6. **Segurança**: `.md` com `<script>` não executa (HTML desabilitado + DOMPurify)

## Privacidade

Nenhum arquivo é enviado a servidores. Todo parsing e armazenamento ocorrem localmente no navegador via IndexedDB.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS 4
- markdown-it + DOMPurify + highlight.js
- vite-plugin-pwa (Workbox injectManifest)
- idb (IndexedDB)
