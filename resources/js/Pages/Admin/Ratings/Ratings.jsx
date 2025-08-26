import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Head, Link } from "@inertiajs/react";
import { Checkbox } from "@/shadcn/ui/checkbox";
import RTable from "@/Components/RTable";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import PageHeading from "@/Components/PageHeading";
import { formatDate } from "date-fns";
import { Badge } from "@/shadcn/ui/badge";
import { GraduationCap, User } from "lucide-react";
import { formatEnum } from "@/Helpers/GlobalFunctions";

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
        accessorKey: "value",
        header: "Rating",
        cell: ({ row }) => (
            <div className="whitespace-nowrap">
                <p className="text-sm mb-1">
                    <Link
                        className="text-blue-500"
                        href={route(
                            "admin.courses.view",
                            row.original?.rateable?.id
                        )}
                    >
                        <strong>{row.original?.user?.full_name}</strong>{" "}
                    </Link>{" "}
                    rated {row.getValue("value")} stars
                </p>
                <div className="flex gap-0.5">
                    {[...Array(row.getValue("value"))].map((_, index) => (
                        <div
                            className="p-1 bg-yellow-500 rounded"
                            key={`rating-${index}`}
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
        ),
    },
    {
        accessorKey: "rating_type",
        header: "Rated to",
        cell: ({ row }) => {
            return (
                <div>
                    <div className="flex gap-x-2 border-b border-dashed whitespace-nowrap">
                        <p>Rated to:</p>
                        <strong className="capitalize">
                            {row.original?.rateable_type ===
                            "App\\Models\\MentorProfile"
                                ? "Mentor"
                                : "Course"}
                        </strong>
                    </div>

                    {row.original?.rateable_type ===
                        "App\\Models\\MentorProfile" && (
                        <Link
                            className="text-blue-500"
                            href={route(
                                "admin.mentor-profiles.edit",
                                row.original?.rateable?.id
                            )}
                        >
                            <div className="flex gap-x-2 items-center">
                                <User className="h-4 w-4" />
                                <strong className="capitalize">
                                    {row.original?.rateable?.full_name}
                                </strong>
                            </div>
                        </Link>
                    )}
                    {row.original?.rateable_type === "App\\Models\\Course" && (
                        <Link
                            className="text-blue-500"
                            href={route(
                                "admin.courses.view",
                                row.original?.rateable?.id
                            )}
                        >
                            <div className="flex gap-x-2 items-center mb-1">
                                <GraduationCap className="h-4 w-4" />
                                <strong className="capitalize">
                                    {row.original?.rateable?.title}
                                </strong>
                            </div>
                            {row.original?.rateable?.type && (
                                <Badge>
                                    {formatEnum(row.original?.rateable?.type)}
                                </Badge>
                            )}
                        </Link>
                    )}
                </div>
            );
        },
    },

    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge
                className={
                    row.original.approved_by_user_id !== null
                        ? "text-green-500 bg-green-100 border-green-500 hover:bg-green-200"
                        : "text-red-500 bg-red-100 border-red-500 hover:bg-red-200"
                }
            >
                {row.original.approved_by_user_id !== null
                    ? "Approved"
                    : "Rejected"}
            </Badge>
        ),
    },
    {
        accessorKey: "description",
        header: "Message",
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => (
            <div>
                {formatDate(row.getValue("created_at"), "dd MMM, yyyy h:mm a")}
            </div>
        ),
    },
];

export default function Ratings({ ratings }) {
    return (
        <AuthenticatedLayout>
            <Head>
                <title>Ratings</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Ratings ({ratings.meta.total})
                        </PageHeading.Title>
                    </PageHeading>
                    <div className="grid gap-4 grid-cols-1">
                        <RTable
                            data={ratings.data}
                            columns={columns}
                            searchColumns={["created_at"]}
                            paginationLinks={ratings.links}
                            meta={ratings.meta}
                        />
                    </div>
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}
