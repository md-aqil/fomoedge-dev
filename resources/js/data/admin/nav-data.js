export const navItems = [
    {
        title: "Dashboard",
        href: route("admin.dashboard"),
        icon: "dashboard",
        label: "Dashboard",
    },
    {
        title: "Sales",
        href: "#",
        icon: "percent",
        label: "Assigned Mentor",
        items: [
            {
                title: "Transactions",
                href: route("admin.transactions.index"),
                icon: "percent",
                label: "Transactions",
            },
            {
                title: "Bookings",
                href: route("admin.bookings.index"),
                icon: "clock",
                label: "Bookings",
                permit: "view bookings",
            },
        ],
    },

    {
        title: "B2B Mentorship Queries",
        label: "B2B Mentorship Queries",
        href: "#",
        icon: "page",
        items: [
            {
                title: "All",
                href: route("admin.b2b-mentorship-queries.index"),
                icon: "page",
                label: "All",
                permit: "view b2b-mentorship queries",
            },
            {
                title: "External Queries",
                href: route("admin.b2b-mentorship-queries.externalQueries"),
                icon: "page",
                label: "External Queries",
                permit: "view b2b-mentorship queries",
            },
            {
                title: "Internal Queries",
                href: route("admin.b2b-mentorship-queries.internalQueries"),
                icon: "page",
                label: "Internal Queries",
                permit: "view b2b-mentorship queries",
            },
        ],
    },

    {
        title: "Topics & Tags",
        label: "Topics&Tags",
        href: route("admin.topics.index"),
        icon: "page",
    },
    {
        title: "Mentors",
        label: "Mentors",
        href: route("admin.mentor-profiles.index"),
        icon: "page",
    },
    {
        title: "Mentees",
        label: "Mentees",
        href: route("admin.mentees.index"),
        icon: "page",
    },
    {
        title: "Ratings",
        label: "Mentors",
        href: route("admin.ratings.index"),
        icon: "page",
        label: "Mentors",
    },
    {
        title: "Courses",
        href: "#",
        icon: "graduation",
        label: "courses",
        items: [
            {
                title: "All Courses",
                href: route("admin.courses.index"),
                icon: "graduation",
                label: "all_courses",
            },
        ],
    },

    {
        title: "Pages",
        label: "Pages",
        href: route("admin.pages.index"),
        icon: "page",
    },
    {
        title: "Blog",
        label: "Blog",
        href: "#",
        icon: "fileStack",
        label: "Blog",
        permit: "view posts|create posts|edit posts|view post categories|create post categories|edit post categories",
        items: [
            {
                title: "Posts",
                label: "Posts",
                href: route("admin.posts.index"),
                icon: "page",
                label: "Posts",
            },
            {
                title: "Categories",
                label: "Categories",
                href: route("admin.postCategories.index"),
                icon: "folders",
                label: "Categoris",
            },
        ],
    },
    {
        title: "Menus",
        label: "Menus",
        href: "#",
        icon: "menu",
        label: "Create Menu",
        items: [
            {
                title: "Menus",
                href: route("admin.menus.index"),
                icon: "menu",
                label: "Menus",
            },
            {
                title: "Create Menu",
                href: route("admin.menus.create"),
                icon: "add",
                label: "Create Menu",
            },
        ],
    },

    {
        title: "Users",
        href: "#",
        icon: "users",
        label: "Users",
        permit: "view users|create users|edit users",
        items: [
            {
                title: "Add User",
                href: route("admin.users.create"),
                icon: "userRoundPlus",
                label: "Add User",
                permit: "create users",
            },
            {
                title: "All User",
                href: route("admin.users.index"),
                icon: "list",
                label: "All User",
                permit: "view users",
            },
        ],
    },
    // {
    //     title: "Roles",
    //     href: "#",
    //     icon: "users",
    //     label: "Roles",
    //     permit: "view roles|create roles|edit roles",
    //     items: [
    //         {
    //             title: "Add Role",
    //             href: route("admin.roles.create"),
    //             icon: "userRoundPlus",
    //             label: "Add User",
    //             permit: "create roles",
    //         },
    //         {
    //             title: "All Roles",
    //             href: route("admin.roles.index"),
    //             icon: "list",
    //             label: "All Roles",
    //             permit: "view roles",
    //         },
    //     ],
    // },
    // {
    //     title: "Notes",
    //     href: "#",
    //     icon: "pages",
    //     label: "Notes",
    //     permit: "view notes|create notes|edit notes",
    //     items: [
    //         {
    //             title: "Add Note",
    //             href: route("admin.notes.create"),
    //             icon: "post",
    //             label: "Add Note",
    //             permit: "create notes",
    //         },
    //         {
    //             title: "All Notes",
    //             href: route("admin.notes.index"),
    //             icon: "folders",
    //             label: "Notes",
    //             permit: "view notes",
    //         },
    //     ],
    // },
    {
        title: "Enquires",
        href: route("admin.contact-queries.index"),
        icon: "help",
        label: "Enquires",
    },
    {
        title: "Settings",
        href: "#",
        // href: route("admin.settings.view"),
        icon: "settings",
        label: "Settings",
        permit: "view settings",
        items: [
            {
                title: "Settings",
                href: route("admin.settings.view"),
                icon: "settings",
                label: "Settings",
                permit: "view settings",
            },
            {
                title: "Profile",
                href: route("admin.profile.view"),
                icon: "profile",
                label: "Profile",
                permit: "view profile",
            },
            {
                title: "Taxes",
                href: route("admin.taxes.index"),
                icon: "coins",
                label: "Taxes",
                permit: "view languages",
            },
            {
                title: "Platform Fee",
                href: route("admin.platform-rates.index"),
                icon: "coins",
                label: "Platform Fee",
                permit: "view languages",
            },
        ],
    },
];

