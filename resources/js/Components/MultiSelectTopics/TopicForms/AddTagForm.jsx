import React from "react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import { Button } from "@/shadcn/ui/button";
import { textToSlug } from "@/Helpers/GlobalFunctions";
import { toast } from "sonner";
import { Badge } from "@/shadcn/ui/badge";

export default function AddTagForm({ topic }) {
    const { data, setData, post, processing, errors } = useForm({
        parent_id: topic && topic?.value,
        name: "",
        slug: "",
        status: 1,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("tags.store"));
    };
    React.useEffect(() => {
        setData("slug", textToSlug(data.name));
    }, [data.name]);

    return (
        <div className="px-6 py-4">
            <div className="text-xl font-bold pb-4">
                {" "}
                Add Tag For:{" "}
                <Badge variant="default">{topic && topic?.label}</Badge>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <InputLabel htmlFor="name" value="Topic Name" />
                    <Input
                        id="name"
                        name="name"
                        placeholder="Enter tag name"
                        // value={data.name}
                        className="mt-1 block w-full bg-slate-100 p-2"
                        autoComplete="name"
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.slug} className="mt-2" />
                </div>
                <div className="flex justify-end">
                    <Button
                        type="button"
                        onClick={(e) => handleSubmit(e)}
                        disabled={processing}
                        className="mt-4"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
