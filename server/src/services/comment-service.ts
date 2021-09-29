import { getCustomRepository } from 'typeorm';
import CommentRepository from 'repositories/comment-repository';
import PostRepository from 'repositories/post-repository';
import { COMMENT_ERROR_MESSAGE } from 'constants/error-message';
import errorGenerator from 'error/error-generator';

const FROM = 'comment';

class CommentService {
  async createComment(content: string, postId: number, userId: string) {
    const existPost = getCustomRepository(PostRepository).checkPost(postId);
    if (!existPost) {
      throw errorGenerator({
        status: 400,
        message: COMMENT_ERROR_MESSAGE.notFoundPostId,
        from: FROM,
      });
    }
    await getCustomRepository(CommentRepository).createComment(content, postId, userId);
  }
}

export default CommentService;
