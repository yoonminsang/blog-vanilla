import logger from '@/config/logger';
import {
  AUTH_ERROR_MESSAGE,
  COMMENT_ERROR_MESSAGE,
  JOI_ERROR_MESSAGE,
  MIDDLEWARE_ERROR_MESSAGE,
  POST_ERROR_MESSAGE,
} from '@/constants/error-message';
import CustomError from '@/error/custom-error';
import { IError, IErrorMessage } from '@/types/error';

const errorHandler = (err: CustomError): IError => {
  const { status, message, customMessage, from } = err;
  let ERROR_MESSAGE: IErrorMessage;
  switch (from) {
    case 'joi':
      ERROR_MESSAGE = JOI_ERROR_MESSAGE;
      break;
    case 'middleware':
      ERROR_MESSAGE = MIDDLEWARE_ERROR_MESSAGE;
      break;
    case 'auth':
      ERROR_MESSAGE = AUTH_ERROR_MESSAGE;
      break;
    case 'post':
      ERROR_MESSAGE = POST_ERROR_MESSAGE;
      break;
    case 'comment':
      ERROR_MESSAGE = COMMENT_ERROR_MESSAGE;
      break;
    default:
      logger.error(`not found ${from} error handler, err:`, err);
      return { status: 500, errorMessage: `${from} 에러 핸들러가 존재하지 않습니다` };
  }

  let errorMessage: string;
  if (customMessage) {
    errorMessage = customMessage;
  } else {
    const [forDeveloperError, forUserError] = Object.values(ERROR_MESSAGE).reduce(
      (acc, cur) => {
        acc[0].push(cur[0]);
        acc[1].push(cur[1]);
        return acc;
      },
      [[], []] as string[][],
    );

    const idx = forDeveloperError.indexOf(message);
    if (idx !== -1) {
      errorMessage = forUserError[idx];
    } else {
      logger.error(`${from} error handler error, error:`, err);
      errorMessage = `${from}의 에러 핸들러에 문제가 있습니다`;
    }
  }

  return { status, errorMessage };
};

export default errorHandler;
