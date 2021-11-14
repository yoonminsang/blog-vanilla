import App from '@/app';
// import ERROR_JOI_MESSAGE from '@/constants/error-joi-message.ts';
// import { MIDDLEWARE_ERROR_MESSAGE, POST_ERROR_MESSAGE } from '@/constants/error-message';
import supertest from 'supertest';
import testConnection from './test-connection';

const { app } = new App();
// const request = supertest(app);
const agent = supertest.agent(app);

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
  test('create comment success', async () => {
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
    const createPostRes = await agent
      .post('/api/post')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createPostData);
    const { postId } = createPostRes.body;

    const createCommentData = {
      content: 'content',
      postId,
    };
    const res = await agent.post('/api/comment').set('Authorization', `Bearer ${accessToken}`).send(createCommentData);
    expect(res.status).toBe(200);
  });

  test('read last comment list success', async () => {
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
    const createPostRes = await agent
      .post('/api/post')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createPostData);
    const { postId } = createPostRes.body;

    const createCommentData = {
      content: 'content',
      postId,
    };
    await agent.post('/api/comment').set('Authorization', `Bearer ${accessToken}`).send(createCommentData);

    // const res = await request.get(`/api/comment/last?postId=${postId}`);
    const res = await agent.get(`/api/comment/last?postId=${postId}`);
    expect(res.status).toBe(200);
    expect(res.body.commentList[0]).toMatchObject({ content: 'content' });
  });

  test('read commnet success', async () => {
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
    const createPostRes = await agent
      .post('/api/post')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createPostData);
    const { postId } = createPostRes.body;

    const createCommentData = {
      content: 'content',
      postId,
    };
    await agent.post('/api/comment').set('Authorization', `Bearer ${accessToken}`).send(createCommentData);

    // const readLastCommentRes = await request.get(`/api/comment/last?postId=${postId}`);
    const readLastCommentRes = await agent.get(`/api/comment/last?postId=${postId}`);
    const { id } = readLastCommentRes.body.commentList[0];

    // const res = await request.get(`/api/comment/${id}`);
    const res = await agent.get(`/api/comment/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.comment).toMatchObject({ id });
  });

  test('read comment list success', async () => {
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
    const createPostRes = await agent
      .post('/api/post')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createPostData);
    const { postId } = createPostRes.body;

    const createCommentData = {
      content: 'content',
      postId,
    };
    await agent.post('/api/comment').set('Authorization', `Bearer ${accessToken}`).send(createCommentData);

    // const res = await request.get(`/api/comment?postId=${postId}&pageId=1`);
    const res = await agent.get(`/api/comment?postId=${postId}&pageId=1`);
    expect(res.status).toBe(200);
    expect(res.body.commentList[0]).toMatchObject({ content: 'content' });
  });

  test('update comment success', async () => {
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
    const createPostRes = await agent
      .post('/api/post')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createPostData);
    const { postId } = createPostRes.body;

    const createCommentData = {
      content: 'content',
      postId,
    };
    await agent.post('/api/comment').set('Authorization', `Bearer ${accessToken}`).send(createCommentData);

    const readLastCommentRes = await agent.get(`/api/comment/last?postId=${postId}`);
    const { id } = readLastCommentRes.body.commentList[0];

    const updateCommnetData = {
      content: 'update',
    };
    const updateCommentRes = await agent
      .put(`/api/comment/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateCommnetData);
    expect(updateCommentRes.status).toBe(200);

    // const res = await request.get(`/api/comment/last?postId=${postId}`);
    const res = await agent.get(`/api/comment/last?postId=${postId}`);
    expect(res.status).toBe(200);
    expect(res.body.commentList[0]).toMatchObject({ isUpdated: true, ...updateCommnetData });
  });

  test('delete comment success', async () => {
    // TODO
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
    const createPostRes = await agent
      .post('/api/post')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createPostData);
    const { postId } = createPostRes.body;

    const createCommentData = {
      content: 'content',
      postId,
    };
    await agent.post('/api/comment').set('Authorization', `Bearer ${accessToken}`).send(createCommentData);

    const readLastCommentRes = await agent.get(`/api/comment/last?postId=${postId}`);
    const { id } = readLastCommentRes.body.commentList[0];

    const res = await agent.delete(`/api/comment/${id}`).set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
  });

  // TODO: 서비스, JOI
});
