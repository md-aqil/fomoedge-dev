import React from "react";
import MentorAuthLayout from "@/Layouts/MentorAuthLayout/MentorAuthLayout";
import { Head } from "@inertiajs/react";
import KYCForm from "./KYCForm";
import PageHeading from "@/Components/PageHeading";
import ShadcnCard from "@/Components/ShadcnCard";
import { Separator } from "@/shadcn/ui/separator";
import { ShieldAlertIcon, VerifiedIcon } from "lucide-react";

export default function KycDetails({ mentorKycDetail }) {
    return (
        <MentorAuthLayout>
            <Head>
                <title>Update KYC Details</title>
            </Head>
            <PageHeading className="mb-5">
                <div className="">
                    <PageHeading.Title>Update KYC Details</PageHeading.Title>
                    <p className="text-sm pt-1">
                        Make changes to your KYC Form here. Click save when
                        you're done.
                    </p>
                </div>
                {/* <PageHeading.Actions>
                    <Button asChild variant="outline">
                        <Link href={route("mentors")}>Cancel</Link>
                    </Button>
                </PageHeading.Actions> */}
            </PageHeading>
            <div className="grid sm:grid-cols-12 gap-x-4 space-y-3 sm:space-y-0">
                <div className="grid gap-4 sm:col-span-7">
                    <KYCForm mentorKycDetail={mentorKycDetail} />
                </div>

                <div className="sm:col-span-5">
                    {mentorKycDetail == null && (
                        <ShadcnCard
                            title={"KYC Details"}
                            description={`Please Submit your KYC details`}
                        >
                            {/* <div className="grid gap-3 text-sm">
                                <div className="font-semibold">KYC Status</div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        KYC Status
                                    </span>
                                </div>
                            </div> */}
                        </ShadcnCard>
                    )}
                    {mentorKycDetail !== null && (
                        <ShadcnCard
                            className="relative"
                            title={
                                <div className="flex items-center gap-x-2">
                                    KYC Details
                                    {mentorKycDetail.activated_at ? (
                                        <VerifiedIcon className="text-green-600" />
                                    ) : (
                                        <ShieldAlertIcon className="text-red-600" />
                                    )}
                                </div>
                            }
                            // description={`Last Updated: ${formatDate(
                            //     mentorKycDetail?.updated_at,
                            //     "dd MMM, yyyy"
                            // )}`}
                        >
                            <div className="grid gap-3 text-sm">
                                <p className="font-semibold">
                                    Personal Details
                                </p>

                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Name
                                        </span>
                                        <span>{mentorKycDetail.full_name}</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Email
                                        </span>
                                        <span>{mentorKycDetail.email}</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Phone
                                        </span>
                                        {mentorKycDetail &&
                                            mentorKycDetail?.phone_number && (
                                                <span>
                                                    {`${mentorKycDetail?.country_relation?.emoji} ${mentorKycDetail?.country_relation?.phone_code} - ${mentorKycDetail?.phone_number}`}
                                                </span>
                                            )}
                                    </li>
                                </ul>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid grid-cols-1 gap-3 text-sm">
                                <div className="grid gap-3">
                                    <div className="font-semibold">Address</div>
                                    <ul className="grid gap-2">
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                Country
                                            </span>
                                            <span>
                                                {/* {mentorKycDetail.country} */}
                                            </span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                State
                                            </span>
                                            <span>{mentorKycDetail.state}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                City
                                            </span>
                                            <span>{mentorKycDetail.city}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                Pin Code
                                            </span>
                                            <span>
                                                {mentorKycDetail.pin_code}
                                            </span>
                                        </li>
                                    </ul>
                                    <p className="text-muted-foreground font-semibold text-sm">
                                        Full Address
                                    </p>
                                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                                        <span>
                                            {mentorKycDetail.address}{" "}
                                            {mentorKycDetail.pin_code}
                                        </span>
                                    </address>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3 text-sm">
                                <div className="font-semibold">
                                    Account Information
                                </div>
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">
                                            A/C Holder Name
                                        </dt>
                                        <dd>
                                            {
                                                mentorKycDetail.bank_account_holder_name
                                            }
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">
                                            A/C Number
                                        </dt>
                                        <dd>
                                            {
                                                mentorKycDetail.bank_account_number
                                            }
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">
                                            Bank Name
                                        </dt>
                                        <dd>{mentorKycDetail.bank_name}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">
                                            IFS Code
                                        </dt>
                                        <dd>
                                            {mentorKycDetail.bank_ifsc_code}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            <Separator className="my-4" />
                            <div className="">
                                <div className="font-semibold pb-2">
                                    PAN Attachment
                                </div>
                                {mentorKycDetail.pan_card && (
                                    <img
                                        src={
                                            mentorKycDetail.pan_card?.full_path
                                        }
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </div>
                        </ShadcnCard>
                    )}
                </div>
            </div>
        </MentorAuthLayout>
    );
}
