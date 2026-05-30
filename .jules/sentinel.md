## 2026-05-30 - Hardcoded API Key Fallback
**Vulnerability:** A hardcoded OpenWeatherMap API key was present as a fallback in `src/services/weatherService.ts`.
**Learning:** Developers sometimes include functional keys as fallbacks for development convenience, which risks leaking secrets into source control and production.
**Prevention:** Always use environment variables for secrets and implement presence validation that fails fast with a clear error message if the key is missing.
