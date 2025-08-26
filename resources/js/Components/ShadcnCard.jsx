import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";

export default function ShadcnCard({
    title,
    description,
    isCritical = false,
    footer,
    children,
    ...rest
}) {
    return (
        <Card {...rest}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && (
                    <CardDescription
                        className={isCritical ? "text-red-500" : ""}
                    >
                        {description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="space-y-4">{children}</CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    );
}
