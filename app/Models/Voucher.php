<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Voucher extends Model {
    use HasUlids;

    protected $fillable = [
        'campaign_id',
        'points_value',
        'code',
        'reference',
        'scanned_at',
    ];

    protected $casts = [
        'scanned_at' => 'datetime',
    ];

    public function campaign(): BelongsTo {
        return $this->belongsTo(Campaign::class);
    }
}
