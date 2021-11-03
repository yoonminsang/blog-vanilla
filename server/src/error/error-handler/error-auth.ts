import { AUTH_ERROR_MESSAGE } from '@/constants/error-message';
import CustomError from '@/error/custom-error';
import { IError } from '@/types/error';

const errorAuth = (err: CustomError): IError => {
  const { status, message } = err;
  let errorMessage;

  switch (message) {
    case AUTH_ERROR_MESSAGE.duplicateEmail:
      errorMessage = '이메일이 존재합니다';
      break;
    case AUTH_ERROR_MESSAGE.duplicateNickname:
      errorMessage = '닉네임이 존재합니다';
      break;
    case AUTH_ERROR_MESSAGE.notFoundUser:
      errorMessage = '유저가 존재하지 않습니다';
      break;
    case AUTH_ERROR_MESSAGE.notFoundEmail:
    case AUTH_ERROR_MESSAGE.notFoundPassword:
      errorMessage = '이메일 또는 비밀번호가 일치하지 않습니다';
      break;
    default:
      errorMessage = '다시 시도해주세요';
      break;
  }

  return { status, errorMessage };
};

export default errorAuth;
