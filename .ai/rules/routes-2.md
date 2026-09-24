---
paths:
  - 'routes/**'
---

# Routes 2

## Clear stale route cache before route:list/wayfinder sees new routes
If a newly added route is missing from `route:list` and Wayfinder generation despite the edit in routes/*.php, a stale `bootstrap/cache/routes-v7.php` may be loaded. Run `php artisan route:clear` (and `config:clear`, which also fixes CSRF 419 in tests per tests.md) before regenerating via `php artisan wayfinder:generate --with-form`.