export const mentorNavItems = [
    {
        title: "Dashboard",
        href: route("mentors.dashboard"),
        icon: "dashboard",
        label: "Dashboard",
    },
    {
        title: "Topics And tags",
        href: route("mentors.topics-and-tags.index"),
        icon: "page",
        label: "Topics And Tags",
    },
    {
        title: "Bookings",
        href: route("mentors.bookings.index"),
        icon: "clock",
        label: "Bookings",
    },
    {
        title: "Courses",
        href: "#",
        icon: "graduation",
        label: "courses",
        items: [
            {
                title: "All Courses",
                href: route("mentors.courses.index"),
                icon: "graduation",
                label: "all_courses",
            },
            {
                title: "Add New",
                href: route("mentors.courses.create"),
                icon: "bookheadphone",
                label: "new_course",
            },
        ],
    },
    {
        title: "Blog",
        label: "Blog",
        href: route("mentors.posts.index"),
        icon: "fileStack",
        label: "Blogs",
    },
    {
        title: "Account",
        href: "#",
        icon: "userCog",
        label: "account",
        items: [
            {
                title: "Profile",
                href: route("mentors.profile"),
                icon: "user",
                label: "profile",
            },

            {
                title: "B2B Availability",
                href: route("mentors.b2b-availability"),
                icon: "thumbsUp",
                label: "profile",
            },

            {
                title: "KYC Details",
                href: route("mentors.profile.kyc-details"),
                icon: "userCheck",
                label: "kyc-details",
            },
        ],
    },
];

export const userNavItems = [
    {
        title: "Dashboard",
        href: route("user.dashboard"),
        icon: "dashboard",
        label: "Dashboard",
    },
    {
        title: "Bookings",
        href: "#",
        icon: "userCog",
        label: "bookings",
        items: [
            {
                title: "My Bookings",
                href: route("user.bookings.index"),
                icon: "user",
                label: "profile",
            },
        ],
    },
    {
        title: "Profile",
        href: route("user.profile.view"),
        icon: "profile",
        label: "Profile",
    },
];
