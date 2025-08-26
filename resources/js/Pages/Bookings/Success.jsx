import PageBanner from "@/Components/PageBanner";
import BlankLayout from "@/Layouts/blank-layout";
import Header from "@/Layouts/Header";
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import React from "react";

export default function Success({ booking }) {
    sessionStorage.removeItem("slotId");
    return (
        <BlankLayout>
            <Header />
            <div>
                <PageBanner title={"Payment Success!"} />
            </div>

            <div className="bg-green-50 p-6 md:mx-auto">
                <svg
                    viewBox="0 0 24 24"
                    className="text-green-600 w-16 h-16 mx-auto my-6"
                >
                    <path
                        fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment Done!
                    </h3>
                    <p className="text-gray-600 my-2">
                        Thank you <strong>{booking?.full_name}</strong>, for
                        completing your secure online payment.
                    </p>
                    <p> Have a great day! </p>
                    <div className="border max-w-md mx-auto p-2 mt-6 bg-white">
                        <div className="flex gap-2 justify-between py-1 item-center border-b">
                            <p>Booking ID</p>
                            <p>{booking?.id}</p>
                        </div>
                        <div className="flex gap-2 justify-between py-1 item-center border-b">
                            <p>Order ID</p>
                            <p>
                                {
                                    booking?.transaction
                                        ?.payment_gateway_transaction_data
                                        ?.order_id
                                }
                            </p>
                        </div>
                        <div className="flex gap-2 justify-between py-1 item-center border-b">
                            <p>Transaction ID</p>
                            <p>{booking?.transaction.id}</p>
                        </div>
                        <div className="flex gap-2 justify-between py-1 item-center">
                            <p>Total Amount</p>
                            <p>{booking?.grand_total_amount}</p>
                        </div>
                    </div>
                    <div className="py-10 text-center">
                        <Button asChild>
                            <Link
                                href={route("user.dashboard")}
                                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                            >
                                My Profile
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </BlankLayout>
    );
}
