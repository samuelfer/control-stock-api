import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import IRequest from '../typeorm/interface/IRequestSession';
import IResponseSession from '../typeorm/interface/IResponseSession';
import UserRepository from '../typeorm/repositories/UserRepository';

class CreateSessionService {
  public async execute({
    email,
    password,
  }: IRequest): Promise<IResponseSession> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, '79fea6ea9ca60af673521686d1e4d2e4', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
