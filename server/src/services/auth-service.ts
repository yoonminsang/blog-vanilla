import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import User from 'entity/user';
import AuthRepository from 'repositories/auth-repository';
import errorGenerator from 'error/error-generator';
import { IGetUser, ICreateUser } from 'types/auth';

class AuthService {
  async getUser({ id }: IGetUser): Promise<User | undefined> {
    const user = await getCustomRepository(AuthRepository).getUser({ id });
    return user;
  }

  async registerUser({ email, nickname, password }: ICreateUser) {
    const existEmail = await getCustomRepository(AuthRepository).checkEmail({ email });
    if (existEmail) {
      throw errorGenerator({
        code: 400,
        message: 'duplicate email',
      });
    }

    const existNickname = await getCustomRepository(AuthRepository).checkNickname({ nickname });
    if (existNickname) {
      throw errorGenerator({
        code: 400,
        message: 'duplicate nickname',
      });
    }

    const hashSaltRound = Number(process.env.HASH_SALT_ROUND);
    const hash = await bcrypt.hash(password, hashSaltRound);
    const userId = await getCustomRepository(AuthRepository).createUser({ email, nickname, password: hash });
    return userId;
  }
}

export default AuthService;
