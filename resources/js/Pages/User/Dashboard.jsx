import UserAuthLayout from "@/Layouts/UserAuthLayout/UserAuthLayout";
import { IndianRupee, BookCheck, LibraryBig, Star, Stars } from "lucide-react"; // import { usePage } from "@inertiajs/react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { Link } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <UserAuthLayout>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            View Bookings
                        </CardTitle>
                        <BookCheck size={14} color="green" />
                    </CardHeader>
                    <CardContent>
                        <Link href={route("user.bookings.index")}>
                            <div className={`text-2xl font-bold `}>
                                View all your Bookings
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {/* Click Here */}
                            </p>
                        </Link>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Rate & Review
                        </CardTitle>
                        <Stars size={14} color="red" />
                    </CardHeader>
                    <CardContent>
                        <Link href={route("user.bookings.index")}>
                            <div className={`text-2xl font-bold`}>
                                Rate & Revie purchased courses & your favorite
                                mentors
                            </div>
                            <p className="text-xs text-muted-foreground"></p>
                        </Link>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Manage Profile
                        </CardTitle>
                        <Star color="green" size={14} />
                    </CardHeader>
                    <CardContent>
                        <Link href={route("user.profile.view")}>
                            <div className="text-2xl font-bold">
                                Manage your profile
                            </div>
                            <p className="text-xs text-muted-foreground"></p>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </UserAuthLayout>
    );
}
