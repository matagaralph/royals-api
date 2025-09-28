<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CollaboratorInvitation extends Model {
    use HasUlids;

    protected $fillable = ['company_id', 'email', 'token', 'accepted_at'];

    public function company(): BelongsTo {
        return $this->belongsTo(Company::class);
    }

    public function markAsAccepted(): void {
        $this->accepted_at = now();
        $this->save();
    }

    protected $casts = [
        'accepted_at' => 'date',
    ];
}
