import { motion } from 'motion/react';
import { WeatherProvider, useWeather } from '@/context/WeatherContext';
import { WeatherReactiveBackground } from '@/animations/WeatherReactiveBackground';
import { Header } from './components/Header';
import { CurrentWeather } from './components/CurrentWeather';
import { HourlyForecast } from './components/HourlyForecast';
import { SevenDayForecast } from './components/SevenDayForecast';
import { AirQuality } from './components/AirQuality';
import { WeatherAlerts } from './components/WeatherAlerts';
import { BottomNavigation } from './components/BottomNavigation';
import { SearchCommandCenter } from './components/SearchCommandCenter';
import { HealthIntelligence } from '@/health/HealthIntelligence';
import { WeatherXAI } from '@/ai/WeatherXAI';
import { WeatherMap } from '@/maps/WeatherMap';
import { WeatherCharts } from '@/charts/WeatherCharts';

function Dashboard() {
  const { bundle, loading, error } = useWeather();

  if (loading && !bundle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <WeatherReactiveBackground condition="clear" />
        <motion.p
          className="text-white text-xl font-medium tracking-wide"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Initializing Weather Intelligence…
        </motion.p>
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <WeatherReactiveBackground condition="cloudy" />
        <p className="text-red-300 text-center">{error || 'Unable to load weather data.'}</p>
      </div>
    );
  }

  const { current, hourly, daily, airQuality, alerts, hourlyChart, dailyChart } = bundle;

  return (
    <div className="min-h-screen pb-32 dark">
      <WeatherReactiveBackground condition={current.condition} isNight={current.isNight} />
      <Header />

      <main className="container mx-auto px-6 md:px-10 pt-28 md:pt-32 flex flex-col gap-10 max-w-[1600px]">
        <SearchCommandCenter />

        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8" id="hero">
          <div className="xl:col-span-7">
            <CurrentWeather weather={current} />
          </div>
          <div className="xl:col-span-5">
            <WeatherXAI />
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3" id="aqi">
            <AirQuality airQuality={airQuality} />
          </div>
          <div className="lg:col-span-6" id="hourly">
            <HourlyForecast forecast={hourly} />
          </div>
          <div className="lg:col-span-3" id="alerts">
            <WeatherAlerts alerts={alerts} pressure={current.pressure} uvIndex={current.uvIndex} />
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5" id="forecast">
            <SevenDayForecast forecast={daily} />
          </div>
          <div className="lg:col-span-7">
            <WeatherMap
              coord={current.coord}
              city={current.city}
              description={current.description}
            />
          </div>
        </section>

        <HealthIntelligence weather={current} airQuality={airQuality} />

        <WeatherCharts hourly={hourlyChart} daily={dailyChart} />
      </main>

      <BottomNavigation />

      <footer className="container mx-auto px-10 py-12 text-center flex flex-col items-center gap-4 opacity-50">
        <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          <span className="text-[10px] text-neon-cyan font-bold tracking-[0.35em] uppercase">
            Weather X AI Active
          </span>
        </div>
        <p className="text-[10px] tracking-[0.4em] font-bold uppercase text-white/30">
          © 2026 Weather Forecast Pro · Cinematic Intelligence Platform
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <WeatherProvider>
      <Dashboard />
    </WeatherProvider>
  );
}
