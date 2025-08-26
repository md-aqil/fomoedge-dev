import React from "react";

export default function CardReview({ rating }) {
    return (
        <div>
            {rating !== 0 && (
                <div>
                    <div className="absolute top-0 right-4">
                        <img
                            src="/images/bg-price.png"
                            className="h-12 w-14"
                            alt=""
                        />
                    </div>
                    <div className="absolute top-2 right-8 text-white">
                        <div className="flex items-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="white"
                                stroke="currentColor"
                                strokewidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-star"
                            >
                                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                            </svg>
                            <span className="text-sm">{rating}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
