import MentorAuthLayout from "@/Layouts/MentorAuthLayout/MentorAuthLayout";
import React from "react";
import { Head, Link } from "@inertiajs/react";
import PageHeading from "@/Components/PageHeading";
import ShadcnCard from "@/Components/ShadcnCard";
import RTable from "@/Components/RTable";
import { useForm } from "@inertiajs/react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/shadcn/ui/accordion";
import { TextLarge, TextMuted } from "@/shadcn/ui/text-muted";
import Verify from "./Verify";
import { Badge } from "@/shadcn/ui/badge";
import {
    CirclePercent,
    Mail,
    Phone,
    ShieldBan,
    ShieldCheck,
} from "lucide-react";
import UserSocialLinks from "./UserSocialLinks";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Button } from "@/shadcn/ui/button";

import InputLabel from "@/Components/InputLabel";
import { Input } from "@/shadcn/ui/input";
import { formatEnum } from "@/Helpers/GlobalFunctions";
import RazorPayKYC from "@/Components/RazorPayKYC";
import MentorPlatformCharges from "./MentorPlatformCharges";

export const columns = [
    {
        header: "Name",
        accessorKey: "title",
        cell: ({ row }) => (
            <>
                <Link href={route("admin.courses.view", row.original.id)}>
                    <span className="font-semibold hover:underline">
                        {row?.original?.title}
                    </span>
                </Link>
                <p className="text-xs">
                    Type:{" "}
                    <strong className="font-semibold">
                        {formatEnum(row.original.type)}
                    </strong>
                </p>
            </>
        ),
    },
    {
        header: "Duration",
        accessorKey: "value",
    },
    {
        accessorKey: "price",
        header: "Price Details",
        cell: ({ row }) => (
            <>
                <div className="flex gap-x-1 justify-between border-b border-dashed pb-1 hover:bg-red-50 px-2">
                    <span>Price:</span>{" "}
                    <strong>{row.original?.price?.price}</strong>
                </div>
            </>
        ),
    },

    {
        accessorKey: "special_price",
        header: "Special Price Details",
        cell: ({ row }) => {
            const price = row.original?.price;
            return (
                <>
                    <div className="flex gap-x-1 justify-between border-b border-dashed pb-1 hover:bg-red-50 px-2">
                        <span>Special Price:</span>{" "}
                        <strong>{price?.special_price || "N/A"}</strong>
                    </div>
                    <div className="flex gap-x-1 justify-between border-b border-dashed py-1 hover:bg-red-50 px-2">
                        <span>Start Date:</span>{" "}
                        <strong>
                            {price?.special_price_start_at || "N/A"}
                        </strong>
                    </div>
                    <div className="flex gap-x-1 justify-between py-1 hover:bg-red-50 px-2">
                        <span>End Date:</span>{" "}
                        <strong>{price?.special_price_end_at || "N/A"}</strong>
                    </div>
                </>
            );
        },
    },
];

