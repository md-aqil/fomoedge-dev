import React from "react";
import { Head } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/shadcn/ui/tooltip";
import { Separator } from "@/shadcn/ui/separator";
import { Badge } from "@/shadcn/ui/badge";
import { formatDate } from "date-fns";
import UserAuthLayout from "@/Layouts/UserAuthLayout/UserAuthLayout";
import { formatEnum } from "@/Helpers/GlobalFunctions";
import { CreditCard, ExternalLink, FileIcon, Hash } from "lucide-react";
import ClickToCopy from "@/Components/ClickToCopy";

export default function Booking({ booking }) {
    let day = null,
        date = null,
        time = null;

    // if (booking && booking.package_info && booking.package_info) {
    //     const [dayPart, datePart] = booking?.package_info?.split(", ");
    //     [date, timePart] = datePart?.split(" | ");
    //     time = timePart?.split("(")[0];
    //     day = dayPart;
    // }

    return (
        <UserAuthLayout>
            <Head>
                <title>Course Purchase Details</title>
            </Head>

            <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            Course Details - {booking.course.title}
                            <Badge>{formatEnum(booking.course.type)}</Badge>
                        </CardTitle>
                        <CardDescription>
                            Booked On:{" "}
                            {formatDate(
                                booking.created_at,
                                "dd mmm, yyyy HH:mm"
                            )}
                        </CardDescription>
                    </div>

                    <div className="ml-auto flex items-center gap-1">
                        <a
                            href={
                                booking?.transaction?.invoice?.full_path || "#"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1"
                            >
                                <FileIcon className="h-3.5 w-3.5" />
                                <span className="whitespace-nowrap">
                                    Invoice
                                </span>
                            </Button>
                        </a>
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                        <div className="font-semibold">Course Details</div>
                        <ul className="grid gap-3">
                            <li className="grid gap-3 grid-cols-4 items-start justify-between">
                                <div className="col-span-4">
                                    <span className="text-muted-foreground block mb-2 font-semibold">
                                        {booking.course.title}
                                    </span>
                                    <span className="text-muted-foreground block mb-2 font-semibold">
                                        {booking.course.excerpt}
                                    </span>
                                    <span className="text-muted-foreground block italic">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: booking.course
                                                    .description,
                                            }}
                                        />
                                    </span>
                                </div>
                            </li>
                            {booking.course.type === "VIDEO_CALL" && (
                                <div className="flex justify-end items-center gap-x-1">
                                    <div className="bg-slate-100 border inline-flex items-center gap-x-2 p-1 rounded justify-end">
                                        <p>
                                            {
                                                booking?.google_meet_response
                                                    ?.meetingUri
                                            }
                                        </p>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    {booking
                                                        ?.google_meet_response
                                                        ?.meetingUri && (
                                                        <ClickToCopy
                                                            data={
                                                                booking
                                                                    ?.google_meet_response
                                                                    ?.meetingUri
                                                            }
                                                        />
                                                    )}
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Click to copy</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Button asChild>
                                        <a
                                            href={
                                                booking?.google_meet_response
                                                    ?.meetingUri
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Join
                                            <ExternalLink className="h-4 w-4 ml-1" />
                                        </a>
                                    </Button>
                                </div>
                            )}
                        </ul>
                    </div>

                    <Separator className="my-4" />
                    {/* Timing details */}
                    <div className="grid gap-3">
                        <div className="font-semibold">Booking Slot</div>
                        <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">
                                    Confirmation Status
                                </dt>
                                <dd>
                                    <Badge className={"uppercase"}>
                                        {booking?.status}
                                    </Badge>
                                </dd>
                            </div>

                            {booking.course_timing && (
                                <>
                                    {" "}
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">
                                            Starts
                                        </dt>
                                        <dd>
                                            {booking.course_timing.start_date}{" "}
                                            {booking.course_timing.start_time}
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">
                                            Ends
                                        </dt>
                                        <dd>
                                            {booking.course_timing.end_date}{" "}
                                            {booking.course_timing.end_time}
                                        </dd>
                                    </div>
                                </>
                            )}
                        </dl>
                    </div>

                    <Separator className="my-4" />
                    <div className="grid gap-3">
                        <div className="font-semibold">Price Details</div>
                        <dl className="grid gap-3">
                            {booking.price && (
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">
                                        Price
                                    </dt>
                                    <dd>{booking.price}</dd>
                                </div>
                            )}
                            {booking.special_price && (
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">
                                        Special Price
                                    </dt>
                                    <dd>{booking.special_price}</dd>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">
                                    Tax Amount
                                </dt>
                                <dd>{booking.tax_amount}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">
                                    Platform Fee
                                </dt>
                                <dd>{booking.platform_fee_amount}</dd>
                            </div>
                            <Separator className="my-1" />
                            {booking.grand_total_amount && (
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">
                                        Grand Total
                                    </dt>
                                    <dd>{booking.grand_total_amount}</dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    <Separator className="my-4" />
                    <div className="grid gap-3">
                        <div className="font-semibold">Payment Information</div>
                        <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="flex items-center gap-1 text-muted-foreground">
                                    <Hash className="h-4 w-4" />
                                    Transaction ID
                                </dt>
                                <dd>
                                    {
                                        booking?.transaction
                                            ?.payment_gateway_transaction_data
                                            .razorpay_payment_id
                                    }
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="flex items-center gap-1 text-muted-foreground">
                                    <CreditCard className="h-4 w-4" />
                                    Transaction Link ID
                                </dt>
                                <dd>
                                    {booking?.transaction
                                        ?.payment_gateway_transaction_data
                                        ?.razorpay_payment_link_id ?? "NA"}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="flex items-center gap-1 text-muted-foreground">
                                    <CreditCard className="h-4 w-4" />
                                    Transaction Status
                                </dt>
                                <dd>
                                    <div
                                        className={`w-20 text-center py-0.5 rounded-xl text-xs font-semibold bg-teal-400 text-white`}
                                    >
                                        {booking?.status ?? "NA"}
                                    </div>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </CardContent>
            </Card>
        </UserAuthLayout>
    );
}
