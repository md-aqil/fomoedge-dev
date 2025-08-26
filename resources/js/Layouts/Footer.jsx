import React from "react";
import SocialShare from "@/Components/SocialShare";
import { Link } from "@inertiajs/react";
import { Mail, MapPin } from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export const Footer = () => {
    return (
        <>
            <footer className="relative z-10 py-8 sm:py-20 border-fomoPrimary-0 border-t-8 bg-slate-800">
                <div className="max-w-screen-xl mx-auto px-4 md:px-4 lg:px-4 xl:px-0 sm:px-4">
                    <div className="flex flex-wrap gap-x-6">
                        <div className="w-full sm:w-2/3 lg:w-4/12">
                            <div
                                className="mb-3 inline-block max-w-[160px]"
                            >
                                <img
                                    src="/images/logo-transparent.png"
                                    alt=""
                                    className="invert brightness-200"
                                />
                            </div>

                            <p className="mb-2 text-base text-gray-200 flex items-center gap-x-3">
                                <MapPin className="shrink-0 h-5 w-5" /> Lucknow,
                                Uttar Pradesh, India
                            </p>
                            <p className="mb-2 text-base text-gray-200 flex items-center gap-x-3">
                                <Mail className="w-5 h-5 shrink-0" />
                                support@fomoedge.com
                            </p>
                        </div>

                        <LinkGroup header="Resources" className="text-gray-200">
                            <NavLink link={"/mentors"} label="Mentors" />

                            <NavLink link="/blog" label="Blog" />
                            <NavLink
                                link="/b2b-mentorship"
                                label="B2B Mentorship"
                            />
                        </LinkGroup>
                        <LinkGroup header="Company" className="space-y-4 grid">
                            <NavLink link="/about-us" label="About Us" />
                            <NavLink
                                link="/how-it-works"
                                label="How it Works"
                            />
                            <NavLink link="/contact-us" label="Contact Us" />
                        </LinkGroup>

                        <div className="w-full sm:w-1/2 lg:w-3/12 space-y-8">
                            <div>
                                <h4 className="mb-4 text-lg font-semibold text-gray-200">
                                    Follow Us On
                                </h4>
                                <SocialShare />
                            </div>
                        </div>
                    </div>
                    <div className="sm:flex justify-between items-center mt-10 mb-0 text-xs text-gray-200">
                        <div className="mb-2 sm:mb-0">
                            <span>
                                {" "}
                                &copy; {new Date().getFullYear()} FOMOEDGE.COM
                            </span>
                            <span className="mx-2">|</span>
                            <span>All Rights Reserved</span>
                        </div>

                        <div>
                            <span className="hover:text-white text-gray-200 transition-all duration-300">
                                <Link href="/privacy-policy">
                                    Privacy Policy
                                </Link>
                            </span>
                            <span className="mx-2 hover:text-white text-gray-200 transition-all duration-300">
                                <Link href="/terms-and-conditions">
                                    Terms & Conditions
                                </Link>
                            </span>
                            <span className="mx-2 hover:text-white text-gray-200 transition-all duration-300">
                                <Link href="/refund-policy">Refund Policy</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

const LinkGroup = ({ children, header }) => {
    return (
        <>
            <div className="w-full sm:w-1/2 lg:w-2/12">
                <div className="w-full mb-3">
                    <h4 className="text-lg font-semibold text-white">
                        {header}
                    </h4>
                    <ul className="space-y-0.5">{children}</ul>
                </div>
            </div>
        </>
    );
};

const NavLink = ({ link, label }) => {
    return (
        <li>
            <a
                href={link}
                className="inline-block leading-loose text-gray-200 text-md"
            >
                {label}
            </a>
        </li>
    );
};
const FooterLinksCloud = ({ heading = "", data = [] }) => {
    return (
        <>
            <h4 className="mt-6 mb-4 text-md font-semibold text-dark dark:text-white">
                {heading}
            </h4>
            <ul className="flex-wrap pl-0 flex gap-x-5">
                {data.map((item, index) => (
                    <li
                        className="text-sm text-neutral-500 hover:underline"
                        key={index}
                    >
                        <Link>
                            {item?.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Footer;
