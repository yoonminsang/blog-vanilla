import { NextFunction, Request, Response } from 'express';

const isNotLoggedInMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next();
  }
  res.status(403).json({ errorMessage: '로그아웃이 필요합니다' });
};

export default isNotLoggedInMiddleware;
