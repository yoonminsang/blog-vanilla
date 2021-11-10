import { NextFunction, Request, Response } from 'express';
import { createToken, decodeToken, getAccessToken, getRefreshToken } from '@/utils/jwt';
import { REFRESHTOKEN, refreshTokenCookieOptions, TOKENEXPIREDERROR } from '@/constants';

const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = getAccessToken(req.headers.authorization);
  const refreshToken = getRefreshToken(req.cookies);

  if (!accessToken || !refreshToken) {
    return next();
  }

  const { id: aId, nickname: aNickname, jwtError: aError } = await decodeToken('access', accessToken as string);
  const {
    exp: rExp,
    id: rId,
    nickname: rNickname,
    jwtError: rError,
  } = await decodeToken('refresh', refreshToken as string);

  if (aError || rError) {
    if (aError === TOKENEXPIREDERROR && !rError) {
      const newAccessToken = createToken('access', { id: rId, nickname: rNickname });
      return res.status(200).json({ requestAgain: true, newAccessToken });
    }
    if (rError === TOKENEXPIREDERROR) {
      res.clearCookie(REFRESHTOKEN);
      return res.status(200).json({ expiredRefreshToken: true });
    }
    return next();
  }

  if (aId !== rId || aNickname !== rNickname) {
    return next();
  }

  const [id, nickname] = [aId, aNickname];
  req.user = { id, nickname };

  const now = Math.floor(Date.now() / 1000);

  if ((rExp as number) - now < 60 * 60 * 24 * 3.5) {
    // 3.5일
    const newRefreshToken = createToken('refresh', { id, nickname });
    res.cookie(REFRESHTOKEN, newRefreshToken, refreshTokenCookieOptions);
  }
  next();
};

export default jwtMiddleware;
