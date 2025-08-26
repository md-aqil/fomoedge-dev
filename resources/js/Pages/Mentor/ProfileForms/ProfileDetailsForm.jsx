import CountrySelect from "@/Components/CountrySelect";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Button } from "@/shadcn/ui/button";
import { Checkbox } from "@/shadcn/ui/checkbox";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import { Textarea } from "@/shadcn/ui/textarea";
import { CircleMinus, PlusCircle } from "lucide-react";
import React from "react";

export default function ProfileDetailsForm({ data, setData, errors }) {
    const [imagePreviews, setImagePreviews] = React.useState([]);
    const [countries, setCountries] = React.useState([]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("profile_picture", file);
        const preview = URL.createObjectURL(file);
        setImagePreviews([preview]);
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
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <InputLabel
                        htmlFor="first_name"
                        value="First Name"
                        isRequired
                    />
                    <Input
                        id="first_name"
                        type="text"
                        name="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        placeholder="Enter first name..."
                        onChange={(e) => {
                            setData("first_name", e.target.value);
                        }}
                    />

                    <InputError message={errors.first_name} className="mt-2" />
                </div>
                <div>
                    <InputLabel
                        htmlFor="last_name"
                        value="Last Name"
                        isRequired
                    />
                    <Input
                        id="last_name"
                        type="text"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        placeholder="Last name"
                        onChange={(e) => {
                            setData("last_name", e.target.value);
                        }}
                    />

                    <InputError message={errors.last_name} className="mt-2" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                <div>
                    <InputLabel
                        htmlFor="image"
                        value="Profile Image"
                        additionalInfo={"(Max 2mb)"}
                    />
                    <Input
                        id="image"
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                    />
                    <InputError message={errors.profile_picture} className="" />
                </div>

                <div className="">
                    <CountrySelect
                        data={data}
                        onSelectChange={(e) => setData("phone_country_id", e)}
                        onInputChange={(e) => setData("phone", e.target.value)}
                    />
                    <InputError message={errors.phone_no} className="mt-2" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                <div>
                    <InputLabel htmlFor="" value="Company Name" />
                    <Input
                        id="company_name"
                        type="text"
                        name="company_name"
                        value={data?.company_name}
                        className="mt-1 block w-full"
                        placeholder="Enter first name..."
                        onChange={(e) => {
                            setData("company_name", e.target.value);
                        }}
                    />
                    <InputError message={errors.company_name} className="" />
                </div>
                <div>
                    <InputLabel htmlFor="" value="Select Location" />
                    <Select
                        value={`${data && data?.country_id}`}
                        onValueChange={(value) => setData("country_id", value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Country</SelectLabel>

                                {countries &&
                                    countries?.length > 0 &&
                                    countries?.map((item, index) => (
                                        <SelectItem
                                            key={index}
                                            value={`${item?.id}`}
                                        >
                                            <div className="flex gap-2">
                                                {item?.emoji} {item?.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="image-previews flex">
                {imagePreviews.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Image Preview ${index + 1}`}
                        className="w-24 h-24 object-cover mr-2"
                    />
                ))}
            </div>
            <div className="">
                <InputLabel
                    htmlFor="why_choose_us"
                    value="Why Choose The FomoEdge"
                    additionalInfo="(it will not be displayed on main screen)"
                />
                <Textarea
                    className="mt-1 block w-full text-sm h-10"
                    id="why_choose_us"
                    name="why_choose_us"
                    value={data?.why_choose_us || ""}
                    //placeholder="why_choose_us..."
                    onChange={(e) => {
                        setData("why_choose_us", e.target.value);
                    }}
                />
                <InputError message={errors.why_choose_us} className="mt-2" />
            </div>
            <div className="grid grid-cols-1 border p-3 bg-slate-50 sm:grid-cols-2 gap-4">
                <div>
                    <InputLabel
                        htmlFor="show_alias"
                        value="Hide original name"
                        additionalInfo="(Show Alias)"
                    />
                    <RadioGroup
                        id="show_alias"
                        name="show_alias"
                        className="flex mt-2 gap-x-6 items-center"
                        defaultValue={data?.show_alias}
                        onValueChange={(v) => {
                            setData("show_alias", v);
                        }}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={0} id="true" />
                            <Label htmlFor="show_alias">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={1} id="false" />
                            <Label htmlFor="in-active">No</Label>
                        </div>
                    </RadioGroup>

                    <InputError message={errors.show_alias} className="mt-2" />
                </div>
                {data?.show_alias == 0 && (
                    <div>
                        <InputLabel htmlFor="alias_name" value="Alias Name" />
                        <Input
                            id="alias_name"
                            type="text"
                            name="alias_name"
                            value={data?.alias_name}
                            placeholder="Enter Alias Name..."
                            onChange={(e) => {
                                setData("alias_name", e.target.value);
                            }}
                        />

                        <InputError
                            message={errors.alias_name}
                            className="mt-2"
                        />
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 border p-3 bg-slate-50 sm:grid-cols-2 gap-4">
                <div>
                    <InputLabel
                        htmlFor="show_phone"
                        value="Hide Phone Number"
                    />

                    <RadioGroup
                        className="flex mt-2 gap-x-6 items-center"
                        defaultValue={data?.show_phone}
                        onValueChange={(v) => {
                            setData("show_phone", v);
                        }}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={0} id="hideYes" />
                            <Label htmlFor="hideYes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={1} id="hideNo" />
                            <Label htmlFor="hideNo">No</Label>
                        </div>
                    </RadioGroup>

                    <InputError message={errors?.show_phone} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="type" value="Hide Email" />

                    <RadioGroup
                        className="flex mt-2 gap-x-6 items-center"
                        defaultValue={data?.show_email}
                        onValueChange={(v) => {
                            setData("show_email", v);
                        }}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={0} id="show_email" />
                            <Label htmlFor="show_email">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={1} id="hideEmail" />
                            <Label htmlFor="hideEmail">No</Label>
                        </div>
                    </RadioGroup>

                    <InputError message={errors.show_email} className="mt-2" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 mt-5">
                <div className="sm:col-span-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full bg-[#FFC93B] hover:bg-fomoSecondary-0 text-black hover:text-white"
                        onClick={() => {
                            if (data?.languages?.length >= 3) {
                                alert("You can only add up to 3 languages.");
                                return;
                            }
                            setData("languages", [...data?.languages, ""]);
                        }}
                    >
                        <PlusCircle className="h-4 w-4 mr-2" /> Add Language
                    </Button>
                    {data?.languages !== null &&
                        data?.languages?.map((p, index) => (
                            <div
                                key={`language-${index}`}
                                className="relative pt-1"
                            >
                                <Label htmlFor={`language-${index}`}>
                                    Language {index + 1}
                                </Label>
                                <Input
                                    className="mt-1 block w-full bg-slate-100 p-2"
                                    id={`language-${index}`}
                                    type="text"
                                    name={`language-${index}`}
                                    value={data?.languages[index]}
                                    placeholder={`Enter language name`}
                                    onChange={(e) => {
                                        const newLanguage = [
                                            ...data?.languages,
                                        ];
                                        newLanguage[index] = e.target.value;
                                        setData("languages", newLanguage);
                                    }}
                                />
                                <CircleMinus
                                    className="text-white bg-red-500 hover:bg-red-600 cursor-pointer rounded-full h-5 w-5 absolute right-0 top-4"
                                    onClick={() => {
                                        const updatedLanguages =
                                            data?.languages?.filter(
                                                (_, i) => i !== index,
                                            );
                                        setData("languages", updatedLanguages);
                                    }}
                                />
                                <InputError
                                    message={errors[`newLanguage.${index}`]}
                                    className="mt-2"
                                />
                            </div>
                        ))}
                </div>

                <div className="sm:col-span-8">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full bg-[#FFC93B] hover:bg-fomoSecondary-0 text-black hover:text-white"
                        onClick={() =>
                            setData("educations", [
                                ...data?.educations,
                                {
                                    school: "",
                                    degree: "",
                                    status: false,
                                },
                            ])
                        }
                    >
                        <PlusCircle className="h-4 w-4 mr-2" /> Education
                        Details
                    </Button>

                    {data?.educations?.map((p, index) => (
                        <div
                            key={`educations-${index}`}
                            className="grid grid-cols-12 items-center gap-3 relative pb-2"
                        >
                            <div className="relative col-span-5">
                                <Label
                                    className="capitalize"
                                    htmlFor={`educations-${index}`}
                                >
                                    School/University
                                </Label>
                                <Input
                                    className="mt-1 block w-full bg-slate-100 p-2"
                                    id={`educations-${index}`}
                                    type="educations"
                                    name={`Education details-${index}`}
                                    value={data?.educations[index]?.school}
                                    placeholder={`Your education`}
                                    onChange={(e) => {
                                        const newEducation = [
                                            ...data?.educations,
                                        ];
                                        newEducation[index].school =
                                            e.target.value;
                                        setData("educations", newEducation);
                                    }}
                                />
                                <InputError
                                    message={errors[`educations.${index}`]}
                                    className="mt-2"
                                />
                            </div>
                            <div className=" col-span-5">
                                <Label
                                    className="capitalize"
                                    htmlFor={`educations-${index}`}
                                >
                                    Degree
                                </Label>
                                <Input
                                    className="mt-1 block w-full bg-slate-100 p-2"
                                    id={`educations-${index}`}
                                    type="educations"
                                    name={`Education details-${index}`}
                                    value={data.educations[index]?.degree}
                                    placeholder={`Degree name`}
                                    onChange={(e) => {
                                        setData(
                                            `educations.${index}.degree`,
                                            e.target.value,
                                        );
                                        const newEducation = [
                                            ...data?.educations,
                                        ];
                                        newEducation[index].degree =
                                            e.target.value;
                                        setData("educations", newEducation);
                                    }}
                                />

                                <InputError
                                    message={errors[`educations.${index}`]}
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-2 flex gap-1 items-center pt-6">
                                {" "}
                                <Checkbox
                                    name="show"
                                    id="show"
                                    checked={data?.educations[index]?.status}
                                    onCheckedChange={(e) => {
                                        const check = [...data?.educations];
                                        check[index].status = e;
                                        setData("educations", check);
                                    }}
                                />{" "}
                                <span className="text-sm">Show</span>
                            </div>

                            <CircleMinus
                                className="text-white bg-red-500 hover:bg-red-600 cursor-pointer rounded-full h-5 w-5 absolute right-0 top-9"
                                onClick={() => {
                                    const updatedEducations =
                                        data?.educations?.filter(
                                            (_, i) => i !== index,
                                        );
                                    setData("educations", updatedEducations);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
