<?php

namespace App\Http\Controllers\Api\Owner;

use App\Enums\CampaignStatus;
use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\User;
use Illuminate\Http\Request;

class CampaignController extends Controller {

    public function index() {

        $user = auth()->user();

        if ($user->isOwner()) {
            $company = $user->company()->firstOrFail();
            $campaigns = $company->campaigns()->orderBy('created_at')->get();
        } elseif ($user->isIssuer()) {
            $campaigns = $user->issuerForCampaigns()->with(['company'])->get();
        } else {
            return response()->json(['message' => 'Unauthorised'], 403);
        }

        return response()->json($campaigns);
    }


    public function store(Request $request) {
        $request->validate([
            'company_id' => ['required', 'exists:companies,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'min_points_per_voucher' => ['sometimes', 'integer', 'min:1'],
            'min_spend_for_point' => ['required', 'numeric', 'min:0.01'],
            'status' => ['required', 'string', 'in:' . implode(',', array_column(CampaignStatus::cases(), 'value'))],
        ]);

        $owner = auth()->user();
        $owner->company()->where('id', $request->company_id)->firstOrFail();

        $campaign = $owner->company->campaigns()->create($request->all());

        return response()->json($campaign, 201);
    }

    public function show(Campaign $campaign) {
        $owner = auth()->user();
        $owner->company()->where('id', $campaign->company_id)->firstOrFail();

        return response()->json($campaign->load(['rewards', 'issuers', 'vouchers']));
    }

    public function assignIssuer(Request $request, Campaign $campaign) {
        $request->validate([
            'user_id' => ['required', 'exists:users,id'],
        ]);

        $user = User::findOrFail($request->user_id);
        if (!$user->isIssuer() && !$user->isOwner()) {
            return response()->json(['message' => 'User must be an issuer or owner to be assigned.'], 400);
        }

        $campaign->issuers()->syncWithoutDetaching([$user->id]);

        return response()->json(['message' => 'Issuer assigned successfully.'], 200);
    }
}
