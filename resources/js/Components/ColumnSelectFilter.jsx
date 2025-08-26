import * as React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";

export default function ColumnSelectFilter({
    column,
    options,
    placeholder = "Filter",
}) {
    const currentValue = column.getFilterValue() ?? "";

    return (
        <Select
            value={currentValue}
            onValueChange={(val) => column.setFilterValue(val)}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={null}>All</SelectItem>
                {options.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
