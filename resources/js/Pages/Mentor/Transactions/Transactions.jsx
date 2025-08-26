import { Button } from "@/shadcn/ui/button";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowUpDown,
    // ChevronDown,
    MoreHorizontal,
    Pencil,
    PlusCircle,
} from "lucide-react";
import { Checkbox } from "@/shadcn/ui/checkbox";
import { format } from "date-fns";

import RTable from "@/Components/RTable";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import PageHeading from "@/Components/PageHeading";
import Can from "@/Components/Can";
import { Eye } from "lucide-react";

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
        accessorKey: "id",
        header: "Order ID / Date",
        cell: ({ row }) => {
            return (
                <div>
                    <span className="font-bold">#{row?.original?.id}</span>
                    <br />
                    <span className="text-gray-500">
                        {row?.original?.created_at &&
                            format(
                                new Date(row?.original?.created_at),
                                "yyyy-MM-dd p"
                            )}
                    </span>
                </div>
            );
        },
    },
    // {
    //     accessorKey: "payment_method_id",
    //     header: "Payment Method",
    //     cell: ({ row }) => {
    //         return <div>{row?.original?.payment_method?.name ?? "NA"}</div>;
    //     },
    // },

    {
        accessorKey: "grand_total_amount",
        header: "Grand Total",
        cell: ({ row }) => {
            return (
                <div>
                    <span className="font-semibold">
                        {row?.original?.payment_gateway_transaction_data
                            ?.currency === "INR"
                            ? "₹"
                            : "$"}
                    </span>
                    &nbsp;
                    {row?.original?.total_amount.toFixed(2)}
                </div>
            );
        },
    },

    {
        accessorKey: "razorpay_payment_id",
        header: "Payment ID",
        cell: ({ row }) => {
            return (
                <div>
                    {row?.original?.payment_gateway_transaction_data
                        ?.razorpay_payment_id ?? "NA"}
                </div>
            );
        },
    },
    {
        accessorKey: "razorpay_payment_link_status",
        header: "Status",
        cell: ({ row }) => {
            const status =
                row?.original?.payment_gateway_transaction_data
                    ?.razorpay_payment_link_status;
            return (
                <div
                    className={` w-20 text-center py-0.5 rounded-xl text-xs border font-semibold ${
                        status == "paid"
                            ? "text-green-500 bg-green-100 border-green-500 hover:bg-green-200"
                            : "text-red-500 bg-red-100 border-red-500 hover:bg-red-200"
                    }`}
                >
                    {status == "paid" ? "Paid" : "Pending"}
                </div>
            );
        },
    },
];

export default function Transactions({ transactions }) {
    return (
        <AuthenticatedLayout>
            <Head>
                <title>Transactions</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Transactions ({transactions.meta.total})
                        </PageHeading.Title>
                        <PageHeading.Actions>
                            {/* <Can permit="export orders">
                                <Button variant="outline">Export</Button>
                            </Can> */}
                        </PageHeading.Actions>
                    </PageHeading>
                    <div className="grid gap-4 grid-cols-1">
                        <RTable
                            data={transactions.data}
                            columns={columns}
                            searchColumns={["id"]}
                            paginationLinks={transactions.links}
                            meta={transactions.meta}
                        />
                    </div>
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}
