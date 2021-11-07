import App from '@/app';
import ERROR_JOI_MESSAGE from '@/constants/error-joi-message.ts';
import { AUTH_ERROR_MESSAGE } from '@/constants/error-message';
import supertest from 'supertest';
import testConnection from './test-connection';

const { app } = new App();
const request = supertest(app);
const agent = supertest.agent(app);

// TODO: 한번할때마다 초기화 하고 다시 해야될까?? 묶어서 VALIDATION 확인을 할 수 있지 않을까?
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
  });

  describe('service test', () => {
    test('signup exist email', async () => {
      const signupData = {
        email: 'email@naver.com',
        nickname: 'nickname',
        password: '12341234',
      };
      await request.post('/api/auth/signup').send(signupData);
      const signupData2 = {
        email: 'email@naver.com',
        nickname: 'nickname2',
        password: '12341234',
      };
      const res = await request.post('/api/auth/signup').send(signupData2);
      expect(res.status).toBe(400);
      expect(res.body.errorMessage).toBe(AUTH_ERROR_MESSAGE.duplicateEmail[1]);
    });

    test('signup exist nickname', async () => {
      const signupData = {
        email: 'email@naver.com',
        nickname: 'nickname',
        password: '12341234',
      };
      await request.post('/api/auth/signup').send(signupData);

      const signupData2 = {
        email: 'email2@naver.com',
        nickname: 'nickname',
        password: '12341234',
      };
      const res = await request.post('/api/auth/signup').send(signupData2);
      expect(res.status).toBe(400);
      expect(res.body.errorMessage).toBe(AUTH_ERROR_MESSAGE.duplicateNickname[1]);
    });

    test('login no exist user', async () => {
      const loginData = {
        email: 'email@naver.com',
        password: '12341234',
      };
      const res = await request.post('/api/auth/login').send(loginData);

      expect(res.status).toBe(409);
      expect(res.body.errorMessage).toBe(AUTH_ERROR_MESSAGE.notFoundEmail[1]);
    });

    test('login password incorrect', async () => {
      const signupData = {
        email: 'email@naver.com',
        nickname: 'nickname',
        password: '12341234',
      };
      await request.post('/api/auth/signup').send(signupData);

      const loginData = {
        email: 'email@naver.com',
        password: '1234123',
      };
      const res = await request.post('/api/auth/login').send(loginData);

      expect(res.status).toBe(409);
      expect(res.body.errorMessage).toBe(AUTH_ERROR_MESSAGE.notCorrectPassword[1]);
    });
  });

  describe('auth validation fail', () => {
    describe('signup validation fail', () => {
      test('signup email fail', async () => {
        const signupData = {
          email: 'email',
          nickname: 'nickname',
          password: '12341234',
        };
        const res = await request.post('/api/auth/signup').send(signupData);
        expect(res.status).toBe(400);
        expect(res.body.errorMessage).toBe(ERROR_JOI_MESSAGE.invalidEmail);
      });

      test('signup email max length fail', async () => {
        const signupData = {
          email: 'emailemailemailemaiilemailemail1231231sdfsdf1e12sdf123@naver.com',
          nickname: 'nickname',
          password: '12341234',
        };
        const res = await request.post('/api/auth/signup').send(signupData);
        expect(res.status).toBe(400);
        expect(res.body.errorMessage).toBe(ERROR_JOI_MESSAGE.exceedMaxLengthEmail);
      });

      test('signup email fill fail', async () => {
        const signupData = {
          email: '',
          nickname: 'nickname',
          password: '12341234',
        };
        const res = await request.post('/api/auth/signup').send(signupData);
        expect(res.status).toBe(400);
        expect(res.body.errorMessage).toBe(ERROR_JOI_MESSAGE.fillEmail);
      });

      test('signup nickname min length fail', async () => {
        const signupData = {
          email: 'email@naver.com',
          nickname: 'a',
          password: '12341234',
        };
        const res = await request.post('/api/auth/signup').send(signupData);
        expect(res.status).toBe(400);
        expect(res.body.errorMessage).toBe(ERROR_JOI_MESSAGE.underMinLengthNickname);
      });

      test('signup nickname max length fail', async () => {
        const signupData = {
          email: 'email@naver.com',
          nickname: 'nicknamenicknamenicknamenicknamenicknamenicknamenicknamenicknamenickname',
          password: '12341234',
        };
        const res = await request.post('/api/auth/signup').send(signupData);
        expect(res.status).toBe(400);
        expect(res.body.errorMessage).toBe(ERROR_JOI_MESSAGE.exceedMaxLengthNickname);
      });

      test('signup nickname fill fail', async () => {
        const signupData = {
          email: 'email@naver.com',
          nickname: '',
          password: '12341234',
        };
        const res = await request.post('/api/auth/signup').send(signupData);
        expect(res.status).toBe(400);
        expect(res.body.errorMessage).toBe(ERROR_JOI_MESSAGE.fillNickname);
      });

      test('signup password min length fail', async () => {
        const signupData = {
          email: 'email@naver.com',
          nickname: 'nickname',
          password: '1',
        };
        const res = await request.post('/api/auth/signup').send(signupData);
        expect(res.status).toBe(400);
        expect(res.body.errorMessage).toBe(ERROR_JOI_MESSAGE.underMinLengthPassword);
      });

      test('signup password max length fail', async () => {
        const signupData = {
          email: 'email@naver.com',
          nickname: 'nickname',
          password: '1234123412341234123412341234123412341234123412341234123412341234',
        };
        const res = await request.post('/api/auth/signup').send(signupData);
        expect(res.status).toBe(400);
        expect(res.body.errorMessage).toBe(ERROR_JOI_MESSAGE.exceedMaxLengthPassword);
      });

      test('signup password fill fail', async () => {
        const signupData = {
          email: 'email@naver.com',
          nickname: 'nickname',
          password: '',
        };
        const res = await request.post('/api/auth/signup').send(signupData);
        expect(res.status).toBe(400);
        expect(res.body.errorMessage).toBe(ERROR_JOI_MESSAGE.fillPassword);
      });
    });

    test('login validation fail', async () => {
      const signupData = {
        email: 'email@naver.com',
        nickname: 'nickname',
        password: '12341234',
      };
      await request.post('/api/auth/signup').send(signupData);

      const loginData = {
        email: '',
        password: '12341234',
      };
      const res = await request.post('/api/auth/login').send(loginData);
      expect(res.status).toBe(400);
      expect(res.body.errorMessage).toBe(ERROR_JOI_MESSAGE.fillEmail);

      const loginData2 = {
        email: 'email@naver.com',
        password: '',
      };
      const res2 = await request.post('/api/auth/login').send(loginData2);
      expect(res2.status).toBe(400);
      expect(res2.body.errorMessage).toBe(ERROR_JOI_MESSAGE.fillPassword);
    });
  });
});
