import { NextFunction, Request, Response } from 'express';
import CommentService from 'services/comment-service';

interface IComment {
  content: string;
  postId: string;
}

const service = new CommentService();

class CommentController {
  async createComment(req: Request, res: Response, next: NextFunction) {
    const { content, postId } = req.body as IComment;
    try {
      await service.createComment(content, +postId, req.user.id);
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }
}

export default CommentController;
