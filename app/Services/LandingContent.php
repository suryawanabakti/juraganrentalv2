<?php

namespace App\Services;

use App\Models\Armada;
use App\Models\Gallery;
use App\Models\Section;
use Illuminate\Database\Eloquent\Collection;

class LandingContent
{
    /**
     * The section slugs that are expected to exist for the landing page.
     */
    public const SLUGS = [
        'site',
        'hero',
        'about',
        'armada',
        'layanan',
        'services',
        'cta',
        'galeri',
        'kontak',
    ];

    /**
     * Build the normalized props payload shared by welcome & welcome2.
     *
     * @return array<string, mixed>
     */
    public function build(string $variant = 'welcome'): array
    {
        $sections = Section::query()
            ->whereIn('slug', self::SLUGS)
            ->get()
            ->keyBy('slug');

        $hero = $this->data($sections, 'hero');
        $site = $this->data($sections, 'site');

        return [
            'title' => $site['title'] ?? 'Rental Mobil Makassar Murah | Juragan Rental',
            // Canonical/absolute app URL (from APP_URL in .env)
            'canonical' => rtrim(config('app.url'), '/'),
            // Site-wide settings
            'site' => array_merge([
                'title' => '',
                'wa_number' => '6282151939247',
                'email' => 'waseintanperdana@gmail.com',
                'address' => '',
                'keywords' => '',
                'map_link' => 'https://maps.app.goo.gl/fPF1CiqHz2m2n8Fi9',
                'map_embed' => '',
                'logo' => '/storage/logo-panjang.webp',
                'socials' => [],
            ], $site),
            'hero' => array_merge([
                'welcome_text' => '',
                'subtitle' => '',
                'title_line1' => '',
                'title_line2' => '',
                'description' => '',
                'button_text' => '',
                'button_href' => '#profil',
                'video' => '',
                'background_image' => '',
                'carousel' => [],
                'slides' => [],
            ], $hero),
            'about' => array_merge([
                'image' => '/storage/about.webp',
                'label' => '',
                'title' => '',
                'title_highlight' => '',
                'company_name' => '',
                'description' => '',
                'services_list' => [],
                'button_text' => '',
            ], $this->data($sections, 'about')),
            'armada' => [
                'section' => array_merge([
                    'label' => '',
                    'title' => '',
                    'subtitle' => '',
                ], $this->data($sections, 'armada')),
                'items' => Armada::query()
                    ->orderBy('sort_order')
                    ->get()
                    ->map(fn (Armada $armada) => [
                        'id' => $armada->id,
                        'slug' => $armada->slug,
                        'name' => $armada->name,
                        'image' => $armada->image,
                        'capacity' => $armada->capacity,
                        'price' => $armada->price,
                    ])
                    ->values()
                    ->all(),
            ],
            'layanan' => array_merge([
                'banner_image' => '/storage/car-banner.webp',
                'label' => '',
                'title' => '',
                'title_highlight' => '',
                'subtitle' => '',
                'features' => [],
            ], $this->data($sections, 'layanan')),
            'services' => array_merge([
                'services_list' => [],
            ], $this->data($sections, 'services')),
            'cta' => array_merge([
                'title' => '',
                'description' => '',
                'button_text' => '',
            ], $this->data($sections, 'cta')),
            'galeri' => array_merge([
                'title' => '',
                'subtitle' => '',
                'tabs' => ['Customer', 'Armada'],
            ], $this->data($sections, 'galeri')),
            'kontak' => array_merge([
                'intro' => '',
                'copyright' => '',
                'visitor_count' => '',
            ], $this->data($sections, 'kontak')),
            'gallery' => [
                'customer' => $this->galleryItems('customer'),
                'armada' => $this->galleryItems('armada'),
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function data(Collection $sections, string $slug): array
    {
        $section = $sections->get($slug);

        return $section?->data ?? [];
    }

    /**
     * @return list<array{id: int, type: string, src: string, thumbnail: string|null}>
     */
    private function galleryItems(string $category): array
    {
        return Gallery::query()
            ->where('category', $category)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Gallery $gallery) => [
                'id' => $gallery->id,
                'type' => $gallery->type,
                'src' => $gallery->image,
                'thumbnail' => $gallery->thumbnail,
            ])
            ->values()
            ->all();
    }
}
