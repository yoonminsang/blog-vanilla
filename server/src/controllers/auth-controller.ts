import { NextFunction, Request, Response } from 'express';
import AuthService from '@/services/auth-service';
import { refreshTokenCookieOptions } from '@/constants';

const service = new AuthService();
const REFRESHTOKEN = 'refreshtoken';

class AuthController {
  async checkUser(req: Request, res: Response) {
    const user = req.user || null;
    res.status(200).json({ user });
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, nickname, password } = req.body;
      const { accessToken, refreshToken } = await service.signup(email, nickname, password);
      res.cookie(REFRESHTOKEN, refreshToken, refreshTokenCookieOptions);
      res.status(201).json({ accessToken });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await service.login(email, password);
      res.cookie(REFRESHTOKEN, refreshToken, refreshTokenCookieOptions);
      res.status(200).json({ accessToken });
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
