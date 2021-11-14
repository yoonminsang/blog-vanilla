import { MIDDLEWARE_ERROR_MESSAGE } from '@/constants/error-message';
import CustomError from '@/error/custom-error';
import errorGenerator from '@/error/error-generator';
import errorProcess from '@/error/error-process';
import { NextFunction, Request, Response } from 'express';

const FROM = 'middleware';

const isLoggedInMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return next();
  }
  const err = errorGenerator({
    status: 403,
    message: MIDDLEWARE_ERROR_MESSAGE.needLogin[0],
    from: FROM,
  });

  errorProcess(res, err as CustomError);
};

export default isLoggedInMiddleware;
