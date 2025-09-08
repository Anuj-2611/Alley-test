# Alley Monorepo Split

This project is split into two folders:

- `backend`: Express + MongoDB API
- `frontend`: Vite + React app

## Development

In one terminal:

```
cd backend
npm install
npm run dev
```

In another terminal:

```
cd frontend
npm install
npm run dev
```

The frontend dev server proxies API requests from `/api/*` to `http://localhost:5000`.
# Alley-test
