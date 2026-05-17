import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Star } from 'lucide-react';
import { useWeather } from '@/context/WeatherContext';

export function SearchCommandCenter() {
  const { searchByCity, useGeolocation, addFavorite, favorites, loadFavorite, error, clearError } =
    useWeather();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) searchByCity(query.trim());
  };

  return (
    <motion.section
      id="search"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-[2.5rem] p-8 border-neon-cyan/20 command-center"
    >
      <p className="text-neon-cyan text-xs font-bold tracking-[0.35em] uppercase mb-2">
        Search & AI Command Center
      </p>
      <h2 className="text-2xl font-bold text-white mb-6">Global Weather Intelligence</h2>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center gap-3 glass-card bg-black/50 rounded-2xl px-5 py-3 border-white/10 focus-within:border-neon-cyan/40">
          <Search className="w-5 h-5 text-neon-cyan shrink-0" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              clearError();
            }}
            placeholder="Search any city worldwide…"
            className="flex-1 bg-transparent outline-none text-white placeholder:text-white/30"
          />
        </div>
        <button
          type="submit"
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-neon-cyan to-primary text-background font-bold hover:opacity-90 transition-opacity"
        >
          Search
        </button>
        <button
          type="button"
          onClick={useGeolocation}
          className="px-5 py-3 rounded-2xl glass-card border-white/10 flex items-center justify-center gap-2 hover:border-neon-cyan/40 text-white"
        >
          <MapPin className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">My Location</span>
        </button>
        <button
          type="button"
          onClick={addFavorite}
          className="px-5 py-3 rounded-2xl glass-card border-white/10 flex items-center justify-center gap-2 hover:border-neon-cyan/40 text-white"
          title="Save current location"
        >
          <Star className="w-5 h-5" />
        </button>
      </form>

      {error && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      {favorites.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {favorites.map((fav, i) => (
            <button
              key={fav.name}
              type="button"
              onClick={() => loadFavorite(i)}
              className="px-4 py-2 text-xs rounded-full glass-card bg-white/5 border-white/10 hover:border-neon-cyan/30 text-white/80"
            >
              {fav.name}
            </button>
          ))}
        </div>
      )}
    </motion.section>
  );
}
