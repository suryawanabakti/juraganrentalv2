<?php

namespace App\Http\Controllers;

use App\Models\Armada;
use App\Services\LandingContent;
use Inertia\Inertia;
use Inertia\Response;

class ArmadaController extends Controller
{
    public function __construct(private readonly LandingContent $landing) {}

    public function show(Armada $armada): Response
    {
        $content = $this->landing->build('welcome');

        return Inertia::render('armada/show', [
            'title' => "{$armada->name} | Juragan Rental",
            'site' => $content['site'],
            'kontak' => $content['kontak'],
            'canonical' => $content['canonical'],
            'armada' => [
                'id' => $armada->id,
                'slug' => $armada->slug,
                'name' => $armada->name,
                'image' => $armada->image,
                'capacity' => $armada->capacity,
                'price' => $armada->price,
                'sort_order' => $armada->sort_order,
                'images' => $armada->images->pluck('image')->values()->all(),
            ],
        ]);
    }
}
