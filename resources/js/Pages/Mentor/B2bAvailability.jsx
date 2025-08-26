import PageHeading from "@/Components/PageHeading";

import MentorAuthLayout from "@/Layouts/MentorAuthLayout/MentorAuthLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

import B2BMentorshipForm from "@/Components/B2BMentorshipForm";
import ShadcnCard from "@/Components/ShadcnCard";

export default function B2bAvailibility({ mentorProfile }) {
    return (
        <MentorAuthLayout>
            <Head>
                <title>Update Profile</title>
            </Head>
            <PageHeading className="mb-5">
                <div className="">
                    <PageHeading.Title>B2B Availability</PageHeading.Title>
                    <p className="text-sm pt-1">
                        Make changes to your profile here. Click save when
                        you're done.
                    </p>
                </div>
            </PageHeading>
            <div className="grid sm:grid-cols-12 gap-x-4">
                <div className="grid gap-4 sm:col-span-8">
                    <ShadcnCard title={mentorProfile?.full_name}>
                        <B2BMentorshipForm />
                    </ShadcnCard>
                </div>
            </div>
        </MentorAuthLayout>
    );
}
