<?php

namespace App\Models;

use Database\Factories\ArmadaFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $slug
 * @property string $name
 * @property string $image
 * @property string $capacity
 * @property string $price
 * @property int $sort_order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['slug', 'name', 'image', 'capacity', 'price', 'sort_order'])]
class Armada extends Model
{
    /** @use HasFactory<ArmadaFactory> */
    use HasFactory;

    protected static function booted(): void
    {
        static::creating(function (Armada $armada) {
            $armada->slug = self::uniqueSlug($armada->slug ?: $armada->name);
        });

        static::updating(function (Armada $armada) {
            if ($armada->isDirty('slug')) {
                $armada->slug = self::uniqueSlug($armada->slug, $armada->getKey());
            } elseif ($armada->isDirty('name') || blank($armada->slug)) {
                $armada->slug = self::uniqueSlug($armada->name, $armada->getKey());
            }
        });
    }

    private static function uniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name) ?: 'armada';
        $slug = $base;
        $counter = 2;

        while (self::query()
            ->where('slug', $slug)
            ->when($ignoreId !== null, fn ($query) => $query->whereKeyNot($ignoreId))
            ->exists()) {
            $slug = $base.'-'.$counter;
            $counter++;
        }

        return $slug;
    }

    /**
     * @return HasMany<ArmadaImage, $this>
     */
    public function images(): HasMany
    {
        return $this->hasMany(ArmadaImage::class)->orderBy('sort_order');
    }
}
