import { EntityRepository, Repository } from 'typeorm';
import Post from 'entity/post';

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  async createPost(title: string, content: string, userId: string) {
    const post = await this.createQueryBuilder().insert().into(Post).values({ title, content, user: userId }).execute();
    return post.identifiers[0].id;
  }
}

export default PostRepository;
