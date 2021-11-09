import { getRepository } from 'typeorm';
import User from '@/entity/user';
import { hashPassword } from '@/utils/crypto';

const userSeed = async () => {
  const hash: string = await hashPassword('qwer1234!Q');
  const userData = [
    {
      id: '44278ea9-5796-40a8-a1e4-f12eddbea271',
      email: 'test@naver.com',
      password: hash,
      nickname: '1번 계정',
    },
    {
      id: '44278ea9-5796-41a8-a1e4-f12eddbea271',
      email: 'test2@naver.com',
      password: hash,
      nickname: '2번계정',
    },
  ];
  await getRepository(User).save(userData);
};

export default userSeed;
