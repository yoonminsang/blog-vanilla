import { getCustomRepository } from 'typeorm';
import User from 'entity/user';
import AuthRepository from 'repositories/auth-repository';
import errorGenerator from 'error/error-generator';
import { ICheckUser, ICreateUser } from 'types/auth';

class AuthService {
  async checkUser({ id }: ICheckUser): Promise<User | undefined> {
    const user = await getCustomRepository(AuthRepository).checkUser({ id });
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

    // TODO : 비밀번호 암호화

    const userId = await getCustomRepository(AuthRepository).createUser({ email, nickname, password });
    return userId;
  }
}

export default AuthService;
