// Weather Forecast Pro - Made by Aryan Rathore
// Comprehensive weather prediction system with advanced features

const OPENWEATHER_API_KEY = "78c23b8cf7cbbb4ee3f94a28a23e7fd1";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const DEVICE_IP = "http://192.168.1.10";

// State Management
let currentWeatherData = null;
let currentCoords = { lat: null, lon: null };
let currentUnit = 'c';
let weatherMap = null;
let hourlyChart = null;
let dailyChart = null;
let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
let alertSettings = JSON.parse(localStorage.getItem('alertSettings')) || {
    rain: false,
    temp: false,
    tempThreshold: 10,
    wind: false,
    windThreshold: 30
};

// DOM Elements
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const favoritesBtn = document.getElementById("favoritesBtn");
const alertsBtn = document.getElementById("alertsBtn");
const themeToggle = document.getElementById("themeToggle");
const errorMessage = document.getElementById("errorMessage");
const loading = document.getElementById("loading");
const weather = document.getElementById("weather");

// Weather display elements
const weatherIcon = document.getElementById("weatherIcon");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feelsLike");
const city = document.getElementById("city");
const weatherDesc = document.getElementById("weatherDesc");
const dateTime = document.getElementById("dateTime");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windDir = document.getElementById("windDir");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const tempMax = document.getElementById("tempMax");
const tempMin = document.getElementById("tempMin");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const uvIndex = document.getElementById("uvIndex");
const aqiValue = document.getElementById("aqiValue");
const aqiLabel = document.getElementById("aqiLabel");
const aqiDetails = document.getElementById("aqiDetails");
const localTemp = document.getElementById("localTemp");
const localHumidity = document.getElementById("localHumidity");
const hourlyForecast = document.getElementById("hourlyForecast");
const dailyForecast = document.getElementById("dailyForecast");
const alertsList = document.getElementById("alertsList");

// Modals
const favoritesModal = document.getElementById("favoritesModal");
const alertsModal = document.getElementById("alertsModal");
const favoritesList = document.getElementById("favoritesList");

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
    initializeEventListeners();
    initializeCharts();
    loadFavorites();
    loadAlertSettings();
    registerServiceWorker();
    preloadVoices(); // Preload voices for better voice selection
    getLocation();
    fetchLocalWeather();
    setInterval(fetchLocalWeather, 10000);
});

// Preload voices for better voice selection
function preloadVoices() {
    if ('speechSynthesis' in window) {
        // Force voice loading
        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
                console.log('Voices loaded:', window.speechSynthesis.getVoices().length);
            };
        }
    }
}

// Register Service Worker for PWA
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered:', registration);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', toggleTheme);

// Event Listeners
function initializeEventListeners() {
    searchBtn.addEventListener("click", handleSearch);
    searchBox.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSearch();
    });
    locationBtn.addEventListener("click", getLocation);
    favoritesBtn.addEventListener("click", () => favoritesModal.classList.add('show'));
    alertsBtn.addEventListener("click", () => alertsModal.classList.add('show'));
    
    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('show');
        });
    });
    
    // Temperature unit toggle
    document.querySelectorAll('.temp-unit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.temp-unit').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentUnit = e.target.dataset.unit;
            if (currentWeatherData) {
                displayWeather(currentWeatherData);
            }
        });
    });
    
    // Add favorite button
    document.getElementById("addFavoriteBtn")?.addEventListener('click', addCurrentToFavorites);
    
    // Alert settings
    document.getElementById("alertRain")?.addEventListener('change', saveAlertSettings);
    document.getElementById("alertTemp")?.addEventListener('change', saveAlertSettings);
    document.getElementById("alertWind")?.addEventListener('change', saveAlertSettings);
    document.getElementById("tempThreshold")?.addEventListener('input', saveAlertSettings);
    document.getElementById("windThreshold")?.addEventListener('input', saveAlertSettings);
    
    // Map layer buttons
    document.querySelectorAll('.map-layer-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.map-layer-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            updateMapLayer(e.target.dataset.layer);
        });
    });
}

function handleSearch() {
    const cityName = searchBox.value.trim();
    if (cityName) {
        checkWeather(cityName);
    } else {
        showError("Please enter a city name");
    }
}

