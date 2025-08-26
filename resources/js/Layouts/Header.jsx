import React from "react";
import NavBar from "./Navbar";
import { Link, usePage } from "@inertiajs/react";
import { CircleUserRound, LayoutDashboardIcon, LogInIcon, UserPlus } from "lucide-react";
import MobileNavbar from "./MobileNavbar";
import { Button } from "@/shadcn/ui/button";

export default function Header({
    isPaymentPage,
    // mentor,
    // packageId,
    isHomePage,
}) {
    const { appName, globalSettings, auth } = usePage().props;

    const [scrolling, setScrolling] = React.useState(false);
    const handleScroll = () => {
        if (window.scrollY > 69) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };
    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`${
                scrolling || isPaymentPage
                    ? "fixed bg-white shadow-lg transition-all duration-300"
                    : "sm:fixed shadow-sm sm:shadow-none transition-all duration-300"
            } w-full top-0 h-16 z-50 flex`}
        >
            <div className="container flex items-center gap-4 h-16 justify-between">
                <MobileNavbar />
                <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <img
                        src={"/images/logo-transparent.png"}
                        className={`h-16 w-full transition-all duration-300 ${
                            scrolling || isPaymentPage
                                ? "mt-0 sm:h-16"
                                : "sm:mt-14 sm:h-20"
                        }`}
                    />
                    <span className="sr-only">Acme Inc</span>
                </Link>

                <NavBar
                    scrolling={scrolling}
                    isPaymentPage={isPaymentPage}
                    isHomePage={isHomePage}
                />

                <div className="flex justify-start gap-1 text-sm">
                    {isPaymentPage !== true ? (
                        <div className="flex justify-start gap-1 items-center">
                            {auth?.user ? (
                                <>
                                    <Button
                                        size="sm"
                                        asChild
                                        className={`gap-x-1.5 text-white bg-black hover:bg-black/80`}
                                    >
                                        <Link
                                            href={route(
                                                auth?.userRoles.includes("user")
                                                    ? `user.dashboard`
                                                    : auth?.userRoles.includes(
                                                            "mentor",
                                                        )
                                                      ? `mentors.dashboard`
                                                      : `admin.dashboard`,
                                            )}
                                            className={`${
                                                scrolling
                                                    ? "text-black"
                                                    : "text-black "
                                            } flex font-semibold items-center gap-x-1`}
                                        >
                                            <CircleUserRound
                                                className={`text-fomoSecondary-0 h-5 w-5`}
                                            />
                                            {auth?.user?.full_name}
                                        </Link>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        size="sm"
                                        asChild
                                        variant="outline"
                                        className={`gap-x-1.5 text-black bg-transparent border-black hover:bg-black/10 mr-2`}
                                    >
                                        <Link
                                            href={route("register")}
                                            className={`text-black`}
                                        >
                                            Sign Up
                                        </Link>
                                    </Button>
                                    <Button
                                        size="sm"
                                        asChild
                                        className={`gap-x-1.5 text-white bg-black hover:bg-black/80`}
                                    >
                                        <Link
                                            href={route("login")}
                                            className={`text-white`}
                                        >
                                            Login
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    ) : (
                        <div>
                            <Button
                                asChild
                                size="sm"
                                className={`gap-1 text-white bg-black hover:bg-black/80`}
                            >
                                <Link href={`/`} className={`text-white`}>
                                    Cancel
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
