import { NextFunction, Request, Response } from 'express';
import CustomError from '@/error/custom-error';
import errorProcess from '@/error/error-process';

const errorMiddleware = (err: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
  errorProcess(res, err);
  next();
};

export default errorMiddleware;
