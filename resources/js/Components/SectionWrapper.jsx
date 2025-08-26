import { cn } from "@/shadcn";

const SectionWrapper = ({ children, className = "" }) => {
    return (
        <section
            className={cn("py-10 sm:py-16 px-4 sm:px-6 lg:px-8", className)}
        >
            {children}
        </section>
    );
};

SectionWrapper.Boxed = ({ children, className = "" }) => {
    return (
        <SectionWrapper className={cn("", className)}>
            <div className="container mx-auto">{children}</div>
        </SectionWrapper>
    );
};

SectionWrapper.FullWidth = ({ children, className = "" }) => {
    return (
        <SectionWrapper className={cn("w-full", className)}>
            {children}
        </SectionWrapper>
    );
};

SectionWrapper.Spacer = ({ className }) => (
    <div className={cn("h-8", className)} />
);
SectionWrapper.Heading = ({ children, className, level = "h2" }) => {
    const HeadingTag = level;

    return (
        <HeadingTag className={cn("text-3xl font-bold text-center", className)}>
            {children}
        </HeadingTag>
    );
};

SectionWrapper.Subheading = ({ children, className }) => (
    <p className={cn("text-lg text-black text-center mt-2", className)}>
        {children}
    </p>
);

export default SectionWrapper;
