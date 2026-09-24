<?php

namespace App\Services;

class SectionDefinition
{
    /**
     * Return the section definitions used by the admin panel.
     *
     * Each section maps to an editable page section and lists its data fields.
     *
     * @return array<string, array<string, mixed>>
     */
    public static function definitions(): array
    {
        return [
            'site' => [
                'name' => 'Pengaturan Situs',
                'description' => 'Informasi global website: kontak, sosial media, logo, dan SEO.',
                'fields' => [
                    ['key' => 'title', 'label' => 'Judul Website (SEO)', 'type' => 'text'],
                    ['key' => 'wa_number', 'label' => 'Nomor WhatsApp (format 62...)', 'type' => 'text'],
                    ['key' => 'email', 'label' => 'Email', 'type' => 'text'],
                    ['key' => 'address', 'label' => 'Alamat', 'type' => 'textarea'],
                    ['key' => 'keywords', 'label' => 'Keywords (SEO)', 'type' => 'textarea'],
                    ['key' => 'map_link', 'label' => 'Link Maps', 'type' => 'text'],
                    ['key' => 'map_embed', 'label' => 'Embed Maps (iframe src)', 'type' => 'textarea'],
                    ['key' => 'logo', 'label' => 'Logo', 'type' => 'image'],
                    [
                        'key' => 'socials',
                        'label' => 'Sosial Media',
                        'type' => 'repeater',
                        'fields' => [
                            ['key' => 'label', 'label' => 'Label', 'type' => 'text'],
                            ['key' => 'href', 'label' => 'URL', 'type' => 'text'],
                            ['key' => 'icon', 'label' => 'Icon', 'type' => 'icon'],
                        ],
                    ],
                ],
            ],
            'hero' => [
                'name' => 'Beranda / Hero',
                'description' => 'Slide banner utama halaman. Setiap slide memiliki teks sendiri dan media: foto atau video (video otomatis berputar & berulang).',
                'fields' => [
                    [
                        'key' => 'slides',
                        'label' => 'Slide Hero',
                        'type' => 'repeater',
                        'hint' => 'Setiap slide punya teks sendiri dan media. Jika video diisi, video akan diputar otomatis (muted & loop) dan mengesampingkan foto. Slide lama otomatis dipindahkan menjadi slide di sini.',
                        'fields' => [
                            ['key' => 'subtitle', 'label' => 'Sub Judul (misal: Solusi Perjalanan Terbaik Anda)', 'type' => 'text'],
                            ['key' => 'title_line1', 'label' => 'Judul Baris 1', 'type' => 'text'],
                            ['key' => 'title_line2', 'label' => 'Judul Baris 2', 'type' => 'text'],
                            ['key' => 'description', 'label' => 'Deskripsi', 'type' => 'textarea'],
                            ['key' => 'button_text', 'label' => 'Teks Tombol', 'type' => 'text'],
                            ['key' => 'button_href', 'label' => 'Tautan Tombol (contoh: #profil)', 'type' => 'text'],
                            ['key' => 'image', 'label' => 'Foto Background', 'type' => 'image'],
                            ['key' => 'video', 'label' => 'Video Background (auto play)', 'type' => 'video'],
                        ],
                    ],
                ],
            ],
            'about' => [
                'name' => 'Profil / Tentang Kami',
                'description' => 'Profil perusahaan di bagian "Tentang Kami".',
                'fields' => [
                    ['key' => 'image', 'label' => 'Foto Profil', 'type' => 'image'],
                    ['key' => 'label', 'label' => 'Label (Tentang Kami)', 'type' => 'text'],
                    ['key' => 'title', 'label' => 'Judul', 'type' => 'text'],
                    ['key' => 'title_highlight', 'label' => 'Judul Sorotan', 'type' => 'text'],
                    ['key' => 'company_name', 'label' => 'Nama Perusahaan', 'type' => 'text'],
                    ['key' => 'description', 'label' => 'Deskripsi', 'type' => 'textarea'],
                    [
                        'key' => 'services_list',
                        'label' => 'Daftar Layanan Utama',
                        'type' => 'repeater',
                        'fields' => [
                            ['key' => 'title', 'label' => 'Judul Layanan', 'type' => 'text'],
                            ['key' => 'description', 'label' => 'Deskripsi', 'type' => 'textarea'],
                        ],
                    ],
                    ['key' => 'button_text', 'label' => 'Teks Tombol', 'type' => 'text'],
                ],
            ],
            'armada' => [
                'name' => 'Armada',
                'description' => 'Judul dan teks pendukung bagian armada. Daftar armada dikelola pada menu "Armada".',
                'fields' => [
                    ['key' => 'label', 'label' => 'Label', 'type' => 'text'],
                    ['key' => 'title', 'label' => 'Judul', 'type' => 'text'],
                    ['key' => 'subtitle', 'label' => 'Sub Judul', 'type' => 'textarea'],
                ],
            ],
            'layanan' => [
                'name' => 'Keunggulan Layanan',
                'description' => 'Judul bagian Layanan dan kartu keunggulan (features).',
                'fields' => [
                    ['key' => 'label', 'label' => 'Label Section', 'type' => 'text'],
                    ['key' => 'banner_image', 'label' => 'Gambar Banner', 'type' => 'image'],
                    ['key' => 'title', 'label' => 'Judul', 'type' => 'text'],
                    ['key' => 'title_highlight', 'label' => 'Judul Sorotan', 'type' => 'text'],
                    ['key' => 'subtitle', 'label' => 'Sub Judul', 'type' => 'textarea'],
                    [
                        'key' => 'features',
                        'label' => 'Kartu Keunggulan',
                        'type' => 'repeater',
                        'fields' => [
                            ['key' => 'image', 'label' => 'Gambar Background', 'type' => 'image'],
                            ['key' => 'icon', 'label' => 'Icon', 'type' => 'icon'],
                            ['key' => 'title', 'label' => 'Judul', 'type' => 'text'],
                            ['key' => 'description', 'label' => 'Deskripsi', 'type' => 'textarea'],
                        ],
                    ],
                ],
            ],
            'services' => [
                'name' => 'Kartu Layanan',
                'description' => 'Daftar kartu layanan besar yang tampil di bagian Layanan halaman utama.',
                'fields' => [
                    [
                        'key' => 'services_list',
                        'label' => 'Daftar Layanan',
                        'type' => 'repeater',
                        'fields' => [
                            ['key' => 'icon', 'label' => 'Icon', 'type' => 'icon'],
                            ['key' => 'title', 'label' => 'Judul', 'type' => 'text'],
                            ['key' => 'description', 'label' => 'Deskripsi', 'type' => 'textarea'],
                        ],
                    ],
                ],
            ],
            'cta' => [
                'name' => 'CTA / Booking',
                'description' => 'Banner ajakan "Booking Sekarang".',
                'fields' => [
                    ['key' => 'title', 'label' => 'Judul', 'type' => 'text'],
                    ['key' => 'description', 'label' => 'Deskripsi', 'type' => 'textarea'],
                    ['key' => 'button_text', 'label' => 'Teks Tombol', 'type' => 'text'],
                ],
            ],
            'galeri' => [
                'name' => 'Galeri',
                'description' => 'Judul bagian galeri. Gambar dikelola pada menu "Galeri".',
                'fields' => [
                    ['key' => 'title', 'label' => 'Judul', 'type' => 'text'],
                    ['key' => 'subtitle', 'label' => 'Sub Judul', 'type' => 'textarea'],
                    ['key' => 'tabs', 'label' => 'Tab Kategori', 'type' => 'list'],
                ],
            ],
            'kontak' => [
                'name' => 'Kontak / Footer',
                'description' => 'Teks footer bagian bawah situs.',
                'fields' => [
                    ['key' => 'intro', 'label' => 'Deskripsi Brand', 'type' => 'textarea'],
                    ['key' => 'copyright', 'label' => 'Teks Copyright', 'type' => 'text'],
                    ['key' => 'visitor_count', 'label' => 'Jumlah Pengunjung', 'type' => 'text'],
                ],
            ],
        ];
    }

    /**
     * Return a single section definition.
     *
     * @return array<string, mixed>|null
     */
    public static function definition(string $slug): ?array
    {
        return self::definitions()[$slug] ?? null;
    }

    /**
     * Return all editable section slugs.
     *
     * @return list<string>
     */
    public static function collectKeys(): array
    {
        return array_keys(self::definitions());
    }
}
