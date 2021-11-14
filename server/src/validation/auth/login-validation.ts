import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import errorGenerator from '@/error/error-generator';
import CustomError from '@/error/custom-error';
import errorProcess from '@/error/error-process';
import { JOI_ERROR_MESSAGE } from '@/constants/error-message';
import ERROR_JOI_MESSAGE from '@/constants/error-joi-message.ts';

const FROM = 'joi';

const loginValidation = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const schema = Joi.object({
      email: Joi.string().required().empty('').messages({
        'any.required': ERROR_JOI_MESSAGE.fillEmail,
      }),
      password: Joi.string().required().empty('').messages({
        'any.required': ERROR_JOI_MESSAGE.fillPassword,
      }),
    });

    const validationResult = schema.validate(req.body);
    const { error } = validationResult;

    if (error) {
      throw errorGenerator({
        status: 400,
        message: JOI_ERROR_MESSAGE.invalidRequestBody[0],
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
