<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model {
    use HasFactory;

    protected $fillable = ['user_id', 'name'];

    public function owner(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function campaigns(): HasMany {
        return $this->hasMany(Campaign::class);
    }
}
