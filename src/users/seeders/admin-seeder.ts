import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersEntity } from "../../users/entities/users.entity";
import { hash } from "argon2";
import { ERoles } from "../../config/roles.enum";

@Injectable()
export class AdminSeederService {
    constructor(
        @InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>,
    ) { }

    async seed() {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD
        const existingUser = await this.usersRepository.findOne({
            where: { email: adminEmail },
        });

        if (!existingUser) {
            const user = this.usersRepository.create({
                email: adminEmail,
                password: await hash(adminPassword),
                firstName: 'Admin',
                paternal_lastName: 'User',
                maternal_lastName: 'Admin',
                isVerified: true,
                role: ERoles.ADMIN,
            });
            await this.usersRepository.save(user);
        }
    }
}
