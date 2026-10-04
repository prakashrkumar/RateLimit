import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { APP_GUARD } from '@nestjs/core';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'default',
          ttl: 60000,
          limit: 3,
        },
      ],
      errorMessage: 'Too many requests, please try again later.',
    }),
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_GUARD,
    useClass:ThrottlerGuard
  }],
})
export class AppModule {}
