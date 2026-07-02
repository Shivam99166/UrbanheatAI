
const API = "http://127.0.0.1:8000";
const map = L.map("map").setView([28.6139,77.2090],11);


L.tileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
{
    attribution:"© OpenStreetMap"
}).addTo(map);

// ================= DATA =================

const zones = {

A:{

city:"Delhi",

heatScore:82,

temperature:42,

humidity:61,

aqi:183,

wind:12,

risk:"HIGH",

lat:28.6139,

lng:77.2090,

reasons:[
"Low Vegetation",
"High Built-up Area",
"Concrete Dominance"
],

suggestions:[
"Plant Trees",
"Cool Roofs",
"Increase Green Parks"
],

ai:"Increase vegetation by 20%. Expected reduction of 3°C.",

pie:[20,75,5],

trend:[31,33,35,38,40,42],

bar:[82,61,33],

radar:[90,80,70,60,50]

},

B:{

city:"Noida",

heatScore:61,

temperature:37,

humidity:55,

aqi:140,

wind:15,

risk:"MEDIUM",

lat:28.5355,

lng:77.3910,

reasons:[
"Moderate Vegetation",
"Dense Buildings"
],

suggestions:[
"Increase Parks",
"Cool Pavements"
],

ai:"Increase vegetation by 10%. Expected reduction of 2°C.",

pie:[35,55,10],

trend:[30,31,33,35,36,37],

bar:[61,55,25],

radar:[65,60,58,52,40]

},

C:{

city:"Gurugram",

heatScore:33,

temperature:30,

humidity:68,

aqi:90,

wind:10,

risk:"LOW",

lat:28.4595,

lng:77.0266,

reasons:[
"Good Vegetation",
"Open Spaces"
],

suggestions:[
"Maintain Green Cover"
],

ai:"Current condition is good. Maintain vegetation.",

pie:[60,30,10],

trend:[26,27,28,29,30,30],

bar:[33,70,15],

radar:[40,30,35,25,20]

}

};

// ================= HEAT ZONES =================
function renderHeatMap(){

    Object.keys(zones).forEach(function(key){

        const zone = zones[key];

        let color = "green";

        if(zone.heatScore > 70) color = "red";
        else if(zone.heatScore > 50) color = "orange";

        L.circle(
            [zone.lat, zone.lng],
            {
                radius: 3500,
                color: color,
                fillColor: color,
                fillOpacity: 0.5
            }
        )
        .addTo(map)
        .bindPopup(zone.city)
        .on("click", function(){

            updateDashboard(key);

        });

    });

}
renderHeatMap();

// ================= PIE CHART =================

const pieCanvas = document.getElementById("pieChart");
const pieChart = pieCanvas ? new Chart(
    pieCanvas,
    {
        type:"pie",
        data:{
            labels:["Vegetation","Built-up","Water"],
            datasets:[{data:[20,75,5]}]
        }
    }
) : null;

// ================= LINE CHART =================

const lineCanvas = document.getElementById("lineChart");
const lineChart = lineCanvas ? new Chart(
    lineCanvas,
    {
        type:"line",
        data:{
            labels:["Jan","Feb","Mar","Apr","May","Jun"],
            datasets:[{
                label:"Temperature",
                data:[31,33,35,38,40,42],
                fill:false,
                tension:0.3
            }]
        }
    }
) : null;


const barCanvas = document.getElementById("barChart");
const barChart = barCanvas ? new Chart(
    barCanvas,
    {
        type:"bar",
        data:{
            labels:["Heat Score","Vegetation","Water"],
            datasets:[{
                label:"Urban Analysis",
                data:[82,61,33],
                backgroundColor:["#ef4444","#22c55e","#38bdf8"]
            }]
        },
        options:{
            responsive:true,
            plugins:{legend:{display:false}}
        }
    }
) : null;

// ================= RADAR CHART =================

const radarCanvas = document.getElementById("radarChart");
const radarChart = radarCanvas ? new Chart(
    radarCanvas,
    {
        type:"radar",
        data:{
            labels:["Heat","Greenery","Water","Buildings","Air Quality"],
            datasets:[{
                label:"City Index",
                data:[90,80,70,60,50],
                fill:true,
                backgroundColor:"rgba(56,189,248,0.2)",
                borderColor:"#38bdf8",
                pointBackgroundColor:"#38bdf8"
            }]
        },
        options:{
            responsive:true,
            plugins:{legend:{display:false}}
        }
    }
) : null;

