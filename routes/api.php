<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Owner\CampaignController;
use App\Http\Controllers\Api\RewardController;
use App\Http\Controllers\Api\Shopper\ShopperController;
use App\Http\Controllers\Api\VoucherController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('role:owner|issuer')->group(function () {
        Route::get('/campaigns', [CampaignController::class, 'index']);
        Route::post('/rewards/create/{campaign}', [RewardController::class, 'store']);
        Route::post('/vouchers/generate-points/{campaign}', [VoucherController::class, 'generatePointsVoucher']);
        Route::post('/vouchers/verify-claim', [VoucherController::class, 'verifyClaimVoucher']);
        Route::post('/vouchers/issue-claim', [VoucherController::class, 'issueClaimVoucher']);
    });

    Route::prefix('owner')->middleware('role:owner')->group(function () {

        Route::post('campaigns', [CampaignController::class, 'store']);
        Route::get('campaigns/{campaign}', [CampaignController::class, 'show']);
        Route::post('campaigns/{campaign}/assign-issuer', [CampaignController::class, 'assignIssuer']);

    });


    Route::prefix('shopper')->middleware('role:shopper')->group(function () {

        Route::get('points', [ShopperController::class, 'myPointsSummary']);
        Route::get('active-campaigns', [ShopperController::class, 'listActiveCampaigns']);
        Route::post('vouchers/scan', [ShopperController::class, 'scanPointsVoucher']);
        Route::post('rewards/claim', [ShopperController::class, 'claimReward']);
        Route::get('claim-vouchers', [ShopperController::class, 'myClaimVouchers']);
        Route::get('claim-vouchers/{claimVoucher}/qr-code', [ShopperController::class, 'getClaimVoucherQrCode']);
    });

});
