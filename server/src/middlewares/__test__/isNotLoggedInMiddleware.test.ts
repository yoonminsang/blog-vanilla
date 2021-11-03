import { Request, Response } from 'express';
import isNotLoggedInMiddleware from '../isNotLoggedInMiddleware';

let req = {} as Request;
let res = {} as Response;
const next = jest.fn();

describe('isNotLoggedInMiddleware', () => {
  test('로그인 되어있지 않으면 isNotLoggedInMiddleware가  next 호출', () => {
    req = { user: null } as unknown as Request;

    isNotLoggedInMiddleware(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test('로그인 되어있으면 isNotLoggedInMiddleware가 에러 응답', () => {
    req = { user: {} } as unknown as Request;
    res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    } as unknown as Response;
    isNotLoggedInMiddleware(req, res, next);
    expect(res.status).toBeCalledWith(403);
    expect(res.json).toBeCalledWith({ errorMessage: '로그아웃이 필요합니다' });
  });
});
