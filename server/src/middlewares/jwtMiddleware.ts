import { NextFunction, Request, Response } from 'express';
import { createToken, decodeToken, getAccessToken, getRefreshToken } from 'utils/jwt';

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
    if (aError === 'TokenExpiredError' && !rError) {
      const newAccessToken = createToken('access', { id: rId, nickname: rNickname });
      return res.status(200).json({ requestAgain: true, newAccessToken });
    }
    if (rError === 'TokenExpiredError') {
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
    res.cookie('refreshtoken', newRefreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7일
    });
  }
  next();
};

export default jwtMiddleware;
