import CustomError from './custom-error';

interface ErrorType {
  status: number;
  errorMessage: string;
}

const errorHandler = (err: CustomError): ErrorType => {
  const { status, message, customMessage } = err;
  let errorMessage;

  switch (message) {
    case 'invalid request body':
      errorMessage = '잘못된 요청입니다';
      break;
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

  if (customMessage) {
    errorMessage = customMessage;
  }

  return { status, errorMessage };
};

export default errorHandler;
