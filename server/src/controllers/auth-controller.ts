import { NextFunction, Request, Response } from 'express';
import AuthService from 'services/auth-service';

// TODO : 클래스 인스턴스 바인딩하기!!
const service = new AuthService();
const REFRESHTOKEN = 'refreshtoken';

class AuthController {
  async checkUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user || null;
      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, nickname, password } = req.body;
      const { accessToken, refreshToken } = await service.signup(email, nickname, password);
      res.cookie(REFRESHTOKEN, refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7일
      });
      res.status(201).json({ nickname, accessToken });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { nickname, accessToken, refreshToken } = await service.login(email, password);
      res.cookie(REFRESHTOKEN, refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7일
      });
      res.status(200).json({ nickname, accessToken });
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie(REFRESHTOKEN);
    res.status(200).json();
  }
}

export default AuthController;
