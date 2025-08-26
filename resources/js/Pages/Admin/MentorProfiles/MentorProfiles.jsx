import { Button } from "@/shadcn/ui/button";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Head, Link, router } from "@inertiajs/react";
import { ArrowUpDown, Eye, Pencil } from "lucide-react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/shadcn/ui/hover-card";
import { ShieldAlertIcon, VerifiedIcon } from "lucide-react";
import { Checkbox } from "@/shadcn/ui/checkbox";
import RTable from "@/Components/RTable";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import PageHeading from "@/Components/PageHeading";
import Can from "@/Components/Can";
// import DeleteMentor from "@/Components/DeleteMentor";
import { Badge } from "@/shadcn/ui/badge";
import { Input } from "@/shadcn/ui/input";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { formatDate } from "date-fns";
// import { formatDate } from "date-fns";

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
        accessorKey: "full_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="gap-x-2"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <ArrowUpDown size={16} />
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <div className="flex items-center gap-x-1">
                {getValue() || "NA"}
            </div>
        ),
    },
    {
        accessorKey: "alias_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="gap-x-2"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Alias Name
                    <ArrowUpDown size={16} />
                </Button>
            );
        },
        cell: ({ getValue }) => (
            <div className="flex items-center gap-x-1">
                {getValue() || "NA"}
            </div>
        ),
    },
    {
        accessorKey: "user",
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
        cell: ({ getValue }) => {
            const user = getValue(); // getValue() already returns row.original.user

            return (
                <div className="flex items-center gap-x-1">
                    {user?.email}
                    {user?.email_verified_at ? (
                        <VerifiedIcon className="text-green-600 h-4 w-4" />
                    ) : (
                        <ShieldAlertIcon className="text-red-600 h-4 w-4" />
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "phone",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="gap-x-2"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Phone
                    <ArrowUpDown size={16} />
                </Button>
            );
        },
        // cell: ({ getValue }) => (
        //     <div className="flex items-center gap-x-1">
        //         {getValue().phonne || "NA"}
        //     </div>
        // ),
        cell: ({ getValue }) => {
            return getValue() || "NA";
        },
    },
    {
        header: "Courses",
        cell: ({ row }) => <Badge>{row.original.courses_count}</Badge>,
    },
    {
        accessorKey: "mentor.tags.name",
        header: "Tags",
        cell: ({ row }) => (
            <>
                {row.original.topic_tags &&
                    row.original.topic_tags.length > 0 && (
                        <HoverCard>
                            <HoverCardTrigger className="underline whitespace-pre inline-block cursor-pointer">
                                View Tags
                            </HoverCardTrigger>
                            <HoverCardContent>
                                {row.original.topic_tags.map((r, i) => (
                                    <Badge
                                        variant="default"
                                        className={"mb-1 mr-1"}
                                        key={i}
                                    >
                                        {r.title}
                                    </Badge>
                                ))}
                            </HoverCardContent>
                        </HoverCard>
                    )}
                {row.original.topic_tags.length === 0 && (
                    <span className="text-sm text-gray-500">No tags</span>
                )}
            </>
        ),
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
                    Account Status
                    <ArrowUpDown size={16} />
                </Button>
            );
        },
        cell: ({ getValue }) => {
            const status = getValue();
            return (
                <Badge variant={status ? "success" : "destructive"}>
                    {status ? "Active" : "Inactive"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue();
            return (
                <div
                    className={` w-20 text-center py-0.5 rounded-xl text-xs border font-semibold ${
                        status == "APPROVED"
                            ? "text-green-500 bg-green-100 border-green-500 hover:bg-green-200"
                            : status == "PENDING"
                              ? "text-orange-500 bg-orange-100 border-orange-500 hover:bg-orange-200"
                              : "text-red-500 bg-red-100 border-red-500 hover:bg-red-200"
                    }`}
                >
                    {status}
                </div>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="gap-x-2"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Created At
                    <ArrowUpDown size={16} />
                </Button>
            );
        },
        cell: ({ getValue }) => {
            return (
                <div className="flex items-center gap-x-1">
                    {formatDate(new Date(getValue()), "dd MMM, yyyy h:mm a")}
                </div>
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
                    <Can permit="edit mentors">
                        <Button asChild variant="outline" size="icon">
                            <Link
                                href={route(
                                    "admin.mentor-profiles.edit",
                                    row.original.id,
                                )}
                            >
                                <Eye className="h-4 w-4" />
                            </Link>
                        </Button>
                    </Can>
                    {/* <DeleteMentor id={row.original.id} /> */}
                </div>
            );
        },
    },
];

export default function MentorProfiles({ mentorProfiles }) {
    const queryParams = new URLSearchParams(window.location.search);
    const searchParam = queryParams.get("search");
    const [search, setSearch] = useState(searchParam);

    useEffect(() => {
        setSearch(searchParam);
    }, [searchParam]);

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Mentors</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Mentors ({mentorProfiles?.data?.length})
                        </PageHeading.Title>
                        <PageHeading.Actions>
                            <Can permit="create mentors">
                                {/* <Button asChild>
                                    <Link
                                        href={route(`admin.users.create`, {
                                            role_type: "mentor",
                                        })}
                                    >
                                        Add Mentor
                                    </Link>
                                </Button> */}
                            </Can>
                            <form
                                className="flex items-center gap-x-2"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    router.visit(
                                        route("admin.mentor-profiles.index", {
                                            search,
                                        }),
                                    );
                                }}
                            >
                                <Input
                                    type="search"
                                    placeholder="Search"
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    value={search}
                                />
                                <Button type="submit">
                                    <MagnifyingGlassIcon />
                                </Button>
                            </form>
                        </PageHeading.Actions>
                    </PageHeading>
                    <div className="grid gap-4 grid-cols-1">
                        <RTable
                            data={mentorProfiles.data}
                            columns={columns}
                            searchColumns={["email", "full_name", "phone"]}
                            paginationLinks={mentorProfiles.links}
                            meta={mentorProfiles.meta}
                            exportable={true}
                            filename={`Mentors_${new Date().toJSON()}`}
                            selectFilters={[
                                {
                                    columnId: "status",
                                    options: ["active", "inactive", "pending"],
                                    placeholder: "Filter Status",
                                },
                            ]}
                        />
                    </div>
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}
