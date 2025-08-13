<?php

namespace App\Http\Controllers\Api\Owner;

use App\Enums\CampaignStatus;
use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\User;
use Carbon\Carbon;
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
            'start_date' => ['required', 'date', 'after_or_equal:today'],
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

        $totalVouchers = $campaign->vouchers()->count();
        $totalRewards = $campaign->rewards()->count();
        $usersParticipating = $campaign->shopperPoints()->distinct('user_id')->count();
        $issuersAssigned = $campaign->issuers()->count();
        $duration = Carbon::parse($campaign->start_date)->diffInDays(Carbon::parse($campaign->end_date));

        return response()->json([
            'id' => $campaign->id,
            'name' => $campaign->name,
            'description' => $campaign->description,
            'company' => $campaign->company->name,
            'min_points_per_voucher' => $campaign->min_points_per_voucher,
            'min_spend_for_point' => $campaign->min_spend_for_point,
            'start_date' => $campaign->start_date,
            'end_date' => $campaign->end_date,
            'status' => $campaign->status,
            'duration' => $duration,
            'total_vouchers' => $totalVouchers,
            'total_rewards' => $totalRewards,
            'users_participating' => $usersParticipating,
            'issuers_assigned' => $issuersAssigned,
//            'rewards' => $campaign->rewards,
//            'issuers' => $campaign->issuers,
        ]);
    }

    public function assignIssuer(Request $request, Campaign $campaign) {
        $user = auth()->user();

        if ($campaign->company->user_id !== $user->id) {
            return response()->json(['message' => 'You do not own this campaign\'s company.'], 403);
        }

        $request->validate([
            'user_id' => ['required', 'exists:users,id'],
        ]);

        $issuerUser = User::find($request->user_id);
        if (!$issuerUser) {
            return response()->json(['message' => 'Issuer not found.'], 404);
        }

        if (!$issuerUser->isIssuer()) {
            return response()->json(['message' => 'The user must be an issuer.'], 400);
        }

        if ($campaign->issuers()->where('user_id', $issuerUser->id)->exists()) {
            return response()->json(['message' => 'This issuer is already assigned to this campaign.'], 400);
        }

        $campaign->issuers()->syncWithoutDetaching([$issuerUser->id]);

        return response()->json(['message' => 'Issuer assigned successfully.'], 200);
    }
}
