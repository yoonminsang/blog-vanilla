import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import errorGenerator from 'error/error-generator';
import { POST_ENTITY } from 'constants/entity';
import CustomError from 'error/custom-error';
import errorProcess from 'error/error-process';
import { JOI_ERROR_MESSAGE } from 'constants/error-message';

const FROM = 'joi';

const postValidation = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const schema = Joi.object({
      title: Joi.string()
        .max(POST_ENTITY.titleMaxLength)
        .required()
        .empty('')
        .messages({
          'string.max': `제목은 ${POST_ENTITY.titleMaxLength}자를 넘길 수 없습니다`,
          'any.required': `제목을 입력해주세요`,
        }),
      content: Joi.string(),
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

export default postValidation;
