import { useEffect } from "react";
import React from "react";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import CountrySelect from "@/Components/CountrySelect";
import { ArrowDown, CircleX } from "lucide-react";
import "react-phone-input-2/lib/style.css";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import LoadingButton from "@/Components/LoadingButton";
import SectionWrapper from "@/Components/SectionWrapper";
import BlankLayout from "@/Layouts/blank-layout";
import PageBanner from "@/Components/PageBanner";
import { Button } from "@/shadcn/ui/button";
import PageLayout from "@/Layouts/PageLayout";

const benefits = [
    {
        title: "Flexible Schedule",
        description:
            "Set your own hours with our online mentorship platform, giving you full control over your availability.",
    },
    {
        title: "Earn from Your Expertise",
        description:
            "Get paid for mentorship while guiding individuals, businesses, and academic institutions worldwide.",
    },
    {
        title: "Exclusive B2B Mentorship Opportunities",
        description:
            "Access to collaboration with start-ups, enterprises, and universities, expanding your influence beyond one-on-one mentoring.",
    },
    {
        title: "Expand Your Influence & Network",
        description:
            "Share your expertise with a diverse global audience, including professionals, decision-makers, start-ups, and universities. Engage in high-impact strategic initiatives and collaborate with corporate leaders, entrepreneurs, and industry experts to shape industry growth.",
    },
    {
        title: "Enhance Your Reputation",
        description:
            "Position yourself as a trusted mentor and thought leader in your field.",
    },
    {
        title: "Exclusive Blog Access",
        description:
            "Publish expert articles and insights directly on Fomoedge.",
    },
    {
        title: "Boost Your Thought Leadership",
        description:
            "Repurpose LinkedIn posts and share valuable knowledge with a wider audience.",
    },
    {
        title: "Give Back to Society",
        description:
            "Empower the next generation by sharing your knowledge, guiding aspiring professionals, and helping businesses grow. Your mentorship creates a lasting impact on careers, industries, and communities.",
    },
];
const Register = () => {
    const { globalSettings } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        phone_country_id: "",
        password: "",
        social_links: [],
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("mentors.register.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <PageBanner title={"Mentor Registration"} />

            <SectionWrapper.Boxed>
                <div className="grid gap-6 row-gap-4 lg:grid-cols-2 sm:mb-8">
                    <div>
                        <SectionWrapper.Heading level="h2">
                            How to Become a Mentor on Fomoedge
                        </SectionWrapper.Heading>
                        <SectionWrapper.Spacer />
                        <div className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-fomoPrimary-0">
                                        <ArrowDown />
                                    </div>
                                </div>
                                <div className="w-px h-full bg-fomoPrimary-0" />
                            </div>
                            <div className="pt-1 pb-8">
                                <h3 className="mb-2 text-lg font-bold">
                                    Initial Application
                                </h3>
                                <p className="text-gray-700">
                                    Start by filling out a simple online form
                                    with your basic details, LinkedIn profile,
                                    and preferred login credentials. Whether you
                                    specialize in career guidance, personal
                                    development, business strategies, or
                                    executive coaching, Fomoedge welcomes
                                    industry experts looking to mentor
                                    professionals and students.
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-fomoPrimary-0">
                                        <ArrowDown />
                                    </div>
                                </div>
                                <div className="w-px h-full bg-fomoPrimary-0" />
                            </div>
                            <div className="pt-1 pb-8">
                                <h3 className="mb-2 text-lg font-bold">
                                    Review by the Fomoedge Team
                                </h3>
                                <p className="text-gray-700">
                                    Our team carefully evaluates each
                                    application to ensure a high-quality mentor
                                    community. We may schedule a follow-up
                                    discussion or ask additional questions to
                                    understand your expertise better. Once
                                    approved, you will receive an email and
                                    WhatsApp message of profile verification.
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-fomoPrimary-0">
                                        <ArrowDown />
                                    </div>
                                </div>
                                <div className="w-px h-full bg-fomoPrimary-0" />
                            </div>
                            <div className="pt-1 pb-8">
                                <h3 className="mb-2 text-lg font-bold">
                                    Profile Setup & Completion
                                </h3>
                                <p>
                                    <strong>
                                        After verification, log in to complete
                                        your mentor profile:
                                    </strong>
                                </p>
                                <p className="text-gray-700">
                                    Add your skills, topics, and relevant tags
                                    to optimize visibility.
                                </p>
                                <p className="text-gray-700">
                                    Provide KYC details for authentication.
                                    Handled securely via Razorpay
                                </p>
                                <p className="text-gray-700">
                                    Set up mentorship session availability,
                                    pricing, and scheduling.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <Card className="w-full max-w-xl bg-yellow-50 border border-fomoPrimary-0">
                            <CardHeader>
                                <CardTitle>Become a Mentor</CardTitle>
                                <CardDescription>
                                    Please fill the form to register as a
                                    mentor.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={submit}
                                    className="max-w-xl mx-auto relative"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="mt-2">
                                            <InputLabel
                                                htmlFor="first_name"
                                                value="First Name"
                                            />
                                            <Input
                                                id="first_name"
                                                name="first_name"
                                                placeholder="First name"
                                                value={data.first_name}
                                                className="mt-1 block w-full bg-slate-100 p-2"
                                                autoComplete="first_name"
                                                onChange={(e) =>
                                                    setData(
                                                        "first_name",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.first_name}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <InputLabel
                                                htmlFor="last_name"
                                                value="Last Name"
                                            />

                                            <Input
                                                id="last_name"
                                                name="last_name"
                                                value={data.last_name}
                                                placeholder="Last name"
                                                className="mt-1 block w-full bg-slate-100 p-2"
                                                autoComplete="last_name"
                                                onChange={(e) =>
                                                    setData(
                                                        "last_name",
                                                        e.target.value,
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.last_name}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 mt-2">
                                        <InputLabel
                                            htmlFor="alias_name"
                                            value="Alias Name"
                                        />

                                        <Input
                                            id="alias_name"
                                            name="alias_name"
                                            placeholder="Publicly visible name"
                                            value={data.alias_name}
                                            className="mt-1 block w-full bg-slate-100 p-2"
                                            autoComplete="alias_name"
                                            onChange={(e) =>
                                                setData(
                                                    "alias_name",
                                                    e.target.value,
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.alias_name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <CountrySelect
                                            data={data}
                                            onSelectChange={(e) =>
                                                setData("phone_country_id", e)
                                            }
                                            onInputChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.phone}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <InputLabel
                                            htmlFor="linkedin"
                                            value="LinkedIn"
                                        />

                                        <Input
                                            id="linkedin"
                                            type="url"
                                            name="linkedin"
                                            placeholder="Enter linkedin url"
                                            value={data?.social_links[0]?.url}
                                            className="mt-1 block w-full bg-slate-100 p-2"
                                            autoComplete="username"
                                            onChange={(e) =>
                                                setData("social_links", [
                                                    {
                                                        url: e.target.value,
                                                        label: "Linkedin",
                                                        status: 1,
                                                    },
                                                ])
                                            }
                                        />
                                        <InputError
                                            message={errors["social_links"]}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-2">
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />

                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="Enter email"
                                            value={data.email}
                                            className="mt-1 block w-full bg-slate-100 p-2"
                                            autoComplete="username"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="mt-2">
                                            <InputLabel
                                                htmlFor="password"
                                                value="Password"
                                            />

                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={data.password}
                                                className="mt-1 block w-full bg-slate-100 p-2"
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value,
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.password}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <InputLabel
                                                htmlFor="password_confirmation"
                                                value="Confirm Password"
                                            />

                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                placeholder="Confirm Password"
                                                name="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                className="mt-1 block w-full bg-slate-100 p-2"
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value,
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end mt-4">
                                        <LoadingButton
                                            className="bg-[#FEC93B] hover:bg-[rgb(249,205,82)] rounded-md w-full text-md"
                                            size="lg"
                                            disabled={processing}
                                            type="submit"
                                        >
                                            Register
                                        </LoadingButton>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <p>
                    A complete profile boosts credibility and attracts mentees
                    looking for expert guidance. After completing KYC
                    verification and updating your profile, you will receive a
                    confirmation message about your profile activation.
                </p>
                <p>
                    Once live on the FomoEdge platform, mentees can seamlessly
                    book sessions with you.
                </p>
            </SectionWrapper.Boxed>

            <SectionWrapper.Boxed className="bg-yellow-50">
                <SectionWrapper.Heading>
                    Why Join Fomoedge as a Mentor
                </SectionWrapper.Heading>
                <SectionWrapper.Spacer />
                <p className="mb-1.5">
                    Fomoedge offers a unique mentorship platform that connects
                    you with professionals, startups, enterprises, and
                    universities globally. Whether you're looking to monetize
                    your expertise, expand your network, or establish thought
                    leadership, Fomoedge provides the perfect space for
                    impactful mentorship.
                </p>
                <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-x-2">
                            <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>
                            <p>
                                <strong>{benefit.title}</strong> –{" "}
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionWrapper.Boxed>

            <SectionWrapper.Boxed>
                <div className="relative z-10 overflow-hidden rounded bg-primary py-12 px-8 md:p-[70px]">
                    <div className="flex flex-wrap items-center -mx-4">
                        <div className="w-full px-4 lg:w-1/2">
                            {/* <span className="block mb-4 text-base font-medium text-white"></span> */}
                            <h2 className="mb-6 text-3xl font-bold leading-tight  sm:mb-8 sm:text-[40px]/[48px] lg:mb-0">
                                <span className="xs:block">
                                    Ready to become a mentor?
                                </span>
                                <span>Join Fomoedge today!</span>
                            </h2>
                        </div>
                        <div className="w-full px-4 lg:w-1/2">
                            <div className="flex flex-wrap lg:justify-end">
                                <Button
                                    asChild
                                    className="px-16 py-6 bg-gradient-to-l hover:bg-gradient-to-r from-slate-900 to-slate-700 text-white"
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
            </SectionWrapper.Boxed>

            <SectionWrapper.Boxed className="bg-yellow-50">
                <SectionWrapper.Heading>
                    Eligibility Criteria to Become a Mentor at Fomoedge
                </SectionWrapper.Heading>
                <SectionWrapper.Spacer />
                <p className="mb-1.5">
                    Fomoedge offers a unique mentorship platform that connects
                    you with professionals, startups, enterprises, and
                    universities globally. Whether you're looking to monetize
                    your expertise, expand your network, or establish thought
                    leadership, Fomoedge provides the perfect space for
                    impactful mentorship.
                </p>
                <div className="space-y-4">
                    <div className="flex items-start gap-x-2">
                        <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>
                        <p>
                            <strong>Relevant Expertise</strong> – Proven
                            experience in a specific field chosen to give
                            mentorship
                        </p>
                    </div>
                    <div className="flex items-start gap-x-2">
                        <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>
                        <p>
                            <strong>Minimum Experience</strong> – At least 3+
                            years of experience in your domain.
                        </p>
                    </div>
                    <div className="flex items-start gap-x-2">
                        <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>
                        <p>
                            <strong>Strong Communication Skills</strong> –
                            Ability to convey ideas clearly and effectively.
                        </p>
                    </div>
                    <div className="flex items-start gap-x-2">
                        <span className="h-2 w-2 shrink-0 bg-black mt-2 rounded-full"></span>
                        <p>
                            <strong>Passion for Helping Others</strong> – A
                            genuine interest in guiding and mentoring others in
                            their personal and professional journeys.
                        </p>
                    </div>
                </div>
            </SectionWrapper.Boxed>
        </>
    );
};

Register.layout = (page) => (
    <PageLayout
        children={page}
        title={
            page?.props?.page?.meta_title
                ? page?.props?.page?.meta_title
                : "How to Become a Mentor on Fomoedge"
        }
        metaDescription={
            page?.props?.page?.meta_description ||
            "Empower the next generation by sharing your knowledge, guiding aspiring professionals, and helping businesses grow. Your mentorship creates a lasting impact on careers, industries, and communities."
        }
    />
);

export default Register;
