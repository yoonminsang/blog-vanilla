import CustomError from './custom-error';

interface ParamType {
  status: number;
  message: string;
  from: string;
  customMessage?: string;
}

const errorGenerator = ({ status, message, from, customMessage }: ParamType): CustomError => {
  return new CustomError(status, message, from, customMessage);
};

export default errorGenerator;
