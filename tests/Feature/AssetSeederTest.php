<?php

use App\Models\Armada;
use App\Models\ArmadaImage;
use App\Models\Gallery;
use App\Models\Section;
use Database\Seeders\AssetSeeder;
use Illuminate\Support\Facades\Storage;

function putSeederAssets(): void
{
    Storage::fake('public');

    foreach (['Hiace-commuter', 'Hiace-premio', 'Innova', 'Expander'] as $car) {
        Storage::disk('public')->put("uploads/2026/01/{$car}.webp", 'img');
    }

    foreach (range(1, 6) as $n) {
        Storage::disk('public')->put("uploads/2026/02/WhatsApp-Image-{$n}.webp", 'img');
    }

    Storage::disk('public')->put('video.mp4', 'vid');
    Storage::disk('public')->put('logo-panjang.webp', 'img');
    Storage::disk('public')->put('car-banner.webp', 'img');
    Storage::disk('public')->put('about.webp', 'img');
    Storage::disk('public')->put('img-pilar.webp', 'img');
}

test('asset seeder populates sections armadas and galleries from storage', function () {
    putSeederAssets();

    $this->seed(AssetSeeder::class);

    expect(Section::query()->pluck('slug')->sort()->values()->all())
        ->toBe([
            'about',
            'armada',
            'cta',
            'galeri',
            'hero',
            'kontak',
            'layanan',
            'services',
            'site',
        ]);

    $hero = Section::where('slug', 'hero')->firstOrFail();

    expect($hero->data['slides'])->toHaveCount(4)
        ->and($hero->data['slides'][0]['video'])->not->toBe('')
        ->and($hero->data['slides'][0]['subtitle'])->toBe('Solusi Perjalanan Terbaik Anda');

    $subtitles = collect($hero->data['slides'])->pluck('subtitle');
    expect($subtitles)->unique()->toHaveCount(4);

    $armadas = Armada::query()
        ->orderBy('sort_order')
        ->get();

    expect($armadas)->toHaveCount(4);

    $armadas->each(function (Armada $armada): void {
        expect($armada->slug)->not->toBe('')
            ->and($armada->image)->not->toBe('');
    });

    expect($armadas->pluck('sort_order')->all())->toBe([0, 1, 2, 3]);

    expect(ArmadaImage::query()->count())->toBeGreaterThan(0)
        ->and(Gallery::query()->where('category', 'customer')->count())->toBeGreaterThan(0)
        ->and(Gallery::query()->where('category', 'armada')->count())->toBeGreaterThan(0);
});

test('asset seeder is idempotent when run twice', function () {
    putSeederAssets();

    $this->seed(AssetSeeder::class);
    $first = [
        'sections' => Section::query()->count(),
        'armadas' => Armada::query()->count(),
        'armada_images' => ArmadaImage::query()->count(),
        'galleries' => Gallery::query()->count(),
    ];

    $this->seed(AssetSeeder::class);
    $second = [
        'sections' => Section::query()->count(),
        'armadas' => Armada::query()->count(),
        'armada_images' => ArmadaImage::query()->count(),
        'galleries' => Gallery::query()->count(),
    ];

    expect($second)->toBe($first);
});
