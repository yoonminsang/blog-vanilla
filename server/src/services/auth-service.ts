import { getCustomRepository } from 'typeorm';
import User from 'entity/user';
import AuthRepository from 'repositories/auth-repository';
import errorGenerator from 'error/error-generator';
import { IUserLogin, IUserSignup } from 'types/auth';
import { comparePassword, hashPassword } from 'utils/crypto';
import { AUTH_ERROR_MESSAGE } from 'constants/error-message';
import { createToken } from 'utils/jwt';

class AuthService {
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
    const id: string = await getCustomRepository(AuthRepository).createUser({
      email,
      nickname,
      password: hash,
    });

    const accessToken = createToken('access', { id, nickname });
    const refreshToken = createToken('refresh', { id, nickname });

    return { accessToken, refreshToken };
  }

  async login({ email, password }: IUserLogin) {
    const user = (await getCustomRepository(AuthRepository).getUserByEmail({ email })) as User;
    if (!user) {
      throw errorGenerator({
        code: 409,
        message: AUTH_ERROR_MESSAGE.notFoundEmail,
      });
    }
    const { id, nickname, password: dbPassword } = user;

    const compare = await comparePassword({ reqPassword: password, dbPassword });
    if (!compare) {
      throw errorGenerator({
        code: 409,
        message: AUTH_ERROR_MESSAGE.notFoundPassword,
      });
    }

    const accessToken = createToken('access', { id, nickname });
    const refreshToken = createToken('refresh', { id, nickname });
    return { nickname, accessToken, refreshToken };
  }
}

export default AuthService;
