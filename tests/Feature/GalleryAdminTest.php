<?php

use App\Models\Gallery;
use App\Models\User;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;

test('guests are redirected to the login page', function () {
    $this->post(route('admin.galeri.reorder'), [
        'category' => 'customer',
        'ids' => [1, 2],
    ])->assertRedirect(route('login'));
});

test('admin can reorder galleries within a category', function () {
    $user = User::factory()->create();
    $a = Gallery::factory()->create(['category' => 'customer', 'sort_order' => 0]);
    $b = Gallery::factory()->create(['category' => 'customer', 'sort_order' => 1]);
    $c = Gallery::factory()->create(['category' => 'customer', 'sort_order' => 2]);
    Gallery::factory()->create(['category' => 'armada', 'sort_order' => 3]);

    $this->actingAs($user)
        ->withoutMiddleware(PreventRequestForgery::class)
        ->post(route('admin.galeri.reorder'), [
            'category' => 'customer',
            'ids' => [$c->id, $a->id, $b->id],
        ])->assertRedirect(route('admin.galeri.index'));

    expect(Gallery::query()->find($c->id)->sort_order)->toBe(0)
        ->and(Gallery::query()->find($a->id)->sort_order)->toBe(1)
        ->and(Gallery::query()->find($b->id)->sort_order)->toBe(2);
});

test('reorder rejects an invalid category', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->withoutMiddleware(PreventRequestForgery::class)
        ->post(route('admin.galeri.reorder'), [
            'category' => 'invalid',
            'ids' => [1],
        ])->assertSessionHasErrors('category');
});

test('admin can create an image gallery entry', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->withoutMiddleware(PreventRequestForgery::class)
        ->post(route('admin.galeri.store'), [
            'category' => 'customer',
            'type' => 'image',
            'image' => '/uploads/galeri/customer.webp',
        ])->assertRedirect(route('admin.galeri.index'));

    $gallery = Gallery::query()->latest('id')->first();

    expect($gallery->type)->toBe('image')
        ->and($gallery->image)->toBe('/uploads/galeri/customer.webp')
        ->and($gallery->thumbnail)->toBeNull();
});

test('admin can create a video gallery entry', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->withoutMiddleware(PreventRequestForgery::class)
        ->post(route('admin.galeri.store'), [
            'category' => 'armada',
            'type' => 'video',
            'image' => '/uploads/galeri/armada.mp4',
            'thumbnail' => '/uploads/galeri/armada-thumb.webp',
        ])->assertRedirect(route('admin.galeri.index'));

    $gallery = Gallery::query()->latest('id')->first();

    expect($gallery->type)->toBe('video')
        ->and($gallery->image)->toBe('/uploads/galeri/armada.mp4')
        ->and($gallery->thumbnail)->toBe('/uploads/galeri/armada-thumb.webp');
});

test('admin can create a youtube entry and thumbnail is auto filled', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->withoutMiddleware(PreventRequestForgery::class)
        ->post(route('admin.galeri.store'), [
            'category' => 'customer',
            'type' => 'youtube',
            'image' => 'https://youtu.be/abc123XYZ45',
        ])->assertRedirect(route('admin.galeri.index'));

    $gallery = Gallery::query()->latest('id')->first();

    expect($gallery->type)->toBe('youtube')
        ->and($gallery->image)->toBe('https://www.youtube.com/watch?v=abc123XYZ45')
        ->and($gallery->thumbnail)->toBe('https://img.youtube.com/vi/abc123XYZ45/hqdefault.jpg');
});

test('gallery rejects an invalid type', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->withoutMiddleware(PreventRequestForgery::class)
        ->post(route('admin.galeri.store'), [
            'category' => 'customer',
            'type' => 'invalid',
            'image' => '/uploads/galeri/customer.webp',
        ])->assertSessionHasErrors('type');
});

test('youtube gallery entries require a valid url as image', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->withoutMiddleware(PreventRequestForgery::class)
        ->post(route('admin.galeri.store'), [
            'category' => 'customer',
            'type' => 'youtube',
            'image' => 'not-a-valid-url',
        ])->assertSessionHasErrors('image');
});
