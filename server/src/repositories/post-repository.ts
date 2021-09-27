import { EntityRepository, Repository } from 'typeorm';
import Post from 'entity/post';

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  async createPost(title: string, content: string, userId: string) {
    const post = await this.createQueryBuilder().insert().into(Post).values({ title, content, userId }).execute();
    return post.identifiers[0].id;
  }

  async readPost(id: number) {
    const post = await this.createQueryBuilder('post')
      .select(['post.id', 'user.nickname'])
      .innerJoin('post.user', 'user')
      .where('post.id = :id', { id })
      .getOne();
    return post;
  }
}

export default PostRepository;
