import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { ErrorValidation } from '../../../types/error';
import { CustomError } from '../../../utils/response/customError';

export const validatorLogin = (req: Request, res: Response, next: NextFunction) => {
  let { email, password } = req.body;
  const errorsValidation: string[] = [];

  email = !email ? '' : email;
  password = !password ? '' : password;

  if (!validator.isEmail(email)) {
    errorsValidation.push('Email is invalid');
  }

  if (validator.isEmpty(email)) {
    errorsValidation.push('Email field is required');
  }

  if (validator.isEmpty(password)) {
    errorsValidation.push('Password field is required');
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, errorsValidation);
    return next(customError);
  }
  return next();
};
