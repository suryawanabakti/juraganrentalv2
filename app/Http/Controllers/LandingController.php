<?php

namespace App\Http\Controllers;

use App\Services\LandingContent;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function __construct(private readonly LandingContent $landing) {}

    public function index(): Response
    {
        return Inertia::render('welcome', $this->landing->build('welcome'));
    }
}
