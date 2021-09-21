import { Router } from 'express';
import AuthController from 'controllers/auth-controller';
import { authValidation } from 'validation/auth-validation';

const authRouter = Router();

const authController = new AuthController();

authRouter.get('/', authController.autoLogin);
authRouter.post('/signup', authValidation, authController.signup);
authRouter.post('/login', authController.login);

export default authRouter;
