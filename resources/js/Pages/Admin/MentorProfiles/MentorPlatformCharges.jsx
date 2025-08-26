import React from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/shadcn/ui/sheet";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import InputError from "@/Components/InputError";

export default function MentorPlatformCharges({
    open,
    setOpen,
    plateFormFees,
    taxes,
    id,
    mentorProfile,
}) {
    const { data, setData, post, errors } = useForm({
        tax_id: mentorProfile?.tax_id || "",
        platform_fee_id: mentorProfile?.platform_fee_id || "",
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("admin.mentor-profiles.update", { id }), {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add Platform Charges</SheetTitle>
                    <SheetDescription>
                        Make changes to your mentor platform charges here. Click
                        save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={(e) => submit(e)}>
                    <div className="grid gap-4 pt-10">
                        <div>
                            <InputLabel
                                htmlFor="value"
                                value={"Platform Fee"}
                                isRequired
                                additionalInfo=""
                            />
                            <Select
                                value={`${data?.platform_fee_id}`}
                                onValueChange={(value) =>
                                    setData("platform_fee_id", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Platform Fee" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {plateFormFees &&
                                            plateFormFees?.map((fee, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={`${fee?.id}`}
                                                >
                                                    {fee?.title}
                                                </SelectItem>
                                            ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.platform_fee_id}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="value"
                                value={"Taxes"}
                                isRequired
                                additionalInfo=""
                            />
                            <Select
                                value={`${data?.tax_id}`}
                                onValueChange={(value) =>
                                    setData("tax_id", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Tax" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {taxes &&
                                            taxes?.map((fee, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={`${fee?.id}`}
                                                >
                                                    {fee?.title}
                                                </SelectItem>
                                            ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.tax_id}
                                className="mt-2"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4"></div>
                    </div>
                    <div className="flex justify-end">
                        {" "}
                        <Button type="submit">Save changes</Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}
