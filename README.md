# MERN Auth Login/Register

A clean MERN authentication starter with JWT-based login/register, React UI, and MongoDB Atlas.

## Live Demo (Frontend Only)
`https://charlespura.github.io/Mern-Auth-Login-Register/`

Note: GitHub Pages is **static**. The backend API must be hosted elsewhere for auth to work online.

## Tech Stack
- React (Vite)
- React Router
- Axios
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt

## Project Structure
- `client/` React frontend (Vite)
- `server/` Express backend (MongoDB)
- `docs/` build output for GitHub Pages
- `.github/workflows/` (optional) GitHub Actions

## Environment Setup
Create `server/.env`:
```
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/authDB?retryWrites=true&w=majority
JWT_SECRET=your_strong_secret
```

## Install
From project root:
```bash
npm install
npm install --prefix server
npm install --prefix client
```

## Run Locally
Backend:
```bash
npm run dev:server
```

Frontend:
```bash
npm run dev:client
```

Open: `http://localhost:5173`

## Run Both With One Command
```bash
npm run dev
```

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/health`

## GitHub Pages (Deploy From Branch)
This repo is configured to publish from `/docs` in `main`.

Build and commit:
```bash
npm run build --prefix client
```
Then commit and push the generated `docs/` folder.

## Important Notes
- GitHub Pages cannot run the backend. To use login/register online, deploy the backend (Render/Railway/VM) and update the API base URL in `client/src/services/auth/index.js`.
- Keep secrets out of git. `.env` is ignored by default.

## Scripts (Root)
- `npm run dev` Start backend + frontend together
- `npm run dev:server` Start backend only
- `npm run dev:client` Start frontend only
