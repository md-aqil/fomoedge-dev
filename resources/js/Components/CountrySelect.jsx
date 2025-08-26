import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import { Input } from "@/shadcn/ui/input";
import InputLabel from "./InputLabel";

export default function CountrySelect({ data, onSelectChange, onInputChange }) {
    let countryId = data?.phone_country_id
        ? data?.phone_country_id
        : data?.country_id;
    const [countries, setCountries] = React.useState([]);
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
        <div>
            <InputLabel htmlFor="phone_no" value="Phone Number" isRequired />
            <div className="flex items-center mt-1">
                <Select
                    value={`${countryId}`}
                    onValueChange={(e) => onSelectChange(e)}
                >
                    <SelectTrigger className="w-[160px] flex gap-2 rounded-r-none pl-1 bg-slate-100">
                        <span className="flex w-full gap-1">
                            {
                                countries?.find(
                                    (country) => country?.id == countryId
                                )?.emoji
                            }
                            {
                                countries?.find(
                                    (country) => country?.id == countryId
                                )?.phone_code
                            }
                        </span>
                        <span className=""></span>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {countries?.map((country, index) => (
                                <SelectItem
                                    key={index}
                                    value={`${country?.id}`}
                                >
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <div>{country?.emoji}</div>{" "}
                                        <div>{country?.name}</div>
                                        <div className="text-gray-500">
                                            ({country?.phone_code})
                                        </div>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="w-full">
                    <Input
                        id="phone_no"
                        name="phone_no"
                        placeholder="Phone number"
                        value={
                            data && data.phone ? data.phone : data.phone_number
                        }
                        className=" block w-full p-2 rounded-l-none"
                        autoComplete="phone_no"
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
        </div>
    );
}
