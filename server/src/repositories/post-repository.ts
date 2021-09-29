import { EntityRepository, Repository } from 'typeorm';
import Post from 'entity/post';

const LIMIT = 10;

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  async createPost(title: string, content: string, userId: string): Promise<number> {
    const post = await this.createQueryBuilder().insert().into(Post).values({ title, content, userId }).execute();
    return post.identifiers[0].id;
  }

  async readPost(id: number) {
    const post = await this.createQueryBuilder('post')
      .select(['post.id', 'post.title', 'post.content', 'post.createdAt', 'post.updatedAt', 'user.nickname'])
      .innerJoin('post.user', 'user')
      .where('post.id = :id', { id })
      .getOne();
    return post;
  }

  async readPostList(lastId: number) {
    const post = await this.createQueryBuilder('post')
      .select(['post.id', 'post.title', 'post.content', 'post.createdAt', 'user.nickname'])
      .take(LIMIT)
      .innerJoin('post.user', 'user')
      .where('post.id < :id', { id: lastId })
      .orderBy('post.id', 'DESC')
      .getMany();
    return post;
  }
}

export default PostRepository;
