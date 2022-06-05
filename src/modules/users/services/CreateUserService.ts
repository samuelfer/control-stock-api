import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { IRequestUser } from '../typeorm/interface/IRequestUser';
import UserRepository from '../typeorm/repositories/UserRepository';

class CreateUserService {
  public async execute({ name, email, password }: IRequestUser): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const emailExists = await userRepository.findByEmail(email);
    const userExists = await userRepository.findByName(name);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    if (userExists) {
      throw new AppError('There is already one user with this name.');
    }

    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
