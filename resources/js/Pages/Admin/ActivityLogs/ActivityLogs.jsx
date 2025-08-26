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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import RTable from "@/Components/RTable";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import PageHeading from "@/Components/PageHeading";
import { format } from "date-fns";
import Can from "@/Components/Can";

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
        header: "ID",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "subject_type",
        header: "Subject",
        cell: ({ row }) =>
            row.getValue("subject_type")
                ? row.getValue("subject_type").split("\\").slice(-1)
                : "",
    },
    {
        accessorKey: "subject_id",
        header: "Subject ID",
    },
    {
        accessorKey: "event",
        header: "Event",
    },
    {
        accessorKey: "causer.full_name",
        header: "By User",
        cell: ({ row }) =>
            row.original.causer?.full_name +
            " (#" +
            row.original?.causer_id +
            ")",
    },
    {
        accessorKey: "created_at",
        header: "Timestamp",
        cell: ({ row }) => format(row.original.created_at, "yyyy-MM-dd p"),
    }
];

export default function ActivityLogs({ activityLogs }) {
    return (
        <AuthenticatedLayout>
            <Head>
                <title>Activity Logs</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Activity Logs ({activityLogs.meta.total})
                        </PageHeading.Title>
                        <PageHeading.Actions>
                            <Can permit="export activity logs">
                                <Button variant="outline">Export</Button>
                            </Can>
                        </PageHeading.Actions>
                    </PageHeading>
                    <div className="grid gap-4 grid-cols-1">
                        <RTable
                            data={activityLogs.data}
                            columns={columns}
                            searchColumns={["description"]}
                            paginationLinks={activityLogs.links}
                            meta={activityLogs.meta}
                        />
                    </div>
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}
