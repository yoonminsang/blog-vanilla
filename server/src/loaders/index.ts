import { Application } from 'express';
import dotenvConfig from 'utils/dotenv-config';
import expressLoader from './express-loader';

export default async (app: Application): Promise<void> => {
  dotenvConfig();
  console.log(`NODE_ENV=${process.env}, dotenv success`);
  expressLoader(app);
  console.log('express load');
};
