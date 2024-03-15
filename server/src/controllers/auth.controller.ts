import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../entities/user.entity';
import { JwtPayload } from '../types/JwtPayload';
import { Role } from '../types/Role';
import { createJwtToken } from '../utils/createJwtToken';
import { CustomError } from '../utils/response/customError';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { email } });

    if (user) {
      const customError = new CustomError(400, [`Email '${user.email}' already exists`]);
      return next(customError);
    }

    try {
      const newUser = new User();
      newUser.email = email;
      newUser.password = password;
      newUser.hashPassword();
      const user = await userRepository.save(newUser);

      const jwtPayload: JwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role as Role,
        created_at: user.created_at,
      };

      const token = createJwtToken(jwtPayload);
      res.customSuccess(200, 'User successfully created.', token);
    } catch (err) {
      const customError = new CustomError(400, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, err);
    return next(customError);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.jwtPayload;
  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { email }, select: ['id', 'email', 'role'] });
    res.customSuccess(200, 'success', user);
  } catch (err) {
    const customError = new CustomError(400, err);
    return next(customError);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      const customError = new CustomError(404, ['Incorrect email or password']);
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new CustomError(404, ['Incorrect email or password']);
      return next(customError);
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role as Role,
      created_at: user.created_at,
    };

    try {
      const token = createJwtToken(jwtPayload);
      res.customSuccess(200, 'Token successfully created.', token);
    } catch (err) {
      const customError = new CustomError(400, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, err);
    return next(customError);
  }
};
