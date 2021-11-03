import { EntityRepository, Repository } from 'typeorm';
import User from '@/entity/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async checkEmail(email: string): Promise<boolean> {
    const user = await this.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
    return !!user;
  }

  async checkNickname(nickname: string): Promise<boolean> {
    const user = await this.createQueryBuilder('user').where('user.nickname = :nickname', { nickname }).getOne();
    return !!user;
  }

  async createUser(email: string, nickname: string, password: string): Promise<string> {
    const user = await this.createQueryBuilder().insert().into(User).values({ email, nickname, password }).execute();
    return user.identifiers[0].id;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.createQueryBuilder('user')
      .select(['user.id', 'user.nickname', 'user.password'])
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }
}

export default UserRepository;
