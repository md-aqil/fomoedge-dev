import React from "react";
import RTable from "@/Components/RTable";
import { useForm } from "@inertiajs/react";
import DeleteAvailableSlot from "./DeleteAvailableSlot";

export default function AvailableSlots({ packages, slogTimes, handleChange }) {
    const { post } = useForm();

    const handleArchive = (e, id) => {
        post(
            route("admin.products.timings.update", {
                id: packages?.id,
                timingId: id,
            })
        );
    };

    const handleDelete = (row) => {
        // After deletion, make sure to fetch the data again to re-arrange the index.
        handleChange();
    };

    const columns = [
        {
            header: "ID",
            accessorFn: (row, index) => index + 1, // Start index from 1
        },
        {
            accessorKey: "start_date",
            header: "Date",
        },
        {
            accessorKey: "start_time",
            header: "Start Time",
        },
        {
            accessorKey: "end_time",
            header: "End Time",
        },
        {
            accessorKey: "end_date",
            header: "End Date",
        },
        {
            header: "Action",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <DeleteAvailableSlot
                        id={row.original.id}
                        onDelete={() => handleDelete(row)}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <RTable
                data={slogTimes}
                columns={columns}
                searchColumns={[]}
                paginationLinks={slogTimes.links}
                meta={slogTimes.meta}
            />
        </>
    );
}
