import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import { Checkbox } from "@/shadcn/ui/checkbox";
import { Label } from "@/shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import MultiSelectTopics from "./MultiSelectTopics/MultiSelectTopics";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import LoadingButton from "./LoadingButton";

export default function B2BMentorshipForm() {
    const { b2BMentorshipFormData, mentorProfile } = usePage().props;
    const { post, processing, errors, data, setData, reset } = useForm({
        isInterested: true,
        topic_ids: [],
        topic_tag_ids: [],
        preferred_modes: [b2BMentorshipFormData.preferred_modes[0]],
        interested_institutions: [
            b2BMentorshipFormData.interested_institutions[1],
        ],
        minimum_hourly_rate: b2BMentorshipFormData.minimum_hourly_rate,
        open_to_long_duration_mentorship: true,
        about: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("b2b-mentorship.store"), {
            onSuccess: () => {
                setData({
                    isInterested: true,
                    topic_ids: [],
                    topic_tag_ids: [],
                    preferred_modes: [b2BMentorshipFormData.preferred_modes[0]],
                    interested_institutions: [
                        b2BMentorshipFormData.interested_institutions[1],
                    ],
                    minimum_hourly_rate:
                        b2BMentorshipFormData.minimum_hourly_rate,
                    open_to_long_duration_mentorship: true,
                    about: "",
                });
            },
        });
    };

    return (
        <form onSubmit={submit}>
            <ol className="list-decimal ml-4 space-y-4">
                <li>
                    <Label>Are you interested in B2B mentorship?</Label>
                    <RadioGroup
                        value={data.isInterested}
                        onValueChange={(e) => setData("isInterested", e)}
                        className="flex items-center space-x-2"
                    >
                        {b2BMentorshipFormData.isInterested.map((f) => (
                            <div
                                key={f.value}
                                className="flex items-center space-x-2 bg-slate-50 border py-1.5 px-4 rounded-sm"
                            >
                                <RadioGroupItem value={f.value} id={f.label} />
                                <Label htmlFor={f.label}>{f.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </li>
                <li>
                    <MultiSelectTopics
                        data={data}
                        setData={setData}
                        errors={errors}
                        mentorProfile={mentorProfile}
                    />
                </li>
                <li>
                    <Label>Preferred Mentorship Mode:</Label>
                    <div className="flex items-center space-x-2">
                        {b2BMentorshipFormData.preferred_modes.map((f) => (
                            <div
                                key={f}
                                className="flex items-center space-x-2 bg-slate-50 border py-1.5 px-4 rounded-sm"
                            >
                                <Checkbox
                                    value={f}
                                    id={f}
                                    checked={data.preferred_modes.includes(f)}
                                    onCheckedChange={() => {
                                        if (data.preferred_modes.includes(f)) {
                                            setData(
                                                "preferred_modes",
                                                data.preferred_modes.filter(
                                                    (m) => m != f,
                                                ),
                                            );
                                        } else {
                                            const temp = data.preferred_modes;
                                            temp.push(f);
                                            setData("preferred_modes", temp);
                                        }
                                    }}
                                />
                                <Label htmlFor={f}>{f}</Label>
                            </div>
                        ))}
                    </div>
                </li>
                <li>
                    <Label>Institutions You Are Interested In:</Label>
                    <div className="flex items-center space-x-2">
                        {b2BMentorshipFormData.interested_institutions.map(
                            (f) => (
                                <div
                                    key={f}
                                    className="flex items-center space-x-2 bg-slate-50 border py-1.5 px-4 rounded-sm"
                                >
                                    <Checkbox
                                        value={f}
                                        id={f}
                                        checked={data.interested_institutions.includes(
                                            f,
                                        )}
                                        onCheckedChange={() => {
                                            if (
                                                data.interested_institutions.includes(
                                                    f,
                                                )
                                            ) {
                                                setData(
                                                    "interested_institutions",
                                                    data.interested_institutions.filter(
                                                        (m) => m != f,
                                                    ),
                                                );
                                            } else {
                                                const temp =
                                                    data.interested_institutions;
                                                temp.push(f);
                                                setData(
                                                    "interested_institutions",
                                                    temp,
                                                );
                                            }
                                        }}
                                    />
                                    <Label htmlFor={f}>{f}</Label>
                                </div>
                            ),
                        )}
                    </div>
                </li>
                <li>
                    <Label>Minimum Hourly Rate (in ₹)</Label>
                    <div className="space-y-2">
                        {b2BMentorshipFormData.minimum_hourly_rate.map(
                            (f, i) => (
                                <div
                                    key={f.label}
                                    className="grid grid-cols-3 sm:grid-cols-7 items-center space-x-2"
                                >
                                    <Label htmlFor={f.label}>{f.label}</Label>
                                    <Input
                                        type="text"
                                        className="col-span-2 sm:col-span-3"
                                        name={`minimum_hourly_rate[${i}][rate]`}
                                        value={data.minimum_hourly_rate[i].rate}
                                        onChange={(e) => {
                                            const temp =
                                                data.minimum_hourly_rate;
                                            temp[i].rate = e.target.value;
                                            setData(
                                                "minimum_hourly_rate",
                                                temp,
                                            );
                                        }}
                                    />
                                </div>
                            ),
                        )}
                    </div>
                </li>
                <li>
                    <Label>Are you open to long-duration mentorship?</Label>
                    <RadioGroup
                        value={data.open_to_long_duration_mentorship}
                        onValueChange={(e) =>
                            setData("open_to_long_duration_mentorship", e)
                        }
                        className="flex items-center space-x-2"
                    >
                        {b2BMentorshipFormData.open_to_long_duration_mentorship.map(
                            (f) => (
                                <Label
                                    key={f.value}
                                    className="flex items-center space-x-2 bg-slate-50 border py-1.5 px-4 rounded-sm"
                                >
                                    <RadioGroupItem
                                        value={f.value}
                                        id={f.label}
                                    />
                                    <span>{f.label}</span>
                                </Label>
                            ),
                        )}
                    </RadioGroup>
                </li>
                <li>
                    <Label>More Details About You as a B2B Mentor:</Label>
                    <p className="text-sm text-muted-foreground">
                        (Mention any details that can help us understand your
                        expertise and discuss with institutions)
                    </p>
                    <Textarea
                        name="about"
                        id="about"
                        value={data.about}
                        onChange={(e) => setData("about", e.target.value)}
                    />
                </li>
            </ol>
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
