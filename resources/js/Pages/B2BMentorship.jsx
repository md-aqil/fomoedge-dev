import React from "react";

import PageBanner from "@/Components/PageBanner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import PageLayout from "@/Layouts/PageLayout";

import SectionWrapper from "@/Components/SectionWrapper";
import EnquiryB2BMentorshipForm from "@/Components/EnquiryB2BMentorshipForm";
const B2BMentorship = ({ page, topics }) => {
    return (
        <div>
            <PageBanner title={"B2B Mentorship"} />
            <SectionWrapper.Boxed>
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        {/* <CardTitle>B2B Mentorship Program</CardTitle> */}
                        <CardTitle>
                            Reach Us for B2B Mentorship Program
                        </CardTitle>
                        <CardDescription>
                            Fill the form below for B2B Mentorship Program for
                            your organization/company or institution.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* <B2BMentorshipForm /> */}
                        <EnquiryB2BMentorshipForm />
                    </CardContent>
                </Card>
            </SectionWrapper.Boxed>
        </div>
    );
};

B2BMentorship.layout = (page) => (
    <PageLayout
        children={page}
        title={
            page.props.page.meta_title
                ? page.props.page.meta_title
                : page.props.page.title
        }
        metaDescription={page.props.page.meta_description}
        schema={page.props.page.schema}
    />
);

export default B2BMentorship;
