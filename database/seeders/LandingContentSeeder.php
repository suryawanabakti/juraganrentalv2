<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class LandingContentSeeder extends Seeder
{
    /**
     * Seed the landing page content.
     *
     * Content is sourced from assets on the public disk via AssetSeeder,
     * ensuring every referenced image/video actually exists locally.
     */
    public function run(): void
    {
        $this->call(AssetSeeder::class);
    }
}
