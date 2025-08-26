import React from "react";
// import MentorCategoryTabs from "@/Components/MentorCategoryTabs";
import Header from "@/Layouts/Header";
import { useRef } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import BlankLayout from "@/Layouts/blank-layout";

import AboutIntro from "@/Components/AboutIntro";
import RecentPosts from "@/Components/RecentPosts";
import Hero from "@/Components/Hero";
import HowItWorks from "@/Components/HowItWorks";
import UserReviewsCarousel from "@/Components/UserReviewsCarousel";
import SectionWrapper from "@/Components/SectionWrapper";
import TopicsTagsTabs from "@/Components/TopicsTagsTabs";

const topUniversities = [
    {
        id: 1,
        path: "/images/topUniversity/isb.png",
    },
    {
        id: 2,
        path: "/images/topUniversity/iims.png",
    },
    {
        id: 3,
        path: "/images/topUniversity/iit.png",
    },
    {
        id: 4,
        path: "/images/topUniversity/nit.png",
    },
    {
        id: 5,
        path: "/images/topUniversity/xlri.webp",
    },
    {
        id: 6,
        path: "/images/topUniversity/insead.png",
    },
    {
        id: 7,
        path: "/images/topUniversity/kellogg.png",
    },
    {
        id: 8,
        path: "/images/topUniversity/imd.png",
    },
    {
        id: 9,
        path: "/images/topUniversity/cambridge.png",
    },
    {
        id: 10,
        path: "/images/topUniversity/oxford.png",
    },
    {
        id: 11,
        path: "/images/topUniversity/columbia.png",
    },
    {
        id: 12,
        path: "/images/topUniversity/lse.png",
    },
    {
        id: 13,
        path: "/images/topUniversity/hecParis.png",
    },
    {
        id: 14,
        path: "/images/topUniversity/nus.png",
    },
];

const topCompanies = [
    {
        id: 1,
        path: "/images/topCompanies/acenture.png",
    },
    {
        id: 2,
        path: "/images/topCompanies/pwc.png",
    },
    {
        id: 3,
        path: "/images/topCompanies/Airbnb.png",
    },
    {
        id: 4,
        path: "/images/topCompanies/Amazon.webp",
    },
    {
        id: 5,
        path: "/images/topCompanies/BankofAmerica.webp",
    },
    {
        id: 6,
        path: "/images/topCompanies/Barclays.png",
    },
    {
        id: 7,
        path: "/images/topCompanies/BGG.png",
    },
    {
        id: 8,
        path: "/images/topCompanies/Deloitte.png",
    },
    {
        id: 9,
        path: "/images/topCompanies/EY.webp",
    },
    {
        id: 10,
        path: "/images/topCompanies/Flipkart.png",
    },
    {
        id: 11,
        path: "/images/topCompanies/GoldmanSachs.png",
    },
    {
        id: 12,
        path: "/images/topCompanies/Google.webp",
    },
    {
        id: 13,
        path: "/images/topCompanies/J.P. Morgan.png",
    },
    {
        id: 14,
        path: "/images/topCompanies/KPMG.png",
    },
    {
        id: 15,
        path: "/images/topCompanies/McKinsey.webp",
    },
    {
        id: 16,
        path: "/images/topCompanies/Meesho.png",
    },
    {
        id: 17,
        path: "/images/topCompanies/Microsoft.webp",
    },
    {
        id: 18,
        path: "/images/topCompanies/michaelPage.png",
    },
    {
        id: 19,
        path: "/images/topCompanies/Uber.webp",
    },
];

const Homepage = ({ page, topics }) => {
    const pageProp = usePage().props;
    const { testimonials = [], latestPosts = [] } = usePage().props;
    // console.log("🚀 ~ Homepage ~ testimonials:", testimonials);
    return (
        <div>
            <Header isHomePage={true} />

            <Hero />
            <div className="container-fluid bg-[#fff85233]">
      <AboutIntro pageProp={pageProp} />
            </div>

      


            <div className="bg-gray-100 py-12">
                <TopicsTagsTabs topics={topics} />
            </div>


            <HowItWorks />
          
            <div className="py-16 bg-[#fff85233]">
                <div className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16 px-4">
                    Our Mentors Come From
                </div>
                
                {/* Two-column layout for Top Schools/Universities and Top Companies/Start-ups */}
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Left Column: Top Schools / Universities */}
                        <div>
                            <div className="text-center mb-8">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2 inline-block pb-2 border-b-2 border-fomoPrimary-0">
                                    Top Schools / Universities
                                </h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {topUniversities.map((university) => (
                                    <div key={university.id} className="flex justify-center">
                                        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-center h-24 w-40 transition-all duration-300 hover:shadow-lg">
                                            <img
                                                src={university.path}
                                                alt=""
                                                className="h-20 w-full object-contain"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Right Column: Top Companies / Start-ups */}
                        <div>
                            <div className="text-center mb-8">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2 inline-block pb-2 border-b-2 border-fomoPrimary-0">
                                    Top Companies / Start-ups
                                </h3>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {topCompanies.map((company) => (
                                    <div key={company.id} className="flex justify-center">
                                        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-center h-24 w-40 transition-all duration-300 hover:shadow-lg">
                                            <img
                                                src={company.path}
                                                alt=""
                                                className="w-full h-20 object-contain"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
            {latestPosts.length > 0 && <RecentPosts blogPost={latestPosts} />}
            {testimonials.length > 0 && (
                <UserReviewsCarousel testimonials={testimonials} />
            )}
        </div>
    );
};

Homepage.layout = (page) => (
    <BlankLayout
        children={page}
        title={
            page.props.page.meta_title
                ? page.props.page.meta_title
                : "FomoEdge: Connect with World-Class Mentors to Accelerate Your Career"
        }
        metaDescription={
            page.props.page.meta_description ||
            "Unlock your potential with expert mentorship from industry leaders. Get personalized career guidance, resume tips, interview prep, and professional development advice. Connect with mentors from top companies and universities today."
        }
        schema={page.props.page.schema}
    />
);

export default Homepage;
