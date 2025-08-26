import React from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import { Textarea } from "@/shadcn/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
} from "@/shadcn/ui/select";
import InputLabel from "@/Components/InputLabel";
import ShadcnCard from "@/Components/ShadcnCard";
import CountrySelect from "@/Components/CountrySelect";
import Modal from "@/Components/Modal";

export default function KYCForm({ mentorKycDetail }) {
    const [openModal, setOpenModal] = React.useState(false);
    const [countries, setCountries] = React.useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: mentorKycDetail ? mentorKycDetail?.full_name : "",
        email: mentorKycDetail ? mentorKycDetail?.email : "",
        country_id: mentorKycDetail?.country_id
            ? mentorKycDetail?.country_id
            : "",
        phone_number: mentorKycDetail ? mentorKycDetail?.phone_number : "",
        pan_number: mentorKycDetail ? mentorKycDetail?.pan_number : "",
        gst: mentorKycDetail ? mentorKycDetail?.gst : "",
        address: mentorKycDetail ? mentorKycDetail?.address : "",
        city: mentorKycDetail ? mentorKycDetail?.city : "",
        state: mentorKycDetail ? mentorKycDetail?.state : "",
        country: mentorKycDetail ? mentorKycDetail?.country : "",
        pin_code: mentorKycDetail ? mentorKycDetail?.pin_code : "",
        bank_name: mentorKycDetail ? mentorKycDetail?.bank_name : "",
        bank_account_number: mentorKycDetail
            ? mentorKycDetail?.bank_account_number
            : "",
        bank_ifsc_code: mentorKycDetail ? mentorKycDetail?.bank_ifsc_code : "",
        bank_account_holder_name: mentorKycDetail
            ? mentorKycDetail?.bank_account_holder_name
            : "",
        pan_card_attachment: mentorKycDetail
            ? mentorKycDetail?.pan_card_attachment
            : "",
    });

    const submit = (e) => {
        e.preventDefault();
        setOpenModal(false);

        try {
            post(route("mentors.profile.kyc-details.store"), {});
        } catch (error) {
            console.log("Err:", error);
        }

        // if (mentorKycDetail) {
        //     post(
        //         route("mentors.profile.kyc-details", {
        //             id: mentorKycDetail.id,
        //         }),
        //     );
        // } else {
        //     try {
        //         post(route("mentors.profile.kyc-details.store"), {});
        //     } catch (error) {
        //         console.log("Err:", error);
        //     }
        // }
    };

    const fetchRegion = async () => {
        try {
            const res = await axios.get(route("api.regions.countries"));

            if (res.status == 200) {
                setCountries(res.data.countries);
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    React.useMemo(() => {
        fetchRegion();
    }, []);

    return (
        <form className="space-y-4">
            <ShadcnCard title={"Personal Details"}>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel
                            htmlFor="full_name"
                            value={"Full Name"}
                            isRequired
                        />
                        <Input
                            id="full_name"
                            type="text"
                            name="full_name"
                            value={data.full_name}
                            placeholder="Your Full Name"
                            onChange={(e) => {
                                setData("full_name", e.target.value);
                            }}
                        />

                        <InputError
                            message={errors.full_name}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="email"
                            value={"Email"}
                            isRequired
                        />
                        <Input
                            id="email"
                            type="text"
                            name="email"
                            value={data.email}
                            placeholder="Your Email"
                            onChange={(e) => {
                                setData("email", e.target.value);
                            }}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                </div>

                <div>
                    <CountrySelect
                        data={data}
                        onSelectChange={(e) => setData("country_id", e)}
                        onInputChange={(e) =>
                            setData("phone_number", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.phone_number}
                        className="mt-2"
                    />
                    <InputError message={errors.country_id} className="mt-2" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <InputLabel htmlFor="city" value={"City"} isRequired />
                        <Input
                            id="city"
                            type="text"
                            name="city"
                            value={data.city}
                            placeholder="Enter City"
                            onChange={(e) => {
                                setData("city", e.target.value);
                            }}
                        />

                        <InputError message={errors.city} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="state"
                            value={"State"}
                            isRequired
                        />
                        <Input
                            id="state"
                            type="text"
                            name="state"
                            value={data.state}
                            placeholder="Enter State"
                            onChange={(e) => {
                                setData("state", e.target.value);
                            }}
                        />

                        <InputError message={errors.state} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="country"
                            value={"Country"}
                            isRequired
                        />
                        <Input
                            id="country"
                            type="text"
                            name="country"
                            value={data.country}
                            placeholder="Enter Country"
                            onChange={(e) => {
                                setData("country", e.target.value);
                            }}
                        />

                        <InputError message={errors.country} className="mt-2" />
                    </div>
                </div>

                <div className="gap-4">
                    <div>
                        <InputLabel
                            htmlFor="address"
                            value={"Address"}
                            isRequired
                        />
                        <Textarea
                            id="address"
                            type="text"
                            name="address"
                            value={data.address}
                            className="mt-1 block w-full"
                            placeholder="Enter Address Line 1"
                            onChange={(e) => {
                                setData("address", e.target.value);
                            }}
                        />

                        <InputError message={errors.address} className="mt-2" />
                    </div>
                </div>

                <div>
                    <InputLabel
                        htmlFor="pin_code"
                        value={"Pincode"}
                        isRequired
                    />
                    <Input
                        id="pin_code"
                        type="text"
                        name="pin_code"
                        value={data.pin_code}
                        placeholder="Enter Pincode"
                        onChange={(e) => {
                            setData("pin_code", e.target.value);
                        }}
                    />

                    <InputError message={errors.pin_code} className="mt-2" />
                </div>
            </ShadcnCard>
            <ShadcnCard
                title={"Bank Details"}
                isCritical
                description="Please fill this form properly and make sure all the details are correct! This cannot be changed later!"
            >
                <div>
                    <InputLabel
                        htmlFor="gst"
                        value={"GST Number"}
                        additionalInfo="(Optional)"
                    />
                    <Input
                        id="gst"
                        type="text"
                        name="gst"
                        value={data.gst}
                        placeholder="Enter Valid GST Number"
                        onChange={(e) => {
                            setData("gst", e.target.value);
                        }}
                    />

                    <InputError message={errors.gst} className="mt-2" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel
                            htmlFor="pan_number"
                            value={"PAN Number"}
                            isRequired
                        />
                        <Input
                            id="pan_number"
                            type="text"
                            name="pan_number"
                            value={data.pan_number}
                            placeholder="PAN Number"
                            onChange={(e) => {
                                setData("pan_number", e.target.value);
                            }}
                        />

                        <InputError
                            message={errors.pan_number}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="pan_card_attachment"
                            value={"Upload Pan Card"}
                            isRequired
                            additionalInfo="(.jpeg, .png, .jpg, .pdf - max 2mb)"
                        />
                        <Input
                            id="pan_card_attachment"
                            type="file"
                            name="pan_card_attachment"
                            onChange={(e) => {
                                setData(
                                    "pan_card_attachment",
                                    e.target.files[0]
                                );
                            }}
                        />

                        <InputError
                            message={errors.pan_card_attachment}
                            className="mt-2"
                        />
                        {mentorKycDetail &&
                            mentorKycDetail?.pan_card_attachment && (
                                <div className="border p-1 rounded-md">
                                    <img
                                        src={`/storage/${mentorKycDetail.pan_card_attachment.url}`}
                                        className="w-full h-36 object-cover rounded-md"
                                        alt={mentorKycDetail.name}
                                        title={mentorKycDetail.name}
                                        loading="lazy"
                                    />
                                </div>
                            )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel
                            htmlFor="bank_name"
                            value={"Bank Name"}
                            isRequired
                        />
                        <Input
                            id="bank_name"
                            type="text"
                            name="bank_name"
                            value={data.bank_name}
                            placeholder="Banck Name"
                            onChange={(e) => {
                                setData("bank_name", e.target.value);
                            }}
                        />

                        <InputError
                            message={errors.bank_name}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="bank_account_holder_name"
                            value={"Account Holder Name"}
                            isRequired
                        />
                        <Input
                            id="bank_account_holder_name"
                            type="text"
                            name="bank_account_holder_name"
                            value={data.bank_account_holder_name}
                            placeholder="Account Holder Name"
                            onChange={(e) => {
                                setData(
                                    "bank_account_holder_name",
                                    e.target.value
                                );
                            }}
                        />

                        <InputError
                            message={errors.bank_account_holder_name}
                            className="mt-2"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel
                            htmlFor="bank_account_number"
                            value={"Account Number"}
                            isRequired
                        />
                        <Input
                            id="bank_account_number"
                            type="text"
                            name="bank_account_number"
                            value={data.bank_account_number}
                            placeholder="Account Number"
                            onChange={(e) => {
                                setData("bank_account_number", e.target.value);
                            }}
                        />

                        <InputError
                            message={errors.bank_account_number}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="bank_ifsc_code"
                            value={"IFSC Code"}
                            isRequired
                        />
                        <Input
                            id="bank_ifsc_code"
                            type="text"
                            name="bank_ifsc_code"
                            value={data.bank_ifsc_code}
                            placeholder="IFS Code "
                            onChange={(e) => {
                                setData("bank_ifsc_code", e.target.value);
                            }}
                        />

                        <InputError
                            message={errors.bank_ifsc_code}
                            className="mt-2"
                        />
                    </div>
                </div>
            </ShadcnCard>

            {/* {mentorKycDetail?.activated_at && ( */}
            <div className="flex justify-end">
                <Button
                    type="button"
                    onClick={(e) => setOpenModal(true)}
                    className="w-[260px]"
                    disabled={processing}
                >
                    Submit eKYC Details
                </Button>
                <Modal
                    show={openModal}
                    maxWidth={"lg"}
                    onClose={() => setOpenModal(false)}
                >
                    <div className="p-6 space-y-4">
                        <h1 className="text-lg font-semibold">
                            Confirm KYC details
                        </h1>
                        <p className="text-sm text-gray-600">
                            Are you sure you want to submit your KYC details?
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-x-2">
                            <Button
                                type="button"
                                onClick={() => setOpenModal(false)}
                                variant="destructive"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={(e) => submit(e)}
                                variant=""
                            >
                                Yes, Submit
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
            {/* )} */}
        </form>
    );
}
