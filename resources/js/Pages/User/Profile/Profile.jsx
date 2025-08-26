import React from "react";
import { Head } from "@inertiajs/react";

import { useForm } from "@inertiajs/react";
import LoadingButton from "@/Components/LoadingButton";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import ShadcnCard from "@/Components/ShadcnCard";
import { Separator } from "@/shadcn/ui/separator";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { TextLarge, TextMuted } from "@/shadcn/ui/text-muted";
import UserAuthLayout from "@/Layouts/UserAuthLayout/UserAuthLayout";

export default function View({ user }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: user ? user.first_name : "",
        last_name: user ? user.last_name : "",
    });

    const submit = (e) => {
        e.preventDefault();

        const onSuccess = () => {
            reset();
        };

        post(route("user.profile.update"), {
            onSuccess: onSuccess,
        });
    };

    return (
        <UserAuthLayout>
            <Head>
                <title>{`Profile`}</title>
            </Head>
            <ShadcnCard title={"Update Profile"}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-100 p-3 rounded-md">
                        <div className="mb-4 grid space-y-4">
                            <TextMuted className="inline-block pt-2">
                                First Name
                            </TextMuted>
                            <TextLarge className={`leading-[0]`}>
                                {user.first_name}
                            </TextLarge>
                        </div>
                        <div className="mb-4 grid space-y-4">
                            <TextMuted className="inline-block pt-2">
                                Last Name
                            </TextMuted>
                            <TextLarge className={`leading-[0]`}>
                                {user.last_name}
                            </TextLarge>
                        </div>
                        <div className="mb-4 grid space-y-4">
                            <TextMuted className="inline-block pt-2">
                                Email
                            </TextMuted>
                            <TextLarge className={`leading-[0]`}>
                                {user.email}
                            </TextLarge>
                        </div>
                    </div>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                type="text"
                                name="first_name"
                                value={data.first_name}
                                // disabled={taxData ? true : false}
                                autoFocus
                                placeholder="Enter First name..."
                                onChange={(e) => {
                                    setData("first_name", e.target.value);
                                }}
                            />

                            <InputError
                                message={errors.first_name}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                id="last_name"
                                type="text"
                                name="last_name"
                                value={data.last_name}
                                autoFocus
                                placeholder="Enter First name..."
                                onChange={(e) => {
                                    setData("last_name", e.target.value);
                                }}
                            />

                            <InputError
                                message={errors.last_name}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={user?.email}
                                disabled
                                autoFocus
                                placeholder="Enter Email..."
                                onChange={(e) => {
                                    setData("email", e.target.value);
                                }}
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex justify-end mt-4 sticky bottom-2">
                            <LoadingButton
                                loading={processing}
                                className="w-[260px]"
                            >
                                Save
                            </LoadingButton>
                        </div>
                    </form>
                </div>
            </ShadcnCard>

            <Separator className="my-4" />
            <UpdatePasswordForm user={user} />
        </UserAuthLayout>
    );
}
