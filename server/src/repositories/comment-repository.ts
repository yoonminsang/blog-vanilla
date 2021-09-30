import { EntityRepository, Repository } from 'typeorm';
import Comment from 'entity/comment';

const LIMIT = 50;

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {
  async createComment(content: string, postId: number, userId: string): Promise<void> {
    await this.createQueryBuilder().insert().into(Comment).values({ content, postId, userId }).execute();
  }

  async readComment(id: number): Promise<Comment | undefined> {
    const comment = await this.createQueryBuilder('comment')
      .select(['comment.id', 'comment.content', 'comment.createdAt', 'comment.updatedAt', 'user.nickname'])
      .innerJoin('comment.user', 'user')
      .where('comment.id = :id', { id })
      .getOne();
    return comment;
  }

  async readCommentList(postId: number, pageId: number): Promise<Comment[] | undefined> {
    const comment = await this.createQueryBuilder('comment')
      .select(['comment.id', 'comment.content', 'comment.createdAt', 'comment.updatedAt', 'user.nickname'])
      .skip((pageId - 1) * LIMIT)
      .take(LIMIT)
      .innerJoin('comment.user', 'user')
      .where('comment.post.id = :postId', { postId })
      .orderBy('comment.id', 'ASC')
      .getMany();
    return comment;
  }

  async getCommentForUserId(id: number): Promise<Comment | undefined> {
    const comment = await this.createQueryBuilder('comment')
      .select(['comment.id', 'comment.user.id'])
      .where('comment.id = :id', { id })
      .getOne();
    return comment;
  }

  async updateComment(id: number, content: string): Promise<void> {
    await this.createQueryBuilder().update(Comment).set({ content }).where('comment.id = :id', { id }).execute();
  }
}

export default CommentRepository;
