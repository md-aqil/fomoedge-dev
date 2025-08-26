import React from "react";
import SectionWrapper from "./SectionWrapper";
import { Link } from "@inertiajs/react";

export default function HowItWorks() {
    return (
        <div className="relative hero-bg pt-8 pb-12">
            {/* <div className="relative bg-[#ffc93d]"> */}
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

            <SectionWrapper.Boxed level="div">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <SectionWrapper.Heading>
                            How Does Fomoedge Work?
                        </SectionWrapper.Heading>
                        <SectionWrapper.Subheading>
                            Discover how Fomoedge supports mentees and connects
                            them with experienced mentors for personalized,
                            one-on-one guidance.
                        </SectionWrapper.Subheading>
                    </div>
                    <div className="relative mt-12 lg:mt-20">
                        <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                            <img
                                alt=""
                                loading="lazy"
                                width="100"
                                height="500"
                                decoding="async"
                                data-nimg="1"
                                className="w-full brightness-0"
                                src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                            />
                        </div>
                        <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                            <div>
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                    <span className="text-xl font-semibold text-gray-700">
                                        1
                                    </span>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">
                                    Find & Book Your Mentor
                                </h3>
                                <p className="mt-4 text-base text-black">
                                    Browse expert mentors, choose one that fits
                                    your goals, and schedule a session.
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                    <span className="text-xl font-semibold text-gray-700">
                                        2
                                    </span>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">
                                    Confirm & Prepare
                                </h3>
                                <p className="mt-4 text-base text-black">
                                    Receive a confirmation email with your
                                    session details, Google Meet link, and login
                                    credentials.
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                    <span className="text-xl font-semibold text-gray-700">
                                        3
                                    </span>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">
                                    Join & Learn
                                </h3>
                                <p className="mt-4 text-base text-black">
                                    Connect at the scheduled time for
                                    personalized mentorship and expert guidance.
                                </p>
                            </div>
                        </div>
                        <div className="mt-12 text-center">

                            
                            <Link
                                href="/how-it-works"
                                className="px-6 py-3 border rounded-lg border-black text-black bg-transparent hover:text-white hover:bg-gray-900"
                            >
                                Learn More
                            </Link>

                            
                        </div>
                    </div>
                </div>
            </SectionWrapper.Boxed>
        </div>
    );
}
