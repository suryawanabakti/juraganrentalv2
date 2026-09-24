<?php

namespace Database\Seeders;

use App\Models\Armada;
use App\Models\ArmadaImage;
use App\Models\Gallery;
use App\Models\Section;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AssetSeeder extends Seeder
{
    /**
     * Seed the landing page content using only assets stored on the public disk.
     */
    public function run(): void
    {
        $this->seedSections();
        $this->seedArmadas();
        $this->seedArmadaImages();
        $this->seedGalleries();
    }

    private function seedSections(): void
    {
        $heroCarousel = collect(['hiace-commuter', 'hiace-premio', 'innova', 'expander'])
            ->map(fn (string $needle) => $this->findImage($needle))
            ->filter()
            ->unique()
            ->values();

        $sections = [
            'site' => [
                'name' => 'Pengaturan Situs',
                'data' => [
                    'title' => 'Rental Mobil Makassar Murah | Juragan Rental',
                    'wa_number' => '6282151939247',
                    'email' => 'waseintanperdana@gmail.com',
                    'address' => 'Jl. Tentara Pelajar No. 42 F, Makassar - Sulawesi Selatan',
                    'keywords' => 'mobil mewah, rental premium, juragan rental 47, hiace makassar, rental makassar, premium class rentcar, rentcar makassar',
                    'map_link' => 'https://maps.app.goo.gl/fPF1CiqHz2m2n8Fi9',
                    'map_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.884740960433!2d119.4119989!3d-5.122268999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbf0298d4eda149%3A0x542414444215eac5!2sJl.%20Tentara%20Pelajar%20No.42%2C%20Mampu%2C%20Kec.%20Wajo%2C%20Kota%20Makassar%2C%20Sulawesi%20Selatan%2090165!5e0!3m2!1sid!2sid!4v1788882590149!5m2!1sid!2sid',
                    'logo' => $this->findImage('logo-panjang'),
                    'socials' => [
                        ['label' => 'Instagram', 'href' => 'https://www.instagram.com/rentalmobilmakassarmurah_', 'icon' => 'instagram'],
                        ['label' => 'Tiktok', 'href' => 'https://www.tiktok.com/@tri.berkah.abadi', 'icon' => 'tiktok'],
                        ['label' => 'Facebook', 'href' => 'https://www.facebook.com/tri.berkah.98', 'icon' => 'facebook'],
                        ['label' => 'Youtube', 'href' => 'https://www.youtube.com/@triberkahabadi1071', 'icon' => 'youtube'],
                    ],
                ],
            ],
            'hero' => [
                'name' => 'Beranda / Hero',
                'data' => [
                    'slides' => [
                        [
                            'subtitle' => 'Solusi Perjalanan Terbaik Anda',
                            'title_line1' => 'Juragan',
                            'title_line2' => 'Rental 47',
                            'description' => 'Rental Makassar menyediakan layanan sewa mobil terpercaya dengan armada bersih, nyaman, dan harga terjangkau. Melayani kebutuhan perjalanan dalam kota, luar kota, antar jemput bandara, serta paket wisata dengan driver profesional dan berpengalaman.',
                            'button_text' => 'Selengkapnya',
                            'button_href' => '#profil',
                            'image' => $heroCarousel->get(0, ''),
                            'video' => $this->findVideo(),
                        ],
                        [
                            'subtitle' => 'Armada Premium & Terawat',
                            'title_line1' => 'Hiace',
                            'title_line2' => 'Premium Class',
                            'description' => 'Perjalanan rombongan paling nyaman dengan Toyota Hiace berkapasitas hingga 15 kursi, lengkap dengan full AC, TV, dan karaoke. Pilih kelas armada sesuai kebutuhan Anda.',
                            'button_text' => 'Lihat Armada',
                            'button_href' => '#armada',
                            'image' => $heroCarousel->get(1, $heroCarousel->first() ?? ''),
                            'video' => '',
                        ],
                        [
                            'subtitle' => 'Keluarga & Perjalanan Dinas',
                            'title_line1' => 'Innova &',
                            'title_line2' => 'Xpander',
                            'description' => 'Mobil keluarga yang bersih, nyaman, dan siap pakai untuk liburan maupun keperluan bisnis. Tersedia lengkap dengan driver profesional dan berpengalaman.',
                            'button_text' => 'Lihat Armada',
                            'button_href' => '#armada',
                            'image' => $heroCarousel->get(2, $heroCarousel->first() ?? ''),
                            'video' => '',
                        ],
                        [
                            'subtitle' => 'Layanan Antar Jemput Bandara',
                            'title_line1' => 'Bandara &',
                            'title_line2' => 'Paket Wisata',
                            'description' => 'Penjemputan dan pengantaran Bandara Sultan Hasanuddin serta paket wisata Sulawesi Selatan. Driver berpengalaman siap mengawal perjalanan Anda, dalam maupun luar kota.',
                            'button_text' => 'Hubungi Kami',
                            'button_href' => '#kontak',
                            'image' => $heroCarousel->get(3, $heroCarousel->first() ?? ''),
                            'video' => '',
                        ],
                    ],
                ],
            ],
            'about' => [
                'name' => 'Profil / Tentang Kami',
                'data' => [
                    'image' => $this->findImage('about'),
                    'label' => 'Tentang Kami',
                    'title' => 'Rental Mobil',
                    'title_highlight' => 'Makassar',
                    'company_name' => 'TRI BERKAH ABADI',
                    'description' => 'adalah salah satu perusahaan yang bergerak di bidang jasa Persewaan Kendaraan dan Tour Wisata, yang didirikan di Kota Makassar, Sulawesi Selatan. Kami juga menyediakan transportasi sesuai dengan kebutuhan customer.',
                    'services_list' => [
                        ['title' => 'Include Driver + BBM/Non BBM', 'description' => 'Lengkap dengan pengemudi berpengalaman, bahan bakar sesuai kesepakatan.'],
                        ['title' => 'Luar dan Dalam Kota Makassar', 'description' => 'Melayani perjalanan dalam kota maupun luar kota Makassar.'],
                        ['title' => 'Rombongan Wisata, Wedding, Private Tour, Kedinasan, dan Kegiatan Sosial Lainnya', 'description' => 'Siap mengantar rombongan untuk berbagai acara dan kegiatan.'],
                    ],
                    'button_text' => 'Hubungi Kami',
                ],
            ],
            'armada' => [
                'name' => 'Armada',
                'data' => [
                    'label' => 'Pilihan Kendaraan',
                    'title' => 'Armada Kami',
                    'subtitle' => 'Pilihan kendaraan nyaman untuk menemani perjalanan Anda.',
                ],
            ],
            'layanan' => [
                'name' => 'Keunggulan Layanan',
                'data' => [
                    'label' => 'Keunggulan Kami',
                    'banner_image' => $this->findImage('car-banner'),
                    'title' => 'Kenapa Memilih',
                    'title_highlight' => 'Kami?',
                    'subtitle' => 'Kami selalu memberikan yang terbaik untuk kepuasan pelanggan',
                    'features' => [
                        ['image' => $this->findImage('img-pilar'), 'icon' => 'car', 'title' => 'Armada Terbaru', 'description' => 'Armada selalu update dari sisi performa maupun perlengkapan kendaraan.'],
                        ['image' => $this->findImage('car-banner'), 'icon' => 'user-check', 'title' => 'Driver Terbaik', 'description' => 'Driver berpengalaman, menguasai medan, dan memiliki sertifikat.'],
                        ['image' => $this->findImage('about'), 'icon' => 'phone', 'title' => 'Harga Terjangkau', 'description' => 'Harga bisa menyesuaikan dengan budget perjalanan Anda.'],
                        ['image' => $this->findImage('car-banner'), 'icon' => 'calendar', 'title' => 'CS 24 Jam', 'description' => 'Layanan pelanggan 24 jam untuk informasi armada & harga.'],
                    ],
                ],
            ],
            'services' => [
                'name' => 'Kartu Layanan',
                'data' => [
                    'services_list' => [
                        ['icon' => 'car', 'title' => 'Rental Mobil', 'description' => 'Sewa mobil tanpa driver untuk kebutuhan pribadi atau perusahaan.'],
                        ['icon' => 'user-check', 'title' => 'Rental Mobil + Driver', 'description' => 'Sewa mobil dengan driver profesional dan berpengalaman.'],
                        ['icon' => 'plane', 'title' => 'Antar Jemput Bandara', 'description' => 'Penjemputan dan pengantaran bandara Sultan Hasanuddin.'],
                        ['icon' => 'map-pinned', 'title' => 'Dalam Kota Makassar', 'description' => 'Mudah beraktivitas di dalam kota Makassar dan sekitarnya.'],
                        ['icon' => 'route', 'title' => 'Luar Kota', 'description' => 'Perjalanan luar kota dengan armada yang nyaman dan aman.'],
                        ['icon' => 'camera', 'title' => 'Paket Wisata', 'description' => 'Paket tour wisata Sulawesi Selatan dengan driver terbaik.'],
                    ],
                ],
            ],
            'cta' => [
                'name' => 'CTA / Booking',
                'data' => [
                    'title' => 'Siap Berangkat Bersama Kami?',
                    'description' => 'Hubungi kami untuk mendapatkan informasi armada dan harga terbaik.',
                    'button_text' => 'Booking Sekarang',
                ],
            ],
            'galeri' => [
                'name' => 'Galeri',
                'data' => [
                    'title' => 'Galeri',
                    'subtitle' => 'Momen perjalanan dan armada kami bersama pelanggan.',
                    'tabs' => ['Customer', 'Armada'],
                ],
            ],
            'kontak' => [
                'name' => 'Kontak / Footer',
                'data' => [
                    'intro' => 'Jasa Rental Mobil Makassar dan Pariwisata. Murah, fasilitas lengkap, driver berpengalaman. Pesan Sekarang!',
                    'copyright' => 'Copyright © 2026 | Juragan Rental',
                    'visitor_count' => '4,889',
                ],
            ],
        ];

        foreach ($sections as $slug => $value) {
            Section::query()->updateOrCreate(
                ['slug' => $slug],
                ['name' => $value['name'], 'data' => $value['data']],
            );
        }
    }

    private function seedArmadas(): void
    {
        $armadas = [
            ['name' => 'TOYOTA HIACE COMMUTER', 'capacity' => '15 Seat · Full AC, TV, Karaoke', 'price' => 'Rp 800.000', 'needle' => 'hiace-commuter'],
            ['name' => 'TOYOTA HIACE PREMIO VIP', 'capacity' => '13 Seat · Full AC, TV, Karaoke', 'price' => 'Rp 1.000.000', 'needle' => 'hiace-premio'],
            ['name' => 'TOYOTA INNOVA REBORN', 'capacity' => '7 Seat · Nyaman untuk keluarga', 'price' => 'Rp 650.000', 'needle' => 'innova'],
            ['name' => 'MITSUBISHI X PANDER', 'capacity' => '7 Seat · Nyaman untuk keluarga', 'price' => 'Rp 600.000', 'needle' => 'expander'],
        ];

        $uploadImages = $this->uploadImages();

        $usedSlugs = [];

        foreach ($armadas as $index => $armada) {
            $image = $this->findImage($armada['needle']);
            $image = $image ?: ($uploadImages[$index] ?? '');

            $base = Str::slug($armada['name']) ?: 'armada';
            $slug = $base;
            $counter = 2;

            while (isset($usedSlugs[$slug])) {
                $slug = $base.'-'.$counter;
                $counter++;
            }

            $usedSlugs[$slug] = true;

            Armada::query()->updateOrCreate(
                ['slug' => $slug],
                [
                    'name' => $armada['name'],
                    'image' => $image,
                    'capacity' => $armada['capacity'],
                    'price' => $armada['price'],
                    'sort_order' => $index,
                ],
            );
        }
    }

    private function seedArmadaImages(): void
    {
        $candidates = collect($this->uploadImages())
            ->filter(fn (string $url) => str_contains($url, 'WhatsApp-Image'))
            ->values();

        $armadas = Armada::query()->orderBy('sort_order')->get();

        foreach ($armadas as $index => $armada) {
            $armada->images()->delete();

            $images = $candidates
                ->slice(($index * 3) % max(1, $candidates->count()), 3)
                ->values();

            foreach ($images as $sortOrder => $image) {
                ArmadaImage::query()->create([
                    'armada_id' => $armada->id,
                    'image' => $image,
                    'sort_order' => $sortOrder,
                ]);
            }
        }
    }

    private function seedGalleries(): void
    {
        $candidates = collect($this->uploadImages())
            ->filter(fn (string $url) => str_contains($url, 'WhatsApp-Image'))
            ->values()
            ->all();

        $customer = array_slice($candidates, 0, 4);
        $armada = array_slice($candidates, 4, 4);

        Gallery::query()->delete();

        foreach ($customer as $index => $image) {
            Gallery::query()->create([
                'category' => 'customer',
                'type' => 'image',
                'image' => $image,
                'sort_order' => $index,
            ]);
        }

        foreach ($armada as $index => $image) {
            Gallery::query()->create([
                'category' => 'armada',
                'type' => 'image',
                'image' => $image,
                'sort_order' => $index,
            ]);
        }
    }

    /**
     * @return Collection<int, string>
     */
    private function uploadImages(): array
    {
        return $this->images()
            ->filter(fn (string $url) => str_contains($url, '/uploads/'))
            ->values()
            ->all();
    }

    /**
     * @return Collection<int, string>
     */
    private function images(): Collection
    {
        return $this->files()
            ->filter(fn (string $path) => preg_match('/\.(jpe?g|png|webp|gif|avif|svg)$/i', $path) === 1)
            ->map(fn (string $path) => $this->storageUrl($path))
            ->sort()
            ->values();
    }

    /**
     * @return Collection<int, string>
     */
    private function videos(): Collection
    {
        return $this->files()
            ->filter(fn (string $path) => preg_match('/\.(mp4|webm|mov|m4v)$/i', $path) === 1)
            ->map(fn (string $path) => $this->storageUrl($path))
            ->sort()
            ->values();
    }

    /**
     * @return Collection<int, string>
     */
    private function files(): Collection
    {
        return collect(Storage::disk('public')->allFiles());
    }

    private function storageUrl(string $path): string
    {
        return '/storage/'.ltrim($path, '/');
    }

    private function findVideo(string $needle = 'video.mp4'): string
    {
        $found = $this->videos()->first(fn (string $url) => str_contains($url, $needle));

        return $found ?? $this->videos()->first() ?? '';
    }

    private function findImage(string $needle, ?string $fallback = null): string
    {
        $needle = mb_strtolower($needle);

        $matches = $this->images()->filter(
            fn (string $url) => str_contains(mb_strtolower($url), $needle),
        );

        $webp = $matches->first(fn (string $url) => str_ends_with($url, '.webp'));

        return $webp ?? $matches->first() ?? $fallback ?? '';
    }
}
