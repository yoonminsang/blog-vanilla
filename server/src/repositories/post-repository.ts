import { EntityRepository, Repository } from 'typeorm';
import Post from 'entity/post';

interface IPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  nickname: string;
  isUpdated: string | boolean;
}

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  async createPost(title: string, content: string, userId: string): Promise<number> {
    const post = await this.createQueryBuilder().insert().into(Post).values({ title, content, userId }).execute();
    return post.identifiers[0].id;
  }

  async readPost(id: number): Promise<IPost> {
    const post = await this.createQueryBuilder('post')
      .select([
        'post.id as id',
        'post.title as title',
        'post.content as content',
        'post.createdAt as createdAt',
        'user.nickname as nickname',
      ])
      .addSelect('CASE WHEN post.createdAt != post.updatedAt THEN 1 ELSE 0 END', 'isUpdated')
      .innerJoin('post.user', 'user')
      .where('post.id = :id', { id })
      .getRawOne();
    return post;
  }
}

export default PostRepository;
