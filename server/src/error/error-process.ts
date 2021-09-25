import { Response } from 'express';
import CustomError from './custom-error';

const errorProcess = (res: Response, err: CustomError, errorHandler: any) => {
  console.log(err);
  const { status, errorMessage } = errorHandler(err);
  res.status(status).json({ errorMessage });
};

export default errorProcess;
