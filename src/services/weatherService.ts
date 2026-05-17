import axios from 'axios';
import type {
  AirQuality,
  AlertSettings,
  ChartPoint,
  CurrentWeather,
  DailyChartPoint,
  DailyForecast,
  HourlyForecast,
  WeatherAlert,
  WeatherBundle,
} from '@/weather/types';
import {
  AQI_LABELS,
  groupForecastByDay,
  isNightIcon,
  mapWeatherCondition,
  mapWeatherIcon,
} from '@/utils/weatherHelpers';

const API_KEY =
  import.meta.env.VITE_OPENWEATHER_API_KEY || '78c23b8cf7cbbb4ee3f94a28a23e7fd1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export type { CurrentWeather, HourlyForecast, DailyForecast, AirQuality, WeatherBundle };

interface OwmWeatherResponse {
  cod: number;
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Array<{ main: string; description: string; icon: string }>;
  wind: { speed: number; deg?: number };
  visibility: number;
  coord: { lat: number; lon: number };
  timezone?: number;
}

interface OwmForecastResponse {
  list: Array<{
    dt: number;
    main: { temp: number; temp_min: number; temp_max: number };
    weather: Array<{ main: string; description: string; icon: string }>;
    pop?: number;
  }>;
}

interface OwmAqiResponse {
  list: Array<{
    main: { aqi: number };
    components: {
      pm2_5: number;
      o3: number;
      no2: number;
      co: number;
      pm10: number;
    };
  }>;
}

function formatTime(ts: number, timezone = 0): string {
  return new Date((ts + timezone) * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function estimateUvIndex(data: OwmWeatherResponse, isNight: boolean): number {
  if (isNight) return 0;
  const main = data.weather[0]?.main;
  if (main === 'Thunderstorm' || main === 'Rain') return 1;
  if (main === 'Snow' || main === 'Fog' || main === 'Mist') return 2;
  if (main === 'Clouds') return 4;
  const hour = new Date((Date.now() + (data.timezone || 0) * 1000)).getUTCHours();
  if (hour >= 10 && hour <= 14) return 7;
  if (hour >= 8 && hour <= 16) return 5;
  return 3;
}

function parseCurrent(data: OwmWeatherResponse): CurrentWeather {
  const iconCode = data.weather[0]?.icon || '01d';
  const isNight = isNightIcon(iconCode);
  const tz = data.timezone || 0;

  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0].description.replace(/\b\w/g, (c) => c.toUpperCase()),
    icon: mapWeatherIcon(iconCode),
    humidity: Math.round(data.main.humidity),
    windSpeed: Math.round(data.wind.speed * 3.6),
    windDeg: data.wind.deg,
    pressure: Math.round(data.main.pressure),
    visibility: data.visibility ? Math.round(data.visibility / 1000) : 0,
    uvIndex: estimateUvIndex(data, isNight),
    condition: mapWeatherCondition(data.weather[0].main),
    tempMax: Math.round(data.main.temp_max),
    tempMin: Math.round(data.main.temp_min),
    sunrise: data.sys.sunrise ? formatTime(data.sys.sunrise, tz) : undefined,
    sunset: data.sys.sunset ? formatTime(data.sys.sunset, tz) : undefined,
    isNight,
    coord: { lat: data.coord.lat, lon: data.coord.lon },
  };
}

function parseHourly(forecast: OwmForecastResponse): HourlyForecast[] {
  return forecast.list.slice(0, 8).map((item, index) => ({
    time:
      index === 0
        ? 'Now'
        : new Date(item.dt * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true,
          }),
    temp: Math.round(item.main.temp),
    icon: mapWeatherIcon(item.weather[0].icon),
    description: item.weather[0].description,
    pop: Math.round((item.pop || 0) * 100),
    dt: item.dt,
  }));
}

function parseDaily(forecast: OwmForecastResponse): DailyForecast[] {
  return groupForecastByDay(forecast.list)
    .slice(0, 7)
    .map((day) => {
      const date = new Date(day.date);
      const isToday = date.toDateString() === new Date().toDateString();
      return {
        day: isToday
          ? 'Today'
          : date.toLocaleDateString('en-US', { weekday: 'short' }),
        icon: mapWeatherIcon(day.weather.icon),
        tempHigh: Math.round(day.temp.max),
        tempLow: Math.round(day.temp.min),
        description: day.weather.description,
        pop: Math.round(day.pop * 100),
      };
    });
}

function parseAqi(data: OwmAqiResponse | null): AirQuality {
  if (!data?.list?.[0]) {
    return { aqi: 0, level: 'Unavailable', pm25: 0, o3: 0 };
  }
  const entry = data.list[0];
  const aqi = entry.main.aqi;
  const info = AQI_LABELS[aqi] || { text: 'Unknown', color: '#718096' };
  return {
    aqi,
    level: info.text,
    pm25: Math.round(entry.components.pm2_5),
    o3: Math.round(entry.components.o3),
    no2: Math.round(entry.components.no2),
    co: Math.round(entry.components.co),
    pm10: Math.round(entry.components.pm10),
  };
}

function buildHourlyChart(forecast: OwmForecastResponse): ChartPoint[] {
  return forecast.list.slice(0, 12).map((item) => ({
    label: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit' }),
    temp: Math.round(item.main.temp * 10) / 10,
    precip: Math.round((item.pop || 0) * 100),
  }));
}

