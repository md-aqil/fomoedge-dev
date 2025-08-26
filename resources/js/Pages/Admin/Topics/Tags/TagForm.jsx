import React from "react";
import InputError from "@/Components/InputError";
import { textToSlug } from "@/Helpers/GlobalFunctions";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import EditorInput from "@/Components/EditorInput";
import { Textarea } from "@/shadcn/ui/textarea";
import { X } from "lucide-react";

export default function TagForm({ tagData, topic, openFormDialogSet }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: tagData?.title || "",
        slug: tagData?.slug || "",
        activated_at: (tagData && tagData.activated_at) || !tagData ? "1" : "0",
        meta_tags: tagData?.meta_tags || "",
        description: tagData?.description || "",
        keywords: tagData?.keywords || "",
        schema: tagData?.schema || "",
        tag_details: tagData?.tag_details || "",
        tag_cta: tagData?.tag_cta || { label: "", link: "" },
        tag_cta_description: tagData?.tag_cta_description || "",
        faqs: tagData?.faqs || [],
    });

    const submit = (e) => {
        e.preventDefault();
        const routeName = tagData
            ? "admin.topics.tags.update"
            : "admin.topics.tags.store";
        const routeParams = tagData
            ? { topicId: topic.id, id: tagData.id }
            : { topicId: topic.id };

        post(route(routeName, routeParams), {
            onSuccess: () => {
                reset();
                openFormDialogSet(false);
            },
            onError: (errors) => {
                toast.error(
                    errors.slug ||
                        errors.title ||
                        errors.activated_at ||
                        "An error occurred while submitting the form.",
                );
            },
        });
    };
    // const submit = (e) => {
    //     e.preventDefault();
    //     if (tagData) {
    //         post(route("admin.topics.tags.update", { topicId: topic.id, id: tagData.id }));
    //         reset();
    //     } else {
    //         post(route("admin.topics.tags.store", { topicId: topic.id }));
    //     }
    //     openFormDialogSet(false)
    // };

    return (
        <form onSubmit={submit}>
            <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-x-4 items-center">
                {/* Divide felx to 80/20 */}
                <div className="w-full md:w-3/3">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        type="text"
                        name="title"
                        value={data.title}
                        autoFocus
                        className="mt-1 block w-full text-xl h-18"
                        placeholder="Enter Topic Title"
                        onChange={(e) => {
                            const title = e.target.value;
                            setData({
                                ...data,
                                title,
                                slug: tagData ? data.slug : textToSlug(title),
                            });
                        }}
                    />
                    {errors.title && (
                        <InputError message={errors.title} className="mt-2" />
                    )}
                </div>
                <div className="w-full md:w-1/3">
                    <div className="flex gap-x-2 items-center">
                        <Label htmlFor="activated_at">Status</Label>
                        <RadioGroup
                            name="activated_at"
                            value={`${data.activated_at}`}
                            onValueChange={(value) =>
                                setData("activated_at", value)
                            }
                            className="flex gap-x-4 mt-2"
                        >
                            <Label
                                htmlFor="is_active"
                                className="flex items-center space-x-2 bg-slate-100 p-2 w-full border rounded"
                            >
                                <RadioGroupItem
                                    value="1"
                                    id="is_active"
                                    aria-label="Active"
                                />
                                <span>Active</span>
                            </Label>
                            <Label
                                htmlFor="is_inactive"
                                className="flex items-center space-x-2 bg-slate-100 p-2 w-full border rounded"
                            >
                                <RadioGroupItem
                                    value="0"
                                    id="is_inactive"
                                    aria-label="Inactive"
                                />
                                <span>Inactive</span>
                            </Label>
                        </RadioGroup>
                    </div>
                    {errors.activated_at && (
                        <InputError
                            message={errors.activated_at}
                            className="mt-2"
                        />
                    )}
                </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-md mt-4">
                <p className="text-sm text-slate-700 font-semibold">
                    SEO Settings
                </p>
                <div className="mt-4">
                    <Label htmlFor="meta_tags">Meta Tags</Label>
                    <Input
                        id="meta_tags"
                        type="text"
                        name="meta_tags"
                        value={data.meta_tags}
                        placeholder="Meta tags (comma separated or JSON)"
                        onChange={(e) => setData("meta_tags", e.target.value)}
                    />
                    {errors.meta_tags && (
                        <InputError
                            message={errors.meta_tags}
                            className="mt-2"
                        />
                    )}
                </div>
                <div className="mt-4">
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        type="text"
                        name="description"
                        value={data.description}
                        placeholder="Description"
                        onChange={(e) => setData("description", e.target.value)}
                    />
                    {errors.description && (
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    )}
                </div>
                <div className="mt-4">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                        id="keywords"
                        type="text"
                        name="keywords"
                        value={data.keywords}
                        placeholder="Keywords (comma separated)"
                        onChange={(e) => setData("keywords", e.target.value)}
                    />
                    {errors.keywords && (
                        <InputError
                            message={errors.keywords}
                            className="mt-2"
                        />
                    )}
                </div>
                <div className="mt-4">
                    <Label htmlFor="schema">Schema</Label>
                    <Textarea
                        id="schema"
                        name="schema"
                        value={data.schema}
                        placeholder="Schema (JSON-LD or text)"
                        onChange={(e) => setData("schema", e.target.value)}
                    />

                    {/* <Input
                        id="schema"
                        type="text"
                        name="schema"
                        value={data.schema}
                        placeholder="Schema (JSON-LD or text)"
                        onChange={(e) => setData("schema", e.target.value)}
                    /> */}
                    {errors.schema && (
                        <InputError message={errors.schema} className="mt-2" />
                    )}
                </div>
            </div>
            <div className="mt-4">
                <Label htmlFor="tag_details">Tag Details</Label>
                <EditorInput
                    value={data.tag_details}
                    onChange={(val) => setData("tag_details", val)}
                />
                {errors.tag_details && (
                    <InputError message={errors.tag_details} className="mt-2" />
                )}
            </div>

            {/* FAQ Section */}
            <div className="mt-4">
                <Label>FAQs</Label>
                <div className="flex flex-col gap-4">
                    {(data.faqs || []).map((faq, idx) => (
                        <div
                            key={idx}
                            className="border rounded p-3 bg-slate-50 relative"
                        >
                            <div className="flex flex-col gap-2 items-cente mb-2">
                                <Label className="w-20">Q{idx + 1}:</Label>
                                <Input
                                    type="text"
                                    placeholder="Question"
                                    value={faq.question}
                                    onChange={(e) => {
                                        const faqs = [...data.faqs];
                                        faqs[idx].question = e.target.value;
                                        setData("faqs", faqs);
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-2 items-cente mb-2">
                                <Label className="w-20">Answer:</Label>
                                <div className="flex-1">
                                    <Textarea
                                        value={faq.answer}
                                        placeholder="Answer"
                                        onChange={(e) => {
                                            const faqs = [...data.faqs];
                                            faqs[idx].answer = e.target.value;
                                            setData("faqs", faqs);
                                        }}
                                    />
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute -top-3 -right-2 rounded-full"
                                onClick={() => {
                                    const faqs = [...data.faqs];
                                    faqs.splice(idx, 1);
                                    setData("faqs", faqs);
                                }}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            // variant="outline"
                            onClick={() =>
                                setData("faqs", [
                                    ...(data.faqs || []),
                                    { question: "", answer: "" },
                                ])
                            }
                        >
                            + Add more FAQ
                        </Button>
                    </div>
                </div>
                {errors.faqs && (
                    <InputError message={errors.faqs} className="mt-2" />
                )}
            </div>
            <div className="mt-4">
                <Label>Tag CTA</Label>
                <div className="flex gap-2 flex-col md:flex-row">
                    <div className="flex-1">
                        <Input
                            id="tag_cta_label"
                            type="text"
                            name="tag_cta_label"
                            value={data.tag_cta?.label || ""}
                            placeholder="CTA Label (e.g. Learn More)"
                            onChange={(e) =>
                                setData("tag_cta", {
                                    ...data.tag_cta,
                                    label: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex-1">
                        <Input
                            id="tag_cta_link"
                            type="text"
                            name="tag_cta_link"
                            value={data.tag_cta?.link || ""}
                            placeholder="CTA Link (e.g. https://...)"
                            onChange={(e) =>
                                setData("tag_cta", {
                                    ...data.tag_cta,
                                    link: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <Label htmlFor="tag_cta_description">CTA Description</Label>
                    <EditorInput
                        value={data.tag_cta_description}
                        onChange={(val) => setData("tag_cta_description", val)}
                    />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                    Add a call-to-action button for this tag (optional).
                </div>
                {errors.tag_cta && (
                    <InputError message={errors.tag_cta} className="mt-2" />
                )}
                {errors.tag_cta_description && (
                    <InputError
                        message={errors.tag_cta_description}
                        className="mt-2"
                    />
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
