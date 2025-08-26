import { Head } from "@inertiajs/react";
import { Footer } from "./Footer";
import ShadcnProvider from "./shadcn-provider";
import { Toaster } from "sonner";

export default function BlankLayout({
    children,
    title,
    metaDescription,
    schema,
}) {
    return (
        <ShadcnProvider>
            <Head title={title}>
                <meta property="og:title" content={title} />
                <meta name="description" content={metaDescription} />
                {schema && (
                    <script type="application/ld+json">
                        {JSON.stringify(schema)}
                    </script>
                )}
            </Head>
            <main className="w-full tracking-tight bg-background">
                {children}
            </main>
            <Footer />

            <Toaster position="top-right" richColors />
        </ShadcnProvider>
    );
}
