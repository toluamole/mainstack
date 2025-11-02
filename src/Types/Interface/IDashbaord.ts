export interface IDashboardMetric {
    id: string
    label: string
    value: string
    hasInfoIcon: boolean
    iconColor?: string
}

export type IDashboardMetrics = IDashboardMetric[]