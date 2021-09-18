class CustomError extends Error {
  status: number;

  customMessage?: string;

  constructor(status: number, message: string, customMessage?: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.status = status;
    this.customMessage = customMessage;
  }
}

export default CustomError;
