import React from "react";
import { format } from "date-fns";
import {
    CalendarDays,
    IndianRupee,
    MoveRight,
    SquareLibrary,
    User,
} from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import CardReview from "./CardReview";
import { formatEnum } from "@/Helpers/GlobalFunctions";

export default function CourseCard({ course }) {
    return (
        <div
            key={course?.id}
            className="border rounded-md group relative hover:shadow-md"
        >
            <div className="overflow-hidden">
                <Link href={route("course.find-by-slug", course.slug)}>
                    <img
                        src={
                            course?.featured_image?.full_path
                                ? course?.featured_image?.full_path
                                : "/images/dummyCourseBanner.jpg"
                        }
                        className="rounded-t-md group-hover:opacity-85 h-[180px] w-full object-cover "
                        alt=""
                    />
                </Link>
            </div>
            {/* Commenting rating as we don't have rating key now */}
            {/* <CardReview rating={course?.avg_packages_rating} /> */}
            <div className="p-5">
                <Link href={route("course.find-by-slug", course.slug)}>
                    <h2 className="font-semibold text-lg h-14">
                        {course.title}
                    </h2>
                </Link>
                <div className="py-3">
                    {/* <div className="flex gap-1 py-1.5 items-center text-xs text-gray-600 border-b">
                        <User className="h-3 w-4" />
                        <div>
                            {course?.alias_name
                                ? course?.user?.alias_name
                                : course?.user?.full_name}
                        </div>
                    </div> */}
                    <div className="flex gap-1 py-1.5 items-center text-xs text-gray-600 border-b">
                        <SquareLibrary className="h-3 w-4" />
                        <div>Type: {formatEnum(course.type)}</div>
                    </div>
                    {/* {course?.special_price &&
                    course?.special_price_start_datetime !== null &&
                    course?.special_price_end_datetime !== undefined ? (
                        <div className="flex gap-2 py-1 items-center text-xs text-gray-600 border-b">
                            <CalendarDays className="h-3 w-4" />
                            <div>
                                {course?.special_price_start_datetime &&
                                    format(
                                        course?.special_price_start_datetime,
                                        "dd-MM-yyyy"
                                    )}
                            </div>{" "}
                            To
                            <div>
                                {course?.special_price_end_datetime &&
                                    format(
                                        course?.special_price_end_datetime,
                                        "dd-MM-yyyy"
                                    )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-1 py-1 items-center text-xs text-gray-600">
                            <CalendarDays className="h-3 w-4" />
                            <div>
                                {format(course?.start_date_time, "dd-MM-yyyy")}
                            </div>{" "}
                            To
                            <div>
                                {format(course?.end_date_time, "dd-MM-yyyy")}
                            </div>{" "}
                        </div>
                    )} */}
                </div>

                <div className="flex gap-2 items-center text-center">
                    <div className="flex items-center font-semibold">
                        <IndianRupee className="h-3 w-4" />{" "}
                        {course?.price?.special_price !== null &&
                        course?.price?.special_price !== undefined
                            ? course?.price?.special_price
                            : course?.price?.price}
                    </div>
                    {course.price?.special_price !== null &&
                    course?.price?.special_price !== undefined ? (
                        <div className="text-sm flex items-center text-gray-500 line-through">
                            <IndianRupee className="h-3 w-4" />{" "}
                            {course.price?.price}
                        </div>
                    ) : null}
                </div>

                <div className="pt-4">
                    <Button
                        asChild
                        className="bg-gradient-to-l hover:bg-gradient-to-r from-slate-900 to-slate-700 w-full text-white"
                    >
                        <Link href={route("course.find-by-slug", course.slug)}>
                            View Details
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
