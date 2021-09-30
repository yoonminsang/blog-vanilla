import { Router } from 'express';
import isLoggedInMiddleware from 'middlewares/isLoggedInMiddleware';
import CommentController from 'controllers/comment-controller';
import createCommentValidation from 'validation/comment/create-comment-validation';
import idParamsValidation from 'validation/common/id-params-validation';
import readCommentListValidation from 'validation/comment/read-comment-list-validation';

const commentRouter = Router();

const commentController = new CommentController();

commentRouter.post('/', isLoggedInMiddleware, createCommentValidation, commentController.createComment);
commentRouter.get('/:id', idParamsValidation, commentController.readComment);
commentRouter.get('/', readCommentListValidation, commentController.readCommentList);

export default commentRouter;
