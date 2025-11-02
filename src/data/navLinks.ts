import { HomeIcon, InsertChartIcon, CrmIcon, WidgetsIcon } from "@/assets/Icons"
import type { INavLink } from "@/Types/Interface/INavigation"

export const navLinks: INavLink[] = [
    {
        id: "home",
        label: "Home",
        icon: HomeIcon,
        href: "/",
        isActive: false
    },
    {
        id: "analytics",
        label: "Analytics",
        icon: InsertChartIcon,
        href: "/analytics",
        isActive: false
    },
    {
        id: "revenue",
        label: "Revenue",
        icon: InsertChartIcon,
        href: "/revenue",
        isActive: true
    },
    {
        id: "crm",
        label: "CRM",
        icon: CrmIcon,
        href: "/crm",
        isActive: false
    },
    {
        id: "apps",
        label: "Apps",
        icon: WidgetsIcon,
        href: "/apps",
        isActive: false
    }
]