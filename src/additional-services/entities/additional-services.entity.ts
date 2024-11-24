import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { IAdditionalService } from "../../interfaces/additional-service.interface";
import { ExperiencesEntity } from "../../experiences/entities/experiences.entity";
import { BookingEntity } from "../../booking/entities/booking.entity";

@Entity('additionalServices')
export class AdditionalServicesEntity extends BaseEntity implements IAdditionalService{
    @Column()
    readonly name: string;

    @Column()
    readonly price: number

    @Column()
    readonly type: string

    @ManyToOne(() => ExperiencesEntity, e => e.additionalServices)
    experience: ExperiencesEntity

    @ManyToMany(() => BookingEntity, b => b.additionalServices)
    bookings: BookingEntity[]
}