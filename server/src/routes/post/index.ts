import { Router } from 'express';
import PostController from 'controllers/post-controller';
import createPostValidation from 'validation/post/create-post-validation';
import isLoggedInMiddleware from 'middlewares/isLoggedInMiddleware';
import readPostListValidation from 'validation/post/read-post-list-validation';
import idParamsValidation from 'validation/common/id-params-validation';

const postRouter = Router();

const postController = new PostController();

postRouter.post('/', isLoggedInMiddleware, createPostValidation, postController.createPost);
postRouter.get('/:id', idParamsValidation, postController.readPost);
postRouter.get('/', readPostListValidation, postController.readPostList);
postRouter.put('/:id', isLoggedInMiddleware, idParamsValidation, createPostValidation, postController.updatePost);
postRouter.delete('/:id', isLoggedInMiddleware, idParamsValidation, postController.deletePosst);

export default postRouter;
