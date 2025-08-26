import React from "react";
import axios from "axios";
import { Label } from "@/shadcn/ui/label";
import MultipleSelector from "../MultiSelector";
import InputLabel from "../InputLabel";
import Modal from "@/Components/Modal";
import { Button } from "@/shadcn/ui/button";
import { PlusCircle } from "lucide-react";
import AddTagForm from "./TopicForms/AddTagForm";
import AddTopicForm from "./TopicForms/AddTopicForm";
import { useEffect } from "react";
import InputError from "../InputError";

export default function MultiSelectTopics({
    data,
    setData,
    source,
    mentorProfile,
    errors,
}) {
    const [topics, setTopics] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [selectedTopics, setSelectedTopics] = React.useState([]);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [openTopicModal, setOpenTopicModal] = React.useState(false);
    const [openTagModal, setOpenTagModal] = React.useState(false);

    // Fetching all topics
    const getAllTopics = async () => {
        try {
            const response = await axios.get(
                route("api.topics.topic-list", {
                    mentor_profile_id: mentorProfile?.id,
                })
            );
            if (response.status == 200) {
                setTopics(response.data.topics);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Fetching all tags belongs to selected topics
    const getTagsByTopicId = async (topic_ids) => {
        try {
            const response = await axios.get(
                route("api.topics.topic-tags-list", {
                    topic_ids,
                    mentor_profile_id: mentorProfile?.id,
                })
            );
            if (response.status == 200) {
                // let tempTags = [...tags];
                // let tagsFilter = tags?.map((tag) => tag.id);
                // let newTags = response.data.topicTags.filter(
                //     (tag) => !tagsFilter.includes(tag.id)
                // );
                // setTags([...tempTags, ...newTags]);
                setTags(response.data.topicTags);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleTopicChange = (values) => {
        let topicId = values.map((topic) => topic.value);
        getTagsByTopicId(topicId);
        setSelectedTopics(values);
        setData(
            "topic_ids",
            values?.map((topic) => topic.value)
        );
    };
    const handleTagsChange = (values) => {
        let extractIds = values.map((tag) => tag.value);
        let tempTags = tags?.filter((tag) => extractIds.includes(tag.id));
        let formateTags = tempTags?.map((tag) => ({
            value: tag.id,
            label: tag.title,
            parent_id: tag.topic_id,
        }));
        setSelectedTags(formateTags);
    };
    const handleTopicRemove = (topicId) => {
        let filteredTags = selectedTags?.filter(
            (tag) => tag.parent_id !== topicId
        );
        setSelectedTags(filteredTags);

        let filteredTopics = selectedTopics?.filter(
            (topic) => topic.value !== topicId
        );
        let extractTopicsIds = filteredTopics?.map((topic) => topic.value);
        if (extractTopicsIds?.length > 0) {
            getTagsByTopicId(extractTopicsIds);
        } else {
            setTags([]);
        }

        setData(
            "topic_ids",
            filteredTopics?.map((topic) => topic.value)
        );
        setData(
            "topic_tag_ids",
            selectedTags
                ?.filter((tag) => tag.parent_id !== topicId)
                ?.map((tag) => tag.value)
        );
    };
    const handleRemoveTags = (tagId) => {
        let filteredTags = selectedTags?.filter((tag) => tag.value !== tagId);
        setSelectedTags(filteredTags);
        setData(
            "topic_tag_ids",
            filteredTags?.map((tag) => tag?.value)
        );
    };
    React.useEffect(() => {
        if (selectedTopics?.length > 1) {
            setError(true);
        } else {
            setError(false);
            setOpenTopicModal(false);
        }
    }, [selectedTopics]);

    // This useEffect is used to set the previously selected topics
    React.useEffect(() => {
        if (source) {
            // Filtering on topic list to find out the previously selected topics id's
            let filterTopics = topics?.filter((topic) =>
                data?.topic_ids?.includes(topic.id)
            );
            let formatePreviousSelectedTopics = filterTopics?.map((topic) => ({
                value: topic.id,
                label: topic.title,
            }));
            setSelectedTopics(formatePreviousSelectedTopics);

            let filterTags = tags?.filter((tag) =>
                data?.topic_tag_ids?.includes(tag.id)
            );
            let formatePreviousSelectedTags = filterTags?.map((tag) => ({
                value: tag.id,
                label: tag.title,
                parent_id: tag.topic_id,
            }));
            setSelectedTags(formatePreviousSelectedTags);
            if (
                source?.topic_tag_ids !== undefined &&
                source?.topic_tag_ids !== null
            ) {
                getTagsByTopicId(data?.topic_ids);
            }
        }
    }, [source?.topic_ids, topics]);

    React.useEffect(() => {
        getAllTopics();
    }, []);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
            <div className="flex gap-2 items-center">
                <div className="w-full">
                    <Label>
                        <div className="flex justify-between items-center">
                            <InputLabel
                                htmlFor="topics"
                                value="Select Topics"
                                isRequired
                                additionalInfo="(Select Three Topics Only)"
                            />
                            {error && openTagModal ? (
                                <span className="text-red-500 text-sm">
                                    Please select one topic first to add tags in
                                    it.
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                        {/* {error && openTagModal ? (
                            <span className="text-red-500 text-sm">
                                Please select one topic first to add tags in it.
                            </span>
                        ) : (
                            ""
                        )} */}
                    </Label>
                    <MultipleSelector
                        className="bg-slate-100"
                        value={selectedTopics}
                        options={topics?.map((topic) => ({
                            value: topic.id,
                            label: topic.title,
                            children: topic?.children,
                        }))}
                        onChange={(values, removeValue) => {
                            if (removeValue) {
                                handleTopicRemove(removeValue.value);
                            } else {
                                handleTopicChange(values);
                            }
                        }}
                        placeholder="Select three topics only"
                        maxSelected={3}
                        onMaxSelected={(count) => {
                            alert(`You can only select ${count} topics`);
                        }}
                        isOptionDisabled={() => data?.topic_ids?.length >= 3}
                    />
                    <InputError message={errors?.topic_ids} className="" />
                </div>
                <div>
                    {" "}
                    {/* <div className="mt-4">
                        <Button
                            type="button"
                            onClick={() => setOpenTopicModal(true)}
                        >
                            <PlusCircle className="h-4 w-4 mr-2" /> Add Topic
                        </Button>
                        <Modal
                            show={openTopicModal}
                            maxWidth="xl"
                            onClose={() => setOpenTopicModal(false)}
                            children={<AddTopicForm />}
                            showCloseAction={true}
                        />
                    </div> */}
                </div>
            </div>
            {/* This Section will appear when not tags available for selected topics  */}
            {tags?.length > 0
                ? null
                : selectedTopics?.length > 0 && (
                      <div className="mt-2 flex gap-2 items-center">
                          <div className="text-gray-500 text-sm w-full bg-slate-100 py-2 px-2 rounded-md border cursor-not-allowed">
                              No Tags Found
                          </div>
                          {/* <div>
                              <Button
                                  type="button"
                                  onClick={() => setOpenTagModal(true)}
                                  // disabled={data.topic_tag_ids.length >= 3}
                              >
                                  <PlusCircle className="h-4 w-4 mr-2" /> Add
                                  Tags
                              </Button>
                              {error !== true && (
                                  <Modal
                                      show={openTagModal}
                                      maxWidth="xl"
                                      onClose={() => setOpenTagModal(false)}
                                      children={<AddTagForm />}
                                  />
                              )}
                          </div> */}
                      </div>
                  )}
            {tags && tags?.length > 0 && (
                <div className="flex gap-2 items-center">
                    <div className=" w-full">
                        <InputLabel
                            htmlFor=""
                            isRequired
                            value="Select Tags"
                            additionalInfo="(Select Three Tags Only)"
                        />
                        <MultipleSelector
                            value={
                                source?.topic_tag_ids &&
                                source?.topic_tag_ids !== null &&
                                selectedTopics &&
                                selectedTags &&
                                selectedTags
                            }
                            className="bg-slate-100"
                            options={tags?.map((tag) => ({
                                value: tag?.id,
                                label: tag?.title,
                            }))}
                            onChange={(values, removeValue) => {
                                if (removeValue) {
                                    handleRemoveTags(removeValue.value);
                                } else {
                                    handleTagsChange(values);

                                    setData(
                                        "topic_tag_ids",
                                        values.map((value) => value.value)
                                    );
                                }
                            }}
                            maxSelected={3}
                            onMaxSelected={(count) => {
                                alert(`You can only select ${count} tags`);
                            }}
                            placeholder="Select tags"
                        />
                        <InputError
                            message={errors?.topic_tag_ids}
                            className=""
                        />
                    </div>
                    {/* <div className="mt-4">
                        <Button
                            type="button"
                            onClick={() => setOpenTagModal(true)}
                            // disabled={data.topic_tag_ids.length >= 3}
                        >
                            <PlusCircle className="h-4 w-4 mr-2" /> Add Tags
                        </Button>
                        {error !== true && (
                            <Modal
                                show={openTagModal}
                                maxWidth="xl"
                                onClose={() => setOpenTagModal(false)}
                                children={<AddTagForm />}
                            />
                        )}
                    </div> */}
                </div>
            )}
        </div>
    );
}
