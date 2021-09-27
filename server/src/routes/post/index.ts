import { Router } from 'express';
import PostController from 'controllers/post-controller';
import createPostValidation from 'validation/post/create-post-validation';
import isLoggedInMiddleware from 'middlewares/isLoggedInMiddleware';
import readPostValidation from 'validation/post/read-post-validation';

const postRouter = Router();

const postController = new PostController();

postRouter.post('/', isLoggedInMiddleware, createPostValidation, postController.createPost);
postRouter.get('/:id', readPostValidation, postController.readPost);

export default postRouter;
