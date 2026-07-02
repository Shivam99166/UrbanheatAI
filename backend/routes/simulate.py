import json
import os

from fastapi import APIRouter, HTTPException

from services.ml_service import predict_heat

router = APIRouter(tags=["Simulation"])


@router.post("/simulate")
def simulate(city: str, action: str):

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

            ndvi = location["ndvi"]
            ndbi = location["ndbi"]
            lst = location["lst"]
            vegetation = location["vegetation"]
            water = location["water"]
            builtup = location["builtup"]
            population = location["population"]
            albedo = location["albedo"]

            # BEFORE
            before = predict_heat([
                ndvi,
                ndbi,
                lst,
                vegetation,
                water,
                builtup,
                population,
                albedo
            ])

            # AI Simulation
            if action == "trees":
                vegetation += 15
                ndvi += 0.12

            elif action == "roof":
                albedo += 0.08
                lst -= 2

            elif action == "water":
                water += 8
                lst -= 3

            # AFTER
            after = predict_heat([
                ndvi,
                ndbi,
                lst,
                vegetation,
                water,
                builtup,
                population,
                albedo
            ])

            return {
                "city": city,
                "action": action,
                "before": before,
                "after": after,
                "reduction": round(
                    before["temperature"] - after["temperature"],
                    2
                )
            }

    raise HTTPException(
        status_code=404,
        detail="City not found"
    )