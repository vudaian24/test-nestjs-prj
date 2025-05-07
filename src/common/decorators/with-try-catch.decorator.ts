import { HttpException, InternalServerErrorException } from '@nestjs/common'

/**
 * A decorator to automatically handle errors in async functions.
 * - Catches all errors thrown inside the decorated function.
 * - If the error is an instance of HttpException (e.g., BadRequestException, NotFoundException), it is rethrown as is.
 * - Otherwise, wraps the error in an InternalServerErrorException with additional context.
 */
export function WithTryCatch(): MethodDecorator {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      try {
        // Execute the original method and return its result
        return await originalMethod.apply(this, args)
      } catch (error) {
        // If the thrown error is already an HttpException, propagate it without modification
        if (error instanceof HttpException) {
          throw error
        }
        // Wrap other errors in an InternalServerErrorException to provide better debugging information
        throw new InternalServerErrorException(`Error in ${propertyKey}: ${error.message}`)
      }
    }

    return descriptor
  }
}
