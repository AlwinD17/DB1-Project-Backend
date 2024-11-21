import { BOOKING_STATUS } from "../constants"

export interface IBooking{
    booking_date: Date
    total_price: number
    status: BOOKING_STATUS
}