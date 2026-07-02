🌍 UrbanHeatAI
AI-powered Urban Heat Island Detection & Mitigation Dashboard

An AI-driven web platform that predicts Urban Heat Island (UHI) risk using environmental indicators and provides intelligent mitigation recommendations through an interactive geospatial dashboard.

Built for Hackathon 2026.

🚀 Demo
Features
🌡 AI-based Urban Heat Prediction
🗺 Interactive Heat Map
📍 Live City Heat Risk
🤖 AI Recommendations
📊 Dynamic Analytics Dashboard
🌳 Heat Reduction Simulation
📈 ML Model Prediction
📄 Export Heat Report
📌 Problem Statement

Rapid urbanization causes Urban Heat Islands (UHI) where cities become significantly hotter than surrounding rural areas due to:

Low vegetation
Dense construction
Asphalt roads
Lack of water bodies

Existing monitoring systems only visualize temperature and fail to provide intelligent recommendations or predictive analysis.

UrbanHeatAI solves this by combining AI, Machine Learning, and Geospatial Analytics.

💡 Solution

UrbanHeatAI predicts urban heat risk using machine learning and provides:

Heat Score Prediction
Risk Classification
AI-based Mitigation Suggestions
Interactive Heatmap
Urban Cooling Simulation
Environmental Analytics
🧠 AI / ML Pipeline

Input Features

NDVI
Built-up Percentage
Water Coverage
Land Surface Temperature (LST)

↓

Random Forest Regressor

↓

Predicted

Temperature
Heat Score
Risk Level

↓

AI Recommendation Engine

↓

Dashboard Visualization

🏗 System Architecture
                Frontend (HTML/CSS/JS)

                       │
                       │ Fetch API

                FastAPI Backend

       ┌────────────┬─────────────┬────────────┐
       │            │             │
   /heatmap     /predict     /recommendations
       │            │             │
       └────────────┼─────────────┘
                    │
             Random Forest Model
                    │
             Trained using Scikit-Learn
                    │
               Environmental Dataset
📊 Machine Learning Model

Algorithm

Random Forest Regressor

Performance

Metric	Value
R² Score	0.9058
MAE	5.29
RMSE	6.50
🔥 Key Features
🌡 Heat Prediction

Predicts

Heat Score
Temperature
Risk Level

using trained ML model.

🗺 Interactive Heat Map

Visualizes

High Risk Zones
Medium Risk Zones
Low Risk Zones

using Leaflet.js.

🤖 AI Recommendation Engine

Suggests

Increase Green Cover
Cool Roof Installation
Water Body Development
Urban Forest Creation

based on predicted heat conditions.

🌳 Heat Mitigation Simulation

Users can simulate interventions like

Plant Trees
Cool Roofs
Water Bodies

and instantly observe predicted temperature reduction.

📊 Analytics Dashboard

Displays

Pie Chart
Bar Chart
Radar Chart
Temperature Trend

generated from backend analytics.

📄 Report Export

Exports Urban Heat Report as JSON for further analysis.

⚙ Tech Stack
Frontend
HTML5
CSS3
JavaScript
Leaflet.js
Chart.js
Backend
FastAPI
Python
Machine Learning
Scikit-learn
Pandas
NumPy
Joblib
Deployment

Frontend

Vercel

Backend

Render
📂 Project Structure
UrbanHeatAI/

│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── data/
│   ├── train_model.py
│   ├── predict_model.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── screenshots/
│
└── README.md
▶ How to Run
Backend
cd backend

pip install -r requirements.txt

uvicorn main:app --reload

Runs on

http://127.0.0.1:8000
Frontend

Open

frontend/index.html

or

Run Live Server

http://127.0.0.1:5500
API Endpoints
Endpoint	Method	Description
/heatmap	GET	Heatmap Data
/predict	GET	AI Prediction
/recommendations	GET	AI Recommendations
/analytics	GET	Dashboard Analytics
/simulate	POST	Heat Mitigation Simulation
Future Improvements
Satellite Image Integration
Real-time Weather APIs
Google Earth Engine
Deep Learning Prediction
Multi-city Heat Forecasting
Mobile Application
IoT Sensor Integration
