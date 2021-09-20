import CustomError from 'error/custom-error';
import { IError } from 'types/error';

const errorAuth = (err: CustomError): IError => {
  const { status, message } = err;
  let errorMessage;

  switch (message) {
    case 'duplicate email':
      errorMessage = '이메일이 존재합니다';
      break;
    case 'duplicate nickname':
      errorMessage = '닉네임이 존재합니다';
      break;
    default:
      errorMessage = '다시 시도해주세요';
      break;
  }

  return { status, errorMessage };
};

export default errorAuth;