// ================= UPDATE DASHBOARD =================

function updateDashboard(zoneKey){

const zone = zones[zoneKey];

// ---------- Top Cards ----------

document.getElementById("heatScore").innerHTML =
zone.heatScore;

document.getElementById("temperature").innerHTML =
zone.temperature + "°C";

document.getElementById("riskLevel").innerHTML =
zone.risk;

document.getElementById("cityName").innerHTML =
zone.city;

const humidityEl = document.getElementById("humidity");
if(humidityEl){
    humidityEl.innerHTML = zone.humidity + "%";
}
const aqiEl = document.getElementById("aqi");
if(aqiEl){
    aqiEl.innerHTML = zone.aqi;
}

// ---------- Before / After ----------

document.getElementById("beforeTemp").innerHTML =
zone.temperature + "°C";

document.getElementById("afterTemp").innerHTML =
zone.temperature + "°C";

// ---------- Weather ----------

const wind = document.getElementById("wind");

if(wind){

wind.innerHTML = zone.wind + " km/h";

}

// ---------- AI Recommendation ----------

const aiTextEl = document.getElementById("aiText");
if(aiTextEl){
    aiTextEl.innerHTML = zone.ai;
}

// ---------- Reasons ----------

fetch(API + "/recommendations?city=" + zone.city)

.then(res => res.json())

.then(data=>{

    let html="";

    data.recommendations.reasons.forEach(item=>{

        html += `<li>${item}</li>`;

    });

    document.getElementById("reasons").innerHTML = html;

    html="";

    data.recommendations.suggestions.forEach(item=>{

        html += `<li>${item}</li>`;

    });

    document.getElementById("suggestions").innerHTML = html;

    document.getElementById("aiText").innerHTML =
        data.recommendations.ai;

});



// ---------- Suggestions ----------

let suggestionHTML="";

zone.suggestions.forEach(function(item){
    suggestionHTML += "<li>"+item+"</li>";
});

const suggestionsEl = document.getElementById("suggestions");
if(suggestionsEl){
    suggestionsEl.innerHTML = suggestionHTML;
}

// ---------- Pie Chart ----------

fetch(API + "/analytics?city=" + zone.city)

.then(res=>res.json())

.then(data=>{

    pieChart.data.datasets[0].data = data.pie;

    pieChart.update();

    lineChart.data.datasets[0].data = data.trend;

    lineChart.update();

    barChart.data.datasets[0].data = data.bar;

    barChart.update();

    radarChart.data.datasets[0].data = data.radar;

    radarChart.update();

});
// ---------- Move Map ----------

map.flyTo(

[zone.lat,zone.lng],

12,

{

animate:true,

duration:2

}

);

}


function searchCity(){

const input = document
.getElementById("citySearch")
.value
.toLowerCase()
.trim();

let found = false;

Object.keys(zones).forEach(function(key){

if(zones[key].city.toLowerCase() === input){

updateDashboard(key);

found = true;

}

});

if(!found){

alert("City not found!");

}

}

// Press Enter to Search
const citySearchInput = document.getElementById("citySearch");
if(citySearchInput){
    citySearchInput.addEventListener("keypress",function(event){
        if(event.key==="Enter"){
            searchCity();
        }
    });
}

// ================= RISK COLORS =================

function updateRiskColor(risk){

const riskElement =
document.getElementById("riskLevel");

riskElement.style.padding = "8px 15px";
riskElement.style.borderRadius = "8px";

if(risk==="HIGH"){

riskElement.style.background="#ef4444";
riskElement.style.color="white";

}

else if(risk==="MEDIUM"){

riskElement.style.background="#facc15";
riskElement.style.color="black";

}

else{

riskElement.style.background="#22c55e";
riskElement.style.color="white";

}

}

// ================= HOTSPOT TABLE =================

