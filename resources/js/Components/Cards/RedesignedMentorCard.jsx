import React from "react";
import { Briefcase, BookOpen, Users, Star } from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";

export default function RedesignedMentorCard({ mentor }) {
    // Extract mentor data with fallbacks
    const mentorName = mentor?.alias_name || mentor?.full_name || "Mentor Name";
    const experience = mentor?.experience || "Experience not specified";
    const profileImage = mentor?.profile_picture?.full_path || "/images/unknown.jpg";
    const sessionsCount = mentor?.bookings_count || 0;
    const avgRating = mentor?.avg_mentor_rating || 0;
    const tags = mentor?.topic_tags || mentor?.tags || [];
    
    return (
        <div className="border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full">
            {/* Profile Image */}
            <div className="relative">
                <img
                    src={profileImage}
                    alt={mentorName}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* Rating badge */}
                {avgRating > 0 && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <Star size={12} fill="white" />
                        <span>{avgRating.toFixed(1)}</span>
                    </div>
                )}
            </div>
            
            {/* Card Content */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Mentor Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                    {mentorName}
                </h3>
                
                {/* Experience */}
                <div className="flex items-start gap-2 mb-3">
                    <Briefcase className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {experience}
                    </p>
                </div>
                
                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                            {tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full truncate max-w-[100px]"
                                >
                                    {tag.name || tag.title || tag}
                                </span>
                            ))}
                            {tags.length > 3 && (
                                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                                    +{tags.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Stats */}
                <div className="flex items-center justify-between mb-4 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-gray-600">
                        <BookOpen size={16} />
                        <span className="text-sm">{sessionsCount} sessions</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                        <Users size={16} />
                        <span className="text-sm">100% satisfaction</span>
                    </div>
                </div>
                
                {/* View Details Button */}
                <div className="mt-auto">
                    <Button 
                        asChild 
                        className="bg-amber-300 w-full text-black font-medium py-2 rounded-lg transition-all duration-300"
                    >
                        <Link href={route("mentor.find-by-id", mentor?.unique_id)}>
                            View Details
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}