import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDTO {
  @IsNotEmpty()
  @IsString()
  readonly tag: string;
}