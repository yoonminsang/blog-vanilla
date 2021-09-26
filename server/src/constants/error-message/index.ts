const JWT_ERROR_MESSAGE = {
  invalidToken: 'invalid token',
  expiredToken: 'expired token',
};

const JOI_ERROR_MESSAGE = {
  invalidRequestBody: 'invalid request body',
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
};

export { JWT_ERROR_MESSAGE, JOI_ERROR_MESSAGE, AUTH_ERROR_MESSAGE, POST_ERROR_MESSAGE };
