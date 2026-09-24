<?php

use App\Models\Armada;
use App\Models\User;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;

test('guests are redirected to the login page', function () {
    $this->post(route('admin.armada.reorder'), [
        'ids' => [1, 2],
    ])->assertRedirect(route('login'));
});

test('admin can reorder armadas', function () {
    $user = User::factory()->create();
    $a = Armada::factory()->create(['sort_order' => 0]);
    $b = Armada::factory()->create(['sort_order' => 1]);
    $c = Armada::factory()->create(['sort_order' => 2]);

    $this->actingAs($user)
        ->withoutMiddleware(PreventRequestForgery::class)
        ->post(route('admin.armada.reorder'), [
            'ids' => [$c->id, $a->id, $b->id],
        ])->assertRedirect(route('admin.armada.index'));

    expect(Armada::query()->find($c->id)->sort_order)->toBe(0)
        ->and(Armada::query()->find($a->id)->sort_order)->toBe(1)
        ->and(Armada::query()->find($b->id)->sort_order)->toBe(2);
});

test('reorder rejects ids that are not a list of integers', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->withoutMiddleware(PreventRequestForgery::class)
        ->post(route('admin.armada.reorder'), [
            'ids' => 'not-an-array',
        ])->assertSessionHasErrors('ids');
});
