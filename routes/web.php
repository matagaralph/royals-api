<?php

use App\Http\Controllers\Customer\CampaignController;
use App\Http\Controllers\Customer\CollaboratorController;
use App\Http\Controllers\Customer\RewardController;
use App\Http\Controllers\Customer\VoucherController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('index');
})->name('home');

Route::get('/contact', function () {
    return Inertia::render('contact');
});

Route::middleware('auth')->group(function () {
    Route::get('/ma', function () {
        return Inertia::render('ma');
    })->name('ma');

    Route::middleware('role:owner')->group(function () {
        Route::post('/collaborators', [CollaboratorController::class, 'invite'])->name('collaborator.store');
    });

    Route::middleware('role:owner|issuer')->group(function () {
        Route::get('/admin/collaborators', [CollaboratorController::class, 'index']);
        Route::get('/admin', [CampaignController::class, 'index'])->name('admin');
        Route::post('/campaigns', [CampaignController::class, 'store'])->name('campaigns.store');
        Route::get('/admin/{campaign}', [CampaignController::class, 'show'])->name('campaigns.show');
        Route::post('/rewards/{campaign}', [RewardController::class, 'store'])->name('rewards.store');
        Route::get('/admin/vouchers/create', [VoucherController::class, 'index']);
        Route::post('/vouchers/generate/{campaign}', [VoucherController::class, 'generatePointsVoucher']);
        Route::get('/vouchers/{voucher}/qr', [VoucherController::class, 'qrCode']);
    });
});

require __DIR__ . '/auth.php';
