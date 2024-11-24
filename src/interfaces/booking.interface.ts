import { BOOKING_STATUS } from "../common/enums"

export interface IBooking{
    total_price: number
    status: BOOKING_STATUS
}