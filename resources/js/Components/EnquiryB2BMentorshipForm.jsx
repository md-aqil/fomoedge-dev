import { Label } from "@/shadcn/ui/label";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import LoadingButton from "./LoadingButton";
import InputLabel from "./InputLabel";

export default function EnquiryB2BMentorshipForm() {
    const { b2BMentorshipFormData } = usePage().props;
    const { post, processing, errors, data, setData, reset } = useForm({
        first_name: "",
        last_name: "",
        company_email: "",
        company_name: "",
        comapany_phone: "",
        notes: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("b2b-mentorship.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form onSubmit={submit}>
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label>Your First Name</Label>
                        <Input
                            type="text"
                            name="first_name"
                            value={data.first_name}
                            onChange={(e) =>
                                setData("first_name", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <Label>Your Last Name</Label>
                        <Input
                            type="text"
                            name="last_name"
                            value={data.last_name}
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label>Company Name</Label>
                        <Input
                            type="text"
                            name="company_name"
                            value={data.company_name}
                            onChange={(e) =>
                                setData("company_name", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <Label>Company Phone</Label>
                        <Input
                            type="text"
                            name="comapany_phone"
                            value={data.comapany_phone}
                            onChange={(e) =>
                                setData("comapany_phone", e.target.value)
                            }
                        />
                    </div>
                </div>

                <div>
                    <Label>Company Email</Label>
                    <Input
                        type="text"
                        name="company_email"
                        value={data.company_email}
                        onChange={(e) =>
                            setData("company_email", e.target.value)
                        }
                    />
                </div>

                <div>
                    <InputLabel
                        value="Message"
                        additionalInfo="(Mention any details that can help us understand your 
                        company/organization or institutions.)"
                    />

                    <Textarea
                        name="notes"
                        id="notes"
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <LoadingButton
                    loading={processing}
                    type="submit"
                    className="mt-4 ml-auto"
                >
                    Submit
                </LoadingButton>
            </div>
        </form>
    );
}
