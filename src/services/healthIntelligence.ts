import type { AirQuality, CurrentWeather } from '@/weather/types';

export interface HealthInsight {
  id: string;
  title: string;
  message: string;
  severity: 'good' | 'moderate' | 'warning' | 'critical';
  category: string;
}

export interface WellnessScore {
  score: number;
  label: string;
  summary: string;
}

export function computeWellnessScore(
  weather: CurrentWeather,
  air: AirQuality,
): WellnessScore {
  let score = 85;

  if (weather.uvIndex >= 8) score -= 15;
  else if (weather.uvIndex >= 6) score -= 8;
  else if (weather.uvIndex >= 3) score -= 3;

  if (air.aqi >= 4) score -= 25;
  else if (air.aqi >= 3) score -= 15;
  else if (air.aqi >= 2) score -= 5;

  if (weather.humidity > 85) score -= 8;
  if (weather.humidity < 25) score -= 5;
  if (weather.temp > 38) score -= 20;
  if (weather.temp < 0) score -= 15;
  if (weather.condition === 'thunderstorm') score -= 20;
  if (weather.condition === 'rainy') score -= 5;

  score = Math.max(20, Math.min(100, score));

  const label =
    score >= 80 ? 'Excellent' : score >= 65 ? 'Good' : score >= 50 ? 'Fair' : 'Caution';

  const summary =
    score >= 80
      ? 'Conditions are favorable for outdoor wellness activities.'
      : score >= 65
        ? 'Generally comfortable with a few environmental factors to monitor.'
        : score >= 50
          ? 'Some health factors need attention before extended outdoor exposure.'
          : 'Environmental stressors elevated — take precautions.';

  return { score, label, summary };
}

export function generateHealthInsights(
  weather: CurrentWeather,
  air: AirQuality,
): HealthInsight[] {
  const insights: HealthInsight[] = [];

  if (weather.uvIndex >= 6) {
    insights.push({
      id: 'uv',
      title: 'UV Index',
      message:
        weather.uvIndex >= 8
          ? 'Very high UV today — sunscreen, hat, and shade strongly recommended.'
          : 'High UV today, sunscreen recommended.',
      severity: weather.uvIndex >= 8 ? 'critical' : 'warning',
      category: 'Skin',
    });
  } else if (weather.uvIndex >= 3) {
    insights.push({
      id: 'uv-moderate',
      title: 'UV Index',
      message: 'Moderate UV — light protection advised for extended outdoor time.',
      severity: 'moderate',
      category: 'Skin',
    });
  }

  if (weather.humidity < 35) {
    insights.push({
      id: 'hydration',
      title: 'Hydration',
      message: 'Low humidity increases dehydration risk. Drink water regularly.',
      severity: 'warning',
      category: 'Hydration',
    });
  }

  if (air.aqi >= 3) {
    insights.push({
      id: 'aqi',
      title: 'Air Quality',
      message:
        air.aqi >= 4
          ? 'Poor AQI may affect breathing. Limit strenuous outdoor activity.'
          : 'Moderate AQI — sensitive groups should reduce prolonged outdoor exertion.',
      severity: air.aqi >= 4 ? 'critical' : 'warning',
      category: 'Respiratory',
    });
  }

  if (air.pm25 > 35) {
    insights.push({
      id: 'asthma',
      title: 'Respiratory',
      message: 'Elevated PM2.5 — asthma and allergy sufferers should carry medication.',
      severity: 'warning',
      category: 'Asthma',
    });
  }

  if (weather.condition === 'clear' && weather.temp >= 18 && weather.temp <= 30 && air.aqi <= 2) {
    insights.push({
      id: 'outdoor',
      title: 'Outdoor Activity',
      message: 'Ideal weather for outdoor activities — walking, cycling, or sports.',
      severity: 'good',
      category: 'Activity',
    });
  } else if (weather.condition === 'rainy' || weather.condition === 'thunderstorm' || weather.temp > 35 || weather.temp < 2) {
    insights.push({
      id: 'indoor',
      title: 'Fitness Advisory',
      message: 'Sub-optimal outdoor environments — recommend home stretching, core work, or indoor yoga sessions today.',
      severity: 'moderate',
      category: 'Activity',
    });
  }

  if (weather.humidity > 70 && weather.temp > 28) {
    insights.push({
      id: 'heat',
      title: 'Heat Risk',
      message: 'Heat and humidity combined increase heat stroke risk. Stay hydrated and rest in shade.',
      severity: 'critical',
      category: 'Heat',
    });
  }

  if (weather.temp < 5) {
    insights.push({
      id: 'cold',
      title: 'Cold Exposure',
      message: 'Cold conditions raise cold & flu susceptibility. Layer up and limit exposure.',
      severity: 'warning',
      category: 'Cold',
    });
  }

  const sleepComfort =
    weather.humidity >= 40 && weather.humidity <= 60 && weather.temp >= 16 && weather.temp <= 24;
  insights.push({
    id: 'sleep',
    title: 'Sleep Comfort',
    message: sleepComfort
      ? 'Temperature and humidity are in a comfortable range for restful sleep.'
      : 'Conditions may disrupt sleep — consider ventilation or humidity control.',
    severity: sleepComfort ? 'good' : 'moderate',
    category: 'Sleep',
  });

  if (weather.humidity < 40) {
    insights.push({
      id: 'skin',
      title: 'Skin',
      message: 'Dry air can affect skin — moisturizer recommended.',
      severity: 'moderate',
      category: 'Skin',
    });
  }

  if (weather.condition === 'rainy' || weather.condition === 'thunderstorm') {
    insights.push({
      id: 'pollen',
      title: 'Pollen',
      message: 'Rain typically lowers pollen counts — relief for allergy sufferers.',
      severity: 'good',
      category: 'Allergy',
    });
  }

  return insights;
}
