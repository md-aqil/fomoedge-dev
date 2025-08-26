import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Input } from "@/shadcn/ui/input";
import { Link, useForm, usePage } from "@inertiajs/react";
import PageLayout from "@/Layouts/PageLayout";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import LoadingButton from "@/Components/LoadingButton";
import { Separator } from "@/shadcn/ui/separator";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ status, canResetPassword }) => {
    const [inputType, setInputType] = useState("password");
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <div className="relative h-screen flex-col items-center justify-center">
            <div className="h-full flex flex-col items-center justify-center">
                <div className="mx-auto mb-4 -mt-28 text-center">
                    <ApplicationLogo className="brightness-100 w-44 text-white text-center" />
                </div>
                <Card className="mx-auto flex w-full flex-col justify-center  sm:w-[350px]">
                    <CardHeader>
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight text-center">
                                Login
                            </h1>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isfocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 relative">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />

                                <Input
                                    id="password"
                                    type={inputType}
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
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
                                            onClick={() =>
                                                setInputType("password")
                                            }
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="block mt-4">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                        Remember me
                                    </span>
                                </label>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}

                                <LoadingButton
                                    type="submit"
                                    loading={processing}
                                    className="ms-4 bg-fomoPrimary-0 hover:bg-fomoPrimary-0 rounded"
                                >
                                    Log in
                                </LoadingButton>
                            </div>
                        </form>
                    </CardContent>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By continuing, you agree to our{" "}
                        <a
                            href="/terms-and-conditions"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a
                            href="/privacy-policy"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                    <Separator className="mt-4" />
                    {/* <p className="text-center py-2 bg-slate-100 font-bold">
                        <Link
                            href={route("register")}
                            className="text-sm text-center text-muted-foreground"
                        >
                            Don't have an account?{" "}
                            <span className="underline underline-offset-4">
                                Register For Mentee
                            </span>
                        </Link>
                    </p> */}
                </Card>
            </div>
        </div>
    );
};

Login.layout = (page) => (
    <PageLayout children={page} title="Log in" metaDescription="Log in" />
);

export default Login;
