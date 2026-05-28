## 2025-05-14 - Hardcoded API Key Fallback
**Vulnerability:** A hardcoded OpenWeatherMap API key was used as a fallback for the `VITE_OPENWEATHER_API_KEY` environment variable in `src/services/weatherService.ts`.
**Learning:** Hardcoded secrets often sneak into code as "convenience" fallbacks during development or local testing, but they pose a significant security risk if committed to the repository.
**Prevention:** Always use environment variables for secrets and never provide a valid secret as a default value in the codebase. Use documentation or `.env.example` files to guide developers on required configuration.
