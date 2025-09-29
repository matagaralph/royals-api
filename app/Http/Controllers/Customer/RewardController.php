<?php

namespace App\Http\Controllers\Customer;

use App\Models\Campaign;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RewardController extends Controller {

    public function store(Request $request, Campaign $campaign) {

        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'points_required' => ['required', 'integer', 'min:1'],
        ]);

        $campaign->rewards()->create($request->all());

        return redirect()->route('campaigns.show', ['campaign' => $campaign->id])->withSuccess('Reward has been added to the campaign.');
    }
}
