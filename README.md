# Medicura World

React (Vite + Tailwind) frontend, Express backend, SQL storage (built-in SQLite now (Node 22.13+), swappable later).

## Run it

```bash
npm run install:all          # installs root, server and client deps
cp server/.env.example server/.env   # then edit JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run dev                  # API on :5000, site on http://localhost:5173
```

Admin dashboard: http://localhost:5173/admin/login (the first admin is created from `.env` on first start).

Production: `npm run build` then `npm start`. Express serves the built site and the API from one port.

## Where things live

```
client/src
  data/          india.js, abroad.js, mdms.js (your raw data) + normalize.js + index.js
  config/        site.js (brand, phone, email), categories.js (one entry per listing type)
  components/    layout/ common/ college/ detail/ home/
  features/      guidance/ (form modal + context), admin/ (login, dashboard)
  pages/ layouts/ routes/ hooks/ services/ utils/
server/src
  routes/ controllers/ repositories/ (all SQL lives here) middleware/ validators/ db/
```

## Everyday tasks

- **Add a college:** add an object to `india.js`, `abroad.js` or `mdms.js`. Cards, filters, counts, nav dropdowns,
  footer links and the state ticker all update from the data. Each `slug` must be unique.
- **Fill MD/MS:** paste records into `client/src/data/mdms.js` (same fields as `india.js`).
- **Add a listing type (e.g. BDS):** new data file, export it in `data/index.js`, add an entry in `config/categories.js`, add a route.
- **Add photos:** add `image: "https://..."` (a URL you have rights to) to any record. Without it, a monogram cover is shown.
- **Move to MySQL/Postgres:** only `server/src/db/` and `server/src/repositories/` touch SQL.

## Before launch

- Replace the placeholders in `client/src/config/site.js` and the About page text.
- Verify fees, seats, recognition and rankings against NMC, MCC and each college. Rewrite the descriptive text in your own words.
- Set a strong `JWT_SECRET` and admin password.
