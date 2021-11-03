import { Request, Response } from 'express';
import isLoggedInMiddleware from '../isLoggedInMiddleware';

let req = {} as Request;
let res = {} as Response;
const next = jest.fn();

describe('isLoggedInMiddleware', () => {
  test('로그인 되어있으면 isLoggedInMiddleware가 next 호출', () => {
    req = { user: {} } as unknown as Request;
    isLoggedInMiddleware(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test('로그인 되어있지 않으면 isLoggedInMiddleware가 에러 응답', () => {
    req = { user: null } as unknown as Request;
    res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    } as unknown as Response;
    isLoggedInMiddleware(req, res, next);
    expect(res.status).toBeCalledWith(403);
    expect(res.json).toBeCalledWith({ errorMessage: '로그인이 필요합니다' });
  });
});
