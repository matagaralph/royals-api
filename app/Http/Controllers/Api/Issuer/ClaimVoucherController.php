<?php

namespace App\Http\Controllers\Api\Issuer;

use App\Enums\ClaimVoucherStatus;
use App\Http\Controllers\Controller;
use App\Models\ClaimVoucher;
use Illuminate\Http\Request;

class ClaimVoucherController extends Controller {
    public function verifyClaimCode(Request $request) {
        $request->validate([
            'claim_code' => ['required', 'string'],
        ]);

        $claimVoucher = ClaimVoucher::where('code', $request->claim_code)->with('reward.campaign.company')->firstOrFail();

        $user = auth()->user();
        $company = $user->isOwner() ? $user->company()->first() : null;

        if ($user->isOwner() && $claimVoucher->reward->campaign->company_id !== $company->id) {
            return response()->json(['message' => 'Unauthorized. This claim is not for your company.'], 403);
        }

        if ($user->isIssuer() && !$user->isIssuerForCampaign($claimVoucher->reward->campaign_id)) {
            return response()->json(['message' => 'Unauthorized. You are not an issuer for this campaign.'], 403);
        }

        return response()->json(['message' => 'Claim code is valid.', 'claim_voucher' => $claimVoucher]);
    }

    public function issueClaimVoucher(ClaimVoucher $claimVoucher) {
        $user = auth()->user();
        $company = $user->isOwner() ? $user->company()->first() : null;

        if ($user->isOwner() && $claimVoucher->reward->campaign->company_id !== $company->id) {
            return response()->json(['message' => 'This claim is not for your company.'], 403);
        }

        if ($user->isIssuer() && !$user->isIssuerForCampaign($claimVoucher->reward->campaign_id)) {
            return response()->json(['message' => 'You are not an issuer for this campaign.'], 403);
        }

        if ($claimVoucher->status === ClaimVoucherStatus::Issued) {
            return response()->json(['message' => 'This claim has already been issued.'], 400);
        }

        $claimVoucher->update(['status' => ClaimVoucherStatus::Issued]);

        return response()->json([
            'message' => 'Claim voucher issued successfully.',
            'claim_voucher' => $claimVoucher,
        ]);
    }
}
