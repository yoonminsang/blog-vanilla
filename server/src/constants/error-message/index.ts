const JWT_ERROR_MESSAGE = {
  invalidToken: 'invalid token',
  expiredToken: 'expired token',
};

const JOI_ERROR_MESSAGE = {
  invalidRequestBody: 'invalid request body',
  invalidRequestParams: 'invalid request params',
  invalidRequestQuery: 'invalid request query',
};

const AUTH_ERROR_MESSAGE = {
  duplicateEmail: 'duplicate email',
  duplicateNickname: 'duplicate nickname',
  notFoundUser: 'not found user',
  notFoundEmail: 'not found email',
  notFoundPassword: 'not found password',
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

export { JWT_ERROR_MESSAGE, JOI_ERROR_MESSAGE, AUTH_ERROR_MESSAGE, POST_ERROR_MESSAGE, COMMENT_ERROR_MESSAGE };
