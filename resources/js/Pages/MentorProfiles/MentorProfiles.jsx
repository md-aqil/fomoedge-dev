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
            
            {/* About Intro Section */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center mx-auto">
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
                                    <svg xmlns="http://www.w3.org/200/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 1 12 8.43m-7.007 11.55A5.981 5.981 0 0 6.75 15.75v-1.5" />
                                    </svg>
                                </div>
                                <p className="text-gray-700 font-medium pt-2">Share your expertise and make a lasting impact</p>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-fomoPrimary-0 to-[#ffdc6a] rounded-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/200/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 2.625.372 9.337 9.337 0 0 4.121-.952 4.125 4.125 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.01-.109a6.375 6.375 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                    </svg>
                                </div>
                                <p className="text-gray-700 font-medium pt-2">Build meaningful professional relationships</p>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-fomoPrimary-0 to-[#ffdc6a] rounded-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.49a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.57l1.285 5.385a.562.562 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
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
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 4.121-.952 4.125 4.125 0-7.533-2.493M15 19.128v-.03c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
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
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563 0 0 0 .475.345l5.518.42c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
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
            </div>
            
            <MentorsWithFilter topics={topics} />
        </BlankLayout>
    );
}
