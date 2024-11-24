import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { IAdditionalService } from "../../interfaces/additional-service.interface";

@Entity('additionalServices')
export class AdditionalServicesEntity extends BaseEntity implements IAdditionalService{
    @Column()
    readonly name: string;

    @Column({type:'double'})
    readonly price: number

    @Column()
    readonly type: string
}