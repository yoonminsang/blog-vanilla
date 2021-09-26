/**
 * error generator
 * @param {number} code - http status code
 * @param {string} message - error message for developer
 * @param {strinig} customMessage - custom error message because joi
 * @return {CustomError} - custom error object
 */

import CustomError from './custom-error';

interface ParamType {
  code: number;
  message: string;
  from: string;
  customMessage?: string;
}

const errorGenerator = ({ code, message, from, customMessage }: ParamType): CustomError => {
  return new CustomError(code, message, from, customMessage);
};

export default errorGenerator;
