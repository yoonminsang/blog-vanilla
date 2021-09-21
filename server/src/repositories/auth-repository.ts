import { EntityRepository, Repository } from 'typeorm';
import User from 'entity/user';
import { IUserEmail, IUserNickname, IUserSignup } from 'types/auth';

@EntityRepository(User)
class AuthRepository extends Repository<User> {
  async checkEmail({ email }: IUserEmail) {
    const user = await this.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
    return !!user;
  }

  async checkNickname({ nickname }: IUserNickname) {
    const user = await this.createQueryBuilder('user').where('user.nickname = :nickname', { nickname }).getOne();
    return !!user;
  }

  async createUser({ email, nickname, password }: IUserSignup) {
    const user = await this.createQueryBuilder().insert().into(User).values({ email, nickname, password }).execute();
    return user.identifiers[0].id;
  }

  getUserByEmail({ email }: IUserEmail) {
    return this.createQueryBuilder('user')
      .select(['user.id', 'user.nickname', 'user.password'])
      .where('user.email = :email', { email })
      .getOne();
  }
}

export default AuthRepository;
