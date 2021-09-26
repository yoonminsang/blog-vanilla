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
