import React from "react";
import PostCard from "@/Pages/Blog/PostCard";
import SectionWrapper from "@/Components/SectionWrapper";
import { Link } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { ArrowRight } from "lucide-react";
export default function RecentPosts({ blogPost }) {
    return (
        <SectionWrapper.Boxed className="bg-gradient-to-br from-white to-slate-50">
            <div className="sm:flex justify-between items-center mb-8">
                <SectionWrapper.Heading className="text-3xl font-bold text-gray-900">
                    Recent Articles
                </SectionWrapper.Heading>
                <Button
                    asChild
                    className="hidden sm:flex bg-fomoPrimary-0 hover:bg-fomoPrimary-0/90 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    <Link href={route("blog.index")}>
                        See All <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                {blogPost.map((post, index) => (
                    <div key={index} className="flex h-full">
                        <PostCard post={post} />
                    </div>
                ))}
            </div>
            <Button
                asChild
                className="ml-auto w-full mt-10 flex md:hidden bg-fomoPrimary-0 hover:bg-fomoPrimary-0/90 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
                <Link href={route("blog.index")}>
                    See All <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
            </Button>
        </SectionWrapper.Boxed>
    );
}
