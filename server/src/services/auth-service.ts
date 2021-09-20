import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import User from 'entity/user';
import AuthRepository from 'repositories/auth-repository';
import errorGenerator from 'error/error-generator';
import { IUserId, IUserSignup } from 'types/auth';

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

    const hashSaltRound = Number(process.env.HASH_SALT_ROUND);
    const hash = await bcrypt.hash(password, hashSaltRound);
    const userId = await getCustomRepository(AuthRepository).createUser({ email, nickname, password: hash });
    return userId;
  }
}

export default AuthService;
