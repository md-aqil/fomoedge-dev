import React from "react";

import Header from "@/Layouts/Header";
import {
    BookOpenCheck,
    CalendarDays,
    ChevronRight,
    CircleAlert,
    Clock,
    Clock3,
    HomeIcon,
    IndianRupee,
    MoveRight,
    ReplaceAll,
} from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { formatDate } from "date-fns";
import { Button } from "@/shadcn/ui/button";
import SloteSelector from "./SlotSelector";
import { Badge } from "@/shadcn/ui/badge";
import { formatEnum } from "@/Helpers/GlobalFunctions";
import { TextMuted } from "@/shadcn/ui/text-muted";
import PageLayout from "@/Layouts/PageLayout";
import PageBanner from "@/Components/PageBanner";

const gotoCourseBooking = ({ courseSlug, slotId }) => {
    sessionStorage.setItem("slotId", slotId);
    router.visit(route("booking.create", { courseSlug }));
};

const Course = ({ course, timings }) => {
    const mentorProfile = course.mentor_profile;

    const [slotID, setSlotID] = React.useState("");
    const [isTimeSelected, setIsTimeSelected] = React.useState(false);

    const [selectedTimes, setSelectedTimes] = React
        .useState
        // packageTimings[0]?.packagesTimings,
        ();

    const [selectedTime, setSelectedTime] = React
        .useState
        // packageTimings[0]?.packagesTimings[0]?.start_time || null,
        ();

    const [selectedDate, setSelectedDate] = React
        .useState
        // packageTimings[0]?.label || null,
        ();
    const [endDate, setEndDate] = React
        .useState
        // packageTimings[0]?.packagesTimings[0]?.end_date,
        ();

    const [endTime, setEndTime] = React
        .useState
        // packageTimings[0]?.packagesTimings[0]?.end_time,
        ();

    React.useEffect(() => {
        // selectedTimes && setSelectedTime(selectedTimes[0]?.start_time);
    }, [selectedTimes]);

    return (
        <div>
            <Header />
            <PageBanner title={course?.title} />

            {/* <div className="relative">
                <img
                    className="w-full h-[240px] sm:h-[350px] object-cover"
                    src={"/images/courseDetailsBanner.jpeg"}
                    alt="course"
                />
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center px-3 sm:px-0">
                        <h2 className="text-3xl text-center sm:text-5xl text-white font-bold">
                            {course?.title}
                        </h2>
                        <div className="flex justify-center items-center sm:gap-1 text-white pt-6">
                            <Link href="/">
                                <HomeIcon className="h-5 w-5" />
                            </Link>
                            <ChevronRight className="h-5 w-5" />
                            <Link href={route("mentors.show", mentor?.slug)}>
                                <div className="text-sm">{mentor?.name}</div>
                            </Link>
                            <ChevronRight className="h-5 w-5" />
                            <div className="text-sm"> {course?.title}</div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="max-w-7xl mx-auto py-14 text-black grid grid-cols-1 sm:grid-cols-8 gap-5 px-4 sm:px-0">
                {/* Course details */}
                <div className="sm:col-span-5">
                    <div className="border shadow-lg p-3 rounded-lg">
                        <img
                            src={
                                course?.featured_image?.full_path
                                    ? course?.featured_image?.full_path
                                    : "/images/dummyCourseBanner.jpg?"
                            }
                            alt={course?.title}
                            className="rounded object-contain max-h-[450px] w-full"
                        />
                        <div className="p-4">
                            <h2 className="text-xl sm:text-3xl font- pb-1">
                                {course?.title}
                            </h2>
                            <p>
                                {mentorProfile?.alias_name &&
                                mentorProfile?.show_alias === 1
                                    ? mentorProfile?.alias_name
                                    : mentorProfile?.full_name}
                            </p>
                            <div className="sm:flex gap-8 items-center justify-between">
                                <div>
                                    <div className="py-2 flex gap-1 text-sm items-center">
                                        {/* <CalendarDays className="w-4 h-4" />
                                        Created at:
                                        {formatDate(
                                            course?.created_at,
                                            "dd MMM, yyyy",
                                        )} */}
                                        <Badge>
                                            {formatEnum(course?.type)}
                                        </Badge>
                                    </div>
                                    <div className="flex gap-1 text-sm items-center">
                                        <div className="flex gap-2 items-center text-center">
                                            <div className="flex items-center font-semibold">
                                                <IndianRupee className="h-3 w-4" />{" "}
                                                {course?.price
                                                    ?.special_price !== null &&
                                                course?.price?.special_price !==
                                                    undefined
                                                    ? course?.price
                                                          ?.special_price
                                                    : course?.price?.price}
                                            </div>
                                            {course.price?.special_price !==
                                                null &&
                                            course?.price?.special_price !==
                                                undefined ? (
                                                <div className="text-sm flex items-center text-gray-500 line-through">
                                                    <IndianRupee className="h-3 w-4" />{" "}
                                                    {course?.price?.price}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="pt-3">
                                        <TextMuted className="inline-block pb-1">
                                            Course Description:
                                        </TextMuted>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: course?.description,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                {course && course?.type === "VIDEO_MEET" && (
                                    <div>
                                        <div className="py-2 flex gap-1 text-sm items-center">
                                            <CalendarDays className="w-4 h-4" />{" "}
                                        </div>

                                        <div className=" flex gap-1 text-sm items-center">
                                            <Clock className="w-4 h-4" />{" "}
                                            Duration: {course?.value} Minutes
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slots */}
                <div className="sm:col-span-3">
                    <div className="border shadow-lg p-3 rounded-lg">
                        {course?.timings?.length > 0 ? (
                            <div>
                                <h3 className="text-lg font-semibold">
                                    When should we meet?
                                </h3>
                                <div className="pt-4">
                                    <SloteSelector
                                        timings={course?.timings}
                                        setSlotID={setSlotID}
                                        onChange={(value) => {
                                            if (
                                                value !== null &&
                                                value !== undefined
                                            ) {
                                                setIsTimeSelected(true);
                                            } else {
                                                setIsTimeSelected(false);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center gap-1 text-sm items-center text-gray-500 py-8">
                                No slots available <CircleAlert size={16} />
                            </div>
                        )}
                        {course?.timings?.length > 0 && isTimeSelected ? (
                            <>
                                <div className="py-3">
                                    <Button
                                        onClick={() =>
                                            gotoCourseBooking({
                                                courseSlug: course?.slug,
                                                slotId: slotID,
                                            })
                                        }
                                        className="w-full bg-fomoPrimary-0 hover:bg-fomoSecondary-0 text-black hover:bg-[#ffd64f] inline-flex gap-1 items-center"
                                    >
                                        Confirm Details
                                        <MoveRight className="w-5 h-5" />
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="pt-6">
                                <Button
                                    disabled={true}
                                    className="w-full bg-fomoPrimary-0 hover:bg-fomoSecondary-0 text-black hover:bg-[#ffd64f] inline-flex gap-1 items-center"
                                >
                                    Confirm Details
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

Course.layout = (page) => (
    <PageLayout
        children={page}
        title={
            page?.props?.page?.meta_title
                ? page?.props?.page?.meta_title
                : page?.props?.page?.title
        }
        metaDescription={page?.props?.page?.meta_description}
        schema={page?.props?.page?.schema}
    />
);

export default Course;
