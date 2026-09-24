<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Armada;
use App\Models\Gallery;
use App\Models\Section;
use App\Services\SectionDefinition;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $definitions = SectionDefinition::definitions();
        $sections = Section::query()->whereIn('slug', array_keys($definitions))->get();

        $armadaCount = Armada::query()->count();
        $galleryCount = Gallery::query()->count();
        $customerCount = Gallery::query()->where('category', 'customer')->count();
        $armadaGalleryCount = Gallery::query()->where('category', 'armada')->count();

        $stats = [
            'sections' => $sections->count(),
            'armadas' => $armadaCount,
            'galleries' => $galleryCount,
            'customer_galleries' => $customerCount,
            'armada_galleries' => $armadaGalleryCount,
        ];

        $menu = collect($definitions)
            ->map(fn ($definition, $slug) => [
                'slug' => $slug,
                'name' => $definition['name'],
                'description' => $definition['description'] ?? '',
            ])
            ->values()
            ->all();

        $recentArmadas = Armada::query()
            ->orderByDesc('updated_at')
            ->limit(5)
            ->get()
            ->map(fn (Armada $armada) => [
                'id' => $armada->id,
                'name' => $armada->name,
                'image' => $armada->image,
                'price' => $armada->price,
                'updated_at' => $armada->updated_at->diffForHumans(),
            ]);

        $recentGalleries = Gallery::query()
            ->orderByDesc('updated_at')
            ->limit(6)
            ->get()
            ->map(fn (Gallery $gallery) => [
                'id' => $gallery->id,
                'category' => $gallery->category,
                'type' => $gallery->type,
                'image' => $gallery->image,
                'thumbnail' => $gallery->thumbnail,
                'updated_at' => $gallery->updated_at->diffForHumans(),
            ]);

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'menu' => $menu,
            'recentArmadas' => $recentArmadas,
            'recentGalleries' => $recentGalleries,
        ]);
    }
}
