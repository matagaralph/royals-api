<?php

use App\Http\Controllers\Customer\CampaignController;
use App\Http\Controllers\Customer\RewardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('index');
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/ma', function () {
        return Inertia::render('ma');
    })->name('ma');

    Route::middleware('role:owner|issuer')->group(function () {

        Route::get('/admin', [CampaignController::class, 'index']);
        Route::post('/campaigns', [CampaignController::class, 'store'])->name('campaigns.store');
        Route::get('/admin/{campaign}', [CampaignController::class, 'show'])->name('campaigns.show');
        Route::post('/rewards/{campaign}', [RewardController::class, 'store'])->name('rewards.store');
    });
});

require __DIR__ . '/auth.php';
