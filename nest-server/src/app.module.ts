import { BullModule } from '@nestjs/bull';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

import { AwardModule } from './modules/apis/award/award.module';
import { CommentModule } from './modules/apis/comment/comment.module';
import { RoomModule } from './modules/apis/room/room.module';
import { TaskModule } from './modules/apis/task/task.module';
import { TaskTypeModule } from './modules/apis/task-type/task-type.module';
import EnvironmentVariablesValidationSchema from 'src/common/configs/env.config';
import { AllExceptionsFilter } from 'src/common/filters/all-exception.filter';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AppClassSerializerInterceptor } from 'src/common/interceptors/app-class-serializer.interceptor';
import { AppValidationPipe } from 'src/common/pipes/app-validation.pipe';
import { IEnvironmentVariables } from 'src/common/types/env.type';
import { AuthModule } from 'src/modules/apis/auth/auth.module';
import { UserModule } from 'src/modules/apis/user/user.module';
import { FirebaseModule } from 'src/modules/libs/firebase/firebase.module';
import { TokenModule } from 'src/modules/libs/token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: EnvironmentVariablesValidationSchema
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IEnvironmentVariables>) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD')
          }
        },
        defaults: {
          from: `"Task Management System" <no-reply@google.com>`
        },
        template: {
          dir: join(__dirname, 'common/assets/mail-templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService]
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IEnvironmentVariables>) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD')
        }
      }),
      inject: [ConfigService]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'common/assets/static'),
      serveRoot: '/public/static'
    }),
    FirebaseModule,
    TokenModule,
    UserModule,
    AuthModule,
    RoomModule,
    TaskTypeModule,
    TaskModule,
    CommentModule,
    AwardModule
  ],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_PIPE, useClass: AppValidationPipe },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_INTERCEPTOR, useClass: AppClassSerializerInterceptor },
    Logger
  ]
})
export class AppModule {}
