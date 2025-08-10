<?php

namespace App\Http\Controllers\Api\Shopper;

use App\Enums\CampaignStatus;
use App\Enums\ClaimVoucherStatus;
use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\ClaimVoucher;
use App\Models\Reward;
use App\Models\ShopperPoint;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class ShopperController extends Controller {
    public function myPointsSummary() {
        $shopperPoints = Auth::user()->shopperPoints()->with('campaign')->get();

        $claimableRewards = [];
        foreach ($shopperPoints as $shopperPoint) {
            if ($shopperPoint->campaign->status === CampaignStatus::Active) {
                $rewards = Reward::where('campaign_id', $shopperPoint->campaign_id)
                    ->where('points_required', '<=', $shopperPoint->points)
                    ->get();
                foreach ($rewards as $reward) {
                    $claimableRewards[] = [
                        'campaign' => $shopperPoint->campaign->name,
                        'reward' => $reward->title,
                        'points_required' => $reward->points_required,
                        'your_points' => $shopperPoint->points,
                        'reward_id' => $reward->id,
                    ];
                }
            }
        }
        return response()->json([
            'current_points_by_campaign' => $shopperPoints,
            'claimable_rewards' => $claimableRewards,
        ]);
    }

    public function scanPointsVoucher(Request $request) {
        $request->validate([
            'voucher_code' => ['required', 'string', 'size:12'],
        ]);

        $voucher = Voucher::where('code', $request->voucher_code)->firstOrFail();

        if ($voucher->scanned_at !== null) {
            return response()->json(['message' => 'This voucher has already been scanned.'], 400);
        }

        if ($voucher->campaign->status !== CampaignStatus::Active) {
            return response()->json(['message' => 'Cannot scan voucher for an inactive or expired campaign.'], 400);
        }

        $shopperPoint = ShopperPoint::firstOrCreate(
            ['user_id' => Auth::id(), 'campaign_id' => $voucher->campaign_id],
            ['points' => 0]
        );

        $shopperPoint->increment('points', $voucher->points_value);
        $voucher->update(['scanned_at' => now()]);

        return response()->json([
            'message' => 'Points voucher scanned successfully!',
            'points_added' => $voucher->points_value,
            'current_campaign_points' => $shopperPoint->points,
            'campaign_name' => $voucher->campaign->name,
            'voucher_id' => $voucher->id,
        ]);
    }

    public function claimReward(Request $request) {
        $request->validate([
            'reward_id' => ['required', 'integer'],
        ]);

        $reward = Reward::with('campaign')->findOrFail($request->reward_id);
        $user = Auth::user();
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
            $claimCode = Str::upper(Str::random(10));
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
            'reward_details' => $reward,
            'remaining_points' => $shopperPoint->points,
        ], 201);
    }

    public function myClaimVouchers() {
        $claimVouchers = Auth::user()->claimVouchers()->with('reward.campaign.company')->get();
        return response()->json($claimVouchers);
    }

    public function getClaimVoucherQrCode(ClaimVoucher $claimVoucher) {
        if ($claimVoucher->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized to view QR code for this claim voucher.'], 403);
        }

        $qrCode = QrCode::format('png')->size(300)->generate($claimVoucher->code);

        return response($qrCode, 200)->header('Content-Type', 'image/png');
    }

    public function listActiveCampaigns() {
        $activeCampaigns = Campaign::with('company')
            ->where('status', CampaignStatus::Active)
            ->get(['id', 'company_id', 'name', 'description', 'min_points_per_voucher', 'min_spend_for_point']);

        return response()->json($activeCampaigns);
    }
}
