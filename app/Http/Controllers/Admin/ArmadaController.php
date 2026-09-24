<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Armada;
use App\Models\ArmadaImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArmadaController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/armada/index', [
            'armadas' => Armada::query()
                ->orderBy('sort_order')
                ->withCount('images')
                ->get()
                ->map(fn (Armada $armada) => [
                    'id' => $armada->id,
                    'slug' => $armada->slug,
                    'name' => $armada->name,
                    'image' => $armada->image,
                    'capacity' => $armada->capacity,
                    'price' => $armada->price,
                    'sort_order' => $armada->sort_order,
                    'images_count' => $armada->images_count,
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/armada/form', [
            'armada' => null,
            'maxSortOrder' => Armada::query()->max('sort_order') + 1,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'image' => ['required', 'string', 'max:255'],
            'images' => ['nullable', 'array'],
            'images.*' => ['string', 'max:255'],
            'capacity' => ['required', 'string', 'max:255'],
            'price' => ['required', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $armada = Armada::query()->create([
            ...$validated,
            'sort_order' => $validated['sort_order'] ?? Armada::query()->max('sort_order') + 1,
        ]);

        $this->syncImages($armada, $validated['images'] ?? []);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Armada berhasil ditambahkan.']);

        return redirect()
            ->route('admin.armada.index');
    }

    public function edit(Armada $armada): Response
    {
        return Inertia::render('admin/armada/form', [
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
            'maxSortOrder' => null,
        ]);
    }

    public function update(Request $request, Armada $armada): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'image' => ['required', 'string', 'max:255'],
            'images' => ['nullable', 'array'],
            'images.*' => ['string', 'max:255'],
            'capacity' => ['required', 'string', 'max:255'],
            'price' => ['required', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $armada->update($validated);

        $this->syncImages($armada, $validated['images'] ?? []);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Armada berhasil diperbarui.']);

        return redirect()
            ->route('admin.armada.index');
    }

    public function reorder(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer'],
        ]);

        foreach (array_values($validated['ids']) as $index => $id) {
            Armada::query()->whereKey($id)->update(['sort_order' => $index]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Urutan armada berhasil disimpan.']);

        return redirect()
            ->route('admin.armada.index');
    }

    /**
     * Replace the armada's sub-images with the given list.
     *
     * @param  list<string>  $images
     */
    private function syncImages(Armada $armada, array $images): void
    {
        $images = array_values(array_filter(array_map('trim', $images)));

        $armada->images()->delete();

        foreach ($images as $index => $image) {
            ArmadaImage::query()->create([
                'armada_id' => $armada->id,
                'image' => $image,
                'sort_order' => $index,
            ]);
        }
    }

    public function destroy(Armada $armada): RedirectResponse
    {
        $armada->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Armada berhasil dihapus.']);

        return redirect()
            ->route('admin.armada.index');
    }
}
