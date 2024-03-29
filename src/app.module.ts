import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MagicImageModule } from './magic-image/magic-image.module';

@Module({
  imports: [
    //rate-limit
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    AuthModule,
    MagicImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  // providers: [AppService, { useClass: ThrottlerGuard, provide: APP_GUARD }],
})
export class AppModule {}
