import React from "react";

export default function SocialShare() {
    return (
        <div className="flex items-center">
            <div className="hover:-translate-y-1 transition-all duration-300">
                <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark hover:border-fomoPrimary-0 hover:bg-fomoPrimary-0 hover:text-white bg-white sm:mr-4 lg:mr-3 xl:mr-4 translate-y-0"
                >
                    <svg
                        width="8"
                        height="16"
                        viewBox="0 0 8 16"
                        className="fill-current"
                    >
                        <path d="M7.43902 6.4H6.19918H5.75639V5.88387V4.28387V3.76774H6.19918H7.12906C7.3726 3.76774 7.57186 3.56129 7.57186 3.25161V0.516129C7.57186 0.232258 7.39474 0 7.12906 0H5.51285C3.76379 0 2.54609 1.44516 2.54609 3.5871V5.83226V6.34839H2.10329H0.597778C0.287819 6.34839 0 6.63226 0 7.04516V8.90323C0 9.26452 0.243539 9.6 0.597778 9.6H2.05902H2.50181V10.1161V15.3032C2.50181 15.6645 2.74535 16 3.09959 16H5.18075C5.31359 16 5.42429 15.9226 5.51285 15.8194C5.60141 15.7161 5.66783 15.5355 5.66783 15.3806V10.1419V9.62581H6.13276H7.12906C7.41688 9.62581 7.63828 9.41935 7.68256 9.10968V9.08387V9.05806L7.99252 7.27742C8.01466 7.09677 7.99252 6.89032 7.85968 6.68387C7.8154 6.55484 7.61614 6.42581 7.43902 6.4Z" />
                    </svg>
                </a>
            </div>
            <div className="hover:-translate-y-1 transition-all duration-300">
                <a
                    href="https://www.instagram.com/fomoedge/profilecard/?igsh=OXZsdnZybmhzdjMy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark hover:border-fomoPrimary-0 hover:bg-fomoPrimary-0 hover:text-white bg-white sm:mr-4 lg:mr-3 xl:mr-4"
                >
                    <svg
                        width="18"
                        height="16"
                        className="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                    </svg>
                </a>
            </div>
            <div className="hover:-translate-y-1 transition-all duration-300">
                <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark hover:border-fomoPrimary-0 hover:bg-fomoPrimary-0 hover:text-white bg-white sm:mr-4 lg:mr-3 xl:mr-4"
                >
                    <svg
                        width="16"
                        height="12"
                        viewBox="0 0 16 12"
                        className="fill-current"
                    >
                        <path d="M15.6645 1.88018C15.4839 1.13364 14.9419 0.552995 14.2452 0.359447C13.0065 6.59222e-08 8 0 8 0C8 0 2.99355 6.59222e-08 1.75484 0.359447C1.05806 0.552995 0.516129 1.13364 0.335484 1.88018C0 3.23502 0 6 0 6C0 6 0 8.79263 0.335484 10.1198C0.516129 10.8664 1.05806 11.447 1.75484 11.6406C2.99355 12 8 12 8 12C8 12 13.0065 12 14.2452 11.6406C14.9419 11.447 15.4839 10.8664 15.6645 10.1198C16 8.79263 16 6 16 6C16 6 16 3.23502 15.6645 1.88018ZM6.4 8.57143V3.42857L10.5548 6L6.4 8.57143Z" />
                    </svg>
                </a>
            </div>
            <div className="hover:-translate-y-1 transition-all duration-300">
                <a
                    href="https://www.linkedin.com/company/fomoedge/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark hover:border-fomoPrimary-0 hover:bg-fomoPrimary-0 hover:text-white bg-white sm:mr-4 lg:mr-3 xl:mr-4"
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        className="fill-current"
                    >
                        <path d="M13.0214 0H1.02084C0.453707 0 0 0.451613 0 1.01613V12.9839C0 13.5258 0.453707 14 1.02084 14H12.976C13.5432 14 13.9969 13.5484 13.9969 12.9839V0.993548C14.0422 0.451613 13.5885 0 13.0214 0ZM4.15142 11.9H2.08705V5.23871H4.15142V11.9ZM3.10789 4.3129C2.42733 4.3129 1.90557 3.77097 1.90557 3.11613C1.90557 2.46129 2.45002 1.91935 3.10789 1.91935C3.76577 1.91935 4.31022 2.46129 4.31022 3.11613C4.31022 3.77097 3.81114 4.3129 3.10789 4.3129ZM11.9779 11.9H9.9135V8.67097C9.9135 7.90323 9.89082 6.8871 8.82461 6.8871C7.73571 6.8871 7.57691 7.74516 7.57691 8.60323V11.9H5.51254V5.23871H7.53154V6.16452H7.55423C7.84914 5.62258 8.50701 5.08065 9.52785 5.08065C11.6376 5.08065 12.0232 6.43548 12.0232 8.2871V11.9H11.9779Z" />
                    </svg>
                </a>
            </div>
        </div>
    );
}
