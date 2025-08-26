import React from "react";
import BlankLayout from "@/Layouts/blank-layout";
import Header from "@/Layouts/Header";
import { Link } from "@inertiajs/react";
import { ChevronRight, Clock, LocateIcon, PhoneCall } from "lucide-react";
import SocialShare from "@/Components/SocialShare";
import ContactForm from "./ContactForm";
import PageBanner from "@/Components/PageBanner";

const breadcrumbs = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Contact Us",
        href: "/contact-us",
    },
];
// Loop breadcrumbs and return key and value only
const GenerateBreadcrumbs = () => {
    return breadcrumbs.map((item, index) => {
        return (
            <div
                className="flex justify-center items-center sm:gap-1 "
                key={index}
            >
                <ChevronRight className="h-5 w-5" />
                <div className="text-sm">{item.title}</div>
            </div>
        );
    });
};
const ContactUs = () => {
    return (
        <div>
            <Header />
            <div>
                <PageBanner
                    title={"Contact Us"}
                    breadcrumbs={<GenerateBreadcrumbs />}
                />
                <div className=" bg-fomoExtraLight-0">
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 sm:gap-8 item-center max-w-screen-xl mx-auto py-12 sm:py-20 px-4 md:px-4 lg:px-4 xl:px-0 sm:px-4">
                        <ul className="p-6 sm:p-8 bg-white rounded-lg shadow-md">
                            <li className="flex">
                                <div className="flex sm:h-10 h-8 sm:min-w-10 min-w-8 items-center justify-center rounded bg-fomoPrimary-0 text-gray-50">
                                    <LocateIcon />
                                </div>
                                <div className="ml-4 mb-4">
                                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">
                                        Visit Us
                                    </h3>
                                    <p className="text-gray-600 text-sm sm:text-base">
                                        Lucknow, Uttar Pradesh
                                    </p>
                                </div>
                            </li>
                            <li className="flex">
                                <div className="flex sm:h-10 h-8 sm:min-w-10 min-w-8 items-center justify-center rounded bg-fomoPrimary-0 text-gray-50">
                                    <PhoneCall />
                                </div>
                                <div className="ml-4 mb-4">
                                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 ">
                                        Get In Touch
                                    </h3>

                                    <p>
                                        <a
                                            //   href={`mailto:${email}`}
                                            //   key={index}
                                            className="text-gray-600 text-sm sm:text-base"
                                        >
                                            support@fomoedge.com
                                        </a>
                                    </p>
                                </div>
                            </li>
                            <li className="flex">
                                <div className="flex sm:h-10 h-8 sm:min-w-10 min-w-8 items-center justify-center rounded bg-fomoPrimary-0 text-gray-50">
                                    <Clock />
                                </div>
                                <div className="ml-4 mb-4">
                                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">
                                        Working hours
                                    </h3>
                                    <p className="text-gray-600 text-sm sm:text-base">
                                        Mentorship knows no time. Guiding you is
                                        our priority. Feel free to message us
                                        anytime, and we’ll be happy to help you!
                                    </p>
                                </div>
                            </li>
                            <li className="border-t pt-5">
                                <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 text-center">
                                    Connect With Us
                                </h3>
                                <div className="flex justify-center items-center">
                                    <SocialShare />
                                </div>
                            </li>
                        </ul>
                        <div className="p-6 sm:p-10 bg-white rounded-lg shadow-md">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ContactUs.layout = (page) => (
    <BlankLayout
        children={page}
        title={
            page?.props?.page?.meta_title
                ? page?.props?.page?.meta_title
                : "Contact FomoEdge - Get in Touch with Our Mentorship Team"
        }
        metaDescription={
            page?.props?.page?.meta_description ||
            "Have questions about our mentorship platform? Reach out to the FomoEdge team for support with booking sessions, becoming a mentor, or general inquiries. We're here to help you succeed."
        }
        schema={page?.props?.page?.schema}
    />
);

export default ContactUs;
