import { Response } from 'express';
import CustomError from './custom-error';
import errorAuth from './error-handler/error-auth';
import errorComment from './error-handler/error-comment';
import errorJoi from './error-handler/error-joi';
import errorJwt from './error-handler/error-jwt';
import errorPost from './error-handler/error-post';

const errorHandler = (err: CustomError) => {
  switch (err.from) {
    case 'jwt':
      return errorJwt(err);
    case 'joi':
      return errorJoi(err);
    case 'auth':
      return errorAuth(err);
    case 'post':
      return errorPost(err);
    case 'comment':
      return errorComment(err);
    default:
      return { status: 500, errorMessage: '에러 핸들러가 존재하지 않습니다' };
  }
};

const errorProcess = (res: Response, err: CustomError | Error) => {
  // TODO: console.log는 winstom으로 바꿀지도??
  console.log(err);
  if (err instanceof CustomError) {
    const { status, errorMessage } = errorHandler(err);
    res.status(status).json({ errorMessage });
  } else {
    res.status(500).json({ errorMessage: '서버 에러' });
  }
};

export default errorProcess;
