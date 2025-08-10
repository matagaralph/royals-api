<?php

namespace App\Http\Controllers\Api;

use App\Enums\CampaignStatus;
use App\Enums\ClaimVoucherStatus;
use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\ClaimVoucher;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class VoucherController extends Controller {

    public function generatePointsVoucher(Request $request, Campaign $campaign) {
        $user = auth()->user();

        if (!$user->isOwner() && !$user->isIssuerForCampaign($campaign->id)) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }
        if ($campaign->status !== CampaignStatus::Active) {
            return response()->json(['message' => 'Cannot generate voucher for an inactive or expired campaign.'], 400);
        }

        $request->validate([
            'shopper_paid_amount' => ['required', 'numeric', 'min:0.01'],
            'reference' => ['nullable', 'string', 'unique:vouchers,reference'],
        ]);

        $points = floor($request->shopper_paid_amount / $campaign->min_spend_for_point) * $campaign->min_points_per_voucher;
        if ($points === 0) {
            return response()->json(['message' => 'Amount too low to generate points.'], 400);
        }

        do {
            $code = Str::upper(Str::random(12));
        } while (Voucher::where('code', $code)->exists());

        $voucher = $campaign->vouchers()->create([
            'points_value' => $points,
            'code' => $code,
            'reference' => $request->reference,
        ]);

        $businessWhatsapp = config('services.whatsapp.business_number');
        $whatsappUrl = "https://wa.me/{$businessWhatsapp}?text=" . $voucher->code;

        $qrCode = QrCode::format('png')->size(300)->color(0, 0, 0)->generate($whatsappUrl);
        $base64QrCode = 'data:image/png;base64,' . base64_encode($qrCode);

        return response()->json([
            'message' => 'Points voucher generated successfully.',
            'voucher_id' => $voucher->id,
            'voucher_code' => $voucher->code,
            'points_value' => $voucher->points_value,
            'qr_code_image' => $base64QrCode,
        ], 201);
    }

    public function issueClaimVoucher(Request $request) {
        $request->validate([
            'voucher_code' => ['required', 'string', 'exists:claim_vouchers,code'],
        ]);

        $claimVoucher = ClaimVoucher::with('reward.campaign')->where('code', $request->voucher_code)->first();

        if ($claimVoucher->is_used) {
            return response()->json(['message' => 'This reward voucher has already been issued.'], 400);
        }

        $user = auth()->user();
        $campaign = $claimVoucher->reward->campaign;

        if (!$user->isOwner() && !$user->isIssuerForCampaign($campaign->id)) {
            return response()->json(['message' => 'You are not authorized to issue vouchers for this campaign.'], 403);
        }

        $claimVoucher->is_used = true;
        $claimVoucher->status = ClaimVoucherStatus::Issued;
        $claimVoucher->save();

        return response()->json([
            'message' => 'Reward voucher issued successfully.',
            'claimed_voucher_code' => $claimVoucher->code,
        ]);
    }

    public function verifyClaimVoucher(Request $request) {
        $request->validate([
            'voucher_code' => ['required', 'string', 'exists:claim_vouchers,code'],
        ]);

        $claimVoucher = ClaimVoucher::with('reward.campaign')->where('code', $request->voucher_code)->first();

        if ($claimVoucher->is_used) {
            return response()->json(['message' => 'This reward voucher has already been claimed.'], 400);
        }

        $user = auth()->user();
        $campaign = $claimVoucher->reward->campaign;

        if (!$user->isOwner() && !$user->isIssuerForCampaign($campaign->id)) {
            return response()->json(['message' => 'You are not authorized to verify vouchers for this campaign.'], 403);
        }

        return response()->json([
            'message' => 'Reward voucher verified successfully.',
            'claimed_voucher' => $claimVoucher,
        ]);
    }
}
