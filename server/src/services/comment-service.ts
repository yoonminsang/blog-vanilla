import { getCustomRepository } from 'typeorm';
import CommentRepository from 'repositories/comment-repository';
import PostRepository from 'repositories/post-repository';
import { COMMENT_ERROR_MESSAGE } from 'constants/error-message';
import errorGenerator from 'error/error-generator';

const FROM = 'comment';

class CommentService {
  async createComment(content: string, postId: number, userId: string) {
    const existPost = await getCustomRepository(PostRepository).checkPost(postId);
    if (!existPost) {
      throw errorGenerator({
        status: 400,
        message: COMMENT_ERROR_MESSAGE.notFoundPostId,
        from: FROM,
      });
    }
    await getCustomRepository(CommentRepository).createComment(content, postId, userId);
  }

  async readComent(id: number) {
    const comment = await getCustomRepository(CommentRepository).readComment(id);
    if (!comment) {
      throw errorGenerator({
        status: 400,
        message: COMMENT_ERROR_MESSAGE.notFoundCommentId,
        from: FROM,
      });
    }
    return comment;
  }

  async readCommentList(postId: number, pageId: number) {
    const commentList = await getCustomRepository(CommentRepository).readCommentList(postId, pageId);
    if (!commentList) {
      throw errorGenerator({
        status: 400,
        message: COMMENT_ERROR_MESSAGE.notFoundCommentList,
        from: FROM,
      });
    }
    return commentList;
  }

  async updateComment(id: number, content: string, userId: string) {
    const comment = await getCustomRepository(CommentRepository).getCommentForUserId(id);
    if (!comment) {
      throw errorGenerator({
        status: 400,
        message: COMMENT_ERROR_MESSAGE.notFoundCommentId,
        from: FROM,
      });
    }
    if (comment.userId !== userId) {
      throw errorGenerator({
        status: 400,
        message: COMMENT_ERROR_MESSAGE.diffrentUserId,
        from: FROM,
      });
    }
    await getCustomRepository(CommentRepository).updateComment(id, content);
  }
}

export default CommentService;
