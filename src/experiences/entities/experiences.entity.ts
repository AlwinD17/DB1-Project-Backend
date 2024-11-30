import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { IExperience } from "../../interfaces/experience.interface";
import { UsersEntity } from "../../users/entities/users.entity";
import { BookingEntity } from "../../booking/entities/booking.entity";
import { AdditionalServicesEntity } from "../../additional-services/entities/additional-services.entity";
import { TagsEntity } from "../../tags/entities/tags.entity";

@Entity('experiences')
export class ExperiencesEntity extends BaseEntity implements IExperience{
   
    @Column()
    readonly title: string

    @Column({type:'text'})
    readonly description: string;

    @Column({type: "date"})
    readonly start_date: Date;

    @Column({ type: 'date' })
    readonly end_date: Date;

    @Column()
    readonly base_price: number;

    @Column()
    readonly profit_margin: number;

    @Column()
    readonly location: string;

    @ManyToOne(() => UsersEntity, user => user.experiences)
    organizer: UsersEntity

    @OneToMany(() => BookingEntity, b => b.experience)
    bookings: BookingEntity[]

    @ManyToMany(() => TagsEntity, t => t.experiences)
    tags: TagsEntity[]
}