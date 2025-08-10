<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use Illuminate\Http\Request;

class RewardController extends Controller {
    public function store(Request $request, Campaign $campaign) {
        $user = auth()->user();

        if (!$user->isOwner() && !$user->isIssuerForCampaign($campaign->id)) {
            return response()->json(['message' => 'You are not an owner or an issuer for this campaign.'], 403);
        }
        
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'points_required' => ['required', 'integer', 'min:1'],
        ]);

        $reward = $campaign->rewards()->create($request->all());

        return response()->json([
            'message' => 'Reward created successfully.',
            'reward' => $reward,
        ], 201);
    }
}
