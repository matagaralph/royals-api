<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model {
    use HasUlids;

    public function invitations(): Company|HasMany {
        return $this->hasMany(CollaboratorInvitation::class);
    }

    protected $fillable = ['owner_id', 'name', 'logo'];

    public function owner(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function users(): HasMany {
        return $this->hasMany(User::class);
    }

    public function campaigns(): HasMany {
        return $this->hasMany(Campaign::class);
    }
}
