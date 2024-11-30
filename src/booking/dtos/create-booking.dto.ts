import { IsArray, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class CreateBookingDTO {
    
    @IsNotEmpty()
    @IsUUID('4')
    readonly user_id: UUID

    @IsNotEmpty()
    @IsUUID('4')
    readonly experience_id: UUID

    @IsOptional()
    @IsArray()
    readonly additional_services: UUID[] = []
}