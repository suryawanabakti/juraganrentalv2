<?php

use App\Models\User;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;

test('admin can upload a video file', function () {
    $user = User::factory()->create();
    $this->actingAs($user)->withoutMiddleware(PreventRequestForgery::class);

    $file = UploadedFile::fake()->create('hero.mp4', 1024, 'video/mp4');

    $response = $this->post(route('admin.media.store'), [
        'image' => $file,
    ]);

    $response->assertOk()->assertJsonStructure(['url']);

    $url = $response->json('url');
    expect($url)->toMatch('#^/uploads/[a-f0-9-]+\.mp4$#');

    $this->assertTrue(File::exists(public_path(ltrim($url, '/'))));
});

test('media upload rejects non media files', function () {
    $user = User::factory()->create();
    $this->actingAs($user)->withoutMiddleware(PreventRequestForgery::class);

    $file = UploadedFile::fake()->create('document.pdf', 1024, 'application/pdf');

    $this->post(route('admin.media.store'), [
        'image' => $file,
    ])->assertSessionHasErrors('image');
});
