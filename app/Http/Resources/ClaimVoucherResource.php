<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClaimVoucherResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'campaign_id' => $this->campaign_id,
            'reward_id' => $this->reward_id,
            'is_used' => $this->is_used,
            'claimed_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'campaign_name' => $this->campaign->name,
            'reward_title' => $this->reward->title,
        ];
    }
}
