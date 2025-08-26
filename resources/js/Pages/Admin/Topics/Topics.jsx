import { Button } from "@/shadcn/ui/button";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Head, Link } from "@inertiajs/react";
import { ArrowUpDown, Pencil, PlusCircle } from "lucide-react";
import { Checkbox } from "@/shadcn/ui/checkbox";
import RTable from "@/Components/RTable";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import PageHeading from "@/Components/PageHeading";
import Can from "@/Components/Can";
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
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="gap-x-2"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <ArrowUpDown size={16} />
                </Button>
            );
        },
    },
    {
        accessorKey: "tags",
        header: "Available Tags",
        cell: ({ row }) => {
            return (
                <div className="flex flex-wrap gap-2">
                    <Badge>{row.original.tags.length}</Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "activated_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="gap-x-2"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Status
                    <ArrowUpDown size={16} />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <Badge
                    variant={
                        row.original.activated_at ? "success" : "destructive"
                    }
                >
                    {row.original.activated_at ? "Active" : "Inactive"}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <div className="text-right">
                    <Can permit="edit topics">
                        <Button asChild variant="outline" size="icon">
                            <Link
                                href={route(
                                    "admin.topics.edit",
                                    row.original.id,
                                )}
                            >
                                <Pencil className="h-4 w-4" />
                            </Link>
                        </Button>
                    </Can>
                </div>
            );
        },
    },
];

export default function Topics({ topics }) {
    return (
        <AuthenticatedLayout>
            <Head>
                <title>Topics</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Topics ({(topics.meta && topics.meta.total) || 0})
                        </PageHeading.Title>
                        <PageHeading.Actions>
                            <Can permit="create topics">
                                <Button asChild>
                                    <Link href={route("admin.topics.create")}>
                                        <PlusCircle className="h-4 w-4 mr-2" />{" "}
                                        Create New
                                    </Link>
                                </Button>
                            </Can>
                        </PageHeading.Actions>
                    </PageHeading>
                    <RTable
                        data={topics.data || []}
                        columns={columns}
                        searchColumns={["title"]}
                        // exportable
                        filename="topics"
                        paginationLinks={topics.links}
                        meta={topics.meta}
                    />
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}
