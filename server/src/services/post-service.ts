import { getCustomRepository } from 'typeorm';
import errorGenerator from 'error/error-generator';
import { POST_ERROR_MESSAGE } from 'constants/error-message';
import PostRepository from 'repositories/post-repository';
import UserRepository from 'repositories/user-repository';

const FROM = 'post';

class PostService {
  async createPost(title: string, content: string, userId: string) {
    const existId = await getCustomRepository(UserRepository).checkId(userId);
    if (!existId) {
      throw errorGenerator({
        status: 400,
        message: POST_ERROR_MESSAGE.notFoundUserId,
        from: FROM,
      });
    }
    const postId = await getCustomRepository(PostRepository).createPost(title, content, userId);
    return postId;
  }

  async readPost(id: number) {
    const postData = await getCustomRepository(PostRepository).readPost(id);
    if (!postData) {
      throw errorGenerator({
        status: 400,
        message: POST_ERROR_MESSAGE.notFoundPostId,
        from: FROM,
      });
    }
    const isUpdated = postData.createdAt !== postData.updatedAt;
    const post = { ...postData, isUpdated };
    return post;
  }

  async readPostList(lastId: number) {
    const postList = await getCustomRepository(PostRepository).readPostList(lastId);
    if (!postList) {
      throw errorGenerator({
        status: 400,
        message: POST_ERROR_MESSAGE.notFoundPostId,
        from: FROM,
      });
    }
    return postList;
  }
}

export default PostService;
