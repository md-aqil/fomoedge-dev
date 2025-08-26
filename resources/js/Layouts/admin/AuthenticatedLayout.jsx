import React from "react";
import ShadcnProvider from "../shadcn-provider";
import { Toaster } from "@/shadcn/ui/sonner";
import Header from "./Header";
import Sidebar from "./sidebar";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";

export default function AuthenticatedLayout({ children }) {
    const { flash } = usePage().props;

    React.useEffect(() => {
        if (flash.message) {
            const options = {
                description: flash.description,
                position: "top-right",
            };
            if (flash.type === "success") {
                toast.success(flash.message, options);
            } else {
                toast.error(flash.message, options);
            }
        }
    }, [flash]);

    return (
        <ShadcnProvider>
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="w-full pt-12 tracking-tight bg-background">
                    {children}
                </div>
            </div>
            <Toaster position="top-right" richColors />
        </ShadcnProvider>
    );
}
