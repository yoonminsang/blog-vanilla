import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import errorGenerator from 'error/error-generator';
import CustomError from 'error/custom-error';
import errorProcess from 'error/error-process';
import { JOI_ERROR_MESSAGE } from 'constants/error-message';

const FROM = 'joi';

const readPostListValidation = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const schema = Joi.object({
      lastId: Joi.number().integer().positive().required().empty(''),
    });
    const validationResult = schema.validate(req.query);
    const { error } = validationResult;

    if (error) {
      throw errorGenerator({
        status: 400,
        message: JOI_ERROR_MESSAGE.invalidRequestQuery,
        customMessage: '존재하지 않는 페이지입니다',
        from: FROM,
      });
    }

    next();
  } catch (err) {
    errorProcess(res, err as CustomError);
  }
};

export default readPostListValidation;
