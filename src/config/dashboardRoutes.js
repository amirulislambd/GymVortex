import {
    SquareBars,
    Calendar,
    Heart,
    GraduationCap,
    CircleQuestionDot,
    Plus,
    ListCheck,
    Persons,
    ShieldCheck,
    CreditCard,
  } from "@gravity-ui/icons";
  
  export const DASHBOARD_ROUTES = {
    user: [
      { href: "/dashboard/user", label: "Overview", icon: SquareBars },
      { href: "/dashboard/user/booked-classes", label: "Booked Classes", icon: Calendar },
      { href: "/dashboard/user/favorites", label: "Favorite Classes", icon: Heart },
      { href: "/dashboard/user/apply-trainer", label: "Apply as Trainer", icon: GraduationCap },
    ],
  
    trainer: [
      { href: "/dashboard/trainer", label: "Overview", icon: SquareBars },
      { href: "/dashboard/trainer/add-class", label: "Add Class", icon: Plus },
      { href: "/dashboard/trainer/my-classes", label: "My Classes", icon: ListCheck },
      { href: "/dashboard/trainer/add-post", label: "Add Forum Post", icon: Persons },
      { href: "/dashboard/trainer/my-posts", label: "My Forum Posts", icon: ListCheck },
    ],
  
    admin: [
      { href: "/dashboard/admin", label: "Overview", icon: SquareBars },
      { href: "/dashboard/admin/manage-users", label: "Manage Users", icon: Persons },
      { href: "/dashboard/admin/applied-trainers", label: "Applied Trainers", icon: GraduationCap },
      { href: "/dashboard/admin/manage-trainers", label: "Manage Trainers", icon: ShieldCheck },
      { href: "/dashboard/admin/manage-classes", label: "Manage Classes", icon: ListCheck },
      { href: "/dashboard/admin/add-post", label: "Add Forum Post", icon: Plus },
      { href: "/dashboard/admin/transactions", label: "Transactions", icon: CreditCard },
      { href: "/dashboard/admin/forum-manage", label: "Forum Manage", icon: Persons },
    ],
  };