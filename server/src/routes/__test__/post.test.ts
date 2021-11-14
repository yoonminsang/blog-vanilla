import App from '@/app';
import ERROR_JOI_MESSAGE from '@/constants/error-joi-message.ts';
import { MIDDLEWARE_ERROR_MESSAGE, POST_ERROR_MESSAGE } from '@/constants/error-message';
import supertest from 'supertest';
import testConnection from './test-connection';

const { app } = new App();
const request = supertest(app);
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
  test('create post success', async () => {
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

  test('read post success', async () => {
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

  test('read postList success', async () => {
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

  test('update post success', async () => {
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

    const updatePostdata = {
      title: 'title modify',
      content: 'content modify',
    };
    const updateRes = await agent
      .put(`/api/post/${postId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatePostdata);
    expect(updateRes.body.postId).not.toBeNaN();
    expect(updateRes.status).toBe(200);

    const res = await request.get(`/api/post/${postId}`);

    expect(res.body.post).toMatchObject(updatePostdata);
    expect(res.status).toBe(200);
  });

  test('delete post success', async () => {
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

describe('service test', () => {
  test('not exist post', async () => {
    const res = await request.get(`/api/post/1`);
    expect(res.status).toBe(400);
    expect(res.body.errorMessage).toBe(POST_ERROR_MESSAGE.notFoundPostId[1]);
  });

  test('not exist postList', async () => {
    const res = await request.get(`/api/post`);
    expect(res.status).toBe(400);
    expect(res.body.errorMessage).toBe(POST_ERROR_MESSAGE.notFoundPostId[1]);
  });

  test('different user id from update post', async () => {
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

    const signupData2 = {
      email: 'email2@naver.com',
      nickname: 'nickname2',
      password: 'qwer1234!Q',
    };
    const signupRes2 = await agent.post('/api/auth/signup').send(signupData2);
    const { accessToken: accessToken2 } = signupRes2.body;

    const modifyPostData = {
      title: 'title modify',
      content: 'content modify',
    };
    const res = await agent
      .put(`/api/post/${postId}`)
      .set('Authorization', `Bearer ${accessToken2}`)
      .send(modifyPostData);
    expect(res.status).toBe(403);
    expect(res.body.errorMessage).toBe(POST_ERROR_MESSAGE.diffrentUserId[1]);
  });

  test('different user id from delete post', async () => {
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

    const signupData2 = {
      email: 'email2@naver.com',
      nickname: 'nickname2',
      password: 'qwer1234!Q',
    };
    const signupRes2 = await agent.post('/api/auth/signup').send(signupData2);
    const { accessToken: accessToken2 } = signupRes2.body;

    const res = await agent.delete(`/api/post/${postId}`).set('Authorization', `Bearer ${accessToken2}`);
    expect(res.status).toBe(403);
    expect(res.body.errorMessage).toBe(POST_ERROR_MESSAGE.diffrentUserId[1]);
  });
});

describe('auth middleware fail', () => {
  test('create post logged fail', async () => {
    const createPostData = {
      title: 'title',
      content: 'content',
    };
    const res = await request.post('/api/post').send(createPostData);

    expect(res.status).toBe(403);
    expect(res.body.errorMessage).toBe(MIDDLEWARE_ERROR_MESSAGE.needLogin[1]);
  });

  test('update post logged fail', async () => {
    const updatePostdata = {
      title: 'title modify',
      content: 'content modify',
    };
    const res = await request.put(`/api/post/1`).send(updatePostdata);
    expect(res.status).toBe(403);
    expect(res.body.errorMessage).toBe(MIDDLEWARE_ERROR_MESSAGE.needLogin[1]);
  });

  test('delete post logged fail', async () => {
    const res = await request.delete(`/api/post/1`);
    expect(res.status).toBe(403);
    expect(res.body.errorMessage).toBe(MIDDLEWARE_ERROR_MESSAGE.needLogin[1]);
  });
});

describe('auth validation fail', () => {
  describe('create post validation fail', () => {
    test('create post title max length fail', async () => {
      const signupData = {
        email: 'email@naver.com',
        nickname: 'nickname',
        password: 'qwer1234!Q',
      };
      const signupRes = await agent.post('/api/auth/signup').send(signupData);
      const { accessToken } = signupRes.body;

      const createPostData = {
        title:
          'titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle',
        content: 'content',
      };
      const res = await agent.post('/api/post').set('Authorization', `Bearer ${accessToken}`).send(createPostData);

      expect(res.status).toBe(400);
      expect(res.body.errorMessage).toBe(ERROR_JOI_MESSAGE.exceedMaxLengthTitle);
    });

    test('create post title fill fail', async () => {
      const signupData = {
        email: 'email@naver.com',
        nickname: 'nickname',
        password: 'qwer1234!Q',
      };
      const signupRes = await agent.post('/api/auth/signup').send(signupData);
      const { accessToken } = signupRes.body;

      const createPostData = {
        title: '',
        content: 'content',
      };
      const res = await agent.post('/api/post').set('Authorization', `Bearer ${accessToken}`).send(createPostData);

      expect(res.status).toBe(400);
      expect(res.body.errorMessage).toBe(ERROR_JOI_MESSAGE.fillTitle);
    });
  });

  describe('read post validation fail', () => {
    test('read post id fail', async () => {
      const res1 = await request.get(`/api/post/1.1`);
      expect(res1.status).toBe(400);
      const res2 = await request.get(`/api/post/a`);
      expect(res2.status).toBe(400);
    });
  });
  // TODO: 단윝테스트로 테스하면되는데 굳이 일일히 통합테스트 실패 경우를 해봐야될까??
});
