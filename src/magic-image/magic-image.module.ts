import { Module } from '@nestjs/common';
import { MagicImageController } from './magic-image.controller';
import { MagicImageService } from './magic-image.service';
import { AuthModule } from 'src/auth/auth.module';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [MagicImageController],
  providers: [MagicImageService],
  imports: [AuthModule, DbModule],
})
export class MagicImageModule {}
