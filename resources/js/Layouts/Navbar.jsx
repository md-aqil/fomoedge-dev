import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

const MenuLink = ({ item, scrolling, ...props }) => {
    if (item.route_name) {
        return (
            <Link href={route(item.route_name, item.route_params)} {...props} />
        );
    }

    return <a href={item.url} {...props} />;
};

const ParentItem = ({ item, scrolling, page, isHomePage }) => {
    return (
        <li
            // className={`${
            //     scrolling
            //         ? "text-black hover:bg-fomoLight-0"
            //         : "text-white bg-transparent"
            // } group/dropdown relative inline-flex items-center transition duration-150 ease-in-out focus:outline-none cursor-pointer px-3`}
            className={` group/dropdown relative inline-flex items-center transition duration-150 ease-in-out focus:outline-none cursor-pointer px-3`}
        >
            <MenuLink
                // className={`${
                //     scrolling
                //         ? "text-black"
                //         : `${isHomePage ? "text-yellow-600" : "text-white"}`
                // } p-3.5 py-2 flex justify-between items-center font-semibold text-base `}
                className={` p-3.5 py-2 flex justify-between items-center font-semibold text-base `}
                item={item}
                scrolling={scrolling}
            >
                {item.label}{" "}
                {item.children && item.children.length > 0 && (
                    <ChevronDownIcon size="14" className="ml-2" />
                )}
            </MenuLink>

            {item.children && item.children.length > 0 && (
                <ul
                    className={`absolute opacity-0 group-hover/dropdown:opacity-100 h-0 invisible group-hover/dropdown:h-auto group-hover/dropdown:visible transition-all duration-500 animate-fadeInDown z-10 lg:absolute top-full left-0 right-0 m-auto bg-white min-w-[240px] shadow-lg`}
                >
                    {item.children.map((child) => (
                        <li
                            key={child.id}
                            className="group/submenu relative hover:bg-slate-100"
                        >
                            <MenuLink
                                item={child}
                                scrolling={scrolling}
                                className="p-3.5 hover:bg-slate-100 w-full flex items-center justify-between"
                            >
                                {child.label}
                                {child.children &&
                                    child.children.length > 0 && (
                                        <ChevronRightIcon size="14" />
                                    )}
                            </MenuLink>

                            {child.children && child.children.length > 0 && (
                                <ul className="absolute opacity-0 group-hover/submenu:opacity-100 w-0 invisible group-hover/submenu:w-auto group-hover/submenu:visible transition-all duration-500 animate-fadeInDown z-10 lg:absolute top-0 left-full m-auto bg-white min-w-[240px] shadow-lg">
                                    {child.children.map((grandchild) => (
                                        <li key={grandchild.id} className="">
                                            <MenuLink
                                                scrolling={scrolling}
                                                item={grandchild}
                                                className="p-3.5 hover:bg-slate-100 w-full block"
                                            >
                                                {grandchild.label}
                                            </MenuLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

const DesktopNav = ({ scrolling, isHomePage }) => {
    const { primaryMenu, page } = usePage().props;
    return (
        <ul className="flex">
            {primaryMenu &&
                primaryMenu.items &&
                primaryMenu.items.map((item) => (
                    <ParentItem
                        isHomePage={isHomePage}
                        page={page}
                        scrolling={scrolling}
                        key={item.id}
                        item={item}
                    />
                ))}
        </ul>
    );
};

export default function Nav({ scrolling, isPaymentPage, isHomePage }) {
    return (
        <nav
            className={`hidden sm:block max-w-full text-center bg-transparent`}
        >
            <div className="relative">
                <div className="flex justify-center font-semibold items-center mx-auto">
                    <div className="hidden sm:flex items-center text-sm">
                        {!isPaymentPage && (
                            <DesktopNav
                                isHomePage={isHomePage}
                                scrolling={scrolling}
                            />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
