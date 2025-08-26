import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { ScrollArea, ScrollBar } from "@/shadcn/ui/scroll-area";
import CourseCard from "@/Components/Cards/CourseCard";
import { useState } from "react";
import SwiperCarousel from "@/Components/SwiperCarousel";
import NoDataAlert from "@/Components/NoDataAlert";
import { formatEnum, makeGridCols } from "@/Helpers/GlobalFunctions";
export default function MentorCourses({ courses, courseTypeEnum }) {
    const [selectedCourseType, setSelectedCourseType] = useState("all");
    const [courseList, setCourseList] = useState(courses);

    const handleTabChange = (value) => {
        setSelectedCourseType(value);
        let filteredCourse = courses.filter((item) => item?.type === value);
        setCourseList(filteredCourse);
    };

    return (
        <div className={`flex justify-center items-center py-4 pb-16`}>
            {/* <CourseCard course={courses} /> */}
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="flex justify-start gap-5 py-7 px-4">
                    <ScrollArea className="w-full sm:max-w-7xl whitespace-nowrap items-center">
                        <TabsTrigger
                            value="all"
                            onClick={(e) => {
                                setSelectedCourseType("all");
                                setCourseList(courses);
                            }}
                        >
                            All
                        </TabsTrigger>
                        {courseTypeEnum?.map((courseType, index) => (
                            <TabsTrigger
                                onClick={(e) => {
                                    handleTabChange(courseType?.value);
                                }}
                                key={index}
                                value={courseType.value}
                            >
                                {formatEnum(courseType?.label)}
                            </TabsTrigger>
                        ))}
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </TabsList>
                <TabsContent
                    value={selectedCourseType}
                    className="max-w-7xl mx-auto mt-6 sm:mt-10"
                >
                    <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {courseList &&
                        courseList.length > 0 &&
                        selectedCourseType == "all" ? (
                            courseList.map((item) => (
                                <CourseCard course={item} key={item?.id} />
                            ))
                        ) : courseList.length > 0 ? (
                            courseList.map((item) => (
                                <CourseCard course={item} key={item?.id} />
                            ))
                        ) : (
                            <div className="grid col-span-2 items-center py-10 ">
                                <NoDataAlert title={`No Course Found!`} />
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
