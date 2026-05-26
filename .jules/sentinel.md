## 2026-05-26 - Hardcoded API Key in weatherService.ts
**Vulnerability:** A hardcoded OpenWeatherMap API key was found in `src/services/weatherService.ts` as a fallback for the `VITE_OPENWEATHER_API_KEY` environment variable.
**Learning:** Hardcoding secrets, even as fallbacks, exposes them to anyone with access to the source code and can lead to unauthorized API usage and potential cost/security implications.
**Prevention:** Always use environment variables for secrets and never provide hardcoded fallbacks in the codebase. Ensure that `.env` files are ignored by version control.
