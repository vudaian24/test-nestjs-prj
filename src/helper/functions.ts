import { Types, isValidObjectId } from 'mongoose'

export function toObjectId(value: any, fallbackValue: any = undefined) {
  try {
    if (value instanceof Types.ObjectId) {
      return value
    }
    if (isValidObjectId(value)) {
      return new Types.ObjectId(String(value))
    }
    return fallbackValue
  } catch (error) {
    console.error(error)
    return fallbackValue
  }
}
