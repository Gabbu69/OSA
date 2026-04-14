# OSA Portal

**Office of Student Affairs — Student Accommodation Management Portal**

A modern, mobile-first web application for managing student boarding houses, tenant records, concerns/complaints, and scheduling.

## Features

- 🏠 **Dashboard** — Overview of boarding houses, occupancy stats, and student count
- 👥 **Student Tenants** — Searchable list with full profiles, contact info, and rent status
- ⚠️ **Concerns & Complaints** — Categorized complaint management (Contract, Theft, Utility Billing)
- 📅 **Schedule** — Monthly calendar with event tracking
- 🔐 **Authentication** — Login with credential validation

## Login Credentials

| Username | Password |
|----------|----------|
| `admin` | `admin123` |
| `2024-00123-ST-0` | `admin123` |

## Tech Stack

- **HTML5** + **Vanilla CSS** + **JavaScript** (No framework)
- **Tailwind CSS** (CDN)
- **Google Fonts** (Manrope + Inter)
- **Material Symbols** (Icons)

## Deployment

This is a static site. Deploy to Vercel by connecting this repository.

```bash
# Or deploy via CLI
npm i -g vercel
vercel --prod
```

## Design System

Based on the "Academic Sanctuary" design philosophy — see [DESIGN.md](DESIGN.md) for full details.

- Primary: `#206223` (Scholarly Green)
- No-border rule — depth via tonal layering
- Glassmorphism for floating elements
- Gradient pill buttons
- Ambient elevation shadows