<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShopperCampaignResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->campaign->id,
            'name' => $this->campaign->name,
            'description' => $this->campaign->description,
            'current_points' => $this->points,
            'min_points_per_voucher' => $this->campaign->min_points_per_voucher,
            'min_spend_for_point' => $this->campaign->min_spend_for_point,
            'status' => $this->campaign->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
