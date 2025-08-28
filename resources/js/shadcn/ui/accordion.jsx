import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/shadcn";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn("border-b", className)}
        {...props}
    />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(
    ({ className, children, ...props }, ref) => (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                ref={ref}
                className={cn(
                    "inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 justify-start rounded-2xl w-full transition-all [&[data-state=open]>svg]:rotate-180 py-3 hover:no-underline [&[data-state=open]]:bg-amber-300 [&[data-state=open]]:shadow-lg [&[data-state=open]]:text-black",
                    className
                )}
                {...props}
            >
                {children}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    )
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(
    ({ className, children, ...props }, ref) => (
        <AccordionPrimitive.Content
            ref={ref}
            className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
            {...props}
        >
            <div className={cn("pb-4 pt-0", className)}>{children}</div>
        </AccordionPrimitive.Content>
    )
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
