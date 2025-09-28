<?php

namespace App\Models;

use App\Enums\ClaimVoucherStatus;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClaimVoucher extends Model {
    use HasUlids;

    protected $fillable = [
        'user_id',
        'reward_id',
        'code',
        'status',
        'is_used'
    ];

    protected $casts = [
        'status' => ClaimVoucherStatus::class,
        'is_used' => 'boolean'
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function reward(): BelongsTo {
        return $this->belongsTo(Reward::class);
    }

}
