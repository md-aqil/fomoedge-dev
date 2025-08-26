import { Squirrel } from "lucide-react";
import React from "react";

export default function NoDataAlert({ title }) {
    return (
        <div className="flex justify-center items-center">
            <div className="rounded-lg py-10 items-center text-center">
                <div>
                    <Squirrel className="w-32 h-32 text-gray-300" />
                </div>
                <p className="text-gray-500 mt-4">{title}</p>
            </div>
        </div>
    );
}
