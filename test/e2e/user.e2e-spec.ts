import { type NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { AppModule } from '../../src/app.module'

describe('UserController (e2e)', () => {
  let testApp: NestFastifyApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    testApp = moduleFixture.createNestApplication<NestFastifyApplication>()
    await testApp.init()
  })

  afterAll(async () => {
    await testApp.close()
  })

  it('/ (GET)', () => {
    return request(testApp.getHttpServer()).get('/').expect(200).expect('Hello World!')
  })
})
