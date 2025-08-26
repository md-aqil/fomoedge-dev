import PageHeading from "@/Components/PageHeading";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import React from "react";
import { Head } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { Pencil, PlusCircle } from "lucide-react";
import RTable from "@/Components/RTable";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shadcn/ui/dialog";
import RateForm from "./RateForm";
import Checkbox from "@/Components/Checkbox";
import { Badge } from "@/shadcn/ui/badge";
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
        header: "Title",
        cell: ({ row }) => (
            <div className="capitalize">{row.original.title}</div>
        ),
    },
    {
        accessorKey: "value",
        header: "Rate (rate type)",
        cell: ({ row }) => (
            <div className="capitalize flex items-center gap-1.5">
                <div> {row.getValue("value")}</div>
                <div>
                    ({row.original.type === "PERCENTAGE" ? "%" : "Fixed"})
                </div>
            </div>
        ),
    },
    {
        accessorKey: "activated_at",
        header: "Status",
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    <Badge
                        variant={
                            row.original.activated_at === null
                                ? "destructive"
                                : "success"
                        }
                    >
                        {row.original.activated_at === null
                            ? "Inactive"
                            : "Active"}
                    </Badge>
                </div>
            );
        },
    },
];

export default function PlatformRates({ taxes }) {
    const [openDialog, SetOpenDialog] = React.useState(false);
    const extendedColumns = [
        ...columns,
        {
            accessorKey: "is_default",
            header: "Default",
            cell: ({ row }) => (
                <div className="capitalize">
                    {row.getValue("is_default") ? "Yes" : "No"}
                </div>
            ),
        },
        {
            id: "actions",
            header: () => <div className="text-right">Actions</div>,
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <div className="flex justify-end">
                        <Button
                            variant="outline"
                            className="gap-x-3"
                            onClick={() => {
                                SetOpenDialog({
                                    taxData: row.original,
                                    open: true,
                                });
                            }}
                        >
                            <Pencil className="h-4 w-4" /> Manage Status
                        </Button>
                    </div>
                );
            },
        },
    ];
    return (
        <AuthenticatedLayout>
            <Head>
                <title>PlatformRates</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>Platform Rates</PageHeading.Title>
                        <PageHeading.Actions>
                            <Button
                                onClick={() => {
                                    SetOpenDialog(true);
                                }}
                            >
                                <PlusCircle className="mr-2 h-4 w-4" /> Add New
                                Platform Rate
                            </Button>
                        </PageHeading.Actions>
                    </PageHeading>
                    <div className="grid gap-4 grid-cols-1">
                        <RTable
                            data={taxes.data}
                            columns={extendedColumns}
                            searchColumns={["title"]}
                            paginationLinks={taxes.links}
                            meta={taxes.meta}
                        />
                    </div>
                </div>
            </ScrollArea>{" "}
            <Dialog open={openDialog} onOpenChange={SetOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {openDialog.taxData ? "Edit" : "Add New"} Tax Rate
                        </DialogTitle>
                        {openDialog.taxData && (
                            <DialogDescription>
                                You can only update tax Status.
                            </DialogDescription>
                        )}
                    </DialogHeader>
                    <RateForm
                        SetOpenDialog={SetOpenDialog}
                        taxData={openDialog.taxData}
                    />
                    <DialogFooter>
                        {/* <Button
                            variant={"destructive"}
                            onClick={() => SetOpenDialog(false)}
                        >
                            Close
                        </Button> */}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
