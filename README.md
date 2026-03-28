# Smartphone Addiction Prediction System

A full-stack web application that predicts smartphone addiction level (Low / Moderate / High) based on behavioural inputs, using a pre-trained machine learning model.

---

🔗 Live Demo: https://smartphone-addiction-system.vercel.app

## 🚀 Features
- Predicts addiction level (Low / Moderate / High)
- ML model (Random Forest)
- FastAPI backend (Render)
- React frontend (Vercel)
- Real-time predictions

## 🛠 Tech Stack
- Frontend: React + Vite
- Backend: FastAPI
- ML: Scikit-learn
- Deployment: Vercel + Render

## Project Structure

```
smartphone-addiction/
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── components/
│       │   ├── Form.jsx
│       │   └── ResultCard.jsx
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── models/
│       ├── addiction_model.pkl   ← place your trained model here
│       └── scaler.pkl            ← place your fitted scaler here
│
└── README.md
```

---

## Prerequisites

- Python 3.10+
- Node.js 18+

---

## Setup & Run

### 1. Backend (FastAPI)

```bash
cd backend

# Create and activate a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Place your model files
# backend/models/addiction_model.pkl
# backend/models/scaler.pkl

# Start the server
uvicorn main:app --reload
```

The API will be available at: http://localhost:8000

---

### 2. Frontend (React + Vite)

```bash
cd frontend

npm install
npm run dev
```

The app will be available at: http://localhost:5173

---

## API Endpoints

### GET /
Returns API health status.

### POST /predict
**Request body:**
```json
{
  "screen_time": 6.5,
  "unlocks": 80,
  "social_media": 3.0,
  "night_usage": 1,
  "sleep_hours": 6.0
}
```

**Response:**
```json
{
  "prediction": "High"
}
```

Prediction values: `"Low"` | `"Moderate"` | `"High"`

---

## ML Model Requirements

- The model and scaler must be saved with `joblib.dump()` or `pickle.dump()`
- The scaler must be fitted on a feature array with columns in this exact order:
  1. `screen_time` (float)
  2. `unlocks` (int)
  3. `social_media` (float)
  4. `night_usage` (int — 0 or 1)
  5. `sleep_hours` (float)
- The model must output integer class labels: `0` → Low, `1` → Moderate, `2` → High
  (or string labels `"Low"`, `"Moderate"`, `"High"` directly)

---

## Tech Stack

| Layer     | Technology                         |
|-----------|------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS       |
| Backend   | FastAPI, Uvicorn, Pydantic v2      |
| ML        | scikit-learn, joblib, NumPy        |
