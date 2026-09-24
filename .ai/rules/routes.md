---
paths:
  - 'resources/js/routes/**'
---

# Routes

## Generate Wayfinder routes with form helpers
Always run `php artisan wayfinder:generate --with-form --no-interaction`. Without --with-form, `.form()` helpers vanish and tsc fails on existing pages (delete-user, auth, settings). The vite plugin (formVariants: true) regenerates on dev/build, but standalone tsc-only sessions need the manual command. Route `home` lives in `@/routes` (named export, not `@/routes/home`).
