import logger from '@/config/logger';
import { Response } from 'express';
import CustomError from './custom-error';
import errorHandler from './error-handler';

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
