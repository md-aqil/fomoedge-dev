import SectionWrapper from "@/Components/SectionWrapper";
import PageLayout from "@/Layouts/PageLayout";
import { Badge } from "@/shadcn/ui/badge";
import { formatDate } from "date-fns";

const Post = ({ post }) => {
    return (
        <SectionWrapper.Boxed>
            <SectionWrapper.Spacer />
            <SectionWrapper.Spacer />
            <SectionWrapper.Spacer />
            <img
                // src={post.image.full_path}
                src={post?.image?.full_path || "/images/no-image.png"}
                alt={post.title}
                className="rounded-xl w-full"
            />

            <div className="flex gap-x-2 items-center">
                <time
                    dateTime={post.created_at}
                    className="text-sm text-muted-foreground"
                >
                    {formatDate(post.created_at, "dd MMMM yyyy")}
                </time>
                {post.categories.map((c) => (
                    <Badge>{c.name}</Badge>
                ))}
            </div>

            <SectionWrapper.Heading level="h1" className={`text-start`}>
                {post.title}
            </SectionWrapper.Heading>
            <blockquote className="text-start text-gray-600 pt-2">
                {post.short_description}
            </blockquote>

            <div
                className="no-tailwindcss-base"
                dangerouslySetInnerHTML={{ __html: post.body }}
            />
        </SectionWrapper.Boxed>
    );
};

Post.layout = (page) => (
    <PageLayout
        children={page}
        title={
            page.props.post.meta_title
                ? page.props.post.meta_title
                : page.props.post.title
        }
        metaDescription={page.props.post.meta_description}
    />
);

export default Post;
