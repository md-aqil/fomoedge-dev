import React from "react";
import { Head } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shadcn/ui/dialog";
import { Pencil, PlusCircle } from "lucide-react";
import { Checkbox } from "@/shadcn/ui/checkbox";
import RTable from "@/Components/RTable";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import PageHeading from "@/Components/PageHeading";
import { Badge } from "@/shadcn/ui/badge";
import TaxForm from "./TaxForm";

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
        header: "Rate",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("value")}</div>
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

export default function Taxes({ taxes }) {
    const [openFormDialog, openFormDialogSet] = React.useState(false);

    const extendedColumns = [
        ...columns,
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
                                openFormDialogSet({
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
                <title>Taxes</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>Taxes</PageHeading.Title>
                        <PageHeading.Actions>
                            <Button
                                onClick={() => {
                                    openFormDialogSet(true);
                                }}
                            >
                                <PlusCircle className="mr-2 h-4 w-4" /> Add New
                                Tax
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
            </ScrollArea>

            <Dialog open={openFormDialog} onOpenChange={openFormDialogSet}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {openFormDialog.taxData ? "Edit" : "Add New"} Tax
                            Rate
                        </DialogTitle>
                        {openFormDialog.taxData && (
                            <DialogDescription>
                                You can only update tax Status.
                            </DialogDescription>
                        )}
                    </DialogHeader>
                    <TaxForm
                        openFormDialogSet={openFormDialogSet}
                        taxData={openFormDialog.taxData}
                    />
                    <DialogFooter>
                        <Button
                            variant={"destructive"}
                            onClick={() => openFormDialogSet(false)}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
