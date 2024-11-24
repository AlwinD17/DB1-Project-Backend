import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { IBooking } from "../../interfaces/booking.interface";
import { BOOKING_STATUS } from "../../common/constants";

@Entity('booking')
export class BookingEntity extends BaseEntity implements IBooking {

    @Column({type:'double'})
    readonly total_price: number;

    @Column({ type: 'enum', enum: BOOKING_STATUS })
    readonly status: BOOKING_STATUS;
}