function buildDailyChart(forecast: OwmForecastResponse): DailyChartPoint[] {
  return groupForecastByDay(forecast.list)
    .slice(0, 7)
    .map((day) => ({
      label: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      max: Math.round(day.temp.max),
      min: Math.round(day.temp.min),
    }));
}

export function evaluateAlerts(
  weather: OwmWeatherResponse,
  settings: AlertSettings,
): WeatherAlert[] {
  const alerts: WeatherAlert[] = [];
  const main = weather.weather[0]?.main;

  if (settings.rain && (main === 'Rain' || main === 'Drizzle' || main === 'Thunderstorm')) {
    alerts.push({
      type: 'Rain',
      message: 'Rain is expected in your area. Plan indoor alternatives.',
      severity: 'warning',
    });
  }

  if (settings.temp && weather.main.temp < settings.tempThreshold) {
    alerts.push({
      type: 'Cold',
      message: `Temperature is below ${settings.tempThreshold}°C. Dress warmly.`,
      severity: 'warning',
    });
  }

  const windKmh = (weather.wind?.speed || 0) * 3.6;
  if (settings.wind && windKmh > settings.windThreshold) {
    alerts.push({
      type: 'Wind',
      message: `Wind exceeds ${settings.windThreshold} km/h. Secure loose items outdoors.`,
      severity: 'critical',
    });
  }

  if (main === 'Thunderstorm') {
    alerts.push({
      type: 'Storm',
      message: 'Thunderstorm activity detected. Stay indoors if possible.',
      severity: 'critical',
    });
  }

  return alerts;
}

export async function fetchWeatherByCity(city: string): Promise<WeatherBundle> {
  const weatherRes = await axios.get<OwmWeatherResponse>(`${BASE_URL}/weather`, {
    params: { q: city, appid: API_KEY, units: 'metric' },
  });
  const data = weatherRes.data;
  if (data.cod !== 200) throw new Error('City not found');

  return fetchWeatherByCoords(data.coord.lat, data.coord.lon, data);
}

export async function fetchWeatherByCoords(
  lat: number,
  lon: number,
  existingWeather?: OwmWeatherResponse,
): Promise<WeatherBundle> {
  const [weatherData, forecastRes, aqiRes] = await Promise.all([
    existingWeather
      ? Promise.resolve(existingWeather)
      : axios
          .get<OwmWeatherResponse>(`${BASE_URL}/weather`, {
            params: { lat, lon, appid: API_KEY, units: 'metric' },
          })
          .then((r) => r.data),
    axios
      .get<OwmForecastResponse>(`${BASE_URL}/forecast`, {
        params: { lat, lon, appid: API_KEY, units: 'metric' },
      })
      .then((r) => r.data)
      .catch(() => null),
    axios
      .get<OwmAqiResponse>(`${BASE_URL}/air_pollution`, {
        params: { lat, lon, appid: API_KEY },
      })
      .then((r) => r.data)
      .catch(() => null),
  ]);

  const current = parseCurrent(weatherData);
  const forecast: OwmForecastResponse = forecastRes || { list: [] };
  const settings = getDefaultAlertSettings();

  return {
    current,
    hourly: parseHourly(forecast),
    daily: parseDaily(forecast),
    airQuality: parseAqi(aqiRes),
    alerts: evaluateAlerts(weatherData, settings),
    hourlyChart: buildHourlyChart(forecast),
    dailyChart: buildDailyChart(forecast),
  };
}

export function getDefaultAlertSettings(): AlertSettings {
  try {
    const stored = localStorage.getItem('alertSettings');
    if (stored) return JSON.parse(stored) as AlertSettings;
  } catch {
    /* use defaults */
  }
  return {
    rain: true,
    temp: true,
    tempThreshold: 10,
    wind: true,
    windThreshold: 30,
  };
}

export async function searchCities(query: string): Promise<Array<{ name: string; country: string }>> {
  if (!query.trim()) return [];
  const res = await axios.get<
    Array<{ name: string; country: string; state?: string }>
  >('https://api.openweathermap.org/geo/1.0/direct', {
    params: { q: query, limit: 5, appid: API_KEY },
  });
  return res.data.map((c) => ({
    name: c.state ? `${c.name}, ${c.state}` : c.name,
    country: c.country,
  }));
}

// Legacy-compatible exports for gradual migration
export async function getCurrentWeather(city?: string) {
  const bundle = city
    ? await fetchWeatherByCity(city)
    : await fetchWeatherByCoords(28.6139, 77.209);
  return bundle.current;
}

export async function getHourlyForecast(city?: string) {
  const bundle = city ? await fetchWeatherByCity(city) : await fetchWeatherByCoords(28.6139, 77.209);
  return bundle.hourly;
}

export async function getDailyForecast(city?: string) {
  const bundle = city ? await fetchWeatherByCity(city) : await fetchWeatherByCoords(28.6139, 77.209);
  return bundle.daily;
}

export async function getAirQuality(lat = 28.6139, lon = 77.209) {
  const bundle = await fetchWeatherByCoords(lat, lon);
  return bundle.airQuality;
}
