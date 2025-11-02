export interface ITransactionMetadata {
    name: string
    type: "digital_product" | "coffee" | "webinar" | string
    email: string
    quantity: number
    country: string
    product_name?: string
}

export interface ITransaction {
    amount: number
    metadata?: ITransactionMetadata
    payment_reference?: string
    status: "successful" | "pending" | "failed" | string
    type: "deposit" | "withdrawal"
    date: string
}

export type TransactionList = ITransaction[]