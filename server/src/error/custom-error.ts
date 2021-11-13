/**
 * custom error
 * @param {number} status - http status code
 * @param {string} message - error message for developer
 * @param {string} from - error from where
 * @param {strinig} customMessage - custom error message for joi and so on
 * @return {CustomError} - custom error object
 */

class CustomError extends Error {
  status: number;

  from: string;

  customMessage?: string;

  constructor(status: number, message: string, from: string, customMessage?: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.status = status;
    this.from = from;
    this.customMessage = customMessage;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;
