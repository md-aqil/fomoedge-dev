<?php

namespace App\Http\Controllers\Mentor;

use App\Http\Controllers\Controller;
use App\Repositories\TopicRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopicAndTagController extends Controller
{
    public function __construct(private TopicRepository $topicRepository) {}

    public function index(Request $request)
    {
        $topics = $this->topicRepository->model()->with('activeTags')->latest()->active()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        return Inertia::render('Mentor/Topics/Topics', ['topics' => $topics]);
    }
}
