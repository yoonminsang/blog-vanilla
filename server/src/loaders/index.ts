import { Application } from 'express';
import envConfig from '@/config/env-config';
import expressLoader from './express-loader';
import dbLoader from './db-loader';

const loaders = async (app: Application): Promise<void> => {
  envConfig();
  console.log(`NODE_ENV=${process.env.NODE_ENV}, dotenv success`);
  expressLoader(app);
  console.log('express load');
  dbLoader();
  console.log('db load');
};

export default loaders;
