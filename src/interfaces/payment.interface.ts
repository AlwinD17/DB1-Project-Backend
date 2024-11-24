import { PAYMENT_METHOD } from "../common/enums";
import { PAYMENT_STATUS } from "../common/enums";

export interface IPayment{
    amount: number
    payment_method: PAYMENT_METHOD
    status: PAYMENT_STATUS
}