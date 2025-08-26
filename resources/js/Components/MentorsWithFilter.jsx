import React, { useState } from "react";
import NoDataAlert from "./NoDataAlert";
import ProfileImageCard from "./Cards/ProfileImageCard";
import { Checkbox } from "@/shadcn/ui/checkbox";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import SectionWrapper from "./SectionWrapper";
import {
    Sheet,
    SheetContent,
    // SheetDescription,
    // SheetHeader,
    // SheetTitle,
    SheetTrigger,
} from "@/shadcn/ui/sheet";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/shadcn/ui/accordion";
import { Button } from "@/shadcn/ui/button";
import { Label } from "@/shadcn/ui/label";
import { ListFilter } from "lucide-react";

export default function MentorsWithFilter({ topics }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedMentors, setSelectedMentors] = useState([]);

    React.useEffect(() => {
        const allMentors = topics.flatMap((topic) =>
            topic.active_tags.flatMap((tag) => tag.mentors || [])
        );
        const uniqueMentors = Array.from(
            new Map(allMentors.map((m) => [m.id, m])).values()
        );
        setSelectedMentors(uniqueMentors);
    }, [topics]);

    const handleTagChange = (tag) => {
        let updatedTags;
        if (selectedTags.includes(tag.slug)) {
            updatedTags = selectedTags.filter((t) => t !== tag.slug);
        } else {
            updatedTags = [...selectedTags, tag.slug];
        }
        setSelectedTags(updatedTags);

        const getUniqueMentors = (mentors) => {
            const uniqueOnly = new Map();
            mentors.forEach((mentor) => {
                uniqueOnly.set(mentor.id, mentor);
            });
            return Array.from(uniqueOnly.values());
        };

        if (updatedTags.length === 0) {
            const allMentors = topics.flatMap((topic) =>
                topic.active_tags.flatMap((t) => t.mentors || [])
            );
            setSelectedMentors(getUniqueMentors(allMentors));
        } else {
            const mentors = topics.flatMap((topic) =>
                topic.active_tags
                    .filter((t) => updatedTags.includes(t.slug))
                    .flatMap((t) => t.mentors || [])
            );
            setSelectedMentors(getUniqueMentors(mentors));
        }
    };

    const FilterContent = () => (
        <>
            <SectionWrapper.Heading
                level="h3"
                className="text-xl font-semibold text-start"
            >
                Filter by
            </SectionWrapper.Heading>
            <ScrollArea className="overflow-auto sm:p-3 max-h-[calc(100vh-200px)] bg-yellow-50/10">
                {topics.map((topic) => (
                    <div key={topic.id} className="mb-4">
                        <h4 className="font-semibold mb-2">{topic.title}</h4>
                        <div className="max-h-60 overflow-y-auto">
                            {topic.active_tags.map((tag) => (
                                <Label
                                    htmlFor={tag.slug}
                                    key={tag.id}
                                    // className=""
                                    className={`flex items-center text-[16px] mb-2 cursor-pointer mx-0  ${
                                        selectedTags.includes(tag.slug)
                                            ? "text-black"
                                            : "text-slate-500"
                                    }`}
                                >
                                    <Checkbox
                                        id={tag.slug}
                                        checked={selectedTags.includes(
                                            tag.slug
                                        )}
                                        onCheckedChange={() =>
                                            handleTagChange(tag)
                                        }
                                    />
                                    <span className="ml-2">{tag.title}</span>
                                </Label>
                            ))}
                        </div>
                    </div>
                ))}
            </ScrollArea>
        </>
    );

    return (
        <SectionWrapper.FullWidth className="grid grid-cols-12 w-full container">
            {/* Sidebar Filters for Desktop */}
            <div className="hidden md:block col-span-3 border-r">
                <div className="sticky top-20">
                    <FilterContent />
                </div>
            </div>

            {/* Drawer Filters for Mobile */}
            <div className="col-span-12 md:hidden mb-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full gap-x-3">
                            <ListFilter className="ml-2" /> Filter
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="bg-slate-100">
                        <div className="pb-4">
                            <FilterContent />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Profile Cards Section */}
            <div className="col-span-12 md:col-span-9 p-4">
                {selectedMentors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedMentors.map((mentor) => (
                            <ProfileImageCard key={mentor.id} mentor={mentor} />
                        ))}
                    </div>
                ) : (
                    <NoDataAlert title="No mentors found!" />
                )}
            </div>
        </SectionWrapper.FullWidth>
    );
}
