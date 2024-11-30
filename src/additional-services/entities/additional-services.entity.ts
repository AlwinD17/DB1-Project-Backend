import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { IAdditionalService } from "../../interfaces/additional-service.interface";
import { ExperiencesEntity } from "../../experiences/entities/experiences.entity";
import { BookingEntity } from "../../booking/entities/booking.entity";
import { AdditionalServiceType } from "../../common/enums";

@Entity('additionalServices')
export class AdditionalServicesEntity extends BaseEntity implements IAdditionalService{
    @Column()
    readonly name: string;

    @Column()
    readonly price: number

    @Column({
        type: 'enum',
        enum: AdditionalServiceType,
      })
      readonly type: AdditionalServiceType;

    @ManyToMany(() => BookingEntity, b => b.additionalServices)
    bookings: BookingEntity[]
}