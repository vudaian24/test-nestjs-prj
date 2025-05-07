import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger } from 'nestjs-pino'

import { AppModule } from './app.module'

const PORT = parseInt(process.env.PORT || '4000', 10)

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    rawBody: true,
    bufferLogs: true,
  })

  app.useLogger(app.get(Logger))

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .addGlobalParameters({
      name: 'accept-language',
      in: 'header',
      description: 'locale language',
      required: false,
      schema: {
        type: 'string',
        enum: ['en', 'ja', 'vi'],
        default: 'en',
      },
    })
    .build()

  if (process.env.SWAGGER_DISABLED !== 'true') {
    const document = SwaggerModule.createDocument(app, options)
    document.tags = [
      { name: 'Debug', description: 'Debug APIs' },
      ...(document.tags ? document.tags.filter((tag) => tag.name !== 'Debug') : []),
    ]

    SwaggerModule.setup('swagger', app, document)
  }
  await app.listen(PORT, '0.0.0.0', () => {
    console.info(`🚀 BE running at port ${PORT}`)
  })
}
bootstrap()
