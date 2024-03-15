import { response, Response } from 'express';

response.customSuccess = function (httpStatusCode: number, message: string, data: any = null): Response {
  return this.status(httpStatusCode).json({ message, data });
};

response.customPagination = function (
  httpStatusCode: number,
  page: number,
  limit: number,
  total: number,
  data: any = null,
): Response {
  return this.status(httpStatusCode).json({ total, limit, page, data });
};
