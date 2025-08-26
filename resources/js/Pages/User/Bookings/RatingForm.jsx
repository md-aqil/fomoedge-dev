import React from "react";
import InputError from "@/Components/InputError";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/shadcn/ui/select";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Textarea } from "@/shadcn/ui/textarea";
import { formatEnum } from "@/Helpers/GlobalFunctions";

export default function RatingForm({ bookingData, openFormDialogSet }) {
    const userID = usePage().props.auth.user.id;
    const { data, setData, post, processing, errors, reset } = useForm({
        type: "courses",
        model_id: null,
        user_id: userID,
        booking_id: bookingData && bookingData.id,
        title: "",
        description: "",
        value: "",
    });

    React.useEffect(() => {
        const modelId =
            data.type === "courses"
                ? bookingData?.course_id
                : bookingData?.mentor_profile_id;

        setData("model_id", modelId);
    }, [data.type, bookingData]);

    const submit = (e) => {
        e.preventDefault();
        const routeName = "user.ratings.store";

        post(route(routeName), {
            onSuccess: () => {
                reset();
                openFormDialogSet(false);
            },
            onError: (errors) => {
                toast.error(
                    errors.title ||
                        errors.type ||
                        "An error occurred while submitting the form."
                );
            },
        });
    };

    return (
        <form onSubmit={submit}>
            <div className="mb-4">
                <Label htmlFor="type">Type</Label>
                <RadioGroup
                    name="type"
                    value={`${data.type}`}
                    onValueChange={(value) => setData("type", value)}
                    className="flex gap-x-4 mt-2"
                >
                    <Label
                        htmlFor="isCourse"
                        className={`flex items-center space-x-2 ${
                            bookingData?.course_rating !== null
                                ? "bg-slate-100"
                                : "bg-zinc-50 text-opacity-15"
                        }  p-2 w-full border rounded`}
                    >
                        <RadioGroupItem
                            value="courses"
                            id="isCourse"
                            aria-label="Active"
                            disabled={bookingData?.course_rating !== null}
                        />
                        <span>Course</span>
                    </Label>

                    <Label
                        htmlFor="isMentor"
                        className={`flex items-center space-x-2 ${
                            bookingData?.mentor_profile_rating !== null
                                ? "bg-slate-100"
                                : "bg-zinc-50 text-opacity-15"
                        }  p-2 w-full border rounded`}
                    >
                        <RadioGroupItem
                            value="mentor_profiles"
                            id="isMentor"
                            aria-label="Mentor"
                            disabled={
                                bookingData?.mentor_profile_rating !== null
                            }
                        />
                        <span>Mentor</span>
                    </Label>
                </RadioGroup>
                {errors.type && (
                    <InputError message={errors.type} className="mt-2" />
                )}
            </div>

            <div className="mb-4">
                <Label htmlFor="rating">Overall rating</Label>
                <Select
                    value={`${data.value}`}
                    required
                    onValueChange={(value) => {
                        setData("value", value);
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Rating" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Rating</SelectLabel>
                            <SelectItem value="1">
                                <span className="flex items-center">
                                    <Star className="mr-2" size={13} /> 1 Star
                                </span>
                            </SelectItem>
                            <SelectItem value="2">
                                <span className="flex items-center">
                                    <Star className="mr-2" size={13} /> 2 Stars
                                </span>
                            </SelectItem>
                            <SelectItem value="3">
                                <span className="flex items-center">
                                    <Star className="mr-2" size={13} /> 3 Stars
                                </span>
                            </SelectItem>
                            <SelectItem value="4">
                                <span className="flex items-center">
                                    <Star className="mr-2" size={13} /> 4 Stars
                                </span>
                            </SelectItem>
                            <SelectItem value="5">
                                <span className="flex items-center">
                                    <Star className="mr-2" size={13} /> 5 Stars
                                </span>
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <InputError message={errors.value} />
            </div>

            <div className="mb-4">
                <Label htmlFor="title">Add a headline</Label>
                <Input
                    id="title"
                    type="text"
                    name="title"
                    value={data.title}
                    autoFocus
                    className="mt-1 block w-full text-xl h-18"
                    placeholder="Enter Title"
                    onChange={(e) => {
                        setData("title", e.target.value);
                    }}
                />
                {errors.title && (
                    <InputError message={errors.title} className="mt-2" />
                )}
            </div>

            <div>
                <Label htmlFor="description">Write your review</Label>
                <Textarea
                    id="description"
                    type="text"
                    name="description"
                    value={data.description}
                    autoFocus
                    className="mt-1 block w-full"
                    placeholder={`Enter your review for ${formatEnum(
                        data.type
                    )}...`}
                    onChange={(e) => {
                        setData("description", e.target.value);
                    }}
                />
                {errors.description && (
                    <InputError message={errors.description} className="mt-2" />
                )}
            </div>

            <div className="flex justify-end mt-6">
                <Button
                    type="submit"
                    className="w-[260px]"
                    disabled={processing}
                >
                    {processing ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
}
