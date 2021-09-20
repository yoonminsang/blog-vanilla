import { EntityRepository, Repository } from 'typeorm';
import User from 'entity/user';
import { IUserEmail, IUserId, IUserNickname, IUserSignup } from 'types/auth';

@EntityRepository(User)
class AuthRepository extends Repository<User> {
  getUserById({ id }: IUserId) {
    return this.createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.nickname'])
      .where('user.id = :id', { id })
      .getOne();
  }

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
      .select(['user.id', 'user.email', 'user.nickname'])
      .where('user.email = :email', { email })
      .getOne();
  }
}

export default AuthRepository;
