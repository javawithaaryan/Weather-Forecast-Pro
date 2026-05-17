export type WeatherCondition =
  | 'clear'
  | 'cloudy'
  | 'rainy'
  | 'thunderstorm'
  | 'snowy'
  | 'foggy';

export type TimeOfDay = 'day' | 'night';

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDeg?: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  condition: WeatherCondition;
  tempMax: number;
  tempMin: number;
  sunrise?: string;
  sunset?: string;
  isNight: boolean;
  coord: Coordinates;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  icon: string;
  description: string;
  pop: number;
  dt: number;
}

export interface DailyForecast {
  day: string;
  icon: string;
  tempHigh: number;
  tempLow: number;
  description: string;
  pop: number;
}

export interface AirQuality {
  aqi: number;
  level: string;
  pm25: number;
  o3: number;
  no2?: number;
  co?: number;
  pm10?: number;
}

export interface WeatherAlert {
  type: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface ChartPoint {
  label: string;
  temp: number;
  precip: number;
}

export interface DailyChartPoint {
  label: string;
  max: number;
  min: number;
}

export interface WeatherBundle {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  airQuality: AirQuality;
  alerts: WeatherAlert[];
  hourlyChart: ChartPoint[];
  dailyChart: DailyChartPoint[];
}

export interface FavoriteLocation {
  name: string;
  lat: number;
  lon: number;
}

export interface AlertSettings {
  rain: boolean;
  temp: boolean;
  tempThreshold: number;
  wind: boolean;
  windThreshold: number;
}
