<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\RatingResource;
use App\Repositories\RatingRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RatingController extends Controller
{
    public function __construct(protected RatingRepository $ratingRepository) {}

    public function index(Request $request)
    {
        $ratings = $this->ratingRepository->model()->with('rateable', 'user')->latest()->paginate($request->all())->withQueryString();
        return Inertia::render('Admin/Ratings/Ratings', ['ratings' => RatingResource::collection($ratings)]);
    }
}
