import CustomError from 'error/custom-error';
import errorProcess from 'error/error-process';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (err: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
  // TODO: 필요하다면 나중에 next로 미들웨어 하나 더 구현 ex) mysql, mongodb
  errorProcess(res, err);
  next();
};

export default errorMiddleware;
