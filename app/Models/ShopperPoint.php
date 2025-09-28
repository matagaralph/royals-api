<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShopperPoint extends Model {
    use HasUlids;

    protected $fillable = ['user_id', 'campaign_id', 'points'];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function campaign(): BelongsTo {
        return $this->belongsTo(Campaign::class);
    }
}
