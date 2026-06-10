const API_KEY = "c6e1574168ffd85dc4b86cb88ce03f03";

async function getWeather(){

    const city =
    document.getElementById("city").value;

    if(!city){
        alert("Enter city name");
        return;
    }

    try{

        const response =
        await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data =
        await response.json();

        const iconCode =
        data.weather[0].icon;

        const iconUrl =
        `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        document.getElementById(
            "weather-data"
        ).innerHTML =

        `
        <div class="city">
            ${data.name}, ${data.sys.country}
        </div>

        <img
            src="${iconUrl}"
            class="weather-icon"
        >

        <div class="temp">
            ${Math.round(data.main.temp)}°C
        </div>

        <div class="description">
            ${data.weather[0].description}
        </div>

        <div class="details">

            <div class="box">
                Humidity
                <br><br>
                ${data.main.humidity}%
            </div>

            <div class="box">
                Wind Speed
                <br><br>
                ${data.wind.speed} m/s
            </div>

            <div class="box">
                Pressure
                <br><br>
                ${data.main.pressure} hPa
            </div>

            <div class="box">
                Feels Like
                <br><br><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">

    <div class="weather-card">

        <h1>Weather Dashboard</h1>

        <div class="search-box">
            <input
                type="text"
                id="city"
                placeholder="Enter city name..."
            >

            <button onclick="getWeather()">
                Search
            </button>
        </div>

        <div id="weather-data">

            <div class="placeholder">
                Search for a city
            </div>

        </div>

    </div>

</div>

<script src="app.js"></script>

</body>
</html>
                ${Math.round(
                    data.main.feels_like
                )}°C
            </div>

        </div>
        `;

    }
    catch(error){

        document.getElementById(
            "weather-data"
        ).innerHTML =
        "<h2>City not found</h2>";
    }
}