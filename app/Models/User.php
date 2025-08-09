<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserRole;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable {
    /** @use HasFactory<UserFactory> */
    use HasFactory, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'phone',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
        ];
    }

    public function isOwner(): bool {
        return $this->role === UserRole::Owner;
    }

    public function isIssuer(): bool {
        return $this->role === UserRole::Issuer;
    }

    public function isShopper(): bool {
        return $this->role === UserRole::Shopper;
    }

    public function company(): HasOne {
        return $this->hasOne(Company::class);
    }

    public function issuerForCampaigns(): BelongsToMany {
        return $this->belongsToMany(Campaign::class, 'campaign_issuer', 'user_id', 'campaign_id');
    }

    public function isIssuerForCampaign(int $campaignId): bool {
        return $this->issuerForCampaigns()->where('campaign_id', $campaignId)->exists();
    }

    public function shopperPoints(): HasMany {
        return $this->hasMany(ShopperPoint::class);
    }

    public function claimVouchers(): HasMany {
        return $this->hasMany(ClaimVoucher::class);
    }
}
