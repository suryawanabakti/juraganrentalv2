<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $galleries = Gallery::query()
            ->orderBy('category')
            ->orderBy('sort_order')
            ->get();

        $counts = [
            'customer' => $galleries->where('category', 'customer')->count(),
            'armada' => $galleries->where('category', 'armada')->count(),
        ];

        return Inertia::render('admin/galeri/index', [
            'galleries' => $galleries
                ->map(fn (Gallery $gallery) => [
                    'id' => $gallery->id,
                    'category' => $gallery->category,
                    'type' => $gallery->type,
                    'image' => $gallery->image,
                    'thumbnail' => $gallery->thumbnail,
                    'sort_order' => $gallery->sort_order,
                ]),
            'counts' => $counts,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/galeri/form', [
            'gallery' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        Gallery::query()->create([
            ...$data,
            'sort_order' => $data['sort_order'] ?? Gallery::query()->max('sort_order') + 1,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Konten galeri berhasil ditambahkan.']);

        return redirect()
            ->route('admin.galeri.index');
    }

    public function edit(Gallery $gallery): Response
    {
        return Inertia::render('admin/galeri/form', [
            'gallery' => [
                'id' => $gallery->id,
                'category' => $gallery->category,
                'type' => $gallery->type,
                'image' => $gallery->image,
                'thumbnail' => $gallery->thumbnail,
                'sort_order' => $gallery->sort_order,
            ],
        ]);
    }

    public function update(Request $request, Gallery $gallery): RedirectResponse
    {
        $gallery->update($this->validated($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Konten galeri berhasil diperbarui.']);

        return redirect()
            ->route('admin.galeri.index');
    }

    public function destroy(Gallery $gallery): RedirectResponse
    {
        $gallery->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Konten galeri berhasil dihapus.']);

        return redirect()
            ->route('admin.galeri.index');
    }

    public function reorder(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category' => ['required', 'string', 'in:customer,armada'],
            'ids' => ['required', 'array'],
            'ids.*' => ['integer'],
        ]);

        foreach (array_values($validated['ids']) as $index => $id) {
            Gallery::query()->whereKey($id)->update(['sort_order' => $index]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Urutan galeri berhasil disimpan.']);

        return redirect()
            ->route('admin.galeri.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        $data = $request->validate([
            'category' => ['required', 'string', 'in:customer,armada'],
            'type' => ['required', 'string', 'in:image,video,youtube'],
            'image' => [
                'required',
                'string',
                'max:255',
                Rule::when($request->input('type') === 'youtube', ['url']),
            ],
            'thumbnail' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        if ($data['type'] === 'youtube') {
            $data['image'] = $this->normalizeYoutubeUrl($data['image']);

            if (empty($data['thumbnail'])) {
                $videoId = $this->youtubeVideoId($data['image']);

                if ($videoId !== null) {
                    $data['thumbnail'] = "https://img.youtube.com/vi/{$videoId}/hqdefault.jpg";
                }
            }
        }

        return $data;
    }

    private function normalizeYoutubeUrl(string $url): string
    {
        $videoId = $this->youtubeVideoId($url);

        if ($videoId !== null && $this->isYoutubeUrl($url)) {
            return "https://www.youtube.com/watch?v={$videoId}";
        }

        return $url;
    }

    private function isYoutubeUrl(string $url): bool
    {
        return preg_match('/youtube\.com|youtu\.be/', $url) === 1;
    }

    private function youtubeVideoId(string $url): ?string
    {
        if (preg_match('/(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/', $url, $matches) === 1) {
            return $matches[1];
        }

        return null;
    }
}
