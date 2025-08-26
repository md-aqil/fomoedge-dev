import React from "react";
import Header from "@/Layouts/Header";
import Footer from "./Footer";
import { Head, usePage } from "@inertiajs/react";
import { Toaster } from "@/shadcn/ui/sonner";
import { toast } from "sonner";
import ShadcnProvider from "./shadcn-provider";
import BlankLayout from "./blank-layout";
const AdminGlobalHeader = React.lazy(
    () => import("@/Components/Admin/AdminGlobalHeader"),
);

export default function PageLayout({
    children,
    title,
    metaDescription,
    schema,
}) {
    const { flash } = usePage().props;

    React.useEffect(() => {
        if (flash.message) {
            const options = {
                description: flash.description,
                position: "top-right",
            };
            if (flash.type == "success") {
                toast.success(flash.message, options);
            } else if (flash.type == "warning") {
                toast.warning(flash.message, options);
            } else if (flash.type == "error") {
                toast.error(flash.message, options);
            } else {
                toast(flash.message, options);
            }
        }
    }, [flash]);
    return (
        <BlankLayout
            title={title}
            metaDescription={metaDescription}
            schema={schema}
        >
            <Header />
            <div className="content">{children}</div>
        </BlankLayout>
    );
}
