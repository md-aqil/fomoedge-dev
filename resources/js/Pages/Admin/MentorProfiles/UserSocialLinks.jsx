import { TextMuted } from "@/shadcn/ui/text-muted";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import React from "react";

export default function UserSocialLinks({ socialLinks }) {
    const socialIcons = (link) => {
        if (link.label.toLowerCase() == "facebook") {
            return <Facebook size={20} />;
        }
        if (link.label.toLowerCase() === "linkedin") {
            return <Linkedin size={20} />;
        }
        if (link.label.toLowerCase() === "youtube") {
            return <Youtube size={20} />;
        }
        if (link.label.toLowerCase() === "twitter") {
            return <Twitter size={20} />;
        }
        if (link.label.toLowerCase() === "instagram") {
            return <Instagram size={20} />;
        }
    };
    return (
        <div className="py-2 space-y-2">
            <TextMuted className="inline-block pt-0">Social Links</TextMuted>
            <div className="grid grid-cols-3 gap-4">
                {socialLinks?.map((link, index) => (
                    <div className="space-y-5" key={index}>
                        {link?.status && (
                            <div className="flex items-center gap-2 group">
                                <div className="border p-2 rounded-full group-hover:bg-fomoPrimary-0 group-hover:border-fomoPrimary-0 transition-all duration-300">
                                    {socialIcons(link)}
                                </div>
                                <a href={link?.url} target="_blank">
                                    <div>
                                        <TextMuted className="inline-block pt-0 hover:underline">
                                            Visit {link.label}
                                        </TextMuted>
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
