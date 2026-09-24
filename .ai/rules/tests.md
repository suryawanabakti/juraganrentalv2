---
paths:
  - 'tests/**'
---

# Tests

## Clear config cache before running tests (CSRF 419s)
Laravel 13 detects environment from config('app.env'), so a stale cached config (bootstrap/cache/config.php baked when APP_ENV=local) makes runningUnitTests() false during pest. Result: Illuminate\Foundation\Http\Middleware\PreventRequestForgery enforces CSRF and every POST/PUT/DELETE in feature tests returns 419. Fix with `php artisan config:clear`; avoid running config:cache in dev.
