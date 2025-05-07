import { join } from 'path'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { LoggerModule } from 'nestjs-pino'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EmailService } from './common/services/email.service'
import { configValidationSchema } from './config'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            singleLine: true,
            // ignore: 'req.headers.cookie,req.headers.content-security-policy,res.headers.content-security-policy',
            ignore: 'req.headers, res.headers',
            messageFormat: '{req.method}{req.url}{msg}',
          },
        },
      },
    }),
    ConfigModule.forRoot({ isGlobal: true, validationSchema: configValidationSchema }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DATABASE'),
      }),
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST'),
          port: config.get<number>('MAIL_PORT'),
          secure: config.get<number>('MAIL_PORT') === 465,
          auth: {
            user: config.get<string>('MAIL_USER'),
            pass: config.get<string>('MAIL_PASSWORD'),
          },
          tls: {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true,
          },
        },
        defaults: {
          from: config.get<string>('MAIL_FROM'),
        },
        template: {
          dir: join(__dirname, 'src/email-templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
