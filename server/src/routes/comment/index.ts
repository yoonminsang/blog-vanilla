import { Router } from 'express';
import isLoggedInMiddleware from 'middlewares/isLoggedInMiddleware';
import CommentController from 'controllers/comment-controller';
import createCommentValidation from 'validation/comment/create-comment-validation';

const commentRouter = Router();

const commentController = new CommentController();

commentRouter.post('/', isLoggedInMiddleware, createCommentValidation, commentController.createComment);

export default commentRouter;
