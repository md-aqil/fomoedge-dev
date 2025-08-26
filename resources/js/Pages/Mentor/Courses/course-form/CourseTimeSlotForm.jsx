import { Input } from "@/shadcn/ui/input";
import { format, parse } from "date-fns";
import React from "react";
import InputError from "@/Components/InputError";
import { Button } from "@/shadcn/ui/button";
import LoadingButton from "@/Components/LoadingButton";
import { usePage } from "@inertiajs/react";
import { MinusCircleIcon } from "lucide-react";
import { formatDate } from "date-fns";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";

export default function CourseTimeSlotForm({
    course,
    timeSlot,
    data,
    setData,
    errors,
}) {
    const { post, processing, reset, clearErrors } = useForm(data);

    const userRoles = usePage().props.auth.userRoles;
    const [openModal, setOpenModal] = React.useState(false);
    const [deleteTimeSlotId, setDeleteTimeSlotId] = React.useState(null);
    const deleteTimeSlot = () => {
        post(
            route(`mentors.courses.timings.delete`, {
                courseId: course.id,
                id: deleteTimeSlotId.id,
            }),
            {
                onSuccess: () => {
                    // setData(
                    //     "timings",
                    //     data.timings.filter(
                    //         (val) => val.id !== deleteTimeSlotId.id
                    //     )
                    // );
                    setOpenModal(false);
                },
            }
        );
    };

    return (
        <div className="space-y-4">
            {data &&
                data?.timings?.map((item, index) => (
                    <div key={index}>
                        <div
                            key={index}
                            className="flex justify-between items-center gap-2"
                        >
                            <input type="hidden" name="id" value={item?.id} />
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2">
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="value"
                                        value={"Start Date"}
                                        isRequired
                                    />
                                    <input
                                        type="date"
                                        value={item.start_date}
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                        onChange={(e) => {
                                            setData(
                                                "timings",
                                                data.timings.map((val, i) =>
                                                    i === index
                                                        ? {
                                                              ...val,
                                                              start_date:
                                                                  e.target
                                                                      .value,
                                                          }
                                                        : val
                                                )
                                            );
                                        }}
                                        placeholder="Start Date"
                                        className="border p-2 rounded w-full text-sm"
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="value"
                                        value={"End Date"}
                                    />
                                    <input
                                        type="date"
                                        value={item.end_date}
                                        min={
                                            data.start_date ??
                                            item.start_date ??
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                        onChange={(e) => {
                                            setData(
                                                "timings",
                                                data.timings.map((val, i) =>
                                                    i === index
                                                        ? {
                                                              ...val,
                                                              end_date:
                                                                  e.target
                                                                      .value,
                                                          }
                                                        : val
                                                )
                                            );
                                        }}
                                        placeholder="End Date"
                                        className="border p-2 rounded w-full text-sm"
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="value"
                                        value={"Start Time"}
                                        isRequired
                                    />
                                    <input
                                        type="time"
                                        value={`${data.timings[index].start_time}`}
                                        onChange={(e) => {
                                            let timeFormat =
                                                e.target.value + ":00";
                                            setData(
                                                "timings",
                                                data.timings.map((val, i) =>
                                                    i === index
                                                        ? {
                                                              ...val,
                                                              start_time:
                                                                  timeFormat,
                                                          }
                                                        : val
                                                )
                                            );
                                        }}
                                        placeholder="Start Time"
                                        className="border p-2 rounded w-full text-sm"
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="value"
                                        value={"End Time"}
                                    />
                                    <input
                                        type="time"
                                        value={item.end_time}
                                        onChange={(e) => {
                                            let timeFormat =
                                                e.target.value + ":00";
                                            setData(
                                                "timings",
                                                data.timings.map((val, i) =>
                                                    i === index
                                                        ? {
                                                              ...val,
                                                              end_time:
                                                                  timeFormat,
                                                          }
                                                        : val
                                                )
                                            );
                                        }}
                                        placeholder="End Time"
                                        className="border p-2 rounded w-full text-sm"
                                    />
                                </div>
                            </div>
                            <div className="self-end">
                                {/* <div>&nbsp;</div> */}

                                <Button
                                    className="self-end"
                                    type="button"
                                    onClick={() => {
                                        if (course && item?.id) {
                                            setOpenModal(true);
                                            setDeleteTimeSlotId(item);
                                        } else {
                                            setData(
                                                "timings",
                                                data.timings.filter(
                                                    (val, i) => i !== index
                                                )
                                            );
                                        }
                                    }}
                                    size="icon"
                                    variant="destructive"
                                >
                                    <MinusCircleIcon size={18} />
                                </Button>
                            </div>
                        </div>
                        <div
                            key={index}
                            className="flex justify-between gap-x-2 mt-2"
                        >
                            <input type="hidden" name="id" value={item?.id} />
                            <div className="w-full">
                                {errors[`timings.${index}.start_date`] && (
                                    <InputError
                                        message={
                                            errors[
                                                `timings.${index}.start_date`
                                            ]
                                        }
                                    />
                                )}
                            </div>
                            <div className="w-full">
                                {errors[`timings.${index}.start_time`] && (
                                    <InputError
                                        message={
                                            errors[
                                                `timings.${index}.start_time`
                                            ]
                                        }
                                    />
                                )}
                            </div>
                            <div className="w-full"></div>
                            <div className="w-full"></div>
                            <div className="self-end"></div>
                        </div>
                    </div>
                ))}

            <Modal
                show={openModal}
                maxWidth={"lg"}
                onClose={() => setOpenModal(false)}
            >
                <div className="p-6 space-y-4">
                    <h1 className="text-lg font-semibold">
                        Delete This Slot:{" "}
                        <span className="text-gray-500 text-md font-semibold">
                            (
                            {`${deleteTimeSlotId?.start_date} To ${deleteTimeSlotId?.end_date}`}
                            )
                        </span>
                    </h1>
                    <p className="text-sm text-gray-600">
                        Are you sure you want to delete this time slot?
                    </p>
                    <div className="flex justify-end gap-x-2">
                        <Button
                            type="button"
                            onClick={() => setOpenModal(false)}
                            variant=""
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={() => deleteTimeSlot()}
                            variant="destructive"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
