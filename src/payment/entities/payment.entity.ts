import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { IPayment } from "../../interfaces/payment.interface";
import { PAYMENT_METHOD, PAYMENT_STATUS } from "../../common/enums";

@Entity('payment')
export class PaymentEntity extends BaseEntity implements IPayment{
    
    @Column({ type: 'double' })
    readonly amount: number;

    @Column({type:'enum', enum:PAYMENT_METHOD})
    readonly payment_method: PAYMENT_METHOD;

    @Column({ type: 'enum', enum: PAYMENT_STATUS })
    readonly status: PAYMENT_STATUS;
}