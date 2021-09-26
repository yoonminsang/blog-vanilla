import { Router } from 'express';
import PostController from 'controllers/post-controller';
import postValidation from 'validation/post-validation';
import isLoggedInMiddleware from 'middlewares/isLoggedInMiddleware';

const postRouter = Router();

const postController = new PostController();

postRouter.post('/', isLoggedInMiddleware, postValidation, postController.createPost);

export default postRouter;
