import PageBanner from "@/Components/PageBanner";
import PageLayout from "@/Layouts/PageLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import SearchForm from "@/Components/Search";
import SectionWrapper from "@/Components/SectionWrapper";
import { Link } from "@inertiajs/react";
import { UserIcon } from "lucide-react";

function Search({ courses, mentors }) {
    return (
        <>
            <PageBanner title={"Search"} />
            <SectionWrapper.Boxed>
                <div className="max-w-3xl mb-4">
                    <SearchForm />
                </div>

                {courses.data.map((course) => (
                    <Card
                        key={course.id}
                        className="mb-2 group hover:shadow-md hover:bg-fomoLight-0 hover:bg-opacity-15 transition duration-150 ease-in-out"
                    >
                        <CardHeader>
                            <CardTitle className="text-lg group-hover:underline cursor-pointer group-hover:text-blue-600 underline-offset-4 transition duration-150 ease-in-out">
                                <Link
                                    href={route(
                                        "course.find-by-slug",
                                        course.slug,
                                    )}
                                >
                                    {course.title}
                                </Link>
                            </CardTitle>
                            {/* {console.log(
                                "🚀 ~ Search ~ course:",
                                course.mentor_profile.unique_id,
                            )} */}
                            <CardDescription>
                                <Link
                                    href={route(
                                        "mentor.find-by-id",
                                        course.mentor_profile.unique_id,
                                    )}
                                    className="flex items-center gap-1"
                                >
                                    <UserIcon className="h-4 w-4" />
                                    <span className="text-blue-500">
                                        {course?.mentor_profile?.alias_name &&
                                        course?.mentor_profile?.show_alias === 1
                                            ? course?.mentor_profile?.alias_name
                                            : course?.mentor_profile?.full_name}
                                    </span>
                                </Link>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>{course.excerpt}</CardContent>
                    </Card>
                ))}
            </SectionWrapper.Boxed>
        </>
    );
}

Search.layout = (page) => (
    <PageLayout
        children={page}
        title={
            page.props.page.meta_title
                ? page.props.page.meta_title
                : page.props.page.title
        }
        metaDescription={page.props.page.meta_description}
        schema={page.props.page.schema}
    />
);

export default Search;