// Location Services
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentCoords.lat = position.coords.latitude;
                currentCoords.lon = position.coords.longitude;
                checkWeatherByCoords(currentCoords.lat, currentCoords.lon);
            },
            () => {
                showError("Location access denied. Using default location.");
                checkWeather("Delhi");
            }
        );
    } else {
        checkWeather("Delhi");
    }
}

// Weather API Calls
async function checkWeatherByCoords(lat, lon) {
    try {
        showLoading();
        hideError();
        
        // Validate coordinates
        if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
            throw new Error("Invalid coordinates");
        }
        
        // More accurate API calls with error handling
        const weatherResponse = await fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`);
        if (!weatherResponse.ok) {
            throw new Error(`Weather API error: ${weatherResponse.status}`);
        }
        const weatherData = await weatherResponse.json();
        
        // Validate response
        if (!weatherData || weatherData.cod !== 200) {
            throw new Error(weatherData?.message || "Invalid weather data");
        }
        
        // Fetch additional data with better error handling
        const [forecastData, aqiData] = await Promise.all([
            fetch(`${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`)
                .then(r => {
                    if (!r.ok) throw new Error(`Forecast API error: ${r.status}`);
                    return r.json();
                })
                .catch(err => {
                    console.warn("Forecast data unavailable:", err);
                    return null;
                }),
            fetch(`${API_BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`)
                .then(r => {
                    if (!r.ok) throw new Error(`AQI API error: ${r.status}`);
                    return r.json();
                })
                .catch(err => {
                    console.warn("AQI data unavailable:", err);
                    return null;
                })
        ]);
        
        currentCoords = { lat, lon };
        currentWeatherData = weatherData;
        
        displayWeather(weatherData);
        if (forecastData) displayForecasts(forecastData);
        if (aqiData) displayAQI(aqiData);
        initializeMap(lat, lon);
        checkAlerts(weatherData);
        announceWeather(weatherData);
    } catch (error) {
        console.error("Error fetching weather:", error);
        showError(error.message || "Unable to fetch weather data. Please try again.");
        hideLoading();
    }
}

async function checkWeather(cityName) {
    if (!cityName || cityName.trim() === "") {
        showError("Please enter a valid city name");
        return;
    }

    try {
        showLoading();
        hideError();
        
        const weatherResponse = await fetch(`${API_BASE_URL}/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${OPENWEATHER_API_KEY}`);
        
        if (weatherResponse.status === 404) {
            throw new Error("City not found");
        }
        
        if (!weatherResponse.ok) {
            throw new Error(`HTTP error! status: ${weatherResponse.status}`);
        }
        
        const weatherData = await weatherResponse.json();
        
        if (!weatherData || !weatherData.main || !weatherData.weather || !weatherData.weather[0]) {
            throw new Error("Invalid weather data received");
        }
        
        currentCoords = { lat: weatherData.coord.lat, lon: weatherData.coord.lon };
        currentWeatherData = weatherData;
        
        // Fetch additional data
        const [forecastData, aqiData] = await Promise.all([
            fetch(`${API_BASE_URL}/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&units=metric&appid=${OPENWEATHER_API_KEY}`).then(r => r.json()),
            fetch(`${API_BASE_URL}/air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${OPENWEATHER_API_KEY}`).then(r => r.json()).catch(() => null)
        ]);
        
        displayWeather(weatherData);
        displayForecasts(forecastData);
        displayAQI(aqiData);
        initializeMap(weatherData.coord.lat, weatherData.coord.lon);
        checkAlerts(weatherData);
        announceWeather(weatherData);
    } catch (error) {
        console.error("Error fetching weather:", error);
        
        if (error.message === "City not found") {
            showError("City not found. Please check the spelling and try again.");
        } else if (error.message.includes("HTTP error")) {
            showError("Unable to connect to weather service. Please check your internet connection.");
        } else {
            showError("Unable to fetch weather data. Please try again.");
        }
        
        hideLoading();
    }
}

// Display Weather Data with Improved Accuracy
function displayWeather(data) {
    hideLoading();
    
    // Validate data before processing
    if (!data || !data.main || !data.weather || !data.weather[0]) {
        showError("Invalid weather data received");
        return;
    }
    
    // More accurate temperature calculations with proper rounding
    const tempC = parseFloat(data.main.temp) || 0;
    const tempF = Math.round((tempC * 9/5 + 32) * 10) / 10; // More precise
    const feelsLikeC = parseFloat(data.main.feels_like) || 0;
    const feelsLikeF = Math.round((feelsLikeC * 9/5 + 32) * 10) / 10;
    
    // Validate and display city
    const cityName = data.name || "Unknown";
    const country = data.sys?.country || "";
    city.textContent = country ? `${cityName}, ${country}` : cityName;
    
    // Display temperatures with proper formatting
    const displayTempC = Math.round(tempC);
    const displayTempF = Math.round(tempF);
    temp.textContent = `${currentUnit === 'c' ? displayTempC : displayTempF}°${currentUnit.toUpperCase()}`;
    
    const displayFeelsLikeC = Math.round(feelsLikeC);
    const displayFeelsLikeF = Math.round(feelsLikeF);
    feelsLike.textContent = `Feels like ${currentUnit === 'c' ? displayFeelsLikeC : displayFeelsLikeF}°${currentUnit.toUpperCase()}`;
    
    // Weather description with capitalization
    weatherDesc.textContent = (data.weather[0].description || "Unknown").charAt(0).toUpperCase() + 
                              (data.weather[0].description || "Unknown").slice(1);
    
    // Accurate date and time with timezone consideration
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    };
    dateTime.textContent = now.toLocaleDateString('en-US', options);
    
    // Accurate weather details with validation
    const humidityVal = Math.round(data.main.humidity || 0);
    humidity.textContent = `${humidityVal}%`;
    
    const windSpeedMs = parseFloat(data.wind?.speed || 0);
    const windSpeedKmh = Math.round(windSpeedMs * 3.6 * 10) / 10; // More precise conversion
    wind.textContent = `${windSpeedKmh} km/h`;
    
    windDir.textContent = data.wind?.deg ? `${getWindDirection(data.wind.deg)}` : '';
    
    const pressureVal = Math.round(data.main.pressure || 0);
    pressure.textContent = `${pressureVal} hPa`;
    
    // Accurate visibility conversion
    const visibilityM = parseFloat(data.visibility || 0);
    const visibilityKm = visibilityM > 0 ? (visibilityM / 1000).toFixed(1) : null;
    visibility.textContent = visibilityKm ? `${visibilityKm} km` : "N/A";
    
    // Accurate max/min temperatures
    const maxC = parseFloat(data.main.temp_max || tempC);
    const maxF = Math.round((maxC * 9/5 + 32) * 10) / 10;
    const minC = parseFloat(data.main.temp_min || tempC);
    const minF = Math.round((minC * 9/5 + 32) * 10) / 10;
    
    tempMax.textContent = `${currentUnit === 'c' ? Math.round(maxC) : Math.round(maxF)}°${currentUnit.toUpperCase()}`;
    tempMin.textContent = `${currentUnit === 'c' ? Math.round(minC) : Math.round(minF)}°${currentUnit.toUpperCase()}`;
    
    // Accurate sunrise/sunset times with timezone
    if (data.sys?.sunrise) {
        const sunriseTime = new Date((data.sys.sunrise + (data.timezone || 0)) * 1000);
        sunrise.textContent = sunriseTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: 'UTC'
        });
    } else {
        sunrise.textContent = "N/A";
    }
    
    if (data.sys?.sunset) {
        const sunsetTime = new Date((data.sys.sunset + (data.timezone || 0)) * 1000);
        sunset.textContent = sunsetTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: 'UTC'
        });
    } else {
        sunset.textContent = "N/A";
    }
    
    // UV Index (will be updated from forecast if available)
    uvIndex.textContent = "N/A";
    
    // Update weather icon with better mapping
    updateWeatherIcon(data.weather[0].main, data.weather[0].icon);
    
    weather.classList.add("show");
}

function getWindDirection(degrees) {
    // More accurate wind direction calculation
    if (degrees === null || degrees === undefined || isNaN(degrees)) return '';
    
    const normalizedDegrees = ((degrees % 360) + 360) % 360; // Normalize to 0-360
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(normalizedDegrees / 22.5) % 16;
    return directions[index];
}

function updateWeatherIcon(main, iconCode) {
    // More accurate icon mapping based on OpenWeatherMap icon codes
    const iconMap = {
        'Clear': 'clear.png',
        'Clouds': 'clouds.png',
        'Rain': 'rain.png',
        'Drizzle': 'drizzle.png',
        'Mist': 'mist.png',
        'Fog': 'mist.png',
        'Haze': 'mist.png',
        'Dust': 'mist.png',
        'Sand': 'mist.png',
        'Ash': 'mist.png',
        'Squall': 'rain.png',
        'Tornado': 'rain.png',
        'Snow': 'snow.png',
        'Thunderstorm': 'rain.png'
    };
    
    // Use icon code for more accuracy if available
    let iconFile = iconMap[main] || 'clouds.png';
    
    // Refine based on icon code (e.g., 01d = clear day, 01n = clear night)
    if (iconCode) {
        if (iconCode.includes('01')) iconFile = 'clear.png';
        else if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) iconFile = 'clouds.png';
        else if (iconCode.includes('09') || iconCode.includes('10')) iconFile = 'rain.png';
        else if (iconCode.includes('11')) iconFile = 'rain.png'; // Thunderstorm
        else if (iconCode.includes('13')) iconFile = 'snow.png';
        else if (iconCode.includes('50')) iconFile = 'mist.png';
    }
    
    weatherIcon.src = iconFile;
    weatherIcon.alt = main || 'Weather';
}

// Forecast Display
function displayForecasts(forecastData) {
    if (!forecastData || !forecastData.list) return;
    
    // Hourly Forecast (next 24 hours)
    const hourlyData = forecastData.list.slice(0, 8);
    hourlyForecast.innerHTML = '';
    
    hourlyData.forEach(item => {
        if (!item || !item.dt || !item.main || !item.weather || !item.weather[0]) return;
        
        const time = new Date(item.dt * 1000);
        const temp = parseFloat(item.main.temp || 0);
        const precip = parseFloat(item.pop || 0);
        
        const hourlyItem = document.createElement('div');
        hourlyItem.className = 'hourly-item';
        hourlyItem.innerHTML = `
            <p class="hourly-time">${time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
            <img src="${getWeatherIcon(item.weather[0].main)}" alt="${item.weather[0].description}" class="hourly-icon">
            <p class="hourly-temp">${Math.round(temp)}°C</p>
            <p class="hourly-precip">${Math.round(precip * 100)}%</p>
        `;
        hourlyForecast.appendChild(hourlyItem);
    });
    
    updateHourlyChart(forecastData.list.slice(0, 24));
    
    // Daily Forecast (7 days)
    const dailyData = groupByDay(forecastData.list);
    dailyForecast.innerHTML = '';
    
    dailyData.slice(0, 7).forEach(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const isToday = date.toDateString() === new Date().toDateString();
        
        const dailyItem = document.createElement('div');
        dailyItem.className = 'daily-item';
        dailyItem.innerHTML = `
            <div class="daily-day">${isToday ? 'Today' : dayName}</div>
            <img src="${getWeatherIcon(day.weather.main)}" alt="" class="daily-icon">
            <div class="daily-temps">
                <span class="daily-temp-high">${Math.round(day.temp.max)}°C</span>
                <span class="daily-temp-low">${Math.round(day.temp.min)}°C</span>
            </div>
            <div class="daily-precip">${day.pop ? Math.round(day.pop * 100) : 0}%</div>
        `;
        dailyForecast.appendChild(dailyItem);
    });
    
    updateDailyChart(dailyData.slice(0, 7));
}

function groupByDay(list) {
    const grouped = {};
    
    list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        if (!grouped[dateKey]) {
            grouped[dateKey] = {
                date: dateKey,
                temp: { min: item.main.temp_min, max: item.main.temp_max },
                weather: item.weather[0],
                pop: item.pop || 0
            };
        } else {
            grouped[dateKey].temp.min = Math.min(grouped[dateKey].temp.min, item.main.temp_min);
            grouped[dateKey].temp.max = Math.max(grouped[dateKey].temp.max, item.main.temp_max);
            grouped[dateKey].pop = Math.max(grouped[dateKey].pop, item.pop || 0);
        }
    });
    
    return Object.values(grouped);
}

function getWeatherIcon(main) {
    const iconMap = {
        'Clear': 'clear.png',
        'Clouds': 'clouds.png',
        'Rain': 'rain.png',
        'Drizzle': 'drizzle.png',
        'Mist': 'mist.png',
        'Fog': 'mist.png',
        'Haze': 'mist.png',
        'Snow': 'snow.png',
        'Thunderstorm': 'rain.png'
    };
    return iconMap[main] || 'clouds.png';
}

// Charts
function initializeCharts() {
    // Hourly Chart
    const hourlyCtx = document.getElementById('hourlyChart');
    if (hourlyCtx) {
        hourlyChart = new Chart(hourlyCtx, {
    type: 'line',
    data: {
                labels: [],
                datasets: [{
                label: 'Temperature (°C)',
                    data: [],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Precipitation (%)',
                data: [],
                    borderColor: '#48bb78',
                    backgroundColor: 'rgba(72, 187, 120, 0.1)',
                tension: 0.4,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        position: 'left'
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Daily Chart
    const dailyCtx = document.getElementById('dailyChart');
    if (dailyCtx) {
        dailyChart = new Chart(dailyCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Max Temp (°C)',
                    data: [],
                    backgroundColor: 'rgba(102, 126, 234, 0.6)'
                }, {
                    label: 'Min Temp (°C)',
                    data: [],
                    backgroundColor: 'rgba(72, 187, 120, 0.6)'
                }]
    },
    options: {
        responsive: true,
                maintainAspectRatio: false,
        scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }
}

function updateHourlyChart(data) {
    if (!hourlyChart || !data || data.length === 0) return;
    
    // More accurate data processing
    const labels = data
        .filter(item => item && item.dt)
        .map(item => new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit' }));
    
    const temps = data
        .filter(item => item && item.main)
        .map(item => {
            const temp = parseFloat(item.main.temp || 0);
            return Math.round(temp * 10) / 10; // More precise
        });
    
    const precip = data
        .filter(item => item)
        .map(item => {
            const pop = parseFloat(item.pop || 0);
            return Math.round(pop * 100);
        });
    
    hourlyChart.data.labels = labels;
    hourlyChart.data.datasets[0].data = temps;
    hourlyChart.data.datasets[1].data = precip;
    hourlyChart.update('active');
}

function updateDailyChart(data) {
    if (!dailyChart || !data || data.length === 0) return;
    
    // More accurate daily chart data
    const labels = data
        .filter(day => day && day.date)
        .map(day => {
            try {
                const date = new Date(day.date);
                return date.toLocaleDateString('en-US', { weekday: 'short' });
            } catch {
                return 'N/A';
            }
        });
    
    const maxTemps = data
        .filter(day => day && day.temp)
        .map(day => {
            const max = parseFloat(day.temp.max || 0);
            return Math.round(max * 10) / 10; // More precise
        });
    
    const minTemps = data
        .filter(day => day && day.temp)
        .map(day => {
            const min = parseFloat(day.temp.min || 0);
            return Math.round(min * 10) / 10; // More precise
        });
    
    dailyChart.data.labels = labels;
    dailyChart.data.datasets[0].data = maxTemps;
    dailyChart.data.datasets[1].data = minTemps;
    dailyChart.update('active');
}

// Air Quality Index
function displayAQI(aqiData) {
    if (!aqiData || !aqiData.list || !aqiData.list[0]) {
        aqiValue.textContent = "N/A";
        aqiLabel.textContent = "Data unavailable";
        return;
    }
    
    const aqi = aqiData.list[0].main.aqi;
    const components = aqiData.list[0].components;
    
    const aqiLabels = {
        1: { text: "Good", color: "#48bb78" },
        2: { text: "Fair", color: "#ed8936" },
        3: { text: "Moderate", color: "#f56565" },
        4: { text: "Poor", color: "#9f7aea" },
        5: { text: "Very Poor", color: "#e53e3e" }
    };
    
    const aqiInfo = aqiLabels[aqi] || { text: "Unknown", color: "#718096" };
    
    aqiValue.textContent = aqi;
    aqiValue.style.color = aqiInfo.color;
    aqiLabel.textContent = aqiInfo.text;
    
    aqiDetails.innerHTML = `
        <div>CO: ${components.co} μg/m³</div>
        <div>NO₂: ${components.no2} μg/m³</div>
        <div>O₃: ${components.o3} μg/m³</div>
        <div>PM2.5: ${components.pm2_5} μg/m³</div>
        <div>PM10: ${components.pm10} μg/m³</div>
    `;
}

// Interactive Map
function initializeMap(lat, lon) {
    if (weatherMap) {
        weatherMap.remove();
    }
    
    weatherMap = L.map('weatherMap').setView([lat, lon], 10);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(weatherMap);
    
    // Add weather marker
    L.marker([lat, lon]).addTo(weatherMap)
        .bindPopup(`<b>${currentWeatherData?.name || 'Location'}</b><br>${currentWeatherData?.weather[0]?.description || ''}`)
        .openPopup();
    
    // Add temperature layer (simplified)
    updateMapLayer('temp');
}

function updateMapLayer(layer) {
    // This is a simplified implementation
    // In a full implementation, you would fetch weather map tiles from a service
    console.log(`Switching to ${layer} layer`);
}

// Local Sensor Data
async function fetchLocalWeather() {
    try {
        const response = await fetch(DEVICE_IP, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            timeout: 5000
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        if (data.temperature !== undefined) {
            localTemp.textContent = `${Math.round(data.temperature)}°C`;
        } else {
            localTemp.textContent = "N/A";
        }
        
        if (data.humidity !== undefined) {
            localHumidity.textContent = `${data.humidity}%`;
        } else {
            localHumidity.textContent = "N/A";
        }
    } catch (error) {
        console.error("Error fetching local sensor data:", error);
        localTemp.textContent = "Offline";
        localHumidity.textContent = "Offline";
    }
}

// Favorites System
function loadFavorites() {
    favoritesList.innerHTML = '';
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p style="text-align: center; color: var(--text-tertiary);">No favorite locations yet</p>';
        return;
    }
    
    favorites.forEach((fav, index) => {
        const item = document.createElement('div');
        item.className = 'favorite-item';
        item.innerHTML = `
            <span class="favorite-name">${fav.name}</span>
            <div>
                <button onclick="loadFavorite(${index})" class="btn-primary" style="padding: 5px 15px; margin-right: 5px;">Load</button>
                <button onclick="removeFavorite(${index})" style="background: #e53e3e; color: white; border: none; padding: 5px 15px; border-radius: 5px; cursor: pointer;">Remove</button>
            </div>
        `;
        favoritesList.appendChild(item);
    });
}

function addCurrentToFavorites() {
    if (!currentWeatherData) {
        showError("No location to add. Please search for a city first.");
        return;
    }
    
    const favorite = {
        name: `${currentWeatherData.name}, ${currentWeatherData.sys.country}`,
        lat: currentCoords.lat,
        lon: currentCoords.lon
    };
    
    if (!favorites.find(f => f.name === favorite.name)) {
        favorites.push(favorite);
        localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
        loadFavorites();
    }
}

function loadFavorite(index) {
    const fav = favorites[index];
    if (fav) {
        checkWeatherByCoords(fav.lat, fav.lon);
        favoritesModal.classList.remove('show');
    }
}

function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    loadFavorites();
}

// Alerts System
function loadAlertSettings() {
    document.getElementById("alertRain").checked = alertSettings.rain;
    document.getElementById("alertTemp").checked = alertSettings.temp;
    document.getElementById("alertWind").checked = alertSettings.wind;
    document.getElementById("tempThreshold").value = alertSettings.tempThreshold;
    document.getElementById("windThreshold").value = alertSettings.windThreshold;
}

function saveAlertSettings() {
    alertSettings = {
        rain: document.getElementById("alertRain").checked,
        temp: document.getElementById("alertTemp").checked,
        tempThreshold: parseInt(document.getElementById("tempThreshold").value),
        wind: document.getElementById("alertWind").checked,
        windThreshold: parseInt(document.getElementById("windThreshold").value)
    };
    localStorage.setItem('alertSettings', JSON.stringify(alertSettings));
}

function checkAlerts(weatherData) {
    const alerts = [];
    
    if (alertSettings.rain && weatherData.weather[0].main === 'Rain') {
        alerts.push({ type: 'Rain', message: 'Rain is predicted in your area!' });
    }
    
    if (alertSettings.temp && weatherData.main.temp < alertSettings.tempThreshold) {
        alerts.push({ type: 'Temperature', message: `Temperature is below ${alertSettings.tempThreshold}°C!` });
    }
    
    if (alertSettings.wind && (weatherData.wind.speed * 3.6) > alertSettings.windThreshold) {
        alerts.push({ type: 'Wind', message: `Wind speed exceeds ${alertSettings.windThreshold} km/h!` });
    }
    
    displayAlerts(alerts);
}

function displayAlerts(alerts) {
    alertsList.innerHTML = '';
    
    if (alerts.length === 0) {
        alertsList.innerHTML = '<p class="no-alerts">No active weather alerts</p>';
        return;
    }
    
    alerts.forEach(alert => {
        const alertItem = document.createElement('div');
        alertItem.className = 'alert-item';
        alertItem.innerHTML = `
            <strong>${alert.type} Alert:</strong> ${alert.message}
        `;
        alertsList.appendChild(alertItem);
    });
}

// Text-to-Speech with Cute Girl Voice
function announceWeather(data) {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    
    const synth = window.speechSynthesis;
    const cityName = data.name || "your location";
    const temperature = Math.round(data.main?.temp || 0);
    const description = data.weather?.[0]?.description || "unknown";
    const humidity = data.main?.humidity || 0;
    const windSpeed = Math.round((data.wind?.speed || 0) * 3.6);
    
    // More friendly and cute text
    const text = `Hey there! The weather in ${cityName} is currently ${description}. It's ${temperature} degrees Celsius right now. The humidity is ${humidity} percent, and there's a gentle breeze at ${windSpeed} kilometers per hour. Have a wonderful day!`;
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Wait for voices to load
    const getFemaleVoice = () => {
        const voices = synth.getVoices();
        // Look for female voices (common patterns: 'female', 'woman', 'zira', 'samantha', 'karen', 'susan')
        const femaleVoices = voices.filter(voice => {
            const name = voice.name.toLowerCase();
            const lang = voice.lang.toLowerCase();
            return (
                name.includes('female') || 
                name.includes('woman') || 
                name.includes('zira') || 
                name.includes('samantha') || 
                name.includes('karen') || 
                name.includes('susan') ||
                name.includes('hazel') ||
                name.includes('heather') ||
                name.includes('linda') ||
                name.includes('melissa') ||
                (lang.includes('en') && voice.gender === 'female')
            );
        });
        
        // Prefer English female voices
        const englishFemale = femaleVoices.find(v => v.lang.toLowerCase().includes('en'));
        return englishFemale || femaleVoices[0] || voices.find(v => v.lang.includes('en')) || voices[0];
    };
    
    // Set voice properties for cute girl voice
    utterance.rate = 1.1; // Slightly faster for more energetic/cute sound
    utterance.pitch = 1.3; // Higher pitch for cuter voice (range: 0-2, default 1)
    utterance.volume = 0.9; // Clear volume
    
    // Try to set a female voice
    if (synth.getVoices().length > 0) {
        const femaleVoice = getFemaleVoice();
        if (femaleVoice) {
            utterance.voice = femaleVoice;
        }
    } else {
        // Wait for voices to load
        synth.onvoiceschanged = () => {
            const femaleVoice = getFemaleVoice();
            if (femaleVoice) {
                utterance.voice = femaleVoice;
            }
            synth.speak(utterance);
        };
        return;
    }
    
    synth.speak(utterance);
}

// Utility Functions
function showLoading() {
    loading.classList.add("show");
    weather.classList.remove("show");
}

function hideLoading() {
    loading.classList.remove("show");
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add("show");
    setTimeout(() => hideError(), 5000);
}

function hideError() {
    errorMessage.classList.remove("show");
}

// Make functions globally available for inline event handlers
window.loadFavorite = loadFavorite;
window.removeFavorite = removeFavorite;
