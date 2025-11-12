# Weather Forecast Pro 🌤️

A comprehensive, modern, and feature-rich weather prediction web application with advanced forecasting capabilities, interactive maps, data visualization, and smart alerts.

**Made by Aryan Rathore**

---

## 🌟 Features

### 1. Core Weather Features

#### Current Weather
- ✅ **Auto-location Detection**: GPS-based location or manual city search
- ✅ **Current Temperature**: Display in °C or °F with unit toggle
- ✅ **Weather Conditions**: Detailed descriptions (sunny, cloudy, rain, etc.)
- ✅ **Comprehensive Metrics**:
  - Humidity percentage
  - Wind speed and direction
  - Air pressure
  - Visibility
  - Maximum and minimum temperatures
  - "Feels like" temperature
- ✅ **Sunrise/Sunset Times**: Accurate solar times
- ✅ **UV Index**: Current UV radiation levels

#### Forecasts
- ✅ **24-Hour Hourly Forecast**: Next 24 hours with temperature and precipitation probability
- ✅ **7-Day Daily Forecast**: Extended forecast with highs, lows, and conditions
- ✅ **Interactive Charts**: 
  - Line charts for temperature trends
  - Bar graphs for rainfall probability
  - Visual temperature comparisons

#### Interactive Weather Map
- ✅ **Live Map Integration**: Using Leaflet.js
- ✅ **Multiple Map Layers**: 
  - Temperature overlay
  - Precipitation layer
  - Wind patterns
  - Cloud coverage
- ✅ **Zoom and Pan**: Full map interaction
- ✅ **Location Markers**: Current weather location pinned

### 2. Advanced Features

#### Location-Based Personalization
- ✅ **Auto-detect Location**: GPS-based automatic location
- ✅ **Favorite Locations**: Save and quickly access favorite cities
- ✅ **Multi-city Comparison**: Switch between saved locations instantly
- ✅ **Location History**: Remember last searched locations

#### Alerts & Notifications
- ✅ **Severe Weather Alerts**: Automatic detection of:
  - Rain predictions
  - Temperature drops
  - High wind speeds
- ✅ **Custom Alert Thresholds**: Set personalized alert conditions
- ✅ **Visual Alert Display**: Prominent alert notifications
- ✅ **Alert Settings**: Customizable alert preferences

#### Data Visualization
- ✅ **Temperature Trend Charts**: Line graphs showing 24-hour temperature patterns
- ✅ **Precipitation Probability**: Visual representation of rain chances
- ✅ **Daily Comparison Charts**: Bar graphs for max/min temperatures
- ✅ **Interactive Charts**: Powered by Chart.js with smooth animations

#### Environmental Information
- ✅ **Air Quality Index (AQI)**: Real-time air quality data
- ✅ **AQI Components**: 
  - CO (Carbon Monoxide)
  - NO₂ (Nitrogen Dioxide)
  - O₃ (Ozone)
  - PM2.5 and PM10 (Particulate Matter)
- ✅ **Health Advisories**: AQI-based health recommendations
- ✅ **Local Sensor Integration**: ESP32 IoT sensor data display

### 3. UI/UX Design Elements

#### Layout & Navigation
- ✅ **Clean, Minimalist Design**: Modern card-based interface
- ✅ **One-Click Location Switching**: Quick access buttons
- ✅ **Sticky Header**: Key information always visible
- ✅ **Collapsible Sections**: Organized information display
- ✅ **Responsive Grid**: Adapts to all screen sizes

#### Visual Elements
- ✅ **Animated Weather Icons**: Dynamic weather condition icons
- ✅ **Dynamic Backgrounds**: Gradient backgrounds that adapt to theme
- ✅ **Color-Coded Temperature Scales**: Visual temperature indicators
- ✅ **Smooth Transitions**: Fluid animations throughout
- ✅ **Hover Effects**: Interactive element feedback

#### Accessibility
- ✅ **Dark/Light Mode Toggle**: Full theme switching
- ✅ **High Contrast Options**: Improved readability
- ✅ **Voice Reading Support**: Text-to-speech weather announcements
- ✅ **Keyboard Navigation**: Full keyboard support (Enter to search)
- ✅ **ARIA Labels**: Screen reader compatibility

#### Mobile Responsiveness
- ✅ **Responsive Design**: Works on all devices
- ✅ **PWA Support**: Progressive Web App capabilities
- ✅ **Offline Capabilities**: Service worker ready
- ✅ **Touch-Optimized**: Mobile-friendly interactions
- ✅ **GPS Mobile Features**: Location services on mobile

### 4. Technical Components

#### APIs Used
- ✅ **OpenWeatherMap API**: 
  - Current weather data
  - 5-day/3-hour forecast
  - Air pollution data
  - UV index (via forecast)
- ✅ **Geolocation API**: Browser-based location detection
- ✅ **Speech Synthesis API**: Text-to-speech functionality

#### Libraries & Frameworks
- ✅ **Chart.js**: Data visualization and charts
- ✅ **Leaflet.js**: Interactive map functionality
- ✅ **Vanilla JavaScript**: No heavy frameworks, fast performance
- ✅ **CSS3**: Modern styling with gradients and animations

#### Features
- ✅ **Local Storage**: Saves favorites and settings
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Loading States**: Visual feedback during data fetching
- ✅ **Caching**: Efficient data management

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone or Download** the project files

2. **Get API Key**:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key
   - Replace the API key in `script.js` (line 4):
     ```javascript
     const OPENWEATHER_API_KEY = "YOUR_API_KEY_HERE";
     ```

