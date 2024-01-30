import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MagicImageService } from './magic-image.service';
import { ImageGenInputDto } from './dto/imageGenInput.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('magic-image')
export class MagicImageController {
  constructor(private magicImageService: MagicImageService) {}

  @Post()
  @UseGuards(AuthGuard)
  async generateMagicImage(@Body() imageGenInput: ImageGenInputDto) {
    return this.magicImageService.generateMagicImage(imageGenInput);
  }
}
