---
paths:
  - 'database/seeders/**'
---

# Seeders

## WithoutModelEvents suppresses model slug hooks
DatabaseSeeder uses `WithoutModelEvents`, so Eloquent model hooks (creating/updating) DO NOT fire during seeding — Armada::slug auto-generation silently no-ops and inserts fail on NOT NULL slug. When a model hook is load-bearing, the seeder must compute the value itself (e.g. uniqueStr slug) and pass it explicitly. `db:seed --class=AssetSeeder` misses this because it bypasses DatabaseSeeder.

## Never updateOrCreate after delete in seeders
When a seeder wipes rows first (ArmadaImage/Gallery delete), subsequent inserts must use create(), not updateOrCreate() — after a delete there is nothing to update, so updateOrCreate silently no-ops and the tables stay empty. AssetSeeder seeds galleries/armada_images with delete()+create() and is idempotent when re-run. LandingContentSeeder delegates to AssetSeeder (single source of truth).
