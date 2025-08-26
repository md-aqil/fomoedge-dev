import { Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import React from "react";
import { ArrowRight, Calendar } from "lucide-react";

export default function PostCard({ post }) {
    return (
        <Link
            href={route("blog.post", { slug: post?.slug })}
            className="group w-full h-full"
        >
            <Card
                key={post?.id}
                className="overflow-hidden shadow-lg rounded-xl h-full flex flex-col transition-all duration-300 hover:shadow-xl"
            >
                <img
                    src={post?.image?.full_path || "/images/welcomeBanner.webp"}
                    alt={post.title}
                    className="h-48 w-full object-cover object-center"
                />

                <CardContent className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {post?.created_at}
                    </div>
                    <h2 className="title-font text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:underline">
                        {post?.title}
                    </h2>
                    <p className="text-gray-600 text-sm mt-2 mb-4 line-clamp-3 flex-grow">
                        {post?.short_description}
                    </p>
                    <div className="pt-2">
                        <span className="text-fomoPrimary-0 font-semibold text-sm inline-flex items-center group-hover:underline">
                            Read more
                            <ArrowRight className="ml-1 w-4 h-4" />
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
