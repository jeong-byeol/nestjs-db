import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../common/db/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOne(options): Promise<User | undefined> {
    // Todo: findOne은 어떤 조건이 들어올지 몰라도 where절에 options를 통해 데이터를 조회해야 합니다.

    const user = await this.userRepository.findOne({ where: options });
    return user ?? undefined;
  }

  findAll(): Promise<User[]> {
    // Todo: findAll은 전체 데이터를 조회해야 합니다.
    return this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Todo: create은 유저 데이터를 생성해야 합니다.
    /*
      create: 엔티티 관련한 인스턴스를 만드는 메서드
      save: 그 엔티티를 DB에 저장하는 메서드
    */

    const newUser = this.userRepository.create({ ...createUserDto });

    return this.userRepository.save(newUser);
  }

  countAll(): Promise<number> {
    // Todo: countAll은 전체 데이터의 개수를 조회해야 합니다.
    return this.userRepository.count();
  }

  async existsByUserId(userId: string): Promise<boolean> {
    // Todo: existsByUserId은 userId로 유저의 정보가 있는지 확인해야 합니다. 리턴은 boolean으로 해주세요.

    // 방법 1 (Count)
    // const count = await this.userRepository.count({
    //   where: { userId: userId },
    // });

    // return count > 0;

    // 방법 2 (Exists)
    return await this.userRepository.exists({ where: { userId } });
  }

  async update(
    userId: string,
    updateUserDto: Partial<CreateUserDto>
  ): Promise<User> {
    // Todo: update은 userId로 유저의 정보를 수정해야 합니다.

    // 방법 1(Merge)
    // const user = await this.userRepository.findOne({ where: { userId } });
    // if (!user) {
    //   throw new Error('User not found');
    // }

    // const updatedUser = this.userRepository.merge(user, updateUserDto);
    // return this.userRepository.save(updatedUser);

    // 방법 2(Update)
    const oldUser = await this.findOne({ where: { userId } });
    if (!oldUser) {
      throw new Error('User not found');
    }

    // 이 부분이 중요!
    await this.userRepository.update(oldUser.id, {
      email: updateUserDto.email,
    });

    const updatedUser = await this.findOne({
      userId,
    });
    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }

  async delete(userId: string): Promise<void> {
    // Todo: delete은 userId로 유저의 정보를 삭제해야 합니다.

    await this.userRepository.delete({ userId });
  }
}
