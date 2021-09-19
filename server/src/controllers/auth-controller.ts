import CustomError from 'error/custom-error';
import errorHandler from 'error/error-handler';
import { Request, Response } from 'express';
import AuthService from 'services/auth-service';

// TODO : 클래스 인스턴스 바인딩하기!!
const service = new AuthService();

class AuthController {
  async checkUser(req: Request, res: Response) {
    try {
      // TODO : 로그인할때 수정
      const id = '2994f573-8e9b-427b-93f3-f3dee1e0fbce';
      const user = await service.checkUser({ id });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      const { status, errorMessage } = errorHandler(err as CustomError);
      res.status(status).json({ errorMessage });
    }
  }

  async registerUser(req: Request, res: Response) {
    try {
      const { email, nickname, password } = req.body;
      const userId = await service.registerUser({ email, nickname, password });
      res.status(200).json({ userId });
    } catch (err) {
      console.log(err);
      const { status, errorMessage } = errorHandler(err as CustomError);
      res.status(status).json({ errorMessage });
    }
  }
}

export default AuthController;
