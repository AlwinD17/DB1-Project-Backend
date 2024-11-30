import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { IBooking } from "../../interfaces/booking.interface";
import { BOOKING_STATUS } from "../../common/enums";
import { PaymentEntity } from "../../payment/entities/payment.entity";
import { ExperiencesEntity } from "../../experiences/entities/experiences.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { AdditionalServicesEntity } from "../../additional-services/entities/additional-services.entity";

@Entity('booking')
export class BookingEntity extends BaseEntity implements IBooking {

    @Column()
    readonly total_price: number;

    @Column({ type: 'enum', enum: BOOKING_STATUS, default: BOOKING_STATUS.PENDING })
    readonly status: BOOKING_STATUS;

    @ManyToOne(() =>ExperiencesEntity, e => e.bookings)
    experience: ExperiencesEntity

    @OneToOne(() => PaymentEntity, payment => payment.booking)
    payment: PaymentEntity

    @ManyToOne(() => UsersEntity, u => u.bookings)
    user: UsersEntity

    @ManyToMany(() => AdditionalServicesEntity, add => add.bookings )
    @JoinTable()
    additionalServices: AdditionalServicesEntity[]
}