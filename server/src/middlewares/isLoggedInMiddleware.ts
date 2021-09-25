import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line consistent-return
const isLoggedInMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return next();
  }
  res.status(403).json({ errorMessage: '로그인이 필요합니다' });
};

export default isLoggedInMiddleware;
