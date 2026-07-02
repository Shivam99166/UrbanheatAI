import json
import os

from fastapi import APIRouter

router = APIRouter(tags=["Heat"])


@router.get("/heatmap")
def get_heatmap():

    current_dir = os.path.dirname(os.path.dirname(__file__))

    file_path = os.path.join(current_dir, "data", "heat_prediction.json")

    with open(file_path, "r") as file:
        data = json.load(file)

    return data