import { Button } from "@/shadcn/ui/button";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Head, Link } from "@inertiajs/react";
import { Eye, MailIcon, Phone, PhoneIcon, User, XIcon } from "lucide-react";
import Modal from "@/Components/Modal";
import RTable from "@/Components/RTable";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import PageHeading from "@/Components/PageHeading";
import React from "react";
import { formatDate } from "date-fns";
export const columns = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="flex flex-col whitespace-pre">
                <p>{row.original?.name || "N/A"}</p>
                <p className="text-xs text-muted-foreground">
                    {formatDate(
                        row.original?.created_at,
                        "dd MMM, yyyy h:mm a",
                    )}
                </p>
            </div>
        ),
    },

    {
        accessorKey: "email",
        header: "Contact Details",
        cell: ({ row }) => (
            <>
                <div className="flex gap-x-1 items-center border-b border-dashed pb-1 hover:bg-red-50 px-2">
                    <MailIcon className="h-3 w-3 shrink-0" />
                    <strong>{row.original?.email}</strong>
                </div>
                <div className="flex gap-x-1 items-center pb-1 hover:bg-red-50 px-2">
                    <Phone className="h-3 w-3 shrink-0" />
                    <strong>{row.original?.phone}</strong>
                </div>
            </>
        ),
    },
];

export default function ContactQueries({ contactQueries }) {
    const [openModal, setOpenModal] = React.useState(false);
    const [queryData, setQueryData] = React.useState({});

    const extendedColumns = [
        ...columns,
        {
            accessorKey: "message",
            header: "Query",
            cell: ({ row }) =>
                row.original?.message.length > 200 ? (
                    <>
                        {`${row.original?.message.substring(0, 200)}... `}
                        <Button
                            variant="link"
                            className="text-blue-500 underline"
                            onClick={() => {
                                setOpenModal(true);
                                setQueryData(row.original);
                            }}
                        >
                            Read more
                        </Button>
                    </>
                ) : (
                    row.original?.message || "N/A"
                ),
        },
    ];
    return (
        <AuthenticatedLayout>
            <Head>
                <title>All Enquires</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Contact Queries
                            {/* ({contactQueries.meta.total})  */}
                        </PageHeading.Title>
                    </PageHeading>

                    <div className="grid gap-4 grid-cols-1">
                        <RTable
                            data={contactQueries.data}
                            columns={extendedColumns}
                            searchColumns={["name", "email"]}
                            paginationLinks={contactQueries.links}
                            meta={contactQueries.meta}
                        />
                    </div>
                </div>
            </ScrollArea>

            <Modal
                show={openModal}
                maxWidth={"lg"}
                onClose={() => setOpenModal(false)}
            >
                <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-x-2">
                        <User className="h-4 w-4" /> {queryData.name}
                    </h2>
                    <p className="text-gray-600 mt-2 flex items-center gap-x-2">
                        <MailIcon className="h-4 w-4 shrink-0" />
                        {queryData.email}
                    </p>
                    <p className="text-gray-600 mt-2 flex items-center gap-x-2">
                        <PhoneIcon className="h-4 w-4 shrink-0" />
                        {queryData.phone}
                    </p>
                    <div className="text-gray-600 mt-4">
                        <p className="font-medium">Message:</p>{" "}
                        <small>{queryData.message}</small>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        size="icon"
                        onClick={() => setOpenModal(false)}
                        className="absolute top-0 right-0 rounded-full"
                    >
                        <XIcon />
                    </Button>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
