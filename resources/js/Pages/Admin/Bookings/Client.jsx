import React from "react";
import { Button } from "@/shadcn/ui/button";
import { Head, Link } from "@inertiajs/react";
import PageHeading from "@/Components/PageHeading";
import TwoColumnLayout from "@/Layouts/admin/TwoColumnLayout";
import { TextLarge, TextMuted } from "@/shadcn/ui/text-muted";
import { Mail, MapPin, PencilLine, Phone, PlusCircle } from "lucide-react";
import ShadcnCard from "@/Components/ShadcnCard";
import Screenshot from "@/Components/Screenshot";
import Can from "@/Components/Can";
import ClientForm from "@/Components/Clients/ClientForm";

export default function Client({ client, personTitles }) {
    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${
                    client ? "Edit Client - " + client?.full_name : "Create"
                } Client`}</title>
            </Head>
            <TwoColumnLayout.Heading>
                <PageHeading>
                    <PageHeading.Title>
                        {/* client - {client ? "Edit " + client?.full_name : "Create"} */}
                        {client ? (
                            <div className="flex gap-x-3 items-center">
                                <PencilLine />
                                Client - {client?.full_name}
                            </div>
                        ) : (
                            <div className="flex gap-x-3 items-center">
                                <PlusCircle />
                                Add Client
                            </div>
                        )}
                    </PageHeading.Title>
                    <PageHeading.Actions>
                        <Button asChild variant="outline">
                            <Link href={route("admin.clients.index")}>
                                Cancel
                            </Link>
                        </Button>
                        <Can permit="create clients">
                            <Button asChild>
                                <Link href={route("admin.clients.create")}>
                                    <PlusCircle className="h-4 w-4 mr-2" />{" "}
                                    Create New
                                </Link>
                            </Button>
                        </Can>
                    </PageHeading.Actions>
                </PageHeading>
                <div className="flex justify-between">
                    <div>
                        {client ? (
                            <Link className="text-blue-600 italic text-sm">
                                {route("admin.clients.edit", client.id)}
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
                    <ShadcnCard
                        className=""
                        title="General"
                        description={<></>}
                    >
                        <ClientForm
                            client={client}
                            personTitles={personTitles}
                        />
                    </ShadcnCard>
                    <TwoColumnLayout.Actions></TwoColumnLayout.Actions>
                </TwoColumnLayout.Main>
                <TwoColumnLayout.Aside>
                    <Screenshot
                        screenshotName={`client_${client?.full_name}`}
                        moduleName="clients"
                    >
                        {client && (
                            <ShadcnCard title={client?.full_name}>
                                <TextMuted className="inline-block mb-0">
                                    Company
                                </TextMuted>
                                <p className="!mt-0 mb-1">
                                    <span className="font-bold text-lg inline-block">
                                        {client?.company_name}
                                    </span>
                                    <small className="text-xs items-start flex gap-x-2">
                                        <span className="mt-1.5">
                                            <MapPin size={14} />
                                        </span>
                                        {client?.address}
                                    </small>
                                    <small className="text-xs items-start flex gap-x-2">
                                        <span className="mt-1.5">
                                            <Mail size={12} />
                                        </span>
                                        {client?.email !== ""
                                            ? client?.email
                                            : "NA"}
                                    </small>
                                    <small className="text-xs items-start flex gap-x-2">
                                        <span className="mt-1.5">
                                            <Phone size={12} />
                                        </span>
                                        {client?.phone ?? "NA"}
                                    </small>
                                </p>
                                <TextMuted className="inline-block pt-2">
                                    Created at
                                </TextMuted>
                                <TextLarge className={`leading-[0]`}>
                                    {client.created_at_string}
                                </TextLarge>
                                <TextMuted className="inline-block pt-2">
                                    Last Updated
                                </TextMuted>
                                <TextLarge className={`leading-[0]`}>
                                    {client.updated_at_string}
                                </TextLarge>
                            </ShadcnCard>
                        )}
                    </Screenshot>
                </TwoColumnLayout.Aside>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}
