import { Button } from "@/shadcn/ui/button";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Head, Link } from "@inertiajs/react";
import { Eye } from "lucide-react";
import { Checkbox } from "@/shadcn/ui/checkbox";
import RTable from "@/Components/RTable";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import PageHeading from "@/Components/PageHeading";
import { formatEnum } from "@/Helpers/GlobalFunctions";
import { formatDate } from "date-fns";

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
                <div className="flex gap-x-1 justify-between border-b border-dashed pb-1 hover:bg-red-50 px-2">
                    <span>Type:</span>{" "}
                    <strong>{formatEnum(row.original.course.type)}</strong>
                </div>
                <div className="flex gap-x-1 justify-between border-b border-dashed py-1 hover:bg-red-50 px-2">
                    <span>Created at:</span>{" "}
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
                    <strong>{row.original.special_price ?? "N/A"}</strong>
                </div>
                <div className="flex gap-x-1 justify-between py-1 hover:bg-red-50 px-2">
                    <span>Platform Fee:</span>{" "}
                    <strong>{row.original.platform_fee_amount ?? "N/A"}</strong>
                </div>
            </>
        ),
    },

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
                            href={route("admin.bookings.view", row.original.id)}
                        >
                            <Eye className="h-4 w-4" />
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

export default function Bookings({ bookings }) {
    return (
        <AuthenticatedLayout>
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
                            columns={columns}
                            searchColumns={["full_name", "email"]}
                            // exportable
                            paginationLinks={bookings.links}
                            meta={bookings.meta}
                        />
                    </div>
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}
