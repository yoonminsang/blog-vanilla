export interface IError {
  status: number;
  errorMessage: string;
}

export interface IErrorMessage {
  [key: string]: string[];
}
