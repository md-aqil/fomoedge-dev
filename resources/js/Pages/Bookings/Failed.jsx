import PageBanner from "@/Components/PageBanner";
import BlankLayout from "@/Layouts/blank-layout";
import Header from "@/Layouts/Header";
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import React from "react";

export default function Failed({ booking }) {
    return (
        <BlankLayout>
            <Header />
            <div>
                <PageBanner title={"Payment Failed!"} />
            </div>

            <div className="bg-red-50 p-6  md:mx-auto">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="text-red-600 w-16 h-16 mx-auto my-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>

                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment Failed!
                    </h3>
                    <p className="text-gray-600 my-2">
                        Sorry, your payment failed.
                    </p>
                    <p> Please try again! </p>

                    <div className="py-10 text-center">
                        <Button asChild>
                            <a
                                href={booking?.payment_gateway_data?.short_url}
                                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                            >
                                Try again
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </BlankLayout>
    );
}
