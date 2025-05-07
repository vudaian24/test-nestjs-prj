import { Controller, Get } from '@nestjs/common'

import { AppService } from './app.service'
import { EmailService } from './common/services/email.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('send-email')
  async sendEmail() {
    return this.emailService.sendWelcomeEmail('Vu Dai An')
  }
}
