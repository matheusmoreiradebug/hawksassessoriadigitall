# Hawks Assessoria Digital — Landing Page

Landing page de alta conversão da **Hawks Assessoria Digital** — *Sistema de Crescimento para Empresas*.

Página premium, dark e minimalista (referências: Apple, Stripe, Linear, Vercel), construída em **HTML, CSS e JavaScript puro** — sem build, sem dependências — para máxima performance e deploy instantâneo.

## Estrutura

```
.
├── index.html        # Estrutura + SEO (meta, Open Graph, Schema.org)
├── css/styles.css     # Design system dark/ouro
├── js/main.js         # Animações, formulário, integração WhatsApp, hooks de tracking
└── assets/            # Logo e favicon
```

## Seções

Hero (com dashboard animado) · Problema · Solução (fluxo do sistema) · Resultados · Diferenciais · Serviços · Processo · FAQ · CTA final com formulário.

## Configuração

Edite as constantes no topo de [`js/main.js`](js/main.js):

- `WHATSAPP_NUMBER` — número no formato internacional, só dígitos (`55` + DDD + número).
- `WHATSAPP_MSG` — mensagem inicial enviada ao WhatsApp.

### Tracking (Google / Meta Ads)
Os disparos `gtag('event', 'generate_lead')` e `fbq('track', 'Lead')` já estão preparados em `js/main.js` (comentados). Cole os scripts dos pixels no `<head>` do `index.html` e descomente as linhas.

## Rodar localmente

Qualquer servidor estático, por exemplo:

```bash
python -m http.server 4010
```

Acesse `http://localhost:4010`.

## Deploy

Compatível com qualquer host estático (Vercel, Netlify, GitHub Pages, Cloudflare Pages). Basta apontar para a raiz do projeto.
