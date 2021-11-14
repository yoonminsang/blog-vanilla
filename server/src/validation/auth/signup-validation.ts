import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import errorGenerator from '@/error/error-generator';
import { USER_ENTITY } from '@/constants/entity';
import CustomError from '@/error/custom-error';
import errorProcess from '@/error/error-process';
import { JOI_ERROR_MESSAGE } from '@/constants/error-message';
import ERROR_JOI_MESSAGE from '@/constants/error-joi-message.ts';

const FROM = 'joi';

const signupValidation = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().max(USER_ENTITY.emailMaxLength).required().empty('').messages({
        'string.email': ERROR_JOI_MESSAGE.invalidEmail,
        'string.max': ERROR_JOI_MESSAGE.exceedMaxLengthEmail,
        'any.required': ERROR_JOI_MESSAGE.fillEmail,
      }),
      nickname: Joi.string()
        .min(USER_ENTITY.nicknameMinLength)
        .max(USER_ENTITY.nicknameMaxLength)
        .required()
        .empty('')
        .messages({
          'string.min': ERROR_JOI_MESSAGE.underMinLengthNickname,
          'string.max': ERROR_JOI_MESSAGE.exceedMaxLengthNickname,
          'any.required': ERROR_JOI_MESSAGE.fillNickname,
        }),
      password: Joi.string()
        .min(USER_ENTITY.passwordMinLength)
        .max(USER_ENTITY.passwordMaxLength)
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/)
        .required()
        .empty('')
        .messages({
          'string.min': ERROR_JOI_MESSAGE.underMinLengthPassword,
          'string.max': ERROR_JOI_MESSAGE.exceedMaxLengthPassword,
          'string.pattern.base': ERROR_JOI_MESSAGE.invalidRegexPassword,
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

export default signupValidation;
