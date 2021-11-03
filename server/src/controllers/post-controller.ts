import { NextFunction, Request, Response } from 'express';
import PostService from '@/services/post-service';

interface IPost {
  title: string;
  content: string;
}

const service = new PostService();

class PostController {
  async createPost(req: Request, res: Response, next: NextFunction) {
    const { title, content } = req.body as IPost;
    try {
      const postId = await service.createPost(title, content, req.user.id);
      res.status(200).json({ postId });
    } catch (err) {
      next(err);
    }
  }

  async readPost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const post = await service.readPost(+id);
      res.status(200).json({ post });
    } catch (err) {
      next(err);
    }
  }

  async readPostList(req: Request, res: Response, next: NextFunction) {
    try {
      const lastId = req.query.lastId as string;
      const postList = lastId ? await service.readPostListByLastId(+lastId) : await service.readPostList();
      res.status(200).json({ postList });
    } catch (err) {
      next(err);
    }
  }

  async updatePost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { title, content } = req.body as IPost;
    try {
      await service.updatePost(+id, title, content, req.user.id);
      res.status(200).json({ postId: id });
    } catch (err) {
      next(err);
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await service.deletePost(+id, req.user.id);
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }
}

export default PostController;
