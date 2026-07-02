from pathlib import Path

import joblib
import pandas as pd

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
)
from sklearn.model_selection import train_test_split

BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR.parent / "data" / "training.csv"
MODEL_PATH = BASE_DIR / "model.pkl"

# -----------------------
# Load Dataset
# -----------------------

df = pd.read_csv(DATA_PATH)

REQUIRED_COLUMNS = [
    "NDVI",
    "NDBI",
    "LST",
    "Vegetation",
    "Water",
    "BuiltUp",
    "PopulationDensity",
    "Albedo",
    "HeatScore",
]

missing_columns = [col for col in REQUIRED_COLUMNS if col not in df.columns]
if missing_columns:
    raise ValueError(f"Missing required columns in dataset: {missing_columns}")

# -----------------------
# Features
# -----------------------

X = df[[
    "NDVI",
    "NDBI",
    "LST",
    "Vegetation",
    "Water",
    "BuiltUp",
    "PopulationDensity",
    "Albedo"
]]

# -----------------------
# Target
# -----------------------

y = df["HeatScore"]

# -----------------------
# Train/Test Split
# -----------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)

# -----------------------
# Model
# -----------------------

model = RandomForestRegressor(
    n_estimators=300,
    max_depth=12,
    random_state=42
)

model.fit(X_train, y_train)

# -----------------------
# Prediction
# -----------------------

pred = model.predict(X_test)

# -----------------------
# Evaluation
# -----------------------

print("\n========== MODEL PERFORMANCE ==========\n")

print("R² Score :", round(r2_score(y_test, pred),4))

print("MAE      :", round(mean_absolute_error(y_test,pred),2))

print("RMSE     :", round(mean_squared_error(y_test,pred)**0.5,2))

# -----------------------
# Feature Importance
# -----------------------

print("\n========== FEATURE IMPORTANCE ==========\n")

importance = pd.DataFrame({

    "Feature":X.columns,

    "Importance":model.feature_importances_

})

importance = importance.sort_values(
    by="Importance",
    ascending=False
)

print(importance)

# -----------------------
# Save Model
# -----------------------

joblib.dump(model, MODEL_PATH)

print(f"\nModel Saved Successfully at: {MODEL_PATH}")