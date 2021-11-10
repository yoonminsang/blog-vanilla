import logger from '@/config/logger';
import { TOKENEXPIREDERROR } from '@/constants';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

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
  const token = jwt.sign({ exp, ...option }, secret);
  return token;
};

const decodeToken = (tokenType: TokenType, token: string): Promise<JwtPayload> => {
  return new Promise(resolve => {
    const secret = getSecret(tokenType);
    jwt.verify(token, secret, (err: VerifyErrors | null, decoded) => {
      if (err) {
        if (err.name !== TOKENEXPIREDERROR) {
          logger.info(err);
        }
        resolve({ jwtError: err.name });
      }
      if (typeof decoded !== 'object') {
        const jwtError = 'token is not a object';
        logger.info(jwtError);
        resolve({ jwtError });
      }
      resolve(decoded as JwtPayload);
    });
  });
};

const getAccessToken = (authorization: string | undefined): string | undefined => {
  return authorization?.split('Bearer ')[1];
};

const getRefreshToken = (cookies: { refreshtoken: string | undefined }): string | undefined => {
  return cookies?.refreshtoken;
};

export { createToken, decodeToken, getAccessToken, getRefreshToken };
