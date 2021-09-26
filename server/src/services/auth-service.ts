import { getCustomRepository } from 'typeorm';
import UserRepository from 'repositories/user-repository';
import errorGenerator from 'error/error-generator';
import { comparePassword, hashPassword } from 'utils/crypto';
import { AUTH_ERROR_MESSAGE } from 'constants/error-message';
import { createToken } from 'utils/jwt';

const FROM = 'auth';

class AuthService {
  async signup(email: string, nickname: string, password: string) {
    const existEmail = await getCustomRepository(UserRepository).checkEmail(email);
    if (existEmail) {
      throw errorGenerator({
        status: 400,
        message: AUTH_ERROR_MESSAGE.duplicateEmail,
        from: FROM,
      });
    }

    const existNickname = await getCustomRepository(UserRepository).checkNickname(nickname);
    if (existNickname) {
      throw errorGenerator({
        status: 400,
        message: AUTH_ERROR_MESSAGE.duplicateNickname,
        from: FROM,
      });
    }

    const hash: string = await hashPassword(password);
    const id: string = await getCustomRepository(UserRepository).createUser(email, nickname, hash);

    const accessToken = createToken('access', { id, nickname });
    const refreshToken = createToken('refresh', { id, nickname });

    return { accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await getCustomRepository(UserRepository).getUserByEmail(email);
    if (!user) {
      throw errorGenerator({
        status: 409,
        message: AUTH_ERROR_MESSAGE.notFoundEmail,
        from: FROM,
      });
    }
    const { id, nickname, password: dbPassword } = user;

    const compare = await comparePassword(password, dbPassword);
    if (!compare) {
      throw errorGenerator({
        status: 409,
        message: AUTH_ERROR_MESSAGE.notFoundPassword,
        from: FROM,
      });
    }

    const accessToken = createToken('access', { id, nickname });
    const refreshToken = createToken('refresh', { id, nickname });
    return { nickname, accessToken, refreshToken };
  }
}

export default AuthService;
