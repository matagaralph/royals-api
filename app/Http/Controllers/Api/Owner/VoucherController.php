<?php

namespace App\Http\Controllers\Api\Owner;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use Illuminate\Support\Facades\Auth;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class VoucherController extends Controller {
    public function getQrCode(Voucher $voucher) {
        if ($voucher->campaign->company->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorised'], 403);
        }

        $businessWhatsapp = config('services.whatsapp.business_number');
        $message = "Please scan this code: " . $voucher->code;
        $whatsappUrl = "https://wa.me/{$businessWhatsapp}?text=" . urlencode($message);

        $qrCode = QrCode::format('png')->size(300)->generate($whatsappUrl);

        return response($qrCode, 200)->header('Content-Type', 'image/png');
    }
}
