import InputError from "@/Components/InputError";
import { Button } from "@/shadcn/ui/button";
import { Label } from "@/shadcn/ui/label";
import { MinusCircleIcon, PlusCircle } from "lucide-react";
import React from "react";
import Can from "@/Components/Can";
import CourseTimeSlotForm from "./CourseTimeSlotForm";
import ShadcnCard from "@/Components/ShadcnCard";
import AvailableSlots from "./AvailableSlots";
import { CardHeader, CardTitle } from "@/shadcn/ui/card";
import { addDays, format } from "date-fns";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Calendar as CalendarIcon } from "lucide-react";
// import { DateRange } from "react-day-picker";

import { cn } from "@/shadcn/utils";
import { Calendar } from "@/shadcn/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import InputLabel from "@/Components/InputLabel";
import { Input } from "@/shadcn/ui/input";

const RecurringSlotsDialog = ({ onAdd, open, onOpenChange }) => {
    const [startTime, startTimeSet] = React.useState("");
    const [endTime, endTimeSet] = React.useState("");
    const [date, setDate] = React.useState({
        from: new Date(),
        to: addDays(new Date(), 20),
    });
    const [everyDay, everyDaySet] = React.useState(-1);
    const [everyMonth, everyMonthSet] = React.useState(0);

    const reset = () => {
        everyDaySet(-1);
        everyMonthSet(0);
        startTimeSet("");
        endTimeSet("");
        setDate({ from: new Date(), to: addDays(new Date(), 20) });
    };

    const createSlotsByDateRangeAndDay = () => {
        let slots = [];
        let currentDate = date.from;
        console.log("everyDay", parseInt(everyDay));
        console.log("everyMonth", everyMonth);
        console.log(currentDate.getDate());
        while (currentDate <= date.to) {
            console.log(currentDate.getDay(), parseInt(everyDay));
            if (everyDay === -2) {
                // Every day in range
                slots.push({
                    start_date: format(currentDate, "yyyy-MM-dd"),
                    start_time: startTime,
                    end_date: format(currentDate, "yyyy-MM-dd"),
                    end_time: endTime,
                });
            } else if (everyDay > -1) {
                if (currentDate.getDay() === parseInt(everyDay)) {
                    slots.push({
                        start_date: format(currentDate, "yyyy-MM-dd"),
                        start_time: startTime,
                        end_date: format(currentDate, "yyyy-MM-dd"),
                        end_time: endTime,
                    });
                }
            } else if (everyMonth !== 0) {
                if (
                    currentDate.getDate() == everyMonth &&
                    currentDate.getMonth() >= date.from.getMonth()
                ) {
                    slots.push({
                        start_date: format(currentDate, "yyyy-MM-dd"),
                        start_time: startTime,
                        end_date: format(currentDate, "yyyy-MM-dd"),
                        end_time: endTime,
                    });
                }
            }
            currentDate = addDays(currentDate, 1);
        }
        onAdd(slots);
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Recurring Slots</DialogTitle>
                    <DialogDescription>
                        Add slots for multiple days at once by selecting a date
                        range and day of the week or month.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <InputLabel>Select Date Range</InputLabel>
                    <div className={cn("grid gap-2")}>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        "w-[300px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground",
                                    )}
                                >
                                    <CalendarIcon />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")}{" "}
                                                - {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="flex gap-4 justify-between items-center">
                    <div className="flex-1">
                        <InputLabel>Every Week on</InputLabel>
                        <Select
                            value={`${everyDay}`}
                            onValueChange={(v) => {
                                everyDaySet(v);
                                everyMonthSet(0);
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Day" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="-1">
                                        Select Day
                                    </SelectItem>
                                    <SelectItem value="0">
                                        Every Sunday
                                    </SelectItem>
                                    <SelectItem value="1">
                                        Every Monday
                                    </SelectItem>
                                    <SelectItem value="2">
                                        Every Tuesday
                                    </SelectItem>
                                    <SelectItem value="3">
                                        Every Wednesday
                                    </SelectItem>
                                    <SelectItem value="4">
                                        Every Thursday
                                    </SelectItem>
                                    <SelectItem value="5">
                                        Every Friday
                                    </SelectItem>
                                    <SelectItem value="6">
                                        Every Saturday
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>Or</div>
                    <div className="flex-1">
                        <InputLabel>Every Month on</InputLabel>
                        <Select
                            value={`${everyMonth}`}
                            onValueChange={(v) => {
                                everyMonthSet(v);
                                everyDaySet(-1);
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Month Date" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="0">
                                        Select Month Date
                                    </SelectItem>
                                    {[...Array(31).keys()].map((i) => (
                                        <SelectItem key={i} value={`${i + 1}`}>
                                            {i + 1}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="everyDayInRange"
                        checked={everyDay === -2}
                        onChange={(e) => {
                            everyDaySet(e.target.checked ? -2 : -1);
                            everyMonthSet(0);
                        }}
                    />
                    <Label htmlFor="everyDayInRange">
                        Every day in Selected date range
                    </Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel
                            htmlFor="startTime"
                            value={"Start Time"}
                            isRequired
                        />
                        <Input
                            id="startTime"
                            name="startTime"
                            type="time"
                            value={`${startTime}`}
                            onChange={(e) => {
                                let timeFormat = e.target.value + ":00";
                                startTimeSet(timeFormat);
                            }}
                            placeholder="Start Time"
                            className="block w-full"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="endTime"
                            value={"End Time"}
                            isRequired
                        />
                        <Input
                            id="endTime"
                            name="endTime"
                            type="time"
                            value={`${endTime}`}
                            onChange={(e) => {
                                let timeFormat = e.target.value + ":00";
                                endTimeSet(timeFormat);
                            }}
                            placeholder="End Time"
                            className="block w-full"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        onClick={createSlotsByDateRangeAndDay}
                    >
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default function TimingInput({ errors, data, setData, course }) {
    const [openRecurringSlogDialog, openRecurringSlogDialogSet] =
        React.useState(false);
    React.useEffect(() => {
        setData(
            "timings",
            course?.timings.map((item) => ({
                start_date: item.start_date,
                start_time: item.start_time,
                end_date: item.end_date,
                end_time: item.end_time,
                id: item.id,
            })) || [],
        );
    }, [course?.timings?.length]);

    return (
        <ShadcnCard
            className="space-y-4"
            title={
                <div className="flex justify-between items-center">
                    <div className="font-semibold">Available Slots</div>
                    <div className="flex items-center space-x-2">
                        <Button
                            type="button"
                            onClick={() => openRecurringSlogDialogSet(true)}
                            variant="outline"
                        >
                            <CalendarIcon size={18} className="mr-2" /> Add
                            Recurring Slots
                        </Button>
                        <RecurringSlotsDialog
                            open={openRecurringSlogDialog}
                            onOpenChange={openRecurringSlogDialogSet}
                            onAdd={(s) => {
                                setData("timings", [...data.timings, ...s]);
                                openRecurringSlogDialogSet(false);
                            }}
                        />
                        <Button
                            type="button"
                            size="icon"
                            onClick={() =>
                                setData("timings", [
                                    ...data.timings,
                                    {
                                        start_date: "",
                                        start_time: "",
                                        end_date: "",
                                        end_time: "",
                                        // id: "",
                                    },
                                ])
                            }
                        >
                            <PlusCircle size={18} />
                        </Button>
                    </div>
                </div>
            }
        >
            {/* <Can permit="create package_time_slots"> */}
            <div>
                <CourseTimeSlotForm
                    data={data}
                    setData={setData}
                    course={course}
                    errors={errors}
                />
            </div>
            {/* </Can> */}
        </ShadcnCard>
    );
}
