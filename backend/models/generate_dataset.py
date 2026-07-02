import pandas as pd
import numpy as np

np.random.seed(42)

rows = 1000

data = []

for i in range(rows):

    ndvi = np.random.uniform(0.05, 0.80)

    ndbi = np.random.uniform(0.10, 0.90)

    lst = np.random.uniform(28, 48)

    vegetation = np.random.uniform(5, 70)

    water = np.random.uniform(1, 20)

    builtup = np.random.uniform(20, 90)

    population = np.random.randint(500, 25000)

    albedo = np.random.uniform(0.10, 0.35)

    # Physically sensible heat score
    heat = (
        lst * 1.8
        + ndbi * 35
        - ndvi * 45
        + builtup * 0.30
        - vegetation * 0.45
        - water * 0.70
        + population / 2500
        - albedo * 20
    )

    heat += np.random.normal(0, 2)

    heat = max(10, min(100, heat))

    data.append([
        ndvi,
        ndbi,
        lst,
        vegetation,
        water,
        builtup,
        population,
        albedo,
        round(heat,2)
    ])

columns = [

    "NDVI",

    "NDBI",

    "LST",

    "Vegetation",

    "Water",

    "BuiltUp",

    "PopulationDensity",

    "Albedo",

    "HeatScore"

]

df = pd.DataFrame(data, columns=columns)

df.to_csv("../data/training.csv", index=False)

print(df.head())

print("\nDataset Generated Successfully!")