import dbConfig from '@/config/db-config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

const dbLoader = async (): Promise<void> => {
  try {
    await createConnection(dbConfig());
  } catch (err) {
    console.log('db connection error \n', err);
  }
};

export default dbLoader;
