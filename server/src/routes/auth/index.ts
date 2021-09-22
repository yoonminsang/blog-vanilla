import { Router } from 'express';
import AuthController from 'controllers/auth-controller';
import { authValidation } from 'validation/auth-validation';
import jwtMiddleware from 'middlewares/jwtMiddleware';

const authRouter = Router();

const authController = new AuthController();

authRouter.get('/', jwtMiddleware, authController.checkUser);
authRouter.post('/signup', authValidation, authController.signup);
authRouter.post('/login', authController.login);

export default authRouter;
