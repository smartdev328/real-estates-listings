import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../utils/response/customError';
import { logger } from '../utils/winston';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error: ${err.message}`);
  return res.status(err.HttpStatusCode).json(err.JSON);
};
