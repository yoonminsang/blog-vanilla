import CustomError from 'error/custom-error';
import { IError } from 'types/error';

const errorJoi = (err: CustomError): IError => {
  const { status, message, customMessage } = err;
  let errorMessage;

  switch (message) {
    case 'invalid request body':
      errorMessage = '잘못된 요청입니다';
      break;
    default:
      errorMessage = '다시 시도해주세요';
      break;
  }

  if (customMessage) {
    errorMessage = customMessage;
  }

  return { status, errorMessage };
};

export default errorJoi;
