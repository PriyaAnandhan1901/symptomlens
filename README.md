# SymptomLens 🩺

A full-stack health tracking application that lets users log symptoms by voice or text, detect unusual patterns with AI, track daily wellness check-ins, and generate doctor-ready PDF reports.

**Live demo:** [https://symptomlens.vercel.app](https://symptomlens.vercel.app)

**Demo video:** [Watch on Youtube](#) <https://youtu.be/mkRGNBnzoVw>

---

## Features

- 🔐 **Secure authentication** — JWT-based login and signup with hashed passwords
- 🎤 **Voice-powered symptom logging** — speak your symptom, severity, and notes; the app extracts structured data automatically
- 📊 **Severity trend chart** — visualize symptom severity over time
- 🤖 **AI anomaly detection** — a Python microservice flags unusual symptom patterns using statistical analysis (z-score)
- 📅 **Daily check-ins** — track sleep, stress, and mood every day
- 📄 **PDF report export** — generate a clean, shareable report for doctor visits
- 📱 **Mobile responsive** — works smoothly on phone, tablet, and desktop

---

## Screenshots

| Landing Page | Symptom Logging | AI Analysis |
|---|---|---|
| _add screenshot_ | _add screenshot_ | _add screenshot_ |

| Severity Chart | Daily Check-in | PDF Report |
|---|---|---|
| _add screenshot_ | _add screenshot_ | _add screenshot_ |

---

## Tech Stack

**Frontend**
- React (Vite)
- Axios for API calls
- Web Speech API for voice input

**Backend**
- Node.js + Express
- PostgreSQL (hosted on Railway)
- JWT authentication, bcrypt password hashing
- PDFKit for report generation

**AI Service**
- Python + Flask
- NumPy for statistical anomaly detection (z-score based)

**Deployment**
- Frontend → Vercel
- Backend + AI service + Database → Railway

---

## Architecture

```
┌─────────────┐      HTTPS       ┌──────────────────┐
│   React     │ ───────────────► │  Node/Express API │
│  (Vercel)   │ ◄─────────────── │    (Railway)       │
└─────────────┘                  └─────────┬──────────┘
                                            │
                              ┌─────────────┼─────────────┐
                              ▼             ▼             ▼
                      ┌───────────┐ ┌─────────────┐ ┌──────────────┐
                      │ PostgreSQL │ │ Flask AI svc │ │  PDFKit       │
                      │ (Railway)  │ │  (Railway)   │ │  (in-process) │
                      └───────────┘ └─────────────┘ └──────────────┘
```

1. The React frontend calls the Express API directly for auth, symptoms, check-ins, and PDF reports.
2. The Express API talks to PostgreSQL for all persistent data.
3. For anomaly detection, the frontend calls the Flask AI microservice directly, passing the user's logged symptoms; the service returns which entries look statistically unusual.

---

## Running Locally

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- PostgreSQL installed locally (or a Railway/hosted Postgres URL)

### 1. Clone the repo
```bash
git clone https://github.com/PriyaAnandhan1901/symptomlens.git
cd symptomlens
```

### 2. Backend setup
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```env
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=symptomlens
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_jwt_secret
```
Run the backend:
```bash
node index.js
```
The API will start on `http://localhost:5000`.

### 3. AI service setup
```bash
cd ai-service
pip install -r requirements.txt
python app.py
```
The AI service will start on `http://localhost:5001`.

### 4. Frontend setup
```bash
cd frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

---

## Environment Variables

| Variable | Description | Where |
|---|---|---|
| `DATABASE_URL` | Full Postgres connection string (production) | Backend |
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` | Postgres connection (local dev) | Backend |
| `JWT_SECRET` | Secret used to sign auth tokens | Backend |
| `NODE_ENV` | `development` or `production` | Backend |
| `PORT` | Port the Flask AI service listens on | AI Service |

---

## Project Structure

```
symptomlens/
├── backend/          # Express API (auth, symptoms, check-ins, PDF reports)
├── ai-service/        # Flask microservice for anomaly detection
├── frontend/          # React app (Vite)
└── README.md
```

---

## Author

Built by Priya Anandhan as a full-stack portfolio project.
