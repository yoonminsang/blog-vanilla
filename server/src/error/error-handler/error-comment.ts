import { COMMENT_ERROR_MESSAGE } from 'constants/error-message';
import CustomError from 'error/custom-error';
import { IError } from 'types/error';

const errorComment = (err: CustomError): IError => {
  const { status, message } = err;
  let errorMessage;
  switch (message) {
    case COMMENT_ERROR_MESSAGE.notFoundPostId:
      errorMessage = '글이 존재하지 않습니다';
      break;
    default:
      errorMessage = '다시 시도해주세요';
      break;
  }

  return { status, errorMessage };
};

export default errorComment;
