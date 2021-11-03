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

  test('creates a user', () => {
    // TODO
    expect(1 + 1).toBe(2);
  });
});
