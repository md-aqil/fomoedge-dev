import React from "react";
import { Link, router } from "@inertiajs/react";
import { Input } from "@/shadcn/ui/input";
import { ChevronRightIcon, Loader2, SearchIcon } from "lucide-react";
import axios from "axios";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/shadcn/ui/command";
// import useDebounce from "@/hooks/use-debounce";
import { useDebounce } from "use-debounce";

export default function Search() {
    const queryParams = new URLSearchParams(window.location.search);
    const [keyword, keywordSet] = React.useState(
        queryParams.get("keyword") || ""
    );

    const [packages, packagesSet] = React.useState([]);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [searching, searchingSet] = React.useState(false);

    const debouncedSearchTerm = useDebounce(keyword, 500);

    // React.useEffect(() => {
    //     if (!debouncedSearchTerm) {
    //         packagesSet([]);
    //         return;
    //     }
    //     if (keyword.length >= 3) {
    //         searchingSet(true);
    //         handleSubmit?.(debouncedSearchTerm);
    //     }
    // }, [keyword]);

    const handleSubmit = async (k) => {
        searchingSet(true);
        // setDropdownOpen(true);

        try {
            router.visit(route("search", { keyword: k }));
            // const res = await axios.get(
            //     route("course.search", { keyword: keyword })
            // );
            // packagesSet(res?.data?.courses);
        } catch (error) {
            console.error(error);
        }
        searchingSet(false);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(keyword);
            }}
        >
            <div>
                <div className="relative text-gray-600 w-df group">
                    <Input
                        type="search"
                        name="search"
                        placeholder="What’s in your mind ?"
                        value={keyword}
                        required
                        autoComplete="off"
                        onChange={(e) => keywordSet(e.target.value)}
                        className="py-6 px-5 pr-10 rounded-full text-sm focus:outline-none border border-gray-300 bg-white w-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-md focus:shadow-lg focus:border-fomoPrimary-0 focus:ring-2 focus:ring-fomoPrimary-0 focus:ring-opacity-20"
                    />
                    <span className="absolute right-0 -top-0.5 mt-3 mr-4 text-fomoPrimary-0 group-hover:text-fomoPrimary-1 transition-all duration-300 ease-in-out">
                        {!searching && <SearchIcon />}
                        {searching && <Loader2 className="animate-spin" />}
                    </span>
                    <div className="absolute w-full">
                        {keyword && dropdownOpen && (
                            <Command className="w-full">
                                <CommandList>
                                    {!searching && packages?.length === 0 && (
                                        <CommandEmpty className="w-full p-2 text-sm">
                                            No results found.
                                        </CommandEmpty>
                                    )}
                                    {packages?.length > 0 && (
                                        <CommandGroup
                                            heading={
                                                <span className="w-full flex items-center justify-between">
                                                    Suggestions{" "}
                                                    {searching && (
                                                        <Loader2 className="animate-spin w-4 h-4" />
                                                    )}
                                                </span>
                                            }
                                        >
                                            {packages &&
                                                packages?.map((item) => (
                                                    <CommandItem>
                                                        <Link
                                                            href={route(
                                                                "course.find-by-slug",
                                                                {
                                                                    slug: item?.slug,
                                                                }
                                                            )}
                                                            className="flex items-center justify-between w-full"
                                                        >
                                                            <div className="">
                                                                <div className="text-xs">
                                                                    {
                                                                        item?.title
                                                                    }
                                                                </div>

                                                                {item?.mentor_profile && (
                                                                    <div className="text-xs text-muted-foreground flex gap-2 items-center">
                                                                        {
                                                                            item
                                                                                ?.mentor_profile
                                                                                ?.full_name
                                                                        }{" "}
                                                                        |{" "}
                                                                        {
                                                                            item?.type
                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="w-[10px] flex justify-end">
                                                                <ChevronRightIcon size="14" />
                                                            </div>
                                                        </Link>
                                                    </CommandItem>
                                                ))}
                                        </CommandGroup>
                                    )}
                                </CommandList>
                            </Command>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
