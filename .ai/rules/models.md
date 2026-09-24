---
paths:
  - app/Models/Armada.php
---

# Models

## Slug armada otomatis dari model observer
slug Armada dibuat otomatis oleh observer `creating`/`updating` di model (dari name, plus suffix -2/-3 jika bentrok). Jangan tampilkan input/manajemen slug di form admin; buat slug di controller tidak diperlukan.
