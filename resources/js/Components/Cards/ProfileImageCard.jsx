import React from "react";
import { Briefcase } from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import CardReview from "./CardReview";

export default function ProfileImageCard({ mentor }) {
    return (
        <div
            key={mentor?.encrypted_id}
            className="border rounded-md group relative hover:shadow-md"
        >
            <div className="overflow-hidden relative">
                <img
                    src={
                        mentor?.profile_picture?.full_path
                            ? mentor?.profile_picture?.full_path
                            : "/images/unknown.jpg"
                    }
                    className="rounded-t-md group-hover:opacity-85 h-[200px] w-full object-cover "
                    alt=""
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
            </div>
            {/* Commenting rating as we don't have rating key now */}
            {/* <CardReview rating={mentor?.avg_mentor_rating} /> */}
            <div className="p-4">
                <div className="font-bold text-xl">
                    {mentor?.alias_name
                        ? mentor?.alias_name
                        : mentor?.full_name}
                </div>

                <div className="px-1 py-3 text-gray-700 text-sm font-medium min-h-[100px]">
                    <div className="flex gap-2 items-start py-2">
                        <div>
                            {mentor?.experience?.length > 0 && (
                                <Briefcase className="h-4 w-4 text-gray-400 mt-1" />
                            )}
                        </div>
                        <div className="text-[13px]">
                            {mentor?.experience?.slice(0, 88)}
                            {mentor?.experience?.length > 88 && "..."}
                        </div>
                    </div>
                </div>

                <div className="">
                    <Button
                        asChild
                        className="bg-gradient-to-l hover:bg-gradient-to-r from-slate-900 to-slate-700 w-full text-white"
                        // size="lg"
                    >
                        <Link
                            href={route("mentor.find-by-id", mentor?.unique_id)}
                        >
                            View Details
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
