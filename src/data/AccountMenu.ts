import { Settings, ReceiptText, Gift, Blocks, Bug, Users, LogOut } from 'lucide-react';

export interface IAccountMenuItem {
    id: number
    label: string
    icon: any
}

export const accountMenuItems: IAccountMenuItem[] = [
    {
        id: 0,
        label: "Settings",
        icon: Settings
    },
    {
        id: 1,
        label: "Purchase History",
        icon: ReceiptText
    },
    {
        id: 2,
        label: "Refer and Earn",
        icon: Gift
    },
    {
        id: 3,
        label: "Integrations",
        icon: Blocks
    },
    {
        id: 4,
        label: "Report Bug",
        icon: Bug
    },
    {
        id: 5,
        label: "Switch Account",
        icon: Users
    },
    {
        id: 6,
        label: "Sign Out",
        icon: LogOut
    }
]           