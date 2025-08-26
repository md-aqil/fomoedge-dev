import { useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";

import TextInput from "@/Components/TextInput";

export default function NewsLetterForm() {
    const [email, setEmail] = React.useState("");
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("newsletters.subscribe"), {
            onSuccess: () => {
                toast.success("Newsletter Subscribed successfully!");
                setEmail("");
            },
            onError: (error) => {
                toast.error(error.email);
                setEmail("");
            },
        });
        setEmail("");
    };
    return (
        <div className="bg-fomoPrimary-0 from-unoDark to-uno  font-[sans-serif] px-6">
            <div className="grid md:grid-cols-2 items-center sm:gap-8 max-w-7xl mx-auto py-6">
                <div className="flex justify-start items-center text-center gap-3">
                    <h6 className="sm:text-2xl text-xl text-gray-800 mb-1">
                        Subscribe to Our
                    </h6>
                    <h3 className="sm:text-5xl text-3xl font-semibold ">
                        Newsletter
                    </h3>
                </div>
                <form
                    onSubmit={submit}
                    className="bg-gray-100 flex px-2 py-1 rounded-full"
                >
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setData("email", e.target.value);
                            setEmail(e.target.value);
                        }}
                        placeholder="Enter your email"
                        className="w-full outline-none bg-transparent text-sm text-[#333] px-4 py-3"
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-l hover:bg-gradient-to-r from-slate-900 to-slate-700 transition-all text-white font-semibold text-sm rounded-full px-8 py-3"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
