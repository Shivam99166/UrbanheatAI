import json
import os

from fastapi import APIRouter, HTTPException

router = APIRouter(tags=["Recommendations"])


@router.get("/recommendations")
def recommendations(city: str):

    current_dir = os.path.dirname(os.path.dirname(__file__))

    file_path = os.path.join(current_dir, "data", "recommendations.json")

    with open(file_path, "r") as file:
        data = json.load(file)

    if city in data:
        return {
            "city": city,
            "recommendations": data[city]
        }

    raise HTTPException(
        status_code=404,
        detail="City not found"
    )