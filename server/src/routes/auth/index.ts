import { Router } from 'express';
import AuthController from '@/controllers/auth-controller';
import signupValidation from '@/validation/auth/signup-validation';
import loginValidation from '@/validation/auth/login-validation';

const authRouter = Router();

const authController = new AuthController();

authRouter.get('/', authController.checkUser);
authRouter.post('/signup', signupValidation, authController.signup);
authRouter.post('/login', loginValidation, authController.login);
authRouter.delete('/', authController.logout);

export default authRouter;
