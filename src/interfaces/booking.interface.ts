import { BOOKING_STATUS } from "../common/constants"

export interface IBooking{
    total_price: number
    status: BOOKING_STATUS
}