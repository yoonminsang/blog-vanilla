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
        code: 400,
        message: POST_ERROR_MESSAGE.notFoundUserId,
        from: FROM,
      });
    }
    const postId = await getCustomRepository(PostRepository).createPost(title, content, userId);
    return postId;
  }
}

export default PostService;
