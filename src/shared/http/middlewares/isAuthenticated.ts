import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    //Desestrutura para pegar o id do usuario e enviar nas requests
    const { sub } = decodedToken as TokenPayload;

    //Add propriedade user ao request do express
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}
