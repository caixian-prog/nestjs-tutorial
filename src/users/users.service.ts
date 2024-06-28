import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(
    username: string,
    password: string,
    role: string = 'user',
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      role: role,
    });
    return this.usersRepository.save(user);
  }
}
