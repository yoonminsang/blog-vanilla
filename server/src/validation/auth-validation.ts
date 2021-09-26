import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import errorGenerator from 'error/error-generator';
import { USER_ENTITY } from 'constants/entity';
import CustomError from 'error/custom-error';
import errorProcess from 'error/error-process';
import { JOI_ERROR_MESSAGE } from 'constants/error-message';

const FROM = 'joi';

const authValidation = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const schema = Joi.object({
      email: Joi.string()
        .email()
        .max(USER_ENTITY.emailMaxLength)
        .required()
        .empty('')
        .messages({
          'string.email': `올바르지 않은 이메일 형식입니다`,
          'string.max': `이메일은 ${USER_ENTITY.emailMaxLength}자를 넘길 수 없습니다`,
          'any.required': `이메일을 입력해주세요`,
        }),
      nickname: Joi.string()
        .min(USER_ENTITY.nicknameMinLength)
        .max(USER_ENTITY.nicknameMaxLength)
        .required()
        .empty('')
        .messages({
          'string.min': `닉네임은 ${USER_ENTITY.nicknameMinLength}자 이상 입력해야 합니다`,
          'string.max': `닉네임은 ${USER_ENTITY.nicknameMaxLength}자를 넘길 수 없습니다`,
          'any.required': `닉네임을 입력해주세요`,
        }),
      password: Joi.string()
        .min(USER_ENTITY.passwordMinLength)
        .max(USER_ENTITY.passwordMaxLength)
        .required()
        .empty('')
        .messages({
          'string.min': `비밀번호는 ${USER_ENTITY.passwordMinLength}자 이상 입력해야 합니다`,
          'string.max': `비밀번호는 ${USER_ENTITY.passwordMaxLength}자를 넘길 수 없습니다`,
          'any.required': `비밀번호를 입력해주세요`,
        }),
    });

    const validationResult = schema.validate(req.body);
    const { error } = validationResult;

    if (error) {
      throw errorGenerator({
        code: 400,
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

export default authValidation;
