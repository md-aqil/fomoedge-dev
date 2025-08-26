import React from "react";
import PageHeading from "@/Components/PageHeading";

export default function About() {
    return (
        <div>
            <div className="w-full bg-fomoExtraLight-0 py-12 sm:py-16">
                <div className="grid sm:grid-cols-1 grid-cols-1 gap-3 sm:gap-5 max-w-7xl mx-auto mb-3 sm:mb-5">
                    <div className="rounded-lg bg-white p-5 shadow">
                        <h3 className="text-fomoSecondary-0 font-semibold text-center">
                            Our Vision
                        </h3>
                        <div className="mt-3 sm:mt-5 text-center">
                            <span className="text-3xl font-semibold text-gray-500">
                                Empowering Lives Through Mentorship
                            </span>
                            <p className="text-3xl font-semibold text-fomoPrimary-0 pt-4">
                                With the right mentor, no dream is too big, and
                                no goal is out of reach.
                            </p>
                        </div>
                        <div className="my-3 sm:my-6">
                            <p className="text-gray-500 text-sm sm:text-base py-3">
                                Fomoedge was built to cut through the noise and
                                give people access to trusted, one-on-one
                                guidance. It’s about empowering individuals to
                                discover their unique paths to success—armed
                                with the wisdom of those who’ve already been
                                there. Because with the right mentor, no dream
                                is too big, and no goal is out of reach.
                            </p>
                        </div>
                    </div>
                    {/* <div className="rounded-lg bg-white p-5 shadow">
                        <span className="text-fomoSecondary-0 font-semibold">
                            Our Mission
                        </span>
                        <div className="mt-3 sm:mt-5">
                            <span className="text-3xl font-semibold text-fomoPrimary-0">
                                Learning For All, Everywhere
                            </span>
                        </div>
                        <div className="my-3 sm:my-6">
                            <p className="text-gray-500 text-sm sm:text-base">
                                Our mission is to empower individuals through
                                impactful, one-on-one mentorship. By providing
                                access to trusted experts, we aim to help you
                                make better decisions, unlock new opportunities,
                                and grow with clarity and confidence. In a world
                                filled with conflicting advice, Fomoedge ensures
                                that knowledge comes from reliable
                                sources—giving you the focused, distraction-free
                                guidance you need to succeed.
                            </p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
