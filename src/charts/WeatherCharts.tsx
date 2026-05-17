import { useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import type { ChartPoint, DailyChartPoint } from '@/weather/types';

import { useWeather } from '@/context/WeatherContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
);

interface WeatherChartsProps {
  hourly: ChartPoint[];
  daily: DailyChartPoint[];
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: 'rgba(255,255,255,0.7)', font: { size: 11 } },
    },
  },
  scales: {
    x: {
      ticks: { color: 'rgba(255,255,255,0.5)' },
      grid: { color: 'rgba(255,255,255,0.06)' },
    },
    y: {
      ticks: { color: 'rgba(255,255,255,0.5)' },
      grid: { color: 'rgba(255,255,255,0.06)' },
    },
  },
};

export function WeatherCharts({ hourly, daily }: WeatherChartsProps) {
  const { unit } = useWeather();
  const tempLabel = `Temp (${unit === 'c' ? '°C' : '°F'})`;

  const hourlyData = useMemo(
    () => ({
      labels: hourly.map((h) => h.label),
      datasets: [
        {
          label: tempLabel,
          data: hourly.map((h) => h.temp),
          borderColor: '#00f2ff',
          backgroundColor: 'rgba(0, 242, 255, 0.12)',
          fill: true,
          tension: 0.4,
          yAxisID: 'y',
        },
        {
          label: 'Precip (%)',
          data: hourly.map((h) => h.precip),
          borderColor: '#7c4dff',
          backgroundColor: 'rgba(124, 77, 255, 0.1)',
          tension: 0.4,
          yAxisID: 'y1',
        },
      ],
    }),
    [hourly, tempLabel],
  );

  const dailyData = useMemo(
    () => ({
      labels: daily.map((d) => d.label),
      datasets: [
        {
          label: 'High',
          data: daily.map((d) => d.max),
          backgroundColor: 'rgba(0, 242, 255, 0.5)',
          borderRadius: 8,
        },
        {
          label: 'Low',
          data: daily.map((d) => d.min),
          backgroundColor: 'rgba(124, 77, 255, 0.5)',
          borderRadius: 8,
        },
      ],
    }),
    [daily],
  );

  const hourlyOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        max: 100,
        ticks: { color: 'rgba(255,255,255,0.4)' },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <motion.section
      id="charts"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <div className="glass-card rounded-[2.5rem] p-8 border-neon-cyan/15">
        <h3 className="text-xl font-bold text-white mb-6 tracking-tight">
          24h Temperature & Precipitation
        </h3>
        <div className="h-[280px]">
          <Line data={hourlyData} options={hourlyOptions} />
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] p-8 border-neon-cyan/15">
        <h3 className="text-xl font-bold text-white mb-6 tracking-tight">7-Day Comparison</h3>
        <div className="h-[280px]">
          <Bar data={dailyData} options={chartOptions} />
        </div>
      </div>
    </motion.section>
  );
}