function updateHotspotTable(){

const tbody =
document.getElementById("hotspotTable");

tbody.innerHTML="";

let cities=[];

Object.keys(zones).forEach(function(key){

cities.push(zones[key]);

});

cities.sort(function(a,b){

return b.heatScore-a.heatScore;

});

cities.forEach(function(city,index){

tbody.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${city.city}</td>

<td>${city.temperature}°C</td>

<td>${city.heatScore}</td>

<td>${city.risk}</td>

</tr>

`;

});

}

updateHotspotTable();

// ================= SIMULATION =================

async function callSimulation(action){

    const city =
    document.getElementById("cityName").innerHTML;

    const response = await fetch(

        API+

        "/simulate?city="+city+

        "&action="+action,

        {

            method:"POST"

        }

    );

    const data = await response.json();

    document.getElementById("beforeTemp").innerHTML =
    data.before_temp+"°C";

    document.getElementById("afterTemp").innerHTML =
    data.after_temp+"°C";

    document.getElementById("simulationResult").innerHTML =

    `Temperature Reduced by ${data.reduction}°C`;

}

// ================= ADD TREES =================

function addTrees(){

    callSimulation("trees");

}

// ================= COOL ROOF =================

function coolRoof(){

callSimulation("roof");

}

// ================= WATER =================

function waterBodies(){

callSimulation("water");

}

// ================= SOLAR =================

function solarPanels(){
callSimulation("solarpanel");


}

// ================= TRAFFIC =================

function reduceTraffic(){

callSimulation("reducetraffic");

}


const originalUpdateDashboard = updateDashboard;

updateDashboard = async function(zoneKey){

    const city = zones[zoneKey].city;

    try{

        const response = await fetch(
            API + "/predict?city=" + city
        );

        const data = await response.json();
zones[zoneKey] = {
    ...zones[zoneKey],

    city: data.city,
    heatScore: data.heat_score,
    temperature: data.temperature,
    risk: data.risk_level,
    lat: data.latitude,
    lng: data.longitude
};

    }catch(err){

        console.log("Predict API Error",err);

    }

    originalUpdateDashboard(zoneKey);

    updateRiskColor(zones[zoneKey].risk);

    updateHotspotTable();

};

// Refresh default state

updateDashboard("A");


function animateValue(id,start,end,duration){

let obj=document.getElementById(id);

if(!obj) return;

let range=end-start;
let current=start;
let increment=end>start?1:-1;
let stepTime=Math.abs(Math.floor(duration/range));

let timer=setInterval(function(){

current+=increment;

obj.innerHTML=id==="temperature" ? current+"°C" : current;

if(current==end){

clearInterval(timer);

}

},stepTime);

}

// ================= WEATHER UPDATE =================

function updateWeather(){

const humidity=document.getElementById("humidity");
const wind=document.getElementById("wind");
const rain=document.getElementById("rain");
const aqi=document.getElementById("aqi");

if(humidity)
humidity.innerHTML=(50+Math.floor(Math.random()*30))+"%";

if(wind)
wind.innerHTML=(8+Math.floor(Math.random()*12))+" km/h";

if(rain)
rain.innerHTML=(10+Math.floor(Math.random()*60))+"%";

if(aqi)
aqi.innerHTML=100+Math.floor(Math.random()*120);

}

// Refresh every 10 seconds

 // setInterval(updateWeather,10000);

// ================= LOADING EFFECT =================

function showLoading(){

document.body.style.cursor="wait";

}

function hideLoading(){

document.body.style.cursor="default";

}

// ================= BACKEND API READY =================

// Replace localhost with your teammate's backend URL later



// ================= EXPORT REPORT =================

function exportReport(){

const report={

city:document.getElementById("cityName").innerHTML,

heatScore:document.getElementById("heatScore").innerHTML,

temperature:document.getElementById("temperature").innerHTML,

risk:document.getElementById("riskLevel").innerHTML,

simulation:document.getElementById("simulationResult").innerHTML

};

const blob=new Blob(

[JSON.stringify(report,null,2)],

{type:"application/json"}

);

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="UrbanHeatReport.json";

link.click();

}


window.onload = function () {

    loadHeatmap();

};

// ================= READY MESSAGE =================



async function loadHeatmap() {

    try {

        const response = await fetch(API + "/heatmap");
        const data = await response.json();

        data.forEach((item, index) => {

            const key = String.fromCharCode(65 + index); // A,B,C...

            if (zones[key]) {

                zones[key].city = item.city;
                zones[key].heatScore = item.heat_score;
                zones[key].temperature = item.temperature;
                zones[key].risk = item.risk_level;
                zones[key].lat = item.latitude;
                zones[key].lng = item.longitude;

            }
            console.log("Updated Zone:", zones[key]);

        });

        console.log("Backend Connected ✅");
        map.eachLayer(function(layer){

    if(layer instanceof L.Circle){

        map.removeLayer(layer);

    }

});
 
renderHeatMap();

        console.log(zones);
        updateDashboard("A");

    } catch (err) {

        console.error(err);

    }

}


