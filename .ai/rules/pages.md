---
paths:
  - resources/js/pages/welcome.tsx
---

# Pages

## Welcome landing page replicates juraganrental47.test
The welcome page is a faithful React/Inertia port of the reference refrensi.html (reference file at project root). Design tokens: red accent #C10D26, black #000, white bg, max-width 1140px container. Fonts (imported in resources/css/app.css): "Racing Sans One" for the hero title (60px/50px lh), "REM" for the "Selamat Datang" kicker (18px/600), "Poppins" for everything else. IMPORTANT text-black custom CSS: `color:#000; text-shadow:1px 1px 0px #FFF` — so in headings the words wrapped in `<span class="text-black">` ("Mobil" in hero, "Makassar" in profil) render BLACK with a white outline, not white.
Hero (#home) is a 2-COLUMN SPLIT, not a full-width banner: LEFT half = bg image img-pilar.jpg + `linear-gradient(250deg, #C10D2673 0%, #C10D26 60%)` overlay, `border-radius:0 0 150px 0`, box-shadow, white text with shadow, and a black pill "Selengkapnya" button (border 1px white, radius 50px, padding 10px 10px 10px 20px, icon on RIGHT via row-reverse, Poppins 16px/500). RIGHT half = pure white, banner img + a sliding image carousel (3 slides visible / 2 mobile, 10px gap, images border 1px #C7C7C7 radius 10px, 2s autoplay, FA chevron-circle arrows).
Profil (#profil): white row, mt 100px; right column is RED #C10D26 box, `border-radius:10px 70px 10px 70px`, overlap via `margin-top:120px; margin-left:-100px` (mobile `margin-top:-100px; padding-top:150px`), padding `40px 40px 40px 100px`. Inside: "Tentang Kami" 20px/500 white, "Rental Mobil <text-black>Makassar</text-black>" Poppins 700 ~40px, TRI BERKAH paragraph, ⭐ layanan list (mt -15px), and black pill "Hubungi Kami" (icon on LEFT, Poppins 600). All profil text white with 0 0 10px rgba(0,0,0,.3) shadow.
Service section: bg image + linear-gradient(180deg,#C10D26C9 0%,#C10D26 60%), border-radius 20px, box-shadow 0px -10px 20px -12px rgba(0,0,0,.5); icon boxes have BLACK icon squares radius 15px. Gallery images: border-radius 20px, mt 200px. Footer/kontak: bg image + linear-gradient(180deg,#C10D26B3 0%,#C10D26 60%), white text, white contact cards radius 10px. Nav anchor ids: home, profil, service, galeri, kontak. Booking form opens as a modal popup and redirects to wa.me/6282223334527. Preserve the auth-dependent login/dashboard links imported from @/routes.

## Assets are local (no hotlinking)
All media is downloaded into public/uploads/ (mirroring the old /wp-content/uploads/ tree) and referenced via `const ASSET = "/uploads"` in welcome.tsx (e.g. `/uploads/2026/02/Logo-Rental-Tri-Berkah-Abadi.png`). Do NOT re-introduce https://juraganrental47.test/wp-content/uploads/ references. Gallery arrays use the ORIGINAL filenames (e.g. `WhatsApp-Image-2026-02-16-at-10.05.20-2.jpeg`), NOT the WP resized `-768xNNN` variants, and are served over `/uploads/2026/02/...`.

## Hero/profil exact geometry (verified @1440px vs reference)
Hero kicker 18px/18lh, subtitle Poppins 20px/20lh, title Racing 60px/50lh w-full (spans 450px), desc 15px/22 @90%, button 186x50 (icon 28px on right). Vertical gaps: 10/20/20/30px; left column content pt 148px lg. Right column: banner 705px wide, -70px overlap left, 3px white border, radius 20px, shadow; carousel 705px wide, -70px, slides crop to 110px tall @lg, 2s autoplay. Profil: img col ~50.9%, red box 640px (56.1%) with `margin-top:120px; margin-left:-100px` + 20px container gap, so box sits x=650, right edge flush at container edge; inside 20px flex gaps (`-mt-[15px]` before the ⭐ list); paragraph/list 16px/24; button 15px/600, padding 12px/24px, icon 15px on left.

## welcome.tsx assets are local, not hotlinked
All media lives in public/uploads/ and is referenced via `const ASSET = "/uploads"`. Never point back at https://juraganrental47.test/wp-content/uploads/. Gallery arrays use the original filenames (no WP `-768xNNN` resize suffixes).

## Unit Armada booking form berasal dari model Armada
Options "Unit Armada" di form pemesanan (welcome.tsx) diambil dari prop `armada.items` (sumber: model Armada), bukan dari field section "services". Admin section "services" hanya berisi `services_list`; jangan tambah daftar armada manual di sana.

## Hero is slide-based with per-slide text/media
Hero section data is now a `slides` repeater (SectionDefinition 'hero'). Each slide has subtitle/title_line1/title_line2/description/button + image/video (video autoplays muted+loop and overrides image). Do NOT reintroduce the old flat hero fields (welcome_text, carousel, background_image, video). Old flat data is migrated into slides on SectionController::edit, and welcome.tsx falls back to legacy keys when slides is empty.
