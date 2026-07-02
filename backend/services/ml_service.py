import joblib
import os

# Load model only once when FastAPI starts
current_dir = os.path.dirname(os.path.dirname(__file__))
model_path = os.path.join(current_dir, "models", "model.pkl")

model = joblib.load(model_path)


def predict_heat(features):

    prediction = model.predict([features])[0]

    prediction = round(float(prediction), 2)

    if prediction >= 80:
        risk = "High"
    elif prediction >= 60:
        risk = "Medium"
    else:
        risk = "Low"

    # Estimate temperature from heat score
    temperature = round(25 + prediction * 0.2, 1)


    return {
        "heat_score": prediction,
        "temperature": temperature,
        "risk_level": risk
    }