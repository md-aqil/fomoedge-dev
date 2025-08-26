<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\TopicRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopicController extends Controller
{
    public function __construct(protected TopicRepository $topicRepository) {}

    public function index(Request $request)
    {
        $topics = $this->topicRepository->model()->with('tags')->latest()->paginate($request->limit ?? config('app.pagination_limit'))->withQueryString();

        return Inertia::render('Admin/Topics/Topics', compact('topics'));
    }

    public function create()
    {
        return Inertia::render('Admin/Topics/Topic');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:topics',
            'activated_at' => 'sometimes|required|boolean',
            'meta_tags' => 'nullable|string',
            'description' => 'nullable|string',
            'keywords' => 'nullable|string',
            'schema' => 'nullable|string',
        ]);

        if ($request->activated_at || $request->activated_at == '0') {
            $request->merge(['activated_at' => $request->activated_at ? now() : null]);
        }

        $topic = $this->topicRepository->create($request->all());

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Topic created successfully', 'flash_description' => $topic->title]);
    }

    public  function edit($id)
    {
        $topic = $this->topicRepository->model()->with('tags')->findOrFail($id);

        return Inertia::render('Admin/Topics/Topic', compact('topic'));
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'sometimes|required|string',
            'slug' => 'sometimes|required|string|unique:topics,slug,' . $id,
            'activated_at' => 'sometimes|required|boolean',
            'meta_tags' => 'nullable|string',
            'description' => 'nullable|string',
            'keywords' => 'nullable|string',
            'schema' => 'nullable|string',
        ]);

        $topic = $this->topicRepository->findOrFail($id);

        if ($request->activated_at || $request->activated_at == '0') {
            $request->merge(['activated_at' => $request->activated_at ? now() : null]);
        }

        $topic->update($request->all());

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Topic updated successfully', 'flash_description' => $topic->title]);
    }
}
