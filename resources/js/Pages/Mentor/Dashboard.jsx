import MentorAuthLayout from "@/Layouts/MentorAuthLayout/MentorAuthLayout";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { Link } from "@inertiajs/react";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import PageHeading from "@/Components/PageHeading";
import { Head } from "@inertiajs/react";
import React from "react";
import {
    AlignCenter,
    ContactIcon,
    IndianRupee,
    BookCheck,
    LibraryBig,
    Star,
} from "lucide-react";
import Can from "@/Components/Can";
import ShadcnCard from "@/Components/ShadcnCard";
import RTable from "@/Components/RTable";
import Checkbox from "@/Components/Checkbox";
import { formatEnum } from "@/Helpers/GlobalFunctions";
import { Badge } from "@/shadcn/ui/badge";

export const latestVerifiedMentorColumns = [
    {
        accessorKey: "full_name",
        header: "Full Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("full_name")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div className="lowercase">{row.original?.user?.email}</div>
        ),
    },
    {
        accessorKey: "phone_no",
        header: "Phone Number",
        cell: ({ row }) => (
            <div className="lowercase">{row?.original?.phone}</div>
        ),
    },

    {
        accessorKey: "experience",
        header: "Experience",
        cell: ({ row }) => <div>{row?.original?.experience}</div>,
    },

    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <div className="text-right">
                    <Can permit="create bookings">
                        <Button asChild size="sm">
                            <Link
                                href={route(
                                    "admin.mentor-profiles.edit",
                                    row.original.id
                                )}
                            >
                                View
                            </Link>
                        </Button>
                    </Can>
                </div>
            );
        },
    },
];

export const latestCourseColumns = [
    {
        accessorKey: "type",
        header: "Package Type",
        cell: ({ row }) => {
            const user = row.original?.mentor_profile;

            return (
                <>
                    <strong className="text-sm text-gray-500 flex gap-1 items-center">
                        {row?.original?.title}{" "}
                    </strong>

                    <small>By: {user ? user.full_name : "N/A"}</small>
                </>
            );
        },
    },

    {
        accessorKey: "type",
        header: "Course Type",
        cell: ({ row }) => (
            <Badge size="sm">{formatEnum(row?.original?.type)}</Badge>
        ),
    },
    {
        accessorKey: "value",
        header: "Duration",
        cell: ({ row }) => (
            <small>
                {row?.original?.value ? row?.original?.value : 0} Minutes
            </small>
        ),
    },

    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <div className="flex gap-x-2 justify-end">
                    <Can permit="create bookings">
                        <Button asChild size="sm">
                            <Link
                                href={route(
                                    "admin.courses.view",
                                    row.original.id
                                )}
                            >
                                View
                            </Link>
                        </Button>
                    </Can>
                </div>
            );
        },
    },
];
export default function Dashboard({ auth, stats }) {
    return (
        <MentorAuthLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head>
                <title>Dashboard</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Hi {auth.user.full_name}, Welcome back 👋
                        </PageHeading.Title>
                        <PageHeading.Actions></PageHeading.Actions>
                    </PageHeading>

                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Bookings
                                </CardTitle>
                                <BookCheck size={14} color="green" />
                            </CardHeader>
                            <CardContent>
                                <div className={`text-2xl font-bold `}>
                                    {stats.totalBooking}
                                </div>
                                <p className="text-xs text-muted-foreground"></p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Courses
                                </CardTitle>
                                <LibraryBig size={14} color="red" />
                            </CardHeader>
                            <CardContent>
                                <div
                                    className={`text-2xl font-bold text-green-500`}
                                >
                                    {stats?.totalCourse}
                                </div>
                                <p className="text-xs text-muted-foreground"></p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Course Rating
                                </CardTitle>
                                <Star color="green" size={14} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.totalCourseRating}
                                </div>
                                <p className="text-xs text-muted-foreground"></p>
                            </CardContent>
                        </Card>
                        <Card className="col-span-2">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Mentor Rating
                                </CardTitle>
                                <Star color="green" size={14} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-500">
                                    {stats.totalMentorRating}
                                </div>
                                <p className="text-xs text-muted-foreground"></p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Revenue
                                </CardTitle>
                                <IndianRupee size={14} />
                            </CardHeader>
                            <CardContent>
                                <div className={`text-2xl font-bold `}>
                                    {stats.totalRevenue}
                                </div>
                                <p className="text-xs text-muted-foreground"></p>
                            </CardContent>
                        </Card>
                    </div>
                    {/* <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                            <ShadcnCard title="Latest Courses">
                                <div className="grid gap-4 grid-cols-1">
                                    <RTable
                                        data={latestCourses}
                                        columns={latestCourseColumns}
                                        searchColumns={["title"]}
                                    />
                                </div>
                            </ShadcnCard>
                            <ShadcnCard title="Latest Verified Mentors">
                                <div className="grid gap-4 grid-cols-1">
                                    <RTable
                                        data={latestVerifiedMentors}
                                        columns={latestVerifiedMentorColumns}
                                        searchColumns={["experience"]}
                                    />
                                </div>
                            </ShadcnCard>
                        </div> */}
                </div>
            </ScrollArea>
        </MentorAuthLayout>
    );
}
