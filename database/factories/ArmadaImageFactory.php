<?php

namespace Database\Factories;

use App\Models\Armada;
use App\Models\ArmadaImage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ArmadaImage>
 */
class ArmadaImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'armada_id' => Armada::factory(),
            'image' => '/storage/uploads/2026/02/WhatsApp-Image-2026-02-16-at-10.05.20-2.webp',
            'sort_order' => 0,
        ];
    }
}
