import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import * as argon2 from 'argon2'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>,
    ){}

    async validateUser(email: string, password: string): Promise<{ validated: boolean, user?: UsersEntity | any, error?: string }> {
        try {
            const user = await this.usersRepository.findOne({
                where: { email },
                relations: ['roles'],
                select: ['id', 'email', 'password', 'role']
            });

            if (!user) {
                return { validated: false, error: 'User not found' };
            }

            const isPasswordValid = await argon2.verify(user.password, password);

            if (!isPasswordValid) {
                return { validated: false, error: 'Incorrect password' };
            }

            return { validated: true, user };

        } catch (error) {

            return { validated: false, error: error.message };
        }
    }
}
