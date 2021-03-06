import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import errorGenerator from '@/error/error-generator';
import CustomError from '@/error/custom-error';
import errorProcess from '@/error/error-process';
import { JOI_ERROR_MESSAGE } from '@/constants/error-message';
import { COMMENT_ENTITY } from '@/constants/entity';

const FROM = 'joi';

const updateCommentValidation = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const schema = Joi.object({
      content: Joi.string()
        .max(COMMENT_ENTITY.contentMaxLength)
        .required()
        .empty('')
        .messages({
          'string.max': `댓글은 ${COMMENT_ENTITY.contentMaxLength}자를 넘길 수 없습니다`,
          'any.required': `댓글을 입력해주세요`,
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

export default updateCommentValidation;
