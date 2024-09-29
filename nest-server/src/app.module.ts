import { BullModule } from '@nestjs/bull';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import Joi from 'joi';
import { join } from 'path';

import { AwardModule } from './modules/apis/award/award.module';
import { CommentModule } from './modules/apis/comment/comment.module';
import { RoomModule } from './modules/apis/room/room.module';
import { TaskModule } from './modules/apis/task/task.module';
import { TaskTypeModule } from './modules/apis/task-type/task-type.module';
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
      validationSchema: Joi.object<IEnvironmentVariables>({
        NODE_ENV: Joi.string().required().valid('development', 'production'),
        CLIENT_URL: Joi.string().required().uri(),
        NEST_SERVER_PORT: Joi.number().port().required(),
        DATABASE_URL: Joi.string().required(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        RESET_PASSWORD_TOKEN_SECRET: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().port().required(),
        REDIS_PASSWORD: Joi.string().required(),
        MAIL_HOST: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        MAIL_PORT: Joi.number().port().required(),
        MAIL_USER: Joi.string().required().email(),
        CLOUDINARY_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required(),
        FIREBASE_PROJECT_ID: Joi.string().required(),
        FIREBASE_PRIVATE_KEY: Joi.string().required(),
        FIREBASE_CLIENT_EMAIL: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
        GITHUB_CLIENT_ID: Joi.string().required(),
        GITHUB_CLIENT_SECRET: Joi.string().required()
      })
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
