# models/

Place your pre-trained model files here before starting the backend server:

- `addiction_model.pkl` — trained classifier (e.g. RandomForest, LogisticRegression)
- `scaler.pkl` — fitted StandardScaler (or MinMaxScaler) used during training

Both files must be saved with `joblib.dump()` or `pickle.dump()`.

## Feature order (must match training)

| Index | Feature        | Type  |
|-------|----------------|-------|
| 0     | screen_time    | float |
| 1     | unlocks        | int   |
| 2     | social_media   | float |
| 3     | night_usage    | int   |
| 4     | sleep_hours    | float |

## Label mapping

If your model outputs integers:
- 0 → Low
- 1 → Moderate
- 2 → High

If your model outputs strings directly, they are used as-is.
