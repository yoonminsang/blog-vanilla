import errorAuth from 'error/controllers/error-auth';
import CustomError from 'error/custom-error';
import errorProcess from 'error/error-process';
import { Request, Response } from 'express';
import AuthService from 'services/auth-service';

// TODO : 클래스 인스턴스 바인딩하기!!
const service = new AuthService();

class AuthController {
  async checkUser(req: Request, res: Response) {
    try {
      const user = req.user || null;
      res.status(200).json({ user });
    } catch (err) {
      errorProcess(res, err as CustomError, errorAuth);
    }
  }

  async signup(req: Request, res: Response) {
    try {
      const { email, nickname, password } = req.body;
      const { accessToken, refreshToken } = await service.signup(email, nickname, password);
      res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7일
      });
      res.status(201).json({ nickname, accessToken });
    } catch (err) {
      errorProcess(res, err as CustomError, errorAuth);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { nickname, accessToken, refreshToken } = await service.login(email, password);
      res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7일
      });
      res.status(200).json({ nickname, accessToken });
    } catch (err) {
      errorProcess(res, err as CustomError, errorAuth);
    }
  }
}

export default AuthController;
