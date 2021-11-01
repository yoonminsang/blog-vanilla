import dotenv from 'dotenv';
import path from 'path';

const envConfig = () =>
  dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV === 'development' ? '.dev.env' : '.env'),
  });
export default envConfig;
