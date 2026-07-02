import joblib
import os
from fastapi import APIRouter

router = APIRouter(tags=["Feature Importance"])

current_dir = os.path.dirname(os.path.dirname(__file__))

model_path = os.path.join(
    current_dir,
    "models",
    "model.pkl"
)

model = joblib.load(model_path)

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

@router.get("/feature-importance")
def feature_importance():

    return {

        "features":features,

        "importance":list(model.feature_importances_)

    }