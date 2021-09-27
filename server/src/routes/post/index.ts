import { Router } from 'express';
import PostController from 'controllers/post-controller';
import postValidation from 'validation/post-validation';
import isLoggedInMiddleware from 'middlewares/isLoggedInMiddleware';
import postReadValidation from 'validation/post/post-read-validation';

const postRouter = Router();

const postController = new PostController();

postRouter.post('/', isLoggedInMiddleware, postValidation, postController.createPost);
postRouter.get('/:id', postReadValidation, postController.readPost);

export default postRouter;
