import { Request } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { INVALID_TOKEN } from 'constants/error-message';
import errorGenerator from 'error/error-generator';

type TokenType = 'access' | 'refresh';
interface IOption {
  id: string;
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh';

const getExp = (tokenType: TokenType): number => {
  const ACCESS_TOKEN_EXPIRE_DATE = Math.floor(Date.now() / 1000) + 60 * 30; // 30분
  const REFRESH_TOKEN_EXPIRE_DATE = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7일
  return tokenType === 'access' ? ACCESS_TOKEN_EXPIRE_DATE : REFRESH_TOKEN_EXPIRE_DATE;
};

const getSecret = (tokenType: TokenType): string => {
  return tokenType === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
};

const createToken = (tokenType: TokenType, option: IOption): string => {
  const exp = getExp(tokenType);
  const secret = getSecret(tokenType);

  const token = jwt.sign({ exp, option }, secret);
  return token;
};

const decodeToken = (tokenType: TokenType, token: string): JwtPayload => {
  const secret = getSecret(tokenType);
  const decoded = jwt.verify(token, secret);

  if (typeof decoded === 'string' || !decoded.id) {
    throw errorGenerator({
      code: 403,
      message: INVALID_TOKEN,
    });
  }

  return decoded;
};

const getAccessToken = (authorization: string | undefined): string | undefined => {
  return authorization?.split('Bearer ')[1];
};

const getRefreshToken = (cookies: { refreshtoken: string | undefined }): string | undefined => {
  return cookies?.refreshtoken;
};

const checkTokenExpiration = (tokenType: TokenType, token: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const secret = getSecret(tokenType);
    jwt.verify(token, secret, (err: VerifyErrors | null) => {
      if (err?.name === 'TokenExpiredError') {
        resolve(true);
      }
      if (err) {
        const error = errorGenerator({
          code: 403,
          message: INVALID_TOKEN,
        });
        reject(error);
      }
      resolve(false);
    });
  });
};

const getIDFromToken = (token: string): string => {
  const decoded = jwt.decode(token);

  if (typeof decoded === 'string' || !decoded) {
    throw errorGenerator({
      code: 403,
      message: INVALID_TOKEN,
    });
  }

  const { id } = decoded as IOption;
  return id;
};

const checkTokenValid = (tokenType: TokenType, token: string): Promise<boolean> => {
  return new Promise(resolve => {
    const secret = getSecret(tokenType);
    jwt.verify(token, secret, (err: VerifyErrors | null) => {
      if (!err) {
        resolve(true);
      }
      resolve(false);
    });
  });
};

export {
  createToken,
  decodeToken,
  getAccessToken,
  getRefreshToken,
  checkTokenExpiration,
  getIDFromToken,
  checkTokenValid,
};
