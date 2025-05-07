import * as Joi from 'joi'

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(5000),

  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.string().required(),
  MAIL_USER: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
  MAIL_FROM: Joi.string().required(),

  MONGODB_DATABASE: Joi.string().required(),
  MONGODB_URI: Joi.string().required(),
})
