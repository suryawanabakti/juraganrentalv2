<?php

use App\Models\Armada;
use App\Models\Gallery;
use App\Models\Section;
use App\Services\LandingContent;

test('landing page renders with database content', function () {
    Section::factory()->create([
        'slug' => 'hero',
        'name' => 'Hero Section',
        'data' => [
            'welcome_text' => 'Selamat Datang',
            'title_line1' => 'Rental Mobil',
            'title_line2' => 'Makassar',
            'carousel' => ['/uploads/2026/01/Hiace-commuter.webp'],
            'video' => '/video.mp4',
        ],
    ]);

    $response = $this->get(route('home'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->where('canonical', rtrim(config('app.url'), '/'))
            ->has('hero.carousel', 1)
            ->where('hero.video', '/video.mp4')
            ->where('hero.welcome_text', 'Selamat Datang')
            ->where('hero.title_line1', 'Rental Mobil')
        );
});

test('landing content maps armada and gallery collections', function () {
    $armada = Armada::factory()->create(['sort_order' => 1]);
    Gallery::factory()->create(['category' => 'customer']);
    Gallery::factory()->create(['category' => 'armada']);

    $this->get(route('home'))
        ->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->has('armada.items', 1)
            ->where('armada.items.0.slug', $armada->slug)
            ->where('armada.items.0.name', $armada->name)
            ->where('armada.items.0.price', $armada->price)
            ->has('gallery.customer', 1)
            ->has('gallery.armada', 1)
            ->where('gallery.customer.0.type', 'image')
            ->where(
                'gallery.customer.0.src',
                '/uploads/2026/02/WhatsApp-Image-2026-02-16-at-10.05.20-2.webp',
            )
            ->where('gallery.customer.0.thumbnail', null)
        );
});

test('landing content exposes gallery video and youtube items', function () {
    Gallery::factory()->create([
        'category' => 'customer',
        'type' => 'video',
        'image' => '/uploads/galeri/showcase.mp4',
        'thumbnail' => '/uploads/galeri/showcase-thumb.webp',
    ]);
    Gallery::factory()->create([
        'category' => 'customer',
        'type' => 'youtube',
        'image' => 'https://www.youtube.com/watch?v=abc123XYZ45',
        'thumbnail' => null,
    ]);

    $this->get(route('home'))
        ->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->has('gallery.customer', 2)
            ->where('gallery.customer.0.type', 'video')
            ->where('gallery.customer.0.src', '/uploads/galeri/showcase.mp4')
            ->where('gallery.customer.0.thumbnail', '/uploads/galeri/showcase-thumb.webp')
            ->where('gallery.customer.1.type', 'youtube')
            ->where('gallery.customer.1.src', 'https://www.youtube.com/watch?v=abc123XYZ45')
        );
});

test('landing content falls back to defaults when sections are missing', function () {
    $props = app(LandingContent::class)->build();

    expect($props['site']['wa_number'])->toBe('6282151939247');
    expect($props['hero']['slides'])->toBe([]);
    expect($props['armada']['items'])->toBe([]);
});

test('landing hero exposes per-slide text and media', function () {
    Section::factory()->create([
        'slug' => 'hero',
        'name' => 'Hero Section',
        'data' => [
            'slides' => [
                [
                    'subtitle' => 'Slide Pertama',
                    'title_line1' => 'Juragan',
                    'title_line2' => 'Rental 47',
                    'description' => 'Deskripsi slide pertama',
                    'button_text' => 'Booking',
                    'button_href' => '#armada',
                    'image' => '/uploads/1.webp',
                    'video' => '',
                ],
                [
                    'subtitle' => 'Slide Kedua',
                    'title_line1' => 'Armada',
                    'title_line2' => 'Premium',
                    'description' => 'Deskripsi slide kedua',
                    'button_text' => 'Lihat Armada',
                    'button_href' => '#profil',
                    'image' => '',
                    'video' => '/uploads/hero.mp4',
                ],
            ],
        ],
    ]);

    $this->get(route('home'))
        ->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->has('hero.slides', 2)
            ->where('hero.slides.0.subtitle', 'Slide Pertama')
            ->where('hero.slides.0.image', '/uploads/1.webp')
            ->where('hero.slides.1.title_line1', 'Armada')
            ->where('hero.slides.1.video', '/uploads/hero.mp4')
        );
});
