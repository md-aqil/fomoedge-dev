import MentorsWithFilter from "@/Components/MentorsWithFilter";
import PageBanner from "@/Components/PageBanner";
import TopicsTagsTabs from "@/Components/TopicsTagsTabs";
import BlankLayout from "@/Layouts/blank-layout";
import Header from "@/Layouts/Header";
import React from "react";

export default function MentorProfiles({ topics }) {
    return (
        <BlankLayout
            schema={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://fomoedge.com",
                inLanguage: "en",
                name: "Mentors",
                description: "Mentors",
                url: "https://fomoedge.com/mentors",
                image: "https://fomoedge.com/images/logo-transparent.png",
                type: "website",
                locale: "en_US",
            }}
        >
            <Header />
            <PageBanner
                title={"Mentors"}
                // breadcrumbs={<GenerateBreadcrumbs />}
            />
            {/* <TopicsTagsTabs topics={topics} /> */}
            <MentorsWithFilter topics={topics} />
        </BlankLayout>
    );
}
