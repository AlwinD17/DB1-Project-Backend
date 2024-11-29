import { IsEnum, IsNotEmpty, IsUrl, IsUUID } from 'class-validator';
import { SOCIAL_MEDIA } from '../../common/enums/social-media.enum';
import { UUID } from 'crypto';


export class CreateLinkDto {

  @IsNotEmpty()
  @IsUUID()
  organizer: UUID

  @IsUrl()
  @IsNotEmpty()
  link: string;

  @IsEnum(SOCIAL_MEDIA)
  @IsNotEmpty()
  social_media: SOCIAL_MEDIA;
}