/*
  각각의 객체안의 value는 [개발자를 위한 에러 메세지, 유저를 위한 에러 메세지] 배열로 구성
*/

import { IErrorMessage } from '@/types/error';

const JOI_ERROR_MESSAGE = {
  invalidRequestBody: ['invalid request body', '유효하지 않은 body입니다'],
  invalidRequestParams: ['invalid request params', '유효하지 않은 params입니다'],
  invalidRequestQuery: ['invalid request query', '유효하지 않은 query입니다'],
};

const MIDDLEWARE_ERROR_MESSAGE: IErrorMessage = {
  needLogin: ['need login', '로그인이 필요합니다'],
  needLogout: ['need logout', '로그아웃이 필요합니다'],
};

const AUTH_ERROR_MESSAGE: IErrorMessage = {
  duplicateEmail: ['duplicate email', '이메일이 존재합니다'],
  duplicateNickname: ['duplicate nickname', '닉네임이 존재합니다'],
  notFoundUser: ['not found user', '유저가 존재하지 않습니다'],
  notFoundEmail: ['not found email', '이메일 또는 비밀번호가 일치하지 않습니다'],
  notCorrectPassword: ['not found password', '이메일 또는 비밀번호가 일치하지 않습니다'],
};

const POST_ERROR_MESSAGE: IErrorMessage = {
  notFoundUserId: ['not found user id', '유저가 존재하지 않습니다'],
  notFoundPostId: ['not found post id', '글이 존재하지 않습니다'],
  notFoundPostList: ['not found post list', '글 목록이 존재하지 않습니다'],
  diffrentUserId: ['diffrent user id', '글 작성자와 아이디가 다릅니다'],
};

const COMMENT_ERROR_MESSAGE: IErrorMessage = {
  notFoundPostId: ['not found post id', '글이 존재하지 않습니다'],
  notFoundCommentId: ['not found comment id', '댓글이 존재하지 않습니다'],
  notFoundCommentList: ['not found comment list', '댓글 목록이 존재하지 않습니다'],
  diffrentUserId: ['diffre`nt user id', '글 작성자와 아이디가 다릅니다'],
};

export { JOI_ERROR_MESSAGE, MIDDLEWARE_ERROR_MESSAGE, AUTH_ERROR_MESSAGE, POST_ERROR_MESSAGE, COMMENT_ERROR_MESSAGE };
