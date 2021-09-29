import { EntityRepository, Repository } from 'typeorm';
import Comment from 'entity/comment';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {
  async createComment(content: string, postId: number, userId: string): Promise<void> {
    await this.createQueryBuilder().insert().into(Comment).values({ content, postId, userId }).execute();
  }
}

export default CommentRepository;
