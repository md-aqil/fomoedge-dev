import React from "react";
import { Button } from "@/shadcn/ui/button";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { toast } from "sonner";

export default function ClickToCopy({ data }) {
    const [copySuccess, setCopySuccess] = React.useState(false);

    const copyData = async () => {
        try {
            await navigator.clipboard.writeText(data);
            setCopySuccess(true);
            toast.success("URL Copied to clipboard!");
        } catch (error) {
            console.error("Failed to copy to clipboard:", error);
            toast.error("Failed to copy to clipboard!");
        } finally {
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    return (
        <Button size="icon" onClick={copyData}>
            {copySuccess ? (
                <ClipboardCheck className="h-4 w-4" />
            ) : (
                <Clipboard className="h-4 w-4" />
            )}
        </Button>
    );
}