3. **Configure Local Sensor** (Optional):
   - Update `DEVICE_IP` in `script.js` with your ESP32 IP address
   - Ensure ESP32 returns JSON: `{"temperature": 25, "humidity": 60}`

4. **Run the Application**:
   - **Option 1**: Open `index.html` directly in a browser
   - **Option 2**: Use a local server (recommended):
     ```bash
     # Python
     python -m http.server 8000
     
     # Node.js
     npx http-server
     
     # PHP
     php -S localhost:8000
     ```
   - Navigate to `http://localhost:8000`

---

## 📱 Usage Guide

### Basic Usage
1. **Search for a City**: Type city name and press Enter or click search
2. **Use Your Location**: Click the location button (📍) to auto-detect
3. **View Forecasts**: Scroll to see hourly and daily forecasts
4. **Check Air Quality**: View AQI in the weather details section

### Advanced Features

#### Favorites
- Click the star icon (⭐) to open favorites
- Add current location to favorites
- Quick switch between favorite locations
- Remove favorites as needed

#### Alerts
- Click the bell icon (🔔) to configure alerts
- Set temperature thresholds
- Set wind speed thresholds
- Enable rain alerts
- Alerts appear automatically when conditions are met

#### Theme Toggle
- Click the moon/sun icon in the top-right corner
- Switch between light and dark themes
- Preference is saved automatically

#### Temperature Units
- Toggle between °C and °F using the unit buttons
- All temperatures update instantly

#### Interactive Map
- View weather location on map
- Switch between map layers (Temperature, Precipitation, Wind, Clouds)
- Zoom and pan to explore

---

## 🎨 Features Breakdown

### Weather Data Display
- **Current Conditions**: Real-time weather with detailed metrics
- **Hourly Forecast**: Next 24 hours with charts
- **Daily Forecast**: 7-day extended forecast
- **Air Quality**: Comprehensive AQI with component breakdown
- **Sun Information**: Sunrise, sunset, and UV index

### Interactive Elements
- **Search**: City name search with autocomplete support
- **Location Services**: GPS-based automatic location
- **Map Integration**: Interactive weather map
- **Charts**: Visual data representation
- **Modals**: Favorites and alerts management

### Personalization
- **Favorites System**: Save and manage favorite locations
- **Alert Customization**: Personalized weather alerts
- **Theme Preferences**: Dark/light mode with persistence
- **Unit Preferences**: Celsius/Fahrenheit toggle

### Data Visualization
- **Temperature Trends**: 24-hour temperature line chart
- **Precipitation Probability**: Visual rain chance display
- **Daily Comparisons**: Max/min temperature bar charts
- **Interactive Charts**: Hover for detailed information

---

## 🔧 Configuration

### API Configuration
```javascript
// In script.js
const OPENWEATHER_API_KEY = "your_api_key_here";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
```

### Local Sensor Configuration
```javascript
// In script.js
const DEVICE_IP = "http://192.168.1.10"; // Your ESP32 IP
```

### Theme Configuration
Themes are automatically saved to localStorage. To reset:
```javascript
localStorage.removeItem('theme');
```

---

## 📊 API Endpoints Used

1. **Current Weather**: `/weather`
2. **5-Day Forecast**: `/forecast`
3. **Air Pollution**: `/air_pollution`
4. **Geocoding**: (via weather API)

---

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 Code Structure

```
Weather Forecast Pro/
├── index.html          # Main HTML structure
├── style.css           # Comprehensive styling with dark mode
├── script.js           # All functionality and API integration
├── manifest.json       # PWA manifest
├── README.md          # This file
└── assets/            # Weather icons and images
    ├── clear.png
    ├── clouds.png
    ├── rain.png
    ├── drizzle.png
    ├── mist.png
    ├── snow.png
    ├── humidity.png
    ├── wind.png
    └── search.png
```

---

## 🎯 Future Enhancements

Potential features for future versions:
- [ ] Extended 30-day forecast
- [ ] Weather history and trends
- [ ] Social sharing features
- [ ] Weather widgets
- [ ] Multiple location comparison view
- [ ] Weather notifications (push notifications)
- [ ] Weather-based recommendations
- [ ] Integration with smart home devices
- [ ] Weather photography integration
- [ ] Climate change indicators

---

## 🐛 Troubleshooting

### Common Issues

**API Key Errors**:
- Ensure your API key is valid
- Check API key quota/limits
- Verify API key is correctly placed in script.js

**Location Not Working**:
- Grant browser location permissions
- Check if HTTPS is required (some browsers)
- Try manual city search instead

**Map Not Loading**:
- Check internet connection
- Verify Leaflet.js CDN is accessible
- Check browser console for errors

**Charts Not Displaying**:
- Ensure Chart.js CDN is loading
- Check browser console for JavaScript errors
- Verify data is being fetched correctly

---

## 📄 License

This project is open source and available for educational purposes.

---

## 👨‍💻 Developer

**Made by Aryan Rathore**

This comprehensive weather application demonstrates:
- Modern web development practices
- API integration and error handling
- Responsive design principles
- Data visualization techniques
- Progressive Web App capabilities
- User experience optimization
- Accessibility considerations

---

## 🙏 Acknowledgments

- **OpenWeatherMap** for weather data API
- **Leaflet.js** for map functionality
- **Chart.js** for data visualization
- **Google Fonts** for typography

---

## 📞 Support

For issues, questions, or contributions, please refer to the project repository.

---

*Powered by OpenWeatherMap API | Advanced Weather Prediction System*

*Made with ❤️ by Aryan Rathore*
