import React from "react";
import Search from "./Search";
import { TypeAnimation } from "react-type-animation";
import SectionWrapper from "./SectionWrapper";

import { Button } from "@/shadcn/ui/button";
import { ArrowDown } from "lucide-react";
import { Link } from "@inertiajs/react";
const TypingText = () => {
    return (
        <TypeAnimation
            sequence={[
                "Career Switch",
                1000,
                "LinkedIn Optimization",
                1000,
                "Study Abroad",
                1000,
                "Growth Strategy",
                1000,
                "GMAT Exam",
                1000,
                "CAT Exam",
                1000,
                "GRE Exam",
                1000,
                "Product Management",
                1000,
                "CFA Exam",
                1000,
                "Go to Market Strategy",
                1000,
                "FRM Exam",
                1000,
                "Start-Up Support",
                1000,
                "Exams Coaching",
                1000,
                "Product Strategy",
                1000,
                "Overseas Career",
                1000,
                "Airbnb Start-Up Model",
                1000,
                "Job Application",
                1000,
                "Resume Building",
                1000,
                "Digital Marketing",
                1000,
                "Finance Careers",
                1000,
                "Product Management Careers",
                1000,
                "Social Media Growth",
                1000,
                "Influencer Marketing",
                1000,
                "Human Resources Careers",
                1000,
                "International Scholarships",
                1000,
                "Technology Careers",
                1000,
                "Data Science Careers",
                1000,
                "Jobs Abroad",
                1000,
                "IELTS Exam",
                1000,
                "Analytics Careers",
                1000,
                "Immigration",
                1000,
                "Global Job Market",
                1000,
                "Project Management",
                1000,
                "MBA Preparation",
                1000,
                "Quantitative Aptitude",
                1000,
                "Verbal Reasoning",
                1000,
                "Pitch Deck Creation",
                1000,
                "Foreign Languages",
                1000,
                "Phd & careers",
                1000,
            ]}
            wrapper="span"
            speed={50}
            className="text-3xl sm:text-4xl font-bold flex justify-center text-center"
            repeat={Infinity}
        />
    );
};
export default function Hero() {
    return (
        <div className="relative hero-bg bg-fixed">
            <div className="absolute inset-x-0 bottom-0">
                <svg
                    viewBox="0 0 224 12"
                    fill="#fffedc"
                    className="w-full -mb-1 text-white"
                    preserveAspectRatio="none"
                >
                    <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
                </svg>
            </div>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-44 lg:pb-24">
                <div className="relative sm:text-center max-w-3xl mx-auto space-y-6">
                    <SectionWrapper.Heading level="div" className={`space-y-2`}>
                        <h1>Expert insights | Connect with vetted experts</h1>
                        <p className="text-3xl font-bold text-center">
                            Unlock Your Potential
                        </p>
                    </SectionWrapper.Heading>
                    <SectionWrapper.Subheading
                        className={`text-2xl text-slate-900`}
                    >
                        1-on-1 mentorship
                    </SectionWrapper.Subheading>

                    <TypingText />
                    <Search />
                    <p className="max-w-xl mb-10 text-md tracking-wide text-black sm:text-xl text-center mx-auto md:mb-16">
                        Just Expert Advice Tailored for You—Because You Deserve
                        the Edge to Succeed.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Button
                            className="px-4 py-6 bg-black text-white hover:bg-gray-800"
                            asChild
                        >
                              <Link
                                href="/mentors"
                            >
                                Explore Our Mentors
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            className="px-4 py-6 border-black text-black bg-transparent hover:text-white hover:bg-gray-900"
                            asChild
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
        </div>
    );
}
