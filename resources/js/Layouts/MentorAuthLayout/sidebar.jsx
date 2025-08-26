import { cn } from "@/shadcn";
import { mentorNavItems, userNavItems } from "@/data/admin/nav-data";
import { DashboardNav } from "@/Components/Admin/dashboard-nav";
import { userHasRole } from "@/Helpers/GlobalFunctions";

export default function Sidebar() {
    return (
        <nav
            className={cn(
                `hidden h-screen border-r pt-16 lg:block w-72 sticky top-0`,
            )}
        >
            <div className="space-y-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        <DashboardNav items={mentorNavItems} />
                    </div>
                </div>
            </div>
        </nav>
    );
}
