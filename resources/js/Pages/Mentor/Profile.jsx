import PageHeading from "@/Components/PageHeading";
import ShadcnCard from "@/Components/ShadcnCard";
import MentorAuthLayout from "@/Layouts/MentorAuthLayout/MentorAuthLayout";
import { Badge } from "@/shadcn/ui/badge";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { TextLarge, TextMuted } from "@/shadcn/ui/text-muted";
import { Head, useForm } from "@inertiajs/react";
import { CircleAlert, CircleUser, Cog, Link2 } from "lucide-react";
import React from "react";
import ManagePasswordForm from "./ProfileForms/ManagePasswordForm";
import ProfileDetailsForm from "./ProfileForms/ProfileDetailsForm";
import SkillDetailsForm from "./ProfileForms/SkillDetailsForm";
import SocialLinksForm from "./ProfileForms/SocialLinksForm";

export default function Profile({ mentorProfile, user }) {
    const [selectedSlug, setSelectedSlug] = React.useState(null);

    const { data, setData, errors, post } = useForm({
        user_id: user ? user?.id : "",
        first_name: user ? user?.first_name : "",
        last_name: user ? user?.last_name : "",
        // profile_picture: mentorProfile ? mentorProfile?.profile_picture : "",
        phone: mentorProfile ? mentorProfile?.phone : "",
        phone_country_id: mentorProfile ? mentorProfile?.phone_country_id : "",
        company_name: mentorProfile ? mentorProfile?.company_name : "",
        country_id: mentorProfile ? mentorProfile?.country_id : "",
        why_choose_us: mentorProfile ? mentorProfile?.why_choose_us : "",
        // alias_name: mentorProfile ? mentorProfile?.alias_name : "",
        ...(mentorProfile?.alias_name && {
            alias_name: mentorProfile.alias_name,
        }),

        show_alias: mentorProfile ? mentorProfile?.show_alias : "",
        show_phone: mentorProfile ? mentorProfile?.show_phone : "",
        show_email: mentorProfile ? mentorProfile?.show_email : "",
        languages:
            mentorProfile?.languages !== null ? mentorProfile?.languages : [],
        educations:
            mentorProfile?.educations !== null ? mentorProfile?.educations : [],
        // mentorProfile?.educations !== null ? mentorProfile?.educations : [],
        experience: mentorProfile ? mentorProfile?.experience : "",
        bio: mentorProfile ? mentorProfile?.bio : "",
        short_description: mentorProfile
            ? mentorProfile?.short_description
            : "",
        topic_ids: mentorProfile ? mentorProfile?.topic_ids : [],
        topic_tag_ids: mentorProfile ? mentorProfile?.topic_tag_ids : [],
        social_links: mentorProfile ? mentorProfile?.social_links : [],
    });

    // Set alias_name if change else prefill default in edit
    // React.useEffect(() => {
    //     setData("alias_name", user?.alias_name);
    // }, [user?.alias_name]);

    const HandleSubmit = async () => {
        try {
            post(route("mentors.update"));
        } catch (error) {
            console.log(error);
            // if (error.errors && typeof error.errors) {
            //     Object.entries(error.errors).forEach(([key, value]) => {
            //         cosole.log(key, value);
            //         // if (Array.isArray(value)) {
            //         //     value.forEach((msg) => toast.error(msg));
            //         // } else {
            //         //     toast.error(value);
            //         // }
            //     });
            // }
        }
    };

    return (
        <MentorAuthLayout>
            <Head>
                <title>Update Profile</title>
            </Head>
            <PageHeading className="mb-5">
                <div className="">
                    <PageHeading.Title>{user?.full_name}</PageHeading.Title>
                    <p className="text-sm pt-1">
                        Make changes to your profile here. Click save when
                        you're done.
                    </p>
                </div>
            </PageHeading>
            
            {/* About Intro Section */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mx-auto mb-16">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight text-left">
                            Connect Learn Succeed — The Mentors You Need
                            for Every Professional Journey
                        </h1>
                        <p className="text-normal text-gray-700 leading-relaxed max-w-xl">
                            Access a network of skilled mentors who will guide you through
                            challenges, help set meaningful goals, and unlock new
                            opportunities to elevate your career to new heights.
                        </p>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-fomoPrimary-0 to-[#ffdc6a] rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 6.75 15.75v-1.5" />
                                </svg>
                            </div>
                            <p className="text-gray-700 font-medium pt-2">Share your expertise and make a lasting impact</p>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-fomoPrimary-0 to-[#ffdc6a] rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 2.625.372 9.337 9.337 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>
                            </div>
                            <p className="text-gray-700 font-medium pt-2">Build meaningful professional relationships</p>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-fomoPrimary-0 to-[#ffdc6a] rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.49a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.57l1.285 5.385a.562.562 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            </div>
                            <p className="text-gray-700 font-medium pt-2">Enhance your leadership and communication skills</p>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                        <div className="grid grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="flex justify-center mb-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-fomoPrimary-0/20 to-fomoPrimary-0/10 rounded-xl flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    120+
                                </div>
                                <div className="text-sm text-gray-500 font-medium">Mentees</div>
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center mb-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-fomoPrimary-0/20 to-fomoPrimary-0/10 rounded-xl flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    150+
                                </div>
                                <div className="text-sm text-gray-500 font-medium">Mentors</div>
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center mb-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-fomoPrimary-0/20 to-fomoPrimary-0/10 rounded-xl flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    20+
                                </div>
                                <div className="text-sm text-gray-500 font-medium">User Reviews</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="grid sm:grid-cols-12 gap-x-4">
                <div className="grid gap-4 sm:col-span-8">
                    <Tabs defaultValue="profile">
                        <TabsList className="flex flex-nowrap flex-row overflow-x-auto justify-start sm:justify-center">
                            <TabsTrigger
                                className="basis-1/3 gap-x-1 items-center"
                                value="profile"
                                onClick={() => {
                                    setSelectedSlug("profile");
                                }}
                            >
                                <CircleUser size={18} /> Profile
                                <div className="ml-4">
                                    {(errors && errors?.first_name) ||
                                    errors?.last_name ||
                                    errors?.profile_picture ||
                                    errors?.phone ? (
                                        <CircleAlert
                                            className="text-red-500 animate-bounce"
                                            size={18}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </TabsTrigger>

                            <TabsTrigger
                                className="basis-1/3 gap-x-1 items-center"
                                value="general"
                                onClick={() => {
                                    setSelectedSlug("general");
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                    />
                                </svg>
                                Skills
                                <div className="ml-4">
                                    {(errors && errors?.topic_ids) ||
                                    errors?.topic_tag_ids ? (
                                        <CircleAlert
                                            className="text-red-500 animate-bounce"
                                            size={18}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </TabsTrigger>
                            <TabsTrigger
                                className="basis-1/3 gap-x-1 items-center"
                                value="social_media"
                                onClick={() => {
                                    setSelectedSlug("social_media");
                                }}
                            >
                                <div className="flex justify-between items-center gap-5">
                                    <div className="flex gap-x-1 items-center">
                                        <Link2 size={18} /> Social Media
                                    </div>
                                    {errors?.linkedin_url && (
                                        <div>
                                            <CircleAlert className="h-5 w-5 text-red-700 transform animate-bounce" />
                                        </div>
                                    )}
                                </div>
                            </TabsTrigger>
                            <TabsTrigger
                                className="basis-1/3 gap-x-1 items-center"
                                value="manage_password"
                                onClick={() => {
                                    setSelectedSlug("manage_password");
                                }}
                            >
                                <div className="flex justify-between items-center gap-5">
                                    <div className="flex gap-x-1 items-center">
                                        <Cog size={18} /> Manage Password
                                    </div>
                                    {errors?.linkedin_url && (
                                        <div>
                                            <CircleAlert className="h-5 w-5 text-red-700 transform animate-bounce" />
                                        </div>
                                    )}
                                </div>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <ProfileDetailsForm
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                    />
                                </CardContent>
                                {/* <CardFooter className="flex justify-end">
                                    <Button>Save changes---</Button>
                                </CardFooter> */}
                            </Card>
                        </TabsContent>
                        <TabsContent value="general">
                            <Card>
                                <CardHeader>
                                    <CardTitle>You Bio</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <SkillDetailsForm
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                        mentorProfile={mentorProfile}
                                    />
                                </CardContent>
                                {/* <CardFooter className="flex justify-end">
                                    <Button>Save changes</Button>
                                </CardFooter> */}
                            </Card>
                        </TabsContent>
                        <TabsContent value="social_media">
                            <SocialLinksForm
                                mentorProfile={mentorProfile}
                                user={user}
                                data={data}
                                setData={setData}
                                errors={errors}
                            />
                        </TabsContent>
                        <TabsContent value="manage_password">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Manage Password</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <ManagePasswordForm />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        {selectedSlug !== "manage_password" && (
                            <div className="flex justify-end pt-6">
                                <Button onClick={() => HandleSubmit()}>
                                    Save Changes
                                </Button>
                            </div>
                        )}
                    </Tabs>
                </div>

                <div className="sm:col-span-4">
                    {/* <ShadcnCard title={"Mentor Profile"}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Possimus rerum quos quidem odio deleniti deserunt
                        assumenda recusandae neque, totam suscipit accusamus,
                        delectus ab modi, nobis vero officia? Natus, et
                        voluptates!
                    </ShadcnCard> */}
                    {user && (
                        <ShadcnCard
                            title={
                                <div className="flex flex-col">
                                    <h3 className="text-2xl font-semibold">
                                        {" "}
                                        {user?.first_name} {user?.last_name}
                                    </h3>
                                    {user?.mentor_profile?.alias_name && (
                                        <TextMuted className="inline-block pt-1">
                                            Alias Name:{" "}
                                            <span className="font-semibold text-black">
                                                {
                                                    user?.mentor_profile
                                                        ?.alias_name
                                                }
                                            </span>
                                        </TextMuted>
                                    )}
                                </div>
                            }
                        >
                            <div>
                                <img
                                    src={
                                        user?.mentor_profile?.profile_picture
                                            ?.full_path || "/images/unknown.jpg"
                                    }
                                    alt=""
                                    className="w-full h-[300px] object-cover border rounded-lg"
                                />
                            </div>
                            <div className="flex flex-col">
                                <TextMuted className="inline-block pt-0">
                                    Email
                                </TextMuted>
                                <span className="text-md font-semibold text-black flex-wrap">
                                    {user?.email}
                                </span>
                            </div>
                            {/* <div className="grid grid-cols-2 gap-2"> */}
                            <div>
                                {" "}
                                <div className="flex flex-col space-y-3">
                                    <TextMuted className="inline-block pt-2">
                                        Experience
                                    </TextMuted>
                                    <TextLarge className="capitalize">
                                        {user?.mentor_profile?.experience}
                                    </TextLarge>
                                </div>
                            </div>
                            {/* </div> */}
                            <div>
                                {user?.mentor_profile?.education_details
                                    ?.length > 0 && (
                                    <div>
                                        <TextMuted className="inline-block pt-2">
                                            Education Details
                                        </TextMuted>
                                        <TextLarge>
                                            {user?.mentor_profile?.education_details?.map(
                                                (detail, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="default"
                                                        className="mr-1 mb-1"
                                                    >
                                                        {detail}
                                                    </Badge>
                                                ),
                                            )}
                                        </TextLarge>
                                    </div>
                                )}
                            </div>
                            <div>
                                {user?.mentor_profile?.topic_tags &&
                                    user?.mentor_profile?.topic_tags?.length >
                                        0 && (
                                        <>
                                            <TextMuted className="inline-block pt-2">
                                                Tags
                                            </TextMuted>
                                            <TextLarge className="leading-[0] capitalize">
                                                {user?.mentor_profile?.topic_tags?.map(
                                                    (tag) => (
                                                        <Badge
                                                            key={tag.id}
                                                            className="mr-1 mb-1"
                                                        >
                                                            {tag.title}
                                                        </Badge>
                                                    ),
                                                )}
                                            </TextLarge>
                                        </>
                                    )}
                            </div>
                        </ShadcnCard>
                    )}

                    <div className="mt-4">
                        {user && user?.mentor_profile && (
                            <ShadcnCard title={"Mentor Details"}>
                                {user?.mentor_profile?.bio?.length > 0 && (
                                    <div>
                                        <TextMuted className="inline-block pb-1">
                                            Mentor Bio
                                        </TextMuted>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: user?.mentor_profile
                                                    ?.short_description,
                                            }}
                                            className="text-sm text-gray-600"
                                        ></div>
                                    </div>
                                )}

                                {user?.mentor_profile?.short_description
                                    ?.length > 0 && (
                                    <div>
                                        <TextMuted className="inline-block pt-2">
                                            Why Choose Us
                                        </TextMuted>
                                        <p className="text-sm text-gray-600">
                                            {
                                                user?.mentor_profile
                                                    ?.why_choose_us
                                            }
                                        </p>
                                    </div>
                                )}
                            </ShadcnCard>
                        )}
                    </div>
                </div>
            </div>
        </MentorAuthLayout>
    );
}
