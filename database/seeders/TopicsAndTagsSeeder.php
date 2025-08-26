<?php

namespace Database\Seeders;

use App\Models\Topic;
use App\Models\TopicTag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TopicsAndTagsSeeder extends Seeder
{
    protected $data = [
        [
            'title' => 'International Mobility',
            'slug' => 'international-mobility',
            'children' => [
                [
                    'title' => 'Global Job Market',
                    'slug' => 'global-job-market'
                ],
                [
                    'title' => 'International Opportunities',
                    'slug' => 'international-opportunities'
                ],
                [
                    'title' => 'Study Abroad',
                    'slug' => 'study-abroad'
                ],
                [
                    'title' => 'Overseas Career',
                    'slug' => 'overseas-career'
                ],
                [
                    'title' => 'Jobs Abroad',
                    'slug' => 'jobs-abroad'
                ],
                [
                    'title' => 'Immigration',
                    'slug' => 'immigration'
                ],
                [
                    'title' => 'International Scholarships',
                    'slug' => 'international-scholarships'
                ]
            ]
        ],
        [
            'title' => 'Exams Preparation',
            'slug' => 'exams-preparation',
            'children' => [
                [
                    'title' => 'GMAT Exam',
                    'slug' => 'gmat-exam'
                ],
                [
                    'title' => 'CAT Exam',
                    'slug' => 'cat-exam'
                ],
                [
                    'title' => 'GRE Exam',
                    'slug' => 'gre-exam'
                ],
                [
                    'title' => 'CFA Exam',
                    'slug' => 'cfa-exam'
                ],
                [
                    'title' => 'FRM Exam',
                    'slug' => 'frm-exam'
                ],
                [
                    'title' => 'IELTS Exam',
                    'slug' => 'ielts-exam'
                ]
            ]
        ],
        [
            'title' => 'Career Growth & Development',
            'slug' => 'career-growth-development',
            'children' => [
                [
                    'title' => 'Career Switch',
                    'slug' => 'career-switch'
                ],
                [
                    'title' => 'Job Application',
                    'slug' => 'job-application'
                ],
                [
                    'title' => 'Resume Building',
                    'slug' => 'resume-building'
                ],
                [
                    'title' => 'LinkedIn Optimization',
                    'slug' => 'linkedin-optimization'
                ],
                [
                    'title' => 'Networking & Personal Branding',
                    'slug' => 'networking-personal-branding'
                ],
                [
                    'title' => 'College time wisdom',
                    'slug' => 'college-time-wisdom'
                ]
            ]
        ],
        [
            'title' => 'Career Domains',
            'slug' => 'career-domains',
            'children' => [
                [
                    'title' => 'Finance Careers',
                    'slug' => 'finance-careers'
                ],
                [
                    'title' => 'Technology Careers',
                    'slug' => 'technology-careers'
                ],
                [
                    'title' => 'Data Science AI/ML Careers',
                    'slug' => 'data-science-ai-ml-careers'
                ],
                [
                    'title' => 'Human Resources Careers',
                    'slug' => 'human-resources-careers'
                ],
                [
                    'title' => 'Product Management Careers',
                    'slug' => 'product-management-careers'
                ],
                [
                    'title' => 'Analytics Careers',
                    'slug' => 'analytics-careers'
                ],
                [
                    'title' => 'Marketing & Branding Careers',
                    'slug' => 'marketing-branding-careers'
                ],
                [
                    'title' => 'Project Management Careers',
                    'slug' => 'project-management-careers'
                ],
                [
                    'title' => 'PhD & related Careers',
                    'slug' => 'phd-related-careers'
                ],
                [
                    'title' => 'Creative Careers',
                    'slug' => 'creative-careers'
                ],
                [
                    'title' => 'Foreign Languages',
                    'slug' => 'foreign-languages'
                ]
            ]
        ],
        [
            'title' => 'Entrepreneurship & Business',
            'slug' => 'entrepreneurship-business',
            'children' => [
                [
                    'title' => 'Entrepreneurship Support',
                    'slug' => 'entrepreneurship-support'
                ],
                [
                    'title' => 'Airbnb Start-Up Model',
                    'slug' => 'airbnb-start-up-model'
                ],
                [
                    'title' => 'Go to Market Strategy',
                    'slug' => 'go-to-market-strategy'
                ],
                [
                    'title' => 'Growth Strategy',
                    'slug' => 'growth-strategy'
                ],
                [
                    'title' => 'Product Strategy',
                    'slug' => 'product-strategy'
                ],
                [
                    'title' => 'Pitch Deck Creation',
                    'slug' => 'pitch-deck-creation'
                ],
                [
                    'title' => 'Fundraising & Investor Relations',
                    'slug' => 'fundraising-investor-relations'
                ]
            ]
        ],
        [
            'title' => 'Content Creators',
            'slug' => 'content-creators',
            'children' => [
                [
                    'title' => 'LinkedIn',
                    'slug' => 'linkedin'
                ],
                [
                    'title' => 'Instagram',
                    'slug' => 'instagram'
                ],
                [
                    'title' => 'Youtube',
                    'slug' => 'youtube'
                ]
            ]
        ]
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->data as $data) {
            $topic = Topic::firstOrCreate(['slug' => $data['slug']], [
                'title' => $data['title'],
                'slug' => $data['slug'],
                'activated_at' => now()
            ]);

            foreach ($data['children'] as $child) {
                $tagData = [
                    'topic_id' => $topic->id,
                    'title' => $child['title'],
                    'slug' => $child['slug'],
                    'activated_at' => now(),
                ];
                if (isset($child['tag_details'])) {
                    $tagData['tag_details'] = $child['tag_details'];
                }
                if (isset($child['tag_cta'])) {
                    $tagData['tag_cta'] = $child['tag_cta'];
                }
                if (isset($child['tag_cta_description'])) {
                    $tagData['tag_cta_description'] = $child['tag_cta_description'];
                }
                TopicTag::firstOrCreate(['slug' => $child['slug']], $tagData);
            }
        }
    }
}
