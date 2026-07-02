import json
import os

from fastapi import APIRouter

router = APIRouter(tags=["Analytics"])


@router.get("/analytics")
def analytics(city: str):

    current_dir = os.path.dirname(os.path.dirname(__file__))

    file_path = os.path.join(current_dir, "data", "analytics.json")

    with open(file_path, "r") as file:
        data = json.load(file)

    return data.get(city, {})