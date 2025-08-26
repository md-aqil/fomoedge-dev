import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import LoadingButton from "@/Components/LoadingButton";
import { toast } from "sonner";
import axios from "axios";
import { IndianRupee, MoveRight } from "lucide-react";
import { Textarea } from "@/shadcn/ui/textarea";
import { Badge } from "@/shadcn/ui/badge";
import { formatEnum, userHasRole } from "@/Helpers/GlobalFunctions";

export default function BookingUserForm({
    course,
    slotID,
    calculateCoursePrices,
}) {
    const user = usePage().props.auth.user;
    const isUser = userHasRole("user");
    const [loading, setLoading] = React.useState(false);
    const [errorList, setErrorList] = React.useState([]);

    const { data, setData, post, processing, errors } = useForm({
        mentor_profile_id: course.mentor_profile_id,
        full_name: isUser && user ? user.full_name : "",
        email: isUser && user ? user.email : "",
        phone_number: "",
        note: "",
    });

    const submit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const response = await axios.post(
                route("booking.store", {
                    ...data,
                    courseSlug: course.slug,
                    course_id: course.id,
                    course_timing_id: slotID,
                })
            );

            if (response.data.booking) {
                window.location.href =
                    response.data.booking.create_payment_gateway.short_url;
            }
            if (response.data.status == 200) {
                toast.success(response.data.message);
                setLoading(false);
            }
        } catch (error) {
            setErrorList(error.response.data.errors);
            setLoading(false);
        }
    };

    return (
        <div>
            <form className="p-7 border bg-white" onSubmit={submit}>
                <div className="rounded-2xl">
                    <div className="flex gap-3 items-center text-black">
                        <h1 className="font-semibold text-xl">Order Details</h1>
                    </div>

                    <div className="pt-2 pb-8">
                        <div className="text-black py-4 bg-yellow-50 px-3">
                            <h2 className="font-bold border-b pb-2">
                                {course?.title}
                            </h2>
                            <div className="flex items-center gap-x-3 justify-between w-full border-b py-2">
                                <span className="font-bold">
                                    Payable Amount:
                                </span>
                                <span className="font-bold flex items-center gap-x-1">
                                    <IndianRupee className="w-4 h-4" />
                                    {calculateCoursePrices?.grand_total_amount}
                                    /-
                                </span>
                            </div>
                            <div className="flex items-center gap-x-3 justify-between w-full py-2">
                                <span className="font-bold">Course Type</span>
                                <Badge
                                    variant={"outline"}
                                    className={"bg-white"}
                                >
                                    {formatEnum(course?.type)}
                                </Badge>
                            </div>

                            <div className="text-xs pt-1">
                                <small>Description</small>
                                <p>{course?.excerpt}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <InputLabel htmlFor="full_name" value="Your Name" />
                        <TextInput
                            id="full_name"
                            name="full_name"
                            value={data.full_name}
                            placeholder="Enter your name"
                            className="mt-1 block w-full p-2 border text-sm"
                            isFocused={true}
                            onChange={(e) =>
                                setData("full_name", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errorList?.full_name}
                            className="mt-1"
                        />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            name="email"
                            value={data.email}
                            placeholder="Enter your email"
                            className="mt-1 block w-full p-2 border text-sm"
                            autoComplete="email"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <InputError
                            message={errorList?.email}
                            className="mt-1"
                        />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="phone_number" value="Phone No" />
                        <TextInput
                            id="phone_number"
                            type="phone"
                            name="phone_number"
                            value={data.phone_number}
                            placeholder="Enter your phone no."
                            className="mt-1 block w-full p-2 border text-sm"
                            autoComplete="username"
                            onChange={(e) =>
                                setData("phone_number", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errorList?.phone_number}
                            className="mt-1"
                        />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="note" value="Additional Note" />
                        <Textarea
                            id="note"
                            type="phone"
                            name="note"
                            value={data.note}
                            placeholder="Additional note.."
                            autoComplete="username"
                            onChange={(e) => setData("note", e.target.value)}
                            required
                        />
                        <InputError
                            message={errorList?.note}
                            className="mt-1"
                        />
                    </div>
                </div>
                <div className="flex justify-end ml-auto">
                    <LoadingButton
                        loading={loading}
                        type="submit"
                        className="py-6 hover:bg-[#edca58] active:bg-[#edca58] bg-[#ffd858] text-black mt-8 ring-1 rounded"
                        disabled={loading}
                        onClick={(e) => {
                            submit(e);
                        }}
                    >
                        Proceed to Payment
                        <MoveRight className="w-5 h-5 ml-2" />
                    </LoadingButton>
                </div>
            </form>
        </div>
    );
}
