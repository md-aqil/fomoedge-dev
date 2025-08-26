import React from "react";
import { Button } from "@/shadcn/ui/button";
import { Head, Link } from "@inertiajs/react";
import PageHeading from "@/Components/PageHeading";
import { useForm } from "@inertiajs/react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import { textToSlug } from "@/Helpers/GlobalFunctions";
import TwoColumnLayout from "@/Layouts/admin/TwoColumnLayout";
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group";

import {
    PencilLine,
    PlusCircle,
    Tag,
    // User,
} from "lucide-react";
import ShadcnCard from "@/Components/ShadcnCard";
import Can from "@/Components/Can";
import TagList from "./Tags/TagList";

export default function Topic({ topic }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: topic ? topic?.title : "",
        slug: topic ? topic?.slug : "",
        activated_at: topic && topic.activated_at ? true : false,
        meta_tags: topic ? topic?.meta_tags || "" : "",
        description: topic ? topic?.description || "" : "",
        keywords: topic ? topic?.keywords || "" : "",
        schema: topic ? topic?.schema || "" : "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (topic) {
            post(route("admin.topics.update", { id: topic.id }));
        } else {
            post(route("admin.topics.store"));
        }
    };

    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${
                    topic ? "Edit Topic - " + topic.title : "Create"
                } Topic`}</title>
            </Head>
            <TwoColumnLayout.Heading>
                <PageHeading>
                    <PageHeading.Title>
                        {topic ? (
                            <div className="flex gap-x-3 items-center">
                                <PencilLine />
                                {topic.title}
                            </div>
                        ) : (
                            <div className="flex gap-x-3 items-center">
                                <PlusCircle />
                                Add Topic
                            </div>
                        )}
                    </PageHeading.Title>
                    <PageHeading.Actions>
                        <Button asChild variant="outline">
                            <Link href={route("admin.topics.index")}>
                                Cancel
                            </Link>
                        </Button>
                        <Can permit="create topics">
                            <Button asChild>
                                <Link href={route("admin.topics.create")}>
                                    <PlusCircle className="h-4 w-4 mr-2" />{" "}
                                    Create New
                                </Link>
                            </Button>
                        </Can>
                    </PageHeading.Actions>
                </PageHeading>
                <div className="flex justify-between">
                    <div>
                        {topic ? (
                            <Link className="text-blue-600 italic text-sm">
                                {route("admin.topics.edit", topic.id)}
                            </Link>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex gap-4"></div>
                </div>
            </TwoColumnLayout.Heading>
            <TwoColumnLayout.Content>
                <TwoColumnLayout.Main>
                    <form onSubmit={submit}>
                        <ShadcnCard
                            className="space-y-4"
                            title="General"
                            description={<></>}
                        >
                            <div>
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
                                        if (!topic) {
                                            setData({
                                                title: e.target.value,
                                                slug: textToSlug(
                                                    e.target.value,
                                                ),
                                            });
                                        } else {
                                            setData("title", e.target.value);
                                        }
                                    }}
                                />

                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label htmlFor="activated_at">Status</Label>
                                <RadioGroup
                                    defaultValue={true}
                                    name="activated_at"
                                    value={data.activated_at}
                                    onValueChange={(e) =>
                                        setData("activated_at", e)
                                    }
                                    className="flex gap-x-4 "
                                >
                                    <Label
                                        htmlFor="active"
                                        className="flex items-center space-x-2 bg-slate-100 p-2 w-full border rounded"
                                    >
                                        <RadioGroupItem
                                            value={true}
                                            id="active"
                                        />
                                        <span>Active</span>
                                    </Label>
                                    <Label
                                        htmlFor="inactive"
                                        className="flex items-center space-x-2 bg-slate-100 p-2 w-full border rounded"
                                    >
                                        <RadioGroupItem
                                            value={false}
                                            id="inactive"
                                        />
                                        <span>Inactive</span>
                                    </Label>
                                </RadioGroup>

                                <InputError
                                    message={errors.activated_at}
                                    className="mt-2"
                                />
                            </div>
                        </ShadcnCard>

                        <ShadcnCard
                            className="space-y-4 mt-4"
                            title="SEO & Meta"
                            description={
                                <>
                                    Meta information for SEO and structured
                                    data.
                                </>
                            }
                        >
                            <div>
                                <Label htmlFor="meta_tags">Meta Tags</Label>
                                <Input
                                    id="meta_tags"
                                    type="text"
                                    name="meta_tags"
                                    value={data.meta_tags}
                                    placeholder="Meta tags (comma separated or JSON)"
                                    onChange={(e) =>
                                        setData("meta_tags", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.meta_tags}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    placeholder="Description"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="keywords">Keywords</Label>
                                <Input
                                    id="keywords"
                                    type="text"
                                    name="keywords"
                                    value={data.keywords}
                                    placeholder="Keywords (comma separated)"
                                    onChange={(e) =>
                                        setData("keywords", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.keywords}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="schema">Schema</Label>
                                <Input
                                    id="schema"
                                    type="text"
                                    name="schema"
                                    value={data.schema}
                                    placeholder="Schema (JSON-LD or text)"
                                    onChange={(e) =>
                                        setData("schema", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.schema}
                                    className="mt-2"
                                />
                            </div>
                        </ShadcnCard>

                        <TwoColumnLayout.Actions>
                            <div className="flex justify-end mt-4">
                                <Button className="w-[260px]">Submit</Button>
                            </div>
                        </TwoColumnLayout.Actions>
                    </form>
                </TwoColumnLayout.Main>
                <TwoColumnLayout.Aside>
                    <TagList tags={topic?.tags} topic={topic} />
                </TwoColumnLayout.Aside>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}
