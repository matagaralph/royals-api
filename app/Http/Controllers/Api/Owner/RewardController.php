<?php

namespace App\Http\Controllers\Api\Owner;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use Illuminate\Http\Request;

class RewardController extends Controller {
    public function store(Request $request, Campaign $campaign) {

        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'points_required' => ['required', 'integer', 'min:1'],
        ]);

        $owner = auth()->user();
        $owner->company()->where('id', $campaign->company_id)->firstOrFail();

        $reward = $campaign->rewards()->create($request->all());

        return response()->json($reward, 201);
    }
}
