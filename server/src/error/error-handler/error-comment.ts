import { COMMENT_ERROR_MESSAGE } from '@/constants/error-message';
import CustomError from '@/error/custom-error';
import { IError } from '@/types/error';

const errorComment = (err: CustomError): IError => {
  const { status, message } = err;
  let errorMessage;
  switch (message) {
    case COMMENT_ERROR_MESSAGE.notFoundPostId:
      errorMessage = '글이 존재하지 않습니다';
      break;
    case COMMENT_ERROR_MESSAGE.notFoundCommentId:
      errorMessage = '댓글이 존재하지 않습니다';
      break;
    case COMMENT_ERROR_MESSAGE.notFoundCommentList:
      errorMessage = '댓글 목록이 존재하지 않습니다';
      break;
    case COMMENT_ERROR_MESSAGE.diffrentUserId:
      errorMessage = '글 작성자와 아이디가 다릅니다';
      break;
    default:
      errorMessage = '다시 시도해주세요';
      break;
  }

  return { status, errorMessage };
};

export default errorComment;
