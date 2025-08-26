<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MentorProfileTopic;
use App\Models\MentorProfileTopicTag;
use App\Models\Topic;
use App\Models\TopicTag;
use Illuminate\Http\Request;

class TopicAndTagController extends Controller
{
    public function topicList(Request $request)
    {
        $topics = Topic::latest()->whereNotNull('activated_at');

        if ($request->has('mentor_profile_id') && $request->filled('mentor_profile_id')) {
            $mentorProfileTopicIds = MentorProfileTopic::where('mentor_profile_id', $request->mentor_profile_id)->pluck('topic_id')->toArray();
            $topics->whereIn('id', $mentorProfileTopicIds);
        }

        $topics = $topics->get();

        return response()->json(['topics' => $topics]);
    }

    public function topicTagsList(Request $request)
    {
        $request->validate([
            'topic_ids' => 'sometimes|required|array',
            'topic_ids' => 'required|exists:topics,id'
        ]);

        $topicTagsList = TopicTag::latest();

        if ($request->topic_ids) {
            $topicTagsList->whereIn('topic_id', $request->topic_ids);
        }

        if ($request->has('mentor_profile_id') && $request->filled('mentor_profile_id')) {
            $mentorProfileTagIds = MentorProfileTopicTag::where('mentor_profile_id', $request->mentor_profile_id)->pluck('topic_tag_id')->toArray();
            $topicTagsList->whereIn('id', $mentorProfileTagIds);
        }

        $topicTags = $topicTagsList->get();

        return response()->json(['topicTags' => $topicTags]);
    }

    public function createTopic(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:topics,slug',
            'activated_at' => 'required|date_format:Y-m-d H:i:s',
        ]);

        $topic = Topic::create($request->all());

        return response()->json(['topic' => $topic]);
    }

    public function createTopicTag(Request $request)
    {
        $request->validate([
            'topic_id' => 'required|integer|exists:topics,id',
            'title' => 'required|string',
            'slug' => 'required|string|unique:topic_tags,slug',
            'activated_at' => 'required|date_format:Y-m-d H:i:s',
        ]);

        $topicTag = TopicTag::create($request->all());

        return response()->json(['topicTag' => $topicTag]);
    }
}
