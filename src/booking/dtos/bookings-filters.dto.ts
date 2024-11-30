import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { BOOKING_STATUS } from "../../common/enums";

export class BookingsFiltersDTO {
    
    @IsOptional()
    @IsEnum(BOOKING_STATUS)
    status?: BOOKING_STATUS;
  
    @IsOptional()
    @IsNumber()
    minPrice?: number;
  
    @IsOptional()
    @IsNumber()
    maxPrice?: number;
  

  
}