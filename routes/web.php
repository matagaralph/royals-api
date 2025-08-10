<?php

use App\Http\Controllers\Api\Bot\BotController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/bot-register', [BotController::class, 'register']);
Route::get('/bot-voucher-reward-by-user', [BotController::class, 'getRewardsByUser']);
