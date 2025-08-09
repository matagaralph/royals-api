<?php

namespace App\Http\Controllers\Api\Bot;

use App\Enums\UserRole;
use App\Http\Controllers\Api\Shopper\ShopperController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class BotController extends Controller {
    public function register(Request $request) {
        $request->validate([
            'phone' => ['required', 'string', 'unique:users,email'],
            'name' => ['required', 'string', 'max:255'],
        ]);

        $password = Str::random(10);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->phone,
            'password' => Hash::make($password),
            'role' => UserRole::Shopper,
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Created successfully. Your temporary password is: ' . $password,
            'user' => $user,
        ], 201);
    }

    public function scanPointsVoucher(Request $request) {
        $request->validate([
            'phone' => ['required', 'string', 'exists:users,email'],
            'voucher_code' => ['required', 'string'],
        ]);

        $user = User::where('email', $request->phone)->firstOrFail();
        Auth::login($user);

        $shopperRequest = Request::create('/api/shopper/points-vouchers/scan', 'POST', ['voucher_code' => $request->voucher_code]);
        $shopperController = new ShopperController();
        $response = $shopperController->scanPointsVoucher($shopperRequest);

        Auth::logout();
        return $response;
    }

    public function myPointsSummary(Request $request) {
        $request->validate([
            'phone' => ['required', 'string', 'exists:users,email'],
        ]);

        $user = User::where('email', $request->phone)->firstOrFail();
        Auth::login($user);

        $shopperController = new ShopperController();
        $response = $shopperController->myPointsSummary();

        Auth::logout();
        return $response;
    }

    public function claimReward(Request $request) {
        $request->validate([
            'phone' => ['required', 'string', 'exists:users,email'],
            'reward_id' => ['required', 'integer'],
        ]);

        $user = User::where('email', $request->phone)->firstOrFail();
        Auth::login($user);

        $shopperRequest = Request::create('/api/shopper/rewards/claim', 'POST', ['reward_id' => $request->reward_id]);
        $shopperController = new ShopperController();
        $response = $shopperController->claimReward($shopperRequest);

        Auth::logout();
        return $response;
    }

    public function myClaimVouchers(Request $request) {
        $request->validate([
            'phone' => ['required', 'string', 'exists:users,email'],
        ]);

        $user = User::where('email', $request->phone)->firstOrFail();
        Auth::login($user);

        $shopperController = new ShopperController();
        $response = $shopperController->myClaimVouchers();

        Auth::logout();
        return $response;
    }
}
