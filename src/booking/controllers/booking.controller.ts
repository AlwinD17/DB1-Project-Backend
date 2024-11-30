import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { UUID } from 'crypto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { UpdateResult } from 'typeorm';
import { BookingsFiltersDTO } from '../dtos/bookings-filters.dto';
import { CreateBookingDTO } from '../dtos/create-booking.dto';
import { BookingEntity } from '../entities/booking.entity';
import { BookingService } from '../services/booking.service';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ERoles } from '../../config/roles.enum';
import { PublicAccess } from '../../auth/decorators/public.decorator';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Roles([ERoles.ADMIN, ERoles.TRAVELER])
  @Post()
  async createBooking(@Body() body: CreateBookingDTO): Promise<BookingEntity> {
    return this.bookingService.createBooking(body);
  }

  @Roles([ERoles.ADMIN])
  @Get()
  async getAllBookings(
    @Query() options: IPaginationOptions,
    @Query() filters: BookingsFiltersDTO,
  ): Promise<Pagination<BookingEntity>> {
    return this.bookingService.getAllBookings(options, filters);
  }

  @PublicAccess()
  @Get(':id')
  async getBookingById(@Param('id', ParseUUIDPipe) id: UUID): Promise<BookingEntity> {
    return this.bookingService.getBookingById(id);
  }

  @Roles([ERoles.ADMIN, ERoles.TRAVELER])
  @Get('traveler/:traveler_id')
  async getBookingsByTraveler(
    @Param('traveler_id', ParseUUIDPipe) traveler_id: UUID,
    @Query() options: IPaginationOptions,
    @Query() filters: BookingsFiltersDTO,
  ): Promise<Pagination<BookingEntity>> {
    return this.bookingService.getBookingsByTraveler(traveler_id, options, filters);
  }

  @Roles([ERoles.ADMIN, ERoles.ORGANIZER])
  @Get('experience/:experience_id')
  async getBookingsByExperience(
    @Param('experience_id', ParseUUIDPipe) experience_id: UUID,
    @Query() options: IPaginationOptions,
    @Query() filters: BookingsFiltersDTO,
  ): Promise<Pagination<BookingEntity>> {
    return this.bookingService.getBookingsByExperience(experience_id, options, filters);
  }

  @PublicAccess()
  @Patch(':id/confirm')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmBooking(@Param('id', ParseUUIDPipe) id: UUID): Promise<UpdateResult> {
    return await this.bookingService.confirmBooking(id);
  }


  @PublicAccess()
  @Patch(':id/complete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async completeBooking(@Param('id', ParseUUIDPipe) id: UUID): Promise<UpdateResult> {
    return await this.bookingService.completeBooking(id);
  }


  @PublicAccess()
  @Patch(':id/cancel')
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancelBooking(@Param('id', ParseUUIDPipe) id: UUID): Promise<UpdateResult> {
    return await this.bookingService.cancelBooking(id);
  }
}
