## 2025-05-27 - Hardcoded API Key in weatherService.ts
**Vulnerability:** A functional OpenWeatherMap API key was hardcoded as a fallback for the `VITE_OPENWEATHER_API_KEY` environment variable in `src/services/weatherService.ts`.
**Learning:** Hardcoding secrets as fallbacks is a common but dangerous practice to ensure application functionality when environment variables are missing. This leaks sensitive credentials to anyone with access to the repository.
**Prevention:** Always use environment variables for secrets and never provide a functional secret as a default value in the code. Use `.env.example` files to guide developers on required configuration.
