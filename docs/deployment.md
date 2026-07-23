# Deployment

De Wonderkamer-website is een Next.js 16 app (App Router) die op [Vercel](https://vercel.com)
draait. Dit vervangt de eerdere Ember + NestJS stack die op een DigitalOcean
Docker Swarm draaide.

## Stack

- **Framework:** Next.js 16, App Router, sources onder `src/`
- **Hosting:** Vercel (project `wonderkamer-website`, team `basz's projects`, Hobby-plan)
- **E-mail:** [Brevo](https://www.brevo.com) Transactional Email API (`@getbrevo/brevo`),
  templates gerenderd met [React Email](https://react.email)
- **Spam-bescherming contactformulier:** Google reCAPTCHA v3

Er is geen aparte backend, database of queue meer nodig — alle site-content
(leden, secties) is build-time statische data (`src/content/`), en het
contactformulier draait als een enkele Next.js Route Handler
(`src/app/api/support/contact/route.ts`).

## Vercel-configuratie

- **Root Directory:** repo root (`.`) — de repo is een enkel Next.js-project,
  geen monorepo meer.
- **Build Command:** standaard (`next build` via `pnpm run build`)
- **Framework Preset:** Next.js

### Environment Variables (Production + Preview)

Deze staan ingesteld in Vercel → Project → Settings → Environment Variables,
niet in een gecommit `.env`-bestand:

| Variabele | Doel |
|---|---|
| `BREVO_API_KEY` | Brevo transactional-email API key |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 server-side verificatie |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 client-side site key |
| `NEXT_PUBLIC_SITE_URL` | Absolute basis-URL, gebruikt voor afbeeldingen in e-mailtemplates (`https://wonderkamer.com` in productie) |

Lokaal staan dezelfde variabelen in `.env.local` (nooit gecommit, zie
`.env-dist` voor het sjabloon).

Vercel injecteert zelf ook `VERCEL_GIT_COMMIT_SHA` tijdens de build; dat wordt
in `next.config.ts` doorgezet naar `NEXT_PUBLIC_GIT_SHA` (ingekort tot 7
tekens) zodat de versie-knop in de footer de commit-hash kan tonen.

## Domain & DNS

DNS voor `wonderkamer.com` wordt beheerd bij **TransIP** (de registrar), niet
bij Vercel of Cloudflare.

| Record | Type | Waarde |
|---|---|---|
| `wonderkamer.com` (apex) | A | `216.198.79.1` (Vercel) |
| `www.wonderkamer.com` | CNAME | `80ee00c7360b9924.vercel-dns-017.com.` |

**Canonieke domain:** `wonderkamer.com` (apex) is de canonieke URL. In Vercel's
Domains-instellingen is dit ingesteld als:
- `wonderkamer.com` → Connect to an environment → **Production**
- `www.wonderkamer.com` → Redirect to Another Domain → `wonderkamer.com`
  (308 Permanent Redirect)

Mail (`MX`/`SPF` via TransIP, plus een Brevo-domeinverificatie-`TXT`-record)
loopt volledig los van de website-A/CNAME-records en is bij de DNS-cutover
bewust ongemoeid gelaten.

## Vercel-project ingericht op de verkeerde branch/directory? Let op

Als het project ooit opnieuw geïmporteerd moet worden: Vercel's "New Project"-
import gebruikt bij de eerste keer altijd de **default branch** van GitHub —
er is op dat scherm geen branch-selector. Om een feature-branch te previewen
voordat die gemerged is, open je in plaats daarvan een pull request; Vercel
maakt daar automatisch een preview-deployment voor.

## Legacy routes

De oude Ember-app had losse routes per sectie (`/about`, `/lidmaatschap`,
`/impressions`, `/leden`, `/map`, `/reglement`, `/contact`). De nieuwe site is
één scrollende pagina met anchors; deze paden redirecten (permanent, 308) naar
hun anker op de homepage — geconfigureerd in `next.config.ts`'s `redirects()`.
`/leden/[slug]` blijft een echte, losse (statisch gegenereerde) pagina en
wordt **niet** geredirect.

## Wat er is uitgefaseerd

Met deze migratie zijn de volgende onderdelen volledig verwijderd uit de repo:

- `apps/backend` (NestJS) — de enige functionaliteit (contactformulier-mail)
  zit nu in de Next.js Route Handler hierboven.
- `apps/email-templates` (Maizzle/Handlebars) — vervangen door React Email
  templates in `src/emails/`.
- `docker/` en de bijbehorende GitHub Actions
  (`build-deploy.yml`, `purge-packages.yaml`) — er wordt niet meer naar een
  Docker Swarm gedeployed.
- De monorepo-tooling (Turborepo, pnpm-workspace `packages:`-glob) — met nog
  maar één package over had die niets meer te coördineren.

De DigitalOcean Docker Swarm-stacks (`wonderkamer-production`,
`wonderkamer-development`) draaien mogelijk nog los op de server totdat ze
daar handmatig worden opgeruimd — dat valt buiten deze repository.
