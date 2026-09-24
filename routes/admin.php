<?php

use App\Http\Controllers\Admin\ArmadaController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\SectionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');

    Route::get('sections/{section}', [SectionController::class, 'edit'])->name('sections.edit');
    Route::put('sections/{section}', [SectionController::class, 'update'])->name('sections.update');

    Route::get('armada', [ArmadaController::class, 'index'])->name('armada.index');
    Route::get('armada/create', [ArmadaController::class, 'create'])->name('armada.create');
    Route::post('armada', [ArmadaController::class, 'store'])->name('armada.store');
    Route::post('armada/reorder', [ArmadaController::class, 'reorder'])->name('armada.reorder');
    Route::get('armada/{armada}/edit', [ArmadaController::class, 'edit'])->name('armada.edit');
    Route::put('armada/{armada}', [ArmadaController::class, 'update'])->name('armada.update');
    Route::delete('armada/{armada}', [ArmadaController::class, 'destroy'])->name('armada.destroy');

    Route::get('galeri', [GalleryController::class, 'index'])->name('galeri.index');
    Route::get('galeri/create', [GalleryController::class, 'create'])->name('galeri.create');
    Route::post('galeri', [GalleryController::class, 'store'])->name('galeri.store');
    Route::post('galeri/reorder', [GalleryController::class, 'reorder'])->name('galeri.reorder');
    Route::get('galeri/{gallery}/edit', [GalleryController::class, 'edit'])->name('galeri.edit');
    Route::put('galeri/{gallery}', [GalleryController::class, 'update'])->name('galeri.update');
    Route::delete('galeri/{gallery}', [GalleryController::class, 'destroy'])->name('galeri.destroy');

    Route::post('media', [MediaController::class, 'store'])->name('media.store');
});
