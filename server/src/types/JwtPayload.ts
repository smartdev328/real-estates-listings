import { Role } from './Role';

export type JwtPayload = {
  id: number;
  email: string;
  role: Role;
  created_at: Date;
};
