from fastapi import FastAPI
from routes import heatmap
from routes import predict
from routes import analytics
from routes import recommendation
from fastapi.middleware.cors import CORSMiddleware
from routes import simulate
from routes import feature_importance
app = FastAPI(
    title="Urban Heat AI API",
    description="Backend API for Urban Heat Intelligence System",
    version="1.0.0"
)

app.include_router(heatmap.router)
app.include_router(predict.router)
app.include_router(analytics.router)
app.include_router(recommendation.router)
app.include_router(simulate.router)
app.include_router(feature_importance.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Urban Heat AI Backend is Running 🚀"
    }