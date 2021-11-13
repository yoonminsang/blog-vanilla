/*
  각각의 객체안의 value는 [개발자를 위한 에러 메세지, 유저를 위한 에러 메세지] 배열로 구성
  joi는 에러 처리 방식이 customMessage를 사용하기 때문에 형태가 다름
*/

const JOI_ERROR_MESSAGE = {
  invalidRequestBody: 'invalid request body',
  invalidRequestParams: 'invalid request params',
  invalidRequestQuery: 'invalid request query',
};

const AUTH_ERROR_MESSAGE = {
  duplicateEmail: ['duplicate email', '이메일이 존재합니다'],
  duplicateNickname: ['duplicate nickname', '닉네임이 존재합니다'],
  notFoundUser: ['not found user', '유저가 존재하지 않습니다'],
  notFoundEmail: ['not found email', '이메일 또는 비밀번호가 일치하지 않습니다'],
  notCorrectPassword: ['not found password', '이메일 또는 비밀번호가 일치하지 않습니다'],
};

const POST_ERROR_MESSAGE = {
  notFoundUserId: 'not found user id',
  notFoundPostId: 'not found post id',
  notFoundPostList: 'not found post list',
  diffrentUserId: 'diffrent user id',
};

const COMMENT_ERROR_MESSAGE = {
  notFoundPostId: 'not found post id',
  notFoundCommentId: 'not found comment id',
  notFoundCommentList: 'not found comment list',
  diffrentUserId: 'diffrent user id',
};

export { JOI_ERROR_MESSAGE, AUTH_ERROR_MESSAGE, POST_ERROR_MESSAGE, COMMENT_ERROR_MESSAGE };
