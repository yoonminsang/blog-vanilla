import { EntityRepository, Repository } from 'typeorm';
import User from 'entity/user';
import { ICheckEmail, ICheckNickname, IGetUser, ICreateUser } from 'types/auth';

@EntityRepository(User)
class AuthRepository extends Repository<User> {
  getUser({ id }: IGetUser) {
    return this.createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.nickname'])
      .where('user.id = :id', { id })
      .getOne();
  }

  async checkEmail({ email }: ICheckEmail) {
    const user = await this.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
    return !!user;
  }

  async checkNickname({ nickname }: ICheckNickname) {
    const user = await this.createQueryBuilder('user').where('user.nickname = :nickname', { nickname }).getOne();
    return !!user;
  }

  async createUser({ email, nickname, password }: ICreateUser) {
    const user = await this.createQueryBuilder().insert().into(User).values({ email, nickname, password }).execute();
    return user.identifiers[0].id;
  }
}

export default AuthRepository;
