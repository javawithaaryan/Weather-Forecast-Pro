## 2025-05-14 - Hardcoded OpenWeatherMap API Key
**Vulnerability:** A hardcoded API key was found in `src/services/weatherService.ts` as a fallback for the `VITE_OPENWEATHER_API_KEY` environment variable.
**Learning:** Hardcoded secrets in the codebase, even as fallbacks, can be exposed if the repository is public or if the built artifacts are distributed. It's a common but dangerous practice to include "default" keys for development convenience.
**Prevention:** Always use environment variables for secrets and never provide a hardcoded fallback in the source code. Use a `.env.example` file to guide developers on what keys are needed.
