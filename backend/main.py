from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import numpy as np
import pandas as pd
import os

app = FastAPI(title="Smartphone Addiction Prediction API", version="1.0.0")

# Enable CORS (for frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# Paths to model files
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "models", "addiction_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "models", "scaler.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "models", "label_encoder.pkl")

# Load artifacts
model = None
scaler = None
label_encoder = None


def load_artifacts():
    global model, scaler, label_encoder

    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found at: {MODEL_PATH}")
    if not os.path.exists(SCALER_PATH):
        raise FileNotFoundError(f"Scaler file not found at: {SCALER_PATH}")
    if not os.path.exists(ENCODER_PATH):
        raise FileNotFoundError(f"Label encoder file not found at: {ENCODER_PATH}")

    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    label_encoder = joblib.load(ENCODER_PATH)


try:
    load_artifacts()
except FileNotFoundError as e:
    print(f"[WARNING] {e}")
    print("[WARNING] Server will start but /predict will fail until model files are added.")


# Input schema
class PredictionInput(BaseModel):
    screen_time: float = Field(..., ge=0, le=24)
    unlocks: int = Field(..., ge=0)
    social_media: float = Field(..., ge=0, le=24)
    night_usage: int = Field(..., ge=0, le=1)
    sleep_hours: float = Field(..., ge=0, le=24)


# Output schema
class PredictionOutput(BaseModel):
    prediction: str


# Root endpoint
@app.get("/")
def root():
    return {"status": "ok", "message": "Smartphone Addiction Prediction API is running."}


# Prediction endpoint
@app.post("/predict", response_model=PredictionOutput)
def predict(data: PredictionInput):
    if model is None or scaler is None or label_encoder is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Ensure all .pkl files exist in backend/models/",
        )

    try:
        # Create DataFrame (IMPORTANT for correct feature alignment)
        input_df = pd.DataFrame([{
            "screen_time": data.screen_time,
            "unlocks": data.unlocks,
            "social_media": data.social_media,
            "night_usage": data.night_usage,
            "sleep_hours": data.sleep_hours
        }])

        # Scale input
        scaled_input = scaler.transform(input_df)

        # Predict
        prediction = model.predict(scaled_input)

        # Decode label
        result = label_encoder.inverse_transform(prediction)[0]

        return PredictionOutput(prediction=result)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))