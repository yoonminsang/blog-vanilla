import { getRepository } from 'typeorm';
import Comment from '@/entity/comment';

const commentSeed = async () => {
  const commentData = Array(10)
    .fill(null)
    .map((_, postIndex) =>
      Array(100)
        .fill(null)
        .map((__, commentIndex) => {
          const postNum = postIndex + 991;
          const commentNum = commentIndex + 1;
          const content = `${commentNum}번째 댓글`;
          const postId = postNum;
          const userId =
            commentIndex % 2 === 0 ? '44278ea9-5796-40a8-a1e4-f12eddbea271' : '44278ea9-5796-41a8-a1e4-f12eddbea271';
          return { content, postId, userId };
        }),
    )
    .flat();

  await getRepository(Comment).save(commentData);
};

export default commentSeed;
