<?php

use App\Models\Section;
use App\Models\User;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;

test('guests are redirected to the login page', function () {
    $this->get(route('admin.index'))->assertRedirect(route('login'));
});

test('admin can view a section edit page', function () {
    $user = User::factory()->create();
    Section::factory()->create([
        'slug' => 'hero',
        'name' => 'Hero Section',
        'data' => [
            'slides' => [
                [
                    'subtitle' => 'Solusi Perjalanan Terbaik Anda',
                    'title_line1' => 'Juragan',
                    'title_line2' => 'Rental 47',
                    'description' => 'Deskripsi',
                    'button_text' => 'Booking',
                    'button_href' => '#armada',
                    'image' => '/uploads/1.webp',
                    'video' => '',
                ],
            ],
        ],
    ]);

    $this->actingAs($user)
        ->get(route('admin.sections.edit', 'hero'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/section-edit')
            ->has('fields')
            ->where('section.data.slides.0.title_line1', 'Juragan')
            ->where('section.data.slides.0.subtitle', 'Solusi Perjalanan Terbaik Anda')
        );
});

test('admin can update hero slides and unknown payload keys are discarded', function () {
    $user = User::factory()->create();
    $this->actingAs($user)
        ->withoutMiddleware(PreventRequestForgery::class);

    $this->put(route('admin.sections.update', 'hero'), [
        'slides' => [
            [
                'subtitle' => '  Solusi Perjalanan Terbaik Anda  ',
                'title_line1' => '  Juragan  ',
                'title_line2' => 'Rental 47',
                'description' => 'Deskripsi',
                'button_text' => 'Booking',
                'button_href' => '#armada',
                'image' => '/uploads/1.webp',
                'video' => '/uploads/hero.mp4',
            ],
        ],
        'title_line1' => 'ignored',
        'carousel' => ['/uploads/ignored.webp'],
        'video' => '/uploads/ignored.mp4',
    ])->assertRedirect(route('admin.sections.edit', 'hero'));

    $section = Section::query()->where('slug', 'hero')->firstOrFail();

    expect($section->data['slides'])->toBe([
        [
            'subtitle' => 'Solusi Perjalanan Terbaik Anda',
            'title_line1' => 'Juragan',
            'title_line2' => 'Rental 47',
            'description' => 'Deskripsi',
            'button_text' => 'Booking',
            'button_href' => '#armada',
            'image' => '/uploads/1.webp',
            'video' => '/uploads/hero.mp4',
        ],
    ])->and($section->data)->not->toHaveKeys(['title_line1', 'carousel', 'video']);
});

test('legacy hero content is migrated into slides when editing', function () {
    $user = User::factory()->create();
    Section::factory()->create([
        'slug' => 'hero',
        'name' => 'Hero Section',
        'data' => [
            'subtitle' => 'Solusi Perjalanan Terbaik Anda',
            'title_line1' => 'Juragan',
            'title_line2' => 'Rental 47',
            'description' => 'Deskripsi',
            'button_text' => 'Selengkapnya',
            'button_href' => '#profil',
            'video' => '/storage/video.mp4',
            'background_image' => '/storage/uploads/2026/02/img-pilar.jpg',
            'carousel' => ['/uploads/1.webp', '/uploads/2.webp'],
        ],
    ]);

    $this->actingAs($user)
        ->get(route('admin.sections.edit', 'hero'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('section.data.slides', 3)
            ->where('section.data.slides.0.video', '/storage/video.mp4')
            ->where('section.data.slides.0.title_line1', 'Juragan')
            ->where('section.data.slides.1.image', '/uploads/1.webp')
            ->where('section.data.slides.2.image', '/uploads/2.webp')
        );
});

test('admin can store and delete an armada', function () {
    $user = User::factory()->create();
    $this->actingAs($user)
        ->withoutMiddleware(PreventRequestForgery::class);

    $this->post(route('admin.armada.store'), [
        'name' => 'TOYOTA ALPHARD',
        'image' => '/uploads/1.webp',
        'capacity' => '7 Seat',
        'price' => 'Rp 2.000.000',
    ])->assertRedirect(route('admin.armada.index'));

    $this->assertDatabaseHas('armadas', ['name' => 'TOYOTA ALPHARD']);

    $this->delete(route('admin.armada.destroy', 1))
        ->assertRedirect(route('admin.armada.index'));

    $this->assertDatabaseMissing('armadas', ['name' => 'TOYOTA ALPHARD']);
});
