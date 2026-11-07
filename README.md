# WhatsApp Growth — Customer Database Dashboard (Demo)

A deployable **Next.js** demo dashboard for the "WhatsApp Marketing · Customer
Database" growth system for pizza / fast-food brands. Shows how every order
(branch, online, WhatsApp, phone) is captured into one private customer list and
turned into targeted campaigns.

> All data in `lib/data.js` is **illustrative mock data**. Swap it for a real API later.

## Pages

| Route | What it shows |
|-------|---------------|
| `/` | Overview — KPIs, orders-by-channel, the data-flow diagram, segments, branches |
| `/customers` | The customer database: what's stored per customer + a searchable, filterable table |
| `/orders` | Collection touchpoints (counter, QR, online, WhatsApp, phone, delivery) + channel mix |
| `/campaigns` | Campaign performance table (sent → read → redeemed → revenue) + campaign types |
| `/segments` | The sources → database → segments → campaign flow, smart-targeting map, live poll |
| `/reports` | Monthly report: revenue by campaign, conversion funnel, compliance |

## Tech

- Next.js 14 (App Router) · React 18
- Tailwind CSS (3D glassmorphism, WhatsApp-green theme)
- Recharts (charts) · Framer Motion (3D tilt / motion) · lucide-react (icons)
- Chart colors use an accessibility-validated categorical palette (colorblind-safe).

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Build

```bash
npm run build && npm start
```

## Deploy (Vercel)

Push to a Git repo and import into [Vercel](https://vercel.com) — it auto-detects
Next.js. No environment variables are required for the demo.
