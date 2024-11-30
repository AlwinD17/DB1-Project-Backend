import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { PAYMENT_METHOD } from "../../common/enums";
import { UUID } from "crypto";

export class CreatePaymentDTO{
    @IsNotEmpty()
    @IsNumber()
    readonly amount: number

    @IsNotEmpty()
    @IsEnum(PAYMENT_METHOD)
    readonly payment_method: PAYMENT_METHOD

    @IsNotEmpty()
    @IsUUID('4')
    readonly booking_id: UUID
}