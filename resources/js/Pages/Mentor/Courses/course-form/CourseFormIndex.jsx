import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import { Textarea } from "@/shadcn/ui/textarea";
import InputLabel from "@/Components/InputLabel";
import ShadcnCard from "@/Components/ShadcnCard";
import EditorInput from "@/Components/EditorInput";
import { Label } from "@/shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group";
import TimingInput from "./TimingInput";
import BundlePackage from "./BundlePackage";
import { formatDate } from "date-fns";
import { textToSlug } from "@/Helpers/GlobalFunctions";
import MultiSelectTopics from "@/Components/MultiSelectTopics/MultiSelectTopics";
import { toast } from "sonner";

export default function CourseFormIndex({
    courseTypeEnum,
    course,
    mentorProfile,
}) {
    // console.log("course----", course);
    const pageProp = usePage();
    let mentorId = pageProp?.props?.auth?.user?.id;

    const { data, setData, post, processing, errors, reset } = useForm({
        // mentor_profile_id: course?.mentor_profile_id || "",
        type: course?.type || "",
        title: course?.title || "",
        slug: course?.slug || "",
        excerpt: course?.excerpt || "",
        description: course?.description || "",
        value: course?.value || "",
        // is_free: course?.is_free || "",
        // activated_at: course?.activated_at || "",
        featured_image: "",
        bundle_types:
            course?.bundle_courses?.map((item) => ({
                course_id: item?.pivot?.bundle_id,
                quantity: item?.pivot?.quantity,
                id: item?.pivot?.id,
            })) || [],
        price: course?.price?.price || "",
        start_at: course?.start_at || "",
        end_at: course?.end_at || "",
        special_price: course?.price?.special_price || "",
        special_price_start_at: course?.price?.special_price_start_at || "",
        special_price_end_at: course?.price?.special_price_end_at || "",
        topic_ids: course?.topic_ids || "",
        topic_tag_ids: course?.topic_tag_ids || "",
        timings:
            (course?.timings?.length > 0 &&
                course?.timings?.map((timingItem) => ({
                    start_date: timingItem.start_date,
                    start_time: timingItem.start_time,
                    end_date: timingItem.end_date,
                    end_time: timingItem.end_time,
                    id: timingItem.id,
                }))) ||
            [],
    });
    // console.log("data", data);

    const submit = (e) => {
        e.preventDefault();

        if (course?.id) {
            post(
                route("mentors.courses.update", {
                    id: course.id,
                }),
                {
                    onSuccess: () => {
                        // reset();
                        toast.success("Course updated successfully");
                    },
                }
            );
        } else {
            try {
                post(route("mentors.courses.store"), {
                    onSuccess: () => {
                        reset();
                        toast.success("Course created successfully");
                    },
                });
            } catch (error) {
                toast.error(error);
            }
        }
    };

    React.useEffect(() => {
        setData("slug", textToSlug(data.title));
    }, [data.title]);

    // React.useEffect(() => {
    //     setData(
    //         "timings",
    //         course?.timings?.map((timingItem) => ({
    //             start_date: timingItem.start_date,
    //             start_time: timingItem.start_time,
    //             end_date: timingItem.end_date,
    //             end_time: timingItem.end_time,
    //             id: timingItem.id,
    //         })) || []
    //     );
    // }, []);

    return (
        <form className="space-y-4">
            <ShadcnCard title={"Course Details"}>
                <BundlePackage
                    data={data}
                    setData={setData}
                    errors={errors}
                    course={course}
                    courseTypeEnum={courseTypeEnum}
                />

                {data.type == "VIDEO_CALL" && (
                    <div>
                        <InputLabel
                            htmlFor="value"
                            value={"Duration"}
                            isRequired
                            additionalInfo="in minutes"
                        />
                        <Input
                            id="value"
                            type="text"
                            name="value"
                            value={data.value}
                            placeholder="Enter value"
                            onChange={(e) => {
                                setData("value", e.target.value);
                            }}
                        />

                        <InputError message={errors.value} className="mt-2" />
                    </div>
                )}

                <div>
                    <InputLabel htmlFor="title" value={"Title"} isRequired />
                    <Input
                        id="title"
                        type="text"
                        name="title"
                        value={data.title}
                        placeholder="Enter title"
                        // onChange={(e) => {
                        //     setData("title", e.target.value);
                        // }}
                        onChange={(e) => {
                            if (!course) {
                                setData("title", e.target.value);
                            } else {
                                setData("title", e.target.value);
                            }
                        }}
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="featured_image"
                        value={"Featured Image"}
                    />
                    <Input
                        className="mt-1"
                        id="featured_image"
                        type="file"
                        name="featured_image"
                        onChange={(e) => {
                            setData("featured_image", e.target.files[0]);
                        }}
                    />

                    <InputError
                        message={errors.featured_image}
                        className="mt-2"
                    />
                </div>
                {/* <div>
                    <InputLabel
                        htmlFor="is_free"
                        value={"Is Free ?"}
                        isRequired
                    />

                    <RadioGroup
                        className="flex mt-2 gap-x-6 items-center"
                        defaultValue={data?.is_free || 0}
                        onValueChange={(v) => {
                            setData("is_free", v);
                            // console.log(v);
                        }}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={"1"} id="is_free_yes" />
                            <Label htmlFor="is_free_yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={"0"} id="is_free_no" />
                            <Label htmlFor="is_free_no">No</Label>
                        </div>
                    </RadioGroup>
                    <InputError message={errors.status} className="mt-2" />
                </div> */}

                <div>
                    <InputLabel
                        htmlFor="excerpt"
                        value={"Excerpt"}
                        additionalInfo="(Short description that will be displayed on course card.)"
                        isRequired
                    />
                    <Textarea
                        id="excerpt"
                        type="text"
                        name="excerpt"
                        value={data.excerpt}
                        className="mt-1 block w-full"
                        placeholder="Enter excerpt..."
                        onChange={(e) => {
                            setData("excerpt", e.target.value);
                        }}
                    />

                    <InputError message={errors.excerpt} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="description"
                        value={"Description"}
                        isRequired
                    />
                    <EditorInput
                        value={data.description}
                        onChange={(value) =>
                            setData({
                                ...data,
                                description: value,
                            })
                        }
                    />

                    <InputError message={errors.description} className="mt-2" />
                </div>
            </ShadcnCard>
            <ShadcnCard title={"Price Details"}>
                <div>
                    <InputLabel htmlFor="price" value={"Price"} />
                    <Input
                        id="price"
                        type="text"
                        name="price"
                        value={data.price}
                        placeholder="Enter course price"
                        onChange={(e) => {
                            setData("price", e.target.value);
                        }}
                    />

                    <InputError message={errors.price} className="mt-2" />
                </div>

                {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel
                            htmlFor="Valid From"
                            value={"Start Date"}
                            isRequired
                        />
                        <Input
                            className="mt-1 block w-full text-sm h-10"
                            id="start_at"
                            type="datetime-local"
                            name="start_at"
                            value={data.start_at}
                            placeholder="Package Start Date time..."
                            onChange={(e) => {
                                let formattedDate = formatDate(
                                    e.target.value,
                                    "yyyy-MM-dd HH:ii:ss"
                                );
                                setData("start_at", formattedDate);
                            }}
                        />

                        <InputError
                            message={errors.start_at}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="end_at"
                            value={"Valid upto"}
                            isRequired
                        />
                        <Input
                            className="mt-1 block w-full text-sm h-10"
                            id="end_at"
                            type="datetime-local"
                            name="end_at"
                            value={data.end_at}
                            placeholder="Package Start Date time..."
                            onChange={(e) => {
                                let formattedDate = formatDate(
                                    e.target.value,
                                    "yyyy-MM-dd HH:ii:ss"
                                );
                                setData("end_at", formattedDate);
                            }}
                        />

                        <InputError message={errors.end_at} className="mt-2" />
                    </div>
                </div> */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel
                            htmlFor="special_price"
                            value={"Special Price"}
                        />
                        <Input
                            id="special_price"
                            type="text"
                            name="special_price"
                            value={data.special_price}
                            placeholder="Special Price"
                            onChange={(e) => {
                                setData("special_price", e.target.value);
                            }}
                        />

                        <InputError
                            message={errors.special_price}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="Valid From"
                            value={"Special Price Valid from"}
                            isRequired
                        />
                        <Input
                            className="mt-1 block w-full text-sm h-10"
                            id="special_price_start_at"
                            type="datetime-local"
                            name="special_price_start_at"
                            value={data.special_price_start_at}
                            placeholder="Package Start Date time..."
                            onChange={(e) => {
                                let formattedDate = formatDate(
                                    e.target.value,
                                    "yyyy-MM-dd HH:ii:ss"
                                );
                                setData(
                                    "special_price_start_at",
                                    formattedDate
                                );
                            }}
                        />

                        <InputError
                            message={errors.special_price_start_at}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="Valid upto"
                            value={"Sale Price Valid Upto"}
                            isRequired
                        />
                        <Input
                            className="mt-1 block w-full text-sm h-10"
                            id="special_price_end_at"
                            type="datetime-local"
                            name="special_price_end_at"
                            value={data.special_price_end_at}
                            placeholder="Package Start Date time..."
                            onChange={(e) => {
                                let formattedDate = formatDate(
                                    e.target.value,
                                    "yyyy-MM-dd HH:ii:ss"
                                );
                                setData("special_price_end_at", formattedDate);
                            }}
                        />

                        <InputError
                            message={errors.special_price_end_at}
                            className="mt-2"
                        />
                    </div>
                </div>
            </ShadcnCard>

            <ShadcnCard title={"Topics and Tags"}>
                {/* <div>
                    <InputLabel htmlFor="topics" value={"Topics"} isRequired />
                    <Select
                        multiple
                        id="topics"
                        name="topics"
                        value={data.topics || []}
                        onValueChange={(selected) => {
                            setData(
                                "topics",
                                selected.map((id) => parseInt(id, 10))
                            );
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Topics" />
                        </SelectTrigger>
                        <SelectContent>
                            {course?.topics?.map((topic) => (
                                <SelectItem key={topic.id} value={topic.id}>
                                    {topic.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.topics} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="tags" value={"Tags"} isRequired />
                    <Select
                        multiple
                        id="tags"
                        name="tags"
                        value={data.tags || []}
                        onValueChange={(selected) => {
                            setData(
                                "tags",
                                selected.map((id) => parseInt(id, 10))
                            );
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Tags" />
                        </SelectTrigger>
                        <SelectContent>
                            {course?.tags?.map((tag) => (
                                <SelectItem key={tag.id} value={tag.id}>
                                    {tag.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.tags} className="mt-2" />
                </div> */}
                <MultiSelectTopics
                    data={data}
                    mentorProfile={mentorProfile}
                    setData={setData}
                    source={course}
                    errors={errors}
                />
            </ShadcnCard>

            <div className="">
                <TimingInput
                    errors={errors}
                    data={data}
                    setData={setData}
                    course={course}
                />
            </div>
            <div className="flex justify-end">
                <Button
                    onClick={(e) => submit(e)}
                    className="w-[260px]"
                    disabled={processing}
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}
