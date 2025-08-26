import React from "react";
import {
    Briefcase,
    CalendarDays,
    Facebook,
    IndianRupee,
    Instagram,
    Mail,
    SquareLibrary,
    User,
} from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
// import CardReview from "./CardReview";

export default function MentorProfileCard({ mentor, specialIn }) {
    return (
        <div
            key={mentor.id}
            className="border rounded-md group hover:cursor-pointer relative hover:shadow-md"
        >
            <div className="overflow-hidden relative">
                <img
                    src={
                        mentor?.full_path
                            ? mentor?.full_path
                            : "/images/unknown.jpg"
                    }
                    className="rounded-t-md group-hover:opacity-85 h-[200px] w-full object-cover "
                    alt=""
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
                <div className="absolute bottom-3 left-0 bg-white px-2 py-1 rounded-r-lg">
                    <div className="text-sm text-gray-700">{specialIn}</div>
                </div>
            </div>
            <CardReview rating={mentor?.avg_mentor_rating} />
            <div className="p-4">
                <div className="font-bold text-xl">
                    {mentor?.user?.alias_name
                        ? mentor?.user?.alias_name
                        : mentor?.name}
                </div>

                <div className="px-1 py-3 text-gray-700 text-sm font-medium">
                    <div className="flex gap-2 items-center py-2">
                        <Briefcase className="h-4 w-4 text-gray-400" />
                        <div>{mentor?.experience}</div>
                    </div>
                    {/* <div className="flex gap-2 items-center py-1">
                        <Facebook className="h-4 w-4 text-gray-400" />
                        <div>{mentor?.facebook_url} </div>
                    </div>
                    <div className="flex gap-2 items-center py-1">
                        <Instagram className="h-4 w-4 text-gray-400" />
                        <div>{mentor?.instagram_url} </div>
                    </div> */}
                </div>

                <div className="pt-4">
                    <Button className="bg-gradient-to-l hover:bg-gradient-to-r from-slate-900 to-slate-700 w-full text-white">
                        <Link href={route("mentors.show", mentor?.id)}>
                            {" "}
                            View Details
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
