import React from "react";
import { Calendar, Users, Star } from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";

export default function RedesignedMentorCard({ mentor }) {
    // Extract mentor data with fallbacks
    const mentorName = mentor?.alias_name || mentor?.full_name || "Mentor Name";
    const experience = mentor?.experience || "Experience not specified";
    
    // Generate placeholder image with initials for all mentors
    const generatePlaceholderImage = (name) => {
        // Extract initials from name
        const nameParts = name.trim().split(' ');
        let initials = '';
        
        if (nameParts.length >= 2) {
            // First letter of first name + first letter of last name
            initials = nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0);
        } else if (nameParts.length === 1) {
            // First two letters of single name
            initials = nameParts[0].substring(0, 2);
        } else {
            initials = 'AU'; // Default fallback
        }
        
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&size=300&background=f3f4f6&color=374151&format=png&bold=true`;
    };
    
    // Use actual image if available, otherwise generate placeholder
    const profileImage = mentor?.profile_picture?.full_path || generatePlaceholderImage(mentorName);
    
    const sessionsCount = mentor?.bookings_count || 0;
    const avgRating = mentor?.avg_mentor_rating || 0;
    const tags = mentor?.topic_tags || mentor?.tags || [];
    
    // Create expertise string from tags or experience
    const expertise = tags.length > 0 
        ? tags.slice(0, 4).map(tag => tag.title || tag).join(" | ")
        : experience.length > 50 
            ? experience.substring(0, 50) + "..."
            : experience;
    
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
            {/* Profile Image */}
            <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                    <img
                        alt={`${mentorName} profile`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={profileImage}
                        onError={(e) => {
                            // If image fails to load, use placeholder with initials
                            e.target.src = generatePlaceholderImage(mentorName);
                        }}
                    />
                </div>
                
                {/* Satisfaction badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium text-gray-700">100%</span>
                </div>
            </div>
            
            {/* Card Content */}
            <div className="p-4">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-200">
                        {mentorName}
                    </h3>
                   <p className="text-sm text-gray-600 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                            {expertise}
                        </p>
                </div>
                
                {/* Stats */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{sessionsCount} sessions</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">100% satisfaction</span>
                        </div>
                    </div>
                </div>
                
                {/* View Details Button */}
                <Button 
                    asChild 
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-md active:transform active:scale-95"
                >
                    <Link href={route("mentor.find-by-id", mentor?.unique_id)}>
                        View Details
                    </Link>
                </Button>
            </div>
        </div>
    );
}