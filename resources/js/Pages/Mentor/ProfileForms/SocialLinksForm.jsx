import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import React from "react";
import { Button } from "@/shadcn/ui/button";
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { CircleMinus } from "lucide-react";

export default function SocialLinksForm({ data, setData, errors }) {
    const handleChange = ({ index, e, field }) => {
        if (!Array.isArray(data?.social_links)) return;

        const newSocialLinks = data.social_links.map((link, i) =>
            i === index ? { ...link, [field]: e.target.value } : link
        );
        setData("social_links", newSocialLinks);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-semibold leading-none tracking-tight mt-[-8px]">
                            Social Media
                        </h3>
                        <Button
                            type="button"
                            onClick={() => {
                                setData("social_links", [
                                    ...(Array.isArray(data?.social_links)
                                        ? data.social_links
                                        : []),
                                    { label: "", url: "", status: 1 },
                                ]);
                            }}
                        >
                            Add Links
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-3">
                    {Array.isArray(data?.social_links) &&
                        data.social_links.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="relative bg-slate-50 p-2 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                                    <div className="sm:col-span-4">
                                        <InputLabel
                                            htmlFor={item?.label}
                                            value="Platform Name"
                                        />
                                        <Input
                                            id={item?.label}
                                            type="text"
                                            name={item?.label}
                                            className="mt-1 block w-full"
                                            placeholder="Platform name.."
                                            value={item?.label || ""}
                                            onChange={(e) => {
                                                handleChange({
                                                    index,
                                                    e,
                                                    field: "label",
                                                });
                                            }}
                                        />
                                        <InputError
                                            message={
                                                errors[
                                                    `social_links.${index}.label`
                                                ]
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="sm:col-span-4">
                                        <InputLabel
                                            htmlFor=""
                                            value="Platform URL"
                                        />
                                        <Input
                                            type="url"
                                            name=""
                                            value={item?.url || ""}
                                            className="mt-1 block w-full text-xs"
                                            placeholder="https://www.example.com"
                                            onChange={(e) => {
                                                handleChange({
                                                    index,
                                                    e,
                                                    field: "url",
                                                });
                                            }}
                                        />
                                        <InputError
                                            message={
                                                errors[
                                                    `social_links.${index}.url`
                                                ]
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="sm:col-span-3">
                                        <InputLabel
                                            htmlFor="status"
                                            value="Status"
                                        />
                                        <RadioGroup
                                            className="flex mt-2 gap-x-6 items-center"
                                            defaultValue={String(item?.status)}
                                            onValueChange={(v) => {
                                                handleChange({
                                                    index,
                                                    e: { target: { value: v } },
                                                    field: "status",
                                                });
                                            }}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value="1"
                                                    id={`status_active_${index}`}
                                                />
                                                <Label
                                                    htmlFor={`status_active_${index}`}
                                                >
                                                    Active
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value="0"
                                                    id={`status_inactive_${index}`}
                                                />
                                                <Label
                                                    htmlFor={`status_inactive_${index}`}
                                                >
                                                    In-Active
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <Button
                                            variant="destructive"
                                            type="button"
                                            size="icon"
                                            onClick={() => {
                                                if (
                                                    !Array.isArray(
                                                        data?.social_links
                                                    )
                                                )
                                                    return;

                                                setData(
                                                    "social_links",
                                                    data.social_links.filter(
                                                        (link, i) => i !== index
                                                    )
                                                );
                                            }}
                                        >
                                            <CircleMinus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                </div>
            </CardContent>
            {/* <CardFooter className="flex justify-end">
                <Button onClick={onSubmit}>Save changes</Button>
            </CardFooter> */}
        </Card>
    );
}
