import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import * as argon2 from 'argon2'
import { SignUpDTO } from '../../auth/dto/signup.dto';
import { UUID } from 'crypto';
import { UpdateUserDTO } from '../dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>,
    ){}

    async validateUser(email: string, sentPassword: string): Promise<{ validated: boolean, user?: UsersEntity | any, error?: string }> {
        try {
            const user = await this.usersRepository.createQueryBuilder('user')
            .addSelect('user.password') 
            .where('user.email = :email', { email })
            .getOne();

            if (!user) {
                return { validated: false, error: 'User not found' };
            }

            const isPasswordValid = await argon2.verify(user.password, sentPassword);

            if (!isPasswordValid) {
                return { validated: false, error: 'Incorrect password' };
            }

            const { password, ...sendUser} = user
            return { validated: true, user: sendUser };

        } catch (error) {

            return { validated: false, error: error.message };
        }
    }

    async createUser(body:SignUpDTO): Promise<{ success: boolean, data?: any, message?: string }>{
        try {
            const { password, ...bodyData } = body
            const hashedPass = await argon2.hash(password)
            const newUser = this.usersRepository.create({
                password:hashedPass,
                ...bodyData
            })
            const user = await this.usersRepository.save(newUser)
            return ({
                success: true,
                data: user,
                message: 'Usuario registrado existosamente.'
            })
        } catch (error) {
            return ({
                success: false,
                message: error.message
            })
        }
    }

    async updateUser(id: UUID, updateData: UpdateUserDTO): Promise<UpdateResult> {
        
        const user = await this.usersRepository.update(id, updateData);
        if(user.affected === 0)throw new NotFoundException(`User with ID ${id} not found`)

        return user;
    }

    async deleteUser(id: UUID): Promise<DeleteResult> {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return result
    }

    async getProfile(userId: UUID): Promise<Partial<UsersEntity>> {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ['social_media_links', 'experiences'],
        });
        if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    
        const { password, ...profileData } = user;
        return profileData;
    }
}
