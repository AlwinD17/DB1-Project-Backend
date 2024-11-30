import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { BookingEntity } from '../entities/booking.entity';
import { BasePaginationService } from '../../common/services/base-pagination.service';
import { UsersEntity } from '../../users/entities/users.entity';
import { AdditionalServicesEntity } from '../../additional-services/entities/additional-services.entity';
import { CreateBookingDTO } from '../dtos/create-booking.dto';
import { ERoles } from '../../config/roles.enum';
import { ExperiencesEntity } from '../../experiences/entities/experiences.entity';
import { UUID } from 'crypto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import {  BookingsFiltersDTO } from '../dtos/bookings-filters.dto';
import { BOOKING_STATUS } from '../../common/enums';


const filterMappings = {
    minPrice: 'bookings.total_price >= :minPrice',
    maxPrice: 'bookings.total_price <= :maxPrice',
    status:'bookings.status = :status'
  };

@Injectable()
export class BookingService extends BasePaginationService<BookingEntity>{
    constructor(
        @InjectRepository(BookingEntity) private readonly bookingRepository: Repository<BookingEntity>,
        @InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>,
        @InjectRepository(ExperiencesEntity) private readonly experiencesRepository: Repository<ExperiencesEntity>,
        @InjectRepository(AdditionalServicesEntity) private readonly additionalServiceRepository: Repository<AdditionalServicesEntity>
    ){
        super(bookingRepository)
    }

    async createBooking(body: CreateBookingDTO): Promise<BookingEntity>{
        try {
            const {user_id, experience_id, additional_services} = body

            const userEntity = await this.usersRepository.findOneBy({ id: user_id, role: ERoles.TRAVELER})
            if(!userEntity) throw new NotFoundException(`User with ID ${user_id} not found.`)

                
            const experienceEntity = await this.experiencesRepository.findOneBy({id: experience_id})
            if(!experienceEntity) throw new NotFoundException(`Experience with ID ${experience_id} not found.`)
            
            
            const additionalServicesEntities = await this.additionalServiceRepository.find({
                where: {
                    id: In(additional_services),
                },
            });
            if (additionalServicesEntities.length === 0) {
                throw new NotFoundException('No se encontraron servicios adicionales con los IDs proporcionados.');
            }

            let total_price = experienceEntity.base_price || 0;
            const services_price = additionalServicesEntities.reduce(
                (total, service) => total + (service.price || 0),
                0
            );
            total_price += services_price;
            total_price = parseFloat(total_price.toFixed(2));  
            
            const booking = this.bookingRepository.create({
                user: userEntity,
                experience: experienceEntity,
                additionalServices: additionalServicesEntities,
                total_price: total_price
            })

            return await this.bookingRepository.save(booking)

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; 
            }

            throw new InternalServerErrorException('An unexpected error occurred while creating the booking.');
        }
    }


    async getAllBookings(options: IPaginationOptions, filters: BookingsFiltersDTO): Promise<Pagination<BookingEntity>> {
        try {       
            const queryBuilder = this.bookingRepository.createQueryBuilder('bookings')
            .leftJoinAndSelect('bookings.user', 'user')
            .leftJoinAndSelect('bookings.experience', 'experience')

            this.applyFilters(queryBuilder, filters, filterMappings)

            return this.paginate(options, queryBuilder) 

        } catch (error) {
            throw error
        }
    }

    async getBookingById(id: UUID): Promise<BookingEntity> {
        const booking = await this.bookingRepository.findOne({
            where: { id },
            relations: ['user', 'experience', 'additionalServices'],
        });
    
        if (!booking) throw new NotFoundException(`Booking with ID ${id} not found.`);
        return booking;
    }

    async getBookingsByTraveler(traveler_id: UUID, options: IPaginationOptions, filters: BookingsFiltersDTO ): Promise<Pagination<BookingEntity>> {
        try {
            const queryBuilder = await this.bookingRepository.createQueryBuilder('bookings')
            .leftJoinAndSelect('bookings.user', 'user')
            .leftJoinAndSelect('bookings.experience', 'experience')
            .where('user.id = :traveler_id', {traveler_id})
            .andWhere('user.role = :role', { role: ERoles.TRAVELER})

            this.applyFilters(queryBuilder, filters, filterMappings)

            return this.paginate(options, queryBuilder) 
        } catch (error) {
            throw error
        }
    }

    async getBookingsByExperience(experience_id: UUID, options: IPaginationOptions, filters: BookingsFiltersDTO ): Promise<Pagination<BookingEntity>> {
        try {
            const queryBuilder = await this.bookingRepository.createQueryBuilder('bookings')
            .leftJoinAndSelect('bookings.user', 'user')
            .leftJoinAndSelect('bookings.experience', 'experience')
            .where('experience.id = :experience_id', { experience_id })

            this.applyFilters(queryBuilder, filters, filterMappings)

            return this.paginate(options, queryBuilder) 
        } catch (error) {
            throw error
        }
    }

    async confirmBooking(id:UUID): Promise<UpdateResult> {
        try {
            const booking = await this.bookingRepository.findOneBy({id})
            if(booking.status !== BOOKING_STATUS.PENDING){
                throw new Error('Booking coudnt be completed')
            }
            const result = await this.bookingRepository.update(id, {status: BOOKING_STATUS.CONFIRMED});
    
            if (result.affected === 0) throw new NotFoundException(`Booking with ID ${id} not found.`);

            return result

        } catch (error) {
            throw error
        }

    }

    async completeBooking(id:UUID): Promise<UpdateResult> {
        try {
            const booking = await this.bookingRepository.findOneBy({id})
            if(booking.status !== BOOKING_STATUS.CONFIRMED){
                throw new Error('Booking coudnt be completed')
            }
            const result = await this.bookingRepository.update(id, {status: BOOKING_STATUS.COMPLETED});
    
            if (result.affected === 0) throw new NotFoundException(`Booking with ID ${id} not found.`);

            return result

        } catch (error) {
            throw error
        }

    }

    async cancelBooking(id: UUID): Promise<UpdateResult> {
        try {
            
            const booking = await this.bookingRepository.findOneBy({id})
            if(booking.status !== BOOKING_STATUS.PENDING && booking.status !== BOOKING_STATUS.CONFIRMED){
                throw new Error('Booking coudnt be cancelled')
            }
            const result = await this.bookingRepository.update(id, {status: BOOKING_STATUS.CANCELLED});
    
            if (result.affected === 0) throw new NotFoundException(`Booking with ID ${id} not found.`);

            return result

        } catch (error) {
            throw error
        }

    }

}
