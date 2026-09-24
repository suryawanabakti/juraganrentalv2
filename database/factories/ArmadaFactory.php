<?php

namespace Database\Factories;

use App\Models\Armada;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Armada>
 */
class ArmadaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'TOYOTA HIACE COMMUTER',
            'image' => '/uploads/2026/01/Hiace-commuter.webp',
            'capacity' => '15 Seat · Full AC, TV, Karaoke',
            'price' => 'Rp 800.000',
            'sort_order' => 0,
        ];
    }
}
