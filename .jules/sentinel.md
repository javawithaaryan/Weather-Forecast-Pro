## 2025-05-22 - Hardcoded OpenWeatherMap API Key
**Vulnerability:** A hardcoded OpenWeatherMap API key was found as a fallback in `src/services/weatherService.ts`.
**Learning:** Hardcoding secrets as fallbacks for environment variables is a common but dangerous practice, as it exposes the key to anyone with access to the source code.
**Prevention:** Always use environment variables for secrets and ensure no sensitive data is committed to the repository. Use `.env.example` to guide users on required variables without exposing actual values.
