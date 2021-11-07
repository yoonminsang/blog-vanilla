import { AUTH_ERROR_MESSAGE } from '@/constants/error-message';
import CustomError from '@/error/custom-error';
import { IError } from '@/types/error';

// TODO: 이러면 성능상에 문제가 있을까?? REDUCE부분. 아니면 객체 두개를 만드는 방법도 있어
const errorAuth = (err: CustomError): IError => {
  const { status, message } = err;
  let errorMessage: string;

  const [forEeveloperError, forUserError] = Object.values(AUTH_ERROR_MESSAGE).reduce(
    (acc, cur) => {
      acc[0].push(cur[0]);
      acc[1].push(cur[1]);
      return acc;
    },
    [[], []] as string[][],
  );

  const idx = forEeveloperError.indexOf(message);
  if (idx !== -1) {
    errorMessage = forUserError[idx];
  } else {
    errorMessage = '다시 시도해주세요';
  }

  return { status, errorMessage };
};

export default errorAuth;
