<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Section;
use App\Services\SectionDefinition;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SectionController extends Controller
{
    public function edit(string $slug): Response|RedirectResponse
    {
        $definition = SectionDefinition::definition($slug);

        if ($definition === null || ! in_array($slug, SectionDefinition::collectKeys(), true)) {
            return redirect()
                ->route('admin.index')
                ->with('error', 'Section tidak ditemukan.');
        }

        $section = Section::query()->firstOrCreate(['slug' => $slug], [
            'name' => $definition['name'],
            'data' => $this->defaults($definition),
        ]);

        $data = array_merge($this->defaults($definition), $section->data ?? []);

        if ($slug === 'hero' && empty($data['slides'])) {
            $data['slides'] = $this->legacyHeroSlides($data);
        }

        return Inertia::render('admin/section-edit', [
            'section' => [
                'slug' => $section->slug,
                'name' => $section->name,
                'data' => $data,
            ],
            'fields' => $definition['fields'],
            'description' => $definition['description'] ?? '',
        ]);
    }

    public function update(Request $request, string $slug): RedirectResponse
    {
        $definition = SectionDefinition::definition($slug);

        if ($definition === null) {
            return redirect()
                ->route('admin.index')
                ->with('error', 'Section tidak ditemukan.');
        }

        $data = $this->normalize($request->all(), $definition);

        $section = Section::query()->firstOrCreate(['slug' => $slug], [
            'name' => $definition['name'],
        ]);
        $section->update(['data' => $data]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Perubahan berhasil disimpan.']);

        return redirect()
            ->route('admin.sections.edit', $slug);
    }

    /**
     * @param  array<string, mixed>  $definition
     * @return array<string, mixed>
     */
    private function defaults(array $definition): array
    {
        $defaults = [];

        foreach ($definition['fields'] as $field) {
            if ($field['type'] === 'list' || $field['type'] === 'image-list' || $field['type'] === 'repeater') {
                $defaults[$field['key']] = [];
            } else {
                $defaults[$field['key']] = '';
            }
        }

        return $defaults;
    }

    /**
     * Convert the legacy single-text hero fields into one slide per media item
     * so existing content stays editable after the hero switched to slides.
     *
     * @param  array<string, mixed>  $data
     * @return list<array<string, string>>
     */
    private function legacyHeroSlides(array $data): array
    {
        $text = [
            'subtitle' => (string) ($data['subtitle'] ?? ''),
            'title_line1' => (string) ($data['title_line1'] ?? ''),
            'title_line2' => (string) ($data['title_line2'] ?? ''),
            'description' => (string) ($data['description'] ?? ''),
            'button_text' => (string) ($data['button_text'] ?? ''),
            'button_href' => (string) ($data['button_href'] ?? ''),
            'image' => '',
            'video' => '',
        ];

        $slides = [];

        if (! empty($data['video'])) {
            $slides[] = array_merge($text, ['video' => (string) $data['video']]);
        }

        $images = is_array($data['carousel'] ?? null) ? $data['carousel'] : [];
        if ($images === [] && ! empty($data['background_image'])) {
            $images = [(string) $data['background_image']];
        }

        foreach (array_values(array_filter($images)) as $image) {
            $slides[] = array_merge($text, ['image' => (string) $image]);
        }

        if ($slides === []) {
            $slides[] = array_merge($text, ['image' => (string) ($data['background_image'] ?? '')]);
        }

        return $slides;
    }

    /**
     * @param  array<string, mixed>  $definition
     * @return array<string, mixed>
     */
    private function normalize(array $payload, array $definition): array
    {
        $data = [];

        foreach ($definition['fields'] as $field) {
            $key = $field['key'];
            $value = $payload[$key] ?? null;

            if ($field['type'] === 'list' || $field['type'] === 'image-list') {
                $data[$key] = is_array($value) ? array_values(array_filter(array_map('trim', $value))) : [];
            } elseif ($field['type'] === 'repeater') {
                $data[$key] = $this->normalizeRepeater($value, $field['fields']);
            } else {
                $data[$key] = is_string($value) ? trim($value) : '';
            }
        }

        return $data;
    }

    /**
     * @param  array<string, mixed>|null  $items
     * @param  array<int, array<string, mixed>>  $fields
     * @return list<array<string, mixed>>
     */
    private function normalizeRepeater(?array $items, array $fields): array
    {
        if (! is_array($items)) {
            return [];
        }

        $result = [];

        foreach ($items as $item) {
            if (! is_array($item)) {
                continue;
            }

            $row = [];
            foreach ($fields as $field) {
                $value = $item[$field['key']] ?? '';
                $row[$field['key']] = $field['type'] === 'textarea' ? (string) $value : trim((string) $value);
            }
            $result[] = $row;
        }

        return $result;
    }
}
