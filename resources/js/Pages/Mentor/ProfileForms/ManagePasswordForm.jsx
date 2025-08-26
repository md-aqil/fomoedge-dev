import React from "react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import { Input } from "@/shadcn/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import InputError from "@/Components/InputError";

export default function ManagePasswordForm() {
    const [inputType, setInputType] = React.useState("password");
    const [inputType2, setInputType2] = React.useState("password");
    const { data, setData, post, errors } = useForm({
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        try {
            post(route("mentors.profile.update.password"));
            reset();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form onSubmit={submit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                <div className="relative">
                    <InputLabel isRequired value="New Password" />
                    <Input
                        type={inputType}
                        name="password"
                        id="password"
                        className="mt-1"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                    <div className="absolute top-[36px] right-2">
                        {inputType === "password" ? (
                            <EyeOff
                                size={20}
                                className="cursor-pointer"
                                onClick={() => setInputType("text")}
                            />
                        ) : (
                            <Eye
                                size={20}
                                className="cursor-pointer"
                                onClick={() => setInputType("password")}
                            />
                        )}
                    </div>
                </div>
                <div className="relative">
                    <InputLabel isRequired value="Confirm Password" />
                    <Input
                        type={inputType2}
                        name="password_confirmation"
                        id="password_confirmation"
                        className="mt-1"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                    <div className="absolute top-[36px] right-2">
                        {inputType2 === "password" ? (
                            <EyeOff
                                size={20}
                                className="cursor-pointer"
                                onClick={() => setInputType2("text")}
                            />
                        ) : (
                            <Eye
                                size={20}
                                className="cursor-pointer"
                                onClick={() => setInputType2("password")}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center gap-2 pt-8">
                <Button
                    disabled={
                        data?.password_confirmation?.length > 0 ? false : true
                    }
                    type="submit"
                >
                    Update Password
                </Button>
            </div>
        </form>
    );
}
