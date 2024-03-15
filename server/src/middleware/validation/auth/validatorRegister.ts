import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/response/customError';

export const validatorRegister = (req: Request, res: Response, next: NextFunction) => {
  let { email, password, confirmPassword } = req.body;
  const errorsValidation: string[] = [];

  email = !email ? '' : email;
  password = !password ? '' : password;
  confirmPassword = !confirmPassword ? '' : confirmPassword;

  if (!validator.isEmail(email)) {
    errorsValidation.push('Email is invalid');
  }

  if (validator.isEmpty(email)) {
    errorsValidation.push('Email is required');
  }

  if (validator.isEmpty(password)) {
    errorsValidation.push('Password is required');
  }

  if (validator.isEmpty(confirmPassword)) {
    errorsValidation.push('Confirm password is required');
  }

  if (!validator.equals(password, confirmPassword)) {
    errorsValidation.push('Passwords must match');
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, errorsValidation);
    return next(customError);
  }
  return next();
};
