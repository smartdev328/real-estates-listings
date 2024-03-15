import { ErrorResponse, ErrorValidation } from '../../types/error';

export class CustomError extends Error {
  private httpStatusCode: number;
  private errors: string[] | ErrorValidation[] | null;

  constructor(httpStatusCode: number, errors: string[] | ErrorValidation[] | null = null) {
    super();

    this.name = this.constructor.name;

    this.httpStatusCode = httpStatusCode;
    this.errors = errors;
  }

  get HttpStatusCode() {
    return this.httpStatusCode;
  }

  get JSON(): ErrorResponse {
    return {
      errors: this.errors,
    };
  }
}
