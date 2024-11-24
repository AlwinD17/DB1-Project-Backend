import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { IExperience } from "../../interfaces/experience.interface";

@Entity('experiences')
export class ExperiencesEntity extends BaseEntity implements IExperience{
   
    @Column()
    readonly title: string

    @Column()
    readonly description: string;

    @Column({type: "date"})
    readonly start_date: Date;

    @Column({ type: 'date' })
    readonly end_date: Date;

    @Column({ type: 'double' })
    readonly base_price: number;

    @Column({ type: 'double' })
    readonly profit_margin: number;

    @Column()
    readonly location: string;

}