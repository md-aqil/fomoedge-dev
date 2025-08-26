import React from "react";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { Textarea } from "@/shadcn/ui/textarea";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { toast } from "sonner";
import LoadingButton from "@/Components/LoadingButton";

export default function ContactForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("contactUsStore"), {
            onSuccess: () => {
                toast.success("Message sent successfully");
                reset();
            },
        });
    };

    return (
        <form onSubmit={submit}>
            <div className="text-3xl font-bold mb-8">Enquiry Form</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="w-full py-6"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
                    <Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="w-full py-6"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>
            </div>
            <Input
                type="number"
                name="phone"
                placeholder="Phone"
                className="w-full py-6 mb-4"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
            />
            <InputError message={errors.phone} className="mt-2" />
            <Textarea
                rows={8}
                name="message"
                placeholder="Message"
                className="w-full"
                value={data.message}
                onChange={(e) => setData("message", e.target.value)}
            />

            <div className="flex mt-6 justify-end">
                <LoadingButton
                    className="px-20 h-12 bg-fomoPrimary-0 border border-transparent hover:bg-fomoSecondary-0 hover:border-fomoSecondary-0 transition-all duration-500"
                    loading={processing}
                    type="submit"
                >
                    SEND
                </LoadingButton>
            </div>
        </form>
    );
}
