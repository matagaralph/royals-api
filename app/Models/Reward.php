<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reward extends Model {
    use HasUlids;

    protected $fillable = [
        'campaign_id',
        'title',
        'description',
        'points_required',
    ];

    public function campaign(): BelongsTo {
        return $this->belongsTo(Campaign::class);
    }

    public function claimVouchers(): HasMany {
        return $this->hasMany(ClaimVoucher::class);
    }
}
