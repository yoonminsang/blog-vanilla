import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import errorGenerator from 'error/error-generator';
import CustomError from 'error/custom-error';
import errorProcess from 'error/error-process';
import { JOI_ERROR_MESSAGE } from 'constants/error-message';

const FROM = 'joi';

const loginValidation = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const schema = Joi.object({
      email: Joi.string().required().empty('').messages({
        'any.required': `이메일을 입력해주세요`,
      }),
      password: Joi.string().required().empty('').messages({
        'any.required': `비밀번호를 입력해주세요`,
      }),
    });

    const validationResult = schema.validate(req.body);
    const { error } = validationResult;

    if (error) {
      throw errorGenerator({
        status: 400,
        message: JOI_ERROR_MESSAGE.invalidRequestBody,
        customMessage: error.message,
        from: FROM,
      });
    }

    next();
  } catch (err) {
    errorProcess(res, err as CustomError);
  }
};

export default loginValidation;
