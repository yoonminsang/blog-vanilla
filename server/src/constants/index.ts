const REFRESHTOKEN = 'refreshtoken';

const TOKENEXPIREDERROR = 'TokenExpiredError';

const refreshTokenCookieOptions = {
  httpOnly: true,
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7일
};

export { REFRESHTOKEN, TOKENEXPIREDERROR, refreshTokenCookieOptions };
