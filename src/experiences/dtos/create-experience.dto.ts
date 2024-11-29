import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { IsStartDateValid, IsEndDateValid } from "../decorators/validations";
import { UUID } from "crypto";

export class CreateExperienceDTO {

  @IsNotEmpty()
  @IsUUID('4')
  readonly organizer: UUID

  @IsNotEmpty()
  @IsString()
  readonly title: string

  @IsNotEmpty()
  @IsString()
  readonly description: string

  @IsNotEmpty()
  @IsDate()
  @IsStartDateValid({ message: 'La fecha de inicio debe ser posterior a la fecha actual.' })
  readonly start_date: Date;

  @IsNotEmpty()
  @IsDate()
  @IsEndDateValid('start_date', { message: 'La fecha final debe ser posterior a la fecha de inicio.' })
  readonly end_date: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly base_price: number

  @IsNotEmpty()
  @IsNumber()
  readonly profit_margin: number

  @IsNotEmpty()
  @IsString()
  readonly location: string

  @IsNotEmpty()
  @IsArray()
  readonly tags: string[]

}