<?php

namespace App\Models;

use Database\Factories\ArmadaImageFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $armada_id
 * @property string $image
 * @property int $sort_order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['armada_id', 'image', 'sort_order'])]
class ArmadaImage extends Model
{
    /** @use HasFactory<ArmadaImageFactory> */
    use HasFactory;

    /**
     * @return BelongsTo<Armada, $this>
     */
    public function armada(): BelongsTo
    {
        return $this->belongsTo(Armada::class);
    }
}
