import errorAuth from 'error/controllers/error-auth';
import CustomError from 'error/custom-error';
import errorProcess from 'error/error-process';
import { Request, Response } from 'express';
import AuthService from 'services/auth-service';
import { getAccessToken, getRefreshToken } from 'utils/jwt';

// TODO : 클래스 인스턴스 바인딩하기!!
const service = new AuthService();

class AuthController {
  async autoLogin(req: Request, res: Response) {
    try {
      const accessToken = getAccessToken(req.headers.authorization);
      const refreshToken = getRefreshToken(req.cookies);
      const { newAccessToken, newRefreshToken, nickname } = await service.autoLogin({ accessToken, refreshToken });

      if (newRefreshToken) {
        res.cookie('refreshtoken', refreshToken, { httpOnly: true });
      }

      res.status(200).json({ nickname, accessToken: newAccessToken });
    } catch (err) {
      errorProcess(res, err as CustomError, errorAuth);
    }
  }

  async signup(req: Request, res: Response) {
    try {
      const { email, nickname, password } = req.body;
      const { accessToken, refreshToken } = await service.signup({ email, nickname, password });
      res.cookie('refreshtoken', refreshToken, { httpOnly: true });
      res.status(201).json({ nickname, accessToken });
    } catch (err) {
      errorProcess(res, err as CustomError, errorAuth);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { nickname, accessToken, refreshToken } = await service.login({ email, password });
      res.cookie('refreshtoken', refreshToken, { httpOnly: true });
      res.status(200).json({ nickname, accessToken });
    } catch (err) {
      errorProcess(res, err as CustomError, errorAuth);
    }
  }
}

export default AuthController;
