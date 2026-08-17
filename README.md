# Collective Vet

Public website for **Collective Vet**, a veterans nonprofit.

This site is an online presence only. It does not collect financial accounts, scan devices, store identity documents, file VA claims, or restructure credit.

The briefing desk is a local checklist generator with official public links. It is not legal, financial, medical, or claims representation.

## Local

```bash
pnpm install
pnpm dev
```

Production build:

```bash
pnpm build
pnpm preview
```

## Hosting

- **GitHub**: source of truth for the site.
- **Azure Static Web Apps**: production host. Add repository secret `AZURE_STATIC_WEB_APPS_API_TOKEN` after creating the Static Web App, then push to `main`.

Crisis line referenced on the site: 988, then press 1.
