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
                <p>
                    {`${
                        row.original.first_name ? row.original.first_name : ""
                    } ${
                        row.original.last_name ? row.original.last_name : ""
                    }` || "N/A"}
                </p>
                <p className="text-xs text-muted-foreground">
                    {formatDate(
                        row.original?.created_at,
                        "dd MMM, yyyy h:mm a"
                    )}
                </p>
            </div>
        ),
    },
    {
        accessorKey: "company_name",
        header: "Company Name",
    },
    {
        accessorKey: "company_email",
        header: "Company Email",
    },
    {
        accessorKey: "company_phone_number",
        header: "Company Phone Number",
    },
    {
        accessorKey: "isInterested",
        header: "Is Interested",
        cell: ({ row }) => (row.original.isInterested ? "Yes" : "No"),
    },
    {
        accessorKey: "preferred_modes",
        header: "Preferred Modes",
        cell: ({ row }) => {
            const modes = row?.original?.preferred_modes;
            return Array.isArray(modes) ? modes.join(", ") : "—";
        },
    },
    {
        accessorKey: "interested_institutions",
        header: "Institutions",
        // cell: ({ row }) => row?.original?.interested_institutions,
        cell: ({ row }) => {
            const institutions = row?.original?.interested_institutions;
            return Array.isArray(institutions) ? institutions.join(", ") : "—";
        },
    },
    {
        accessorKey: "minimum_hourly_rate",
        header: "Minimum Hourly Rate (in ₹)",
        cell: ({ row }) => {
            const rates = row?.original?.minimum_hourly_rate;

            if (!Array.isArray(rates)) return "—";

            return (
                <div className="space-y-1">
                    {rates.map((r, index) => (
                        <div key={index}>
                            {r.label} : ₹{r.rate}
                        </div>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: "open_to_long_duration_mentorship",
        header: "Long Duration Mentorship",
        cell: ({ row }) =>
            row.original.open_to_long_duration_mentorship ? "Yes" : "No",
    },

    {
        accessorKey: "email",
        header: "Contact Details",
        cell: ({ row }) => (
            <>
                <div className="flex gap-x-1 items-center border-b border-dashed pb-1 hover:bg-red-50 px-2">
                    <MailIcon className="h-3 w-3 shrink-0" />
                    <strong>{row.original?.user?.email}</strong>
                </div>
                <div className="flex gap-x-1 items-center pb-1 hover:bg-red-50 px-2">
                    <Phone className="h-3 w-3 shrink-0" />
                    <strong>{row.original?.mentor_profile?.phone}</strong>
                </div>
            </>
        ),
    },
];

export default function B2BMentorshipQueries({ b2BMentorshipQueries, type }) {
    const [openModal, setOpenModal] = React.useState(false);
    const [queryData, setQueryData] = React.useState({});

    const extendedColumns = [
        ...columns,
        {
            accessorKey: "about",
            header: "Query",
            cell: ({ row }) =>
                row.original?.about && row.original?.about.length > 200 ? (
                    <>
                        {`${row.original?.about.substring(0, 200)}... `}
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
                    row.original?.about || "N/A"
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
                            B2B Mentorship Queries ({type})
                        </PageHeading.Title>
                    </PageHeading>

                    <div className="grid gap-4 grid-cols-1">
                        <RTable
                            data={b2BMentorshipQueries.data}
                            columns={extendedColumns}
                            searchColumns={["name", "email"]}
                            exportable
                            filename={`B2B Mentorship Queries_${new Date().toJSON()}`}
                            paginationLinks={b2BMentorshipQueries.links}
                            meta={b2BMentorshipQueries.meta}
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
