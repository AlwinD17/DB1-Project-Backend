import { PAYMENT_STATUS } from "../constants"

export interface IPayment{
    amount: number
    payment_date: Date
    payment_method: string
    status: PAYMENT_STATUS
}