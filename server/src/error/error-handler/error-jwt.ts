import { JWT_ERROR_MESSAGE } from 'constants/error-message';
import CustomError from 'error/custom-error';
import { IError } from 'types/error';

const errorJwt = (err: CustomError): IError => {
  const { status, message } = err;
  let errorMessage;

  switch (message) {
    case JWT_ERROR_MESSAGE.expiredToken:
      errorMessage = '토큰이 만료되었습니다';
      break;
    case JWT_ERROR_MESSAGE.invalidToken:
      errorMessage = '유효하지 않은 토큰입니다';
      break;
    default:
      errorMessage = '다시 시도해주세요';
      break;
  }

  return { status, errorMessage };
};

export default errorJwt;
