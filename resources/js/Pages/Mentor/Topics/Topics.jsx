import React from "react";
import Can from "@/Components/Can";
import { Head, Link } from "@inertiajs/react";
import { Badge } from "@/shadcn/ui/badge";
import RTable from "@/Components/RTable";
import { Pencil, PlusCircle } from "lucide-react";
import { Checkbox } from "@/shadcn/ui/checkbox";
import PageHeading from "@/Components/PageHeading";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import MentorAuthLayout from "@/Layouts/MentorAuthLayout/MentorAuthLayout";
import { Button } from "@/shadcn/ui/button";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/shadcn/ui/hover-card";

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
    },
    {
        accessorKey: "tags",
        header: "Available Tags",
        cell: ({ row }) => {
            return (
                <div className="flex flex-wrap gap-2">
                    <Badge>{row?.original?.active_tags?.length}</Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "activated_at",
        header: "Status",
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
        accessorKey: "mentor.active_tags",
        header: "Tags",
        cell: ({ row }) => (
            <>
                {row?.original?.active_tags &&
                    row?.original?.active_tags?.length > 0 && (
                        <HoverCard>
                            <HoverCardTrigger className="underline whitespace-pre inline-block cursor-pointer">
                                View Tags
                            </HoverCardTrigger>
                            <HoverCardContent>
                                {row?.original?.active_tags?.map((r, i) => (
                                    <Badge
                                        variant="default"
                                        className={"mb-1 mr-1"}
                                        key={i}
                                    >
                                        {r?.title}
                                    </Badge>
                                ))}
                            </HoverCardContent>
                        </HoverCard>
                    )}
                {row?.original?.active_tags?.length === 0 && (
                    <span className="text-sm text-gray-500">No tags</span>
                )}
            </>
        ),
    },
];
export default function Topics({ topics }) {
    return (
        <MentorAuthLayout>
            <Head>
                <title>Booking Details</title>
            </Head>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <PageHeading>
                    <PageHeading.Title>
                        Topics ({(topics.meta && topics.meta.total) || 0})
                    </PageHeading.Title>
                    <PageHeading.Actions>
                        <Can permit="export topics">
                            <Button variant="outline">Download</Button>
                        </Can>
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
        </MentorAuthLayout>
    );
}
