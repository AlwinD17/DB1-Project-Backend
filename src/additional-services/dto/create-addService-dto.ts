import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { AdditionalServiceType } from "../../common/enums";

export class CreateAdditionalServiceDTO{
    
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    readonly price: number

    @IsNotEmpty()
    @IsEnum(AdditionalServiceType)
    readonly type: AdditionalServiceType;
}