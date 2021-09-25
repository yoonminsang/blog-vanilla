import { Request, Response } from 'express';
import CustomError from 'error/custom-error';
import errorProcess from 'error/error-process';
import PostService from 'services/post-service';
import errorPost from 'error/error-handler/error-post';

// TODO : 클래스 인스턴스 바인딩하기!!
const service = new PostService();

class PostController {
  async createPost(req: Request, res: Response) {
    const { title, content } = req.body;
    try {
      const postId = await service.createPost(title, content, req.user.id);
      res.status(200).json({ postId });
    } catch (err) {
      errorProcess(res, err as CustomError, errorPost);
    }
  }
}

export default PostController;
