import { getCustomRepository } from 'typeorm';
import User from 'entity/user';
import AuthRepository from 'repositories/auth-repository';
import errorGenerator from 'error/error-generator';
import { IUserId, IUserLogin, IUserSignup } from 'types/auth';
import { comparePassword, hashPassword } from 'utils/crypto';
import { AUTH_ERROR_MESSAGE } from 'constants/error-message';

class AuthService {
  async getUserById({ id }: IUserId): Promise<User | undefined> {
    const user = await getCustomRepository(AuthRepository).getUserById({ id });
    if (!user) {
      throw errorGenerator({
        code: 409,
        message: AUTH_ERROR_MESSAGE.notFoundUser,
      });
    }
    return user;
  }

  async signup({ email, nickname, password }: IUserSignup) {
    const existEmail = await getCustomRepository(AuthRepository).checkEmail({ email });
    if (existEmail) {
      throw errorGenerator({
        code: 400,
        message: AUTH_ERROR_MESSAGE.duplicateEmail,
      });
    }

    const existNickname = await getCustomRepository(AuthRepository).checkNickname({ nickname });
    if (existNickname) {
      throw errorGenerator({
        code: 400,
        message: AUTH_ERROR_MESSAGE.duplicateNickname,
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
        message: AUTH_ERROR_MESSAGE.notFoundEmail,
      });
    }
    const compare = await comparePassword({ reqPassword: password, dbPassword: user.password });
    if (!compare) {
      throw errorGenerator({
        code: 409,
        message: AUTH_ERROR_MESSAGE.notFoundPassword,
      });
    }
    return user;
  }
}

export default AuthService;
