document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if(city) {
        fetchWeatherData(city);
    } else {
        alert("Please enter a city name.");
    }
});

function fetchWeatherData(city) {
    const apiKey = '8ccd09399bad3c89d05cd8523275617f'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or other API error');
            }
            return response.json();
        })
        .then(data => {
            displayCurrentWeather(data);
            displayForecast(data);
        })
        .catch(error => {
            alert(error.message);
            console.error('Error fetching the weather data:', error);
        });
}

function displayCurrentWeather(data) {
    const currentWeather = data.list[0];
    const weatherElement = document.getElementById('currentWeather');
    
    weatherElement.innerHTML = `
        <h2>Current Weather in ${data.city.name}, ${data.city.country}</h2>
        <img src="http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png" alt="Weather Icon">
        <p>Temperature: ${currentWeather.main.temp}°C</p>
        <p>Condition: ${currentWeather.weather[0].description}</p>
    `;
}

function displayForecast(data) {
    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = ''; // Clear previous forecast
    
    for(let i = 0; i < 5; i++) {
        const dayData = data.list[i * 8]; // Data every 24 hours (8*3 hours)
        const date = new Date(dayData.dt_txt);
        const weatherIcon = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;
        
        forecastElement.innerHTML += `
            <div class="forecast-day">
                <h3>${date.toDateString().split(' ')[0]}</h3>
                <img src="${weatherIcon}" alt="Weather Icon">
                <p>Temp: ${dayData.main.temp}°C</p>
                <p>${dayData.weather[0].description}</p>
            </div>
        `;
    }
}
function getFriendlyDescription(description) {
    const descriptions = {
        'clear sky': 'Clear and Sunny',
        'few clouds': 'Partly Cloudy',
        'scattered clouds': 'Scattered Clouds',
        'broken clouds': 'Partly Cloudy',
        'shower rain': 'Light Showers',
        'rain': 'Rainy',
        'thunderstorm': 'Thunderstorms',
        'snow': 'Snowy',
        'mist': 'Misty',
        // Add more mappings as needed
    };
    
    return descriptions[description] || description.charAt(0).toUpperCase() + description.slice(1);
}

function displayCurrentWeather(data) {
    const currentWeather = data.list[0];
    const weatherElement = document.getElementById('currentWeather');
    const friendlyDescription = getFriendlyDescription(currentWeather.weather[0].description);
    
    weatherElement.innerHTML = `
        <h2>Current Weather in ${data.city.name}, ${data.city.country}</h2>
        <img src="http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png" alt="Weather Icon">
        <p>Temperature: ${currentWeather.main.temp}°C</p>
        <p>Condition: ${friendlyDescription}</p>
    `;
}

function displayForecast(data) {
    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = ''; // Clear previous forecast
    
    for(let i = 0; i < 5; i++) {
        const dayData = data.list[i * 8]; // Data every 24 hours (8*3 hours)
        const date = new Date(dayData.dt_txt);
        const weatherIcon = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;
        const friendlyDescription = getFriendlyDescription(dayData.weather[0].description);
        
        forecastElement.innerHTML += `
            <div class="forecast-day">
                <h3>${date.toDateString().split(' ')[0]}</h3>
                <img src="${weatherIcon}" alt="Weather Icon">
                <p>Temp: ${dayData.main.temp}°C</p>
                <p>${friendlyDescription}</p>
            </div>
        `;
    }
}

