import React, { useState } from "react";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Input } from "@/shadcn/ui/input";

import {
    Sheet,
    SheetContent,
    // SheetDescription,
    // SheetHeader,
    // SheetTitle,
    SheetTrigger,
} from "@/shadcn/ui/sheet";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/shadcn/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, Filter, Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/shadcn";
import { Button } from "@/shadcn/ui/button";
import { ListFilter } from "lucide-react";
import NoDataAlert from "@/Components/NoDataAlert";
import RedesignedMentorCard from "@/Components/Cards/RedesignedMentorCard";
import BlankLayout from "@/Layouts/blank-layout";
import Header from "@/Layouts/Header";
import PageBanner from "@/Components/PageBanner";
import SectionWrapper from "@/Components/SectionWrapper";
import { router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";

// New FilterButton component for the new design
const FilterButton = ({ children, isActive = false, onClick }) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center justify-between w-full text-left py-2 hover:bg-gray-50 rounded-md px-2 transition-colors duration-200",
            isActive && "bg-gray-50"
        )}
    >
        <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{children}</span>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-500" />
    </button>
);

const CustomAccordionTrigger = React.forwardRef(
    ({ className, children, ...props }, ref) => (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                ref={ref}
                className={cn(
                    "flex items-center justify-between w-full text-left py-2 hover:bg-gray-50 rounded-md px-2 transition-colors duration-200 font-medium text-gray-900 [&[data-state=open]>svg]:rotate-180",
                    className
                )}
                {...props}
            >
                <div className="flex items-center gap-2">
                    <span>{children}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500 shrink-0 transition-transform duration-200" />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    )
);
CustomAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

function FAQComponent({ data = [], className = "" }) {
    // Default FAQs to show when no specific FAQs are available
    const defaultFaqs = [
        {
            question: "How do I choose the right mentor?",
            answer: "Look for mentors with expertise in your field of interest, check their reviews and ratings, and consider their communication style and availability that matches your learning goals."
        },
        {
            question: "What should I expect from a mentorship session?",
            answer: "A typical session includes goal-setting, skill development discussions, career guidance, and actionable feedback tailored to your specific needs and career objectives."
        },
        {
            question: "How long should a mentorship relationship last?",
            answer: "The duration varies based on your goals. It can range from a few sessions for specific projects to ongoing relationships for long-term career development."
        },
        {
            question: "What is the cost of mentorship sessions?",
            answer: "Costs vary by mentor expertise and session length. You can view pricing on each mentor's profile before booking a session."
        },
        {
            question: "How do I prepare for a mentorship session?",
            answer: "Come with specific questions, goals you want to achieve, and any relevant materials. Be prepared to discuss your current challenges and what you hope to learn."
        }
    ];
    
    // Use provided data if available, otherwise use default FAQs
    const faqsToShow = (data && Array.isArray(data) && data.length > 0) ? data : defaultFaqs;
    
    return (
        <div className={className}>
            <Accordion type="single" collapsible className="space-y-4">
                {faqsToShow.map((item, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`} className="border border-gray-200 rounded-lg px-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-yellow-600 py-4">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {item.answer}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default function MentorProfilesByTag({ topics, mentors, tag }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");

    // Filter mentors based on search term
    const filteredMentors = mentors.filter(mentor => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        const name = (mentor?.alias_name || mentor?.full_name || "").toLowerCase();
        const experience = (mentor?.experience || "").toLowerCase();
        const tags = mentor?.topic_tags?.map(t => t.title.toLowerCase()).join(" ") || "";
        return name.includes(searchLower) || experience.includes(searchLower) || tags.includes(searchLower);
    });

    // Sort filtered mentors
    const sortedMentors = [...filteredMentors].sort((a, b) => {
        switch (sortBy) {
            case "sessions":
                return (b?.bookings_count || 0) - (a?.bookings_count || 0);
            case "satisfaction":
                return (b?.avg_mentor_rating || 0) - (a?.avg_mentor_rating || 0);
            case "newest":
                return new Date(b?.created_at || 0) - new Date(a?.created_at || 0);
            case "name":
            default:
                const nameA = (a?.alias_name || a?.full_name || "").toLowerCase();
                const nameB = (b?.alias_name || b?.full_name || "").toLowerCase();
                return nameA.localeCompare(nameB);
        }
    });

    const handleTagChange = () => {
        // let updatedTags;
        // if (selectedTags.includes(tag.slug)) {
        //     updatedTags = selectedTags.filter((t) => t !== tag.slug);
        // } else {
        //     updatedTags = [...selectedTags, tag.slug];
        // }
        // setSelectedTags(updatedTags);
    };

    const FilterContent = () => (
        <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-gray-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Filter by</h2>
                </div>
            </div>
            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                {topics.map((topic) => (
                    <div key={topic.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <Accordion type="single" collapsible value={topic.active_tags.some(t => t.slug === tag?.slug) ? topic.id : undefined}>
                            <AccordionItem value={topic.id} className="border-b-0">
                                <CustomAccordionTrigger>
                                    {topic.title}
                                </CustomAccordionTrigger>
                                <AccordionContent className="pb-0 pt-2">
                                    <div className="mt-2 space-y-2 pl-4">
                                        {topic.active_tags.map((t) => (
                                            <label
                                                key={t.id}
                                                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-md p-2 transition-colors duration-200"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={t.slug}
                                                    checked={t.slug == tag?.slug}
                                                    onChange={() =>
                                                        tag?.slug == t.slug
                                                            ? router.visit(
                                                                  route(
                                                                      "mentors.all-mentors-by-tag",
                                                                  ),
                                                              )
                                                            : router.visit(
                                                                  route(
                                                                      "mentors.all-mentors-by-tag",
                                                                      {
                                                                          tagSlug: t.slug,
                                                                      },
                                                                  ),
                                                              )
                                                    }
                                                    className="h-4 w-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400 focus:ring-2"
                                                />
                                                <span className="text-sm text-gray-700">{t.title}</span>
                                            </label>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <BlankLayout
            title={tag ? tag.title : "Mentors"}
            metaDescription={tag ? tag.description : "Mentors"}
            schema={tag ? tag.schema : ""}
        >
            <Header />
            
            {/* New Yellow Gradient Header */}
            <main className="relative bg-gray-50">
                <div className="bg-gradient-to-b from-yellow-400 to-yellow-300 py-28">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
                            Mentors {tag && `with ${tag.title}`}
                        </h1>
                    </div>
                </div>
                
                <div className="container -mt-8 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters for Desktop */}
                        <aside className="lg:w-80 flex-shrink-0">
                            <div className="hidden lg:block sticky top-24">
                                <FilterContent />
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <div className="flex-1 min-w-0 pb-8">
                            {/* Search and Controls Bar */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                    <div className="flex-1 w-full sm:max-w-md">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <Input
                                                placeholder="Search mentors by name or expertise..."
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm"
                                                type="text"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                        <div className="text-sm text-gray-600">
                                            {sortedMentors.length} mentors found
                                        </div>
                                        <button className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium">
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <div className="flex items-center gap-2">
                                                        <SlidersHorizontal className="h-4 w-4" />
                                                        <span>Filters</span>
                                                    </div>
                                                </SheetTrigger>
                                                <SheetContent className="bg-slate-100 w-full sm:max-w-md">
                                                    <div className="pb-4 h-full overflow-y-auto">
                                                        <FilterContent />
                                                    </div>
                                                </SheetContent>
                                            </Sheet>
                                        </button>
                                        <div className="hidden sm:flex items-center gap-2">
                                            <label htmlFor="sort" className="text-sm text-gray-600 font-medium">
                                                Sort by:
                                            </label>
                                            <Select value={sortBy} onValueChange={setSortBy}>
                                                <SelectTrigger className="w-32 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="name">Name</SelectItem>
                                                    <SelectItem value="sessions">Sessions</SelectItem>
                                                    <SelectItem value="satisfaction">Satisfaction</SelectItem>
                                                    <SelectItem value="newest">Newest</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tag Details Section */}
                            {tag?.tag_details && (
                                <div className="bg-yellow-50 rounded-lg p-6 mb-6 border border-yellow-200">
                                    <div
                                        className="text-sm text-gray-700"
                                        dangerouslySetInnerHTML={{
                                            __html: tag.tag_details,
                                        }}
                                    />
                                </div>
                            )}

                            {/* Mentors Grid */}
                            <div>
                                {sortedMentors.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {sortedMentors.map((mentor) => (
                                            <RedesignedMentorCard
                                                key={mentor.id}
                                                mentor={mentor}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <NoDataAlert title="No mentors found!" />
                                )}
                            </div>
                            {/* Tag CTA Section */}
                            {tag?.tag_cta_description && (
                                <div className="bg-yellow-50 rounded-lg p-6 mt-6 border border-yellow-200">
                                    <div
                                        className="text-sm text-gray-700 mb-4"
                                        dangerouslySetInnerHTML={{
                                            __html: tag.tag_cta_description,
                                        }}
                                    />

                                    {tag?.tag_cta?.label && tag?.tag_cta?.link && (
                                        <div className="flex justify-center">
                                            <Button
                                                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
                                                asChild
                                            >
                                                <Link href={tag?.tag_cta?.link}>
                                                    {tag?.tag_cta?.label}
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* FAQ Section - Always Show */}
                            <div className="bg-white rounded-lg shadow-lg p-6 mt-8 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">
                                    Frequently Asked Questions
                                </h2>
                                <FAQComponent
                                    className="w-full"
                                    data={tag?.faqs || []}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </BlankLayout>
    );
}
