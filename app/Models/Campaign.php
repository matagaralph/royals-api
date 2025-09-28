<?php

namespace App\Models;

use App\Enums\CampaignStatus;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Campaign extends Model {
    use HasUlids;

    protected $fillable = [
        'company_id',
        'name',
        'description',
        'start_date',
        'end_date',
        'min_points_per_voucher',
        'min_spend_for_point',
        'status',
    ];
    protected $casts = [
        'status' => CampaignStatus::class,
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function company(): BelongsTo {
        return $this->belongsTo(Company::class);
    }

    public function rewards(): HasMany {
        return $this->hasMany(Reward::class);
    }

    public function vouchers(): HasMany {
        return $this->hasMany(Voucher::class);
    }

    public function shopperPoints(): HasMany {
        return $this->hasMany(ShopperPoint::class);
    }
}
