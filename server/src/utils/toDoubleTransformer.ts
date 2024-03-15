import { ValueTransformer } from 'typeorm';

export const StringToDoubleTransformer: ValueTransformer = {
  to: (entityValue: number) => entityValue,
  from: (databaseValue: string) => parseFloat(databaseValue),
};
