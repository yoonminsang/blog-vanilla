import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import errorGenerator from '@/error/error-generator';
import { POST_ENTITY } from '@/constants/entity';
import CustomError from '@/error/custom-error';
import errorProcess from '@/error/error-process';
import { JOI_ERROR_MESSAGE } from '@/constants/error-message';
import ERROR_JOI_MESSAGE from '@/constants/error-joi-message.ts';

const FROM = 'joi';

const createPostValidation = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const schema = Joi.object({
      title: Joi.string().max(POST_ENTITY.titleMaxLength).required().empty('').messages({
        'string.max': ERROR_JOI_MESSAGE.exceedMaxLengthTitle,
        'any.required': ERROR_JOI_MESSAGE.fillTitle,
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

export default createPostValidation;
