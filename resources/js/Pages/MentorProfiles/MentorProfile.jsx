import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/shadcn/ui/tooltip";
import {
    // BadgePercent,
    BriefcaseBusiness,
    Calendar,
    ChevronRight,
    GraduationCap,
    Home,
    Languages,
    // IndianRupee,
    Mail,
    Phone,
    School,
    Share2,
} from "lucide-react";
import React from "react";
import BlankLayout from "@/Layouts/blank-layout";
import { Separator } from "@/shadcn/ui/separator";
import MentorCourses from "./MentorCourses";
import Header from "@/Layouts/Header";
import { formatDate } from "date-fns";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/shadcn/ui/accordion";
import { Link, usePage } from "@inertiajs/react";

import PageLayout from "@/Layouts/PageLayout";
import PageBanner from "@/Components/PageBanner";
import SocialShare from "@/Components/SocialShare";
import SocialPlatforms from "./SocialPlatforms";
import {
    Facebook,
    Linkedin,
    Twitter,
    Instagram,
    Youtube,
    Github,
    Globe,
} from "lucide-react";

const getSocialIcon = (urlOrLabel) => {
    const value = urlOrLabel.toLowerCase();

    if (value.includes("linkedin")) return <Linkedin size={20} />;
    if (value.includes("facebook") || value.includes("fb"))
        return <Facebook size={20} />;
    if (value.includes("twitter") || value.includes("x.com"))
        return <Twitter size={20} />;
    if (value.includes("instagram")) return <Instagram size={20} />;
    if (value.includes("youtube")) return <Youtube size={20} />;
    if (value.includes("github")) return <Github size={20} />;
    return <Globe size={20} />;
};

