<?php

namespace App\Http\Controllers\Customer;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Campaign;
use Illuminate\Http\Request;
use App\Enums\CampaignStatus;
use App\Http\Controllers\Controller;
use Auth;

class CampaignController extends Controller {

    public function index(Request $request) {

        $company = $request->user()->company()->firstOrFail();
        $campaigns = $company->campaigns()->orderBy('created_at')->get();

        return Inertia::render('admin/index', ['campaigns' => $campaigns]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'start_date' => ['required', 'date', 'after_or_equal:today'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'min_points_per_voucher' => ['sometimes', 'integer', 'min:1'],
            'min_spend_for_point' => ['required', 'numeric', 'min:0.01'],
            'status' => ['required', 'string', 'in:' . implode(',', array_column(CampaignStatus::cases(), 'value'))],
        ]);
        $user = $request->user();
        $company = $user->company;

        if (!$company) {
            return response()->json(['message' => 'User has no associated company.'], 400);
        }
        $campaign = $company->campaigns()->create($request->only([
            'name',
            'description',
            'start_date',
            'end_date',
            'min_points_per_voucher',
            'min_spend_for_point',
            'status',
        ]));

        return redirect()->back();
    }

    public function show(Campaign $campaign) {
        $totalVouchers = $campaign->vouchers()->count();
        $totalRewards = $campaign->rewards()->count();
        $usersParticipating = $campaign->shopperPoints()->distinct((array)'user_id')->count();
        $duration = Carbon::parse($campaign->start_date)->diffInDays(Carbon::parse($campaign->end_date));

        return Inertia::render('admin/campaign', [
            'campaign' => [
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
            ]
        ]);
    }

    public function destroy(Campaign $campaign) {
        Auth::user()->company()->first()->campaigns()->find($campaign->id)->delete();
        return redirect()->back();
    }
}
