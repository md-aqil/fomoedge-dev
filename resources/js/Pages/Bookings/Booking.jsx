import React from "react";
import Header from "@/Layouts/Header";
import { IndianRupee } from "lucide-react";
import { Separator } from "@/shadcn/ui/separator";
import BookingUserForm from "./BookingUserForm";

export default function Booking({ mentor, course, calculateCoursePrices }) {
    // const queryParams = new URLSearchParams(window.location.search);
    // const slotID = queryParams.get("slotID");
    const slotID = sessionStorage.getItem("slotId");

    return (
        <div className="bg-[#F6F8FB] py-24 min-h-screen">
            <Header
                isPaymentPage={true}
                mentor={mentor}
                // packageId={packageDetails.id}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-screen-lg mx-auto px-8">
                <BookingUserForm
                    course={course}
                    calculateCoursePrices={calculateCoursePrices}
                    slotID={slotID}
                />
                <div>
                    <h2 className="font-bold text-2xl pb-4 border-b mb-4">
                        Summary
                    </h2>
                    <div>
                        {calculateCoursePrices?.price != 0 && (
                            <div className="flex justify-between items-center text-sm gap-x-4 mb-3">
                                <div className="whitespace-nowrap">
                                    Original Price:{" "}
                                </div>
                                <div className="border-b border-dashed border-yellow-600 w-full"></div>
                                <div className="flex items-center font-semibold whitespace-nowrap">
                                    <IndianRupee className="w-3 h-3" />
                                    {calculateCoursePrices?.price}/-
                                </div>
                            </div>
                        )}

                        {calculateCoursePrices?.special_price != 0 &&
                            calculateCoursePrices.is_special_active && (
                                <div className="flex justify-between items-center text-sm gap-x-4 mb-3">
                                    <div className="whitespace-nowrap">
                                        Special Price:{" "}
                                    </div>
                                    <div className="border-b border-dashed border-yellow-600 w-full"></div>
                                    <div className="flex items-center font-semibold whitespace-nowrap">
                                        <IndianRupee className="w-3 h-3" />
                                        {calculateCoursePrices?.special_price}/-
                                    </div>
                                </div>
                            )}
                        {calculateCoursePrices?.tax_amount != 0 && (
                            <div className="flex justify-between items-center text-sm gap-x-4 mb-3">
                                <div className="whitespace-nowrap">
                                    Tax Amount:{" "}
                                </div>
                                <div className="border-b border-dashed border-yellow-600 w-full"></div>
                                <div className="flex items-center font-semibold whitespace-nowrap">
                                    <IndianRupee className="w-3 h-3" />
                                    {calculateCoursePrices?.tax_amount}/-
                                </div>
                            </div>
                        )}

                        {calculateCoursePrices?.platform_fee_amount != 0 && (
                            <div className="flex justify-between items-center text-sm gap-x-4 mb-3">
                                <div className="whitespace-nowrap">
                                    Platform Fee:{" "}
                                </div>
                                <div className="border-b border-dashed border-yellow-600 w-full"></div>
                                <div className="flex items-center font-semibold whitespace-nowrap">
                                    <IndianRupee className="w-3 h-3" />
                                    {calculateCoursePrices?.platform_fee_amount}
                                    /-
                                </div>
                            </div>
                        )}
                        <Separator className="my-4 bg-gray-300" />
                        <div className="flex justify-between">
                            <div className="whitespace-nowrap font-bold">
                                Total:
                            </div>
                            <div className="flex items-center font-semibold whitespace-nowrap">
                                <IndianRupee className="w-4 h-4" />
                                {calculateCoursePrices?.grand_total_amount}
                                /-
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
