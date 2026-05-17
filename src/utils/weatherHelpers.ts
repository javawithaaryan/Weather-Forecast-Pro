import type { WeatherCondition } from '@/weather/types';

export function getWindDirection(degrees?: number | null): string {
  if (degrees === null || degrees === undefined || Number.isNaN(degrees)) return '';
  const normalized = ((degrees % 360) + 360) % 360;
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
  ];
  return directions[Math.round(normalized / 22.5) % 16];
}

export function mapWeatherIcon(iconCode: string): string {
  const iconMap: Record<string, string> = {
    '01d': 'wb_sunny',
    '01n': 'nights_stay',
    '02d': 'partly_cloudy_day',
    '02n': 'partly_cloudy_night',
    '03d': 'wb_cloudy',
    '03n': 'wb_cloudy',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'rainy',
    '09n': 'rainy',
    '10d': 'rainy',
    '10n': 'rainy',
    '11d': 'thunderstorm',
    '11n': 'thunderstorm',
    '13d': 'ac_unit',
    '13n': 'ac_unit',
    '50d': 'foggy',
    '50n': 'foggy',
  };
  return iconMap[iconCode] || 'wb_sunny';
}

export function mapWeatherCondition(main: string): WeatherCondition {
  const conditionMap: Record<string, WeatherCondition> = {
    Clear: 'clear',
    Clouds: 'cloudy',
    Rain: 'rainy',
    Drizzle: 'rainy',
    Thunderstorm: 'thunderstorm',
    Snow: 'snowy',
    Mist: 'foggy',
    Fog: 'foggy',
    Haze: 'foggy',
  };
  return conditionMap[main] || 'clear';
}

export function isNightIcon(iconCode?: string): boolean {
  return Boolean(iconCode?.endsWith('n'));
}

export function groupForecastByDay(
  list: Array<{
    dt: number;
    main: { temp_min: number; temp_max: number };
    weather: Array<{ main: string; description: string; icon: string }>;
    pop?: number;
  }>,
) {
  const grouped: Record<
    string,
    {
      date: string;
      temp: { min: number; max: number };
      weather: { main: string; description: string; icon: string };
      pop: number;
    }
  > = {};

  list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toDateString();
    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date: dateKey,
        temp: { min: item.main.temp_min, max: item.main.temp_max },
        weather: item.weather[0],
        pop: item.pop || 0,
      };
    } else {
      grouped[dateKey].temp.min = Math.min(grouped[dateKey].temp.min, item.main.temp_min);
      grouped[dateKey].temp.max = Math.max(grouped[dateKey].temp.max, item.main.temp_max);
      grouped[dateKey].pop = Math.max(grouped[dateKey].pop, item.pop || 0);
    }
  });

  return Object.values(grouped);
}

export const AQI_LABELS: Record<number, { text: string; color: string }> = {
  1: { text: 'Good', color: '#48bb78' },
  2: { text: 'Fair', color: '#ed8936' },
  3: { text: 'Moderate', color: '#f56565' },
  4: { text: 'Poor', color: '#9f7aea' },
  5: { text: 'Very Poor', color: '#e53e3e' },
};
