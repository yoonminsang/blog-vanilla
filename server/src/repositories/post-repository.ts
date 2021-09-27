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
      .select(['post.id', 'post.title', 'post.content', 'post.createdAt', 'user.nickname'])
      .addSelect('CASE WHEN `post`.`created_at` = `post`.`updated_at` THEN 1 ELSE 0 END', 'isUpdated')
      .innerJoin('post.user', 'user')
      .where('post.id = :id', { id })
      .getRawOne();
    // .getOne();
    return post;
  }
}

export default PostRepository;
