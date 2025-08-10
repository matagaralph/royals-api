<?php

namespace App\Http\Controllers\Api\Bot;

use App\Enums\UserRole;
use App\Http\Controllers\Api\Shopper\ShopperController;
use App\Http\Controllers\Controller;
use App\Http\Resources\ClaimVoucherResource;
use App\Models\ClaimVoucher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class BotController extends Controller {
    public function getRewardsByUser(Request $request) {
        $request->validate([
            'phone' => ['required', 'string', 'exists:users,phone'],
        ]);

        $user = User::where('phone', $request->phone)->first();

        if (!$user) {
            return response()->json([
                'status' => -3,
                'message' => 'User not registered, you are required to register.',
            ]);
        }

        $claimVouchers = ClaimVoucher::with('reward.campaign')
            ->where('user_id', $user->id)
            ->get();

        if ($claimVouchers->isEmpty()) {
            return response()->json([
                'status' => 0,
                'data' => [],
                'message' => 'Reward vouchers not available.',
            ]);
        }

        return response()->json([
            'status' => 1,
            'message' => 'Reward vouchers found.',
            'data' => ClaimVoucherResource::collection($claimVouchers),
        ]);
    }

    public function register(Request $request) {

        $request->validate([
            'phone' => ['required', 'string'],
            'name' => ['required', 'string', 'max:255'],
        ]);

        if (User::where('phone', $request->phone)->first()) {
            return response()->json([
                'status' => 0,
                'message' => 'Phone number is already used, please try a different one.',
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'password' => Hash::make('royals'),
            'role' => UserRole::Shopper,
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Created Successfully.',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $user->role,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ],

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
