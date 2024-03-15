import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JwtPayload } from '../types/JwtPayload';
import { createJwtToken } from '../utils/createJwtToken';
import { CustomError } from '../utils/response/customError';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const customError = new CustomError(400, ['Authorization header not provided']);
    return next(customError);
  }

  const token = authHeader.split(' ')[1];
  let jwtPayload: { [key: string]: any };
  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as { [key: string]: any };
    ['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
    req.jwtPayload = jwtPayload as JwtPayload;
  } catch (err) {
    const customError = new CustomError(401, err);
    return next(customError);
  }
  return next();
};
