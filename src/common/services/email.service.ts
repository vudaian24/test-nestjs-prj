import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(name: string) {
    await this.mailerService.sendMail({
      to: 'vudaian12a7@gmail.com',
      subject: 'Welcome!',
      template: './welcome',
      context: {
        name,
      },
    })
  }

  async sendPlainTextEmail(to: string, subject: string, content: string) {
    await this.mailerService.sendMail({
      to,
      subject,
      text: content,
    })
  }
}
