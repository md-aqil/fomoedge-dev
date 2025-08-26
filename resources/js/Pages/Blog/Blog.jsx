import PageLayout from "@/Layouts/PageLayout";
import PostCard from "./PostCard";
import React from "react";
import SectionWrapper from "@/Components/SectionWrapper";

const Blog = ({ posts }) => {
    return (
        <SectionWrapper.Boxed>
            <SectionWrapper.Spacer />
            <SectionWrapper.Heading>Blog</SectionWrapper.Heading>
            <SectionWrapper.Spacer />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-lg">
                {posts.data.map((item, index) => (
                    <React.Fragment key={index}>
                        <PostCard post={item} />
                    </React.Fragment>
                ))}
            </div>
        </SectionWrapper.Boxed>
    );
};

Blog.layout = (page) => (
    <PageLayout children={page} title="Blog" metaDescription="Blog" />
);

export default Blog;
