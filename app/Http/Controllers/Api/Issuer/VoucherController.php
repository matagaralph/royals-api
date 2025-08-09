<?php

namespace App\Http\Controllers\Api\Issuer;

use App\Enums\CampaignStatus;
use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class VoucherController extends Controller {
    public function generatePointsVoucher(Request $request, Campaign $campaign) {
        if (!Auth::user()->isIssuerForCampaign($campaign->id)) {
            return response()->json(['message' => 'You are not an issuer for this campaign.'], 403);
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

        return response()->json([
            'message' => 'Points voucher generated successfully.',
            'voucher_id' => $voucher->id,
            'voucher_code' => $voucher->code,
            'points_value' => $voucher->points_value,
        ], 201);
    }

    public function getQrCode(Voucher $voucher) {
        if (!Auth::user()->isIssuerForCampaign($voucher->campaign_id)) {
            return response()->json(['message' => 'You are not an issuer for this campaign.'], 403);
        }

        $businessWhatsapp = config('services.whatsapp.business_number');
        $message = "Please scan this code: " . $voucher->code;
        $whatsappUrl = "https://wa.me/{$businessWhatsapp}?text=" . urlencode($message);

        $qrCode = QrCode::format('png')->size(300)->generate($whatsappUrl);

        return response($qrCode, 200)->header('Content-Type', 'image/png');
    }
}
