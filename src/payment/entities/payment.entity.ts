import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { IPayment } from "../../interfaces/payment.interface";
import { PAYMENT_METHOD, PAYMENT_STATUS } from "../../common/enums";
import { BookingEntity } from "../../booking/entities/booking.entity";

@Entity('payment')
export class PaymentEntity extends BaseEntity implements IPayment{
    
    @Column()
    readonly amount: number;

    @Column({type:'enum', enum:PAYMENT_METHOD})
    readonly payment_method: PAYMENT_METHOD;

    @Column({ type: 'enum', enum: PAYMENT_STATUS, default:PAYMENT_STATUS.PENDING })
    status: PAYMENT_STATUS;

    @OneToOne(() => BookingEntity, booking => booking.payment)
    booking: BookingEntity
}