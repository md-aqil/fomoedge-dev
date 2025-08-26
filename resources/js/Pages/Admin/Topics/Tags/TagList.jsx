import React from "react";
import { Button } from "@/shadcn/ui/button";
import { Pencil, PlusCircle } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shadcn/ui/dialog";
import TagForm from "./TagForm";

const TabButton = ({ tag, onClick = () => {}, active = false }) => (
    <div
        key={tag.slug}
        className={`flex flex-col gap-y-1 border px-2 py-1 rounded ${active ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
    >
        <div className="flex gap-x-2 justify-between items-center">
            <span>{tag.title}</span>
            <Button
                size="sm"
                variant="ghost"
                className="p-0 h-6 w-6"
                onClick={onClick}
            >
                <Pencil className="h-3 w-3" />
            </Button>
        </div>
        {/* {tag.tag_details && (
            <div
                className="text-xs text-muted-foreground mt-1"
                dangerouslySetInnerHTML={{
                    __html: tag.tag_details,
                }}
            />
        )} */}
        {/* {tag.tag_cta && tag.tag_cta.label && tag.tag_cta.link && (
            <a
                href={tag.tag_cta.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded hover:underline"
            >
                {tag.tag_cta.label}
            </a>
        )}
        {tag.tag_cta_description && (
            <div className="text-xs text-muted-foreground mt-1">
                {tag.tag_cta_description}
            </div>
        )} */}
    </div>
);

export default function TagList({ topic, tags }) {
    const [openFormDialog, openFormDialogSet] = React.useState(false);
    const [tagData, setTagData] = React.useState(null);

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Tags</CardTitle>
                            <CardDescription>
                                Add Tags to this topics
                            </CardDescription>
                        </div>
                        <Button
                            onClick={() => {
                                setTagData(null);
                                openFormDialogSet(true);
                            }}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Tag
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="activeTags" className="w-full">
                        <TabsList>
                            <TabsTrigger value="activeTags">
                                Active Tags
                            </TabsTrigger>
                            <TabsTrigger value="inactiveTags">
                                Inactive Tags
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="activeTags">
                            {tags && tags.length > 0 && (
                                <ul className="flex flex-wrap gap-2">
                                    {tags
                                        .filter(
                                            (tag) => tag.activated_at !== null,
                                        )
                                        .map((tag) => (
                                            <li key={tag.slug}>
                                                <TabButton
                                                    tag={tag}
                                                    active={true}
                                                    onClick={() => {
                                                        openFormDialogSet(true);
                                                        setTagData(tag);
                                                    }}
                                                />
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </TabsContent>
                        <TabsContent value="inactiveTags">
                            {tags && tags.length > 0 && (
                                <ul className="flex flex-wrap gap-2">
                                    {tags
                                        .filter(
                                            (tag) => tag.activated_at == null,
                                        )
                                        .map((tag) => (
                                            <li key={tag.slug}>
                                                <TabButton
                                                    tag={tag}
                                                    active={false}
                                                    onClick={() => {
                                                        openFormDialogSet(true);
                                                        setTagData(tag);
                                                    }}
                                                />
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Dialog open={openFormDialog} onOpenChange={openFormDialogSet}>
                <DialogContent
                    className="max-w-7xl overflow-auto max-h-[calc(90dvh)]"
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle>Add New Tag</DialogTitle>
                        <DialogDescription>
                            Add a tag to the topic{" "}
                            <em className="font-bold bg-yellow-100 px-2 rounded">
                                {topic?.title}
                            </em>
                        </DialogDescription>
                    </DialogHeader>
                    <TagForm
                        tagData={tagData}
                        topic={topic}
                        openFormDialogSet={openFormDialogSet}
                    />
                    <DialogFooter>
                        <Button
                            variant={"destructive"}
                            onClick={() => openFormDialogSet(false)}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
