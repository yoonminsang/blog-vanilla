import errorAuth from 'error/controllers/error-auth';
import CustomError from 'error/custom-error';
import errorProcess from 'error/error-process';
import { Request, Response } from 'express';
import AuthService from 'services/auth-service';

// TODO : 클래스 인스턴스 바인딩하기!!
const service = new AuthService();

class AuthController {
  async getUser(req: Request, res: Response) {
    try {
      // TODO : 로그인할때 수정
      const id = '2994f573-8e9b-427b-93f3-f3dee1e0fbce';
      const user = (await service.getUser({ id })) || null;
      res.status(200).json({ user });
    } catch (err) {
      errorProcess(res, err as CustomError, errorAuth);
    }
  }

  async registerUser(req: Request, res: Response) {
    try {
      const { email, nickname, password } = req.body;
      const userId = await service.registerUser({ email, nickname, password });
      res.status(200).json({ userId });
    } catch (err) {
      errorProcess(res, err as CustomError, errorAuth);
    }
  }
}

export default AuthController;
