import { usePage } from "@inertiajs/react";
import React from "react";
import {
    TwitterShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon,
} from "react-share";
export default function SocialPlatforms({ mentorProfile }) {
    return (
        <div className="flex gap-1">
            <LinkedinShareButton
                url={route("mentor.find-by-id", mentorProfile?.unique_id)}
            >
                <LinkedinIcon size={30} round />
            </LinkedinShareButton>
            <TwitterShareButton
                url={route("mentor.find-by-id", mentorProfile?.unique_id)}
                title={mentorProfile?.full_name}
            >
                <XIcon size={30} round />
            </TwitterShareButton>
            {/* <WhatsappShareButton
                url={route("mentor.find-by-id", mentorProfile?.unique_id)}
                title={mentorProfile?.full_name}
                separator=":: "
            >
                <WhatsappIcon size={30} round />
            </WhatsappShareButton> */}
        </div>
    );
}
