<?php

namespace Database\Seeders;

use App\Models\TopicTag;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sample FAQ data for testing
        $sampleFaqs = [
            [
                'question' => 'How do I choose the right mentor?',
                'answer' => 'Look for mentors with expertise in your field of interest, check their reviews and ratings, and consider their communication style and availability.'
            ],
            [
                'question' => 'What should I expect from a mentorship session?',
                'answer' => 'A typical session includes goal-setting, skill development discussions, career guidance, and actionable feedback tailored to your specific needs.'
            ],
            [
                'question' => 'How long should a mentorship relationship last?',
                'answer' => 'The duration varies based on your goals. It can range from a few sessions for specific projects to ongoing relationships for long-term career development.'
            ],
            [
                'question' => 'What is the cost of mentorship sessions?',
                'answer' => 'Costs vary by mentor expertise and session length. You can view pricing on each mentor\'s profile before booking a session.'
            ]
        ];

        // Get a few topic tags to add FAQs to
        $tags = TopicTag::active()->take(3)->get();
        
        foreach ($tags as $tag) {
            $tag->update([
                'faqs' => $sampleFaqs
            ]);
            
            echo "Added FAQs to tag: {$tag->title}\n";
        }
    }
}