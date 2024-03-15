import { Request, Response, NextFunction } from 'express';

import { ErrorValidation } from '../../../types/error';
import { CustomError } from '../../../utils/response/customError';

export const validatorEdit = (req: Request, res: Response, next: NextFunction) => {
  const { price, beds, bath, propertysqft } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  if (!bath) {
    errorsValidation.push({ bath: 'bath field is required' });
  }

  if (!propertysqft) {
    errorsValidation.push({ propertysqft: 'propertysqft field is required' });
  }

  if (!beds) {
    errorsValidation.push({ beds: 'beds field is required' });
  }

  if (!price) {
    errorsValidation.push({ price: 'price field is required' });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, errorsValidation);
    return next(customError);
  }
  return next();
};