export default function MentorProfile({
    mentorProfile,
    user,
    mentorProfileStatusEnums,
    plateFormFees,
    taxes,
}) {
    const { post } = useForm();
    const [open, setOpen] = React.useState(false);
    return (
        <AuthenticatedLayout>
            <Head>
                <title>Mentors</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-1 p-4 md:p-8 pt-1">
                    <PageHeading className="py-4">
                        <div className="">
                            <PageHeading.Title>
                                <div className="flex items-center gap-1">
                                    <div className="font-semibold text-3xl">
                                        {mentorProfile?.full_name}
                                    </div>
                                    {mentorProfile?.activated_at !== null ? (
                                        <ShieldCheck
                                            size={36}
                                            className="text-green-500"
                                        />
                                    ) : (
                                        <ShieldBan
                                            size={36}
                                            className="text-red-500"
                                        />
                                    )}
                                </div>
                            </PageHeading.Title>
                            <p className="text-sm pt-1">
                                Make changes to your profile here. Click save
                                when you're done.
                            </p>
                        </div>
                        <PageHeading.Actions>
                            <Button
                                onClick={() =>
                                    post(
                                        route(
                                            "admin.mentor-profiles.update-activated-at",
                                            {
                                                id: mentorProfile?.id,
                                                activated_at:
                                                    !mentorProfile?.activated_at,
                                            },
                                        ),
                                    )
                                }
                                variant={
                                    mentorProfile?.activated_at
                                        ? "success"
                                        : "destructive"
                                }
                            >
                                {mentorProfile?.activated_at
                                    ? "Deactivate"
                                    : "Activate"}{" "}
                                Account
                            </Button>
                            <Button
                                onClick={() => setOpen(true)}
                                variant="default"
                            >
                                <div className="flex items-center gap-1">
                                    <div>Platform Fee</div>
                                    <CirclePercent size={16} />
                                </div>
                            </Button>
                            <Button asChild variant="outline">
                                <Link
                                    href={route("admin.mentor-profiles.index")}
                                >
                                    Cancel
                                </Link>
                            </Button>
                        </PageHeading.Actions>
                    </PageHeading>
                    <div className="grid sm:grid-cols-12 gap-x-4">
                        <div className="grid gap-4 sm:col-span-8">
                            <div className="w-full mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-md">
                                <div className="flex justify-between bg-muted p-3 rounded-lg">
                                    <div>
                                        <TextLarge>
                                            {mentorProfile?.full_name}{" "}
                                            <span className="text-gray-500 text-sm">
                                                ({mentorProfile?.alias_name})
                                            </span>
                                        </TextLarge>
                                        <div className="">
                                            <div className="flex items-center gap-2 py-2">
                                                <div>
                                                    <Mail size={16} />
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {mentorProfile?.user?.email}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    <Phone size={16} />
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {mentorProfile?.phone}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 py-2">
                                                <div className="text-gray-600">
                                                    Total Experience:
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {mentorProfile?.experience}
                                                </div>
                                            </div>
                                            {/* <div className="flex items-center gap-2">
                                                <span className="text-gray-600">
                                                    Total Revenue:
                                                </span>
                                                <span className="font-medium text-green-600">
                                                    ₹ 200 /-
                                                </span>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            src={
                                                mentorProfile?.profile_picture !==
                                                null
                                                    ? mentorProfile
                                                          ?.profile_picture
                                                          ?.full_path
                                                    : "/images/unknown.jpg"
                                            }
                                            alt=""
                                            className="w-[200px] h-[150px] object-cover border rounded-lg"
                                        />
                                    </div>
                                </div>
                                <div className="pt-2">
                                    {mentorProfile?.languages?.length > 0 && (
                                        <div>
                                            <TextMuted className="inline-block">
                                                Languages
                                            </TextMuted>
                                            <TextLarge>
                                                {mentorProfile?.languages?.map(
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
                                <div className="pt-2">
                                    {mentorProfile?.educations?.length > 0 && (
                                        <div>
                                            <TextMuted className="inline-block">
                                                Education Details
                                            </TextMuted>
                                            <TextLarge>
                                                {mentorProfile?.educations?.map(
                                                    (detail, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="default"
                                                            className="mr-1 mb-1"
                                                        >
                                                            {detail.degree} :{" "}
                                                            {detail.school}
                                                        </Badge>
                                                    ),
                                                )}
                                            </TextLarge>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {mentorProfile?.topic_tags &&
                                        mentorProfile?.topic_tags?.length >
                                            0 && (
                                            <>
                                                <TextMuted className="inline-block">
                                                    Tags
                                                </TextMuted>
                                                <TextLarge className="leading-[0] capitalize">
                                                    {mentorProfile?.topic_tags?.map(
                                                        (tag) => (
                                                            <Badge
                                                                key={tag.id}
                                                                variant="default"
                                                                className="mr-1 mb-1"
                                                            >
                                                                {tag?.title}
                                                            </Badge>
                                                        ),
                                                    )}
                                                </TextLarge>
                                            </>
                                        )}
                                </div>
                                {mentorProfile?.bio?.length > 0 && (
                                    <div className="pt-3">
                                        <TextMuted className="inline-block pb-1">
                                            Mentor Bio
                                        </TextMuted>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: mentorProfile?.bio,
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {mentorProfile?.why_choose_us?.length > 0 && (
                                    <div>
                                        <TextMuted className="inline-block pt-4">
                                            Why Choose Us
                                        </TextMuted>
                                        <p className="text-sm text-gray-600">
                                            {mentorProfile?.why_choose_us}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <UserSocialLinks
                                        socialLinks={
                                            mentorProfile?.social_links
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <ShadcnCard title="Mentor Rating List">
                                    {mentorProfile?.ratings?.length > 0 ? (
                                        <>
                                            <TextMuted className="mb-2">
                                                Total Ratings:{" "}
                                                {mentorProfile?.ratings?.length}
                                            </TextMuted>

                                            <div className="mt-4 h-64 overflow-y-auto">
                                                {mentorProfile?.ratings?.map(
                                                    (ratingList, index) => (
                                                        <div
                                                            key={index}
                                                            className="border-t pt-4"
                                                        >
                                                            <div className="flex gap-2">
                                                                <TextLarge>
                                                                    {
                                                                        ratingList?.title
                                                                    }
                                                                </TextLarge>

                                                                <div className="flex gap-0.5">
                                                                    {[
                                                                        ...Array(
                                                                            ratingList?.value,
                                                                        ),
                                                                    ].map(
                                                                        (
                                                                            _,
                                                                            index,
                                                                        ) => (
                                                                            <div
                                                                                className="p-1 bg-yellow-500 rounded"
                                                                                key={`mentor-rating-${index}`}
                                                                            >
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="currentColor"
                                                                                    className="size-4"
                                                                                >
                                                                                    <path
                                                                                        fillRule="evenodd"
                                                                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                                                                        clipRule="evenodd"
                                                                                    />
                                                                                </svg>
                                                                            </div>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {ratingList
                                                                ?.description
                                                                ?.length >
                                                                0 && (
                                                                <TextLarge className="pt-1 text-sm">
                                                                    Message:{" "}
                                                                    <span className="text-gray-600">
                                                                        {
                                                                            ratingList?.description
                                                                        }
                                                                    </span>
                                                                </TextLarge>
                                                            )}
                                                            <TextMuted className="pt-1">
                                                                Date:{" "}
                                                                {new Date(
                                                                    ratingList.created_at,
                                                                ).toLocaleDateString()}
                                                            </TextMuted>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        // Small card for no ratings available
                                        <div className="p-4 border rounded bg-gray-100 mt-4">
                                            <TextMuted>
                                                No ratings available
                                            </TextMuted>
                                        </div>
                                    )}
                                </ShadcnCard>
                            </div>
                            <div className="pt-4">
                                <div className="grid gap-4 grid-cols-1">
                                    <div className="font-semibold text-3xl">
                                        Mentor Courses
                                    </div>
                                    <RTable
                                        data={mentorProfile?.courses}
                                        columns={columns}
                                        searchColumns={["title"]}
                                        paginationLinks={mentorProfile?.links}
                                        meta={mentorProfile?.meta}
                                        // exportable={true}
                                        // filename={`Mentors_${formatDate( new Date(), "dd-mm-yyyy")}`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <Verify
                                mentorProfile={mentorProfile}
                                mentorProfileStatusEnums={
                                    mentorProfileStatusEnums
                                }
                                userType={user?.roles[0]?.name}
                                id={mentorProfile?.id}
                            />
                            {mentorProfile?.kyc_detail !== null ? (
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                >
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                KYC Details
                                            </h2>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="w-full mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-md">
                                                <div className="pb-6">
                                                    {" "}
                                                    <RazorPayKYC
                                                        mentor={mentorProfile}
                                                    />
                                                </div>
                                                {/* <p className="text-sm text-gray-500 mb-4">
                                                    {" "}
                                                    {mentorProfile?.kyc_detail !==
                                                    null
                                                        ? "Verified"
                                                        : "Not Verified"}
                                                </p> */}
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Bank Name:
                                                        </span>
                                                        <span className="font-medium text-gray-800">
                                                            {
                                                                mentorProfile
                                                                    ?.kyc_detail
                                                                    ?.bank_name
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Account Holder Name:
                                                        </span>
                                                        <span className="font-medium text-gray-800">
                                                            {
                                                                mentorProfile
                                                                    ?.kyc_detail
                                                                    ?.bank_account_holder_name
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Account Number:
                                                        </span>
                                                        <span className="font-medium text-gray-800">
                                                            {
                                                                mentorProfile
                                                                    ?.kyc_detail
                                                                    ?.bank_account_number
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Name:
                                                        </span>
                                                        <span className="font-medium text-gray-800">
                                                            {
                                                                mentorProfile
                                                                    ?.kyc_detail
                                                                    ?.bank_account_holder_name
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Email:
                                                        </span>
                                                        <span className="font-medium text-gray-800">
                                                            {
                                                                mentorProfile
                                                                    ?.kyc_detail
                                                                    ?.email
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Phone:
                                                        </span>
                                                        <span className="font-medium text-gray-800">
                                                            {
                                                                mentorProfile
                                                                    ?.kyc_detail
                                                                    ?.phone_number
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Pin Code:
                                                        </span>
                                                        <span className="font-medium text-gray-800">
                                                            {
                                                                mentorProfile
                                                                    ?.kyc_detail
                                                                    ?.pin_code
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            GST No:
                                                        </span>
                                                        <span className="font-medium text-gray-800">
                                                            {
                                                                mentorProfile
                                                                    ?.kyc_detail
                                                                    ?.gst
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            IFS Code:
                                                        </span>
                                                        <span className="font-medium text-gray-800">
                                                            {
                                                                mentorProfile
                                                                    ?.kyc_detail
                                                                    ?.bank_ifsc_code
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Address1:
                                                        </span>
                                                        <span className="font-medium text-sm text-gray-800">
                                                            {
                                                                mentorProfile
                                                                    ?.kyc_detail
                                                                    ?.address
                                                            }
                                                        </span>
                                                    </div>
                                                    {mentorProfile?.kyc_detail
                                                        ?.address_line2 && (
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">
                                                                Address2:
                                                            </span>
                                                            <span className="font-medium text-sm text-gray-800">
                                                                {
                                                                    mentorProfile
                                                                        ?.kyc_detail
                                                                        ?.address_line2
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            City
                                                        </span>
                                                        <span className="font-medium text-gray-800">
                                                            {
                                                                mentorProfile
                                                                    ?.kyc_detail
                                                                    ?.city
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            State
                                                        </span>
                                                        <span className="font-medium text-gray-800">
                                                            {
                                                                mentorProfile
                                                                    ?.kyc_detail
                                                                    ?.state
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Country
                                                        </span>
                                                        <span className="font-medium text-gray-800">
                                                            {
                                                                mentorProfile
                                                                    ?.kyc_detail
                                                                    ?.country
                                                            }
                                                        </span>
                                                    </div>

                                                    <>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">
                                                                Updated At:
                                                            </span>
                                                            {mentorProfile
                                                                .kyc_detail
                                                                ?.updated_at && (
                                                                <span className="text-sm font-medium text-green-600">
                                                                    {new Date(
                                                                        mentorProfile.kyc_detail?.updated_at,
                                                                    ).toLocaleString(
                                                                        "en-US",
                                                                        {
                                                                            year: "numeric",
                                                                            month: "long",
                                                                            day: "numeric",
                                                                            hour: "numeric",
                                                                            minute: "numeric",
                                                                            hour12: true,
                                                                        },
                                                                    )}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    {mentorProfile?.attachments?.length > 0 && (
                                        <AccordionItem value="item-2">
                                            <AccordionTrigger>
                                                <h2 className="text-xl font-semibold text-gray-800">
                                                    Attachments
                                                </h2>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div>
                                                    <ShadcnCard>
                                                        <div className="w-full">
                                                            {user?.attachments.map(
                                                                (
                                                                    attachment,
                                                                    index,
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="flex flex-wrap gap-2 items-center border p-2 px-5 bg-slate-100 rounded mb-1.5"
                                                                    >
                                                                        <div className="text-sm flex gap-2">
                                                                            <div>
                                                                                {index +
                                                                                    1}

                                                                                .
                                                                            </div>
                                                                            {attachment?.name.slice(
                                                                                0,
                                                                                30,
                                                                            ) ||
                                                                                `Document ${
                                                                                    index +
                                                                                    1
                                                                                }`}
                                                                            .pdf
                                                                        </div>

                                                                        <a
                                                                            href={
                                                                                attachment?.full_path
                                                                            }
                                                                            download
                                                                            className="bg-blue-400 hover:bg-[#894eef] text-white font-bold py-2 px-4 rounded"
                                                                        >
                                                                            <DownloadIcon className="w-4 h-4" />
                                                                        </a>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </ShadcnCard>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    )}
                                </Accordion>
                            ) : (
                                <div className="text-sm text-red-500 text-center p-4 bg-muted mt-2 rounded-lg">
                                    KYC details not updated yet
                                </div>
                            )}
                        </div>
                    </div>
                    <MentorPlatformCharges
                        open={open}
                        setOpen={setOpen}
                        taxes={taxes}
                        plateFormFees={plateFormFees}
                        id={mentorProfile?.id}
                        mentorProfile={mentorProfile}
                    />
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}
