# MujerTech - Taller Introductorio de IA para Emprendedoras

Interactive, mobile-first workshop teaching AI basics to women entrepreneurs in Latin America. Users progress through modules learning about AI, prompts, and image generation. Self-paced, free, works on low-end phones.

**Live site:** [intro.mujertech.org](https://intro.mujertech.org)

## Target Audience

- Women entrepreneurs in Latin America
- Basic digital literacy (may need help with copy/paste)
- Primary device: Android phones, often older models
- Connectivity: Variable, sometimes slow

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js (App Router) | Framework |
| next-intl | i18n (Spanish primary, English secondary) |
| CSS Modules | Styling (no Tailwind) |
| Vercel | Hosting + Analytics |
| Airtable | Email capture storage |

## Project Structure

```
app/
  [locale]/
    page.js                    # Main app — workshop modules render here
    prompts/
      page.js                  # Standalone prompt writing module (/es/prompts)
    layout.js                  # Locale layout with analytics
  components/
    modules/
      PresessionCheck/         # Entry screen
      Presession/              # Digital literacy tutorial (optional)
      Welcome/                 # Workshop intro + onboarding
      Module1/                 # What is AI?
      Module2/                 # Prompts & tools
      Module4/                 # Image generation with Canva
      Module6/                 # Completion & certificate
      Capstone/                # Prompt Writing for Women Entrepreneurs (standalone)
    Header/                    # Top navigation
    ProgressBar/               # Workshop progress indicator
    ModuleNavBar/              # Bottom navigation
    Glossary/                  # Help sidebar with terms
    CommunityCard/             # WhatsApp community CTA
    ConfidenceRating/          # Before/after confidence scale
    SuccessCriteria/           # Learning objectives display
  lib/
    useProgress.js             # Session resume via localStorage
    useConfidence.js           # Confidence tracking
    useNotification.js         # Toast messages
    useClarity.js              # Microsoft Clarity analytics
messages/
  es.json                      # Spanish translations
  en.json                      # English translations
```

## Workshop Flow

```
PresessionCheck → Presession (optional) → Welcome → Module1 → Module2 → Module4 → Module6
```

Note: Module3 and Module5 were removed — numbering kept for potential future content.

## Prompt Writing Module (Standalone)

The **Prompt Writing for Women Entrepreneurs** module lives at its own route (`/es/prompts` or `/en/prompts`) and is accessible from the Welcome screen via the "Nuevo Modulo" card.

This module is a self-paced, 10-step interactive lesson that teaches beginner women entrepreneurs how to write effective AI prompts for business use. It includes:

- **CTO Method** (Context + Task + Output) — a simple prompt framework
- **Side-by-side examples** of weak vs. strong prompts
- **Guided worked example** with sample AI responses
- **Interactive practice activity** where users build their own prompt (saved to localStorage)
- **AI output reflection** — teaching critical evaluation of AI responses
- **Knowledge check** with immediate feedback
- **Copy-paste reference guide** for the CTO method

The module was created as the capstone project for the MujerTech AI & Business Bootcamp.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the workshop.

## i18n

All user-facing text lives in `messages/es.json` (Spanish primary) and `messages/en.json`. Key structure:

```
common.*          — Shared buttons/labels
welcome.*         — Welcome/onboarding + Project Story card
module1-6.*       — Workshop modules
capstone.*        — Prompt Writing module (10 steps)
glossary.*        — Help sidebar terms
notifications.*   — Toast messages
```

## Deployment

Deployed on Vercel. Push to `main` triggers automatic deployment.
