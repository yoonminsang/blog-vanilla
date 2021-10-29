import { getCustomRepository } from 'typeorm';
import CommentRepository from 'repositories/comment-repository';
import PostRepository from 'repositories/post-repository';
import { COMMENT_ERROR_MESSAGE } from 'constants/error-message';
import errorGenerator from 'error/error-generator';

const FROM = 'comment';
const LIMIT = 50;
// TODO: LIMIT를 서비스,레포 두곳에서 사용??

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
    const commentData = await getCustomRepository(CommentRepository).readComment(id);
    if (!commentData) {
      throw errorGenerator({
        status: 400,
        message: COMMENT_ERROR_MESSAGE.notFoundCommentId,
        from: FROM,
      });
    }
    const isUpdated = String(commentData.createdAt) !== String(commentData.updatedAt);
    const comment = { ...commentData, isUpdated };
    return comment;
  }

  async readCommentList(postId: number, pageId: number) {
    const count = await getCustomRepository(CommentRepository).getCommentCount(postId);
    const lastPageId = Math.ceil(count / LIMIT);
    const commentListData = await getCustomRepository(CommentRepository).readCommentList(postId, pageId);
    if (!commentListData) {
      throw errorGenerator({
        status: 400,
        message: COMMENT_ERROR_MESSAGE.notFoundCommentList,
        from: FROM,
      });
    }
    const commentList = commentListData.map(comment => {
      const isUpdated = String(comment.createdAt) !== String(comment.updatedAt);
      return { ...comment, isUpdated };
    });
    return { commentList, lastPageId, count };
  }

  async readLastCommentList(postId: number) {
    const count = await getCustomRepository(CommentRepository).getCommentCount(postId);
    const lastPageId = count === 0 ? 1 : Math.ceil(count / LIMIT);
    const commentListData = await getCustomRepository(CommentRepository).readCommentList(postId, lastPageId);
    if (!commentListData) {
      throw errorGenerator({
        status: 400,
        message: COMMENT_ERROR_MESSAGE.notFoundCommentList,
        from: FROM,
      });
    }
    const commentList = commentListData.map(comment => {
      const isUpdated = String(comment.createdAt) !== String(comment.updatedAt);
      return { ...comment, isUpdated };
    });
    return { commentList, lastPageId, count };
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
        status: 403,
        message: COMMENT_ERROR_MESSAGE.diffrentUserId,
        from: FROM,
      });
    }
    await getCustomRepository(CommentRepository).updateComment(id, content);
  }

  async deleteComment(id: number, userId: string) {
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
        status: 403,
        message: COMMENT_ERROR_MESSAGE.diffrentUserId,
        from: FROM,
      });
    }
    await getCustomRepository(CommentRepository).deleteComment(id);
  }
}

export default CommentService;
