import { ProductIcon, ShapeIcon, FolderIcon, MirrorIcon } from "@/assets/Icons"

export interface IAppMenuItem {
    id: string
    label: string
    description: string
    icon: React.ElementType
}

export const appsMenuItems: IAppMenuItem[] = [
    {
        id: "link-in-bio",
        label: "Link in Bio",
        description: "Manage your Link in Bio",
        icon: ProductIcon
    },
    {
        id: "store",
        label: "Store",
        description: "Manage your Store activities",
        icon: ShapeIcon
    },
    {
        id: "media-kit",
        label: "Media Kit",
        description: "Manage your Media Kit",
        icon: FolderIcon
    },
    {
        id: "invoicing",
        label: "Invoicing",
        description: "Manage your Invoices",
        icon: MirrorIcon
    },
    {
        id: "bookings",
        label: "Bookings",
        description: "Manage your Bookings",
        icon: ProductIcon
    }
]