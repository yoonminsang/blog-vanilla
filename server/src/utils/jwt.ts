import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import errorGenerator from 'error/error-generator';
import { TOEKN_ERROR_MESSAGE } from 'constants/error-message';

type TokenType = 'access' | 'refresh';
interface ITokenOption {
  id: string;
  nickname: string;
}

const getExp = (tokenType: TokenType): number => {
  const ACCESS_TOKEN_EXPIRE_DATE = Math.floor(Date.now() / 1000) + 60 * 30; // 30분
  const REFRESH_TOKEN_EXPIRE_DATE = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7일
  return tokenType === 'access' ? ACCESS_TOKEN_EXPIRE_DATE : REFRESH_TOKEN_EXPIRE_DATE;
};

const getSecret = (tokenType: TokenType): string => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access';
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh';
  return tokenType === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
};

const createToken = (tokenType: TokenType, option: ITokenOption): string => {
  const exp = getExp(tokenType);
  const secret = getSecret(tokenType);
  const token = jwt.sign({ exp, option }, secret);
  return token;
};

const decodeToken = (tokenType: TokenType, token: string): JwtPayload => {
  const secret = getSecret(tokenType);
  const decoded = jwt.verify(token, secret);
  if (typeof decoded !== 'object' || !decoded.option) {
    throw errorGenerator({
      code: 403,
      message: TOEKN_ERROR_MESSAGE.invalidToken,
    });
  }

  return decoded;
};

const decodeTokenOption = (tokenType: TokenType, token: string): ITokenOption => {
  const {
    option: { id, nickname },
  } = decodeToken(tokenType, token);
  return { id, nickname };
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
          message: TOEKN_ERROR_MESSAGE.invalidToken,
        });
        reject(error);
      }
      resolve(false);
    });
  });
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

export { createToken, decodeTokenOption, getAccessToken, getRefreshToken, checkTokenExpiration, checkTokenValid };
