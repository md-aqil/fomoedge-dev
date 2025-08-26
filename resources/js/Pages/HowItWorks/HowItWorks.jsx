import React from "react";

import PageBanner from "@/Components/PageBanner";
import PageLayout from "@/Layouts/PageLayout";
import SectionWrapper from "@/Components/SectionWrapper";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/shadcn/ui/accordion";
import { Head } from "@inertiajs/react";
import { cn } from "@/shadcn/utils";

const steps = [
    {
        id: "01",
        title: "Sign Up as a Mentor",
        description:
            "Create a mentor profile highlighting your expertise, skills, and availability. This helps mentees find the perfect mentor for their needs.",
        image: "https://images.pexels.com/photos/2882566/pexels-photo-2882566.jpeg?auto=compress&cs=tinysrgb&w=1200",
        label: "MENTOR PROFILE",
    },
    {
        id: "02",
        title: "Connect with Mentees",
        description:
            "Respond to mentee requests and schedule sessions that align with your availability. Engage in meaningful conversations to guide and support your mentees.",
        image: "https://images.pexels.com/photos/6325975/pexels-photo-6325975.jpeg?auto=compress&cs=tinysrgb&w=1200",
        label: "MENTEE INTERACTIONS",
    },
    {
        id: "03",
        title: "Provide Guidance & Feedback",
        description:
            "Help mentees navigate their learning path by offering insights, resources, and actionable feedback to ensure their success.",
        image: "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        label: "ONGOING SUPPORT",
    },
];

