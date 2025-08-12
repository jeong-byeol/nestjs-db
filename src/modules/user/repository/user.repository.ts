import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // db에 접근하여 데이터를 조회, 생성, 수정, 삭제하는 객체
import { User } from '../../../common/db/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOne(options): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: options });
    return user || undefined;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async countAll(): Promise<number> {
    return await this.userRepository.count();
  }

  async existsByUserId(userId: string): Promise<boolean> {
    const count = await this.userRepository.count({ where: { userId } });
    return count > 0;
  }

  async update(
    userId: string,
    updateUserDto: Partial<CreateUserDto>
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new Error('User not found');
    }
    
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async delete(userId: string): Promise<void> {// userId에 해당하는 전체 행(row)을 삭제
    await this.userRepository.delete({ userId });
  }
}
