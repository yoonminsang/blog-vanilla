import { NextFunction, Request, Response } from 'express';
import PostService from 'services/post-service';

const service = new PostService();

class PostController {
  async createPost(req: Request, res: Response, next: NextFunction) {
    const { title, content } = req.body;
    try {
      const postId = await service.createPost(title, content, req.user.id);
      res.status(200).json({ postId });
    } catch (err) {
      next(err);
    }
  }
}

export default PostController;