const faqs = [
    {
        category: "General Questions",
        items: [
            {
                question: "What is Fomoedge?",
                fullAnswer:
                    "Fomoedge is a mentorship platform that connects mentors with individuals seeking career guidance, professional development, and industry insights—without any course selling, upselling, or promotional distractions.",
            },
            {
                question: "How does Fomoedge work for mentors?",
                fullAnswer:
                    "As a mentor, you can share your expertise in Career Growth & Development, Resume Building, Job Applications, Product Strategy, Leadership Coaching, Start-Up Support, and more. You set your availability, determine your session fees, and provide one-on-one mentorship to mentees.",
            },
            {
                question: "How are mentors selected on Fomoedge?",
                fullAnswer:
                    "Mentors on Fomoedge are vetted professionals with at least 3+ years of industry experience, ensuring high-quality guidance.",
            },
            {
                question: "Do mentors sell courses on Fomoedge?",
                fullAnswer:
                    "No! Fomoedge is a no-course-selling platform. Mentors provide genuine guidance without promoting any courses, cross-selling, or marketing distractions.",
            },
            {
                question: "Can I mentor in multiple categories?",
                fullAnswer:
                    "You can offer mentorship in maximum 3 topics to help professionals.",
            },
            {
                question: "What makes Fomoedge different from online courses?",
                fullAnswer:
                    "Unlike courses, Fomoedge provides personalized mentorship, allowing real-time interaction with industry experts without any upselling or promotional content.",
            },
            {
                question: "How can I leave a review for my mentor?",
                fullAnswer:
                    "After your session, you can rate and review mentors to help future mentees make informed decisions.",
            },
            {
                question: "How does Fomoedge ensure mentor quality?",
                fullAnswer:
                    "All mentors are vetted for experience, expertise, and credibility before being listed on the platform.",
            },
            {
                question:
                    "Can I connect with international mentors on Fomoedge?",
                fullAnswer:
                    "Yes! You can connect with mentors from different countries and industries. Just search, book a session, and get expert advice.",
            },
        ],
    },
    {
        category: "FAQs for Mentees",
        items: [
            {
                question: "How do I find the right mentor?",
                fullAnswer:
                    "Browse mentor profiles based on Career Domains, Job Applications, Industry-Specific Guidance, Personal Branding, Start-Up Support, and more.",
            },
            {
                question: "How do I book a session?",
                fullAnswer:
                    "Simply search for a mentor, check their availability, and book a session directly through Fomoedge.",
            },
            {
                question: "How much does mentorship cost?",
                fullAnswer:
                    "Session pricing is set by the mentor and displayed upfront before booking.",
            },
            {
                question: "How can mentorship help in career growth?",
                fullAnswer:
                    "Mentorship can help with Job Applications, Resume Optimization, Interview Preparation, Industry Networking, Salary Negotiation, and Leadership Development.",
            },
            {
                question: "Can I have multiple mentors?",
                fullAnswer:
                    "Yes! You can work with multiple mentors for different areas of expertise, such as Career Growth, Leadership, Business Strategy, International Mobility, and more.",
            },
            {
                question: "Is online mentorship effective?",
                fullAnswer:
                    "Yes! Online mentorship provides flexibility, global access to experts, and personalized guidance just as effective as in-person coaching.",
            },
            {
                question: "How can Fomoedge help with personal branding?",
                fullAnswer:
                    "Learn from experts about LinkedIn Optimization, Professional Networking, Thought Leadership, and Content Strategy.",
            },
            {
                question: "Where can I find expert start-up advisors?",
                fullAnswer:
                    "Book a session with seasoned entrepreneurs and business leaders on Fomoedge.",
            },
            {
                question:
                    "How can I switch careers without experience in a new field?",
                fullAnswer:
                    "Fomoedge mentors offer career transition strategies, resume optimization tips, and skill-building advice for a seamless industry switch.",
            },
        ],
    },
];
const HowItWorks = ({ page, topics, className }) => {
    return (
        <div>
            <PageBanner title={"How It works"} />
            <section className="relative py-48 flex flex-col items-center justify-center text-center text-white">
                <div className="absolute inset-0 w-full h-full overflow-hidden -top-w24">
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        src="/how-it-works.mp4"
                        autoPlay
                        muted
                        loop
                        aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60" />
                </div>

                <div className="z-10 space-y-2 max-w-5xl mx-auto">
                    <SectionWrapper.Heading level="h1" className={`space-y-2`}>
                        Don't Wait – Start Your Mentorship Journey Today
                    </SectionWrapper.Heading>
                    <SectionWrapper.Subheading
                        level="p"
                        className={`text-slate-300`}
                    >
                        Gain the knowledge and skills you need to succeed.
                    </SectionWrapper.Subheading>
                </div>
            </section>

            <SectionWrapper.Boxed>
                <div className="flex flex-col gap-12 p-8">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`relative flex flex-col md:flex-row items-center gap-8 ${
                                index % 2 === 0
                                    ? "md:flex-row"
                                    : "md:flex-row-reverse"
                            }`}
                        >
                            <div
                                className={`absolute ${
                                    index % 2 === 0 ? "left-0" : "right-0"
                                } top-0 h-full border-l-2 border-blue-500 hidden md:block`}
                            />
                            <div className="flex-1 text-center md:text-left px-4">
                                <span
                                    className={`text-sm font-bold uppercase tracking-widest transform -rotate-90 origin-left absolute ${
                                        index % 2 === 0
                                            ? "left-[-1rem]"
                                            : "right-[-13rem]"
                                    } top-1/2`}
                                >
                                    {step.label}
                                </span>
                                {/* <h2 className="text-6xl font-bold mt-2">
                                    
                                </h2> */}
                                <SectionWrapper.Heading
                                    level="h2"
                                    className={`text-6xl font-bold mt-2 text-start`}
                                >
                                    {step.id}
                                </SectionWrapper.Heading>
                                {/* <h3 className="text-2xl font-semibold mt-4">
                                    {step.title}
                                </h3> */}
                                <SectionWrapper.Heading
                                    level="h3"
                                    className={`text-2xl font font-bold mt-2 text-start`}
                                >
                                    {step.title}
                                </SectionWrapper.Heading>
                                <p className="text-gray-600 mt-4 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                            <div className="flex-1">
                                <div className="rounded-2xl bg-gray-100 p-4">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        // className="rounded-lg object-cover w-full clip-path-[polygon(20%_0%,_80%_0%,_100%_50%,_80%_100%,_20%_100%,_0%_50%)]"
                                        className="rounded-lg object-cover w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionWrapper.Boxed>
            <SectionWrapper.Boxed className={cn("bg-gray-100", className)}>
                <SectionWrapper.Heading level="h2">
                    Frequently Asked Questions
                </SectionWrapper.Heading>
                <FAQComponent data={faqs} />
            </SectionWrapper.Boxed>
        </div>
    );
};

export const FAQComponent = ({ className, data }) => {
    return (
        <div className={cn("max-w-3xl mx-auto my-10", className)}>
            <Accordion type="single" collapsible defaultValue="item-0-0">
                {data.map((faq, index) => (
                    <div key={index}>
                        <SectionWrapper.Spacer />
                        <SectionWrapper.Heading
                            level="h2"
                            className={`text-2xl text-start`}
                        >
                            {faq.category}
                        </SectionWrapper.Heading>
                        <SectionWrapper.Spacer />
                        {faq.items.map((item, idx) => (
                            <AccordionItem
                                key={idx}
                                value={`item-${index}-${idx}`}
                            >
                                <AccordionTrigger>
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm text-gray-600">
                                        {item.fullAnswer}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </div>
                ))}
            </Accordion>
        </div>
    );
};
HowItWorks.layout = (page) => (
    <PageLayout
        children={page}
        title={
            page.props.page.meta_title
                ? page.props.page.meta_title
                : "How FomoEdge Works - Simple Steps to Connect with Expert Mentors"
        }
        metaDescription={
            page.props.page.meta_description ||
            "Learn how FomoEdge connects you with industry experts for personalized mentorship. Discover our simple 3-step process to find, connect, and grow with mentors from top companies and universities."
        }
        schema={page.props.page.schema}
    />
);

export default HowItWorks;
