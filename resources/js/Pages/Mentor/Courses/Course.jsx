import React from "react";
import MentorAuthLayout from "@/Layouts/MentorAuthLayout/MentorAuthLayout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import CourseFormIndex from "./course-form/CourseFormIndex";
import PageHeading from "@/Components/PageHeading";
import ShadcnCard from "@/Components/ShadcnCard";
import { Separator } from "@/shadcn/ui/separator";
import { formatDate } from "date-fns";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/shadcn/ui/accordion";
// import { formatDate } from "date-fns";
import {
    Calendar,
    CalendarCheck,
    Clock10,
    IndianRupee,
    ShieldAlertIcon,
    VerifiedIcon,
} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";

export default function KycDetails({ courseTypeEnum, course, mentorProfile }) {
    return (
        <MentorAuthLayout>
            <Head>
                <title>Update Course Details</title>
            </Head>
            <PageHeading className="mb-5">
                <div className="">
                    <PageHeading.Title>
                        {course?.id !== null && course?.id !== undefined
                            ? "Update Course Details"
                            : "Create Course"}
                    </PageHeading.Title>
                    <p className="text-sm pt-1">
                        Create an amazing course and click save when you're
                        done..
                    </p>
                </div>
                <PageHeading.Actions>
                    {course && course.id && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        delete the course.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction asChild>
                                        <Link
                                            href={route(
                                                "mentors.courses.delete",
                                                course.id
                                            )}
                                            method="post"
                                        >
                                            Delete
                                        </Link>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                    <Button asChild variant="outline">
                        <Link href={route("mentors.courses.index")}>
                            Cancel
                        </Link>
                    </Button>
                </PageHeading.Actions>
            </PageHeading>
            <div className="grid xl:grid-cols-12 gap-x-4 space-y-3 xl:space-y-0">
                <div className="grid gap-4 xl:col-span-7">
                    <CourseFormIndex
                        courseTypeEnum={courseTypeEnum}
                        course={course}
                        mentorProfile={mentorProfile}
                    />
                </div>

                {/* Course details */}
                <div className="xl:col-span-5">
                    {/* {course == null && (
                        <ShadcnCard
                            title={"Course Details"}
                            description={`Create a new course.`}
                        />
                    )} */}
                    {course && (
                        <ShadcnCard
                            className="relative"
                            title={
                                <div className="flex items-center gap-x-2">
                                    {course?.title}
                                    {course?.activated_at ? (
                                        <VerifiedIcon className="text-green-600" />
                                    ) : (
                                        <ShieldAlertIcon className="text-red-600" />
                                    )}
                                </div>
                            }
                            // description={`Last Updated: ${formatDate(
                            //     course?.updated_at,
                            //     "dd MMM, yyyy hh:mm aa",
                            // )}`}
                        >
                            <div className="grid gap-3 text-sm">
                                <p className="font-semibold">Basic Details</p>

                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Type
                                        </span>
                                        <span>{course?.type}</span>
                                    </li>
                                    {course?.price?.price && (
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                Price
                                            </span>

                                            <span className="flex items-center">
                                                <IndianRupee size={13} />
                                                {course?.price?.price}
                                            </span>
                                        </li>
                                    )}
                                    {course?.price?.special_price && (
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                Special Price
                                            </span>
                                            <span className="flex items-center ">
                                                <IndianRupee size={13} />
                                                {course?.price?.special_price}
                                            </span>
                                        </li>
                                    )}
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Created At:
                                        </span>

                                        {course?.created_at && (
                                            <span className="flex items-center gap-1">
                                                <Calendar size={13} />
                                                {formatDate(
                                                    course?.created_at,
                                                    "dd MMM, yyyy hh:mm aa"
                                                )}
                                            </span>
                                        )}
                                    </li>
                                </ul>
                            </div>
                            {course?.bundle_courses?.length > 0 && (
                                <div>
                                    <Separator className="my-4" />
                                    <div className="grid gap-3 text-sm">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold">
                                                Bundle Courses
                                            </p>
                                            <span className="text-white bg-black px-2 rounded-full">
                                                {course?.bundle_courses?.length}
                                            </span>
                                        </div>

                                        {course?.bundle_courses?.map(
                                            (course, index) => (
                                                <div key={index}>
                                                    <div className="flex items-center justify-between">
                                                        <span>
                                                            {course.title}
                                                        </span>
                                                        <span>
                                                            {
                                                                course?.pivot
                                                                    ?.quantity
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            <Separator className="my-4" />
                            {course?.timings?.length > 0 && (
                                <div className="grid grid-cols-1 gap-3 text-sm">
                                    <div className="grid gap-3">
                                        <Accordion
                                            type="single"
                                            collapsible
                                            className="w-full"
                                        >
                                            <AccordionItem value="item-1 ">
                                                <AccordionTrigger className="">
                                                    <div className="font-semibold">
                                                        Timings
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="max-h-[300px] overflow-y-scroll">
                                                    {course?.timings?.map(
                                                        (timing, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex flex-col justify-between md:flex-col sm:flex-col lg:flex-col xl:flex-row xl:justify-between xl:items-center gap-2 bg-muted p-3 rounded"
                                                            >
                                                                {/* <div className="flex items-center justify-between pb-2">
                                                                    <div className="flex md:flex-col sm:flex-col xl:flex-row items-center gap-2 bg-muted py-1 px-2 rounded">
                                                                        <CalendarCheck
                                                                            size={
                                                                                14
                                                                            }
                                                                        />
                                                                        <span>
                                                                            {
                                                                                timing?.start_date
                                                                            }
                                                                        </span>
                                                                        To
                                                                        <span>
                                                                            {
                                                                                timing?.end_date
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 bg-muted py-1 px-2 rounded">
                                                                        <Clock10
                                                                            size={
                                                                                14
                                                                            }
                                                                        />
                                                                        <span>
                                                                            {
                                                                                timing?.start_time
                                                                            }
                                                                        </span>
                                                                        To
                                                                        <span>
                                                                            {
                                                                                timing?.end_time
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div> */}
                                                                <div className="flex items-center gap-1.5">
                                                                    <CalendarCheck
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                    {
                                                                        timing?.start_date
                                                                    }{" "}
                                                                    To{" "}
                                                                    {
                                                                        timing?.end_date
                                                                    }
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    <Clock10
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                    {
                                                                        timing?.start_time
                                                                    }{" "}
                                                                    To{" "}
                                                                    {
                                                                        timing?.end_time
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </div>
                            )}
                            {course?.tags?.length > 0 && (
                                <div className="grid grid-cols-1 gap-3 text-sm">
                                    <div className="grid gap-3">
                                        <Accordion
                                            type="single"
                                            collapsible
                                            className="w-full"
                                        >
                                            <AccordionItem value="item-1 ">
                                                <AccordionTrigger className="">
                                                    <div className="font-semibold">
                                                        Tags
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="flex flex-wrap gap-2">
                                                        {course?.tags?.map(
                                                            (tag, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center gap-2 bg-muted py-1 px-2 rounded"
                                                                >
                                                                    {tag?.title}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </div>
                            )}
                            <div className="grid gap-3 text-sm">
                                <div className="font-semibold">
                                    Course Image
                                </div>
                                <img
                                    src={
                                        course?.featured_image?.full_path ||
                                        "/images/dummyCourseBanner.jpg"
                                    }
                                    className="rounded-md w-full h-48 object-cover"
                                    alt=""
                                />
                            </div>
                            <div className="grid gap-3 text-sm">
                                <div className="font-semibold">
                                    Course Description
                                </div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: course?.description,
                                    }}
                                />
                            </div>
                        </ShadcnCard>
                    )}
                </div>
            </div>
        </MentorAuthLayout>
    );
}
