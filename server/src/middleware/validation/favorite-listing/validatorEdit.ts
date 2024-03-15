import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../../../utils/response/customError';

export const validatorEdit = (req: Request, res: Response, next: NextFunction) => {
  const { userId, listingId } = req.body;
  const errorsValidation: string[] = [];

  if (!userId) {
    errorsValidation.push('userId field is required');
  }

  if (!listingId) {
    errorsValidation.push('listingId field is required');
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, errorsValidation);
    return next(customError);
  }
  return next();
};
