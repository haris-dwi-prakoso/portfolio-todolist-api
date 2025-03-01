import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private users: typeof User
  ) { }
  async create(createUserDto: CreateUserDto) {
    let insertData = { ...createUserDto };
    let hashedPass = await bcrypt.hash(insertData.password, 10);
    insertData.password = hashedPass;
    const result = await this.users.create(insertData);
    return result;
  }

  async findAll() {
    return await this.users.findAll();
  }

  async findOne(id: number) {
    return await this.users.findOne({
      where: {
        id: id
      }
    });
  }

  async findByUsername(username: string) {
    return await this.users.findOne({
      where: {
        username: username
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.users.findOne({
      where: {
        id: id
      }
    });
    if (!user) throw new NotFoundException();
    else return await user.update(updateUserDto);
  }

  async remove(id: number) {
    let user = await this.users.findOne({
      where: {
        id: id
      }
    });
    if (!user) throw new NotFoundException();
    else return await user.update(
      { isActive: false }
    );
  }
}
