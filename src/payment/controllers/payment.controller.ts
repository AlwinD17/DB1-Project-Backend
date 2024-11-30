import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { UUID } from 'crypto';
import { PAYMENT_STATUS } from '../../common/enums';
import { CreatePaymentDTO } from '../dtos/create-payment.dto';
import { PaymentEntity } from '../entities/payment.entity';
import { PaymentService } from '../services/payment.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { DeleteResult } from 'typeorm';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ERoles } from '../../config/roles.enum';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Roles([ERoles.ADMIN,ERoles.TRAVELER])
    @Post()
    async createPayment(@Body() createPaymentDTO: CreatePaymentDTO): Promise<PaymentEntity> {
        return this.paymentService.createPayment(createPaymentDTO);
    }

    @Roles([ERoles.ADMIN])
    @Get()
    async getAllPayments(@Query() options: IPaginationOptions,): Promise<Pagination<PaymentEntity>> {
        return this.paymentService.getAllPayments(options);
    }

    @Roles([ERoles.ADMIN,ERoles.TRAVELER, ERoles.ORGANIZER])
    @Get(':id')
    async getPaymentById(@Param('id', ParseUUIDPipe) id: UUID): Promise<PaymentEntity> {
        return this.paymentService.getPaymentById(id);
    }

    @Roles([ERoles.ADMIN, ERoles.ORGANIZER])
    @Patch(':id/status')
    async updatePaymentStatus(
        @Param('id', ParseUUIDPipe) id: UUID,
        @Body('status') status: PAYMENT_STATUS
    ): Promise<PaymentEntity> {
        return this.paymentService.updatePaymentStatus(id, status);
    }

    @Roles([ERoles.ADMIN])
    @Delete(':id')
    async deletePayment(@Param('id', ParseUUIDPipe) id: UUID): Promise<DeleteResult> {
        return this.paymentService.deletePayment(id);
    }

    @Roles([ERoles.ADMIN, ERoles.ORGANIZER])
    @Patch(':id/complete')
    async completePayment(@Param('id', ParseUUIDPipe) id: UUID): Promise<PaymentEntity> {
        return this.paymentService.completePayment(id);
    }

}
