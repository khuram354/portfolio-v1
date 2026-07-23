// ===== API CONFIGURATION =====
// 🔒 IMPORTANT: Never expose your API key in public repositories
// For production, use environment variables or a backend
const API_KEY = "d63a5c5340b7a9886c95d7d9b82ca1e0"; // ← Replace with your NEW key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

// ===== DOM ELEMENTS =====
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherDisplay = document.getElementById("weather-display");
const forecastEl = document.getElementById("forecast");

// ===== EVENT LISTENERS =====
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

// ===== GET WEATHER =====
async function getWeather(city) {
    try {
        weatherDisplay.innerHTML = `<div class="loading">Loading...</div>`;
        forecastEl.innerHTML = "";

        // Current Weather
        const weatherRes = await fetch(
            `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`,
        );
        if (!weatherRes.ok) throw new Error("City not found");
        const weatherData = await weatherRes.json();

        // 5-Day Forecast
        const forecastRes = await fetch(
            `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`,
        );
        const forecastData = await forecastRes.json();

        renderWeather(weatherData);
        renderForecast(forecastData);
    } catch (error) {
        weatherDisplay.innerHTML = `<div class="error">❌ ${error.message}</div>`;
        forecastEl.innerHTML = "";
    }
}

// ===== RENDER WEATHER =====
function renderWeather(data) {
    const { name, sys, weather, main, wind } = data;
    const date = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    weatherDisplay.innerHTML = `
        <div class="city">${name}, ${sys.country}</div>
        <div class="date">${date}</div>
        <div class="weather-icon">${getWeatherIcon(weather[0].icon)}</div>
        <div class="temp">${Math.round(main.temp)}<span>°C</span></div>
        <div class="description">${weather[0].description}</div>
        <div class="weather-details">
            <div class="detail-card">
                <div class="label">🌡️ Feels Like</div>
                <div class="value">${Math.round(main.feels_like)}°C</div>
            </div>
            <div class="detail-card">
                <div class="label">💧 Humidity</div>
                <div class="value">${main.humidity}%</div>
            </div>
            <div class="detail-card">
                <div class="label">💨 Wind</div>
                <div class="value">${Math.round(wind.speed)} km/h</div>
            </div>
        </div>
    `;
}

// ===== RENDER FORECAST =====
function renderForecast(data) {
    const days = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);

    forecastEl.innerHTML = days
        .map((day) => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString("en-US", {
                weekday: "short",
            });
            return `
            <div class="forecast-card">
                <div class="day">${dayName}</div>
                <div class="icon">${getWeatherIcon(day.weather[0].icon)}</div>
                <div class="temp">${Math.round(day.main.temp)}°C</div>
            </div>
        `;
        })
        .join("");
}

// ===== WEATHER ICON HELPER =====
function getWeatherIcon(iconCode) {
    const icons = {
        "01d": "☀️",
        "01n": "🌙",
        "02d": "⛅",
        "02n": "☁️",
        "03d": "☁️",
        "03n": "☁️",
        "04d": "☁️",
        "04n": "☁️",
        "09d": "🌧️",
        "09n": "🌧️",
        "10d": "🌦️",
        "10n": "🌧️",
        "11d": "⛈️",
        "11n": "⛈️",
        "13d": "❄️",
        "13n": "❄️",
        "50d": "🌫️",
        "50n": "🌫️",
    };
    return icons[iconCode] || "🌤️";
}

// ===== DEFAULT CITY =====
getWeather("Sargodha");