const MentorDetails = ({ mentorProfile, courseTypeEnum, groupedPackages }) => {
    const { auth } = usePage().props;
    console.log("🚀 ~ SocialPlatforms ~ auth:", mentorProfile, auth);
    const [scroll, setScroll] = React.useState(false);
    const handleScroll = () => {
        const offset = window.scrollY;
        offset > 422 ? setScroll(true) : setScroll(false);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div>
            <PageBanner />
            <div
                style={{
                    background:
                        "radial-gradient(circle, rgba(3, 13, 36, .91) 0, #00000a 100%)",
                }}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_450px] gap-6 sm:pt-24">
                        <div className="text-left text-white py-6 sm:py-12 px-4 md:px-4 lg:px-4 xl:px-0 sm:px-4 order-2 sm:order-1">
                            {/* Commenting rating as we don't have rating key now */}
                            {/* <div className="flex gap-2 items-center py-2">
                                {mentorProfile?.avg_mentor_rating !== 0 && (
                                    <div className="flex gap-1 items-center bg-gray-600 px-2 py-1 rounded">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="yellow"
                                            stroke="currentColor"
                                            strokewidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-star"
                                        >
                                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                        </svg>
                                        <span className="text-sm">
                                            {mentorProfile?.avg_mentor_rating}
                                        </span>
                                    </div>
                                )}
                            </div> */}
                            <div className="text-3xl sm:text-4xl font-bold pb-1 sm:pb-2 ">
                                {mentorProfile?.alias_name &&
                                mentorProfile?.show_alias === 1
                                    ? mentorProfile?.alias_name
                                    : mentorProfile?.full_name}
                            </div>
                            {mentorProfile?.bio?.length > 0 && (
                                <p className="text-base mt-3 hidden sm:block">
                                    {mentorProfile?.short_description}
                                </p>
                            )}
                            {/* <div className="flex justify-start gap-8 items-center py-3 sm:py-8">
                                    <div className="flex gap-1 items-center text-center">
                                        <IndianRupee className="h-5 w-5" />
                                        <div className="font-semibold text-xl sm:text-3xl">
                                            2000
                                        </div>
                                        /-
                                        <div className="text-base sm:text-xl line-through">
                                            5000
                                        </div>
                                    </div>
                                    <div className="flex gap-1 items-center text-center">
                                        <BadgePercent className="h-4 w-4 text-green-600" />
                                        <div className="font-semibold sm:text-xl text-green-600">
                                            60 %Discount
                                        </div>
                                    </div>
                                </div> */}
                            {/* <div>
                                    <Button className="bg-white text-black font-semibold hover:text-white hover:bg-transparent border hover:border-white transition-all duration-300">
                                        View Course
                                    </Button>
                                </div> */}
                        </div>
                        <div className="self-end order-1 sm:order-2">
                            <div
                                className={`w-full m-auto md:w-[400px] sm:block`}
                            >
                                <div className="sm:bg-slate-600 sm:p-3">
                                    <img
                                        src={
                                            mentorProfile?.profile_picture
                                                ?.full_path
                                                ? mentorProfile?.profile_picture
                                                      ?.full_path
                                                : "/images/unknown.jpg"
                                        }
                                        alt=""
                                        className="h-[300px] w-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-4 xl:px-0 sm:px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_450px] gap-6">
                    <div className="order-2 sm:order-1 mt-4">
                        <MentorCourses
                            packages={groupedPackages}
                            mentor={mentorProfile}
                            courseTypeEnum={courseTypeEnum}
                            courses={mentorProfile?.courses || []}
                        />
                    </div>
                    <div className="self-baseline order-1 sm:order-2 sm:pb-16">
                        <div
                            className={`w-full m-auto md:w-[400px] sm:block border`}
                        >
                            <div className="w-full bg-white mt-1 shadow-xl p-6">
                                <div className="flex justify-between items-center">
                                    <div className="text-2xl font-semibold text-gray-700">
                                        About me
                                    </div>

                                    {(auth && auth.user == null) ||
                                    auth?.userRoles.includes("user") ? (
                                        mentorProfile?.social_links &&
                                        mentorProfile?.social_links.map(
                                            (link, index) => (
                                                <a
                                                    key={index}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mr-2 inline-block"
                                                >
                                                    {getSocialIcon(
                                                        link.url || link.label,
                                                    )}
                                                </a>
                                            ),
                                        )
                                    ) : (
                                        <SocialPlatforms
                                            mentorProfile={mentorProfile}
                                        />
                                    )}
                                </div>
                                {/* Commenting rating as we don't have rating key now */}
                                {/* {mentorProfile?.avg_mentor_rating !==
                                            0 && (
                                            <div className="flex gap-2 items-center py-2">
                                                <div className="flex gap-1 items-center bg-gray-200 px-2 py-1 rounded">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="yellow"
                                                        stroke="currentColor"
                                                        strokewidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="lucide lucide-star"
                                                    >
                                                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                                    </svg>
                                                    <span className="text-sm">
                                                        {
                                                            mentorProfile?.avg_mentor_rating
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        )} */}

                                <Separator className="my-2" />
                                {mentorProfile?.show_email === 1 && (
                                    <div className="flex items-center gap-2 py-2">
                                        <div className="text-gray-500">
                                            <Mail size={16} />
                                        </div>
                                        <div className="text-gray-700 text-sm">
                                            {mentorProfile?.user?.email}
                                        </div>
                                    </div>
                                )}

                                {mentorProfile?.user?.created_at && (
                                    <div className="flex items-center gap-2 pb-2">
                                        <div className="text-gray-500">
                                            <Calendar size={16} />
                                        </div>
                                        <div className="text-gray-700 text-sm">
                                            Joined:{" "}
                                            {formatDate(
                                                mentorProfile?.user?.created_at,
                                                "dd MMM, yyyy",
                                            )}
                                        </div>
                                    </div>
                                )}
                                {mentorProfile?.show_phone === 1 &&
                                    mentorProfile?.phone && (
                                        <div className="flex items-center gap-2 pb-2">
                                            <div className="text-gray-500">
                                                <Phone size={16} />
                                            </div>
                                            <div className="text-gray-700 text-sm">
                                                {mentorProfile?.phone}
                                            </div>
                                        </div>
                                    )}
                                {mentorProfile?.experience && (
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <BriefcaseBusiness className="text-gray-500 h-4 w-4" />
                                        </div>
                                        <div className="text-gray-700 text-sm text-[13px]">
                                            {mentorProfile?.experience}
                                        </div>
                                    </div>
                                )}
                                <Separator className="mt-2" />
                                {mentorProfile?.educations && (
                                    <div>
                                        {mentorProfile?.educations?.map(
                                            (education, index) =>
                                                education?.status == true && (
                                                    <div
                                                        key={index}
                                                        className="pt-2"
                                                    >
                                                        <div className="flex items-center gap-2 py-2 bg-muted px-2">
                                                            <div className="text-gray-500 bg-white rounded-full p-2">
                                                                <School
                                                                    size={20}
                                                                    className=""
                                                                />
                                                            </div>
                                                            <div className="text-gray-700 text-sm">
                                                                {
                                                                    education?.school
                                                                }
                                                                <div className="flex items-center gap-1">
                                                                    <GraduationCap
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                    <span className="text-xs text-gray-500">
                                                                        {
                                                                            education?.degree
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ),
                                        )}
                                    </div>
                                )}

                                {/* {mentorProfile?.languages &&
                                            mentor?.languages.length > 0 && (
                                                <div className="flex items-center gap-1 pb-2">
                                                    <div className="text-gray-500">
                                                        <Languages size={16} />
                                                    </div>
                                                    <div className="text-gray-700 text-sm">
                                                        {mentor?.languages &&
                                                            mentor?.languages?.join(
                                                                ", "
                                                            )}
                                                    </div>
                                                </div>
                                            )} */}
                                {mentorProfile?.bio &&
                                    mentorProfile?.bio !== "<p></p>" && (
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger>
                                                    More About Me
                                                </AccordionTrigger>
                                                <AccordionContent className="max-h-96 overflow-y-scroll">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: mentorProfile?.bio,
                                                        }}
                                                    ></div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

MentorDetails.layout = (page) => (
    <PageLayout
        children={page}
        // title={
        //     page.props.page.meta_title
        //         ? page.props.page.meta_title
        //         : page.props.page.title
        // }
        // metaDescription={
        //     page.props.page.meta_description ||
        //     "Want to fast-track your career or personal growth? Join Fomoedge as a mentee and connect with experienced mentors for personalized, one-on-one guidance. Find the right mentor, book a session, and gain expert insights. Start your journey today!"
        // }
    />
);

export default MentorDetails;
