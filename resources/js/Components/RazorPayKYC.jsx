import { Button } from "@/shadcn/ui/button";
import { CircleAlert, CircleCheckBig } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useForm } from "@inertiajs/react";
import LoadingButton from "./LoadingButton";

export default function RazorPayKYC({ mentor }) {
    const { post } = useForm();

    const [loading, setLoading] = React.useState(false);
    const submitRazorPayKyc = (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = post(
                route(`admin.mentor-profiles.razorpay-kyc`, {
                    id: mentor?.id,
                }),
                {
                    onSuccess: () => toast.success("KYC Updated Successfully"),
                }
            );
            if (res.data.status === true) {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    return (
        <LoadingButton
            // type="button"
            loading={loading}
            variant="outline"
            onClick={(e) => submitRazorPayKyc(e)}
            className={`w-full flex items-center justify-center gap-2 ${
                mentor?.kyc_detail === null ||
                mentor?.kyc_detail?.razor_pay_status === 0
                    ? "border-red-600 text-red-600"
                    : "border-green-600 text-green-600 hover:bg-green-100 hover:text-green-600"
            }`}
            disabled={
                loading ||
                mentor?.kyc_detail === null ||
                mentor?.kyc_detail?.razor_pay_status === 1
            }
        >
            {mentor?.kyc_detail?.razor_pay_status === 0
                ? "RazorPay Details Pending"
                : "RazorPay Details Updated"}
            {mentor?.kyc_detail === null ||
            mentor?.kyc_detail?.razor_pay_status === 0 ? (
                <CircleAlert size={20} className="text-red-600" />
            ) : (
                <CircleCheckBig size={20} className="text-green-600" />
            )}
        </LoadingButton>
    );
}
