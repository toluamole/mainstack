import type { IDashboardMetric } from "@/Types/Interface/IDashbaord"

export const dashboardMetrics: IDashboardMetric[] = [
    {
        id: "ledger-balance",
        label: "Ledger Balance",
        value: "USD 0.00",
        hasInfoIcon: true,
        iconColor: "black"
    },
    {
        id: "total-payout",
        label: "Total Payout",
        value: "USD 55,080.00",
        hasInfoIcon: true,
        iconColor: "black"
    },
    {
        id: "total-revenue",
        label: "Total Revenue", 
        value: "USD 175,580.00",
        hasInfoIcon: true,
        iconColor: "black"
    },
    {
        id: "pending-payout",
        label: "Pending Payout",
        value: "USD 0.00",
        hasInfoIcon: true,
        iconColor: "black"
    }
]