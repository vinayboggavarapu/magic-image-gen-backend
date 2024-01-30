import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ImageGenInputDto {
  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  prompt: string;
}
