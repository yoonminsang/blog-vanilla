import logger from '@/config/logger';
import CustomError from '@/error/custom-error';
import { IError } from '@/types/error';

const errorJoi = (err: CustomError): IError => {
  const { status, customMessage } = err;
  let errorMessage;

  if (customMessage) {
    errorMessage = customMessage;
  } else {
    errorMessage = 'joi의 customMessage를 설정하지 않았습니다';
    logger.error('joi error handler error maybe becauseof customMessage, error:', err);
  }

  return { status, errorMessage };
};

export default errorJoi;
