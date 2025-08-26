import React from "react";
import { Head, Link } from "@inertiajs/react";
import PageHeading from "@/Components/PageHeading";
import ShadcnCard from "@/Components/ShadcnCard";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table";
import { Mail, Phone } from "lucide-react";

import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Button } from "@/shadcn/ui/button";
import { formatDate } from "date-fns";
import { Separator } from "@/shadcn/ui/separator";
import RTable from "@/Components/RTable";
import { Badge } from "@/shadcn/ui/badge";
import { formatEnum } from "@/Helpers/GlobalFunctions";

export default function Mentee({ mentee }) {
    const menteeData = mentee.data;
    return (
        <AuthenticatedLayout>
            <Head>
                <title>Mentee</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-3 p-4 md:p-8 pt-1">
                    <PageHeading className="pt-4">
                        <div className="">
                            <PageHeading.Title>
                                {menteeData?.full_name}
                            </PageHeading.Title>
                            <p className="text-sm pt-1">
                                Registered On:{" "}
                                {formatDate(
                                    menteeData?.created_at,
                                    "dd MMM, yyyy h:mm a"
                                )}
                            </p>
                            <div>
                                <div className="flex items-center gap-2 py-2">
                                    <div>
                                        <Mail size={16} />
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {menteeData?.email}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600">
                                        Total Bookings:
                                    </span>
                                    <span className="font-medium text-green-600">
                                        {menteeData?.bookings?.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <PageHeading.Actions>
                            <Button asChild variant="outline">
                                <Link href={route("admin.mentees.index")}>
                                    Cancel
                                </Link>
                            </Button>
                        </PageHeading.Actions>
                    </PageHeading>
                    <Separator className="mb-4" />
                    {menteeData?.bookings?.length > 0 && (
                        <Table>
                            <TableCaption>
                                A list of booked courses by{" "}
                                <strong>{menteeData?.full_name}</strong>
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        S. No.
                                    </TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right whitespace-pre">
                                        Booked On
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {menteeData?.bookings?.length > 0 &&
                                    menteeData?.bookings?.map((booking, i) => (
                                        <TableRow key={booking.id}>
                                            <TableCell className="font-medium">
                                                {i + 1}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={route(
                                                        "admin.bookings.view",
                                                        booking.id
                                                    )}
                                                    className="font-medium text-blue-500"
                                                >
                                                    {booking?.course?.title}
                                                </Link>
                                                <p className="text-xs">
                                                    {booking?.course?.excerpt}
                                                </p>
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap">
                                                <Badge>
                                                    {formatEnum(
                                                        booking?.course?.type
                                                    )}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap">
                                                <Badge
                                                    variant={
                                                        booking?.status ===
                                                        "PENDING"
                                                            ? "destructive"
                                                            : "success"
                                                    }
                                                >
                                                    {formatEnum(
                                                        booking?.status
                                                    )}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {formatDate(
                                                    booking?.created_at,
                                                    "dd MMM, yyyy h:mm a"
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}
