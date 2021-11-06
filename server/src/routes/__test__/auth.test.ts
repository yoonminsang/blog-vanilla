import App from '@/app';
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

  test('signup success', async () => {
    const signupData = {
      email: 'email@naver.com',
      nickname: 'nickname',
      password: '12341234',
    };
    const res = await request.post('/api/auth/signup').send(signupData);
    expect(res.status).toBe(201);
  });

  test('login success', async () => {
    const signupData = {
      email: 'email@naver.com',
      nickname: 'nickname',
      password: '12341234',
    };
    await request.post('/api/auth/signup').send(signupData);

    const loginData = { email: 'email@naver.com', password: '12341234' };
    const res = await request.post('/api/auth/login').send(loginData);
    expect(res.status).toBe(200);
  });

  test('logout success', async () => {
    const res = await request.delete('/api/auth');
    expect(res.status).toBe(200);
  });

  test('checkUser null', async () => {
    const res = await request.get('/api/auth');
    expect(res.body).toEqual({ user: null });
    expect(res.status).toBe(200);
  });

  test('checkUser success', async () => {
    const signupData = {
      email: 'email@naver.com',
      nickname: 'nickname',
      password: '12341234',
    };
    const signupRes = await request.post('/api/auth/signup').send(signupData);
    const refreskToken = signupRes.headers['set-cookie'][0].split(';')[0].split('=')[1];
    const { accessToken } = signupRes.body;
    const checkUserRes = await request
      .get('/api/auth')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Cookie', [`refreshtoken=${refreskToken}`]);
    expect(checkUserRes.body.user.nickname).toBe(signupData.nickname);
    expect(checkUserRes.status).toBe(200);
  });

  test('checkUser success agent version', async () => {
    const signupData = {
      email: 'email@naver.com',
      nickname: 'nickname',
      password: '12341234',
    };
    const signupRes = await agent.post('/api/auth/signup').send(signupData);
    const { accessToken } = signupRes.body;
    const checkUserRes = await agent.get('/api/auth').set('Authorization', `Bearer ${accessToken}`);
    expect(checkUserRes.body.user.nickname).toBe(signupData.nickname);
    expect(checkUserRes.status).toBe(200);
  });

  describe('signup fail', () => {
    test('signup email fail', async () => {
      const signupData = {
        email: 'email',
        nickname: 'nickname',
        password: '12341234',
      };
      const res = await request.post('/api/auth/signup').send(signupData);
      expect(res.status).toBe(400);
    });

    test('signup email max length fail', async () => {
      const signupData = {
        email: 'emailemailemailemailemailemailemailemailemailemailemailemailemailemailemail@naver.com',
        nickname: 'nickname',
        password: '12341234',
      };
      const res = await request.post('/api/auth/signup').send(signupData);
      expect(res.status).toBe(400);
    });

    test('signup nickname min length fail', async () => {
      const signupData = {
        email: 'email@naver.com',
        nickname: 'a',
        password: '12341234',
      };
      const res = await request.post('/api/auth/signup').send(signupData);
      expect(res.status).toBe(400);
    });

    test('signup nickname max length fail', async () => {
      const signupData = {
        email: 'email@naver.com',
        nickname: 'nicknamenicknamenicknamenicknamenicknamenicknamenicknamenicknamenickname',
        password: '12341234',
      };
      const res = await request.post('/api/auth/signup').send(signupData);
      expect(res.status).toBe(400);
    });

    test('signup password min length fail', async () => {
      const signupData = {
        email: 'email@naver.com',
        nickname: 'nickname',
        password: '1',
      };
      const res = await request.post('/api/auth/signup').send(signupData);
      expect(res.status).toBe(400);
    });

    test('signup password max length fail', async () => {
      const signupData = {
        email: 'email@naver.com',
        nickname: 'nickname',
        password: '1234123412341234123412341234123412341234123412341234123412341234',
      };
      const res = await request.post('/api/auth/signup').send(signupData);
      expect(res.status).toBe(400);
    });
  });
});
