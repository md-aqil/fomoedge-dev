import React from "react";
import ShadcnProvider from "../shadcn-provider";
import { Toaster } from "@/shadcn/ui/sonner";
import Sidebar from "./sidebar";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";
import Header from "./Header";

export default function UserAuthLayout({ children }) {
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
                <div className="w-full py-20 px-4 sm:px-8 tracking-tight bg-slate-50">
                    {children}
                </div>
            </div>

            <Toaster position="top-right" richColors />
        </ShadcnProvider>
    );
}
