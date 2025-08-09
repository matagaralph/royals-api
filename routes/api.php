<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Bot\BotController;
use App\Http\Controllers\Api\Issuer\ClaimVoucherController as IssuerClaimVoucherController;
use App\Http\Controllers\Api\Issuer\VoucherController as IssuerVoucherController;
use App\Http\Controllers\Api\Owner\CampaignController;
use App\Http\Controllers\Api\Owner\RewardController as OwnerRewardController;
use App\Http\Controllers\Api\Owner\VoucherController as OwnerVoucherController;
use App\Http\Controllers\Api\Shopper\ShopperController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Bot Routes (for Green API or other services)
Route::prefix('bot')->group(function () {
    Route::post('/register', [BotController::class, 'register']);
    Route::post('/scan-voucher', [BotController::class, 'scanPointsVoucher']);
    Route::post('/claim-reward', [BotController::class, 'claimReward']);
    Route::get('/my-points', [BotController::class, 'myPointsSummary']);
    Route::get('/my-claims', [BotController::class, 'myClaimVouchers']);
});

// Authenticated Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/campaigns', [CampaignController::class, 'index']);
    // Owner Routes
    Route::prefix('owner')->middleware('role:owner')->group(function () {

        Route::post('campaigns', [CampaignController::class, 'store']);
        Route::get('campaigns/{campaign}', [CampaignController::class, 'show']);
        Route::post('campaigns/{campaign}/rewards', [OwnerRewardController::class, 'store']);
        Route::post('campaigns/{campaign}/assign-issuer', [CampaignController::class, 'assignIssuer']);
        Route::get('vouchers/{voucher}/qr-code', [OwnerVoucherController::class, 'getQrCode']);
        Route::post('claim-vouchers/verify', [IssuerClaimVoucherController::class, 'verifyClaimCode']);
        Route::post('claim-vouchers/{claimVoucher}/issue', [IssuerClaimVoucherController::class, 'issueClaimVoucher']);
    });

    // Issuer Routes
    Route::prefix('issuer')->middleware('role:issuer')->group(function () {
        Route::post('campaigns/{campaign}/generate-points-voucher', [IssuerVoucherController::class, 'generatePointsVoucher']);
        Route::get('vouchers/{voucher}/qr-code', [IssuerVoucherController::class, 'getQrCode']);
        Route::post('claim-vouchers/verify', [IssuerClaimVoucherController::class, 'verifyClaimCode']);
        Route::post('claim-vouchers/{claimVoucher}/issue', [IssuerClaimVoucherController::class, 'issueClaimVoucher']);
    });

    // Shopper Routes
    Route::prefix('shopper')->middleware('role:shopper')->group(function () {
        Route::get('points', [ShopperController::class, 'myPointsSummary']);
        Route::get('active-campaigns', [ShopperController::class, 'listActiveCampaigns']);
        Route::post('points-vouchers/scan', [ShopperController::class, 'scanPointsVoucher']);
        Route::post('rewards/claim', [ShopperController::class, 'claimReward']);
        Route::get('claim-vouchers', [ShopperController::class, 'myClaimVouchers']);
        Route::get('claim-vouchers/{claimVoucher}/qr-code', [ShopperController::class, 'getClaimVoucherQrCode']);
    });
});
