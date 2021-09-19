import { Router } from 'express';
import AuthController from 'controllers/auth-controller';
import { authValidation } from 'validation/auth-validation';

const authRouter = Router();

const authController = new AuthController();

authRouter.get('/', authController.checkUser);
authRouter.post('/', authValidation, authController.registerUser);

export default authRouter;
