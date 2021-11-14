import logger from '@/config/logger';
import { Response } from 'express';
import CustomError from './custom-error';
import errorAuth from './error-handler/error-auth';
import errorComment from './error-handler/error-comment';
import errorJoi from './error-handler/error-joi';
import errorMiddlewareToDo from './error-handler/error-middleware';
import errorPost from './error-handler/error-post';

const errorHandler = (err: CustomError) => {
  // TODO: common을 만들까?? 고민해보자
  switch (err.from) {
    case 'joi':
      return errorJoi(err);
    case 'middleware':
      return errorMiddlewareToDo(err);
    case 'auth':
      return errorAuth(err);
    case 'post':
      return errorPost(err);
    case 'comment':
      return errorComment(err);
    default:
      logger.error('not found error handler, err:', err);
      return { status: 500, errorMessage: '에러 핸들러가 존재하지 않습니다' };
  }
};

const errorProcess = (res: Response, err: CustomError | Error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }
  if (err instanceof CustomError) {
    const { status, errorMessage } = errorHandler(err);
    res.status(status).json({ errorMessage });
  } else {
    logger.error('server error, error:', err);
    res.status(500).json({ errorMessage: '서버 에러' });
  }
};

export default errorProcess;
