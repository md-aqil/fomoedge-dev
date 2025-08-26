import React from "react";
import { useForm } from "@inertiajs/react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group";
import LoadingButton from "@/Components/LoadingButton";

export default function RateForm({ SetOpenDialog, taxData }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: taxData ? taxData.title : "",
        type: taxData ? taxData.type : "",
        value: taxData ? taxData.value : "",
        is_default: taxData ? taxData.is_default : "",
        activated_at: taxData && taxData.activated_at !== null ? 1 : 0,
    });

    const submit = (e) => {
        e.preventDefault();

        const onSuccess = () => {
            reset();
            SetOpenDialog(false);
        };

        if (taxData) {
            post(route("admin.platform-rates.update", { id: taxData.id }), {
                onSuccess: onSuccess,
            });
        } else {
            post(route("admin.platform-rates.store"), {
                onSuccess: onSuccess,
            });
        }
    };

    return (
        <form onSubmit={submit} className="grid space-y-4">
            <div>
                <Label htmlFor="title">Rate Title</Label>
                <Input
                    id="title"
                    type="text"
                    name="title"
                    value={data.title}
                    disabled={taxData ? true : false}
                    autoFocus
                    placeholder="Tax Title..."
                    onChange={(e) => {
                        setData("title", e.target.value);
                    }}
                />

                <InputError message={errors.title} className="mt-2" />
            </div>
            <div className=" bg-slate-50 p-2 border">
                <div>
                    <Label htmlFor="is_default">Rate Type</Label>

                    <RadioGroup
                        className="flex mt-2 gap-x-6 items-center"
                        defaultValue={data?.type}
                        disabled={taxData ? true : false}
                        onValueChange={(v) => {
                            setData("type", v);
                        }}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={"PERCENTAGE"} id="accept" />
                            <Label htmlFor="accept">Percentage %</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={"FIXED"} id="reject" />
                            <Label htmlFor="reject">Fixed</Label>
                        </div>
                    </RadioGroup>
                    <InputError message={errors.is_default} className="mt-2" />
                </div>
            </div>
            <div>
                <Label htmlFor="value">
                    Rate Value{" "}
                    <small>
                        ({" "}
                        {data?.type === "PERCENTAGE"
                            ? "In Percentage "
                            : "Fixed"}
                        )
                    </small>
                </Label>
                <Input
                    className="mt-1 block w-full text-sm h-10"
                    id="value"
                    type="integer"
                    name="value"
                    value={data.value}
                    disabled={taxData ? true : false}
                    placeholder="value..."
                    onChange={(e) => setData("value", e.target.value)}
                />
                <InputError message={errors.value} className="mt-2" />
            </div>
            <div className=" bg-slate-50 p-2 border">
                <div>
                    <Label htmlFor="is_default">Mark As Default</Label>

                    <RadioGroup
                        className="flex mt-2 gap-x-6 items-center"
                        defaultValue={data?.is_default}
                        // disabled={taxData ? true : false}
                        onValueChange={(v) => {
                            setData("is_default", v);
                        }}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={1} id="accept" />
                            <Label htmlFor="accept">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={0} id="reject" />
                            <Label htmlFor="reject">No</Label>
                        </div>
                    </RadioGroup>
                    <InputError message={errors.is_default} className="mt-2" />
                </div>
            </div>
            <div className=" bg-slate-50 p-2 border">
                <div>
                    <Label htmlFor="activated_at">Status</Label>

                    <RadioGroup
                        className="flex mt-2 gap-x-6 items-center"
                        defaultValue={data?.activated_at}
                        onValueChange={(v) => {
                            setData("activated_at", v);
                        }}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={1} id="active_yes" />
                            <Label htmlFor="active_yes">Active</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={0} id="active_no" />
                            <Label htmlFor="active_no">Inactive</Label>
                        </div>
                    </RadioGroup>
                    <InputError
                        message={errors.activated_at}
                        className="mt-2"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <LoadingButton
                    loading={processing}
                    type="submit"
                    disabled={processing}
                    className="w-[260px]"
                >
                    Submit
                </LoadingButton>
            </div>
        </form>
    );
}
