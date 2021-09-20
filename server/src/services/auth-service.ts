import { getCustomRepository } from 'typeorm';
import User from 'entity/user';
import AuthRepository from 'repositories/auth-repository';
import errorGenerator from 'error/error-generator';
import { IUserId, IUserLogin, IUserSignup } from 'types/auth';
import { comparePassword, hashPassword } from 'utils/crypto';

class AuthService {
  async getUserById({ id }: IUserId): Promise<User | undefined> {
    const user = await getCustomRepository(AuthRepository).getUserById({ id });
    if (!user) {
      throw errorGenerator({
        code: 409,
        message: 'not found user',
      });
    }
    return user;
  }

  async signup({ email, nickname, password }: IUserSignup) {
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

    const hash: string = await hashPassword({ password });
    const userId = await getCustomRepository(AuthRepository).createUser({ email, nickname, password: hash });
    return userId;
  }

  async login({ email, password }: IUserLogin) {
    const user = await getCustomRepository(AuthRepository).getUserByEmail({ email });
    if (!user) {
      throw errorGenerator({
        code: 409,
        message: 'not found email',
      });
    }
    const compare = await comparePassword({ reqPassword: password, dbPassword: user.password });
    if (!compare) {
      throw errorGenerator({
        code: 409,
        message: 'not found password',
      });
    }
    return user;
  }
}

export default AuthService;
