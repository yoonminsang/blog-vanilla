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

  async readComment(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const comment = await service.readComent(+id);
      res.status(200).json({ comment });
    } catch (err) {
      next(err);
    }
  }

  async readCommentList(req: Request, res: Response, next: NextFunction) {
    const postId = req.query.postId as string;
    const pageId = req.query.pageId as string;
    try {
      const commentList = await service.readCommentList(+postId, +pageId);
      res.status(200).json({ commentList });
    } catch (err) {
      next(err);
    }
  }
}

export default CommentController;
