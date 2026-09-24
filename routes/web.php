<?php

use App\Http\Controllers\ArmadaController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/versi-2', [LandingController::class, 'versionTwo'])->name('home-2');

Route::get('/armada/{armada:slug}', [ArmadaController::class, 'show'])->name('armada.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('dashboard', '/admin')->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
