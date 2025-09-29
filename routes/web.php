<?php

use App\Http\Controllers\Customer\CampaignController;
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
    });
});

require __DIR__ . '/auth.php';
