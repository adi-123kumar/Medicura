# MediCura World

React (Vite + Tailwind) frontend, Express backend, SQLite storage (built in, Node 22.13+).

## Run it

```bash
npm run install:all                  # installs root, server and client deps
cp server/.env.example server/.env   # then set JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run dev                          # API on :5000, site on http://localhost:5173
```

Production: `npm run build` then `npm start` (Express serves the built site and the API from one port).

## The one backend feature: inquiries

1. A visitor fills **Request a conversation** (`/contact`, also reached from every "Free counselling",
   "Talk to a counselor" and college "Ask" button). Fields: name*, email*, phone, interested in, message*.
   Opened from a college page, the form is pre-filled and the college is saved with the inquiry.
   `/neet-predictor` uses the same form plus a NEET score field.
2. It is saved in SQLite (`server/data/medicura.db`).
3. The team signs in at **`/admin`** and sees every inquiry:
   - **Call** (`tel:`), **Email** (opens a pre-written message), **WhatsApp**
   - **Verify**, **Mark contacted**, **Reject**, **Back to new**
   - internal notes, search, status filters, CSV export, delete

Statuses: `new` → `verified` / `contacted` / `rejected`. Older databases are upgraded automatically on first
start (old "accepted" becomes "verified"; no inquiries are lost).

Spam protection: rate limiting, server-side validation and a hidden honeypot field.

## Where things live

```
client/src
  config/        site.js (brand, phone, sample stats), categories.js (MBBS India / Abroad / MD-MS)
  data/          india.js, abroad.js, mdms.js (your raw data), insights.js, updates.js
  components/    layout/ (TopBar, Header, Footer = used on every page), home/, college/, detail/, common/
  features/      inquiry/ (the form), admin/ (login, dashboard)
  pages/ routes/ layouts/ hooks/ services/ utils/
server/src       routes/ controllers/ repositories/ (all SQL) middleware/ validators/ db/
```

`layouts/MainLayout.jsx` holds the header and footer once, so every public page is identical there.

## Everyday tasks

- **Add a college:** add an object to `india.js`, `abroad.js` or `mdms.js`; lists, counts, filters and the home page update.
- **Hero photo:** save a portrait photo as `client/public/hero.jpg` (an illustration shows until you do).
- **Destination photos:** save `client/public/destinations/<country>.jpg`, for example `russia.jpg`, `nepal.jpg`.
- **Updates page:** add entries to `client/src/data/updates.js`.

## Before launch

- Replace the sample figures in `config/site.js` (`impact`) and remove the "Reference figures · Placeholders" labels and sample notes.
- Set the real email and office address in `config/site.js`.
- Verify fees, seats, recognition and rankings; check that you have rights to the college photo URLs in the data files.
- Read the Privacy and Terms pages against how you really handle data.
- Set a strong `JWT_SECRET` and admin password, and use HTTPS.
