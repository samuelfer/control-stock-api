import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';

class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();

    const users = await listUsers.execute();

    return response.json(users);
  }
}

export default UserController;
