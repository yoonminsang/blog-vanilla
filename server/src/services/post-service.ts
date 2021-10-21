import { getCustomRepository } from 'typeorm';
import errorGenerator from 'error/error-generator';
import { POST_ERROR_MESSAGE } from 'constants/error-message';
import PostRepository from 'repositories/post-repository';
import { sliceText } from 'utils/query';

const FROM = 'post';

class PostService {
  async createPost(title: string, content: string, userId: string) {
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

  async readPostList() {
    const postList = await getCustomRepository(PostRepository).readPostList();
    if (!postList) {
      throw errorGenerator({
        status: 400,
        message: POST_ERROR_MESSAGE.notFoundPostId,
        from: FROM,
      });
    }
    return postList.map(post => sliceText(post, 'content', 200));
  }

  async readPostListByLastId(lastId: number) {
    const postList = await getCustomRepository(PostRepository).readPostListByLastId(lastId);
    if (!postList) {
      throw errorGenerator({
        status: 400,
        message: POST_ERROR_MESSAGE.notFoundPostId,
        from: FROM,
      });
    }
    return postList.map(post => sliceText(post, 'content', 200));
  }

  async updatePost(id: number, title: string, content: string, userId: string) {
    const post = await getCustomRepository(PostRepository).getPostForUserId(id);
    if (!post) {
      throw errorGenerator({
        status: 400,
        message: POST_ERROR_MESSAGE.notFoundPostId,
        from: FROM,
      });
    }
    if (post.userId !== userId) {
      throw errorGenerator({
        status: 403,
        message: POST_ERROR_MESSAGE.diffrentUserId,
        from: FROM,
      });
    }
    await getCustomRepository(PostRepository).updatePost(id, title, content);
  }

  async deletePost(id: number, userId: string) {
    const post = await getCustomRepository(PostRepository).getPostForUserId(id);
    if (!post) {
      throw errorGenerator({
        status: 400,
        message: POST_ERROR_MESSAGE.notFoundPostId,
        from: FROM,
      });
    }
    if (post.userId !== userId) {
      throw errorGenerator({
        status: 403,
        message: POST_ERROR_MESSAGE.diffrentUserId,
        from: FROM,
      });
    }
    await getCustomRepository(PostRepository).deletePost(id);
  }
}

export default PostService;
