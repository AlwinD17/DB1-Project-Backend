import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { IUsers } from "../../interfaces/users.interface";

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

    @Column({type: 'boolean'})
    isVerified: boolean;

    @Column()
    role: string;



}