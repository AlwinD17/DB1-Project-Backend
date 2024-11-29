import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ILink } from "../../interfaces/link.interface";
import { SOCIAL_MEDIA } from "../../common/enums/social-media.enum";
import { UsersEntity } from "../../users/entities/users.entity";

@Entity('links')
export class LinksEntity extends BaseEntity implements ILink{
    
    @Column()
    readonly link: string

    @Column({ type: 'enum', enum: SOCIAL_MEDIA })
    readonly social_media: SOCIAL_MEDIA;

    @ManyToOne(() => UsersEntity, u => u.social_media_links, {onDelete:'CASCADE', onUpdate:'CASCADE'})
    organizer: UsersEntity
}