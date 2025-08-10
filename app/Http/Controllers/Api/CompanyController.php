<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class CompanyController extends Controller {
    public function listCompanyIssuers() {
        
        $user = auth()->user();
        if (!$user->isOwner()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $company = $user->company;
        $issuers = User::whereHas('issuerForCampaigns.company', function ($query) use ($company) {
            $query->where('companies.id', $company->id);
        })->where('role', 'issuer')->get(['id', 'name']);

        return response()->json($issuers);
    }
}
