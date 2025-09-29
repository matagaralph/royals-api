<?php

namespace App\Http\Controllers\Customer;

use Inertia\Inertia;
use App\Models\Voucher;
use App\Models\Campaign;
use tbQuar\Facades\Quar;
use Illuminate\Support\Str;
use App\Models\ClaimVoucher;
use Illuminate\Http\Request;
use App\Enums\ClaimVoucherStatus;
use App\Http\Controllers\Controller;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class VoucherController extends Controller {

    public function index() {
        return Inertia::render('admin/vouchers');
    }

    public function generatePointsVoucher(Request $request, Campaign $campaign) {
        $request->validate([
            'shopper_paid_amount' => ['required', 'numeric', 'min:0.01'],
            'reference' => ['nullable', 'string', 'unique:vouchers,reference'],
        ]);

        $points = intval(floor($request->shopper_paid_amount / $campaign->min_spend_for_point) * $campaign->min_points_per_voucher);

        if ($points <= 0) {
            return response()->json(['message' => 'Amount too low to generate points.'], 422);
        }

        do {
            $code = Str::upper(Str::random(12));
        } while (Voucher::where('code', $code)->exists());

        $voucher = $campaign->vouchers()->create([
            'points_value' => $points,
            'code' => $code,
            'reference' => $request->reference ? "{$request->reference}" : null,
        ]);

        $businessWhatsapp = config('services.whatsapp.business_number');
        $whatsappUrl = "https://wa.me/{$businessWhatsapp}?text=" . $voucher->voucher_code;

        $qrCode = QrCode::size(300)
            ->format('png')
            ->generate($whatsappUrl);
        $qrCodeBase64 = 'data:image/png;base64,' . base64_encode($qrCode);


        return response()->json([
            'message' => "Successfully generated voucher.",
            'voucher_id' => $voucher->id,
            'voucher_code' => $voucher->code,
            'points_value' => $voucher->points_value,
            'qr_code' => $qrCodeBase64,
        ]);
    }

    // public function qrCode(Voucher $voucher) {

    //     return response($qrCode, 200)
    //         ->header('Content-Type', 'image/png');
    // }
    public function issueClaimVoucher(Request $request) {
        $request->validate([
            'voucher_code' => ['required', 'string', 'exists:claim_vouchers,code'],
        ]);

        $claimVoucher = ClaimVoucher::with('reward.campaign')->where('code', $request->voucher_code)->first();

        if ($claimVoucher->is_used) {
            return response()->json(['message' => 'This reward voucher has already been issued.'], 400);
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

        $claimVoucher->reward->campaign;

        return response()->json([
            'message' => 'Reward voucher verified successfully.',
            'claimed_voucher' => $claimVoucher,
        ]);
    }
}
