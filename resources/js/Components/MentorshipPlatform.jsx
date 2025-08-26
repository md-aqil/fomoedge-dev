import React, { useState, useMemo } from "react";
import RedesignedMentorCard from "./Cards/RedesignedMentorCard";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Link } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";

export default function MentorshipPlatform({ topics = [], isHomepage = false }) {
    const [activeCategory, setActiveCategory] = useState("All Mentors");
    const [selectedFilter, setSelectedFilter] = useState(null);
    
    // Extract all unique mentors from topics
    const allMentors = useMemo(() => {
        if (!topics || topics.length === 0) return [];
        
        const mentors = new Set();
        topics.forEach(topic => {
            if (topic.active_tags) {
                topic.active_tags.forEach(tag => {
                    if (tag.mentors) {
                        tag.mentors.forEach(mentor => {
                            mentors.add(mentor);
                        });
                    }
                });
            }
        });
        
        return Array.from(mentors);
    }, [topics]);
    
    // Get categories from topics
    const categories = useMemo(() => {
        if (!topics || topics.length === 0) return ["All Mentors"];
        return ["All Mentors", ...topics.map(topic => topic.title)];
    }, [topics]);
    
    // Extract filter chips from topics and tags
    const filterChips = useMemo(() => {
        if (!topics || topics.length === 0) return [];
        
        const chips = new Set();
        topics.forEach(topic => {
            if (topic.active_tags) {
                topic.active_tags.forEach(tag => {
                    chips.add(tag.title);
                });
            }
        });
        
        // Convert to array and limit to first 5 chips
        return Array.from(chips).slice(0, 5);
    }, [topics]);
    
    // Filter mentors based on active category and selected filter
    const filteredMentors = useMemo(() => {
        let mentors = [...allMentors];
        
        // Filter by category if not "All Mentors"
        if (activeCategory !== "All Mentors") {
            const activeTopic = topics.find(topic => topic.title === activeCategory);
            if (activeTopic) {
                const topicMentors = new Set();
                activeTopic.active_tags.forEach(tag => {
                    if (tag.mentors) {
                        tag.mentors.forEach(mentor => {
                            topicMentors.add(mentor);
                        });
                    }
                });
                mentors = mentors.filter(mentor => topicMentors.has(mentor));
            }
        }
        
        // Filter by chip if selected
        if (selectedFilter) {
            // Find mentors whose tags match the selected filter
            mentors = mentors.filter(mentor => {
                // Check in topic_tags or tags
                if (mentor.topic_tags || mentor.tags) {
                    const tags = mentor.topic_tags || mentor.tags || [];
                    return tags.some(tag =>
                        (tag.name || tag.title || tag || "").toLowerCase().includes(selectedFilter.toLowerCase())
                    );
                }
                
                return false;
            });
        }
        
        // Limit to 6 mentors on homepage
        if (isHomepage && mentors.length > 6) {
            mentors = mentors.slice(0, 6);
        }
        
        return mentors;
    }, [allMentors, activeCategory, selectedFilter, topics, isHomepage]);
    
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Heading */}
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Find Your Perfect Mentor
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Connect with industry experts who can guide you through career transitions, skill development, and professional growth.
                </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Category Sidebar */}
                <div className="lg:w-1/4">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
                        <ScrollArea className="h-[400px] pr-4">
                            <ul className="space-y-2">
                                {categories.map((category, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => setActiveCategory(category)}
                                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                                                activeCategory === category
                                                    ? "bg-yellow-400 text-gray-900 font-medium"
                                                    : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </ScrollArea>
                    </div>
                </div>
                
                {/* Main Content */}
                <div className="lg:w-3/4">
                    {/* Filter Chips */}
                    {filterChips.length > 0 && (
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-3">
                                {filterChips.map((chip, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedFilter(selectedFilter === chip ? null : chip)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                            selectedFilter === chip
                                                ? "bg-yellow-400 text-gray-900"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        {chip}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Mentors Grid */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {activeCategory} <span className="text-gray-500 text-lg font-normal">({filteredMentors.length} mentors)</span>
                            </h2>
                            
                            {isHomepage && (
                                <Button asChild variant="ghost">
                                    <Link href={route("mentors.all-mentors-by-tag")}>
                                        View All Mentors
                                    </Link>
                                </Button>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredMentors.map((mentor) => (
                                <RedesignedMentorCard key={mentor.id} mentor={mentor} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}