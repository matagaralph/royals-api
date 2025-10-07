<?php

namespace App\Http\Controllers\Customer;

use App\Models\User;
use App\Models\Reward;
use App\Models\Voucher;
use Illuminate\Support\Str;
use App\Models\ClaimVoucher;
use App\Models\ShopperPoint;
use Illuminate\Http\Request;
use App\Enums\CampaignStatus;
use App\Enums\ClaimVoucherStatus;
use App\Http\Controllers\Controller;

class BotController extends Controller {
    public function register(Request $request) {
        $request->validate([
            'phone' => ['required', 'string', 'size:13'],
            'name' => ['required', 'string']
        ]);
        $user = User::where('phone', $request->phone)->first();
        if ($user) return response()->json(['status' => 0, 'message' => 'Phone Number is already used, please try a different one.']);

        $newUser = User::create([
            'phone' => $request->phone,
            'name' => $request->name ?? null,
            'password' => bcrypt($request->password ?? '0000'),
            'company_id' => null,
        ]);
        return response()->json(['status' => 1, 'message' => 'Registration successful.', 'data' => $newUser]);
    }

    public function addPoints(Request $request) {
        $request->validate([
            'voucher_code' => ['required', 'string', 'size:12'],
            'phone' => ['required', 'string', 'size:13'],
        ]);
        $user = User::where('phone', $request->phone)->first();
        if (!$user) return response()->json(['status' => -3, 'message' => 'Invalid phone number provided.']);

        $voucher = Voucher::where('code', $request->voucher_code)->firstOrFail();
        if ($voucher->scanned_at !== null) return response()->json(['status' => 0, 'message' => 'This voucher has already been scanned.'], 400);

        if ($voucher->campaign->status !== CampaignStatus::Active) {
            return response()->json(['status' => -4, 'message' => 'Cannot scan voucher for an inactive or expired campaign.'], 400);
        }

        $shopperPoint = ShopperPoint::firstOrCreate(
            ['user_id' => $user->id, 'campaign_id' => $voucher->campaign_id],
            ['points' => 0]
        );

        $shopperPoint->increment('points', $voucher->points_value);
        $voucher->update(['scanned_at' => now()]);

        return response()->json([
            'status' => 1,
            'message' => 'Points voucher scanned successfully!',
            'points_added' => $voucher->points_value,
            'current_campaign_points' => $shopperPoint->points,
            'campaign_name' => $voucher->campaign->name,
            'voucher_id' => $voucher->id,
        ]);
    }

    public function issueClaimVoucher(Request $request) {

        $request->validate([
            'reward_id' => ['required', "exists:rewards,id"],
            'phone' => ['required', 'string', 'size:13'],
        ]);

        $user = User::where('phone', $request->phone)->first();
        if (!$user) return response()->json(['status' => -3, 'message' => 'Invalid phone number provided.']);

        $reward = Reward::with('campaign')->findOrFail($request->reward_id);


        $shopperPoint = ShopperPoint::where('user_id', $user->id)
            ->where('campaign_id', $reward->campaign_id)
            ->first();

        if (!$shopperPoint || $shopperPoint->points < $reward->points_required) {
            return response()->json(['message' => 'Insufficient points to claim this reward.'], 400);
        }

        if ($reward->campaign->status !== CampaignStatus::Active) {
            return response()->json(['message' => 'Cannot claim reward from an inactive or expired campaign.'], 400);
        }

        $shopperPoint->decrement('points', $reward->points_required);

        do {
            $claimCode = Str::upper(Str::random(12));
        } while (ClaimVoucher::where('code', $claimCode)->exists());

        $claimVoucher = ClaimVoucher::create([
            'user_id' => $user->id,
            'reward_id' => $reward->id,
            'code' => $claimCode,
            'status' => ClaimVoucherStatus::Pending,
        ]);

        return response()->json([
            'message' => 'Present this claim code to the issuer ' . $claimCode,
            'claim_voucher_code' => $claimCode,
            'claim_voucher_id' => $claimVoucher->id,
            'reward' => $reward,
            'remaining_points' => $shopperPoint->points,
        ], 201);
    }

    public function myAccount(Request $request) {

        $request->validate([
            'phone' => ['required', 'string', 'size:13'],
        ]);

        $user = User::where('phone', $request->phone)->first();
        if (!$user) return response()->json(['status' => -3, 'message' => 'Invalid phone number provided.']);

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
