import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import { MinusCircleIcon, PlusCircle } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import Modal from "@/Components/Modal";

export default function BundlePackage({
    errors,
    data,
    setData,
    course,
    courseTypeEnum,
}) {
    const [courses, setCourses] = React.useState([]);
    const [bundleId, setBundleId] = React.useState(null);
    const [bundleName, setBundleName] = React.useState(null);
    console.log("bundleName", bundleName);
    const [openModal, setOpenModal] = React.useState(false);
    const getAllCourses = async () => {
        const res = await axios.get(route("api.courses.index"));
        if (res.status == 200) {
            setCourses(res.data.courses);
        }
    };
    const handleDeleteBundle = async (id) => {
        try {
            setOpenModal(true);
            const response = await axios.delete(
                route("api.courses.bundles.delete", { id: id })
            );
            if (response.status == 200) {
                setOpenModal(false);
                setBundleId(null);
                toast.success(response.data.message);
                setData(
                    "bundle_types",
                    data.bundle_types.filter((item) => item.id !== id)
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            setOpenModal(false);
        }
    };
    const handleQuantityChange = ({ index, e, field }) => {
        const newQuantity = data?.bundle_types?.map((item, i) =>
            i === index ? { ...item, [field]: e.target.value } : item
        );
        setData("bundle_types", newQuantity);
    };
    React.useEffect(() => {
        getAllCourses();
    }, []);
    return (
        <div>
            <div>
                <InputLabel htmlFor="type" value={"Course Type"} isRequired />
                <div className="flex items-center mt-1">
                    <Select
                        id="type"
                        name="type"
                        value={`${data.type}`}
                        className="mt-1 block w-full"
                        onValueChange={(e) => {
                            setData("type", e);
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {courseTypeEnum?.map((t, index) => (
                                    <SelectItem
                                        key={index}
                                        value={`${t.value}`}
                                    >
                                        {t.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <InputError message={errors.type} className="mt-2" />
            </div>
            {data.type == "BUNDLE" && (
                <div className="bg-slate-50 p-2 border mt-4">
                    <div className="flex justify-between mb-2 items-center">
                        <Label className="block mb-2 font-semibold">
                            Bundle Package
                            <InputError
                                message={errors.bundle_packages}
                                className="mt-2 font-normal"
                            />
                        </Label>

                        <Button
                            type="button"
                            size="icon"
                            onClick={() =>
                                setData("bundle_types", [
                                    ...data.bundle_types,
                                    {
                                        course_id: "",
                                        quantity: "",
                                    },
                                ])
                            }
                        >
                            <PlusCircle size={18} />
                        </Button>
                    </div>
                    {data?.bundle_types &&
                        data?.bundle_types.map((item, index) => (
                            <div key={index} className="py-1">
                                <div className="grid grid-cols-12 sm:grid-cols-12 gap-2 col-span-11">
                                    <div className="col-span-7 sm:col-span-8">
                                        <Select
                                            id="bundle_types"
                                            name="type"
                                            value={`${item.course_id}`}
                                            className="w-full"
                                            onValueChange={(e) => {
                                                setData(
                                                    "bundle_types",
                                                    data?.bundle_types.map(
                                                        (val, i) =>
                                                            i === index
                                                                ? {
                                                                      ...val,
                                                                      course_id:
                                                                          e,
                                                                  }
                                                                : val
                                                    )
                                                );
                                            }}
                                        >
                                            <SelectTrigger className="w-full text-gray-900">
                                                <SelectValue placeholder="Select Package" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {courses &&
                                                        courses.map(
                                                            (t, index) => (
                                                                <SelectItem
                                                                    key={index}
                                                                    value={`${t?.id}`}
                                                                >
                                                                    {t?.title}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.bundle_types}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="col-span-3 sm:col-span-3 ">
                                        <Input
                                            type="text"
                                            value={`${item.quantity}`}
                                            className=""
                                            onChange={(e) => {
                                                handleQuantityChange({
                                                    index,
                                                    e,
                                                    field: "quantity",
                                                });
                                            }}
                                            placeholder="Quantity"
                                        />
                                        <InputError
                                            message={errors.quantity}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 self-end">
                                        <Button
                                            className="self-end"
                                            type="button"
                                            onClick={
                                                () => {
                                                    if (item?.id) {
                                                        let name =
                                                            courses?.filter(
                                                                (course) =>
                                                                    course?.id ===
                                                                    item?.course_id
                                                            );
                                                        setBundleName(name);
                                                        setBundleId(item?.id);
                                                        setOpenModal(true);
                                                    } else {
                                                        setData(
                                                            "bundle_types",
                                                            data?.bundle_types?.filter(
                                                                (_, i) =>
                                                                    i !== index
                                                            )
                                                        );
                                                    }
                                                }
                                                // handleDeleteBundle(item?.id)
                                            }
                                            size="icon"
                                            variant="destructive"
                                        >
                                            <MinusCircleIcon size={18} />
                                        </Button>
                                    </div>
                                    <Modal
                                        show={openModal}
                                        maxWidth={"lg"}
                                        onClose={() => setOpenModal(false)}
                                    >
                                        <div className="p-6 space-y-4">
                                            <h1 className="text-lg font-semibold">
                                                Delete This Course Bundle:{" "}
                                                <span className="text-gray-500 text-md font-semibold">
                                                    {bundleName &&
                                                        bundleName[0]?.title}
                                                </span>
                                            </h1>
                                            <p className="text-sm text-gray-600">
                                                Are you sure you want to delete
                                                this course bundle ?
                                            </p>
                                            <div className="flex justify-end gap-x-2">
                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenModal(false)
                                                    }
                                                    variant=""
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDeleteBundle(
                                                            bundleId
                                                        )
                                                    }
                                                    variant="destructive"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}
