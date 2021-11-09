import dbConfig from '@/config/db-config';
import logger from '@/config/logger';
import User from '@/entity/user';
import commentSeed from '@/seeds/comment.seed';
import postSeed from '@/seeds/post.seed';
import userSeed from '@/seeds/user.seed';
import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';

const dbLoader = async (): Promise<void> => {
  try {
    await createConnection(dbConfig());
    const userRepository = getRepository(User);
    const user = await userRepository.findOne();
    if (process.env.NODE_ENV !== 'test' && !user) {
      console.time('data seed');
      await userSeed();
      await postSeed();
      await commentSeed();
      console.timeEnd('data seed');
    }
  } catch (err) {
    logger.error('db connection error \n', err);
  }
};

export default dbLoader;
