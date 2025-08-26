import { Footer } from "@/Layouts/Footer";
import Header from "@/Layouts/Header";
import { Head } from "@inertiajs/react";

export default function WelcomeMentorMessage({ mentor }) {
    return (
        <div>
            <Head title="Mentor">
                <meta name="description" content="Mentor Not Verified" />
            </Head>
            <Header />

            {mentor && (
                <div className="container">
                    <h2 className="text-2xl font-bold text-center my-[150px]">
                        Your account is verified. Please Login.
                    </h2>
                </div>
            )}
            {!mentor && (
                <>
                    <div className="relative mx-auto">
                        <img
                            src="/images/welcomeBanner.webp"
                            className="w-full h-[450px] object-cover"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex flex-col justify-center items-center max-w-3xl mx-auto px-2.5 sm:px-0">
                            <div className="bg-[#8F775B] bg-opacity-85 sm:bg-opacity-100 text-white px-6 sm:px-10 py-14">
                                <div className="text-center text-2xl sm:text-4xl font-bold">
                                    Welcome to Fomoedge
                                </div>
                                <p className="text-md pt-6">
                                    Thank you for registering with Fomoedge and
                                    placing your trust in us. We will soon reach
                                    out with detailed next steps at the email
                                    you have provided. Until then, know that you
                                    are a valued part of this platform where
                                    genuine mentorship shines.
                                </p>
                                <p className="text-md pt-2">
                                    Thank you once again for your support and
                                    belief in our vision. Together, let’s
                                    celebrate curiosity, empower individuals,
                                    and shape countless success stories. The
                                    Fomoedge Team.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="py-[154px]"></div>
                </>
            )}

            <Footer />
        </div>
    );
}
