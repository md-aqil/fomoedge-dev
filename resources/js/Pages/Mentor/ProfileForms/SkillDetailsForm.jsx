import EditorInput from "@/Components/EditorInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import MultiSelectTopics from "@/Components/MultiSelectTopics/MultiSelectTopics";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import React from "react";

export default function SkillDetailsForm({
    data,
    setData,
    errors,
    mentorProfile,
}) {
    return (
        <div className="space-y-4">
            <div>
                <InputLabel
                    htmlFor="experience"
                    value=" Experience / Standout Attribute"
                />
                <Input
                    id="experience"
                    type="text"
                    name="experience"
                    value={data.experience}
                    autoFocus
                    //className="mt-1 block w-full text-xl h-18"
                    placeholder="Mentor Experience..."
                    onChange={(e) => {
                        setData("experience", e.target.value);
                    }}
                />
                <InputError message={errors.experience} className="mt-2" />
            </div>
            <div className="">
                <InputLabel
                    htmlFor="experience"
                    value="Short Description"
                    additionalInfo=" (This will come just below your name, make it
                        interesting.)"
                />

                <Textarea
                    className="mt-1 block w-full text-sm h-10"
                    id="short_description"
                    name="short_description"
                    rows="3"
                    maxLength="255"
                    value={data?.short_description || ""}
                    placeholder="mentor Bio..."
                    onChange={(e) => {
                        setData("short_description", e.target.value);
                    }}
                />
                <div className="flex justify-between items-center">
                    <div>
                        {" "}
                        <InputError
                            message={errors.short_description}
                            className="mt-2"
                        />
                    </div>
                    <small
                        className={`text-[11px] mt-1.5
                            ${
                                data?.description?.length === 255
                                    ? "text-red-500"
                                    : ""
                            }
                        `}
                    >
                        ({255 - (data?.description?.length || 0)} characters
                        remaining)
                    </small>
                </div>
            </div>
            <div className="">
                <InputLabel
                    htmlFor=""
                    value=" Mentor Bio"
                    additionalInfo="(More about you)"
                />
                <EditorInput
                    className="mt-1 block w-full text-sm h-10"
                    id="description"
                    name="description"
                    value={data?.bio || ""}
                    placeholder="mentor Bio..."
                    // onChange={(e) => {
                    //     setData("bio", e.target.value);
                    // }}
                    onChange={(value) =>
                        setData({
                            ...data,
                            bio: value,
                        })
                    }
                />
                <InputError message={errors.bio} className="mt-2" />
            </div>
            <div>
                <MultiSelectTopics
                    data={data}
                    setData={setData}
                    source={mentorProfile}
                    errors={errors}
                />
            </div>
        </div>
    );
}
