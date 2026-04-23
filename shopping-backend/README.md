# Shopping Backend

Standalone Express + Mongoose API for the Shopping app.

## Run locally

```bash
npm install
cp .env.example .env   # optional helper; env is loaded from shell/runtime
MONGODB_URI=mongodb://127.0.0.1:27017 MONGODB_DB=fcs_mart npm run dev
```

## Endpoints

- `GET /api/health`
- `GET /api/products`
- `POST /api/newsletter`
- `GET /api/admin/subscribers`
- `DELETE /api/admin/subscribers`

## Notes

- Products are seeded once from `server/data/products.json` when the products collection is empty.
- Subscribers are stored in MongoDB with unique lowercase emails.
