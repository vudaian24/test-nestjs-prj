import { Injectable } from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user = { ...createUserDto }
    return `This action adds a new user with data: ${JSON.stringify(user)}`
  }

  findAll() {
    return `This action returns all user`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = { ...updateUserDto, id }
    return `This action updates a #${id} user with data: ${JSON.stringify(updatedUser)}`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
