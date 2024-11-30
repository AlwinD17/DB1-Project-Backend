import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { DeleteResult, Repository } from 'typeorm';
import { BookingEntity } from '../../booking/entities/booking.entity';
import { BasePaginationService } from '../../common/services/base-pagination.service';
import { CreatePaymentDTO } from '../dtos/create-payment.dto';
import { PAYMENT_STATUS } from '../../common/enums';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { UUID } from 'crypto';

@Injectable()
export class PaymentService extends BasePaginationService<PaymentEntity> {
    constructor(
        @InjectRepository(PaymentEntity) private readonly paymentRepository: Repository<PaymentEntity>,
        @InjectRepository(BookingEntity) private readonly bookingRepository: Repository<BookingEntity>
    ){
        super(paymentRepository)
    }
    async createPayment(body: CreatePaymentDTO): Promise<PaymentEntity> {
        try {
            const {booking_id, ...bodyData  } = body;
            const booking = await this.bookingRepository.findOne({ where: { id: booking_id } });
            if (!booking) {
                throw new NotFoundException(`Booking with ID ${booking_id} not found.`);
            }

            const payment = this.paymentRepository.create({
                ...bodyData,
                booking
            });

            return await this.paymentRepository.save(payment);

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; 
            }
            throw new InternalServerErrorException('Error creating payment. Please try again later.');
        }
    }

    async getAllPayments(options: IPaginationOptions): Promise<Pagination<PaymentEntity>> {
        try {
            const queryBuilder = this.paymentRepository.createQueryBuilder('payments')
                .leftJoinAndSelect('payments.booking', 'booking');

            return this.paginate(options, queryBuilder);
        } catch (error) {
            throw error;
        }
    }

    async getPaymentById(id: UUID): Promise<PaymentEntity> {
        const payment = await this.paymentRepository.findOne({
            where: { id },
            relations: ['booking'],
        });

        if (!payment) throw new NotFoundException(`Payment with ID ${id} not found.`);
        return payment;
    }

    // Actualizar un pago (por ejemplo, cambiar el estado de pago)
    async updatePaymentStatus(id: UUID, status: PAYMENT_STATUS): Promise<PaymentEntity> {
        const payment = await this.paymentRepository.findOne({ where: { id } });
        if (!payment) throw new NotFoundException(`Payment with ID ${id} not found.`);

        if (payment.status === status) {
            throw new BadRequestException(`Payment with ID ${id} is already in the status ${status}.`);
        }

        payment.status = status;
        return await this.paymentRepository.save(payment);
    }

    async deletePayment(id: UUID): Promise<DeleteResult> {
        const payment = await this.paymentRepository.findOne({ where: { id } });
        if (!payment) throw new NotFoundException(`Payment with ID ${id} not found.`);

        return await this.paymentRepository.delete(payment);
    }

    async completePayment(id: UUID): Promise<PaymentEntity> {
        return this.updatePaymentStatus(id, PAYMENT_STATUS.COMPLETED);
    }


}
