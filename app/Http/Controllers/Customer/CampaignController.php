<?php

namespace App\Http\Controllers\Customer;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Enums\CampaignStatus;
use App\Http\Controllers\Controller;

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
}
