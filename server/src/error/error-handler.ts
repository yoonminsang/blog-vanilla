import CustomError from './custom-error';

interface ErrorType {
  status: number;
  errorMessage: string;
}

const errorHandler = (err: CustomError): ErrorType => {
  const { status, message, customMessage } = err;
  let errorMessage;

  switch (message) {
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
