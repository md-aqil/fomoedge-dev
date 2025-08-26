import React from "react";
import NoDataAlert from "./NoDataAlert";
import RedesignedMentorCard from "./Cards/RedesignedMentorCard";

import { Button } from "@/shadcn/ui/button";
import { ScrollArea, ScrollBar } from "@/shadcn/ui/scroll-area";
import { Checkbox } from "@/shadcn/ui/checkbox";

export default function TopicsTagsTabs({ topics }) {
    const [tagsList, setTagsList] = React.useState(
        topics && topics[0]?.active_tags ? topics[0]?.active_tags : [],
    );

    const [selectedTag, setSelectedTag] = React.useState(
        tagsList && tagsList.length > 0 ? tagsList[0] : null,
    );

    const [mentorList, mentorListSet] = React.useState(
        selectedTag && selectedTag?.mentors ? selectedTag?.mentors : [],
    );

    //This state is for showing all courses by default when user came to this page.
    const [selectedTopic, setSelectedTopic] = React.useState(
        topics && topics.length > 0 ? topics[0] : null,
    );

    // Update states when selectedTopic changes
    React.useEffect(() => {
        if (selectedTopic) {
            setTagsList(selectedTopic.active_tags || []);
            if (selectedTopic.active_tags && selectedTopic.active_tags.length > 0) {
                setSelectedTag(selectedTopic.active_tags[0]);
                mentorListSet(selectedTopic.active_tags[0]?.mentors || []);
            } else {
                setSelectedTag(null);
                mentorListSet([]);
            }
        }
    }, [selectedTopic]);

    // Update mentor list when selectedTag changes
    React.useEffect(() => {
        if (selectedTag) {
            mentorListSet(selectedTag.mentors || []);
        } else {
            mentorListSet([]);
        }
    }, [selectedTag]);

    const handleTagChange = (tag, isChecked) => {
        if (isChecked) {
            setSelectedTag(tag);
        }
    };

    return (
        <div className="min-h-[400px]">
            <div className="container mx-auto">
                 <header className="self-center max-w-full text-center mb-10">
      <h1 className="text-6xl font-bold leading-none text-black max-md:max-w-full max-md:text-4xl">
        Find Your Perfect Mentor
      </h1>
      <p className="mt-4 text-lg leading-loose text-slate-600 max-md:max-w-full">
        Connect with industry experts who can accelerate your career growth
      </p>
    </header>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left sidebar for topics */}
                    <div className="md:w-1/4">
                        <div className="box-border relative shrink-0 px-4 py-7 mx-auto  max-w-none bg-white rounded-xl border border-solid shadow border-slate-200  max-md:mx-auto max-md:my-0 max-sm:p-5  max-sm:rounded-2xl">
                            <h3 className="text-lg font-semibold mb-4">Categories</h3>
                            <ScrollArea className="h-[400px]">
                                <div className="space-y-2">
                                    {topics?.map((topic) => (
                                        <Button
                                            key={topic.id}
                                            variant={selectedTopic?.id === topic.id ? "default" : "bg-none"}

                                            className={`w-full justify-start ${
                                                selectedTopic?.id === topic.id
                                                    ? "bg-amber-300 rounded-2xl shadow-lg w-full text-black hover:bg-[#ffdc6a]"
                                                    : "hover:bg-gray-100 rounded-2xl"
                                            }`}
                                            onClick={() => setSelectedTopic(topic)}
                                        >
                                            {topic.title}
                                        </Button>
                                    ))}
                                </div>
                                <ScrollBar />
                            </ScrollArea>
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className="md:w-3/4">
                        {/* Tags as checkboxes */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                            <h3 className="text-lg font-semibold mb-4">Filter by Tags</h3>
                            <ScrollArea className="w-full whitespace-nowrap">
                                <div className="flex gap-4 pb-4">
                                    {tagsList?.map((tag) => (
                                        <div key={tag.id} className="flex items-center space-x-2 pb-2">
                                            <Checkbox
                                                id={`tag-${tag.id}`}
                                                checked={selectedTag?.id === tag.id}
                                                onCheckedChange={(isChecked) => handleTagChange(tag, isChecked)}
                                            />
                                            <label
                                                htmlFor={`tag-${tag.id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {tag.title}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </div>

                        {/* Mentor list in 3-column grid */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">
                                {selectedTag ? selectedTag.title : "All Mentors"}
                            </h3>
                            {mentorList?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {mentorList.map((mentor) => (
                                        <RedesignedMentorCard key={mentor.id} mentor={mentor} />
                                    ))}
                                </div>
                            ) : (
                                <NoDataAlert title="No mentors found!" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
