<?php

namespace Database\Factories;

use App\Models\Gallery;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Gallery>
 */
class GalleryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category' => 'customer',
            'type' => 'image',
            'image' => '/uploads/2026/02/WhatsApp-Image-2026-02-16-at-10.05.20-2.webp',
            'thumbnail' => null,
            'sort_order' => 0,
        ];
    }
}
