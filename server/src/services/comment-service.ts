import { getCustomRepository } from 'typeorm';
import CommentRepository from '@/repositories/comment-repository';
import PostRepository from '@/repositories/post-repository';
import { COMMENT_ERROR_MESSAGE } from '@/constants/error-message';
import errorGenerator from '@/error/error-generator';
import { LIMIT } from '@/constants/repository';

const FROM = 'comment';

class CommentService {
  async createComment(content: string, postId: number, userId: string) {
    const existPost = await getCustomRepository(PostRepository).checkPost(postId);
    if (!existPost) {
      throw errorGenerator({
        status: 400,
        message: COMMENT_ERROR_MESSAGE.notFoundPostId[0],
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
        message: COMMENT_ERROR_MESSAGE.notFoundCommentId[0],
        from: FROM,
      });
    }
    const isUpdated = JSON.stringify(commentData.createdAt) !== JSON.stringify(commentData.updatedAt);
    const comment = { ...commentData, isUpdated };
    return comment;
  }

  async readCommentList(postId: number, pageId: number) {
    const count = await getCustomRepository(CommentRepository).getCommentCount(postId);
    const lastPageId = Math.ceil(count / LIMIT.comment);
    const commentListData = await getCustomRepository(CommentRepository).readCommentList(postId, pageId);
    if (!commentListData) {
      throw errorGenerator({
        status: 400,
        message: COMMENT_ERROR_MESSAGE.notFoundCommentList[0],
        from: FROM,
      });
    }
    const commentList = commentListData.map(comment => {
      const isUpdated = JSON.stringify(comment.createdAt) !== JSON.stringify(comment.updatedAt);
      return { ...comment, isUpdated };
    });
    return { commentList, lastPageId, count };
  }

  async readLastCommentList(postId: number) {
    const count = await getCustomRepository(CommentRepository).getCommentCount(postId);
    const lastPageId = count === 0 ? 1 : Math.ceil(count / LIMIT.comment);
    const commentListData = await getCustomRepository(CommentRepository).readCommentList(postId, lastPageId);
    if (!commentListData) {
      throw errorGenerator({
        status: 400,
        message: COMMENT_ERROR_MESSAGE.notFoundCommentList[0],
        from: FROM,
      });
    }
    const commentList = commentListData.map(comment => {
      const isUpdated = JSON.stringify(comment.createdAt) !== JSON.stringify(comment.updatedAt);
      return { ...comment, isUpdated };
    });
    return { commentList, lastPageId, count };
  }

  async updateComment(id: number, content: string, userId: string) {
    const comment = await getCustomRepository(CommentRepository).getCommentForUserId(id);
    if (!comment) {
      throw errorGenerator({
        status: 400,
        message: COMMENT_ERROR_MESSAGE.notFoundCommentId[0],
        from: FROM,
      });
    }

    if (comment.userId !== userId) {
      throw errorGenerator({
        status: 403,
        message: COMMENT_ERROR_MESSAGE.diffrentUserId[0],
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
        message: COMMENT_ERROR_MESSAGE.notFoundCommentId[0],
        from: FROM,
      });
    }
    if (comment.userId !== userId) {
      throw errorGenerator({
        status: 403,
        message: COMMENT_ERROR_MESSAGE.diffrentUserId[0],
        from: FROM,
      });
    }
    await getCustomRepository(CommentRepository).deleteComment(id);
  }
}

export default CommentService;
