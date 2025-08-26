import { Button } from "@/shadcn/ui/button";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Head, Link } from "@inertiajs/react";
import {
    Eye,
    // ArrowUpDown,
    // ChevronDown,
    // MoreHorizontal,
    Pencil,
    PlusCircle,
    UserRound,
} from "lucide-react";
import { Checkbox } from "@/shadcn/ui/checkbox";
import RTable from "@/Components/RTable";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import PageHeading from "@/Components/PageHeading";
import Can from "@/Components/Can";
// import DeletePackageForm from "@/Components/DeletePackageForm";
import { Badge } from "@/shadcn/ui/badge";
import { usePage } from "@inertiajs/react";
import MentorAuthLayout from "@/Layouts/MentorAuthLayout/MentorAuthLayout";
import { formatEnum } from "@/Helpers/GlobalFunctions";
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
        accessorKey: "title",
        header: "Course",
        cell: ({ row }) => {
            const mentor = row.original.mentor_profile;

            return (
                <>
                    <div className="font-semibold">{row?.original?.title}</div>
                    <p className="text-xs">
                        Type:{" "}
                        <strong className="font-semibold">
                            {formatEnum(row.original.type)}
                        </strong>
                    </p>

                    {row.original.mentor_profile?.full_name !== null && (
                        <p className="text-xs">
                            Created By:{" "}
                            <strong className="font-semibold">
                                {mentor ? mentor.full_name : "N/A"}
                            </strong>
                        </p>
                    )}
                </>
            );
        },
    },

    {
        accessorKey: "price",
        header: "Price Details",
        cell: ({ row }) => (
            <>
                <div className="flex gap-x-1 justify-between border-b border-dashed pb-1 hover:bg-red-50 px-2">
                    <span>Price:</span>{" "}
                    <strong>{row.original?.price?.price}</strong>
                </div>
                {/* <div className="flex gap-x-1 justify-between border-b border-dashed py-1 hover:bg-red-50 px-2">
                    <span>Start Date:</span>{" "}
                    <strong>{row.original.price.start_date_time}</strong>
                </div>
                <div className="flex gap-x-1 justify-between py-1 hover:bg-red-50 px-2">
                    <span>End Date:</span>{" "}
                    <strong>{row.original.price.end_date_time}</strong>
                </div> */}
            </>
        ),
    },

    {
        accessorKey: "special_price_start_datetime",
        header: "Special Price Details",
        cell: ({ row }) => (
            <>
                {row.original?.price ? (
                    <>
                        <div className="flex gap-x-1 justify-between border-b border-dashed pb-1 hover:bg-red-50 px-2">
                            <span>Special Price:</span>{" "}
                            <strong>
                                {row.original?.price?.special_price || "N/A"}
                            </strong>
                        </div>
                        <div className="flex gap-x-1 justify-between border-b border-dashed py-1 hover:bg-red-50 px-2">
                            <span>Start Date:</span>{" "}
                            <strong>
                                {row.original?.price?.special_price_start_at ||
                                    "N/A"}
                            </strong>
                        </div>
                        <div className="flex gap-x-1 justify-between py-1 hover:bg-red-50 px-2">
                            <span>End Date:</span>{" "}
                            <strong>
                                {row.original?.price?.special_price_end_at ||
                                    "N/A"}
                            </strong>
                        </div>
                    </>
                ) : (
                    "NA"
                )}
            </>
        ),
    },
];

export default function Courses({ courses }) {
    const [readOnly, setReadOnly] = React.useState(false);

    const extendedColumn = [
        ...columns,
        {
            id: "actions",
            header: () => <div className="text-right">Actions</div>,
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <div className="flex gap-x-2 justify-end">
                        {/* <Can permit="edit mentor courses"> */}
                        <Button asChild variant="outline" size="icon">
                            <Link
                                href={route(
                                    "mentors.courses.edit",
                                    row.original?.encrypted_id
                                )}
                            >
                                <Pencil className="h-4 w-4" />
                            </Link>
                        </Button>
                        {/* <DeletePackageForm id={row.original.id} /> */}
                        {/* </Can> */}
                        {/* <Button onClick={(e) => setReadOnly(true)}>
                            <Eye className="h-4 w-4 mr-2" /> View
                        </Button> */}
                    </div>
                );
            },
        },
    ];

    return (
        <MentorAuthLayout>
            <Head>
                <title>My Courses</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Courses ({courses.meta.total})
                        </PageHeading.Title>
                        <PageHeading.Actions>
                            <Button asChild>
                                <Link href={route("mentors.courses.create")}>
                                    <PlusCircle className="h-4 w-4 mr-2" />{" "}
                                    Create New
                                </Link>
                            </Button>

                            {/* <Can permit="create mentor courses">
                                <Button asChild>
                                    <Link href={route("mentors.courses.edit")}>
                                        <PlusCircle className="h-4 w-4 mr-2" />{" "}
                                        View
                                    </Link>
                                </Button>
                            </Can> */}
                        </PageHeading.Actions>
                    </PageHeading>

                    <div className="grid gap-4 grid-cols-1">
                        <RTable
                            data={courses.data}
                            columns={extendedColumn}
                            searchColumns={["title"]}
                            paginationLinks={courses.links}
                            meta={courses.meta}
                        />
                    </div>
                </div>
            </ScrollArea>
        </MentorAuthLayout>
    );
}
