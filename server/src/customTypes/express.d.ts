/* eslint-disable no-unused-vars */
import User from 'entity/user';

interface IUser {
  id: string;
  nickname: string;
}

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
