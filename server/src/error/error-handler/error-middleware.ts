import logger from '@/config/logger';
import { MIDDLEWARE_ERROR_MESSAGE } from '@/constants/error-message';
import CustomError from '@/error/custom-error';
import { IError } from '@/types/error';

// TODO: 전부 에러를 마이그레이션 후에 에러 메세지를 파라미터로 받는 하나의 함수로 합치기
const errorMiddlewareToDo = (err: CustomError): IError => {
  const { status, message } = err;
  let errorMessage: string;

  const [forDeveloperError, forUserError] = Object.values(MIDDLEWARE_ERROR_MESSAGE).reduce(
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
    errorMessage = 'auth의 에러 핸들러에 문제가 있습니다';
    logger.error('auth error handler error, error:', err);
  }

  return { status, errorMessage };
};

export default errorMiddlewareToDo;
