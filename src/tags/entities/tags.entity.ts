import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ITag } from "../../interfaces/tag.interface";
import { ExperiencesEntity } from "../../experiences/entities/experiences.entity";

@Entity('tags')
export class TagsEntity extends BaseEntity implements ITag{
    
    @Column({unique:true})
    readonly tag: string;

    @ManyToMany(() => ExperiencesEntity, e => e.tags, {onUpdate:'CASCADE', onDelete:'CASCADE'})
    @JoinTable({name:'Experiences_tags'})
    experiences: ExperiencesEntity[]
}