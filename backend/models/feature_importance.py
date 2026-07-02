import joblib
import pandas as pd
import matplotlib.pyplot as plt

model = joblib.load("model.pkl")

features = [
    "NDVI",
    "NDBI",
    "LST",
    "Vegetation",
    "Water",
    "BuiltUp",
    "PopulationDensity",
    "Albedo"
]

importance = pd.DataFrame({
    "Feature": features,
    "Importance": model.feature_importances_
}).sort_values("Importance", ascending=False)

print(importance)

plt.figure(figsize=(8,5))
plt.barh(importance["Feature"], importance["Importance"])
plt.gca().invert_yaxis()
plt.tight_layout()
plt.savefig("../data/feature_importance.png")