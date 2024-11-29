import { IsOptional, IsString, IsEnum, IsNumber, Min } from "class-validator";
import { AdditionalServiceType } from "../../common/enums";

export class AdditionalServiceFiltersDTO {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsEnum(AdditionalServiceType)
    type?: AdditionalServiceType;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    minPrice?: number;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    maxPrice?: number;
  }