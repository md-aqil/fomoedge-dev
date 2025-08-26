<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\TopicRepository;
use App\Repositories\TopicTagRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopicTagsController extends Controller
{
    public function __construct(protected TopicRepository $topicRepository, protected TopicTagRepository $topicTagRepository) {}

    public function index(Request $request)
    {
        $tags = $this->topicTagRepository->latest()->paginate($request->limit ?? config('app.pagination_limit'))->withQueryString();

        return Inertia::render('Admin/TopicTags/TopicTags', compact('tags'));
    }

    public function store(Request $request, $topicId)
    {
        $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:topic_tags',
            'activated_at' => 'sometimes|required|boolean',
            'meta_tags' => 'nullable|string',
            'description' => 'nullable|string',
            'keywords' => 'nullable|string',
            'schema' => 'nullable|string',
            'tag_details' => 'nullable|string',
            'tag_cta' => 'nullable|array',
            'tag_cta.label' => 'nullable|string',
            'tag_cta.link' => 'nullable|string',
            'tag_cta_description' => 'nullable|string',
            'faqs' => 'nullable|array',
            'faqs.*.question' => 'nullable|string',
            'faqs.*.answer' => 'nullable|string',
        ]);

        $topic = $this->topicRepository->findOrFail($topicId);

        $request->merge(['topic_id' => $topic->id]);

        if ($request->activated_at || $request->activated_at == '0') {
            $request->merge(['activated_at' => $request->activated_at ? now() : null]);
        }

        $tag = $this->topicTagRepository->create($request->all());

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Topic tag created successfully', 'flash_description' => $tag->name]);
    }

    public function update(Request $request, $topicId, $id)
    {
        // dd($id);
        // dd($request->all());
        $request->validate([
            'title' => 'sometimes|required|string',
            'slug' => 'sometimes|required|string|unique:topic_tags,id,' . $id,
            'activated_at' => 'sometimes|required|boolean',
            'meta_tags' => 'nullable|string',
            'description' => 'nullable|string',
            'keywords' => 'nullable|string',
            'schema' => 'nullable|string',
            'tag_details' => 'nullable|string',
            'tag_cta' => 'nullable|array',
            'tag_cta.label' => 'nullable|string',
            'tag_cta.link' => 'nullable|string',
            'tag_cta_description' => 'nullable|string',
            'faqs' => 'nullable|array',
            'faqs.*.question' => 'nullable|string',
            'faqs.*.answer' => 'nullable|string',
        ]);

        $tag = $this->topicTagRepository->findOrFail($id);

        if ($request->activated_at || $request->activated_at == '0') {
            $request->merge(['activated_at' => $request->activated_at ? now() : null]);
        }

        $tag->fill($request->all());
        $tag->save();

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Topic tag updated successfully', 'flash_description' => $tag->name]);
    }
}
