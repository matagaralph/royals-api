<?php

namespace App\Http\Controllers\Customer;

use App\Models\Reward;
use Illuminate\Http\Request;
use App\Enums\CampaignStatus;
use App\Http\Controllers\Controller;

class ShopperController extends Controller {
    public function myAccount() {
        $user = auth()->user();
        $shopperPoints = $user->shopperPoints()->with('campaign')->get();

        $totalPoints = $shopperPoints->sum('points');
        $campaigns = [];
        $claimableRewards = [];

        foreach ($shopperPoints as $shopperPoint) {
            $campaign = $shopperPoint->campaign;

            if ($campaign->status === CampaignStatus::Active) {
                $campaigns[] = [
                    'name' => $campaign->name,
                    'end_date' => $campaign->end_date,
                    'status' => $campaign->status,
                ];

                $rewards = Reward::where('campaign_id', $campaign->id)
                    ->where('points_required', '<=', $shopperPoint->points)
                    ->get();

                foreach ($rewards as $reward) {
                    $claimableRewards[] = [
                        'campaign_name' => $campaign->name,
                        'reward_title' => $reward->title,
                        'points_required' => $reward->points_required,
                        'reward_id' => $reward->id,
                        'your_points' => $shopperPoint->points,
                    ];
                }
            }
        }

        return response()->json([
            'total_points' => $totalPoints,
            'campaigns' => $campaigns,
            'claimable_rewards' => $claimableRewards,
        ]);
    }
}
