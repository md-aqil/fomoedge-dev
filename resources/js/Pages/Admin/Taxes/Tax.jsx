import { Button } from "@/shadcn/ui/button";
import { Head, Link } from "@inertiajs/react";
import PageHeading from "@/Components/PageHeading";
import { useForm } from "@inertiajs/react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import { Badge } from "@/shadcn/ui/badge";
import InputError from "@/Components/InputError";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group";

import { textToSlug } from "@/Helpers/GlobalFunctions";
import TwoColumnLayout from "@/Layouts/admin/TwoColumnLayout";
import { TextLarge, TextMuted } from "@/shadcn/ui/text-muted";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import { PencilLine, PlusCircle } from "lucide-react";
import ShadcnCard from "@/Components/ShadcnCard";
import Can from "@/Components/Can";

export default function Tax({ tax }) {
    const [name, nameSet] = React.useState(tax ? tax.name : "");
    const { data, setData, post, processing, errors, reset } = useForm({
        name: tax ? tax?.name : "",
        slug: tax ? tax?.slug : "",
        amount: tax ? tax?.amount : "",
        percent: tax ? tax?.percent : "",
        mark_as_default: tax ? tax?.mark_as_default : 0,
        amount_type: tax ? tax?.amount_type : "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (tax) {
            post(route("admin.taxes.update", { id: tax.id }));
        } else {
            post(route("admin.taxes.store"));
        }
    };

    React.useEffect(() => {
        setData("name", name);
        if (!tax) setData("slug", textToSlug(name));
    }, [name]);

    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${
                    tax ? "Edit tax - " + tax.name : "Create"
                } tax`}</title>
            </Head>
            <TwoColumnLayout.Heading>
                <PageHeading>
                    <PageHeading.Title>
                        {tax ? (
                            <div className="flex gap-x-3 items-center">
                                <PencilLine />
                                Tax - {tax.name}
                            </div>
                        ) : (
                            <div className="flex gap-x-3 items-center">
                                <PlusCircle />
                                Add tax
                            </div>
                        )}
                    </PageHeading.Title>
                    <PageHeading.Actions>
                        <Button asChild variant="outline">
                            <Link href={route("admin.taxes.index")}>
                                Cancel
                            </Link>
                        </Button>
                        <Can permit="create taxes">
                            <Button asChild>
                                <Link href={route("admin.taxes.create")}>
                                    <PlusCircle className="h-4 w-4 mr-2" />{" "}
                                    Create New
                                </Link>
                            </Button>
                        </Can>
                    </PageHeading.Actions>
                </PageHeading>
                <div className="flex justify-between">
                    <div>
                        {tax ? (
                            <Link className="text-blue-600 italic text-sm">
                                {route("admin.taxes.edit", tax.id)}
                            </Link>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex gap-4"></div>
                </div>
            </TwoColumnLayout.Heading>
            <TwoColumnLayout.Content>
                <TwoColumnLayout.Main>
                    <form onSubmit={submit}>
                        <ShadcnCard
                            className="space-y-4"
                            title="General"
                            description={<></>}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2 gap-y-2">
                                <div>
                                    <Label htmlFor="name">Tax Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={name}
                                        autoFocus
                                        // className="mt-1 block w-full text-xl h-18"
                                        placeholder="Tax name..."
                                        onChange={(e) => {
                                            nameSet(e.target.value);
                                            setData("name", e.target.value);
                                        }}
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="slug"
                                        // className={`${errors.slug ? "text-red-500" : ""}`}
                                    >
                                        Slug
                                    </Label>
                                    <Input
                                        id="slug"
                                        type="text"
                                        name="slug"
                                        value={data.slug}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "slug",
                                                textToSlug(e.target.value),
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.slug}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="amount_type">Type</Label>

                                <Select
                                    value={`${data.amount_type}`}
                                    onValueChange={(value) => {
                                        setData("amount_type", value);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder="Select Amount Type"
                                            value={`${data?.amount_type}`}
                                        />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="percent">
                                            Percent
                                        </SelectItem>
                                        <SelectItem value="flat">
                                            Flat
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.amount_type} />
                            </div>

                            {data.amount_type == "flat" && (
                                <div className="mt-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input
                                        className="mt-1 block w-full text-sm h-10"
                                        id="amount"
                                        type="integer"
                                        name="amount"
                                        value={data.amount}
                                        placeholder="amount..."
                                        onChange={(e) =>
                                            setData("amount", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.amount}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                            {data.amount_type == "percent" && (
                                <div className="mt-2">
                                    <Label htmlFor="percent">
                                        Percent Amount(%)
                                    </Label>
                                    <Input
                                        className="mt-1 block w-full text-sm h-10"
                                        id="percent"
                                        type="integer"
                                        name="percent"
                                        value={data.percent}
                                        placeholder="percent..."
                                        onChange={(e) =>
                                            setData("percent", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.percent}
                                        className="mt-2"
                                    />
                                </div>
                            )}

                            <div className=" bg-slate-50 p-2 border">
                                <div>
                                    <Label htmlFor="mark_as_default">
                                        Mark As Default
                                    </Label>

                                    <RadioGroup
                                        className="flex mt-2 gap-x-6 items-center"
                                        defaultValue={data?.mark_as_default}
                                        onValueChange={(v) => {
                                            setData("mark_as_default", v);
                                        }}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value={1}
                                                id="accept"
                                            />
                                            <Label htmlFor="accept">Yes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value={0}
                                                id="reject"
                                            />
                                            <Label htmlFor="reject">No</Label>
                                        </div>
                                    </RadioGroup>
                                    <InputError
                                        message={errors.mark_as_default}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </ShadcnCard>

                        <TwoColumnLayout.Actions>
                            <div className="flex justify-end mt-4">
                                <Button className="w-[260px]">Submit</Button>
                            </div>
                        </TwoColumnLayout.Actions>
                    </form>
                </TwoColumnLayout.Main>
                <TwoColumnLayout.Aside>
                    {tax && (
                        <ShadcnCard title={tax.name}>
                            <TextMuted className="inline-block pt-2">
                                Tax Rate
                            </TextMuted>
                            {/* <TextLarge className={`leading-[0]`}>
                            {tax.amount_type == "flat" && "Flat Amount (₹)" + tax.percent} 
                            {tax.amount_type == "percent" && tax.percent + "%"} 
                            </TextLarge> */}
                            <TextLarge className={`leading-[0] gap-2`}>
                                <span>
                                    {tax.amount_type == "flat" &&
                                        "Flat Amount (₹)" + tax.percent}{" "}
                                </span>
                                <span>
                                    {tax.amount_type == "percent" &&
                                        tax.percent + "%"}{" "}
                                </span>
                                <Badge>
                                    {tax.mark_as_default
                                        ? "Default"
                                        : "Not Default"}
                                </Badge>
                            </TextLarge>
                            <TextMuted className="inline-block pt-2">
                                Created at
                            </TextMuted>
                            <TextLarge className={`leading-[0]`}>
                                {tax.created_at_string}
                            </TextLarge>
                            <TextMuted className="inline-block pt-2">
                                Last Updated
                            </TextMuted>
                            <TextLarge className={`leading-[0]`}>
                                {tax.updated_at_string}
                            </TextLarge>
                        </ShadcnCard>
                    )}
                </TwoColumnLayout.Aside>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}
