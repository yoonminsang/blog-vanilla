import App from '@/app';
// import ERROR_JOI_MESSAGE from '@/constants/error-joi-message.ts';
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

  test('readPost', async () => {
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
    const createRes = await agent.post('/api/post').set('Authorization', `Bearer ${accessToken}`).send(createPostData);
    const { postId } = createRes.body;

    const res = await request.get(`/api/post/${postId}`);

    expect(res.body.post).toMatchObject(createPostData);
    expect(res.status).toBe(200);
  });

  test('readPostList', async () => {
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
    await agent.post('/api/post').set('Authorization', `Bearer ${accessToken}`).send(createPostData);

    const res = await request.get(`/api/post`);
    expect(res.body.postList[0]).toMatchObject(createPostData);
    expect(res.status).toBe(200);
  });

  test('updatePostList', async () => {
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
    const createRes = await agent.post('/api/post').set('Authorization', `Bearer ${accessToken}`).send(createPostData);
    const { postId } = createRes.body;

    const res = await agent
      .put(`/api/post/${postId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createPostData);
    expect(res.body.postId).not.toBeNaN();
    expect(res.status).toBe(200);
  });

  test('deletePostList', async () => {
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
    const createRes = await agent.post('/api/post').set('Authorization', `Bearer ${accessToken}`).send(createPostData);
    const { postId } = createRes.body;

    const res = await agent.delete(`/api/post/${postId}`).set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
  });
});
