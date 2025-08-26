import { Button } from "@/shadcn/ui/button";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Head, Link } from "@inertiajs/react";
import { Checkbox } from "@/shadcn/ui/checkbox";
import RTable from "@/Components/RTable";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
import PageHeading from "@/Components/PageHeading";
import { formatEnum } from "@/Helpers/GlobalFunctions";
import { formatDate } from "date-fns";
import UserAuthLayout from "@/Layouts/UserAuthLayout/UserAuthLayout";
import { Eye, Pencil, Star } from "lucide-react";
import RatingForm from "./RatingForm";
import React from "react";

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "course.title",
        header: "Title",
        cell: ({ row }) => (
            <>
                <div className="border-b border-dashed pb-1 hover:bg-red-50 px-2">
                    <strong>{formatEnum(row.original.course.title)}</strong>
                </div>
                <div className="sm:flex gap-x-1 justify-between border-b border-dashed pb-1 hover:bg-red-50 px-2">
                    <span>Type:</span>{" "}
                    <strong>{formatEnum(row.original.course.type)}</strong>
                </div>
                <div className="sm:flex gap-x-1 justify-between border-b border-dashed py-1 hover:bg-red-50 px-2">
                    <span>Bookeds at:</span>{" "}
                    <strong>
                        {formatDate(
                            row.original.created_at,
                            "dd MMM, yyyy h:mm a"
                        )}
                    </strong>
                </div>
                <div className="py-1 hover:bg-red-50 px-2">
                    <small>{row.original.note}</small>
                </div>
            </>
        ),
    },
    {
        accessorKey: "full_name",
        header: "Mentor",
        cell: ({ row }) => (
            <>
                <div className="border-b border-dashed pb-1 hover:bg-red-50 px-2">
                    <strong>{row.original.full_name}</strong>
                </div>
                <div className="py-1 hover:bg-red-50 px-2">
                    <small>{row.original.email}</small>
                </div>
            </>
        ),
    },
    {
        accessorKey: "price",
        header: "Price Details",
        cell: ({ row }) => (
            <>
                <div className="flex gap-x-1 justify-between border-b border-dashed pb-1 hover:bg-red-50 px-2">
                    <span>Price:</span> <strong>{row.original.price}</strong>
                </div>
                <div className="flex gap-x-1 justify-between border-b border-dashed py-1 hover:bg-red-50 px-2">
                    <span>Special Price:</span>{" "}
                    <strong>{row.original.special_price}</strong>
                </div>
                <div className="flex gap-x-1 justify-between py-1 hover:bg-red-50 px-2">
                    <span>Platform Fee:</span>{" "}
                    <strong>{row.original.platform_fee_amount}</strong>
                </div>
            </>
        ),
    },
];

export default function Bookings({ bookings }) {
    const [openFormDialog, openFormDialogSet] = React.useState(false);

    const extendedColumn = [
        ...columns,
        {
            accessorKey: "rating",
            header: "Rating",

            cell: ({ row }) => (
                <div className="whitespace-nowrap">
                    {row.original?.mentor_profile_rating && (
                        <div className="gap-x-2 mb-2">
                            <p className="text-sm">
                                Rated Mentor -{" "}
                                {row.original?.mentor_profile_rating?.value}{" "}
                                stars
                            </p>
                            <div className="flex gap-0.5">
                                {[
                                    ...Array(
                                        row.original?.mentor_profile_rating
                                            ?.value
                                    ),
                                ].map((_, index) => (
                                    <div
                                        className="p-1 bg-yellow-500 rounded"
                                        key={`mentor-rating-${index}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {row.original?.course_rating && (
                        <div className="gap-x-2">
                            <p className="text-sm">
                                Rated Course -{" "}
                                {row.original?.course_rating?.value} stars
                            </p>
                            <div className="flex gap-0.5">
                                {[
                                    ...Array(
                                        row.original?.course_rating?.value
                                    ),
                                ].map((_, index) => (
                                    <div
                                        className="p-1 bg-yellow-500 rounded"
                                        key={`course-rating-${index}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ),
        },
        {
            id: "actions",
            header: () => <div className="text-right">Actions</div>,
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-end gap-x-2">
                        <Button
                            variant="outline"
                            className="gap-x-1 items-center"
                            size="icon"
                        >
                            <Link
                                href={route(
                                    "user.bookings.view",
                                    row.original.encrypted_id
                                )}
                            >
                                <Eye className="h-4 w-4" />
                            </Link>
                        </Button>
                        {/* {row.original?.mentor_profile_rating &&
                            row.original?.course_rating && ( */}
                        <Button
                            variant="outline"
                            className="gap-x-1 items-center"
                            onClick={() => {
                                openFormDialogSet({
                                    bookingData: row.original,
                                    open: true,
                                });
                            }}
                        >
                            <Star className="h-4 w-4" /> Rate & Review
                        </Button>
                        {/* )} */}
                    </div>
                );
            },
        },
    ];

    return (
        <UserAuthLayout>
            <Head>
                <title>Booking</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Bookings ({bookings.meta.total})
                        </PageHeading.Title>
                    </PageHeading>
                    <div className="grid gap-4 grid-cols-1">
                        <RTable
                            data={bookings.data}
                            columns={extendedColumn}
                            searchColumns={["full_name"]}
                            // exportable
                            paginationLinks={bookings.links}
                            meta={bookings.meta}
                        />
                    </div>
                </div>
            </ScrollArea>

            <Dialog open={openFormDialog} onOpenChange={openFormDialogSet}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rate and Review</DialogTitle>
                        <DialogDescription>Rate and Review</DialogDescription>
                    </DialogHeader>
                    <RatingForm
                        bookingData={openFormDialog.bookingData}
                        openFormDialogSet={openFormDialogSet}
                    />
                </DialogContent>
            </Dialog>
        </UserAuthLayout>
    );
}
