import { Link } from "@inertiajs/react";
import { Search, CalendarDays, Target } from "lucide-react";
import React from "react";
import BlankLayout from "@/Layouts/blank-layout";
import Header from "@/Layouts/Header";
import { Button } from "@/shadcn/ui/button";
import PageBanner from "@/Components/PageBanner";
import SectionWrapper from "@/Components/SectionWrapper";

const HowFomoedgeWorks = () => {
    const steps = [
        {
            icon: <Search className="text-blue-500 w-10 h-10" />,
            title: "Find the Perfect Mentor",
            description:
                "Search by industry, skill, career phase, or specific expertise to connect with the right expert for your needs.",
        },
        {
            icon: <CalendarDays className="text-green-500 w-10 h-10" />,
            title: "Book Personalized Sessions",
            description:
                "Schedule one-on-one or group mentorship sessions covering executive coaching, leadership training, career transitions, resume writing, and interview preparation.",
        },
        {
            icon: <Target className="text-red-500 w-10 h-10" />,
            title: "Gain Actionable Insights",
            description:
                "Get expert guidance on job market trends, skill enhancement, networking strategies, professional resume writing, career switching, industry-specific training, and personal branding.",
        },
    ];

    return (
        <SectionWrapper.Boxed className="bg-white py-12 px-6 md:px-16">
            <SectionWrapper.Heading level="h2">
                How Fomoedge Works
            </SectionWrapper.Heading>
            <SectionWrapper.Spacer />
            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="bg-gray-100 p-6 rounded-2xl shadow-md text-center hover:scale-105 transition-transform duration-300"
                    >
                        <div className="mb-4 flex items-center justify-center">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            {step.title}
                        </h3>
                        <p className="text-gray-600">{step.description}</p>
                    </div>
                ))}
            </div>
            <div className="grid lg:grid-cols-5 gap-8">
                <div className="mt-12 bg-blue-50 p-8 rounded-2xl shadow-md text-center lg:col-span-3">
                    <SectionWrapper.Heading
                        level="h2"
                        className="text-2xl font-bold mb-4"
                    >
                        Our Vision: Empowering Lives through Mentorship
                    </SectionWrapper.Heading>
                    <p className="text-gray-600 mb-4">
                        With the right mentor, no dream is too big, and no goal
                        is out of reach.
                    </p>
                    <p className="text-gray-600">
                        At Fomoedge, we believe that the right mentor can
                        transform careers and businesses. Whether you're seeking
                        career clarity, start-up mentorship, leadership
                        coaching, entrepreneurship guidance, investment
                        strategies, or industry-specific expertise, our platform
                        ensures you get authentic, distraction-free guidance
                        from vetted experts. Leverage Fomoedge today and take
                        the next step toward professional success, skill
                        mastery, and career acceleration with expert mentorship!
                    </p>
                </div>
                <div className="mt-12 bg-purple-50 p-8 rounded-2xl shadow-md text-center lg:col-span-2">
                    <SectionWrapper.Heading
                        level="h2"
                        className="text-2xl font-bold mb-4"
                    >
                        Meet Our Founders
                    </SectionWrapper.Heading>
                    <p className="text-gray-600 mb-4">
                        The founder is an ISB Hyderabad MBA graduate with 11+
                        years of experience in corporate banking and start-up
                        growth. The co-founder, NIT Allahabad alumna, skilfully
                        balances building Fomoedge while raising a child—
                        bringing real-world expertise and a passion for
                        mentorship to the platform.
                    </p>
                </div>
            </div>
        </SectionWrapper.Boxed>
    );
};
const AboutUs = ({ page }) => {
    return (
        <div>
            <Header />
            <div>
                <PageBanner
                    title={"About Us"}
                    // breadcrumbs={<GenerateBreadcrumbs />}
                />
                <section className="w-full mx-auto pt-12 sm:pt-20 px-4 md:px-4 lg:px-4 xl:px-0 sm:px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                        <div className="sm:py-52 relative">
                            <div className="hidden sm:block py-28 bg-fomoPrimary-0"></div>
                            <img
                                className="w-[607px] h-[300px] sm:h-[595px] object-cover sm:absolute right-6 top-6 bottom-6 px-4 md:px-4 lg:px-4 xl:px-0 sm:px-4"
                                src={"/images/aboutBanner.jpeg"}
                                alt="course"
                            />
                        </div>
                        <div className="max-w-xl sm:py-4">
                            <SectionWrapper.Heading
                                level="h2"
                                className={`text-start`}
                            >
                                Why Choose Fomoedge
                            </SectionWrapper.Heading>
                            <SectionWrapper.Spacer />
                            <p className="text-gray-500 sm:text-md ">
                                {/* Navigating career transitions, executive
                                leadership, and business success can feel
                                overwhelming in today’s fast-paced world. */}
                                Fomoedge bridges the gap by connecting you with
                                trusted mentors who offer personalized,
                                actionable guidance to accelerate your growth.
                                Whether you're a student, working professional,
                                entrepreneur, company, start-up, or university,
                                expert mentorship helps unlock new opportunities
                                and career breakthroughs.
                            </p>
                            {/* <SectionWrapper.Spacer /> */}
                            {/* <SectionWrapper.Heading
                                level="h2"
                                className={`text-start`}
                            >
                                How Fomoedge Helps You
                            </SectionWrapper.Heading>
                            <p className="text-gray-500 sm:text-md pt-4">
                                The internet is full of career advice, but
                                authentic mentorship is hard to find. That’s
                                where Fomoedge stands out—bringing you
                                one-on-one mentorship from industry leaders who
                                have walked the path before you.
                            </p> */}

                            <div className="pt-3 sm:pt-10">
                                <Button
                                    asChild
                                    className="px-16 py-6 bg-gradient-to-l hover:bg-gradient-to-r from-slate-900 to-slate-700 text-white"
                                    onClick={(e) => setOpen(true)}
                                >
                                    <Link
                                        href={route("mentors.register.create")}
                                    >
                                        Be a Mentor
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <SectionWrapper.Boxed className="bg-[url('/images/p6.webp')]">
                    <SectionWrapper.Heading level="h2">
                        How Fomoedge Helps You
                    </SectionWrapper.Heading>
                    <SectionWrapper.Spacer />
                    <div className="space-y-2">
                        <p>
                            The internet is full of career advice, but authentic
                            mentorship is hard to find. That’s where Fomoedge
                            stands out—bringing you one-on-one mentorship from
                            industry leaders who have walked the path before
                            you.
                        </p>
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong> Learn from Experts</strong> – Gain
                                career insights from professionals who have
                                successfully navigated career transitions,
                                executive coaching, leadership roles, and
                                entrepreneurship.
                            </p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>Master Career & Business Growth</strong>{" "}
                                – Whether you need help with how to make a
                                resume for a job, career switching, or
                                professional executive resume writing, our
                                mentors provide tailored advice that generic
                                courses can’t match.
                            </p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>Accelerate Your Progress</strong> –
                                Avoid trial and error. Get resume writing tips,
                                job search strategies, leadership development
                                guidance, and business scaling insights from
                                experts who know what works.
                            </p>
                        </div>
                    </div>
                </SectionWrapper.Boxed>

                <SectionWrapper.Boxed className="hero-bg relative">
                    <div className="absolute inset-x-0 bottom-0">
                        <svg
                            viewBox="0 0 224 12"
                            fill="currentColor"
                            className="w-full -mb-1 text-white"
                            preserveAspectRatio="none"
                        >
                            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
                        </svg>
                    </div>
                    <SectionWrapper.Heading level="h2">
                        Why Fomoedge Stands Out
                    </SectionWrapper.Heading>
                    <SectionWrapper.Spacer />
                    <div className="space-y-2 pb-12">
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>Tailored Career Guidance</strong> –
                                Whether you're exploring new opportunities or
                                aiming to grow in your current role, our mentors
                                help you map out the right path, sharpen your
                                skills, and present yourself with confidence.
                            </p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>Real-World Insights</strong> – Connect
                                with professionals who’ve been there and done
                                that. They bring insider knowledge on hiring
                                trends, career pivots, and how to position
                                yourself for the next big move.
                            </p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>100% Guidance, Zero Spam</strong> – No
                                sales pitches or course selling—just pure,
                                practical mentorship to help you move forward
                                with confidence.
                            </p>
                        </div>
                    </div>
                </SectionWrapper.Boxed>

                {/* <SectionWrapper.Boxed className="bg-[url('/images/light-veneer.webp')]">
                    <SectionWrapper.Heading level="h2">
                        Who Can Benefit from Fomoedge
                    </SectionWrapper.Heading>
                    <SectionWrapper.Spacer />
                    <div className="space-y-2">
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>Students & Job Seekers</strong> – Learn
                                how to make a resume for a job, navigate career
                                transitions, switch industries, and master
                                interview preparation with expert insights.
                            </p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>Working Professionals</strong> – Gain
                                career advancement strategies, leadership
                                training, and industry-specific insights to
                                accelerate your professional journey.
                            </p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>Entrepreneurs & Business Owners</strong>{" "}
                                – Get expert guidance on business scaling,
                                start-up growth, fundraising, and investment
                                insights to build a sustainable and profitable
                                venture.
                            </p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>Companies & Start-ups</strong> – Access
                                tailored mentorship for leadership development,
                                strategic decision-making, business expansion,
                                and team growth.
                            </p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>
                                    Universities & Educational Institutions
                                </strong>{" "}
                                – Offer student’s expert career guidance, group
                                mentorship sessions, and workshops on resume
                                building, job search strategies, and
                                industry-specific training.
                            </p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>Leadership & Management Teams</strong> –
                                Enhance executive decision-making, develop
                                professional executive resumes, and gain
                                insights from top industry leaders through
                                exclusive mentorship programs.
                            </p>
                        </div>
                    </div>
                </SectionWrapper.Boxed> */}

                <SectionWrapper.Boxed>
                    <SectionWrapper.Heading level="h2">
                        Who Fomoedge Empowers
                    </SectionWrapper.Heading>
                    <SectionWrapper.Spacer />
                    <div className="space-y-2">
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>Students & Job Seekers</strong> – Learn
                                how to make a resume for a job, navigate career
                                transitions, switch industries, and master
                                interview preparation with expert insights.
                            </p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>Working Professionals</strong> – Gain
                                career advancement strategies, leadership
                                training, and industry-specific insights to
                                accelerate your professional journey.
                            </p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>Entrepreneurs & Business Owners</strong>{" "}
                                – Get expert guidance on business scaling,
                                start-up growth, fundraising, and investment
                                insights to build a sustainable and profitable
                                venture.
                            </p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>Companies & Start-ups</strong> – Access
                                tailored mentorship for leadership development,
                                strategic decision-making, business expansion,
                                and team growth.
                            </p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>
                                    Universities & Educational Institutions
                                </strong>{" "}
                                – Offer student’s expert career guidance, group
                                mentorship sessions, and workshops on resume
                                building, job search strategies, and
                                industry-specific training.
                            </p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>{" "}
                            <p>
                                <strong>Leadership & Management Teams</strong> –
                                Enhance executive decision-making, develop
                                professional executive resumes, and gain
                                insights from top industry leaders through
                                exclusive mentorship programs.
                            </p>
                        </div>
                    </div>
                </SectionWrapper.Boxed>
                <HowFomoedgeWorks />
            </div>
        </div>
    );
};

AboutUs.layout = (page) => (
    <BlankLayout
        children={page}
        title={
            page?.props?.page?.meta_title
                ? page?.props?.page?.meta_title
                : "About FomoEdge - Empowering Careers Through Expert Mentorship"
        }
        metaDescription={
            page?.props?.page?.meta_description ||
            "Discover how FomoEdge connects you with industry experts for personalized career guidance. Learn about our mission to empower professionals through mentorship and skill development."
        }
        schema={page.props.page.schema}
    />
);

export default AboutUs;
