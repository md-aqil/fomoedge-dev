import React from "react";
import { Briefcase } from "lucide-react";
import { Button } from "@/shadcn/ui/button";

export default function ModernMentorCard({ mentor }) {
    // Extract mentor data with fallbacks
    const mentorName = mentor?.alias_name || mentor?.full_name || "Mentor Name";
    const profileImage = mentor?.profile_picture?.full_path || "/images/unknown.jpg";
    const tags = mentor?.topic_tags || mentor?.tags || [];
    const experience = mentor?.experience || "";
    const isAvailable = true; // Default availability since is_available isn't in the data
    
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
            {/* Profile Image */}
            <div className="relative">
                <img
                    src={profileImage}
                    alt={mentorName}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* Availability indicator */}
                <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${isAvailable ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                    <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-white' : 'bg-gray-300'}`}></div>
                    {isAvailable ? 'Available' : 'Unavailable'}
                </div>
            </div>
            
            {/* Card Content */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Mentor Name */}
                <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-900 truncate">
                        {mentorName}
                    </h3>
                </div>
                
                {/* Experience */}
                {experience && (
                    <div className="flex items-start gap-2 mb-3">
                        <Briefcase className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600">
                            {experience}
                        </p>
                    </div>
                )}
                
                {/* Expertise Tags */}
                {tags && tags.length > 0 && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full truncate max-w-[120px]"
                                >
                                    {tag.name || tag.title || tag}
                                </span>
                            ))}
                            {tags.length > 3 && (
                                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                    +{tags.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Availability indicator and Book Button */}
                <div className="flex items-center justify-between mt-auto pt-4">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        {isAvailable ? 'Available' : 'Unavailable'}
                    </div>
                    <Button
                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-full transition-all duration-300"
                    >
                        Book Session
                    </Button>
                </div>
            </div>
        </div>
    );
}