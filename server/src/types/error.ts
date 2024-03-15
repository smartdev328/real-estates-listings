export type ErrorResponse = {
  errors: string[] | ErrorValidation[] | null;
};

export type ErrorValidation = { [key: string]: string };
