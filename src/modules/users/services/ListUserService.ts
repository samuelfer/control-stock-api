import { getCustomRepository } from 'typeorm';

import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find();
    console.log(users);

    return users;
  }
}

export default ListUserService;
