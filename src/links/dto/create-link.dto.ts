import { IsEnum, IsNotEmpty, IsUrl } from 'class-validator';
import { SOCIAL_MEDIA } from '../../common/enums/social-media.enum';


export class CreateLinkDto {
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @IsEnum(SOCIAL_MEDIA)
  @IsNotEmpty()
  social_media: SOCIAL_MEDIA;
}