import { Application } from 'express';
import dotEnvConfig from '@/config/dot-env-config';
import expressLoader from './express-loader';
import dbLoader from './db-loader';

const loaders = async (app: Application): Promise<void> => {
  dotEnvConfig();
  console.log(`NODE_ENV=${process.env.NODE_ENV}, dotenv success`);
  expressLoader(app);
  console.log('express load');
  await dbLoader();
  console.log('db load');
};

export default loaders;
