import { formatTimeTo12Hour } from "@/Helpers/GlobalFunctions";
import { Button } from "@/shadcn/ui/button";
import { formatDate, format } from "date-fns";
import React, { useState } from "react";

const SloteSelector = ({ timings, setSlotID, onChange }) => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState(null);

    const availableDates = [
        ...new Set(timings.map((timing) => timing.start_date)),
    ];

    // get timings based on selected date
    const filteredTimings = timings.filter(
        (timing) => timing.start_date === selectedDate,
    );

    React.useEffect(() => {
        onChange(selectedTime);
    }, [selectedTime]);

    return (
        <>
            <div className="flex gap-2 flex-wrap max-h-96 overflow-y-scroll">
                {availableDates.map((date) => (
                    <Button
                        key={date}
                        onClick={() => {
                            setSelectedTime(null);
                            setSelectedDate(date);
                        }}
                        className={`p-2 border rounded-md text-center text-black ${
                            selectedDate === date
                                ? "hover:bg-yellow-300 bg-yellow-200 border-yellow-500 "
                                : "bg-slate-50 border-gray-300 hover:border-gray-400 hover:bg-yellow-100"
                        }`}
                    >
                        {/* {date} */}
                        {formatDate(date, "dd MMM, yyyy")}
                    </Button>
                ))}
            </div>

            {/* Time Slot Selector */}
            {selectedDate && (
                <div className="py-8">
                    <h3 className="text-lg font-semibold">Select time</h3>
                    {filteredTimings.length > 0 ? (
                        <div className="flex gap-2 flex-wrap">
                            {filteredTimings.map((timing) => (
                                <Button
                                    key={timing.id}
                                    onClick={() => {
                                        setSelectedTime(`${timing.start_time}`);
                                        setSlotID(timing.id);
                                    }}
                                    className={`p-2 border rounded-md text-center   text-black ${
                                        selectedTime === `${timing.start_time}`
                                            ? "hover:bg-yellow-300 bg-yellow-200 border-yellow-500 "
                                            : "bg-slate-50 border-gray-300 hover:border-gray-400 hover:bg-yellow-100"
                                    }`}
                                >
                                    {/* {new Date(
                                        "2025-01-01 " + timing.start_time,
                                    ).toLocaleTimeString("en-US", {
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                    })} */}
                                    {formatTimeTo12Hour(timing.start_time)}
                                </Button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">
                            No time slots available.
                        </p>
                    )}
                </div>
            )}

            {/* Selected Time */}
            {selectedTime && (
                <div className="mt-4 p-2 bg-blue-50  rounded-md">
                    <p>
                        <strong>Selected Date:</strong>{" "}
                        {formatDate(selectedDate, "dd MMM, yyyy")}
                    </p>
                    <p>
                        <strong>Selected Time Slot:</strong>{" "}
                        {/* {new Date(
                            "2025-01-01 " + selectedTime,
                        ).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                        })} */}
                        {formatTimeTo12Hour(selectedTime)}
                    </p>
                </div>
            )}
        </>
    );
};

export default SloteSelector;
