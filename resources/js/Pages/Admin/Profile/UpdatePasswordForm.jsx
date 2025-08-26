import React from "react";
import { useForm } from "@inertiajs/react";
import LoadingButton from "@/Components/LoadingButton";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import ShadcnCard from "@/Components/ShadcnCard";

export default function UpdatePasswordForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        const onSuccess = () => {
            reset();
        };

        post(route("admin.profile.update.password"), {
            onSuccess: onSuccess,
        });
    };

    return (
        <ShadcnCard title={"Update Password"}>
            <form
                onSubmit={submit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
                <div>
                    <Label htmlFor="password">Enter Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoFocus
                        placeholder="Enter password..."
                        onChange={(e) => {
                            setData("password", e.target.value);
                        }}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="password_confirmation">
                        Confirm Password
                    </Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        // disabled={taxData ? true : false}
                        autoFocus
                        placeholder="Confirm password..."
                        onChange={(e) => {
                            setData("password_confirmation", e.target.value);
                        }}
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="col-span-2">
                    <div className="flex justify-end">
                        <LoadingButton
                            loading={processing}
                            className="w-[260px]"
                        >
                            Save
                        </LoadingButton>
                    </div>
                </div>
            </form>
        </ShadcnCard>
    );
}
