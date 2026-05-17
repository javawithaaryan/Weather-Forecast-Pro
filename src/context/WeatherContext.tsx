import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  AlertSettings,
  FavoriteLocation,
  WeatherBundle,
} from '@/weather/types';
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  getDefaultAlertSettings,
} from '@/services/weatherService';

interface WeatherContextValue {
  bundle: WeatherBundle | null;
  loading: boolean;
  error: string | null;
  unit: 'c' | 'f';
  favorites: FavoriteLocation[];
  searchByCity: (city: string) => Promise<void>;
  searchByCoords: (lat: number, lon: number) => Promise<void>;
  useGeolocation: () => void;
  setUnit: (unit: 'c' | 'f') => void;
  addFavorite: () => void;
  removeFavorite: (index: number) => void;
  loadFavorite: (index: number) => void;
  clearError: () => void;
}

const WeatherContext = createContext<WeatherContextValue | null>(null);

function loadFavorites(): FavoriteLocation[] {
  try {
    return JSON.parse(localStorage.getItem('weatherFavorites') || '[]');
  } catch {
    return [];
  }
}

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [bundle, setBundle] = useState<WeatherBundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'c' | 'f'>('c');
  const [favorites, setFavorites] = useState<FavoriteLocation[]>(loadFavorites);

  const applyBundle = useCallback((data: WeatherBundle) => {
    setBundle(data);
    localStorage.setItem('lastCity', data.current.city);
  }, []);

  const searchByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCoords(lat, lon);
      applyBundle(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to fetch weather');
    } finally {
      setLoading(false);
    }
  }, [applyBundle]);

  const searchByCity = useCallback(
    async (city: string) => {
      if (!city.trim()) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherByCity(city.trim());
        applyBundle(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'City not found');
      } finally {
        setLoading(false);
      }
    },
    [applyBundle],
  );

  const useGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      searchByCity('Delhi');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => searchByCoords(pos.coords.latitude, pos.coords.longitude),
      () => searchByCity('Delhi'),
    );
  }, [searchByCity, searchByCoords]);

  useEffect(() => {
    const last = localStorage.getItem('lastCity');
    if (last) {
      searchByCity(last).catch(() => useGeolocation());
    } else {
      useGeolocation();
    }
  }, []);

  const addFavorite = useCallback(() => {
    if (!bundle) return;
    const fav: FavoriteLocation = {
      name: `${bundle.current.city}, ${bundle.current.country}`,
      lat: bundle.current.coord.lat,
      lon: bundle.current.coord.lon,
    };
    if (favorites.some((f) => f.name === fav.name)) return;
    const next = [...favorites, fav];
    setFavorites(next);
    localStorage.setItem('weatherFavorites', JSON.stringify(next));
  }, [bundle, favorites]);

  const removeFavorite = useCallback((index: number) => {
    const next = favorites.filter((_, i) => i !== index);
    setFavorites(next);
    localStorage.setItem('weatherFavorites', JSON.stringify(next));
  }, [favorites]);

  const loadFavorite = useCallback(
    (index: number) => {
      const fav = favorites[index];
      if (fav) searchByCoords(fav.lat, fav.lon);
    },
    [favorites, searchByCoords],
  );

  const value = useMemo(
    () => ({
      bundle,
      loading,
      error,
      unit,
      favorites,
      searchByCity,
      searchByCoords,
      useGeolocation,
      setUnit,
      addFavorite,
      removeFavorite,
      loadFavorite,
      clearError: () => setError(null),
    }),
    [
      bundle,
      loading,
      error,
      unit,
      favorites,
      searchByCity,
      searchByCoords,
      useGeolocation,
      addFavorite,
      removeFavorite,
      loadFavorite,
    ],
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}

export function useWeather() {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error('useWeather must be used within WeatherProvider');
  return ctx;
}
