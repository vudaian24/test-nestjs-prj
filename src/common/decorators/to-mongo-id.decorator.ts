import { Transform } from 'class-transformer'
import { isMongoId, registerDecorator, ValidationOptions } from 'class-validator'
import { Types } from 'mongoose'

import { toObjectId } from '@/src/helper/functions'

export function ToMongoId(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol) {
    // Transform to ObjectId
    Transform(({ value }) => {
      if (Types.ObjectId.isValid(value)) {
        return toObjectId(value)
      }
      return value
    })(target, propertyKey)

    // Register Validator
    registerDecorator({
      name: 'ToMongoId',
      target: target.constructor,
      propertyName: propertyKey as string,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value instanceof Types.ObjectId || isMongoId(value)
        },
        defaultMessage() {
          return 'Invalid MongoDB ObjectId'
        },
      },
    })
  }
}
