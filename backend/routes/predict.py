import json
import os

from fastapi import APIRouter, HTTPException

from services.ml_service import predict_heat

router = APIRouter(tags=["Prediction"])


@router.get("/predict")
def predict(city: str):

    current_dir = os.path.dirname(os.path.dirname(__file__))

    file_path = os.path.join(
        current_dir,
        "data",
        "heat_prediction.json"
    )

    with open(file_path, "r") as file:
        data = json.load(file)

    for location in data:

        if location["city"].lower() == city.lower():

            features = [

                location["ndvi"],

                location["ndbi"],

                location["lst"],

                location["vegetation"],

                location["water"],

                location["builtup"],

                location["population"],

                location["albedo"]

            ]

            prediction = predict_heat(features)

            return {

                "city": city,

                "latitude": location["latitude"],

                "longitude": location["longitude"],

                **prediction

            }

    raise HTTPException(
        status_code=404,
        detail="City not found"
    )