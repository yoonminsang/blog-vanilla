import App from '@/app';
import ERROR_JOI_MESSAGE from '@/constants/error-joi-message.ts';
import supertest from 'supertest';
import testConnection from './test-connection';

const { app } = new App();
const request = supertest(app);
const agent = supertest.agent(app);

describe('auth', () => {
  beforeAll(async () => {
    await testConnection.create();
  });

  afterAll(async () => {
    await testConnection.close();
  });

  beforeEach(async () => {
    await testConnection.clear();
  });

  describe('basic test', () => {
    test('createPost success', async () => {
      const signupData = {
        email: 'email@naver.com',
        nickname: 'nickname',
        password: 'qwer1234!Q',
      };
      const signupRes = await agent.post('/api/auth/signup').send(signupData);
      const { accessToken } = signupRes.body;

      const createPostData = {
        title: 'title',
        content: 'content',
      };
      const res = await agent.post('/api/post').set('Authorization', `Bearer ${accessToken}`).send(createPostData);

      expect(res.status).toBe(200);
      expect(res.body.postId).not.toBeNaN();
    });
  });
});
