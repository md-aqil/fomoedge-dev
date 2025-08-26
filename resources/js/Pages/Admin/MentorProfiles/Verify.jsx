import { Trash } from "lucide-react";
import React from "react";
import { useForm } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import { Button } from "@/shadcn/ui/button";
import ShadcnCard from "@/Components/ShadcnCard";

export default function Verify({
    mentorProfile,
    id,
    onComplete,
    userType,
    mentorProfileStatusEnums,
}) {
    const [open, setOpen] = React.useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        status: mentorProfile ? mentorProfile?.status : "",
    });
    function submit(e) {
        e.preventDefault();
        post(route("admin.mentor-profiles.update", { id }));
    }

    return (
        <ShadcnCard
            title={
                <div className="flex justify-between">
                    <div className="text-xl font-semibold text-gray-800">
                        Manage {userType == "user" ? "User" : "Mentor"}
                    </div>
                    <div
                        className={`text-sm font-bold ${
                            mentorProfile?.status === "APPROVED"
                                ? "text-green-600"
                                : mentorProfile?.status === "PENDING"
                                ? "text-yellow-600"
                                : "text-red-600"
                        }`}
                    >
                        {mentorProfile?.status}
                    </div>
                </div>
            }
        >
            <Select
                value={data.status}
                onValueChange={(e) => {
                    setData("status", e);
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Verify Mentor" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {mentorProfileStatusEnums?.map((item, index) => (
                            <SelectItem key={index} value={item?.value}>
                                {item?.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div className="flex justify-end">
                <Button onClick={submit}>Submit</Button>
            </div>
        </ShadcnCard>
    );
}
