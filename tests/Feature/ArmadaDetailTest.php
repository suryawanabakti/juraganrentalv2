<?php

use App\Models\Armada;
use App\Models\ArmadaImage;
use App\Models\User;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;

test('the public armada detail page renders the armada and its sub images', function () {
    $armada = Armada::factory()->create([
        'name' => 'TOYOTA HIACE COMMUTER',
        'price' => 'Rp 800.000',
    ]);

    ArmadaImage::factory()->create([
        'armada_id' => $armada->id,
        'image' => '/storage/uploads/2026/02/WhatsApp-Image-1.webp',
        'sort_order' => 0,
    ]);

    ArmadaImage::factory()->create([
        'armada_id' => $armada->id,
        'image' => '/storage/uploads/2026/02/WhatsApp-Image-2.webp',
        'sort_order' => 1,
    ]);

    $this->get(route('armada.show', $armada->slug))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('armada/show')
            ->where('canonical', rtrim(config('app.url'), '/'))
            ->where('armada.slug', 'toyota-hiace-commuter')
            ->where('armada.name', 'TOYOTA HIACE COMMUTER')
            ->where('armada.price', 'Rp 800.000')
            ->has('armada.images', 2)
            ->where('armada.images.0', '/storage/uploads/2026/02/WhatsApp-Image-1.webp')
            ->where('armada.images.1', '/storage/uploads/2026/02/WhatsApp-Image-2.webp')
        );
});

test('the public armada detail page returns 404 for a missing armada', function () {
    $this->get(route('armada.show', 'tidak-ada'))
        ->assertNotFound();
});

test('admin can store an armada with multiple sub images', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->withoutMiddleware(PreventRequestForgery::class)
        ->post(route('admin.armada.store'), [
            'name' => 'TOYOTA ALPHARD',
            'image' => '/storage/uploads/1.webp',
            'images' => ['/storage/uploads/2.webp', '/storage/uploads/3.webp'],
            'capacity' => '7 Seat',
            'price' => 'Rp 2.000.000',
        ])
        ->assertRedirect(route('admin.armada.index'));

    $armada = Armada::query()->where('name', 'TOYOTA ALPHARD')->firstOrFail();

    expect($armada->slug)->toBe('toyota-alphard')
        ->and($armada->images->pluck('image')->all())->toBe([
            '/storage/uploads/2.webp',
            '/storage/uploads/3.webp',
        ]);
});

test('admin can store an armada with a custom slug', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->withoutMiddleware(PreventRequestForgery::class)
        ->post(route('admin.armada.store'), [
            'name' => 'TOYOTA ALPHARD',
            'slug' => 'alphard-vip',
            'image' => '/storage/uploads/1.webp',
            'capacity' => '7 Seat',
            'price' => 'Rp 2.000.000',
        ])
        ->assertRedirect(route('admin.armada.index'));

    $armada = Armada::query()->where('name', 'TOYOTA ALPHARD')->firstOrFail();

    expect($armada->slug)->toBe('alphard-vip');
});

test('admin can update an armada and replace its sub images', function () {
    $user = User::factory()->create();
    $armada = Armada::factory()->create();

    ArmadaImage::factory()->create([
        'armada_id' => $armada->id,
        'image' => '/storage/uploads/old.webp',
    ]);

    $this->actingAs($user)
        ->withoutMiddleware(PreventRequestForgery::class)
        ->put(route('admin.armada.update', $armada), [
            'name' => $armada->name,
            'image' => '/storage/uploads/new-main.webp',
            'images' => ['/storage/uploads/new-1.webp', '/storage/uploads/new-2.webp'],
            'capacity' => $armada->capacity,
            'price' => $armada->price,
        ])
        ->assertRedirect(route('admin.armada.index'));

    $armada->refresh();

    expect($armada->image)->toBe('/storage/uploads/new-main.webp')
        ->and($armada->images->pluck('image')->all())->toBe([
            '/storage/uploads/new-1.webp',
            '/storage/uploads/new-2.webp',
        ]);
});

test('admin can remove all sub images from an armada', function () {
    $user = User::factory()->create();
    $armada = Armada::factory()->create();

    ArmadaImage::factory()->create(['armada_id' => $armada->id]);

    $this->actingAs($user)
        ->withoutMiddleware(PreventRequestForgery::class)
        ->put(route('admin.armada.update', $armada), [
            'name' => $armada->name,
            'image' => $armada->image,
            'images' => [],
            'capacity' => $armada->capacity,
            'price' => $armada->price,
        ])
        ->assertRedirect(route('admin.armada.index'));

    expect($armada->images()->count())->toBe(0);
});

test('armada slugs are unique when names collide', function () {
    $first = Armada::factory()->create(['name' => 'TOYOTA INNOVA REBORN']);
    $second = Armada::factory()->create(['name' => 'TOYOTA INNOVA REBORN']);

    expect($first->slug)->toBe('toyota-innova-reborn')
        ->and($second->slug)->toBe('toyota-innova-reborn-2');
});

test('a manually provided slug that collides gets a unique suffix', function () {
    $first = Armada::factory()->create(['slug' => 'innova-reborn']);
    $second = Armada::factory()->create(['slug' => 'innova-reborn']);

    expect($first->slug)->toBe('innova-reborn')
        ->and($second->slug)->toBe('innova-reborn-2');
});

test('armada slug updates when the name changes', function () {
    $armada = Armada::factory()->create(['name' => 'TOYOTA AVANZA']);

    $armada->update(['name' => 'TOYOTA ALL NEW AVANZA']);

    expect($armada->refresh()->slug)->toBe('toyota-all-new-avanza');
});
