import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { IUsers } from "../../interfaces/users.interface";
import { ExperiencesEntity } from "../../experiences/entities/experiences.entity";
import { BookingEntity } from "../../booking/entities/booking.entity";
import { LinksEntity } from "../../links/entities/links.entity";

@Entity('users')
export class UsersEntity extends BaseEntity implements IUsers{
     
    @Column({unique: true})
    email:string

    @Column({select:false})
    password: string;

    @Column()
    firstName: string;

    @Column()
    paternal_lastName: string;

    @Column()
    maternal_lastName: string;

    @Column({type: 'boolean', default:false})
    isVerified: boolean;

    @Column()
    role: string;

    @OneToMany(() => ExperiencesEntity, experience => experience.organizer)
    experiences: ExperiencesEntity[] 

    @OneToMany(() => BookingEntity, b => b.user)
    bookings: BookingEntity

    @OneToMany(() => LinksEntity, l => l.organizer)
    social_media_links: LinksEntity[]

}