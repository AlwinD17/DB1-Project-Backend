import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ITag } from "../../interfaces/tag.interface";

@Entity('tags')
export class TagsEntity extends BaseEntity implements ITag{
    
    @Column()
    readonly tag: string;
}