<?php

namespace App\Http\Controllers;

use App\Enums\CourseTypeEnum;
use App\Models\Topic;
use App\Models\TopicTag;
use App\Repositories\MentorProfileRepository;
use Inertia\Inertia;

class MentorProfileController extends Controller
{
    public function __construct(protected MentorProfileRepository $mentorProfileRepository) {}

    public function allMentors()
    {
        $topics = Topic::with(['activeTags.mentors' => function ($q) {
            $q->status();
        }, 'activeTags.mentors.profilePicture'])->active()->orderBy('title', 'ASC')->get();

        return Inertia::render('MentorProfiles/MentorProfiles', ['topics' => $topics]);
    }

    public function findById(string $id)
    {
        $courseTypeEnum = enumLabelArray(CourseTypeEnum::cases());
        $mentorProfile = $this->mentorProfileRepository->model()->with(['courses.price', 'courses.topics', 'courses.tags', 'courses.timings', 'profilePicture', 'courses.featuredImage'])->where('unique_id', $id)->firstOrFail();

        return Inertia::render('MentorProfiles/MentorProfile', ['mentorProfile' => $mentorProfile, 'courseTypeEnum' => $courseTypeEnum]);
    }

    public function allMentorsByTag(string $tagSlug = null)
    {
        $tag = TopicTag::where('slug', $tagSlug)
            ->select(['id', 'title', 'slug', 'meta_tags', 'description', 'keywords', 'schema', 'tag_details', 'tag_cta', 'tag_cta_description', 'faqs'])
            ->first();

        $mentors = $this->mentorProfileRepository->model()->with(['profilePicture', 'courses.price', 'courses.topics', 'courses.tags', 'courses.timings', 'courses.featuredImage']);

        if ($tag) {
            $mentors = $mentors->whereHas('topicTags', function ($q) use ($tag) {
                $q->where('slug', $tag->slug);
            });
        }

        $mentors = $mentors->status()->get();

        $topics = Topic::with(['activeTags' => function ($q) {
            $q->select(['id', 'topic_id', 'title', 'slug', 'meta_tags', 'description', 'keywords', 'schema', 'tag_details', 'tag_cta', 'tag_cta_description', 'faqs']);
        }, 'activeTags.mentors' => function ($q) {
            $q->status();
        }, 'activeTags.mentors.profilePicture'])
            ->active()->orderBy('title', 'ASC')->get();

        return Inertia::render('MentorProfiles/MentorProfilesByTag', ['mentors' => $mentors, 'topics' => $topics, 'tag' => $tag]);
    }
}
