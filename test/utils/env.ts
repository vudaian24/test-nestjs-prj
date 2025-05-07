import 'dotenv/config'

export const setCommonTestEnvironmentVariables = () => {
  process.env.MAIL_HOST = 'email-smtp.ap-southeast-1.amazonaws.com'
  process.env.MAIL_PORT = '587'
  process.env.MAIL_USER = 'AKIAQWHCQBRWJHXH4A6I'
  process.env.MAIL_PASSWORD = 'BAxVjo0CQa6vOs09ROmGzzI3FhGFZ0KREUo9vecBotIT'
  process.env.MAIL_FROM = 'vudaian12a7@gmail.com'
}
