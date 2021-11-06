import App from '@/app';
import request from 'supertest';
import testConnection from './test-connection';

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

  test('checkUser', async () => {
    const { app } = new App();
    const res = await request(app).get('/api/auth');
    expect(res.body).toEqual({ user: null });
    expect(res.status).toBe(200);
  });
});
