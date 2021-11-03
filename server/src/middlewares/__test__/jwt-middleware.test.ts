import { Request, Response } from 'express';
import jwtMiddleware from '../jwt-middleware';

const req = { headers: { authorization: '' }, cookies: '' } as Request;
const res = {} as Response;
const next = jest.fn();

describe('jwtMiddleware', () => {
  test('TODO 어렵다', () => {
    jwtMiddleware(req, res, next);
    expect(next).toBeCalledTimes(1);
  });
});
