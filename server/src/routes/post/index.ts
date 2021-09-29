import { Router } from 'express';
import PostController from 'controllers/post-controller';
import createPostValidation from 'validation/post/create-post-validation';
import isLoggedInMiddleware from 'middlewares/isLoggedInMiddleware';
import readPostValidation from 'validation/post/read-post-validation';
import readPostListValidation from 'validation/post/read-post-list-validation';

const postRouter = Router();

const postController = new PostController();

postRouter.post('/', isLoggedInMiddleware, createPostValidation, postController.createPost);
postRouter.get('/:id', readPostValidation, postController.readPost);
postRouter.get('/', readPostListValidation, postController.readPostList);

export default postRouter;
