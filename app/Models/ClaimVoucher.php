<?php

namespace App\Models;

use App\Enums\ClaimVoucherStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClaimVoucher extends Model {
    use HasFactory;

    protected $fillable = [
        'user_id',
        'reward_id',
        'code',
        'status',
    ];

    protected $casts = [
        'status' => ClaimVoucherStatus::class,
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function reward(): BelongsTo {
        return $this->belongsTo(Reward::class);
    }
}
